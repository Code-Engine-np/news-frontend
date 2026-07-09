"use client";

import { MAIN_NAV_ITEMS } from "@/src/lib/site";
import Link from "next/link";

const Navigation = () => {
  return (
    <nav aria-label="Main navigation">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-0">
        <div className="overflow-x-auto pb-2">
          <div className="flex min-w-max items-center gap-2 rounded-[10px] bg-primary-bright px-3 py-2 shadow-[0_2px_5px_rgba(0,0,0,0.25)]">
            <Link
              href="/"
              className="inline-flex h-[56px] w-[56px] items-center justify-center rounded-[10px] bg-[#f15a24] text-white transition-transform hover:scale-[1.02]"
              aria-label="Home"
            >
              <span className="sr-only">Home</span>
              <svg
                className="h-7 w-7"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 3 2 11h3v10h6v-6h2v6h6V11h3L12 3z" />
              </svg>
            </Link>

            {MAIN_NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="whitespace-nowrap px-4 py-3 text-[18px] font-bold leading-none text-white transition-opacity hover:opacity-90 lg:text-[20px]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
