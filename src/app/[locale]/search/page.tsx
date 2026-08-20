import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import NewsShell from "@/src/components/layout/NewsShell";
import ArticleCard from "@/src/components/cards/ArticleCard";
import {
  getPublishedArticles,
  mapApiArticleToNewsArticle,
} from "@/src/lib/api";
import type { NewsArticle } from "@/src/types";

export const metadata: Metadata = {
  title: "Search | Best Khabar",
  description: "Search articles by title or slug on Best Khabar.",
};

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const t = await getTranslations("Search");
  const query = (q ?? "").trim();

  let results: NewsArticle[] = [];
  if (query) {
    try {
      const apiArticles = await getPublishedArticles();
      const needle = query.toLowerCase();
      results = apiArticles
        .map(mapApiArticleToNewsArticle)
        .filter(
          (article) =>
            article.title.toLowerCase().includes(needle) ||
            article.slug.toLowerCase().includes(needle),
        );
    } catch {
      results = [];
    }
  }

  return (
    <NewsShell>
      <div className="mx-auto w-full max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-6">
        <div className="rounded-2xl border border-line dark:border-[#2a3832] bg-white dark:bg-[#1e2a26] p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {t("heading")}
          </p>
          {query ? (
            <>
              <h1 className="mt-2 text-3xl font-extrabold text-ink sm:text-4xl">
                {t("resultsFor", { query })}
              </h1>
              <p className="mt-2 text-muted">
                {t("count", { count: results.length })}
              </p>
            </>
          ) : (
            <p className="mt-2 text-base leading-7 text-muted">{t("noQuery")}</p>
          )}
        </div>

        {query && results.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-line dark:border-[#2a3832] bg-white dark:bg-[#1e2a26] p-12 text-center text-muted shadow-sm">
            {t("noResults")}
          </div>
        ) : results.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : null}
      </div>
    </NewsShell>
  );
}
