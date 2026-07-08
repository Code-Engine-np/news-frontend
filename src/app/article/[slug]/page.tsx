import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, Eye, MessageSquare, Share2 } from "lucide-react";
import ArticleCard from "@/src/app/components/cards/ArticleCard";
import NewsShell from "@/src/app/components/layout/NewsShell";
import Sidebar from "@/src/app/components/ui/Sidebar";
import {
  ADVERTISEMENTS,
  getAllArticleSlugs,
  getArticleBySlug,
  getRelatedArticles,
  getTrendingArticles,
} from "@/src/app/lib/site";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return { title: "Article not found | Best Khabar" };
  }

  return {
    title: `${article.title} | Best Khabar`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(article, 3);
  const sidebarArticles = getTrendingArticles(6);

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
              <Image
                src={article.featuredImage}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="p-6 sm:p-8">
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold text-white ${article.category.color}`}
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
                <span>{article.author.name}</span>
                <span className="inline-flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  {article.viewCount.toLocaleString()} views
                </span>
                <span className="inline-flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  {article.commentCount} comments
                </span>
              </div>

              <div className="prose prose-slate mt-6 max-w-none prose-headings:text-ink prose-p:text-[#4d5c56]">
                <p>{article.content}</p>
                <p>
                  This story is part of Best Khabar&apos;s live news archive.
                  Follow the related coverage below for the latest updates and
                  context from the same section.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#e5ebe5] pt-6">
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="rounded-full bg-[#eef6f0] px-3 py-1 text-xs font-semibold text-primary"
                    >
                      #{tag.name}
                    </span>
                  ))}
                </div>

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
