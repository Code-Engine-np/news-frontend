import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Image as ImageIcon, Share2 } from "lucide-react";
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

  let article;
  let allArticles;
  try {
    const [apiArticle, apiArticles] = await Promise.all([
      getArticleBySlug(slug),
      getPublishedArticles(),
    ]);
    article = mapApiArticleToNewsArticle(apiArticle);
    allArticles = apiArticles.map(mapApiArticleToNewsArticle);
  } catch {
    notFound();
  }

  const relatedArticles = getRelatedArticles(allArticles, article, 3);
  const sidebarArticles = getTrendingArticles(allArticles, 6);

  return (
    <NewsShell>
      <div className="mx-auto w-full max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-6">
        <nav className="text-sm text-[#5f6b66]">
          <Link href="/" className="hover:text-primary">
            Home
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
          <article className="overflow-hidden rounded-2xl border border-line bg-white shadow-sm">
            <div className="relative aspect-[16/9]">
              {article.featuredImage ? (
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
                <span className="inline-flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  {new Date(article.publishedAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
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
                  Share
                </button>
              </div>
            </div>
          </article>

          <Sidebar articles={sidebarArticles} />
        </div>

        {relatedArticles.length > 0 && (
          <section className="mt-10 rounded-2xl border border-line bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  Related coverage
                </p>
                <h2 className="mt-2 text-2xl font-bold text-ink">
                  More from {article.category.name}
                </h2>
              </div>
              <Link
                href={`/category/${article.category.slug}`}
                className="text-sm font-semibold text-primary"
              >
                View category
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
  );
}
