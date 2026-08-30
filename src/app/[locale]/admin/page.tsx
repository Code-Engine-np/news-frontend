"use client";

import { useState, useEffect } from "react";
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
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "@/src/app/context/AuthContext";
import { useTheme } from "@/src/app/context/ThemeContext";

export default function AdminDashboard() {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggle: toggleTheme } = useTheme();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#f9f9f9] dark:bg-[#141f1b]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-lg font-medium text-muted">
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

  const navLinkClass =
    "flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-gray-100 dark:hover:bg-[#2a3832]";

  return (
    <div className="flex min-h-screen bg-[#f9f9f9] dark:bg-[#141f1b]">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 flex h-full w-64 flex-col border-r border-line bg-white shadow-sm transition-transform duration-200 dark:border-[#2a3832] dark:bg-[#1e2a26] ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4 dark:border-[#2a3832]">
          <Link href="/">
            <Image
              src="/best-khabar-green1.png"
              alt="Best Khabar"
              width={130}
              height={36}
              className="h-8 w-auto object-contain object-left"
              priority
            />
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-1.5 text-muted hover:bg-gray-100 dark:hover:bg-[#2a3832] lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-4">
          <div className="space-y-1">
            <Link
              href="/admin"
              className={navLinkClass}
              onClick={() => setSidebarOpen(false)}
            >
              <FileText className="h-5 w-5 shrink-0" />
              Articles
            </Link>
            <Link
              href="/admin/articles/new"
              className={navLinkClass}
              onClick={() => setSidebarOpen(false)}
            >
              <Plus className="h-5 w-5 shrink-0" />
              New Article
            </Link>

            <div className="pt-2">
              <p className="px-4 pb-1 text-[10px] font-semibold uppercase tracking-widest text-muted">
                Media
              </p>
              <Link
                href="/admin/featured-images"
                className={navLinkClass}
                onClick={() => setSidebarOpen(false)}
              >
                <Images className="h-5 w-5 shrink-0" />
                Featured Images
              </Link>
              <Link
                href="/admin/featured-images/new"
                className={navLinkClass}
                onClick={() => setSidebarOpen(false)}
              >
                <Plus className="h-5 w-5 shrink-0" />
                New Slide
              </Link>
            </div>

            <div className="pt-2">
              <p className="px-4 pb-1 text-[10px] font-semibold uppercase tracking-widest text-muted">
                Advertising
              </p>
              <Link
                href="/admin/advertisements"
                className={navLinkClass}
                onClick={() => setSidebarOpen(false)}
              >
                <Megaphone className="h-5 w-5 shrink-0" />
                Advertisements
              </Link>
              <Link
                href="/admin/advertisements/new"
                className={navLinkClass}
                onClick={() => setSidebarOpen(false)}
              >
                <Plus className="h-5 w-5 shrink-0" />
                New Ad
              </Link>
            </div>
          </div>
        </nav>

        <div className="border-t border-line p-4 dark:border-[#2a3832]">
          <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 dark:bg-[#22302a]">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-white">
              <User className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-ink dark:text-gray-100">
                {user?.fullName || user?.email}
              </p>
              <p className="text-xs capitalize text-muted">{user?.role}</p>
            </div>
          </div>
        </div>

        <div className="space-y-1 border-t border-line px-4 pb-4 pt-2 dark:border-[#2a3832]">
          <button
            onClick={toggleTheme}
            className={navLinkClass}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 shrink-0" />
            ) : (
              <Moon className="h-5 w-5 shrink-0" />
            )}
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
          <Link href="/" className={navLinkClass}>
            <ArrowLeft className="h-5 w-5 shrink-0" />
            Back to Site
          </Link>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-950/40"
          >
            <LogOut className="h-5 w-5 shrink-0" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex min-h-screen w-full flex-col lg:ml-64">
        {/* Mobile top bar */}
        <div className="sticky top-0 z-20 flex items-center gap-3 border-b border-line bg-white px-4 py-3 dark:border-[#2a3832] dark:bg-[#1e2a26] lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-ink hover:bg-gray-100 dark:hover:bg-[#22302a]"
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="text-sm font-semibold text-ink dark:text-gray-100">
            Admin Dashboard
          </span>
        </div>

        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-xl font-bold text-ink dark:text-gray-100">
              Articles
            </h1>
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
              <Link
                href="/admin/articles/new"
                className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
              >
                Create your first article
              </Link>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm dark:border-[#2a3832] dark:bg-[#1e2a26]">
              <div className="overflow-x-auto">
                <table className="w-full min-w-140">
                  <thead className="bg-gray-50 dark:bg-[#22302a]">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted sm:px-6">
                        Title
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted sm:px-6">
                        Category
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted sm:px-6">
                        Status
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted sm:px-6">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {articles.map((article) => (
                      <tr
                        key={article.id}
                        onClick={() =>
                          router.push(`/admin/articles/${article.id}/edit`)
                        }
                        className="cursor-pointer hover:bg-gray-50 dark:hover:bg-[#22302a]"
                      >
                        <td className="px-4 py-4 sm:px-6">
                          <div className="font-medium text-ink dark:text-gray-100 line-clamp-1">
                            {article.title}
                          </div>
                          <div className="mt-0.5 text-xs text-muted line-clamp-1">
                            {article.slug}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-muted sm:px-6">
                          {article.category?.name || "Uncategorized"}
                        </td>
                        <td className="px-4 py-4 sm:px-6">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                              article.status === "published"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300"
                                : article.status === "draft"
                                  ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
                                  : "bg-gray-100 text-gray-800 dark:bg-gray-800/60 dark:text-gray-300"
                            }`}
                          >
                            {article.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-right sm:px-6">
                          <div
                            className="flex items-center justify-end gap-1.5 sm:gap-2"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Link
                              href={`/article/${article.slug}`}
                              className="rounded-lg border border-line p-2 text-muted hover:bg-gray-50 dark:hover:bg-[#22302a]"
                              title="View"
                            >
                              <Eye className="h-4 w-4" />
                            </Link>
                            <Link
                              href={`/admin/articles/${article.id}/edit`}
                              className="rounded-lg border border-line p-2 text-muted hover:bg-gray-50 dark:hover:bg-[#22302a]"
                              title="Edit"
                            >
                              <Pencil className="h-4 w-4" />
                            </Link>
                            <button
                              type="button"
                              onClick={() =>
                                handleDelete(article.id, article.title)
                              }
                              disabled={
                                deleteMutation.isPending &&
                                deleteMutation.variables === article.id
                              }
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
      </main>
    </div>
  );
}
