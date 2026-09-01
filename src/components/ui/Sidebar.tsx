"use client";

import TrendingList from "./TrendingList";
import AdvertisementBanner from "./AdvertisementBanner";
import NewsletterForm from "./NewsletterForm";
import { NewsArticle } from "@/src/types";
import { useQuery } from "@tanstack/react-query";
import { queryKeys, queryFns } from "@/src/lib/queries";
import type { ApiAdvertisement } from "@/src/types";

interface SidebarProps {
  articles: NewsArticle[];
}

const Sidebar = ({ articles }: SidebarProps) => {
  const { data: bannerAds = [] } = useQuery<ApiAdvertisement[]>({
    queryKey: queryKeys.advertisements("banner"),
    queryFn: queryFns.advertisements("banner"),
    staleTime: 5 * 60 * 1000,
  });

  return (
    <aside className="space-y-6" aria-label="Sidebar">
      <TrendingList articles={articles} />

      {bannerAds.map((ad) => (
        <AdvertisementBanner key={ad.id} advertisement={ad} />
      ))}

      <NewsletterForm />
    </aside>
  );
};

export default Sidebar;
