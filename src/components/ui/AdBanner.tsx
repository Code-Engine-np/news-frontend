import Image from "next/image";
import type { ApiAdvertisement } from "@/src/types";

interface AdBannerProps {
  ad: ApiAdvertisement;
}

export default function AdBanner({ ad }: AdBannerProps) {
  const img = (
    <Image
      src={ad.imageUrl}
      alt={ad.title}
      width={1200}
      height={90}
      className="h-auto max-h-28 w-full object-cover"
    />
  );
  return ad.linkUrl ? (
    <a
      href={ad.linkUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block overflow-hidden rounded-xl border border-line dark:border-[#2a3832]"
    >
      {img}
    </a>
  ) : (
    <div className="overflow-hidden rounded-xl border border-line dark:border-[#2a3832]">{img}</div>
  );
}
