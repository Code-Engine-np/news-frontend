import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/src/i18n/navigation";
import { SOCIAL_LINKS } from "@/src/lib/site";
import {
  FacebookIcon,
  LinkedInIcon,
  YoutubeIcon,
} from "@/src/constants/socialIcons";
import { XIcon } from "lucide-react";

const TopBar = async () => {
  const [t, locale] = await Promise.all([
    getTranslations("TopBar"),
    getLocale(),
  ]);
  const today = new Intl.DateTimeFormat(locale === "ne" ? "ne-NP" : "en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <div className="bg-[#ededed] text-sm text-black dark:bg-[#1a2520] dark:text-gray-300">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-0 lg:py-3">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
          <span className="whitespace-nowrap font-(family-name:--font-inter) text-[16px]">
            {today}
          </span>
          <span className="whitespace-nowrap font-(family-name:--font-inter) text-[16px]">
            {/* <Weather /> */}
          </span>
        </div>

        <div className="flex items-center gap-4 sm:gap-8">
          <div className="hidden items-center gap-4 sm:flex">
            <Link
              href="/about"
              className="transition-colors hover:text-brand-600"
            >
              {t("aboutUs")}
            </Link>
            <Link
              href="/advertise"
              className="transition-colors hover:text-brand-600"
            >
              {t("advertise")}
            </Link>
            <Link
              href="/contact"
              className="transition-colors hover:text-brand-600"
            >
              {t("contact")}
            </Link>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden items-center gap-4 sm:flex">
              <Link
                href={
                  SOCIAL_LINKS.find((link) => link.id === "facebook")?.href ||
                  "#"
                }
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FacebookIcon className="h-4.5 w-4.5" />
              </Link>
              <Link
                href={
                  SOCIAL_LINKS.find((link) => link.id === "twitter")?.href ||
                  "#"
                }
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
              >
                <XIcon className="h-4.5 w-4.5" />
              </Link>
              <Link
                href={
                  SOCIAL_LINKS.find((link) => link.id === "youtube")?.href ||
                  "#"
                }
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <YoutubeIcon className="h-4.5 w-4.5" />
              </Link>
              <Link
                href={
                  SOCIAL_LINKS.find((link) => link.id === "linkedin")?.href ||
                  "#"
                }
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="h-4.5 w-4.5" />
              </Link>
            </div>
            <span className="hidden sm:block">{t("followUs")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
