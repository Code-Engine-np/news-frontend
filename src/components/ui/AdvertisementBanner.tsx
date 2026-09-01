"use client";

import Image from "next/image";
import Link from "next/link";
import type { ApiAdvertisement } from "@/src/types";

interface AdvertisementBannerProps {
  advertisement: ApiAdvertisement;
}

const AdvertisementBanner = ({ advertisement }: AdvertisementBannerProps) => {
  const inner = (
    <div className="relative w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-[#22302a]">
      <span className="absolute left-2 top-2 z-10 rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white/80 bg-black/30">
        Ad
      </span>
      <Image
        src={advertisement.imageUrl}
        alt={advertisement.title}
        width={800}
        height={200}
        className="h-40 w-full object-cover"
        sizes="(max-width: 768px) 100vw, 352px"
      />
    </div>
  );

  if (advertisement.linkUrl) {
    return (
      <a
        href={advertisement.linkUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        aria-label={`Advertisement: ${advertisement.title}`}
        className="block"
      >
        {inner}
      </a>
    );
  }

  return <div aria-label={`Advertisement: ${advertisement.title}`}>{inner}</div>;
};

export default AdvertisementBanner;
