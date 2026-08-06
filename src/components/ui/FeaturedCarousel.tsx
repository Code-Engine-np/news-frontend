"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ApiFeaturedImage } from "@/src/types";

const INTERVAL_MS = 4000;

interface FeaturedCarouselProps {
  slides: ApiFeaturedImage[];
}

export default function FeaturedCarousel({ slides }: FeaturedCarouselProps) {
  const [active, setActive] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const pausedRef = useRef(false);
  const total = slides.length;

  const advance = useCallback(
    () => !pausedRef.current && setActive((i) => (i + 1) % total),
    [total],
  );

  const startTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(advance, INTERVAL_MS);
  }, [advance]);

  const stopTimer = useCallback(() => {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
  }, []);

  useEffect(() => { startTimer(); return stopTimer; }, [startTimer, stopTimer]);

  const go = (index: number) => {
    setActive(((index % total) + total) % total);
    startTimer();
  };

  if (total === 0) return null;

  return (
    <div
      className="relative mt-6 overflow-hidden rounded-2xl"
      onMouseEnter={() => { pausedRef.current = true; stopTimer(); }}
      onMouseLeave={() => { pausedRef.current = false; startTimer(); }}
      onTouchStart={() => { pausedRef.current = true; stopTimer(); }}
      onTouchEnd={() => { pausedRef.current = false; startTimer(); }}
    >
      {/* Slide track */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${active * 100}%)` }}
      >
        {slides.map((slide) => {
          const inner = (
            <div className="relative h-[220px] w-full shrink-0 sm:h-[320px] lg:h-[420px]">
              <Image
                src={slide.imageUrl}
                alt={slide.caption ?? "Featured image"}
                fill
                sizes="(max-width: 768px) 100vw, 1200px"
                className="object-cover"
                priority
              />
              {/* Caption overlay */}
              {slide.caption && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-5 pb-5 pt-10">
                  <p className="text-sm font-semibold leading-snug text-white drop-shadow sm:text-base">
                    {slide.caption}
                  </p>
                </div>
              )}
            </div>
          );

          return slide.linkUrl ? (
            <a
              key={slide.id}
              href={slide.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full shrink-0"
            >
              {inner}
            </a>
          ) : (
            <div key={slide.id} className="w-full shrink-0">
              {inner}
            </div>
          );
        })}
      </div>

      {/* Prev arrow */}
      <button
        type="button"
        onClick={() => go(active - 1)}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Next arrow */}
      <button
        type="button"
        onClick={() => go(active + 1)}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => go(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === active
                ? "w-6 bg-white"
                : "w-1.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <span className="absolute right-3 bottom-3 rounded-full bg-black/40 px-2.5 py-0.5 text-xs font-semibold text-white backdrop-blur-sm">
        {active + 1} / {total}
      </span>
    </div>
  );
}
