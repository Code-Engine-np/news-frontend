import type { Metadata } from "next";
import NewsShell from "@/src/app/components/layout/NewsShell";

export const metadata: Metadata = {
  title: "Advertise | Best Khabar",
  description:
    "Advertising options and sponsorship opportunities at Best Khabar.",
};

export default function AdvertisePage() {
  return (
    <NewsShell>
      <div className="mx-auto w-full max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-6">
        <section className="rounded-2xl bg-primary-dark px-6 py-10 text-center text-white sm:px-10 sm:py-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/85">
            Advertising
          </p>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight sm:text-5xl">
            Advertise on Best Khabar
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/95">
            Reach readers through hero placements, sidebar inventory, and
            sponsored content across the site.
          </p>
        </section>

        <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            {
              title: "Hero placement",
              text: "High-visibility banner space on the homepage.",
            },
            {
              title: "Sidebar inventory",
              text: "Contextual placements beside category and article pages.",
            },
            {
              title: "Sponsored features",
              text: "Branded storytelling for launches and campaigns.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-line bg-white p-6 shadow-sm"
            >
              <h2 className="text-xl font-bold text-ink">{item.title}</h2>
              <p className="mt-3 text-muted">{item.text}</p>
            </div>
          ))}
        </section>

        <section className="mt-8 rounded-2xl border border-line bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-ink">Ready to book?</h2>
          <p className="mt-3 text-muted">
            Contact the sales team to discuss placements and campaign timing.
          </p>
        </section>
      </div>
    </NewsShell>
  );
}
