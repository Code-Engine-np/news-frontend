import NewsShell from "@/src/components/layout/NewsShell";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/src/i18n/navigation";

export const metadata: Metadata = {
  title: "Privacy Policy | Best Khabar",
  description: "How Best Khabar handles privacy and reader data.",
};

export default async function PrivacyPage() {
  const t = await getTranslations("Privacy");
  return (
    <NewsShell>
      <div className="mx-auto w-full max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-6">
        <section className="rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {t("eyebrow")}
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-ink sm:text-4xl">
            {t("title")}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-muted">
            {t("intro")}
          </p>
        </section>

        <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {[t("point1"), t("point2"), t("point3"), t("point4")].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-line bg-white p-6 shadow-sm"
            >
              <p className="text-base leading-7 text-ink">{item}</p>
            </div>
          ))}
        </section>

        <section className="mt-8 rounded-2xl border border-line bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-ink">{t("questionsTitle")}</h2>
          <p className="mt-3 text-muted">{t("questionsText")}</p>
          <Link
            href="/contact"
            className="mt-4 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white"
          >
            {t("contactUs")}
          </Link>
        </section>
      </div>
    </NewsShell>
  );
}
