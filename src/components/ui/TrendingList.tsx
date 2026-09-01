"use client";

import { TrendingUp, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/navigation";
import { NewsArticle } from "@/src/types";
import ArticleCard from "@/src/components/cards/ArticleCard";

interface TrendingListProps {
  articles: NewsArticle[];
  hideViewAll?: boolean;
}

const TrendingList = ({ articles, hideViewAll = false }: TrendingListProps) => {
  const t = useTranslations("TrendingList");
  if (articles.length === 0) return null;

  const trendingArticles = [...articles]
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, 5);

  return (
    <div className="bg-white dark:bg-[#1e2a26] rounded-2xl shadow-sm border border-gray-200 dark:border-[#2a3832] p-6">
      <div className="flex items-center space-x-2 mb-6">
        <TrendingUp className="h-5 w-5 text-brand-600" />
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{t("trendingNow")}</h3>
      </div>

      <div className="space-y-5">
        {trendingArticles.map((article, index) => (
          <div key={article.id} className="flex items-start space-x-3">
            <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 bg-gray-100 dark:bg-[#2a3832] text-brand-600 font-bold text-sm rounded-lg">
              {index + 1}
            </span>
            <div className="flex-1 min-w-0">
              <ArticleCard article={article} variant="compact" />
            </div>
          </div>
        ))}
      </div>

      {!hideViewAll && (
        <Link
          href="/trending"
          className="flex items-center justify-center mt-6 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
        >
          {t("viewAllTrending")}
          <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      )}
    </div>
  );
};

export default TrendingList;
