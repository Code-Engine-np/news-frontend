"use client";

import Image from "next/image";
import Link from "next/link";
import { NewsArticle } from "@/app/types";
import { Calendar, Clock } from "lucide-react";

interface ArticleCardProps {
  article: NewsArticle;
  variant?: "default" | "compact" | "horizontal" | "featured";
}

const ArticleCard = ({ article, variant = "default" }: ArticleCardProps) => {
  const { title, excerpt, featuredImage, category, author, publishedAt, slug } = article;

  const formattedDate = new Date(publishedAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  // Compact variant (small, no excerpt)
  if (variant === "compact") {
    return (
      <Link href={`/article/${slug}`} className="group block">
        <article className="flex items-start space-x-3">
          <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg">
            <Image
              src={featuredImage}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="80px"
            />
          </div>
          <div className="flex-1 min-w-0">
            <span className={"text-xs font-medium text-brand-600 "}>
              {category.name}
            </span>
            <h3 className="mt-1 text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-brand-600 transition-colors">
              {title}
            </h3>
            <div className="mt-1 flex items-center text-xs text-gray-500">
              <Calendar className="h-3 w-3 mr-1" />
              {formattedDate}
            </div>
          </div>
        </article>
      </Link>
    );
  }

  // Horizontal variant (medium image on left)
  if (variant === "horizontal") {
    return (
      <Link href={`/article/${slug}`} className="group block">
        <article className="flex items-start space-x-4">
          <div className="relative w-32 h-24 sm:w-40 sm:h-28 flex-shrink-0 overflow-hidden rounded-lg">
            <Image
              src={featuredImage}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 128px, 160px"
            />
          </div>
          <div className="flex-1 min-w-0">
            <span
              className={`inline-block ${category.color} text-white text-xs px-2 py-0.5 rounded-full`}
            >
              {category.name}
            </span>
            <h3 className="mt-2 text-base font-semibold text-gray-900 line-clamp-2 group-hover:text-brand-600 transition-colors">
              {title}
            </h3>
            <p className="mt-1 text-sm text-gray-600 line-clamp-2 hidden sm:block">
              {excerpt}
            </p>
            <div className="mt-2 flex items-center text-xs text-gray-500 space-x-3">
              <span className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {formattedDate}
              </span>
              <span>{author.name}</span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  // Featured variant (large, hero style)
  if (variant === "featured") {
    return (
      <Link href={`/article/${slug}`} className="group block h-full">
        <article className="relative h-full min-h-[300px] sm:min-h-[400px] rounded-2xl overflow-hidden">
          <Image
            src={featuredImage}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 800px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
            <span
              className={`inline-block ${category.color} text-white text-xs font-medium px-3 py-1 rounded-full`}
            >
              {category.name}
            </span>
            <h2 className="mt-3 text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-tight group-hover:text-brand-300 transition-colors">
              {title}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-200 line-clamp-2">
              {excerpt}
            </p>
            <div className="mt-3 flex items-center text-xs sm:text-sm text-gray-300 space-x-3">
              <span className="flex items-center">
                <Calendar className="h-3.5 w-3.5 mr-1" />
                {formattedDate}
              </span>
              <span className="flex items-center">
                <Clock className="h-3.5 w-3.5 mr-1" />
                {author.name}
              </span>
            </div>
          </div>
        </article>
      </Link>
    );
  }

  // Default variant (vertical card)
  return (
    <Link href={`/article/${slug}`} className="group block h-full">
      <article className="flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={featuredImage}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <span
            className={`absolute top-3 left-3 ${category.color} text-white text-xs font-medium px-2.5 py-1 rounded-full`}
          >
            {category.name}
          </span>
        </div>
        <div className="flex-1 p-4">
          <h3 className="text-base font-semibold text-gray-900 line-clamp-2 group-hover:text-brand-600 transition-colors">
            {title}
          </h3>
          <p className="mt-2 text-sm text-gray-600 line-clamp-2">{excerpt}</p>
          <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
            <span className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {formattedDate}
            </span>
            <span>{author.name}</span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ArticleCard;
