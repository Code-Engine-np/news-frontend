"use client";

import { useState, useRef, useCallback, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/navigation";
import { MAIN_NAV_ITEMS } from "@/src/lib/site";
import type { Category } from "@/src/types";

interface NavigationProps {
  categories: Category[];
}

interface DropdownState {
  slug: string;
  top: number;
  left: number;
}

const Navigation = ({ categories }: NavigationProps) => {
  const t = useTranslations("Nav");
  const [dropdown, setDropdown] = useState<DropdownState | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // false on the server, true on the client — avoids SSR mismatch for the portal
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const childrenOf = useCallback(
    (slug: string) => {
      const parent = categories.find((c) => c.slug === slug);
      if (!parent) return [];
      return categories.filter((c) => c.parentId === parent.id);
    },
    [categories],
  );

  const openMenu = (slug: string, trigger: HTMLElement) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    const rect = trigger.getBoundingClientRect();
    setDropdown({ slug, top: rect.bottom + window.scrollY, left: rect.left });
  };

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setDropdown(null), 120);
  };

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  return (
    <>
      <nav aria-label="Main navigation">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-0">
          <div className="overflow-x-auto pb-2">
            <div className="flex min-w-max items-center gap-2 rounded-[10px] bg-primary-bright px-3 py-2 shadow-[0_2px_5px_rgba(0,0,0,0.25)]">
              <Link
                href="/"
                className="inline-flex h-[56px] w-[56px] items-center justify-center rounded-[10px] bg-[#f15a24] text-white transition-transform hover:scale-[1.02]"
                aria-label={t("homeAria")}
              >
                <span className="sr-only">{t("homeAria")}</span>
                <svg
                  className="h-7 w-7"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 3 2 11h3v10h6v-6h2v6h6V11h3L12 3z" />
                </svg>
              </Link>

              {MAIN_NAV_ITEMS.map((item) => {
                const slug = item.href.startsWith("/category/")
                  ? item.href.replace("/category/", "")
                  : null;
                const subs = slug ? childrenOf(slug) : [];
                const isOpen = slug !== null && dropdown?.slug === slug;

                return (
                  <div
                    key={item.key}
                    onMouseEnter={(e) => {
                      if (slug && subs.length > 0)
                        openMenu(slug, e.currentTarget);
                    }}
                    onMouseLeave={scheduleClose}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center gap-1 whitespace-nowrap px-4 py-3 text-[18px] font-bold leading-none text-white transition-opacity hover:opacity-90 lg:text-[20px]"
                    >
                      {t(item.key)}
                      {subs.length > 0 && (
                        <ChevronDown
                          className={`h-4 w-4 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                        />
                      )}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Portal: renders outside overflow containers so the dropdown is never clipped */}
      {mounted &&
        dropdown &&
        (() => {
          const slug = dropdown.slug;
          const navItem = MAIN_NAV_ITEMS.find(
            (i) => i.href === `/category/${slug}`,
          );
          const subs = childrenOf(slug);
          if (!navItem || subs.length === 0) return null;

          return createPortal(
            <div
              style={{
                position: "absolute",
                top: dropdown.top,
                left: dropdown.left,
                zIndex: 9999,
              }}
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
            >
              <div className="mt-1 min-w-[180px] overflow-hidden rounded-xl border border-white/20 bg-primary-bright shadow-xl">
                <Link
                  href={navItem.href}
                  className="block border-b border-white/10 px-4 py-2.5 text-sm font-semibold text-white/70 hover:bg-white/10 hover:text-white"
                  onClick={() => setDropdown(null)}
                >
                  {t("viewAll")}
                </Link>
                {subs.map((sub) => (
                  <Link
                    key={sub.id}
                    href={`/category/${sub.slug}`}
                    className="block px-4 py-2.5 text-[15px] font-bold text-white hover:bg-white/10"
                    onClick={() => setDropdown(null)}
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
            </div>,
            document.body,
          );
        })()}
    </>
  );
};

export default Navigation;
