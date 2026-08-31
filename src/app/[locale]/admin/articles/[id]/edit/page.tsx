"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { updateArticle } from "@/src/lib/api";
import { queryKeys, queryFns } from "@/src/lib/queries";
import { MAIN_NAV_ITEMS } from "@/src/lib/site";
import Editor from "@/src/editor/Editor";
import { useMemo } from "react";
import ImageUploader from "@/src/components/ui/ImageUploader";
import { CloudinaryUploadResponse } from "@/src/types/cloudinary";

const inputClass =
  "mt-1 w-full rounded-lg border border-line bg-white px-4 py-2.5 text-ink outline-none transition-colors focus:border-primary dark:bg-[#22302a] dark:text-gray-100";

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
    categorySlug: "",
    status: "draft" as "draft" | "published" | "archived",
  });

  const { data: article, isLoading: isLoadingArticle } = useQuery({
    queryKey: queryKeys.articleById(articleId),
    queryFn: queryFns.articleById(articleId),
    enabled: Boolean(articleId),
  });

  const { data: apiCategories } = useQuery({
    queryKey: queryKeys.categories(),
    queryFn: queryFns.categories,
  });

  const slugToId = useMemo(() => {
    const map: Record<string, string> = {};
    (apiCategories ?? []).forEach((c) => { map[c.slug] = c.id; });
    return map;
  }, [apiCategories]);

  const allNavCats = useMemo(() =>
    MAIN_NAV_ITEMS.filter((i) => i.href.startsWith("/category/")).flatMap((i) => [
      { slug: i.href.replace("/category/", ""), label: i.label },
      ...(i.children?.map((c) => ({ slug: c.href.replace("/category/", ""), label: c.label })) ?? []),
    ]), []);

  useEffect(() => {
    if (!article) return;
    setForm((current) => ({
      ...current,
      title: article.title,
      summary: article.summary,
      content: article.content,
      categorySlug: article.category?.slug ?? "",
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
      queryClient.setQueryData(queryKeys.articleById(articleId), updated);
      void queryClient.invalidateQueries({ queryKey: queryKeys.allArticles() });
      void queryClient.invalidateQueries({ queryKey: queryKeys.publishedArticles() });
      router.push("/admin");
    },
    onError: () => setFormError("Failed to update article"),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    const slug = form.categorySlug.trim();
    if (!slug) { setFormError("Please select a category."); return; }
    const payload: Record<string, unknown> = {
      title: form.title,
      images: JSON.stringify(form.images),
      summary: form.summary,
      content: form.content,
      status: form.status,
    };
    const id = slugToId[slug];
    if (id) payload.categoryId = id;
    else payload.category = allNavCats.find((c) => c.slug === slug)?.label ?? slug;
    updateMutation.mutate(payload);
  };

  if (isLoadingArticle) {
    return (
      <div className="flex min-h-96 items-center justify-center">
        <p className="text-muted">Loading article…</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-ink dark:text-gray-100">Edit Article</h1>
        <Link href="/admin" className="rounded-lg border border-line px-4 py-2 text-sm font-medium text-muted hover:bg-gray-50 dark:hover:bg-[#22302a]">
          Cancel
        </Link>
      </div>

      {(formError || updateMutation.isError) && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
          {formError || "Failed to update article"}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-2xl border border-line bg-white p-6 dark:bg-[#1e2a26]">
          <h2 className="mb-4 text-lg font-semibold text-ink">Content</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink">Title</label>
              <input type="text" value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className={inputClass} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink">Images</label>
              <ImageUploader images={form.images}
                onChange={(images) => setForm({ ...form, images })} maxImages={5} />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink">Content</label>
              <Editor value={form.content} onChange={(value) => setForm({ ...form, content: value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink">Summary</label>
              <textarea value={form.summary}
                onChange={(e) => setForm({ ...form, summary: e.target.value })}
                className={inputClass + " min-h-20"} required />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-white p-6 dark:bg-[#1e2a26]">
          <h2 className="mb-4 text-lg font-semibold text-ink">Meta</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink">Category</label>
              <select value={form.categorySlug}
                onChange={(e) => setForm({ ...form, categorySlug: e.target.value })}
                className={inputClass}>
                <option value="">Select a category</option>
                {MAIN_NAV_ITEMS.filter((i) => i.href.startsWith("/category/")).map((item) => {
                  const slug = item.href.replace("/category/", "");
                  if (item.children?.length) {
                    return (
                      <optgroup key={item.key} label={item.label}>
                        <option value={slug}>{item.label} (all)</option>
                        {item.children.map((child) => (
                          <option key={child.key} value={child.href.replace("/category/", "")}>{child.label}</option>
                        ))}
                      </optgroup>
                    );
                  }
                  return <option key={item.key} value={slug}>{item.label}</option>;
                })}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-ink">Status</label>
              <select value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as "draft" | "published" | "archived" })}
                className={inputClass}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button type="submit" disabled={updateMutation.isPending}
            className="rounded-lg bg-primary px-6 py-2.5 font-semibold text-white hover:bg-primary-dark disabled:opacity-50">
            {updateMutation.isPending ? "Saving…" : "Save Changes"}
          </button>
          <Link href="/admin" className="rounded-lg border border-line px-6 py-2.5 font-medium text-muted hover:bg-gray-50 dark:hover:bg-[#22302a]">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
