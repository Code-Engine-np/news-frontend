"use client";

import Image from "next/image";
import Link from "next/link";
import { Advertisement } from "@/app/types";

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
          className={`relative w-full ${sizeClasses[advertisement.size]} flex items-center justify-center`}
        >
          <Image
            src={advertisement.imageUrl}
            alt={advertisement.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 300px"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <span className="text-white font-medium text-sm">Advertisement</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AdvertisementBanner;
