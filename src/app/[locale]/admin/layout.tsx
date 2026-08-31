"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  FileText, Images, Megaphone, BellDot, Plus,
  LogOut, ArrowLeft, User, Moon, Sun, Menu, X,
} from "lucide-react";
import { useAuth } from "@/src/app/context/AuthContext";
import { useTheme } from "@/src/app/context/ThemeContext";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggle: toggleTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) router.replace("/login");
  }, [isAuthenticated, router]);

  // Close sidebar on route change (mobile)
  useEffect(() => { setSidebarOpen(false); }, [pathname]);

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#f9f9f9] dark:bg-[#141f1b]">
        <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-lg font-medium text-muted">Redirecting to login…</p>
      </div>
    );
  }

  const nav = (href: string, exact = false) => {
    const active = exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");
    return [
      "flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
      active
        ? "bg-primary/10 text-primary"
        : "text-muted hover:bg-gray-100 dark:hover:bg-[#2a3832]",
    ].join(" ");
  };

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
        {/* Logo row */}
        <div className="flex items-center justify-between border-b border-line px-5 py-4 dark:border-[#2a3832]">
          <Image src="/best-khabar-green1.png" alt="Best Khabar" width={130} height={36}
            className="h-8 w-auto object-contain object-left" priority />
          <button onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-1.5 text-muted hover:bg-gray-100 dark:hover:bg-[#2a3832] lg:hidden"
            aria-label="Close sidebar">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-4 py-4">
          <div className="space-y-1">
            <p className="px-4 pb-1 text-[10px] font-semibold uppercase tracking-widest text-muted">
              Articles
            </p>
            <Link href="/admin" className={nav("/admin", true)}>
              <FileText className="h-5 w-5 shrink-0" /> Articles
            </Link>
            <Link href="/admin/articles/new" className={nav("/admin/articles/new")}>
              <Plus className="h-5 w-5 shrink-0" /> New Article
            </Link>

            <div className="pt-3">
              <p className="px-4 pb-1 text-[10px] font-semibold uppercase tracking-widest text-muted">
                Media
              </p>
              <Link href="/admin/featured-images" className={nav("/admin/featured-images")}>
                <Images className="h-5 w-5 shrink-0" /> Featured Images
              </Link>
              <Link href="/admin/featured-images/new" className={nav("/admin/featured-images/new")}>
                <Plus className="h-5 w-5 shrink-0" /> New Slide
              </Link>
            </div>

            <div className="pt-3">
              <p className="px-4 pb-1 text-[10px] font-semibold uppercase tracking-widest text-muted">
                Advertising
              </p>
              <Link href="/admin/advertisements" className={nav("/admin/advertisements")}>
                <Megaphone className="h-5 w-5 shrink-0" /> Advertisements
              </Link>
              <Link href="/admin/advertisements/new" className={nav("/admin/advertisements/new")}>
                <Plus className="h-5 w-5 shrink-0" /> New Ad
              </Link>
            </div>

            <div className="pt-3">
              <p className="px-4 pb-1 text-[10px] font-semibold uppercase tracking-widest text-muted">
                Notices
              </p>
              <Link href="/admin/popup-notices" className={nav("/admin/popup-notices")}>
                <BellDot className="h-5 w-5 shrink-0" /> Popup Notices
              </Link>
              <Link href="/admin/popup-notices/new" className={nav("/admin/popup-notices/new")}>
                <Plus className="h-5 w-5 shrink-0" /> New Notice
              </Link>
            </div>
          </div>
        </nav>

        {/* User info */}
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

        {/* Bottom actions */}
        <div className="space-y-1 border-t border-line px-4 pb-4 pt-2 dark:border-[#2a3832]">
          <button onClick={toggleTheme}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-gray-100 dark:hover:bg-[#2a3832]"
            aria-label="Toggle theme">
            {theme === "dark" ? <Sun className="h-5 w-5 shrink-0" /> : <Moon className="h-5 w-5 shrink-0" />}
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
          <Link href="/"
            className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-gray-100 dark:hover:bg-[#2a3832]">
            <ArrowLeft className="h-5 w-5 shrink-0" /> Back to Site
          </Link>
          <button onClick={() => { logout(); router.push("/login"); }}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-950/40">
            <LogOut className="h-5 w-5 shrink-0" /> Logout
          </button>
        </div>
      </aside>

      {/* Content area */}
      <div className="flex min-h-screen w-full flex-col lg:ml-64">
        {/* Mobile top bar */}
        <div className="sticky top-0 z-20 flex items-center gap-3 border-b border-line bg-white px-4 py-3 dark:border-[#2a3832] dark:bg-[#1e2a26] lg:hidden">
          <button onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-ink hover:bg-gray-100 dark:hover:bg-[#22302a]"
            aria-label="Open sidebar">
            <Menu className="h-5 w-5" />
          </button>
          <span className="text-sm font-semibold text-ink dark:text-gray-100">Admin</span>
        </div>

        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
