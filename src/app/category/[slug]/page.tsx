import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTrendingArticles } from "@/src/lib/site";
import NewsShell from "@/src/components/layout/NewsShell";
import ArticleCard from "@/src/components/cards/ArticleCard";
import Sidebar from "@/src/components/ui/Sidebar";
import {
  getCategories,
  getCategoryBySlug,
  getPublishedArticles,
  mapApiArticleToNewsArticle,
  mapApiCategoryToCategory,
} from "@/src/lib/api";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const categories = await getCategories();
    return (categories ?? []).map((category) => ({ slug: category.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const category = await getCategoryBySlug(slug);
    return {
      title: `${category.name} | Best Khabar`,
      description: category.description || undefined,
    };
  } catch {
    return { title: "Category not found | Best Khabar" };
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  let category;
  let allArticles;
  try {
    const [apiCategory, apiArticles] = await Promise.all([
      getCategoryBySlug(slug),
      getPublishedArticles(),
    ]);
    category = mapApiCategoryToCategory(apiCategory);
    allArticles = apiArticles.map(mapApiArticleToNewsArticle);
  } catch {
    notFound();
  }

  const articles = allArticles
    .filter((article) => article.category.slug === slug)
    .slice(0, 6);

  if (articles.length === 0) {
    notFound();
  }

  const featuredArticle = articles[0];
  const gridArticles = articles.slice(1);
  const sidebarArticles = getTrendingArticles(allArticles, 6);

  return (
    <NewsShell>
      <div className="mx-auto w-full max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-6">
        <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Category
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-sans)] text-3xl font-extrabold text-ink sm:text-4xl">
            {category.name}
          </h1>
          {category.description && (
            <p className="mt-3 max-w-3xl text-base leading-7 text-muted">
              {category.description}
            </p>
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_352px]">
          <section className="space-y-6">
            <ArticleCard article={featuredArticle} variant="featured" />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {gridArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            <div className="rounded-2xl border border-line bg-white p-6">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    More in {category.name}
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-ink">
                    Fresh coverage from the archive
                  </h2>
                </div>
                <Link
                  href="/trending"
                  className="shrink-0 whitespace-nowrap text-sm font-semibold text-primary"
                >
                  View trending
                </Link>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {gridArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </div>
          </section>

          <Sidebar articles={sidebarArticles} />
        </div>
      </div>
    </NewsShell>
  );
}
