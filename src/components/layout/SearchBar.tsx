"use client";

import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/src/i18n/navigation";

/**
 * Header search. The icon toggles an inline popover with a text input;
 * submitting navigates to `/search?q=...` (locale-aware via next-intl's
 * router), where results are filtered by article title or slug.
 */
const SearchBar = () => {
  const t = useTranslations("Search");
  const tHeader = useTranslations("Header");
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
    setOpen(false);
    setQuery("");
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 w-10 items-center justify-center text-gray-900 dark:text-gray-100 transition-colors hover:text-brand-600"
        aria-label={open ? t("close") : tHeader("search")}
        aria-expanded={open}
      >
        {open ? <X className="h-6 w-6" /> : <Search className="h-6 w-6" />}
      </button>

      {open && (
        <form
          onSubmit={submit}
          className="absolute right-0 top-full z-50 mt-2 flex w-[calc(100vw-2rem)] items-center gap-2 rounded-lg border border-line bg-white p-2 shadow-xl dark:border-[#2a3832] dark:bg-[#1e2a26] sm:w-80"
        >
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("placeholder")}
            className="min-w-0 flex-1 rounded-md border border-line bg-transparent px-3 py-2 text-sm text-ink outline-none focus:border-primary dark:border-[#2a3832] dark:text-gray-100"
            aria-label={t("placeholder")}
          />
          <button
            type="submit"
            className="inline-flex shrink-0 items-center justify-center rounded-md bg-brand-600 px-3 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            {t("submit")}
          </button>
        </form>
      )}
    </div>
  );
};

export default SearchBar;
