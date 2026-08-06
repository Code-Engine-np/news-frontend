"use client";

import Link from "next/link";
import { Advertisement } from "@/src/types";

interface AdvertisementBannerProps {
  advertisement: Advertisement;
}

const AdvertisementBanner = ({ advertisement }: AdvertisementBannerProps) => {
  const sizeClasses = {
    small: "h-32",
    medium: "h-64",
    large: "h-96",
    "full-width": "h-24 sm:h-32",
  };

  return (
    <div className="bg-gray-100 rounded-2xl overflow-hidden">
      <Link
        href={advertisement.linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative w-full"
        aria-label={`Advertisement: ${advertisement.title}`}
      >
        <div
          className={`relative w-full ${sizeClasses[advertisement.size]} flex flex-col items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300`}
        >
          <span className="text-sm font-semibold text-gray-500">
            Advertisement
          </span>
          <span className="mt-1 text-xs text-gray-400">
            {advertisement.title}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default AdvertisementBanner;
