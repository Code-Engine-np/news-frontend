"use client";

import Image from "next/image";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/navigation";
import MobileMenu from "./MobileMenu";
import LanguageSwitcher from "./LanguageSwitcher";
import SearchBar from "./SearchBar";
import type { ApiAdvertisement, Category } from "@/src/types";
import { useTheme } from "@/src/app/context/ThemeContext";
import AdBanner from "@/src/components/ui/AdBanner";
import { useQuery } from "@tanstack/react-query";
import { queryKeys, queryFns } from "@/src/lib/queries";

interface HeaderProps {
  categories: Category[];
}

const Header = ({ categories }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const t = useTranslations("Header");

  const { data: bannerAds = [] } = useQuery<ApiAdvertisement[]>({
    queryKey: queryKeys.advertisements("banner"),
    queryFn: queryFns.advertisements("banner"),
    staleTime: 5 * 60 * 1000,
  });

  const getAd = (index: number): ApiAdvertisement | undefined =>
    bannerAds.length > 0 ? bannerAds[index % bannerAds.length] : undefined;

  return (
    <header className="bg-white dark:bg-[#1e2a26] dark:border-b dark:border-[#2a3832]">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-0 lg:py-6">
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="inline-flex items-center justify-center lg:hidden"
          aria-label={t("toggleMenu")}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <X className="h-7 w-7 text-gray-900" />
          ) : (
            <Menu className="h-7 w-7 text-gray-900" />
          )}
        </button>

        <Link href="/" className="flex-1 lg:flex-none lg:flex-shrink-0">
          <div className="relative h-[46px] w-full sm:h-[58px] sm:w-[240px] lg:h-[62px] lg:w-[270px]">
            <Image
              src="/best-khabar-green1.png"
              alt="Best Khabar"
              fill
              className="object-contain object-left"
              priority
              sizes="(max-width: 640px) 180px, (max-width: 1024px) 240px, 270px"
            />
          </div>
        </Link>
        <div className="hidden lg:block lg:flex-1 lg:px-6">
          {getAd(0) ? (
            <AdBanner ad={getAd(0)!} />
          ) : (
            <div className="rounded-2xl border border-dashed border-line bg-white px-4 py-5 text-center dark:border-[#2a3832] dark:bg-[#1e2a26]">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted">
                {t("adLabel")}
              </p>
              <p className="mt-1 text-lg font-bold text-ink dark:text-gray-200">
                {t("advertiseHere")}
              </p>
              <p className="mt-1 text-xs text-muted">
                {t("advertiseSubtitle")}
              </p>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
          <LanguageSwitcher />

          <SearchBar />

          <button
            type="button"
            onClick={toggle}
            className="hidden h-10 w-10 items-center justify-center text-gray-900 dark:text-gray-100 transition-colors hover:text-brand-600 sm:inline-flex"
            aria-label={t("toggleTheme")}
          >
            {theme === "dark" ? (
              <Sun className="h-6 w-6" />
            ) : (
              <Moon className="h-6 w-6" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="hidden h-10 w-10 items-center justify-center text-gray-900 transition-colors hover:text-brand-600 lg:inline-flex"
            aria-label={t("toggleMenu")}
            aria-expanded={isMobileMenuOpen}
          >
            <Menu className="h-7 w-7" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        categories={categories}
      />
    </header>
  );
};

export default Header;
