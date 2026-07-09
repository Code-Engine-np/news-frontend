"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { CATEGORIES } from "@/src/lib/mock/data";
import { MAIN_NAV_ITEMS } from "@/src/lib/site";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div className="fixed inset-y-0 left-0 w-80 max-w-full bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <span className="text-lg font-bold text-gray-900">Menu</span>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-gray-600 hover:text-brand-600 hover:bg-gray-100 rounded-md transition-colors"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="p-4 space-y-1" aria-label="Mobile navigation">
          <ul className="space-y-1">
            {MAIN_NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="block px-4 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 hover:text-brand-600 rounded-lg transition-colors"
                  onClick={onClose}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="border-t border-gray-200 mt-4 pt-4">
            <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Categories
            </h3>
          </div>

          <ul className="space-y-1">
            {CATEGORIES.map((category) => (
              <li key={category.id}>
                <Link
                  href={`/category/${category.slug}`}
                  className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-brand-600 rounded-lg transition-colors"
                  onClick={onClose}
                >
                  <span
                    className={`w-2.5 h-2.5 rounded-full mr-3 ${category.color}`}
                    aria-hidden="true"
                  />
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="border-t border-gray-200 mt-4 pt-4">
            <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Quick Links
            </h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/trending"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-600 rounded-lg transition-colors"
                  onClick={onClose}
                >
                  Trending
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-600 rounded-lg transition-colors"
                  onClick={onClose}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-600 rounded-lg transition-colors"
                  onClick={onClose}
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-600 rounded-lg transition-colors"
                  onClick={onClose}
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default MobileMenu;
