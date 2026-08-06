"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAdvertisement } from "@/src/lib/api";
import { queryKeys, queryFns } from "@/src/lib/queries";
import { useAuth } from "@/src/app/context/AuthContext";
import { Plus, Pencil, Trash2, ArrowLeft } from "lucide-react";
import type { ApiAdvertisement } from "@/src/types";

const POSITION_LABELS: Record<string, string> = {
  banner: "Banner",
  sidebar: "Sidebar",
  inline: "Inline",
};

export default function AdvertisementsAdminPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isAuthenticated) router.replace("/login");
  }, [isAuthenticated, router]);

  const { data: ads = [], isLoading } = useQuery<ApiAdvertisement[]>({
    queryKey: queryKeys.allAdvertisements(),
    queryFn: queryFns.allAdvertisements,
    enabled: isAuthenticated,
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
    <div className="min-h-screen bg-[#f9f9f9]">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="flex items-center gap-1 text-sm text-[#60706a] hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Dashboard
            </Link>
            <span className="text-[#d0d8d0]">/</span>
            <h1 className="text-xl font-bold text-ink">Advertisements</h1>
          </div>
          <Link
            href="/admin/advertisements/new"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark"
          >
            <Plus className="h-4 w-4" />
            New Ad
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        {isLoading ? (
          <p className="text-[#60706a]">Loading…</p>
        ) : ads.length === 0 ? (
          <div className="rounded-2xl border border-line bg-white p-12 text-center">
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
          <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line bg-[#f5f7f5] text-left text-xs font-semibold uppercase tracking-wider text-muted">
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
                  <tr key={ad.id} className="hover:bg-[#f9f9f9]">
                    <td className="px-4 py-3">
                      <div className="relative h-12 w-20 overflow-hidden rounded-lg bg-gray-100">
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
                        <p className="truncate text-xs text-muted max-w-[200px]">
                          {ad.linkUrl}
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                        {POSITION_LABELS[ad.position] ?? ad.position}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          ad.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-500"
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
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-line text-muted hover:border-primary hover:text-primary"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(ad.id, ad.title)}
                          disabled={deleteMutation.isPending && deleteMutation.variables === ad.id}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-line text-muted hover:border-red-400 hover:text-red-500 disabled:opacity-40"
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
        )}
      </main>
    </div>
  );
}
