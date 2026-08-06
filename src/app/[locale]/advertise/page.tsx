import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import NewsShell from "@/src/components/layout/NewsShell";

export const metadata: Metadata = {
  title: "Advertise | Best Khabar",
  description:
    "Advertising options and sponsorship opportunities at Best Khabar.",
};

export default async function AdvertisePage() {
  const t = await getTranslations("Advertise");
  return (
    <NewsShell>
      <div className="mx-auto w-full max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-6">
        <section className="rounded-2xl bg-primary-dark px-6 py-10 text-center text-white sm:px-10 sm:py-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/85">
            {t("eyebrow")}
          </p>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/95">
            {t("intro")}
          </p>
        </section>

        <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {[
            { title: t("heroTitle"), text: t("heroText") },
            { title: t("sidebarTitle"), text: t("sidebarText") },
            { title: t("sponsoredTitle"), text: t("sponsoredText") },
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
          <h2 className="text-2xl font-bold text-ink">{t("bookTitle")}</h2>
          <p className="mt-3 text-muted">{t("bookText")}</p>
        </section>
      </div>
    </NewsShell>
  );
}
