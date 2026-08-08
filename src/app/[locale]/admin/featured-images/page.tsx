"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFeaturedImage } from "@/src/lib/api";
import { queryKeys, queryFns } from "@/src/lib/queries";
import { useAuth } from "@/src/app/context/AuthContext";
import { ArrowLeft, Plus, Pencil, Trash2 } from "lucide-react";
import type { ApiFeaturedImage } from "@/src/types";

export default function FeaturedImagesAdminPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isAuthenticated) router.replace("/login");
  }, [isAuthenticated, router]);

  const { data: slides = [], isLoading } = useQuery<ApiFeaturedImage[]>({
    queryKey: queryKeys.allFeaturedImages(),
    queryFn: queryFns.allFeaturedImages,
    enabled: isAuthenticated,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteFeaturedImage(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.allFeaturedImages() });
      void queryClient.invalidateQueries({ queryKey: queryKeys.featuredImages() });
    },
  });

  const handleDelete = (id: string) => {
    if (!window.confirm("Delete this slide? This cannot be undone.")) return;
    deleteMutation.mutate(id);
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] dark:bg-[#141f1b]">
      <header className="border-b border-line bg-white dark:bg-[#1e2a26]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="flex items-center gap-1 text-sm text-muted hover:text-primary">
              <ArrowLeft className="h-4 w-4" /> Dashboard
            </Link>
            <span className="text-line">/</span>
            <h1 className="text-xl font-bold text-ink">Featured Images</h1>
          </div>
          <Link
            href="/admin/featured-images/new"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark"
          >
            <Plus className="h-4 w-4" /> New Slide
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        {isLoading ? (
          <p className="text-muted">Loading…</p>
        ) : slides.length === 0 ? (
          <div className="rounded-2xl border border-line bg-white p-12 text-center dark:bg-[#1e2a26]">
            <p className="font-semibold text-ink">No featured images yet</p>
            <p className="mt-1 text-sm text-muted">Add slides to display the homepage carousel.</p>
            <Link
              href="/admin/featured-images/new"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"
            >
              <Plus className="h-4 w-4" /> New Slide
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {slides.map((slide) => (
              <div
                key={slide.id}
                className="group overflow-hidden rounded-2xl border border-line bg-white shadow-sm dark:bg-[#1e2a26]"
              >
                <div className="relative h-40 bg-gray-100 dark:bg-[#2a3832]">
                  <Image
                    src={slide.imageUrl}
                    alt={slide.caption ?? "Featured slide"}
                    fill
                    sizes="(max-width: 640px) 100vw, 400px"
                    className="object-cover"
                  />
                  <span
                    className={`absolute right-2 top-2 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      slide.isActive
                        ? "bg-green-500 text-white"
                        : "bg-gray-400 text-white"
                    }`}
                  >
                    {slide.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
                <div className="p-4">
                  {slide.caption ? (
                    <p className="line-clamp-2 text-sm font-medium text-ink">{slide.caption}</p>
                  ) : (
                    <p className="text-sm italic text-muted">No caption</p>
                  )}
                  <p className="mt-1 text-xs text-muted">Order: {slide.order}</p>

                  <div className="mt-3 flex items-center gap-2">
                    <Link
                      href={`/admin/featured-images/${slide.id}/edit`}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-muted hover:border-primary hover:text-primary dark:hover:bg-[#22302a]"
                    >
                      <Pencil className="h-3.5 w-3.5" /> Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(slide.id)}
                      disabled={deleteMutation.isPending && deleteMutation.variables === slide.id}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-muted hover:border-red-400 hover:text-red-500 disabled:opacity-40 dark:hover:bg-[#22302a]"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
