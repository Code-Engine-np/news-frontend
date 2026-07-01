"use client";

import { Volume2 } from "lucide-react";
import { BREAKING_NEWS } from "@/app/lib/mock/data";

const BreakingNewsBanner = () => {
  const marqueeContent = [...BREAKING_NEWS, ...BREAKING_NEWS]
    .map((text) => `• ${text}`)
    .join("   ");

  return (
    <div className="bg-red-600 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center">
        {/* Breaking label */}
        <div className="flex-shrink-0 flex items-center space-x-2 px-4 py-2 bg-red-700">
          <Volume2 className="h-4 w-4 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider whitespace-nowrap">
            Breaking News
          </span>
        </div>

        {/* Scrolling text */}
        <div className="flex-1 overflow-hidden relative">
          <div className="animate-marquee whitespace-nowrap py-2 text-sm">
            {marqueeContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreakingNewsBanner;
