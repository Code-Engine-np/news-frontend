"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NewsArticle } from "@/src/app/types";
import ArticleCard from "@/src/app/components/cards/ArticleCard";

interface CategorySectionProps {
  title: string;
  slug: string;
  articles: NewsArticle[];
}

const CategorySection = ({ title, slug, articles }: CategorySectionProps) => {
  if (articles.length === 0) return null;

  return (
    <section className="py-8" aria-label={`${title} news`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <Link
          href={`/category/${slug}`}
          className="flex items-center text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
        >
          View All
          <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
