import { getTranslations } from "next-intl/server";
import { Link } from "@/src/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
        {t("label")}
      </p>
      <h1 className="mt-3 text-3xl font-extrabold text-ink sm:text-4xl">
        {t("title")}
      </h1>
      <p className="mt-3 max-w-md text-base leading-7 text-muted">
        {t("description")}
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
      >
        {t("backHome")}
      </Link>
    </main>
  );
}
