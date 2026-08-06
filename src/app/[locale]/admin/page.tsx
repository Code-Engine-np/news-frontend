"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteArticle } from "@/src/lib/api";
import { queryKeys, queryFns } from "@/src/lib/queries";
import type { ApiArticle } from "@/src/types";
import {
  FileText,
  Images,
  Megaphone,
  Plus,
  LogOut,
  ArrowLeft,
  User,
  Eye,
  Pencil,
  Trash2,
  Moon,
  Sun,
} from "lucide-react";
import { useAuth } from "@/src/app/context/AuthContext";
import { useTheme } from "@/src/app/context/ThemeContext";

export default function AdminDashboard() {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggle: toggleTheme } = useTheme();
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  const {
    data: articles = [],
    isLoading,
    error,
  } = useQuery<ApiArticle[]>({
    queryKey: queryKeys.allArticles(),
    queryFn: queryFns.allArticles,
    enabled: isAuthenticated,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => {
      const token = localStorage.getItem("best_khabar_access_token") ?? "";
      return deleteArticle(id, token);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.allArticles() });
    },
  });

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const handleDelete = (id: string, title: string) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    deleteMutation.mutate(id);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#f9f9f9]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-lg font-medium text-[#60706a]">
            Redirecting to login...
          </p>
          <Link
            href="/login"
            className="mt-4 inline-block rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f9f9f9] dark:bg-[#141f1b]">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 flex h-full w-64 flex-col border-r border-line bg-white shadow-sm dark:border-[#2a3832] dark:bg-[#1e2a26]">
        <div className="flex items-center gap-3 border-b border-line px-6 py-4 dark:border-[#2a3832]">
          <Image
            src="/best-khabar-green1.png"
            alt="Best Khabar"
            width={150}
            height={40}
            className="h-9 w-auto object-contain object-left"
            priority
          />
          <span className="sr-only">Best Khabar</span>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-4">
          <div className="space-y-1">
            <Link
              href="/admin"
              className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-[#60706a] transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-[#2a3832]"
            >
              <FileText className="h-5 w-5" />
              Articles
            </Link>
            <Link
              href="/admin/articles/new"
              className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-[#60706a] transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-[#2a3832]"
            >
              <Plus className="h-5 w-5" />
              New Article
            </Link>

            <div className="pt-2">
              <p className="px-4 pb-1 text-[10px] font-semibold uppercase tracking-widest text-muted">
                Media
              </p>
              <Link
                href="/admin/featured-images"
                className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-[#60706a] transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-[#2a3832]"
              >
                <Images className="h-5 w-5" />
                Featured Images
              </Link>
              <Link
                href="/admin/featured-images/new"
                className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-[#60706a] transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-[#2a3832]"
              >
                <Plus className="h-5 w-5" />
                New Slide
              </Link>
            </div>

            <div className="pt-2">
              <p className="px-4 pb-1 text-[10px] font-semibold uppercase tracking-widest text-muted">
                Advertising
              </p>
              <Link
                href="/admin/advertisements"
                className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-[#60706a] transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-[#2a3832]"
              >
                <Megaphone className="h-5 w-5" />
                Advertisements
              </Link>
              <Link
                href="/admin/advertisements/new"
                className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-[#60706a] transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-[#2a3832]"
              >
                <Plus className="h-5 w-5" />
                New Ad
              </Link>
            </div>
          </div>
        </nav>

        <div className="border-t border-line p-4 dark:border-[#2a3832]">
          <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 dark:bg-[#22302a]">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
              <User className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-ink dark:text-gray-100">
                {user?.fullName || user?.email}
              </p>
              <p className="text-xs capitalize text-[#60706a] dark:text-gray-400">
                {user?.role}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2 border-t border-line p-4 dark:border-[#2a3832]">
          <button
            onClick={toggleTheme}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-[#60706a] transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-[#2a3832]"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
          <Link
            href="/"
            className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-[#60706a] transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-[#2a3832]"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Site
          </Link>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-950/40"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-xl font-bold text-ink dark:text-gray-100">Articles</h1>
          <Link
            href="/admin/articles/new"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"
          >
            <Plus className="h-4 w-4" />
            New Article
          </Link>
        </div>

        {deleteMutation.isError && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            Failed to delete article. Please try again.
          </div>
        )}

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            Failed to load articles.
          </div>
        )}

        {isLoading ? (
          <div className="rounded-2xl border border-line bg-white p-12 text-center dark:border-[#2a3832] dark:bg-[#1e2a26]">
            <p className="text-[#60706a] dark:text-gray-400">Loading articles...</p>
          </div>
        ) : articles.length === 0 ? (
          <div className="rounded-2xl border border-line bg-white p-12 text-center dark:border-[#2a3832] dark:bg-[#1e2a26]">
            <p className="text-[#60706a] dark:text-gray-400">No articles found</p>
            <Link
              href="/admin/articles/new"
              className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
            >
              Create your first article
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm dark:border-[#2a3832] dark:bg-[#1e2a26]">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-[#22302a]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#60706a] dark:text-gray-400">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#60706a] dark:text-gray-400">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#60706a] dark:text-gray-400">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-[#60706a] dark:text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-[#2a3832]">
                {articles.map((article) => (
                  <tr
                    key={article.id}
                    onClick={() =>
                      router.push(`/admin/articles/${article.id}/edit`)
                    }
                    className="cursor-pointer hover:bg-gray-50 dark:hover:bg-[#22302a]"
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-ink dark:text-gray-100">{article.title}</div>
                      <div className="text-sm text-[#60706a] dark:text-gray-400">{article.slug}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#60706a] dark:text-gray-400">
                      {article.category?.name || "Uncategorized"}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                          article.status === "published"
                            ? "bg-green-100 text-green-800"
                            : article.status === "draft"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {article.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div
                        className="flex items-center justify-end gap-2"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Link
                          href={`/article/${article.slug}`}
                          className="rounded-lg border border-line p-2 text-[#60706a] hover:bg-gray-50"
                          title="View"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <Link
                          href={`/admin/articles/${article.id}/edit`}
                          className="rounded-lg border border-line p-2 text-[#60706a] hover:bg-gray-50"
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(article.id, article.title)
                          }
                          disabled={deleteMutation.isPending && deleteMutation.variables === article.id}
                          className="rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-50 disabled:opacity-50"
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
        )}
      </main>
    </div>
  );
}
