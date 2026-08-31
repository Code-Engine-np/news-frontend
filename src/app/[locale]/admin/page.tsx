"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteArticle } from "@/src/lib/api";
import { queryKeys, queryFns } from "@/src/lib/queries";
import type { ApiArticle } from "@/src/types";
import { Plus, Eye, Pencil, Trash2 } from "lucide-react";
import { useAuth } from "@/src/app/context/AuthContext";

export default function AdminDashboard() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: articles = [], isLoading, error } = useQuery<ApiArticle[]>({
    queryKey: queryKeys.allArticles(),
    queryFn: queryFns.allArticles,
    enabled: isAuthenticated,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => {
      const token = localStorage.getItem("best_khabar_access_token") ?? "";
      return deleteArticle(id, token);
    },
    onSuccess: () => void queryClient.invalidateQueries({ queryKey: queryKeys.allArticles() }),
  });

  const handleDelete = (id: string, title: string) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    deleteMutation.mutate(id);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-ink dark:text-gray-100">Articles</h1>
        <Link
          href="/admin/articles/new"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white hover:bg-primary-dark sm:px-4 sm:py-2.5"
        >
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">New Article</span>
          <span className="sm:hidden">New</span>
        </Link>
      </div>

      {deleteMutation.isError && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
          Failed to delete article. Please try again.
        </div>
      )}
      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
          Failed to load articles.
        </div>
      )}

      {isLoading ? (
        <div className="rounded-2xl border border-line bg-white p-12 text-center dark:border-[#2a3832] dark:bg-[#1e2a26]">
          <p className="text-muted">Loading articles...</p>
        </div>
      ) : articles.length === 0 ? (
        <div className="rounded-2xl border border-line bg-white p-12 text-center dark:border-[#2a3832] dark:bg-[#1e2a26]">
          <p className="text-muted">No articles found</p>
          <Link href="/admin/articles/new" className="mt-4 inline-block text-sm font-medium text-primary hover:underline">
            Create your first article
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm dark:border-[#2a3832] dark:bg-[#1e2a26]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-140">
              <thead className="bg-gray-50 dark:bg-[#22302a]">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted sm:px-6">Title</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted sm:px-6">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted sm:px-6">Status</th>
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted sm:px-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {articles.map((article) => (
                  <tr
                    key={article.id}
                    onClick={() => router.push(`/admin/articles/${article.id}/edit`)}
                    className="cursor-pointer hover:bg-gray-50 dark:hover:bg-[#22302a]"
                  >
                    <td className="px-4 py-4 sm:px-6">
                      <div className="line-clamp-1 font-medium text-ink dark:text-gray-100">{article.title}</div>
                      <div className="mt-0.5 line-clamp-1 text-xs text-muted">{article.slug}</div>
                    </td>
                    <td className="px-4 py-4 text-sm text-muted sm:px-6">
                      {article.category?.name || "Uncategorized"}
                    </td>
                    <td className="px-4 py-4 sm:px-6">
                      <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                        article.status === "published"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300"
                          : article.status === "draft"
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-800/60 dark:text-gray-300"
                      }`}>
                        {article.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right sm:px-6">
                      <div className="flex items-center justify-end gap-1.5 sm:gap-2" onClick={(e) => e.stopPropagation()}>
                        <Link href={`/article/${article.slug}`} className="rounded-lg border border-line p-2 text-muted hover:bg-gray-50 dark:hover:bg-[#22302a]" title="View">
                          <Eye className="h-4 w-4" />
                        </Link>
                        <Link href={`/admin/articles/${article.id}/edit`} className="rounded-lg border border-line p-2 text-muted hover:bg-gray-50 dark:hover:bg-[#22302a]" title="Edit">
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(article.id, article.title)}
                          disabled={deleteMutation.isPending && deleteMutation.variables === article.id}
                          className="rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-50 disabled:opacity-50 dark:border-red-900/50 dark:hover:bg-red-950/40"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
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
