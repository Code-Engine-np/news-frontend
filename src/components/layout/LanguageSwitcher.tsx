"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/src/i18n/navigation";
import { routing, type Locale } from "@/src/i18n/routing";
import { ChevronDown, Languages } from "lucide-react";
import { useEffect, useRef, useState, useTransition } from "react";

/**
 * Locale switcher. `usePathname()` from next-intl returns the current path
 * WITHOUT the locale prefix, so `router.replace(pathname, { locale })` reloads
 * the same page in the chosen language (works for dynamic routes too).
 */
const LanguageSwitcher = () => {
  const locale = useLocale() as Locale;
  const t = useTranslations("Header");
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const labelFor = (l: Locale) => (l === "ne" ? t("nepali") : t("english"));

  const switchTo = (next: Locale) => {
    setOpen(false);
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        disabled={isPending}
        className="hidden items-center gap-2 rounded-[10px] bg-brand-600 px-3 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60 sm:inline-flex"
        aria-label={t("languageSelector")}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Languages className="h-4 w-4" />
        <span>{labelFor(locale)}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-50 mt-1 min-w-[140px] overflow-hidden rounded-lg border border-line bg-white shadow-xl dark:border-[#2a3832] dark:bg-[#1e2a26]"
        >
          {routing.locales.map((l) => (
            <li key={l}>
              <button
                type="button"
                role="option"
                aria-selected={l === locale}
                onClick={() => switchTo(l)}
                className={`block w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-gray-50 dark:hover:bg-[#2a3832] ${
                  l === locale
                    ? "font-semibold text-brand-600"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {labelFor(l)}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;
