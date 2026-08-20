"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("Error");

  useEffect(() => {
    console.error(error);
  }, [error]);

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
      <button
        type="button"
        onClick={reset}
        className="mt-6 inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
      >
        {t("tryAgain")}
      </button>
    </main>
  );
}
