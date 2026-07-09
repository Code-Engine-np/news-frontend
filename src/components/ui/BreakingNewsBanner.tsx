"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Zap } from "lucide-react";
import { BREAKING_NEWS } from "@/src/lib/mock/data";

interface BreakingNewsBannerProps {
  items?: string[];
}

const BreakingNewsBanner = ({
  items = BREAKING_NEWS,
}: BreakingNewsBannerProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (items.length < 2) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [items.length]);

  const activeItem = items[activeIndex] ?? "";

  const goToPrevious = () => {
    setActiveIndex((current) => (current - 1 + items.length) % items.length);
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % items.length);
  };

  return (
    <div className="overflow-hidden rounded-[10px] bg-[#ededed] text-black">
      <div className="flex items-center gap-4 px-4 py-2 sm:gap-8 sm:px-4">
        <div className="flex shrink-0 items-center gap-2 text-[#f15a24]">
          <Zap className="h-6 w-6 fill-current" aria-hidden="true" />
          <span className="whitespace-nowrap font-bold text-[18px] leading-none sm:text-[20px] lg:text-[24px]">
            Breaking News
          </span>
        </div>

        <div className="min-w-0 flex-1 overflow-hidden">
          <p className="truncate font-(family-name:--font-inter) text-[18px] text-black/70 sm:text-[20px] lg:text-[24px]">
            {activeItem}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-3 text-black">
          <button
            type="button"
            onClick={goToPrevious}
            aria-label="Previous breaking news"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={goToNext}
            aria-label="Next breaking news"
          >
            <ChevronRight
              className="h-5 w-5 sm:h-6 sm:w-6"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BreakingNewsBanner;
