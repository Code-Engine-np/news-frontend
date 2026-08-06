import { getTranslations } from "next-intl/server";
import { FOOTER_LINK_GROUPS } from "@/src/lib/site";
import Image from "next/image";
import { Link } from "@/src/i18n/navigation";

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18.244 2H21l-6.917 7.94L22.5 22h-6.955l-5.436-6.67L4.26 22H1.5l7.39-8.48L1 2h7.11l4.885 6.035L18.244 2Zm-1.223 18h1.926L7.065 3.95H5.003L17.021 20Z" />
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

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
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FacebookIcon className="h-5 w-5" />
              </Link>
              <Link
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
              >
                <XIcon className="h-5 w-5" />
              </Link>
              <Link
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <YoutubeIcon className="h-5 w-5" />
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
