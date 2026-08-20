import NewsShell from "@/src/components/layout/NewsShell";
import ContactForm from "@/src/components/ui/ContactForm";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const metadata: Metadata = {
  title: "Contact Us | Best Khabar",
  description: "Get in touch with the Best Khabar newsroom.",
};

export default async function ContactPage() {
  const t = await getTranslations("Contact");
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

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-line bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-ink">{t("detailsTitle")}</h2>
            <dl className="mt-4 space-y-4 text-sm text-muted">
              <div>
                <dt className="font-semibold text-ink">{t("email")}</dt>
                <dd>newsroom@bestkhabar.com</dd>
              </div>
              <div>
                <dt className="font-semibold text-ink">{t("phone")}</dt>
                <dd>+977-01-555-0101</dd>
              </div>
              <div>
                <dt className="font-semibold text-ink">{t("office")}</dt>
                <dd>{t("officeValue")}</dd>
              </div>
            </dl>
          </section>

          <section className="rounded-2xl border border-line bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-ink">{t("sendTitle")}</h2>
            <div className="mt-4">
              <ContactForm />
            </div>
          </section>
        </div>
      </div>
    </NewsShell>
  );
}
