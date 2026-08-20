import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { Link } from "@/src/i18n/navigation";
import type { NewsArticle } from "@/src/types";

interface CategoryNewsSectionProps {
  title: string;
  slug: string;
  articles: NewsArticle[];
  viewAllLabel: string;
}

export default function CategoryNewsSection({
  title,
  slug,
  articles,
  viewAllLabel,
}: CategoryNewsSectionProps) {
  if (articles.length === 0) return null;

  const [main, ...rest] = articles;
  const sideArticles = rest.slice(0, 4);

  return (
    <section
      className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm dark:border-[#2a3832] dark:bg-[#1e2a26]"
      aria-label={title}
    >
      {/* Green category header */}
      <div className="flex items-center justify-between bg-primary px-4 py-2">
        <Link
          href={`/category/${slug}`}
          className="text-sm font-bold uppercase tracking-wide text-white hover:text-white/80"
        >
          {title}
        </Link>
        <Link
          href={`/category/${slug}`}
          className="text-xs font-medium text-white/70 hover:text-white"
        >
          {viewAllLabel} ›
        </Link>
      </div>

      {/* Content grid: featured left + compact stack right */}
      <div className="grid grid-cols-1 divide-y divide-line dark:divide-[#2a3832] lg:grid-cols-[3fr_2fr] lg:divide-x lg:divide-y-0">
        {/* Featured article */}
        <Link href={`/article/${main.slug}`} className="group block p-3">
          {main.featuredImage && (
            <div className="relative mb-3 aspect-video overflow-hidden rounded-xl">
              <Image
                src={main.featuredImage}
                alt={main.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 58vw"
              />
            </div>
          )}
          <h3 className="line-clamp-3 text-sm font-bold leading-snug text-ink transition-colors group-hover:text-primary dark:text-gray-100 sm:text-base">
            {main.title}
          </h3>
          {main.excerpt && (
            <p className="mt-1.5 line-clamp-2 text-xs text-muted sm:text-sm">
              {main.excerpt}
            </p>
          )}
        </Link>

        {/* Compact article stack */}
        <div className="divide-y divide-line dark:divide-[#2a3832]">
          {sideArticles.map((article) => (
            <Link
              key={article.id}
              href={`/article/${article.slug}`}
              className="group flex gap-3 p-3 hover:bg-gray-50 dark:hover:bg-[#22302a]"
            >
              <div className="relative h-[60px] w-[90px] shrink-0 overflow-hidden">
                {article.featuredImage ? (
                  <Image
                    src={article.featuredImage}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="90px"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-[#2a3832]">
                    <ImageIcon className="h-4 w-4 text-gray-400" />
                  </div>
                )}
              </div>
              <h4 className="line-clamp-3 text-xs font-semibold leading-snug text-ink transition-colors group-hover:text-primary dark:text-gray-100 sm:text-sm">
                {article.title}
              </h4>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
