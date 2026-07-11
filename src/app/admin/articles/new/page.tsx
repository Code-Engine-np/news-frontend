"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createArticle, getCategories } from "@/src/lib/api";
import Editor from "@/src/editor/Editor";
import { ApiCategory } from "@/src/types";

export default function NewArticlePage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState<ApiCategory[] | null>(null);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  const [form, setForm] = useState({
    // titleEn: "",
    titleNe: "",
    // slugEn: "",
    slugNe: "",
    // summaryEn: "",
    summaryNe: "",
    // contentEn: "",
    contentNe: "",
    categoryId: "",
    categoryName: "",
    categoryMode: "existing" as "existing" | "new",
    status: "draft" as "draft" | "published",
  });

  useEffect(() => {
    let isMounted = true;

    const loadCategories = async () => {
      try {
        const apiCategories = await getCategories();
        if (!isMounted) {
          return;
        }

        setCategories(apiCategories);
        if (!apiCategories?.length) {
          setForm((currentForm) => ({
            ...currentForm,
            categoryMode: "new",
          }));
        }
      } catch (loadError) {
        console.error("Failed to load categories", loadError);
        if (isMounted) {
          setCategories(null);
          setForm((currentForm) => ({
            ...currentForm,
            categoryMode: "new",
          }));
        }
      } finally {
        if (isMounted) {
          setIsLoadingCategories(false);
        }
      }
    };

    void loadCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");

    const selectedCategoryId =
      form.categoryMode === "existing" ? form.categoryId.trim() : "";
    const newCategoryName =
      form.categoryMode === "new" ? form.categoryName.trim() : "";

    if (!selectedCategoryId && !newCategoryName) {
      setError("Select an existing category or add a new one.");
      setIsSaving(false);
      return;
    }

    console.log("Form data:", form);

    try {
      const payload: Record<string, unknown> = {
        titleNe: form.titleNe,
        slugNe: form.slugNe,
        summaryNe: form.summaryNe,
        contentNe: form.contentNe,
        status: form.status,
      };

      if (selectedCategoryId) {
        payload.categoryId = selectedCategoryId;
      } else {
        payload.category = newCategoryName;
      }

      // Create article using API - we need auth token from context
      const token = localStorage.getItem("best_khabar_access_token");
      console.log("Auth token:", token);

      await createArticle(payload, token || "");
      router.push("/admin");
    } catch (err) {
      setError("Failed to create article");
      console.error(err);
    } finally {
      setIsSaving(false);
    }
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
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* English */}
          {/* <div className="rounded-2xl border border-line bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold text-ink">English</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-ink">
                  Title
                </label>
                <input
                  type="text"
                  value={form.titleEn}
                  onChange={(e) =>
                    setForm({ ...form, titleEn: e.target.value })
                  }
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink">
                  Slug
                </label>
                <input
                  type="text"
                  value={form.slugEn}
                  onChange={(e) => setForm({ ...form, slugEn: e.target.value })}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink">
                  Summary
                </label>
                <textarea
                  value={form.summaryEn}
                  onChange={(e) =>
                    setForm({ ...form, summaryEn: e.target.value })
                  }
                  className={inputClass + " min-h-[80px]"}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink">
                  Content
                </label>
                <textarea
                  value={form.contentEn}
                  onChange={(e) =>
                    setForm({ ...form, contentEn: e.target.value })
                  }
                  className={inputClass + " min-h-[200px]"}
                  required
                />
              </div>
            </div>
          </div> */}

          {/* Nepali */}
          <div className="rounded-2xl border border-line bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold text-ink">Nepali</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-ink">
                  Title
                </label>
                <input
                  type="text"
                  value={form.titleNe}
                  onChange={(e) =>
                    setForm({ ...form, titleNe: e.target.value })
                  }
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink">
                  Slug
                </label>
                <input
                  type="text"
                  value={form.slugNe}
                  onChange={(e) => setForm({ ...form, slugNe: e.target.value })}
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-ink">
                  Content
                </label>
                {/* <textarea
                  value={form.contentNe}
                  onChange={(e) =>
                    setForm({ ...form, contentNe: e.target.value })
                  }
                  className={inputClass + " min-h-[200px]"}
                  required
                /> */}
                <Editor
                  value={form.contentNe}
                  onChange={(value) => setForm({ ...form, contentNe: value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink">
                  Summary
                </label>
                <textarea
                  value={form.summaryNe}
                  onChange={(e) =>
                    setForm({ ...form, summaryNe: e.target.value })
                  }
                  className={inputClass + " min-h-20"}
                  required
                />
              </div>
            </div>
          </div>

          {/* Meta */}
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
                        setForm((currentForm) => ({
                          ...currentForm,
                          categoryMode: "existing",
                        }))
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
                        setForm((currentForm) => ({
                          ...currentForm,
                          categoryMode: "new",
                        }))
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
                      {categories?.map((category: ApiCategory) => (
                        <option key={category.id} value={category.id}>
                          {category.nameNe || category.nameEn}
                        </option>
                      ))}
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

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={isSaving}
              className="rounded-lg bg-primary px-6 py-2.5 font-semibold text-white hover:bg-primary-dark disabled:opacity-50"
            >
              {isSaving ? "Creating..." : "Create Article"}
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
