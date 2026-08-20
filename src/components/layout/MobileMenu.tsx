"use client";

import {
  ChevronRight,
  Moon,
  Search,
  Sun,
  X,
} from "lucide-react";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/src/i18n/navigation";
import { routing, type Locale } from "@/src/i18n/routing";
import { MAIN_NAV_ITEMS } from "@/src/lib/site";
import { useTheme } from "@/src/app/context/ThemeContext";
import type { Category } from "@/src/types";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
}

const MobileMenu = ({ isOpen, onClose, categories }: MobileMenuProps) => {
  const t = useTranslations("MobileMenu");
  const tNav = useTranslations("Nav");
  const tSearch = useTranslations("Search");
  const tHeader = useTranslations("Header");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggle: toggleTheme } = useTheme();
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [query, setQuery] = useState("");

  if (!isOpen) return null;

  // Subcategories for a top-level nav item, derived by matching its slug to a
  // parent category and collecting that category's children.
  const childrenOfSlug = (slug: string) => {
    const parent = categories.find((c) => c.slug === slug);
    if (!parent) return [];
    return categories.filter((c) => c.parentId === parent.id);
  };

  const toggleExpanded = (slug: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
    setQuery("");
    onClose();
  };

  const switchLocale = (next: Locale) => {
    if (next !== locale) router.replace(pathname, { locale: next });
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div className="fixed inset-y-0 left-0 w-80 max-w-full bg-white dark:bg-[#1e2a26] shadow-xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-[#2a3832]">
          <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
            {t("menu")}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-gray-600 dark:text-gray-300 hover:text-brand-600 hover:bg-gray-100 dark:hover:bg-[#2a3832] rounded-md transition-colors"
            aria-label={t("closeMenu")}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="p-4 space-y-1" aria-label="Mobile navigation">
          {/* Search */}
          <form onSubmit={submitSearch} className="mb-3 flex items-center gap-2">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={tSearch("placeholder")}
              className="min-w-0 flex-1 rounded-lg border border-line bg-transparent px-3 py-2 text-sm text-ink outline-none focus:border-primary dark:border-[#2a3832] dark:text-gray-100"
              aria-label={tSearch("placeholder")}
            />
            <button
              type="submit"
              className="inline-flex shrink-0 items-center justify-center rounded-lg bg-brand-600 p-2.5 text-white transition-opacity hover:opacity-90"
              aria-label={tSearch("submit")}
            >
              <Search className="h-5 w-5" />
            </button>
          </form>

          {/* Primary navigation — single, fully-translated list. Category items
              with subcategories expand to show their children. */}
          <ul className="space-y-0.5">
            {MAIN_NAV_ITEMS.map((item) => {
              const slug = item.href.startsWith("/category/")
                ? item.href.replace("/category/", "")
                : null;
              const subs = slug ? childrenOfSlug(slug) : [];
              const isExpanded = slug ? expanded.has(slug) : false;

              if (subs.length > 0 && slug) {
                return (
                  <li key={item.key}>
                    <button
                      type="button"
                      onClick={() => toggleExpanded(slug)}
                      className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-[#2a3832] hover:text-brand-600 rounded-lg transition-colors"
                      aria-expanded={isExpanded}
                    >
                      <span>{tNav(item.key)}</span>
                      <ChevronRight
                        className={`h-4 w-4 shrink-0 transition-transform ${isExpanded ? "rotate-90" : ""}`}
                      />
                    </button>

                    {isExpanded && (
                      <ul className="ml-4 mt-0.5 space-y-0.5 border-l-2 border-gray-100 dark:border-[#2a3832] pl-3">
                        <li>
                          <Link
                            href={item.href}
                            className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-brand-600 rounded-md transition-colors"
                            onClick={onClose}
                          >
                            {t("viewAll")} →
                          </Link>
                        </li>
                        {subs.map((sub) => (
                          <li key={sub.id}>
                            <Link
                              href={`/category/${sub.slug}`}
                              className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-brand-600 rounded-md transition-colors"
                              onClick={onClose}
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              }

              return (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="block px-4 py-3 text-sm font-semibold text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-[#2a3832] hover:text-brand-600 rounded-lg transition-colors"
                    onClick={onClose}
                  >
                    {tNav(item.key)}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Quick links */}
          <div className="border-t border-gray-200 dark:border-[#2a3832] mt-4 pt-4">
            <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              {t("quickLinks")}
            </h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/about"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#2a3832] hover:text-brand-600 rounded-lg transition-colors"
                  onClick={onClose}
                >
                  {t("aboutUs")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#2a3832] hover:text-brand-600 rounded-lg transition-colors"
                  onClick={onClose}
                >
                  {t("contactUs")}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#2a3832] hover:text-brand-600 rounded-lg transition-colors"
                  onClick={onClose}
                >
                  {t("privacyPolicy")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Theme + language controls (both hidden from the header on mobile) */}
          <div className="border-t border-gray-200 dark:border-[#2a3832] mt-4 pt-4 space-y-3">
            <button
              type="button"
              onClick={toggleTheme}
              className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#2a3832] rounded-lg transition-colors"
              aria-label={tHeader("toggleTheme")}
            >
              <span>{t("theme")}</span>
              <span className="flex items-center gap-2 text-brand-600">
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
                {theme === "dark" ? t("lightMode") : t("darkMode")}
              </span>
            </button>

            <div className="px-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                {t("language")}
              </p>
              <div className="flex gap-2">
                {routing.locales.map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => switchLocale(l)}
                    aria-pressed={l === locale}
                    className={`flex-1 rounded-lg border px-3 py-2 text-sm font-semibold transition-colors ${
                      l === locale
                        ? "border-brand-600 bg-brand-600 text-white"
                        : "border-line text-gray-700 dark:border-[#2a3832] dark:text-gray-300 hover:border-brand-600"
                    }`}
                  >
                    {l === "ne" ? tHeader("nepali") : tHeader("english")}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default MobileMenu;
