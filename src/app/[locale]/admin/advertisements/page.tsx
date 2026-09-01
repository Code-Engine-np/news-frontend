"use client";

import Link from "next/link";
import Image from "next/image";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAdvertisement } from "@/src/lib/api";
import { queryKeys, queryFns } from "@/src/lib/queries";
import { Plus, Pencil, Trash2 } from "lucide-react";
import type { ApiAdvertisement } from "@/src/types";

const POSITION_LABELS: Record<string, string> = {
  banner: "Banner",
  header: "Header",
  inline: "Inline",
};

export default function AdvertisementsAdminPage() {
  const queryClient = useQueryClient();

  const { data: ads = [], isLoading } = useQuery<ApiAdvertisement[]>({
    queryKey: queryKeys.allAdvertisements(),
    queryFn: queryFns.allAdvertisements,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteAdvertisement(id),
    onSuccess: () =>
      void queryClient.invalidateQueries({
        queryKey: queryKeys.allAdvertisements(),
      }),
  });

  const handleDelete = (id: string, title: string) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    deleteMutation.mutate(id);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-ink dark:text-gray-100">Advertisements</h1>
        <Link
          href="/admin/advertisements/new"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white hover:bg-primary-dark sm:px-4 sm:py-2.5"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">New Ad</span>
          <span className="sm:hidden">New</span>
        </Link>
      </div>

      {isLoading ? (
        <p className="text-muted">Loading…</p>
      ) : ads.length === 0 ? (
        <div className="rounded-2xl border border-line bg-white p-12 text-center dark:bg-[#1e2a26]">
          <p className="font-semibold text-ink">No advertisements yet</p>
          <p className="mt-1 text-sm text-muted">
            Create your first ad to start displaying it on the site.
          </p>
          <Link
            href="/admin/advertisements/new"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"
          >
            <Plus className="h-4 w-4" />
            New Ad
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm dark:bg-[#1e2a26]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-140 text-sm">
              <thead>
                <tr className="border-b border-line bg-gray-50 text-left text-xs font-semibold uppercase tracking-wider text-muted dark:bg-[#22302a]">
                  <th className="px-4 py-3">Image</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Position</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Order</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {ads.map((ad) => (
                  <tr key={ad.id} className="hover:bg-gray-50 dark:hover:bg-[#22302a]">
                    <td className="px-4 py-3">
                      <div className="relative h-12 w-20 overflow-hidden rounded-lg bg-gray-100 dark:bg-[#2a3832]">
                        <Image
                          src={ad.imageUrl}
                          alt={ad.title}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-ink">{ad.title}</p>
                      {ad.linkUrl && (
                        <p className="max-w-50 truncate text-xs text-muted">
                          {ad.linkUrl}
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 dark:bg-[#2a3832] dark:text-gray-300">
                        {POSITION_LABELS[ad.position] ?? ad.position}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          ad.isActive
                            ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                            : "bg-gray-100 text-gray-500 dark:bg-gray-800/60 dark:text-gray-400"
                        }`}
                      >
                        {ad.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted">{ad.order}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/advertisements/${ad.id}/edit`}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-line text-muted hover:border-primary hover:text-primary dark:hover:bg-[#22302a]"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(ad.id, ad.title)}
                          disabled={deleteMutation.isPending && deleteMutation.variables === ad.id}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-line text-muted hover:border-red-400 hover:text-red-500 disabled:opacity-40 dark:hover:bg-[#22302a]"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
