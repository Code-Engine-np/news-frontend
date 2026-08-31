"use client";

import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePopupNotice } from "@/src/lib/api";
import { queryKeys, queryFns } from "@/src/lib/queries";
import { Plus, Pencil, Trash2 } from "lucide-react";
import type { ApiPopupNotice } from "@/src/types";

export default function PopupNoticesAdminPage() {
  const queryClient = useQueryClient();

  const { data: notices = [], isLoading } = useQuery<ApiPopupNotice[]>({
    queryKey: queryKeys.allPopupNotices(),
    queryFn: queryFns.allPopupNotices,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deletePopupNotice(id),
    onSuccess: () =>
      void queryClient.invalidateQueries({ queryKey: queryKeys.allPopupNotices() }),
  });

  const handleDelete = (id: string, title: string) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    deleteMutation.mutate(id);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-ink dark:text-gray-100">Popup Notices</h1>
        <Link
          href="/admin/popup-notices/new"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white hover:bg-primary-dark sm:px-4 sm:py-2.5"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">New Notice</span>
          <span className="sm:hidden">New</span>
        </Link>
      </div>

      <p className="mb-4 text-sm text-muted">
        The most recently created <strong className="text-ink dark:text-gray-200">active</strong> notice is shown to visitors on their first visit. Only one notice is shown at a time.
      </p>

      {isLoading ? (
        <p className="text-muted">Loading…</p>
      ) : notices.length === 0 ? (
        <div className="rounded-2xl border border-line bg-white p-12 text-center dark:bg-[#1e2a26]">
          <p className="font-semibold text-ink">No popup notices yet</p>
          <p className="mt-1 text-sm text-muted">Create one to show a notice to visitors on their first visit.</p>
          <Link
            href="/admin/popup-notices/new"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"
          >
            <Plus className="h-4 w-4" /> New Notice
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {notices.map((notice) => (
            <div
              key={notice.id}
              className="flex items-start justify-between gap-4 rounded-2xl border border-line bg-white p-5 dark:bg-[#1e2a26]"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-ink dark:text-gray-100 line-clamp-1">{notice.title}</p>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      notice.isActive
                        ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                        : "bg-gray-100 text-gray-500 dark:bg-gray-800/60 dark:text-gray-400"
                    }`}
                  >
                    {notice.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-muted">{notice.content}</p>
                <p className="mt-1 text-xs text-muted">
                  Button: <span className="italic">{notice.buttonText}</span>
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Link
                  href={`/admin/popup-notices/${notice.id}/edit`}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-line text-muted hover:border-primary hover:text-primary dark:hover:bg-[#22302a]"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(notice.id, notice.title)}
                  disabled={deleteMutation.isPending && deleteMutation.variables === notice.id}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-line text-muted hover:border-red-400 hover:text-red-500 disabled:opacity-40 dark:hover:bg-[#22302a]"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
