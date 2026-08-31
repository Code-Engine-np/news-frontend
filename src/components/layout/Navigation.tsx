"use client";

import { useState, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/navigation";
import { MAIN_NAV_ITEMS } from "@/src/lib/site";

const Navigation = () => {
  const t = useTranslations("Nav");
  const [dropdown, setDropdown] = useState<{ key: string; top: number; left: number } | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const openMenu = (key: string, trigger: HTMLElement) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    const rect = trigger.getBoundingClientRect();
    setDropdown({ key, top: rect.bottom + window.scrollY, left: rect.left });
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
                <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 3 2 11h3v10h6v-6h2v6h6V11h3L12 3z" />
                </svg>
              </Link>

              {MAIN_NAV_ITEMS.map((item) => {
                const subs = item.children ?? [];
                const isOpen = dropdown?.key === item.key;

                return (
                  <div
                    key={item.key}
                    onMouseEnter={(e) => {
                      if (subs.length > 0) openMenu(item.key, e.currentTarget);
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

      {mounted &&
        dropdown &&
        (() => {
          const item = MAIN_NAV_ITEMS.find((i) => i.key === dropdown.key);
          const subs = item?.children ?? [];
          if (!item || subs.length === 0) return null;

          return createPortal(
            <div
              style={{ position: "absolute", top: dropdown.top, left: dropdown.left, zIndex: 9999 }}
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
            >
              <div className="mt-1 min-w-[200px] overflow-hidden rounded-xl border border-white/20 bg-primary-bright shadow-xl">
                <Link
                  href={item.href}
                  className="block border-b border-white/10 px-4 py-2.5 text-sm font-semibold text-white/70 hover:bg-white/10 hover:text-white"
                  onClick={() => setDropdown(null)}
                >
                  {t("viewAll")}
                </Link>
                {subs.map((child) => (
                  <Link
                    key={child.key}
                    href={child.href}
                    className="block px-4 py-2.5 text-[15px] font-bold text-white hover:bg-white/10"
                    onClick={() => setDropdown(null)}
                  >
                    {t(child.key)}
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
