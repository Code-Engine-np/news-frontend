"use client";

import { NewsArticle } from "@/src/app/types";
import ArticleCard from "@/src/app/components/cards/ArticleCard";

interface HeroSectionProps {
  articles: NewsArticle[];
}

const HeroSection = ({ articles }: HeroSectionProps) => {
  if (articles.length === 0) return null;

  const featuredArticle = articles[0];
  const sideArticles = articles.slice(1, 3);

  return (
    <section className="py-6" aria-label="Featured news">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Main Featured Article */}
          <div className="lg:col-span-2">
            <ArticleCard article={featuredArticle} variant="featured" />
          </div>

          {/* Side Articles */}
          <div className="flex flex-col gap-4 lg:gap-6">
            {sideArticles.map((article) => (
              <div key={article.id} className="flex-1">
                <ArticleCard article={article} variant="horizontal" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
