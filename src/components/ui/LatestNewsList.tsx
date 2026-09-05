import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { Link } from "@/src/i18n/navigation";
import type { NewsArticle } from "@/src/types";

interface LatestNewsListProps {
  articles: NewsArticle[];
  title: string;
  viewAllHref?: string;
  viewAllLabel?: string;
}

export default function LatestNewsList({ articles, title, viewAllHref, viewAllLabel }: LatestNewsListProps) {
  if (articles.length === 0) return null;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white dark:border-[#2a3832] dark:bg-[#1e2a26]">
      <div className="shrink-0 bg-primary px-4 py-2">
        <h3 className="text-sm font-bold uppercase tracking-wide text-white">{title}</h3>
      </div>
      <div className="flex-1 divide-y divide-line overflow-y-auto dark:divide-[#2a3832]">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/article/${article.slug}`}
            className="group flex gap-3 p-3 hover:bg-gray-50 dark:hover:bg-[#22302a]"
          >
            <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg">
              {article.featuredImage ? (
                <Image
                  src={article.featuredImage}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="96px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-[#2a3832]">
                  <ImageIcon className="h-5 w-5 text-gray-400" />
                </div>
              )}
            </div>
            <div className="min-w-0">
              <h4 className="line-clamp-2 text-xs font-semibold leading-snug text-ink transition-colors group-hover:text-primary dark:text-gray-100 sm:text-sm">
                {article.title}
              </h4>
              <span className="mt-1.5 inline-block rounded bg-primary px-1.5 py-0.5 text-[10px] font-bold text-white">
                {article.category.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="shrink-0 border-t border-line py-2.5 text-center text-xs font-semibold text-primary hover:bg-gray-50 dark:border-[#2a3832] dark:hover:bg-[#22302a]"
        >
          {viewAllLabel ?? "View All"} →
        </Link>
      )}
    </div>
  );
}
