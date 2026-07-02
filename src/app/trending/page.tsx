import type { Metadata } from "next";
import Link from "next/link";
import ArticleCard from "@/src/app/components/cards/ArticleCard";
import NewsShell from "@/src/app/components/layout/NewsShell";
import TrendingList from "@/src/app/components/ui/TrendingList";
import Sidebar from "@/src/app/components/ui/Sidebar";
import { ADVERTISEMENTS, getTrendingArticles } from "@/src/app/lib/site";

export const metadata: Metadata = {
  title: "Trending News | Best Khabar",
  description: "The most-read stories on Best Khabar right now.",
};

export default function TrendingPage() {
  const trendingArticles = getTrendingArticles(8);

  return (
    <NewsShell>
      <div className="mx-auto w-full max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-6">
        <div className="rounded-2xl border border-[#d8dfd8] bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0a8f61]">
            Live popularity
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-[#1a1c1c] sm:text-4xl">
            Trending stories
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-[#51605a]">
            Stories the audience is reading most across politics, business,
            sports, and culture.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_352px]">
          <section className="space-y-6">
            <TrendingList articles={trendingArticles} />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {trendingArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            <div className="rounded-2xl border border-[#d8dfd8] bg-white p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0a8f61]">
                    Keep reading
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-[#1a1c1c]">
                    Jump back to the homepage
                  </h2>
                </div>
                <Link href="/" className="text-sm font-semibold text-[#0a8f61]">
                  Home
                </Link>
              </div>
            </div>
          </section>

          <Sidebar
            articles={trendingArticles}
            advertisements={ADVERTISEMENTS}
          />
        </div>
      </div>
    </NewsShell>
  );
}
