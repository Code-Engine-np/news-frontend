import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Link } from "@/src/i18n/navigation";
import ArticleCard from "@/src/components/cards/ArticleCard";
import NewsShell from "@/src/components/layout/NewsShell";
import TrendingList from "@/src/components/ui/TrendingList";
import Sidebar from "@/src/components/ui/Sidebar";
import { getTrendingArticles } from "@/src/lib/site";
import { mapApiArticleToNewsArticle } from "@/src/lib/api";
import type { NewsArticle } from "@/src/types";
import { getQueryClient } from "@/src/lib/query-client";
import { queryKeys, queryFns } from "@/src/lib/queries";

export const metadata: Metadata = {
  title: "Trending News | Best Khabar",
  description: "The most-read stories on Best Khabar right now.",
};

export default async function TrendingPage() {
  const queryClient = getQueryClient();
  const t = await getTranslations("Trending");

  let allArticles: NewsArticle[];
  try {
    await queryClient.prefetchQuery({
      queryKey: queryKeys.publishedArticles(),
      queryFn: queryFns.publishedArticles,
    });
    const apiArticles =
      queryClient.getQueryData<
        Awaited<ReturnType<typeof queryFns.publishedArticles>>
      >(queryKeys.publishedArticles()) ?? [];
    allArticles = apiArticles.map(mapApiArticleToNewsArticle);
  } catch {
    allArticles = [];
  }

  const trendingArticles = getTrendingArticles(allArticles, 8);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
    <NewsShell>
      <div className="mx-auto w-full max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-6">
        <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {t("livePopularity")}
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-ink sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-muted">
            {t("description")}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_352px] lg:items-start">
          <section className="space-y-6">
            <TrendingList articles={trendingArticles} />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {trendingArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            <div className="rounded-2xl border border-line bg-white p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    {t("keepReading")}
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-ink">
                    {t("jumpHome")}
                  </h2>
                </div>
                <Link href="/" className="text-sm font-semibold text-primary">
                  {t("home")}
                </Link>
              </div>
            </div>
          </section>

          <Sidebar articles={trendingArticles} />
        </div>
      </div>
    </NewsShell>
    </HydrationBoundary>
  );
}
