"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import type { NewsArticle } from "@/src/types";

const INTERVAL_MS = 3500;

interface ArticleCarouselProps {
  articles: NewsArticle[];
  title?: string;
}

export default function ArticleCarousel({
  articles,
  title = "ताजा समाचार",
}: ArticleCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pausedRef = useRef(false);
  const total = articles.length;

  const go = useCallback(
    (index: number) => setActiveIndex(((index % total) + total) % total),
    [total],
  );

  const advance = useCallback(() => {
    if (!pausedRef.current) setActiveIndex((i) => (i + 1) % total);
  }, [total]);

  const startTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(advance, INTERVAL_MS);
  }, [advance]);

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    startTimer();
    return stopTimer;
  }, [startTimer, stopTimer]);

  const manualGo = (index: number) => {
    go(index);
    startTimer(); // reset the interval so it doesn't jump immediately after
  };

  if (total === 0) return null;

  return (
    <section className="mt-8">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="font-(family-name:--font-sans) text-2xl font-bold text-ink sm:text-[28px]">
          {title}
        </h2>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => manualGo(activeIndex - 1)}
            aria-label="Previous article"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-ink shadow-sm transition-colors hover:border-primary hover:text-primary dark:border-[#2a3832] dark:bg-[#1e2a26] dark:hover:border-primary"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => manualGo(activeIndex + 1)}
            aria-label="Next article"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-ink shadow-sm transition-colors hover:border-primary hover:text-primary dark:border-[#2a3832] dark:bg-[#1e2a26] dark:hover:border-primary"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Slide viewport — overflow hidden clips all cards except the active one */}
      <div
        className="overflow-hidden rounded-2xl"
        onMouseEnter={() => { pausedRef.current = true; stopTimer(); }}
        onMouseLeave={() => { pausedRef.current = false; startTimer(); }}
        onTouchStart={() => { pausedRef.current = true; stopTimer(); }}
        onTouchEnd={() => { pausedRef.current = false; startTimer(); }}
      >
        {/* Track — all cards laid out side-by-side, shifted by activeIndex */}
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/article/${article.slug}`}
              className="group flex w-full shrink-0 flex-col overflow-hidden border border-line bg-white dark:border-[#2a3832] dark:bg-[#1e2a26]"
            >
              {/* Image */}
              <div className="relative h-56 bg-gray-100 dark:bg-[#243029] sm:h-72">
                {article.featuredImage ? (
                  <Image
                    src={article.featuredImage}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <ImageIcon className="h-12 w-12 text-gray-300" />
                  </div>
                )}
                <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                  {article.category.name}
                </span>
              </div>

              {/* Text */}
              <div className="p-5">
                <h3 className="line-clamp-2 text-lg font-bold leading-snug text-ink transition-colors group-hover:text-primary dark:text-gray-100 sm:text-xl">
                  {article.title}
                </h3>
                {article.excerpt && (
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted dark:text-gray-400">
                    {article.excerpt}
                  </p>
                )}
                <p className="mt-3 text-xs text-muted dark:text-gray-500">
                  {article.author.fullName}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="mt-3 flex items-center justify-center gap-1.5">
        {articles.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => manualGo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? "w-6 bg-primary"
                : "w-1.5 bg-gray-300 hover:bg-primary/50 dark:bg-[#2a3832]"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
