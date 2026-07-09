"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createArticle } from "@/src/lib/api";
import Editor from "@/src/editor/Editor";

export default function NewArticlePage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [content, setContent] = useState("");

  const [form, setForm] = useState({
    titleEn: "",
    titleNe: "",
    slugEn: "",
    slugNe: "",
    summaryEn: "",
    summaryNe: "",
    contentEn: "",
    contentNe: "",
    categoryId: "",
    status: "draft" as "draft" | "published",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");

    try {
      // Create article using API - we need auth token from context
      const token = localStorage.getItem("best_khabar_access_token");
      await createArticle(form, token || "");
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

        <Editor value={content} onChange={setContent} />

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* English */}
          <div className="rounded-2xl border border-line bg-white p-6">
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
          </div>

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
                  Summary
                </label>
                <textarea
                  value={form.summaryNe}
                  onChange={(e) =>
                    setForm({ ...form, summaryNe: e.target.value })
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
                  value={form.contentNe}
                  onChange={(e) =>
                    setForm({ ...form, contentNe: e.target.value })
                  }
                  className={inputClass + " min-h-[200px]"}
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
                  Category ID
                </label>
                <input
                  type="text"
                  value={form.categoryId}
                  onChange={(e) =>
                    setForm({ ...form, categoryId: e.target.value })
                  }
                  className={inputClass}
                  required
                />
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
