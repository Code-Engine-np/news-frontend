"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPopupNotice, updatePopupNotice } from "@/src/lib/api";
import { queryKeys } from "@/src/lib/queries";

const inputClass =
  "mt-1 w-full rounded-lg border border-line bg-white px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-primary dark:bg-[#22302a] dark:text-gray-100";

export default function EditPopupNoticePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [formError, setFormError] = useState("");
  const [form, setForm] = useState({
    title: "",
    content: "",
    buttonText: "I Understand",
    isActive: true,
  });

  const { data: notice, isLoading } = useQuery({
    queryKey: [...queryKeys.allPopupNotices(), id],
    queryFn: () => getPopupNotice(id),
    enabled: Boolean(id),
  });

  useEffect(() => {
    if (!notice) return;
    setForm({
      title: notice.title,
      content: notice.content,
      buttonText: notice.buttonText,
      isActive: notice.isActive,
    });
  }, [notice]);

  const updateMutation = useMutation({
    mutationFn: () => updatePopupNotice(id, { ...form }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.allPopupNotices() });
      void queryClient.invalidateQueries({ queryKey: queryKeys.activePopupNotice() });
      router.push("/admin/popup-notices");
    },
    onError: () => setFormError("Failed to update notice."),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    if (!form.title.trim()) { setFormError("Title is required."); return; }
    if (!form.content.trim()) { setFormError("Content is required."); return; }
    updateMutation.mutate();
  };

  if (isLoading) {
    return (
      <div className="flex min-h-96 items-center justify-center">
        <p className="text-muted">Loading…</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-ink dark:text-gray-100">Edit Notice</h1>
        <Link href="/admin/popup-notices" className="rounded-lg border border-line px-4 py-2 text-sm font-medium text-muted hover:bg-gray-50 dark:hover:bg-[#22302a]">
          Cancel
        </Link>
      </div>
        {(formError || updateMutation.isError) && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
            {formError || "Failed to update notice."}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-2xl border border-line bg-white p-6 space-y-4 dark:bg-[#1e2a26]">
            <h2 className="text-base font-semibold text-ink">Notice Content</h2>

            <div>
              <label className="block text-sm font-medium text-ink">Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className={inputClass}
                maxLength={300}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink">Content</label>
              <p className="mt-0.5 text-xs text-muted">Each new line becomes a separate paragraph in the popup.</p>
              <textarea
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                rows={8}
                className={`${inputClass} resize-y`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink">Dismiss Button Text</label>
              <input
                type="text"
                value={form.buttonText}
                onChange={(e) => setForm({ ...form, buttonText: e.target.value })}
                className={inputClass}
                maxLength={100}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-white p-6 dark:bg-[#1e2a26]">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isActive"
                checked={form.isActive}
                onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                className="h-4 w-4 accent-primary"
              />
              <label htmlFor="isActive" className="text-sm font-medium text-ink">
                Active — show this notice to visitors
              </label>
            </div>
            <p className="mt-2 text-xs text-muted pl-7">
              Only the most recently created active notice is shown.
            </p>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-50"
            >
              {updateMutation.isPending ? "Saving…" : "Save Changes"}
            </button>
            <Link
              href="/admin/popup-notices"
              className="rounded-lg border border-line px-6 py-2.5 text-sm font-medium text-muted hover:bg-gray-50 dark:bg-[#22302a] dark:text-gray-300 dark:hover:bg-[#2a3832]"
            >
              Cancel
            </Link>
          </div>
        </form>
    </div>
  );
}
