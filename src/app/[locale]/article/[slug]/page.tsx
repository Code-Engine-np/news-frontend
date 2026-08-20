import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Image as ImageIcon, Share2 } from "lucide-react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Link } from "@/src/i18n/navigation";
import { getRelatedArticles, getTrendingArticles } from "@/src/lib/site";
import NewsShell from "@/src/components/layout/NewsShell";
import Sidebar from "@/src/components/ui/Sidebar";
import ArticleCard from "@/src/components/cards/ArticleCard";
import {
  mapApiArticleToNewsArticle,
  getArticleBySlug,
  getPublishedArticles,
} from "@/src/lib/api";
import { sanitizeArticleHtml } from "@/src/lib/sanitize";
import { getYouTubeEmbedUrl } from "@/src/lib/youtube";
import { getQueryClient } from "@/src/lib/query-client";
import { queryKeys, queryFns } from "@/src/lib/queries";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const articles = await getPublishedArticles();
    return articles.map((article) => ({ slug: article.slug }));
  } catch {
    // Return empty array if API is unavailable during build
    return [];
  }
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const article = await getArticleBySlug(slug);
    return {
      title: `${article.title} | Best Khabar`,
      description: article.summary,
    };
  } catch {
    return { title: "Article not found | Best Khabar" };
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;

  const queryClient = getQueryClient();
  const t = await getTranslations("Article");

  let article;
  let allArticles;
  try {
    await Promise.all([
      queryClient.prefetchQuery({
        queryKey: queryKeys.article(slug),
        queryFn: queryFns.article(slug),
      }),
      queryClient.prefetchQuery({
        queryKey: queryKeys.publishedArticles(),
        queryFn: queryFns.publishedArticles,
      }),
    ]);

    const apiArticle = queryClient.getQueryData<
      Awaited<ReturnType<typeof getArticleBySlug>>
    >(queryKeys.article(slug));
    const apiArticles = queryClient.getQueryData<
      Awaited<ReturnType<typeof getPublishedArticles>>
    >(queryKeys.publishedArticles()) ?? [];

    if (!apiArticle) notFound();
    article = mapApiArticleToNewsArticle(apiArticle);
    allArticles = apiArticles.map(mapApiArticleToNewsArticle);
  } catch {
    notFound();
  }

  const relatedArticles = getRelatedArticles(allArticles, article, 3);
  const sidebarArticles = getTrendingArticles(allArticles, 6);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
    <NewsShell>
      <div className="mx-auto w-full max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-6">
        <nav className="text-sm text-[#5f6b66]">
          <Link href="/" className="hover:text-primary">
            {t("home")}
          </Link>
          <span className="mx-2">/</span>
          <Link
            href={`/category/${article.category.slug}`}
            className="hover:text-primary"
          >
            {article.category.name}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ink">{article.title}</span>
        </nav>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_352px] lg:items-start">
          <article className="overflow-hidden rounded-2xl border border-line dark:border-[#2a3832] bg-white dark:bg-[#1e2a26] shadow-sm">
            <div className="relative aspect-video bg-black">
              {article.featuredVideoId ? (
                <iframe
                  src={getYouTubeEmbedUrl(article.featuredVideoId)}
                  title={article.title}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : article.featuredImage ? (
                <Image
                  src={article.featuredImage}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-100">
                  <ImageIcon className="h-10 w-10 text-gray-400" />
                </div>
              )}
            </div>

            <div className="p-6 sm:p-8">
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold text-white`}
              >
                {article.category.name}
              </span>
              <h1 className="mt-4 text-3xl font-extrabold leading-tight text-ink sm:text-4xl">
                {article.title}
              </h1>
              <p className="mt-4 max-w-3xl text-lg leading-8 text-[#52615b]">
                {article.excerpt}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4 border-y border-[#e5ebe5] py-4 text-sm text-[#60706a]">
                <span>{article.author.fullName}</span>
              </div>

              <div
                className="prose prose-slate mt-6 max-w-none prose-headings:text-ink prose-p:text-[#4d5c56]"
                dangerouslySetInnerHTML={{
                  __html: sanitizeArticleHtml(article.content),
                }}
              />

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#e5ebe5] pt-6">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full border border-[#c9d5cd] px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-primary hover:text-primary"
                >
                  <Share2 className="h-4 w-4" />
                  {t("share")}
                </button>
              </div>
            </div>
          </article>

          <Sidebar articles={sidebarArticles} />
        </div>

        {relatedArticles.length > 0 && (
          <section className="mt-10 rounded-2xl border border-line dark:border-[#2a3832] bg-white dark:bg-[#1e2a26] p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  {t("relatedCoverage")}
                </p>
                <h2 className="mt-2 text-2xl font-bold text-ink">
                  {t("moreFrom", { category: article.category.name })}
                </h2>
              </div>
              <Link
                href={`/category/${article.category.slug}`}
                className="text-sm font-semibold text-primary"
              >
                {t("viewCategory")}
              </Link>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {relatedArticles.map((relatedArticle) => (
                <ArticleCard key={relatedArticle.id} article={relatedArticle} />
              ))}
            </div>
          </section>
        )}
      </div>
    </NewsShell>
    </HydrationBoundary>
  );
}
