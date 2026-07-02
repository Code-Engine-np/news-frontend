"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Languages, Menu, Moon, Search, X } from "lucide-react";
import { useState } from "react";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-5 sm:px-6 lg:px-0 lg:py-6">
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="inline-flex items-center justify-center lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <X className="h-7 w-7 text-gray-900" />
          ) : (
            <Menu className="h-7 w-7 text-gray-900" />
          )}
        </button>

        <Link href="/" className="flex-shrink-0">
          <div className="relative h-[52px] w-[210px] sm:h-[58px] sm:w-[240px] lg:h-[62px] lg:w-[270px]">
            <Image
              src="/best-khabar-green1.png"
              alt="Best Khabar"
              fill
              className="object-contain object-left"
              priority
              sizes="(max-width: 640px) 210px, (max-width: 1024px) 240px, 270px"
            />
          </div>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
          <button
            type="button"
            className="hidden items-center gap-2 bg-brand-600 px-3 py-2 text-sm font-semibold text-white sm:inline-flex"
            aria-label="Language selector"
          >
            <Languages className="h-4 w-4" />
            <span>Nepali</span>
            <ChevronDown className="h-4 w-4" />
          </button>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center text-gray-900 transition-colors hover:text-brand-600"
            aria-label="Search"
          >
            <Search className="h-6 w-6" />
          </button>

          <button
            type="button"
            className="hidden h-10 w-10 items-center justify-center text-gray-900 transition-colors hover:text-brand-600 sm:inline-flex"
            aria-label="Toggle theme"
          >
            <Moon className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="hidden h-10 w-10 items-center justify-center text-gray-900 transition-colors hover:text-brand-600 lg:inline-flex"
            aria-label="Toggle menu"
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
      />
    </header>
  );
};

export default Header;
