"use client";

import { ChevronLeft, ChevronRight, Zap } from "lucide-react";

const BreakingNewsBanner = () => {
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
          <p className="truncate font-[family-name:var(--font-inter)] text-[18px] text-black/70 sm:text-[20px] lg:text-[24px]">
            Some Big is happening in Nepali politics
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-3 text-black">
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
};

export default BreakingNewsBanner;
