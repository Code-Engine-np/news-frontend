"use client";

import Link from "next/link";
import { ChevronRight, X } from "lucide-react";
import { useState } from "react";
import { MAIN_NAV_ITEMS } from "@/src/lib/site";
import type { Category } from "@/src/types";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
}

const MobileMenu = ({ isOpen, onClose, categories }: MobileMenuProps) => {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  if (!isOpen) return null;

  const topLevel = categories.filter((c) => !c.parentId);
  const childrenOf = (parentId: string) =>
    categories.filter((c) => c.parentId === parentId);

  const toggle = (id: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

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
          <span className="text-lg font-bold text-gray-900 dark:text-gray-100">Menu</span>
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
                  className="block px-4 py-3 text-sm font-semibold text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-[#2a3832] hover:text-brand-600 rounded-lg transition-colors"
                  onClick={onClose}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {topLevel.length > 0 && (
            <div className="border-t border-gray-200 dark:border-[#2a3832] mt-4 pt-4">
              <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Categories
              </h3>
              <ul className="space-y-0.5">
                {topLevel.map((category) => {
                  const subs = childrenOf(category.id);
                  const isOpen = expanded.has(category.id);

                  return (
                    <li key={category.id}>
                      {subs.length > 0 ? (
                        <>
                          <button
                            type="button"
                            onClick={() => toggle(category.id)}
                            className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#2a3832] hover:text-brand-600 rounded-lg transition-colors"
                          >
                            <span className="flex items-center gap-2">
                              <span
                                className={`w-2.5 h-2.5 rounded-full ${category.color}`}
                                aria-hidden="true"
                              />
                              {category.name}
                            </span>
                            <ChevronRight
                              className={`h-4 w-4 shrink-0 transition-transform ${isOpen ? "rotate-90" : ""}`}
                            />
                          </button>

                          {isOpen && (
                            <ul className="ml-6 mt-0.5 space-y-0.5 border-l-2 border-gray-100 dark:border-[#2a3832] pl-3">
                              <li>
                                <Link
                                  href={`/category/${category.slug}`}
                                  className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-brand-600 rounded-md transition-colors"
                                  onClick={onClose}
                                >
                                  सबै हेर्नुहोस् →
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
                        </>
                      ) : (
                        <Link
                          href={`/category/${category.slug}`}
                          className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#2a3832] hover:text-brand-600 rounded-lg transition-colors"
                          onClick={onClose}
                        >
                          <span
                            className={`w-2.5 h-2.5 rounded-full mr-3 ${category.color}`}
                            aria-hidden="true"
                          />
                          {category.name}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          <div className="border-t border-gray-200 dark:border-[#2a3832] mt-4 pt-4">
            <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Quick Links
            </h3>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/trending"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#2a3832] hover:text-brand-600 rounded-lg transition-colors"
                  onClick={onClose}
                >
                  Trending
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#2a3832] hover:text-brand-600 rounded-lg transition-colors"
                  onClick={onClose}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#2a3832] hover:text-brand-600 rounded-lg transition-colors"
                  onClick={onClose}
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#2a3832] hover:text-brand-600 rounded-lg transition-colors"
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
