import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleCard from "@/src/app/components/cards/ArticleCard";
import NewsShell from "@/src/app/components/layout/NewsShell";
import Sidebar from "@/src/app/components/ui/Sidebar";
import {
  ADVERTISEMENTS,
  getSectionArticles,
  getSectionDefinition,
  getTrendingArticles,
} from "@/src/app/lib/site";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const section = getSectionDefinition(slug);

  return {
    title: `${section.title} | Best Khabar`,
    description: section.intro,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const section = getSectionDefinition(slug);
  const articles = getSectionArticles(slug, 6);

  if (articles.length === 0) {
    notFound();
  }

  const featuredArticle = articles[0];
  const gridArticles = articles.slice(1);
  const sidebarArticles = getTrendingArticles(6);

  return (
    <NewsShell>
      <div className="mx-auto w-full max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-6">
        <div className="rounded-2xl border border-[#d8dfd8] bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0a8f61]">
            Category
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-sans)] text-3xl font-extrabold text-[#1a1c1c] sm:text-4xl">
            {section.title}
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-[#51605a]">
            {section.intro}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_352px]">
          <section className="space-y-6">
            <ArticleCard article={featuredArticle} variant="featured" />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {gridArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            <div className="rounded-2xl border border-[#d8dfd8] bg-white p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0a8f61]">
                    More in {section.title}
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-[#1a1c1c]">
                    Fresh coverage from the archive
                  </h2>
                </div>
                <Link
                  href="/trending"
                  className="text-sm font-semibold text-[#0a8f61]"
                >
                  View trending
                </Link>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {articles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    variant="horizontal"
                  />
                ))}
              </div>
            </div>
          </section>

          <Sidebar articles={sidebarArticles} advertisements={ADVERTISEMENTS} />
        </div>
      </div>
    </NewsShell>
  );
}
