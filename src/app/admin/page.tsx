"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getPublishedNewsArticles } from "@/src/lib/api";
import type { NewsArticle } from "@/src/types";
import {
  LayoutDashboard,
  FileText,
  Plus,
  LogOut,
  ArrowLeft,
  User,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import { useAuth } from "@/src/app/context/AuthContext";

export default function AdminDashboard() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  // Fetch articles
  useEffect(() => {
    async function loadArticles() {
      try {
        const apiArticles = await getPublishedNewsArticles();
        setArticles(apiArticles as unknown as NewsArticle[]);
      } catch (err) {
        setError("Failed to load articles");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    if (isAuthenticated) {
      loadArticles();
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
    router.push("/login");
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
    <div className="flex min-h-screen bg-[#f9f9f9]">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 flex h-full w-64 flex-col border-r border-line bg-white shadow-sm">
        {/* Brand */}
        <div className="flex items-center gap-3 border-b border-line px-6 py-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
            <LayoutDashboard className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold text-ink">Best Khabar</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-4">
          <div className="space-y-1">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                activeTab === "dashboard"
                  ? "bg-primary text-white"
                  : "text-[#60706a] hover:bg-gray-100"
              }`}
            >
              <LayoutDashboard className="h-5 w-5" />
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab("articles")}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                activeTab === "articles"
                  ? "bg-primary text-white"
                  : "text-[#60706a] hover:bg-gray-100"
              }`}
            >
              <FileText className="h-5 w-5" />
              Articles
            </button>
            <Link
              href="/admin/articles/new"
              className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-[#60706a] transition-colors hover:bg-gray-100"
            >
              <Plus className="h-5 w-5" />
              New Article
            </Link>
          </div>
        </nav>

        {/* User Profile */}
        <div className="border-t border-line p-4">
          <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
              <User className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-ink truncate">
                {user?.fullName || user?.email}
              </p>
              <p className="text-xs text-[#60706a] capitalize">{user?.role}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="border-t border-line p-4 space-y-2">
          <Link
            href="/"
            className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-[#60706a] transition-colors hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Site
          </Link>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-8">
        {activeTab === "dashboard" && (
          <div>
            <h1 className="text-2xl font-bold text-ink">Dashboard</h1>
            <p className="mt-1 text-sm text-[#60706a]">
              Welcome back, {user?.fullName || user?.email}
            </p>
          </div>
        )}

        {activeTab === "articles" && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-ink">Articles</h2>
              <Link
                href="/admin/articles/new"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark"
              >
                <Plus className="h-4 w-4" />
                New Article
              </Link>
            </div>

            {error && (
              <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {isLoading ? (
              <div className="rounded-2xl border border-line bg-white p-12 text-center">
                <p className="text-[#60706a]">Loading articles...</p>
              </div>
            ) : articles.length === 0 ? (
              <div className="rounded-2xl border border-line bg-white p-12 text-center">
                <p className="text-[#60706a]">No articles found</p>
                <Link
                  href="/admin/articles/new"
                  className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
                >
                  Create your first article
                </Link>
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#60706a]">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#60706a]">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#60706a]">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-[#60706a]">
                        Views
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-[#60706a]">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {articles.map((article) => (
                      <tr key={article.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="font-medium text-ink">
                            {article.title}
                          </div>
                          <div className="text-sm text-[#60706a]">
                            {article.slug}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-[#60706a]">
                          {article.category?.name}
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
                        <td className="px-6 py-4 text-sm text-[#60706a]">
                          {article.viewCount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
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
                            <Link
                              href={`/admin/articles/${article.id}/delete`}
                              className="rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-50"
                              title="Delete"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
