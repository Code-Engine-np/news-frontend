import React from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getTranslations } from "next-intl/server";
import { Link } from "@/src/i18n/navigation";
import NewsShell from "@/src/components/layout/NewsShell";
import BreakingNewsBanner from "@/src/components/ui/BreakingNewsBanner";
import FeaturedCarousel from "@/src/components/ui/FeaturedCarousel";
import LatestNewsList from "@/src/components/ui/LatestNewsList";
import CategoryNewsSection from "@/src/components/ui/CategoryNewsSection";
import AdBanner from "@/src/components/ui/AdBanner";
import {
  getPublishedArticles,
  mapApiArticleToNewsArticle,
} from "@/src/lib/api";
import { getQueryClient } from "@/src/lib/query-client";
import { queryKeys, queryFns } from "@/src/lib/queries";
import { getTrendingArticles } from "@/src/lib/site";
import type { ApiAdvertisement, ApiFeaturedImage, NewsArticle } from "@/src/types";

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

  // Group articles by category in first-appearance order
  const categoryMap = new Map<string, { name: string; slug: string; articles: NewsArticle[] }>();
  for (const article of displayArticles) {
    const { slug, name } = article.category;
    if (!categoryMap.has(slug)) categoryMap.set(slug, { name, slug, articles: [] });
    categoryMap.get(slug)!.articles.push(article);
  }
  const categorySections = Array.from(categoryMap.values());

  const latestArticles = getTrendingArticles(displayArticles, 7);

  // Resolve ad by index; returns undefined if bannerAds is empty
  const getAd = (index: number): ApiAdvertisement | undefined =>
    bannerAds.length > 0 ? bannerAds[index % bannerAds.length] : undefined;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NewsShell>
        <div className="mx-auto w-full max-w-7xl px-3 pb-10 pt-3 sm:px-4 lg:px-6">

          {/* Error banner */}
          {hasError && (
            <div className="mb-3 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-800">
              {t("loadError")}
            </div>
          )}

          {/* Breaking news ticker */}
          {breakingNews.length > 0 && (
            <div className="mb-3 flex items-center gap-3 rounded-xl border border-line bg-white px-3 py-2 dark:border-[#2a3832] dark:bg-[#1e2a26]">
              <span className="shrink-0 text-[11px] font-bold uppercase tracking-wider text-red-600">
                {t("breakingNews")}
              </span>
              <div className="min-w-0 flex-1">
                <BreakingNewsBanner items={breakingNews} />
              </div>
            </div>
          )}

          {/* ── HERO: Carousel (left) + Latest News sidebar (right) ──── */}
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-[3fr_2fr] lg:items-stretch">
            {featuredSlides.length > 0 ? (
              <FeaturedCarousel
                slides={featuredSlides}
                className="relative overflow-hidden rounded-xl"
              />
            ) : (
              <div className="flex h-55 items-center justify-center rounded-xl border border-dashed border-line bg-white dark:border-[#2a3832] dark:bg-[#1e2a26] sm:h-80 lg:h-105">
                <div className="px-4 text-center">
                  <p className="text-sm font-semibold text-ink dark:text-gray-200">
                    {t("featuredCarousel")}
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    {t.rich("noSlides", {
                      link: (chunks) => (
                        <Link href="/admin/featured-images/new" className="text-primary underline">
                          {chunks}
                        </Link>
                      ),
                    })}
                  </p>
                </div>
              </div>
            )}

            {/* Latest news sidebar — desktop only */}
            <div className="hidden lg:block lg:h-105">
              <LatestNewsList articles={latestArticles} title={t("trendingNews")} />
            </div>
          </div>

          {/* ── FIRST AD BANNER ──────────────────────────────────────── */}
          <div className="mt-3">
            {getAd(0) ? (
              <AdBanner ad={getAd(0)!} />
            ) : (
              <div className="rounded-xl border border-dashed border-line bg-white px-4 py-5 text-center dark:border-[#2a3832] dark:bg-[#1e2a26]">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted">{t("adLabel")}</p>
                <p className="mt-1 text-lg font-bold text-ink dark:text-gray-200">{t("advertiseHere")}</p>
                <p className="mt-1 text-xs text-muted">{t("advertiseSubtitle")}</p>
              </div>
            )}
          </div>

          {/* ── CATEGORY SECTIONS ─────────────────────────────────────── */}
          <div className="mt-3 space-y-3">
            {displayArticles.length === 0 && !hasError && (
              <div className="rounded-xl border border-line bg-white p-8 text-center dark:border-[#2a3832] dark:bg-[#1e2a26]">
                <p className="text-sm text-muted">{t("noArticles")}</p>
              </div>
            )}
            {categorySections.map((cat, i) => {
              const adIndex = Math.floor((i + 1) / 2);
              const showAd = (i + 1) % 2 === 0;
              const ad = showAd ? getAd(adIndex) : undefined;
              return (
                <React.Fragment key={cat.slug}>
                  <CategoryNewsSection
                    title={cat.name}
                    slug={cat.slug}
                    articles={cat.articles}
                    viewAllLabel={t("viewAll")}
                  />
                  {showAd && (
                    ad ? (
                      <AdBanner ad={ad} />
                    ) : (
                      <div className="rounded-xl border border-dashed border-line bg-white px-4 py-4 text-center dark:border-[#2a3832] dark:bg-[#1e2a26]">
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted">{t("adLabel")}</p>
                        <p className="mt-1 text-base font-bold text-ink dark:text-gray-200">{t("advertiseHere")}</p>
                      </div>
                    )
                  )}
                </React.Fragment>
              );
            })}
          </div>

        </div>
      </NewsShell>
    </HydrationBoundary>
  );
}
