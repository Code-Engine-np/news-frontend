import type { Metadata } from "next";
import { Link } from "@/src/i18n/navigation";
import NewsShell from "@/src/components/layout/NewsShell";

export const metadata: Metadata = {
  title: "हाम्रो बारेमा | बेस्ट खबर",
  description:
    "बेस्ट खबर डटकमको बारेमा जान्नुहोस् — हाम्रो उद्देश्य, टोली, र सम्पर्क विवरण।",
};

export default function AboutPage() {
  return (
    <NewsShell>
      <main className="bg-[#f5f7f6] dark:bg-[#101815]">
        <div className="relative overflow-hidden">
          {/* Background decoration */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-primary/[0.08] via-primary/[0.025] to-transparent" />

          <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-primary/[0.08] blur-3xl" />

          <div className="pointer-events-none absolute -right-40 top-[700px] h-96 w-96 rounded-full bg-primary/[0.07] blur-3xl" />

          <div className="relative mx-auto w-full max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-8 lg:pt-12">
            {/* =====================================================
                ROW 1
                ABOUT + TEAM + LEGAL
            ===================================================== */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* ===================================================
                  ABOUT US
              =================================================== */}
              <section className="relative overflow-hidden rounded-[28px] border border-line/80 bg-white shadow-[0_15px_50px_rgba(0,0,0,0.05)] dark:border-[#293832] dark:bg-[#1a2521] lg:col-span-2">
                {/* Accent */}
                <div className="absolute left-0 top-0 h-1.5 w-full bg-primary" />

                {/* Decoration */}
                <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full border-[45px] border-primary/[0.035]" />

                <div className="relative p-6 sm:p-8 lg:p-10">
                  {/* Label */}
                  <div className="flex items-center gap-3">
                    <span className="h-[2px] w-9 bg-primary" />

                    <span className="text-sm font-bold uppercase tracking-[0.22em] text-primary">
                      हाम्रो बारेमा
                    </span>
                  </div>

                  {/* Heading */}
                  <h1 className="mt-3 text-3xl font-black tracking-tight text-ink dark:text-gray-100 sm:text-4xl">
                    बेस्ट खबर डटकम
                  </h1>

                  {/* About content */}
                  <div className="mt-7 space-y-5 text-base leading-8 text-muted dark:text-gray-300 sm:text-[17px] sm:leading-9">
                    <p>
                      &#39;बेस्ट खबर डटकम&#39; पत्रकारिता क्षेत्रमा फरक र
                      उत्कृष्ट खबर पस्कने लक्ष्यका साथ स्थापित &#39;अनलाईन न्युज
                      पोर्टल&#39; हो। हामी हाम्रा आदरणीय पाठकवर्गलाई फरक खालको र
                      विश्वसनीय समाचार दिने न्यूज पोर्टलको रुपमा बेस्ट खबरलाई
                      अगाडि बढाउने प्रयासमा छौं।
                    </p>

                    <p>
                      पत्रकारिताको मर्म र मान्यतालाई आत्मसाथ गर्दै अघि बढ्ने
                      हाम्रो प्रण हुनेछ। समाचार दिने नाममा हतारो गर्ने र
                      समाचारका नाममा समाजलाई आतङ्कित बनाउने, वितृष्णा फैलाउने
                      समाचार र श्रव्यदृष्य हामी कहिल्यै पनि प्रकाशन तथा प्रशारण
                      गर्ने छैनौं। हामी हाम्रा पाठकवर्ग, समस्त विज्ञापनदाता र
                      शुभचिन्तक माझ विश्वसनीय र प्रभावकारी न्यूज साईटको रुपमा
                      स्थापित हुने जमर्कोमा छौं।
                    </p>

                    <p>
                      पार्टीकारिता होइन पत्रकारिता हाम्रो मूल मर्म हुनेछ। आम
                      नागरिकमा सकारात्मक सन्देश तथा सकारात्मक समाचार प्रवाह
                      गर्नु हाम्रो मूल ध्येय हुनेछ। समाज परिवर्तनमा महत्वपूर्ण
                      घटना, व्यक्ति तथा समूहका बारेमा हामी विशेष प्राथमिकताका
                      साथ समाचार तथा जानकारीहरू संप्रेषित गर्दछौं।
                    </p>

                    <p>
                      समाजमा विद्यमान विकृति, विसङ्गति, भ्रष्टाचार तथा कमिसनखोरी
                      जस्ता कार्य विरुद्ध हामी निरन्तररूपमा खबरदारी गरिरहने छौं।
                      त्यसैले माथिका हाम्रा मर्म र सिद्धान्त भित्रै रहेर
                      स–प्रमाण समाचार, जानकारी तथा सूचनाहरू पठाइदिनु हुन विनम्र
                      अनुरोध गर्दछौं।
                    </p>
                  </div>
                </div>
              </section>

              {/* ===================================================
                  TEAM + LEGAL
              =================================================== */}
              <div className="flex flex-col gap-6">
                {/* =================================================
                    TEAM
                ================================================= */}
                <section className="relative overflow-hidden rounded-[28px] border border-line/80 bg-white shadow-[0_15px_50px_rgba(0,0,0,0.05)] dark:border-[#293832] dark:bg-[#1a2521]">
                  <div className="absolute left-0 top-0 h-1.5 w-full bg-primary" />

                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                          Team
                        </span>

                        <h2 className="mt-2 text-2xl font-extrabold text-ink dark:text-gray-100">
                          बेस्ट खबर टिम
                        </h2>
                      </div>

                      {/* Team icon */}
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"
                          />

                          <circle cx="9" cy="7" r="4" />

                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
                          />
                        </svg>
                      </div>
                    </div>

                    <p className="mt-4 border-b border-line pb-5 text-sm leading-6 text-muted dark:border-[#293832] dark:text-gray-400">
                      &#39;पिवेभ्स भिजन कर्नर प्रा.लि.&#39; (Pwaves Vision
                      Corner Pvt. Ltd.) द्वारा सञ्चालित
                    </p>

                    {/* Team members */}
                    <div className="mt-5 space-y-3">
                      {[
                        {
                          role: "संस्थापक / प्रधान सम्पादक",
                          name: "प्रतीक लामिछाने",
                        },
                        {
                          role: "सम्पादक",
                          name: "इन्दिराकुमारी शर्मा",
                        },
                        {
                          role: "फोटो पत्रकार / सम्वाददाता",
                          name: "प्रदीप सापकोटा",
                        },
                        {
                          role: "अमेरिका सम्वाददाता",
                          name: "बन्दना सापकोटा",
                        },
                      ].map(({ role, name }) => (
                        <div
                          key={role}
                          className="rounded-xl bg-[#f7f9f8] px-4 py-3 dark:bg-[#202d28]"
                        >
                          <p className="text-xs leading-5 text-muted dark:text-gray-400">
                            {role}
                          </p>

                          <p className="mt-1 text-[15px] font-bold text-ink dark:text-gray-100">
                            {name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* =================================================
                    LEGAL
                ================================================= */}
                <section className="relative overflow-hidden rounded-[28px] border border-line/80 bg-white shadow-[0_15px_50px_rgba(0,0,0,0.05)] dark:border-[#293832] dark:bg-[#1a2521]">
                  <div className="absolute left-0 top-0 h-1.5 w-full bg-primary" />

                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                          Legal
                        </span>

                        <h2 className="mt-2 text-2xl font-extrabold text-ink dark:text-gray-100">
                          दर्ता तथा कानुनी जानकारी
                        </h2>
                      </div>

                      {/* Legal icon */}
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4z"
                          />

                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12l2 2 4-4"
                          />
                        </svg>
                      </div>
                    </div>

                    <div className="mt-6 space-y-4">
                      <div className="rounded-xl bg-[#f7f9f8] p-4 dark:bg-[#202d28]">
                        <p className="text-sm leading-6 text-muted dark:text-gray-400">
                          सूचना तथा प्रसारण विभाग दर्ता नम्बर
                        </p>

                        <p className="mt-2 text-xl font-black text-primary">
                          १६८१/०७६–७७
                        </p>
                      </div>

                      <div className="rounded-xl bg-[#f7f9f8] p-4 dark:bg-[#202d28]">
                        <p className="text-sm leading-6 text-muted dark:text-gray-400">
                          प्रेस काउन्सिल नेपाल सूचीकरण नम्बर
                        </p>

                        <p className="mt-2 text-xl font-black text-primary">
                          ४५१/०७६–७७
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            {/* =====================================================
                ROW 2 - CONTACT
            ===================================================== */}
            <section className="relative mt-6 overflow-hidden rounded-[30px] border border-line/80 bg-white shadow-[0_18px_60px_rgba(0,0,0,0.06)] dark:border-[#293832] dark:bg-[#1a2521]">
              {/* Accent */}
              <div className="absolute left-0 top-0 h-1.5 w-full bg-primary" />

              {/* Decoration */}
              <div className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full border-[45px] border-primary/[0.035]" />

              <div className="relative p-6 sm:p-8 lg:p-10">
                {/* =================================================
                    CONTACT HEADER
                ================================================= */}
                <div className="flex flex-col gap-5 border-b border-line pb-7 dark:border-[#293832] sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="h-[2px] w-9 bg-primary" />

                      <span className="text-sm font-bold uppercase tracking-[0.22em] text-primary">
                        Contact
                      </span>
                    </div>

                    <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-ink dark:text-gray-100">
                      सम्पर्क
                    </h2>
                  </div>

                  <Link
                    href="/contact"
                    className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-dark hover:shadow-lg"
                  >
                    सम्पर्क गर्नुहोस्
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 12h14M13 6l6 6-6 6"
                      />
                    </svg>
                  </Link>
                </div>

                {/* =================================================
                    CONTACT INFORMATION
                ================================================= */}
                <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
                  {/* =================================================
                      OFFICE
                  ================================================= */}
                  <div className="relative overflow-hidden rounded-2xl border border-line/70 bg-[#f7f9f8] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-[#293832] dark:bg-[#202d28]">
                    <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-full bg-primary/[0.05]" />

                    <div className="relative">
                      {/* Icon */}
                      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <svg
                          width="21"
                          height="21"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 21h18M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16M9 21v-4h6v4M9 7h1M14 7h1M9 11h1M14 11h1"
                          />
                        </svg>
                      </div>

                      <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted dark:text-gray-400">
                        कार्यालय
                      </p>

                      <p className="mt-2 text-[15px] leading-7 text-ink dark:text-gray-100">
                        तारकेश्वर नगरपालिका वडा नम्बर ११, काठमाडौं, नेपाल
                        <span className="ml-1 text-muted dark:text-gray-400">
                          (Tarkeshwor Municipality-11, Kathmandu, Nepal)
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* =================================================
                      PHONE CONTACTS
                  ================================================= */}
                  <div className="relative overflow-hidden rounded-2xl border border-line/70 bg-[#f7f9f8] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-[#293832] dark:bg-[#202d28]">
                    <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-full bg-primary/[0.05]" />

                    <div className="relative">
                      {/* Phone icon */}
                      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <svg
                          width="21"
                          height="21"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.12.9.33 1.78.62 2.63a2 2 0 01-.45 2.11L8 9.73a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0122 16.92z"
                          />
                        </svg>
                      </div>

                      {/* Nepal */}
                      <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted dark:text-gray-400">
                        मोबाइल / भाइबर (नेपाल)
                      </p>

                      <p className="mt-2 text-base font-bold leading-7 text-ink dark:text-gray-100">
                        +977–9851229512 (Viber also)
                      </p>

                      {/* Divider */}
                      <div className="my-5 h-px bg-line dark:bg-[#293832]" />

                      {/* Europe */}
                      <p className="text-xs font-bold  tracking-[0.15em] text-muted dark:text-gray-400">
                        युरोप सम्पर्क
                      </p>

                      <p className="mt-2 text-base font-bold leading-7 text-ink dark:text-gray-100">
                        +32 465 508 473
                        <span className="mx-1.5 text-muted dark:text-gray-500">
                          |
                        </span>
                        +351 920 552 576
                      </p>

                      <p className="mt-1 text-xs text-muted dark:text-gray-400">
                        (WhatsApp also)
                      </p>
                    </div>
                  </div>

                  {/* =================================================
                      EMAIL + WEBSITE
                  ================================================= */}
                  <div className="relative overflow-hidden rounded-2xl border border-line/70 bg-[#f7f9f8] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-[#293832] dark:bg-[#202d28]">
                    <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-full bg-primary/[0.05]" />

                    <div className="relative">
                      {/* Email icon */}
                      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <svg
                          width="21"
                          height="21"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <rect x="3" y="5" width="18" height="14" rx="2" />

                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 7l9 6 9-6"
                          />
                        </svg>
                      </div>

                      {/* Email */}
                      <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted dark:text-gray-400">
                        इमेल
                      </p>

                      <div className="mt-2 flex flex-col gap-2">
                        <a
                          href="mailto:bestkhabarweb@gmail.com"
                          className="break-all text-[15px] font-semibold text-primary transition-colors hover:underline"
                        >
                          bestkhabarweb@gmail.com
                        </a>

                        <a
                          href="mailto:bestkhabaronlinenews@gmail.com"
                          className="break-all text-[15px] font-semibold text-primary transition-colors hover:underline"
                        >
                          bestkhabaronlinenews@gmail.com
                        </a>
                      </div>

                      {/* Divider */}
                      <div className="my-5 h-px bg-line dark:bg-[#293832]" />

                      {/* Website */}
                      <p className="text-xs font-bold uppercase tracking-[0.15em] text-muted dark:text-gray-400">
                        वेबसाईट
                      </p>

                      <a
                        href="https://www.bestkhabar.com"
                        className="mt-2 inline-block text-[15px] font-semibold text-primary transition-colors hover:underline"
                      >
                        www.bestkhabar.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </NewsShell>
  );
}
