import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/src/i18n/navigation";
import NewsShell from "@/src/components/layout/NewsShell";
import BreakingNewsBanner from "@/src/components/ui/BreakingNewsBanner";
import ArticleCard from "@/src/components/cards/ArticleCard";
import FeaturedCarousel from "@/src/components/ui/FeaturedCarousel";
import Sidebar from "@/src/components/ui/Sidebar";
import {
  getPublishedArticles,
  mapApiArticleToNewsArticle,
} from "@/src/lib/api";
import { getQueryClient } from "@/src/lib/query-client";
import { queryKeys, queryFns } from "@/src/lib/queries";
import type { ApiAdvertisement, ApiFeaturedImage } from "@/src/types";

export default async function Home() {
  const queryClient = getQueryClient();
  const t = await getTranslations("Home");

  let hasError = false;
  try {
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: queryKeys.publishedArticles(),
        queryFn: queryFns.publishedArticles,
      }),
      queryClient.prefetchQuery({
        queryKey: queryKeys.categories(),
        queryFn: queryFns.categories,
      }),
      queryClient.prefetchQuery({
        queryKey: queryKeys.featuredImages(),
        queryFn: queryFns.featuredImages,
      }),
      queryClient.prefetchQuery({
        queryKey: queryKeys.advertisements("banner"),
        queryFn: queryFns.advertisements("banner"),
      }),
    ]);
  } catch {
    hasError = true;
  }

  const apiArticles =
    queryClient.getQueryData<Awaited<ReturnType<typeof getPublishedArticles>>>(
      queryKeys.publishedArticles(),
    ) ?? [];
  const displayArticles = apiArticles.map(mapApiArticleToNewsArticle);

  const featuredSlides =
    queryClient.getQueryData<ApiFeaturedImage[]>(queryKeys.featuredImages()) ?? [];

  const bannerAds =
    queryClient.getQueryData<ApiAdvertisement[]>(queryKeys.advertisements("banner")) ?? [];

  const breakingNews = displayArticles
    .filter((a) => a.isBreaking)
    .map((a) => a.title);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
    <NewsShell>
      <div className="mx-auto w-full max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-6">
        {/* Error banner */}
        {hasError && (
          <div className="mb-4 rounded-sm bg-red-50 border border-red-200 p-4 text-red-800">
            <p className="text-sm">{t("loadError")}</p>
          </div>
        )}

        {!hasError && displayArticles.length === 0 && (
          <div className="mb-4 rounded-sm border border-line dark:border-[#2a3832] bg-white dark:bg-[#1e2a26] p-6 text-center text-muted">
            <p className="text-sm">{t("noArticles")}</p>
          </div>
        )}

        {/* Featured image carousel — always shown; empty state when no slides configured */}
        {featuredSlides.length > 0 ? (
          <FeaturedCarousel slides={featuredSlides} />
        ) : (
          <div className="mt-2 flex min-h-[180px] items-center justify-center rounded-2xl border-2 border-dashed border-line bg-white dark:border-[#2a3832] dark:bg-[#1e2a26] sm:min-h-[260px]">
            <div className="text-center">
              <p className="text-sm font-semibold text-ink dark:text-gray-200">
                {t("featuredCarousel")}
              </p>
              <p className="mt-1 text-xs text-muted">
                {t.rich("noSlides", {
                  link: (chunks) => (
                    <Link
                      href="/admin/featured-images/new"
                      className="text-primary underline"
                    >
                      {chunks}
                    </Link>
                  ),
                })}
              </p>
            </div>
          </div>
        )}

        {/* Banner advertisements — dynamic from API */}
        {bannerAds.length > 0 ? (
          <div className="mt-6 space-y-3">
            {bannerAds.map((ad) =>
              ad.linkUrl ? (
                <a
                  key={ad.id}
                  href={ad.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={ad.title}
                  className="block overflow-hidden rounded-xl"
                >
                  <Image
                    src={ad.imageUrl}
                    alt={ad.title}
                    width={1200}
                    height={200}
                    className="h-auto max-h-40 w-full object-cover"
                  />
                </a>
              ) : (
                <div key={ad.id} className="overflow-hidden rounded-xl">
                  <Image
                    src={ad.imageUrl}
                    alt={ad.title}
                    width={1200}
                    height={200}
                    className="h-auto max-h-40 w-full object-cover"
                  />
                </div>
              ),
            )}
          </div>
        ) : (
          <section className="mt-6 rounded-sm bg-primary-dark px-6 py-10 text-center text-white sm:px-10 sm:py-12">
            <p className="text-[12px] font-semibold uppercase tracking-wider text-white/90">
              {t("adLabel")}
            </p>
            <p className="mt-3 text-4xl font-extrabold leading-tight sm:text-5xl">
              {t("advertiseHere")}
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-white/95">
              {t("advertiseSubtitle")}
            </p>
          </section>
        )}

        {/* Breaking News */}
        {breakingNews.length > 0 && (
          <section className="mt-6 rounded-sm border border-[#bccac0] bg-background p-3 sm:p-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="[font-family:var(--font-work-sans)] text-[12px] font-semibold uppercase tracking-wider text-[#fe6500]">
                {t("breakingNews")}
              </span>
              <div className="min-w-0 flex-1">
                <BreakingNewsBanner items={breakingNews} />
              </div>
            </div>
          </section>
        )}

        {/* Main content grid */}
        <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-6">
          {/* Left column - Articles */}
          <div className="lg:col-span-8">
            {/* Featured article */}
            <h2 className="[font-family:var(--font-hanken)] text-2xl font-bold leading-8 text-ink sm:text-[32px] sm:leading-10">
              {t("topStory")}
            </h2>
            <div className="mt-4">
              {displayArticles.slice(0, 1).map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  variant="featured"
                />
              ))}
            </div>

            {/* Latest articles grid */}
            <div className="mt-10">
              <h3 className="[font-family:var(--font-hanken)] text-2xl font-bold leading-8 text-ink sm:text-[32px] sm:leading-10">
                {t("latestNews")}
              </h3>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {displayArticles.slice(1, 4).map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </div>

            {/* Politics section */}
            {displayArticles.length > 4 && (
              <div className="mt-10">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="[font-family:var(--font-hanken)] text-2xl font-bold leading-8 text-ink sm:text-[32px] sm:leading-10">
                    {t("politics")}
                  </h3>
                  <span className="[font-family:var(--font-work-sans)] text-[12px] font-semibold uppercase tracking-wider text-[#a33e00]">
                    {t("viewAll")}
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {displayArticles.slice(0, 3).map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right column - Sidebar */}
          <aside className="lg:col-span-4">
            <Sidebar articles={displayArticles} />
          </aside>
        </section>
      </div>
    </NewsShell>
    </HydrationBoundary>
  );
}
