import NewsShell from "@/src/app/components/layout/NewsShell";
import BreakingNewsBanner from "@/src/app/components/ui/BreakingNewsBanner";
import ArticleCard from "@/src/app/components/cards/ArticleCard";
import { BREAKING_NEWS, MOCK_ARTICLES } from "@/src/app/lib/mock/data";

export default function Home() {
  return (
    <NewsShell>
      <div className="mx-auto w-full max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-6">
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

        <section className="mt-6 rounded-sm border border-[#bccac0] bg-background p-3 sm:p-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="[font-family:var(--font-work-sans)] text-[12px] font-semibold uppercase tracking-wider text-[#fe6500]">
              Breaking News
            </span>
            <div className="min-w-0 flex-1">
              <BreakingNewsBanner items={BREAKING_NEWS} />
            </div>
          </div>
        </section>

        <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-8">
            <h2 className="[font-family:var(--font-hanken)] text-2xl font-bold leading-8 text-ink sm:text-[32px] sm:leading-10">
              शीर्ष समाचार (Top Story)
            </h2>
            <div className="mt-4">
              {MOCK_ARTICLES.slice(0, 1).map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  variant="featured"
                />
              ))}
            </div>
          </div>

          <aside className="lg:col-span-4">
            <div className="rounded-sm border border-[#bccac0] bg-background p-4">
              <h3 className="[font-family:var(--font-hanken)] text-2xl font-bold leading-8 text-ink">
                लोकप्रिय समाचार (Trending News)
              </h3>
              <div className="mt-4 space-y-4">
                {MOCK_ARTICLES.slice(1, 5).map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    variant="compact"
                  />
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section className="mt-10">
          <div className="flex items-center justify-between gap-4">
            <h3 className="[font-family:var(--font-hanken)] text-2xl font-bold leading-8 text-ink sm:text-[32px] sm:leading-10">
              राजनीति (Politics)
            </h3>
            <span className="[font-family:var(--font-work-sans)] text-[12px] font-semibold uppercase tracking-wider text-[#a33e00]">
              सबै हेर्नुहोस्
            </span>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MOCK_ARTICLES.slice(0, 3).map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>

        <section className="mt-10">
          <div className="flex items-center justify-between gap-4">
            <h3 className="[font-family:var(--font-hanken)] text-2xl font-bold leading-8 text-ink sm:text-[32px] sm:leading-10">
              समाज (Society)
            </h3>
            <span className="[font-family:var(--font-work-sans)] text-[12px] font-semibold uppercase tracking-wider text-[#a33e00]">
              सबै हेर्नुहोस्
            </span>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MOCK_ARTICLES.slice(3, 6).map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      </div>
    </NewsShell>
  );
}
