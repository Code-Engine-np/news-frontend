"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  /** For link-based navigation (category page) — returns the href for a given page number */
  buildHref?: (page: number) => string;
  /** For state-based navigation (admin) — called when a page is selected */
  onPageChange?: (page: number) => void;
}

function pageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "...")[] = [1];
  if (current > 3) pages.push("...");
  for (let p = Math.max(2, current - 1); p <= Math.min(total - 1, current + 1); p++) {
    pages.push(p);
  }
  if (current < total - 2) pages.push("...");
  pages.push(total);
  return pages;
}

export default function Pagination({ currentPage, totalPages, buildHref, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = pageNumbers(currentPage, totalPages);

  const btnBase =
    "inline-flex h-9 min-w-9 items-center justify-center rounded-lg border px-2 text-sm font-medium transition-colors";
  const btnActive =
    "border-primary bg-primary text-white";
  const btnIdle =
    "border-line bg-white text-ink hover:bg-gray-50 dark:border-[#2a3832] dark:bg-[#1e2a26] dark:text-gray-100 dark:hover:bg-[#22302a]";
  const btnDisabled =
    "border-line bg-white text-muted opacity-40 cursor-not-allowed dark:border-[#2a3832] dark:bg-[#1e2a26]";

  const renderPage = (page: number | "...", idx: number) => {
    if (page === "...") {
      return (
        <span key={`ellipsis-${idx}`} className={`${btnBase} ${btnIdle} cursor-default`}>
          …
        </span>
      );
    }
    const isActive = page === currentPage;
    if (buildHref) {
      return (
        <a key={page} href={buildHref(page)} className={`${btnBase} ${isActive ? btnActive : btnIdle}`}>
          {page}
        </a>
      );
    }
    return (
      <button
        key={page}
        type="button"
        onClick={() => onPageChange?.(page)}
        className={`${btnBase} ${isActive ? btnActive : btnIdle}`}
      >
        {page}
      </button>
    );
  };

  const prevDisabled = currentPage <= 1;
  const nextDisabled = currentPage >= totalPages;

  const renderNav = (direction: "prev" | "next") => {
    const targetPage = direction === "prev" ? currentPage - 1 : currentPage + 1;
    const disabled = direction === "prev" ? prevDisabled : nextDisabled;
    const icon = direction === "prev"
      ? <ChevronLeft className="h-4 w-4" />
      : <ChevronRight className="h-4 w-4" />;

    if (disabled) {
      return <span className={`${btnBase} ${btnDisabled}`}>{icon}</span>;
    }
    if (buildHref) {
      return (
        <a href={buildHref(targetPage)} className={`${btnBase} ${btnIdle}`}>
          {icon}
        </a>
      );
    }
    return (
      <button type="button" onClick={() => onPageChange?.(targetPage)} className={`${btnBase} ${btnIdle}`}>
        {icon}
      </button>
    );
  };

  return (
    <div className="flex items-center justify-center gap-1.5 py-4">
      {renderNav("prev")}
      {pages.map((p, i) => renderPage(p, i))}
      {renderNav("next")}
    </div>
  );
}
