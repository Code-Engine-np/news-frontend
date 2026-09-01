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
import FooterNewsletter from "@/src/components/ui/FooterNewsletter";

const Footer = async () => {
  const t = await getTranslations("Footer");

  return (
    <footer className="bg-[#f4f7f5] px-3 pb-5 pt-8 dark:bg-[#0d1411] sm:px-5 lg:px-8">
      <div className="mx-auto w-full max-w-[1480px]">
        {/* =========================================================
            MAIN FOOTER
        ========================================================= */}
        <div className="relative overflow-hidden rounded-[30px] bg-gradient-to-br from-[#08a875] via-[#079f6f] to-[#078f65] text-white shadow-[0_25px_80px_rgba(0,70,45,0.18)]">
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -right-32 -top-32 h-[380px] w-[380px] rounded-full bg-white/[0.035]" />

          <div className="pointer-events-none absolute -right-8 top-[-70px] h-[230px] w-[230px] rounded-full border-[35px] border-white/[0.025]" />

          <div className="pointer-events-none absolute -bottom-40 -left-40 h-[450px] w-[450px] rounded-full bg-black/[0.035] blur-3xl" />

          <div className="relative px-5 py-7 sm:px-8 sm:py-9 lg:px-10 lg:py-10">
            {/* =====================================================
                HEADER
            ===================================================== */}
            <div className="flex flex-col gap-7 pb-8 lg:flex-row lg:items-center lg:justify-between">
              {/* Logo */}
              <Link
                href="/"
                aria-label="Best Khabar home"
                className="group inline-flex w-fit"
              >
                <div className="flex items-center rounded-[18px] bg-white px-5 py-3 shadow-[0_10px_35px_rgba(0,0,0,0.12)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_16px_40px_rgba(0,0,0,0.18)] sm:px-6 sm:py-3.5">
                  <div className="relative h-[50px] w-[205px] sm:h-[56px] sm:w-[240px] lg:h-[60px] lg:w-[265px]">
                    <Image
                      src="/best-khabar-footer.png"
                      alt="Best Khabar Logo"
                      fill
                      priority
                      sizes="(max-width: 640px) 205px, (max-width: 1024px) 240px, 265px"
                      className="object-contain object-left"
                    />
                  </div>
                </div>
              </Link>

              {/* Social */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
                <span className="text-[15px] font-bold text-white sm:text-base">
                  {t("followUs")}
                </span>

                <div className="flex items-center gap-2.5">
                  <Link
                    href={
                      SOCIAL_LINKS.find((link) => link.id === "facebook")
                        ?.href || "#"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.10] text-white shadow-[0_5px_18px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#079f6f] hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)]"
                  >
                    <FacebookIcon className="h-5 w-5" />
                  </Link>

                  <Link
                    href={
                      SOCIAL_LINKS.find((link) => link.id === "twitter")
                        ?.href || "#"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="X"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.10] text-white shadow-[0_5px_18px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#079f6f] hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)]"
                  >
                    <XIcon className="h-5 w-5" />
                  </Link>

                  <Link
                    href={
                      SOCIAL_LINKS.find((link) => link.id === "youtube")
                        ?.href || "#"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.10] text-white shadow-[0_5px_18px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#079f6f] hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)]"
                  >
                    <YoutubeIcon className="h-5 w-5" />
                  </Link>

                  <Link
                    href={
                      SOCIAL_LINKS.find((link) => link.id === "linkedin")
                        ?.href || "#"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.10] text-white shadow-[0_5px_18px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:text-[#079f6f] hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)]"
                  >
                    <LinkedInIcon className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* =====================================================
                CONTENT GRID
            ===================================================== */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {/* ===================================================
                  COMPANY CARD
              =================================================== */}
              <div className="group relative flex h-full flex-col overflow-hidden rounded-[24px] bg-gradient-to-br from-[#087f5d]/90 to-[#067956]/75 p-6 shadow-[0_15px_40px_rgba(0,45,30,0.10)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(0,40,25,0.18)]">
                {/* Top highlight */}
                <div className="absolute left-0 top-0 h-1 w-20 rounded-r-full bg-white/80" />

                {/* Soft glow */}
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/[0.045]" />

                <div className="relative flex h-full flex-col">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="h-9 w-1 rounded-full bg-white/75" />

                    <h3 className="text-[19px] font-extrabold leading-7 text-white">
                      {t("companyName")}
                    </h3>
                  </div>

                  <p className="text-[15px] font-medium leading-7 text-white/95">
                    {t("tagline")}
                  </p>
                  {/* CTA pushed to bottom */}
                  <div className="mt-auto pt-6">
                    <Link
                      href="/about"
                      className="group/about inline-flex w-full items-center justify-between rounded-xl bg-white px-4 py-3 text-[15px] font-extrabold text-[#078f65] shadow-[0_8px_25px_rgba(0,0,0,0.14)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_12px_30px_rgba(0,0,0,0.20)]"
                    >
                      <span>हाम्रो बारेमा</span>

                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#078f65]/10 transition-all duration-300 group-hover/about:bg-[#078f65] group-hover/about:text-white">
                        <span className="text-base transition-transform duration-300 group-hover/about:translate-x-0.5">
                          →
                        </span>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* ===================================================
                  FOOTER LINK GROUPS
              =================================================== */}
              {FOOTER_LINK_GROUPS.map((group) => (
                <div
                  key={group.titleKey}
                  className="group relative flex h-full flex-col overflow-hidden rounded-[24px] bg-gradient-to-br from-[#087f5d]/90 to-[#067956]/75 p-6 shadow-[0_15px_40px_rgba(0,45,30,0.10)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(0,40,25,0.18)]"
                >
                  {/* Top highlight */}
                  <div className="absolute left-0 top-0 h-1 w-20 rounded-r-full bg-white/75" />

                  <div className="mb-5 flex items-center gap-3">
                    <div className="h-9 w-1 rounded-full bg-white/75" />

                    <h3 className="text-[19px] font-extrabold leading-7 text-white">
                      {t(group.titleKey)}
                    </h3>
                  </div>

                  <ul className="space-y-3.5">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="group/link flex items-center gap-3 text-[15px] font-medium text-white/90 transition-all duration-300 hover:translate-x-1 hover:text-white"
                        >
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/55 transition-all duration-300 group-hover/link:scale-125 group-hover/link:bg-white" />

                          <span>{t(link.labelKey)}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* ===================================================
                  CONTACT CARD
              =================================================== */}
              <div className="group relative flex h-full flex-col overflow-hidden rounded-[24px] bg-gradient-to-br from-[#087f5d]/90 to-[#067956]/75 p-6 shadow-[0_15px_40px_rgba(0,45,30,0.10)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(0,40,25,0.18)]">
                {/* Top highlight */}
                <div className="absolute left-0 top-0 h-1 w-20 rounded-r-full bg-white/75" />

                <div className="mb-5 flex items-center gap-3">
                  <div className="h-9 w-1 rounded-full bg-white/75" />

                  <h3 className="text-[19px] font-extrabold text-white">
                    {t("contactTitle")}
                  </h3>
                </div>

                {/* Office */}
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/60">
                    {t("officeLabel")}
                  </p>

                  <p className="mt-2 text-[15px] font-medium leading-7 text-white/95">
                    {t("location")}
                  </p>
                </div>

                {/* Europe */}
                <div className="mt-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/60">
                    {t("europeContact")}
                  </p>

                  <p className="mt-2 text-[15px] font-bold leading-7 text-white">
                    +32 465 508 473
                    <span className="mx-1.5 text-white/45">|</span>
                    +351 920 552 576
                  </p>
                </div>

                {/* Email */}
                <div className="mt-5">
                  <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/60">
                    {t("emailLabel")}
                  </p>

                  <a
                    href="mailto:bestkhabarweb@gmail.com"
                    className="mt-2 block break-all text-[15px] font-semibold leading-6 text-white transition-colors hover:text-white/75"
                  >
                    bestkhabarweb@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* =====================================================
                NEWSLETTER
            ===================================================== */}
            <div className="mt-6">
              <FooterNewsletter />
            </div>

            {/* =====================================================
                BOTTOM BAR
            ===================================================== */}
            <div className="mt-7 flex flex-col gap-4 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[14px] font-medium leading-6 text-white/75">
                {t("copyright", {
                  year: new Date().getFullYear(),
                })}
              </p>
              <p>
                Developed & Maintained by:{" "}
                <a href="https://codeengine.com.np">Code Engine Pvt. Ltd.</a>
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 text-[14px] font-semibold text-white/80 sm:justify-end">
                <Link
                  href="/about"
                  className="transition-colors hover:text-white"
                >
                  हाम्रो बारेमा
                </Link>

                <span className="h-1 w-1 rounded-full bg-white/40" />

                <Link
                  href="/contact"
                  className="transition-colors hover:text-white"
                >
                  सम्पर्क
                </Link>

                <span className="h-1 w-1 rounded-full bg-white/40" />

                <a
                  href="https://www.bestkhabar.com"
                  className="transition-colors hover:text-white"
                >
                  www.bestkhabar.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
