import NewsShell from "@/src/components/layout/NewsShell";
import BreakingNewsBanner from "@/src/components/ui/BreakingNewsBanner";
import ArticleCard from "@/src/components/cards/ArticleCard";
import Sidebar from "@/src/components/ui/Sidebar";
import {
  getPublishedArticles,
  getCategories,
  mapApiArticleToNewsArticle,
  mapApiCategoryToCategory,
} from "@/src/lib/api";

async function getHomeData() {
  try {
    const [apiArticles, apiCategories] = await Promise.all([
      getPublishedArticles(),
      getCategories(),
    ]);

    const articles = apiArticles?.map(mapApiArticleToNewsArticle) ?? [];
    const categories = apiCategories?.map(mapApiCategoryToCategory) ?? [];

    return { articles, categories, error: null };
  } catch (err) {
    console.error("Failed to fetch home data:", err);
    return { articles: [], categories: [], error: "Failed to load data" };
  }
}

export default async function Home() {
  const { articles: displayArticles, error } = await getHomeData();

  const breakingNews = displayArticles
    .filter((a) => a.isBreaking)
    .map((a) => a.title);

  return (
    <NewsShell>
      <div className="mx-auto w-full max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-6">
        {/* Error banner */}
        {error && (
          <div className="mb-4 rounded-sm bg-red-50 border border-red-200 p-4 text-red-800">
            <p className="text-sm">{error}.</p>
          </div>
        )}

        {!error && displayArticles.length === 0 && (
          <div className="mb-4 rounded-sm border border-line dark:border-[#2a3832] bg-white dark:bg-[#1e2a26] p-6 text-center text-muted">
            <p className="text-sm">No published articles yet.</p>
          </div>
        )}

        {/* Advertisement placeholder */}
        <section className="rounded-sm bg-primary-dark px-6 py-10 text-center text-white sm:px-10 sm:py-12">
          <p className="[font-family:var(--font-work-sans)] text-[12px] font-semibold uppercase tracking-wider text-white/90">
            Advertisement
          </p>
          <h1 className="mt-3 [font-family:var(--font-hanken)] text-4xl font-extrabold leading-tight sm:text-5xl">
            ADVERTISE HERE
          </h1>
          <p className="mx-auto mt-3 max-w-2xl [font-family:var(--font-noto)] text-base leading-7 text-white/95">
            Contact us to showcase your brand in the leading news portal.
          </p>
        </section>

        {/* Breaking News */}
        {breakingNews.length > 0 && (
          <section className="mt-6 rounded-sm border border-[#bccac0] bg-background p-3 sm:p-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="[font-family:var(--font-work-sans)] text-[12px] font-semibold uppercase tracking-wider text-[#fe6500]">
                Breaking News
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
              शीर्ष समाचार (Top Story)
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
                ताजा समाचार (Latest News)
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
                    राजनीति (Politics)
                  </h3>
                  <span className="[font-family:var(--font-work-sans)] text-[12px] font-semibold uppercase tracking-wider text-[#a33e00]">
                    सबै हेर्नुहोस्
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
  );
}
