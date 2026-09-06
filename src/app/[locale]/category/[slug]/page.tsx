import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Link } from "@/src/i18n/navigation";
import { getTrendingArticles, MAIN_NAV_ITEMS } from "@/src/lib/site";
import NewsShell from "@/src/components/layout/NewsShell";
import ArticleCard from "@/src/components/cards/ArticleCard";
import Sidebar from "@/src/components/ui/Sidebar";
import Pagination from "@/src/components/ui/Pagination";
import {
  getCategories,
  getCategoryBySlug,
  getPublishedArticles,
  mapApiArticleToNewsArticle,
  mapApiCategoryToCategory,
} from "@/src/lib/api";
import { getQueryClient } from "@/src/lib/query-client";
import { queryKeys, queryFns } from "@/src/lib/queries";
import type { PaginatedResponse, ApiArticle } from "@/src/types";

const PAGE_SIZE = 10;

// Flat list of every nav slug → English label (for fallback when backend lacks the category)
const ALL_NAV_SLUGS: Record<string, string> = Object.fromEntries(
  MAIN_NAV_ITEMS.flatMap((i) => [
    [i.href.replace("/category/", ""), i.label],
    ...(i.children?.map((c) => [c.href.replace("/category/", ""), c.label]) ?? []),
  ]).filter(([slug]) => !slug.startsWith("http")),
);

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateStaticParams() {
  const navSlugs = Object.keys(ALL_NAV_SLUGS).map((slug) => ({ slug }));
  try {
    const categories = await getCategories();
    const backendSlugs = (categories ?? []).map((c) => ({ slug: c.slug }));
    const seen = new Set(navSlugs.map((s) => s.slug));
    return [...navSlugs, ...backendSlugs.filter((s) => !seen.has(s.slug))];
  } catch {
    return navSlugs;
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
    const navLabel = ALL_NAV_SLUGS[slug];
    if (navLabel) return { title: `${navLabel} | Best Khabar` };
    return { title: "Category not found | Best Khabar" };
  }
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const currentPage = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);

  const queryClient = getQueryClient();
  const t = await getTranslations("Category");

  // Prefetch paginated category articles (main content) + all articles (sidebar) + category meta
  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: queryKeys.categoryArticles(slug, currentPage, PAGE_SIZE),
      queryFn: queryFns.categoryArticles(slug, currentPage, PAGE_SIZE),
    }).catch(() => undefined),
    queryClient.prefetchQuery({
      queryKey: queryKeys.publishedArticles(),
      queryFn: queryFns.publishedArticles,
    }).catch(() => undefined),
    queryClient.prefetchQuery({
      queryKey: queryKeys.category(slug),
      queryFn: queryFns.category(slug),
    }).catch(() => undefined),
  ]);

  // Main content: paginated articles for this category
  const paginatedResult = queryClient.getQueryData<PaginatedResponse<ApiArticle>>(
    queryKeys.categoryArticles(slug, currentPage, PAGE_SIZE),
  );
  const pageArticles = (paginatedResult?.data ?? []).map(mapApiArticleToNewsArticle);
  const totalPages = paginatedResult?.totalPages ?? 1;
  const safePage = Math.min(currentPage, totalPages);

  // Sidebar: trending across all categories
  const allApiArticles = queryClient.getQueryData<ApiArticle[]>(queryKeys.publishedArticles()) ?? [];
  const allArticles = allApiArticles.map(mapApiArticleToNewsArticle);
  const sidebarArticles = getTrendingArticles(allArticles, 6);

  // Category metadata
  const apiCategory = queryClient.getQueryData<Awaited<ReturnType<typeof getCategoryBySlug>>>(
    queryKeys.category(slug),
  );
  let category: { id: string; slug: string; name: string; description?: string };
  if (apiCategory) {
    const mapped = mapApiCategoryToCategory(apiCategory);
    category = { id: mapped.id, slug: mapped.slug, name: mapped.name, description: mapped.description };
  } else {
    const navLabel = ALL_NAV_SLUGS[slug];
    if (!navLabel) notFound();
    category = { id: slug, slug, name: navLabel, description: "" };
  }

  const featuredArticle = safePage === 1 ? (pageArticles[0] ?? null) : null;
  const gridArticles = safePage === 1 ? pageArticles.slice(1) : pageArticles;

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
    <NewsShell>
      <div className="mx-auto w-full max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-6">
        <div className="rounded-2xl border border-line dark:border-[#2a3832] bg-white dark:bg-[#1e2a26] p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {t("eyebrow")}
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

        {pageArticles.length === 0 ? (
          <div className="mt-8 flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-line dark:border-[#2a3832] bg-white dark:bg-[#1e2a26] p-12 shadow-sm text-center">
            <p className="text-2xl font-bold text-ink">{t("noArticles")}</p>
            <p className="mt-2 text-muted">
              {t("checkBack", { category: category.name })}
            </p>
            <Link
              href="/"
              className="mt-6 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary/90"
            >
              {t("backHome")}
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_352px]">
            <section className="space-y-6">
              {featuredArticle && (
                <ArticleCard article={featuredArticle} variant="featured" />
              )}

              {gridArticles.length > 0 && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {gridArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              )}

              {totalPages > 1 && (
                <Pagination
                  currentPage={safePage}
                  totalPages={totalPages}
                  buildHref={(p) => `/category/${slug}?page=${p}`}
                />
              )}
            </section>

            <Sidebar articles={sidebarArticles} />
          </div>
        )}
      </div>
    </NewsShell>
    </HydrationBoundary>
  );
}
