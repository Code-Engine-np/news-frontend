"use client";

import Link from "next/link";
import { CATEGORIES } from "@/app/lib/mock/data";

const Navigation = () => {
  return (
    <nav
      className="hidden lg:block bg-white border-b border-gray-200"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex items-center space-x-1 py-3 overflow-x-auto">
          <li>
            <Link
              href="/"
              className="text-sm font-medium text-brand-600 bg-brand-50 px-3 py-2 rounded-md transition-colors hover:bg-brand-100"
            >
              Home
            </Link>
          </li>
          {CATEGORIES.map((category) => (
            <li key={category.id}>
              <Link
                href={`/category/${category.slug}`}
                className="text-sm font-medium text-gray-700 hover:text-brand-600 hover:bg-gray-50 px-3 py-2 rounded-md transition-colors whitespace-nowrap"
              >
                {category.name}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/latest"
              className="text-sm font-medium text-gray-700 hover:text-brand-600 hover:bg-gray-50 px-3 py-2 rounded-md transition-colors"
            >
              Latest
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
