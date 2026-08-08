"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  mapApiCategoryToCategory,
  updateArticle,
} from "@/src/lib/api";
import { queryKeys, queryFns } from "@/src/lib/queries";
import Editor from "@/src/editor/Editor";
import ImageUploader from "@/src/components/ui/ImageUploader";
import { CloudinaryUploadResponse } from "@/src/types/cloudinary";

export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const articleId = params.id;
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
    status: "draft" as "draft" | "published" | "archived",
  });

  const { data: article, isLoading: isLoadingArticle } = useQuery({
    queryKey: queryKeys.articleById(articleId),
    queryFn: queryFns.articleById(articleId),
    enabled: Boolean(articleId),
  });

  const { data: apiCategories, isLoading: isLoadingCategories } = useQuery({
    queryKey: queryKeys.categories(),
    queryFn: queryFns.categories,
  });

  const categories = apiCategories?.map(mapApiCategoryToCategory) ?? [];
  const topLevelCats = categories.filter((c) => !c.parentId);
  const childrenOf = (parentId: string) =>
    categories.filter((c) => c.parentId === parentId);

  // Populate the form once the article loads
  useEffect(() => {
    if (!article) return;
    setForm((current) => ({
      ...current,
      title: article.title,
      summary: article.summary,
      content: article.content,
      categoryId: article.category?.id ?? "",
      status: article.status,
      images: (article.images ?? []).map(
        (image): CloudinaryUploadResponse => ({
          secure_url: image.secureUrl ?? undefined,
          public_id: image.publicId ?? undefined,
          resource_type: image.resourceType ?? undefined,
          youtube_url: image.youtubeUrl ?? undefined,
          alt_text: image.altText ?? "",
          caption: image.caption ?? "",
        }),
      ),
    }));
  }, [article]);

  const updateMutation = useMutation({
    mutationFn: (payload: Record<string, unknown>) => {
      const token = localStorage.getItem("best_khabar_access_token") ?? "";
      return updateArticle(articleId, payload, token);
    },
    onSuccess: (updated) => {
      // Update both the by-id and the lists so nav back is instant
      queryClient.setQueryData(queryKeys.articleById(articleId), updated);
      void queryClient.invalidateQueries({ queryKey: queryKeys.allArticles() });
      void queryClient.invalidateQueries({
        queryKey: queryKeys.publishedArticles(),
      });
      router.push("/admin");
    },
    onError: () => setFormError("Failed to update article"),
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

    updateMutation.mutate(payload);
  };

  const inputClass =
    "mt-1 w-full rounded-lg border border-line bg-white px-4 py-2.5 text-ink outline-none transition-colors focus:border-primary dark:bg-[#22302a] dark:text-gray-100";

  if (isLoadingArticle) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f9f9f9] dark:bg-[#141f1b]">
        <p className="text-muted">Loading article...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9f9f9] dark:bg-[#141f1b]">
      <header className="border-b border-line bg-white dark:bg-[#1e2a26]">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <h1 className="text-2xl font-bold text-ink">Edit Article</h1>
          <Link
            href="/admin"
            className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-[#22302a] dark:text-gray-300 dark:hover:bg-[#2a3832]"
          >
            Cancel
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        {(formError || updateMutation.isError) && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
            {formError || "Failed to update article"}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-2xl border border-line bg-white p-6 dark:bg-[#1e2a26]">
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

          <div className="rounded-2xl border border-line bg-white p-6 dark:bg-[#1e2a26]">
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
                          : "border-line bg-white text-muted hover:bg-gray-50 dark:bg-[#22302a] dark:hover:bg-[#2a3832]"
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
                          : "border-line bg-white text-muted hover:bg-gray-50 dark:bg-[#22302a] dark:hover:bg-[#2a3832]"
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
                      <p className="text-xs text-muted">
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
                      status: e.target.value as
                        | "draft"
                        | "published"
                        | "archived",
                    })
                  }
                  className={inputClass}
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="rounded-lg bg-primary px-6 py-2.5 font-semibold text-white hover:bg-primary-dark disabled:opacity-50"
            >
              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </button>
            <Link
              href="/admin"
              className="rounded-lg border border-line px-6 py-2.5 font-medium text-muted hover:bg-gray-50 dark:hover:bg-[#22302a]"
            >
              Cancel
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}
