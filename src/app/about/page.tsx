import type { Metadata } from "next";
import Link from "next/link";
import NewsShell from "@/src/app/components/layout/NewsShell";

export const metadata: Metadata = {
  title: "About Us | Best Khabar",
  description: "Learn more about the newsroom behind Best Khabar.",
};

export default function AboutPage() {
  return (
    <NewsShell>
      <div className="mx-auto w-full max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-6">
        <section className="rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            About Best Khabar
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-ink sm:text-4xl">
            A newsroom designed for quick, readable news
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-muted">
            Best Khabar brings together national stories, community updates, and
            breaking coverage in a clean, mobile-friendly format.
          </p>
        </section>

        <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            "Verified reporting with quick access to breaking updates.",
            "A compact layout optimized for desktop and mobile readers.",
            "Sections that connect politics, economy, society, and culture.",
          ].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-line bg-white p-6 shadow-sm"
            >
              <p className="text-base leading-7 text-ink">{item}</p>
            </div>
          ))}
        </section>

        <section className="mt-8 rounded-2xl border border-line bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-ink">
            Need to reach the newsroom?
          </h2>
          <p className="mt-3 text-muted">
            Use the contact page for editorial, advertising, and partnership
            questions.
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white"
          >
            Contact us
          </Link>
        </section>
      </div>
    </NewsShell>
  );
}
