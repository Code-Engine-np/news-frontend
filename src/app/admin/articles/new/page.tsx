"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createArticle, mapApiCategoryToCategory } from "@/src/lib/api";
import { queryKeys, queryFns } from "@/src/lib/queries";
import Editor from "@/src/editor/Editor";
import ImageUploader from "@/src/components/ui/ImageUploader";
import { CloudinaryUploadResponse } from "@/src/types/cloudinary";

export default function NewArticlePage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [formError, setFormError] = useState("");

  const [form, setForm] = useState({
    title: "",
    images: [] as CloudinaryUploadResponse[],
    summary: "",
    content: "",
    categoryId: "",
    categoryName: "",
    categoryMode: "existing" as "existing" | "new",
    status: "draft" as "draft" | "published",
  });

  const { data: apiCategories, isLoading: isLoadingCategories } = useQuery({
    queryKey: queryKeys.categories(),
    queryFn: queryFns.categories,
  });

  const categories = apiCategories?.map(mapApiCategoryToCategory) ?? [];
  const topLevelCats = categories.filter((c) => !c.parentId);
  const childrenOf = (parentId: string) =>
    categories.filter((c) => c.parentId === parentId);

  const createMutation = useMutation({
    mutationFn: (payload: Record<string, unknown>) => {
      const token = localStorage.getItem("best_khabar_access_token") ?? "";
      return createArticle(payload, token);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.allArticles() });
      void queryClient.invalidateQueries({
        queryKey: queryKeys.publishedArticles(),
      });
      router.push("/admin");
    },
    onError: () => setFormError("Failed to create article"),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    const selectedCategoryId =
      form.categoryMode === "existing" ? form.categoryId.trim() : "";
    const newCategoryName =
      form.categoryMode === "new" ? form.categoryName.trim() : "";

    if (!selectedCategoryId && !newCategoryName) {
      setFormError("Select an existing category or add a new one.");
      return;
    }

    const payload: Record<string, unknown> = {
      title: form.title,
      images: JSON.stringify(form.images),
      summary: form.summary,
      content: form.content,
      status: form.status,
    };

    if (selectedCategoryId) {
      payload.categoryId = selectedCategoryId;
    } else {
      payload.category = newCategoryName;
    }

    createMutation.mutate(payload);
  };

  const inputClass =
    "mt-1 w-full rounded-lg border border-line px-4 py-2.5 outline-none transition-colors focus:border-primary";

  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <h1 className="text-2xl font-bold text-ink">New Article</h1>
          <Link
            href="/admin"
            className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
          >
            Cancel
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        {(formError || createMutation.isError) && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {formError || "Failed to create article"}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-2xl border border-line bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold text-ink">Nepali</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-ink">
                  Title
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-ink">
                  Images
                </label>
                <ImageUploader
                  images={form.images}
                  onChange={(images) => setForm({ ...form, images })}
                  maxImages={5}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-ink">
                  Content
                </label>
                <Editor
                  value={form.content}
                  onChange={(value) => setForm({ ...form, content: value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-ink">
                  Summary
                </label>
                <textarea
                  value={form.summary}
                  onChange={(e) =>
                    setForm({ ...form, summary: e.target.value })
                  }
                  className={inputClass + " min-h-20"}
                  required
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold text-ink">Meta</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-ink">
                  Category
                </label>
                <div className="mt-1 space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setForm((f) => ({ ...f, categoryMode: "existing" }))
                      }
                      className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                        form.categoryMode === "existing"
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-line bg-white text-[#60706a] hover:bg-gray-50"
                      }`}
                    >
                      Existing category
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setForm((f) => ({ ...f, categoryMode: "new" }))
                      }
                      className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                        form.categoryMode === "new"
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-line bg-white text-[#60706a] hover:bg-gray-50"
                      }`}
                    >
                      Add new category
                    </button>
                  </div>

                  {form.categoryMode === "existing" ? (
                    <select
                      value={form.categoryId}
                      onChange={(e) =>
                        setForm({ ...form, categoryId: e.target.value })
                      }
                      className={inputClass}
                      disabled={isLoadingCategories}
                    >
                      <option value="">
                        {isLoadingCategories
                          ? "Loading categories..."
                          : "Select a category"}
                      </option>
                      {topLevelCats.map((parent) => {
                        const subs = childrenOf(parent.id);
                        return subs.length > 0 ? (
                          <optgroup key={parent.id} label={parent.name}>
                            <option value={parent.id}>{parent.name} (all)</option>
                            {subs.map((sub) => (
                              <option key={sub.id} value={sub.id}>
                                {sub.name}
                              </option>
                            ))}
                          </optgroup>
                        ) : (
                          <option key={parent.id} value={parent.id}>
                            {parent.name}
                          </option>
                        );
                      })}
                    </select>
                  ) : (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={form.categoryName}
                        onChange={(e) =>
                          setForm({ ...form, categoryName: e.target.value })
                        }
                        className={inputClass}
                        placeholder="New category name"
                      />
                      <p className="text-xs text-[#60706a]">
                        A category will be created automatically when the
                        article is saved.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-ink">
                  Status
                </label>
                <select
                  value={form.status}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      status: e.target.value as "draft" | "published",
                    })
                  }
                  className={inputClass}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={createMutation.isPending}
              className="rounded-lg bg-primary px-6 py-2.5 font-semibold text-white hover:bg-primary-dark disabled:opacity-50"
            >
              {createMutation.isPending ? "Creating..." : "Create Article"}
            </button>
            <Link
              href="/admin"
              className="rounded-lg border border-line px-6 py-2.5 font-medium text-[#60706a] hover:bg-gray-50"
            >
              Cancel
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}
