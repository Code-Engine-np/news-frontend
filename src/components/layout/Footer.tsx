import { getTranslations } from "next-intl/server";
import { FOOTER_LINK_GROUPS, SOCIAL_LINKS } from "@/src/lib/site";
import Image from "next/image";
import { Link } from "@/src/i18n/navigation";
import {
  FacebookIcon,
  LinkedInIcon,
  XIcon,
  YoutubeIcon,
} from "@/src/constants/socialIcons";

const Footer = async () => {
  const t = await getTranslations("Footer");
  return (
    <footer className="bg-primary-bright text-white">
      <div className="mx-auto w-full max-w-7xl px-4 pb-4 pt-4 sm:px-6 lg:px-0 lg:pb-5 lg:pt-4">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-[430px]">
              <Link
                href="/"
                className="inline-flex items-center gap-3"
                aria-label="Best Khabar home"
              >
                <div className="relative h-[46px] w-[180px] sm:h-[58px] sm:w-[240px] lg:h-[62px] lg:w-[270px]">
                  <Image
                    src="/best-khabar-footer.png"
                    alt="Best Khabar Logo"
                    fill
                    sizes="(max-width: 640px) 180px, (max-width: 1024px) 240px, 270px"
                    className="object-contain object-left"
                  />
                </div>
              </Link>
            </div>

            <div className="flex items-center gap-4 self-start lg:pt-2">
              <Link
                href={
                  SOCIAL_LINKS.find((link) => link.id === "facebook")?.href ||
                  "#"
                }
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FacebookIcon className="h-5 w-5" />
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
                <XIcon className="h-5 w-5" />
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
                <YoutubeIcon className="h-5 w-5" />
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
                <LinkedInIcon className="h-5 w-5" />
              </Link>
              <span className="text-sm sm:text-base">{t("followUs")}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">{t("companyName")}</h3>
              <p className="text-sm text-white/95">{t("tagline")}</p>
              <p className="text-sm text-white/95">{t("location")}</p>
            </div>

            {FOOTER_LINK_GROUPS.map((group) => (
              <div key={group.titleKey} className="space-y-3">
                <h3 className="text-lg font-semibold">{t(group.titleKey)}</h3>
                <ul className="space-y-2 text-sm text-white/95">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="transition-colors hover:text-white"
                      >
                        {t(link.labelKey)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 border-t border-white/30 py-4 text-center text-xs sm:text-sm">
          {t("copyright", { year: new Date().getFullYear() })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
