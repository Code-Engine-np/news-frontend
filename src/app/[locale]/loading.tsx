import { getTranslations } from "next-intl/server";

export default async function Loading() {
  const t = await getTranslations("Loading");
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div
        className="h-10 w-10 animate-spin rounded-full border-4 border-line border-t-primary"
        role="status"
        aria-label={t("loading")}
      />
    </div>
  );
}
