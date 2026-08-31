"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPopupNotice } from "@/src/lib/api";
import { queryKeys } from "@/src/lib/queries";

const inputClass =
  "mt-1 w-full rounded-lg border border-line bg-white px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-primary dark:bg-[#22302a] dark:text-gray-100";

export default function NewPopupNoticePage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [formError, setFormError] = useState("");
  const [form, setForm] = useState({
    title: "",
    content: "",
    buttonText: "I Understand",
    isActive: true,
  });

  const createMutation = useMutation({
    mutationFn: () => createPopupNotice({ ...form }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.allPopupNotices() });
      void queryClient.invalidateQueries({ queryKey: queryKeys.activePopupNotice() });
      router.push("/admin/popup-notices");
    },
    onError: () => setFormError("Failed to create notice."),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    if (!form.title.trim()) { setFormError("Title is required."); return; }
    if (!form.content.trim()) { setFormError("Content is required."); return; }
    createMutation.mutate();
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-ink dark:text-gray-100">New Notice</h1>
        <Link
          href="/admin/popup-notices"
          className="rounded-lg border border-line px-4 py-2 text-sm font-medium text-muted hover:bg-gray-50 dark:hover:bg-[#22302a]"
        >
          Cancel
        </Link>
      </div>

      {formError && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
          {formError}
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
              placeholder="आदरणीय पाठकवृन्दमा महत्वपूर्ण सूचना ।"
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
              placeholder="Write the notice body here…"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-ink">Dismiss Button Text</label>
            <input
              type="text"
              value={form.buttonText}
              onChange={(e) => setForm({ ...form, buttonText: e.target.value })}
              className={inputClass}
              placeholder="I Understand"
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
            Only the most recently created active notice is shown. Deactivate old notices to stop them from showing.
          </p>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={createMutation.isPending}
            className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-50"
          >
            {createMutation.isPending ? "Creating…" : "Create Notice"}
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
