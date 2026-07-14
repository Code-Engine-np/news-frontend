"use client";

import Link from "next/link";
import TrendingList from "./TrendingList";
import AdvertisementBanner from "./AdvertisementBanner";
import NewsletterForm from "./NewsletterForm";
import { NewsArticle } from "@/src/types";
import { ADVERTISEMENTS } from "@/src/lib/site";

interface SidebarProps {
  articles: NewsArticle[];
}

const Sidebar = ({ articles }: SidebarProps) => {
  const sidebarAds = ADVERTISEMENTS.filter((ad) => ad.position === "sidebar");

  return (
    <aside className="space-y-6" aria-label="Sidebar">
      {/* Latest News (Compact) */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Latest News</h3>
        <div className="space-y-4">
          {articles.slice(0, 4).map((article) => (
            <Link
              key={article.id}
              href={`/article/${article.slug}`}
              className="group block"
            >
              <div className="text-sm">
                <span
                  className={`inline-block ${article.category.color} text-white text-xs px-2 py-0.5 rounded-full mb-1`}
                >
                  {article.category.name}
                </span>
                <p className="font-medium text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-2">
                  {article.title}
                </p>
                <span className="text-xs text-gray-500 mt-1">
                  {new Date(article.publishedAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                  })}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {/* Trending List */}
      <TrendingList articles={articles} />

      {/* Advertisement */}
      {sidebarAds.map((ad) => (
        <AdvertisementBanner key={ad.id} advertisement={ad} />
      ))}

      {/* Newsletter */}
      <NewsletterForm />
    </aside>
  );
};

export default Sidebar;
