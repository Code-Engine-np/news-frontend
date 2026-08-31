import type { Metadata } from "next";
import { Link } from "@/src/i18n/navigation";
import NewsShell from "@/src/components/layout/NewsShell";

export const metadata: Metadata = {
  title: "हाम्रो बारेमा | बेस्ट खबर",
  description: "बेस्ट खबर डटकमको बारेमा जान्नुहोस् — हाम्रो उद्देश्य, टोली, र सम्पर्क विवरण।",
};

export default function AboutPage() {
  return (
    <NewsShell>
      <div className="mx-auto w-full max-w-4xl px-4 pb-16 pt-8 sm:px-6 lg:px-6">

        {/* Intro section */}
        <section className="rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-10 dark:bg-[#1e2a26] dark:border-[#2a3832]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            हाम्रो बारेमा
          </p>
          <h1 className="mt-2 text-2xl font-extrabold text-ink dark:text-gray-100 sm:text-3xl">
            बेस्ट खबर डटकम
          </h1>

          <div className="mt-6 space-y-5 text-base leading-8 text-muted dark:text-gray-300">
            <p>
              &#39;बेस्ट खबर डटकम&#39; पत्रकारिता क्षेत्रमा फरक र उत्कृष्ट खबर पस्कने लक्ष्यका
              साथ स्थापित &#39;अनलाईन न्युज पोर्टल&#39; हो। हामी हाम्रा आदरणीय पाठकवर्गलाई फरक
              खालको र विश्वसनीय समाचार दिने न्यूज पोर्टलको रुपमा बेस्ट खबरलाई अगाडि बढाउने
              प्रयासमा छौं।
            </p>
            <p>
              पत्रकारिताको मर्म र मान्यतालाई आत्मसाथ गर्दै अघि बढ्ने हाम्रो प्रण हुनेछ। समाचार
              दिने नाममा हतारो गर्ने र समाचारका नाममा समाजलाई आतङ्कित बनाउने, वितृष्णा फैलाउने
              समाचार र श्रव्यदृष्य हामी कहिल्यै पनि प्रकाशन तथा प्रशारण गर्ने छैनौं। हामी हाम्रा
              पाठकवर्ग, समस्त विज्ञापनदाता र शुभचिन्तक माझ विश्वसनीय र प्रभावकारी न्यूज साईटको
              रुपमा स्थापित हुने जमर्कोमा छौं।
            </p>
            <p>
              पार्टीकारिता होइन पत्रकारिता हाम्रो मूल मर्म हुनेछ। आम नागरिकमा सकारात्मक सन्देश
              तथा सकारात्मक समाचार प्रवाह गर्नु हाम्रो मूल ध्येय हुनेछ। समाज परिवर्तनमा
              महत्वपूर्ण घटना, व्यक्ति तथा समूहका बारेमा हामी विशेष प्राथमिकताका साथ समाचार तथा
              जानकारीहरू संप्रेषित गर्दछौं।
            </p>
            <p>
              समाजमा विद्यमान विकृति, विसङ्गति, भ्रष्टाचार तथा कमिसनखोरी जस्ता कार्य विरुद्ध
              हामी निरन्तररूपमा खबरदारी गरिरहने छौं। त्यसैले माथिका हाम्रा मर्म र सिद्धान्त
              भित्रै रहेर स–प्रमाण समाचार, जानकारी तथा सूचनाहरू पठाइदिनु हुन विनम्र अनुरोध
              गर्दछौं।
            </p>
          </div>
        </section>

        {/* Team section */}
        <section className="mt-6 rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8 dark:bg-[#1e2a26] dark:border-[#2a3832]">
          <h2 className="text-xl font-bold text-ink dark:text-gray-100">
            बेस्ट खबर टिम
          </h2>
          <p className="mt-1 text-sm text-muted dark:text-gray-400">
            &#39;पिवेभ्स भिजन कर्नर प्रा.लि.&#39; (Pwaves Vision Corner Pvt. Ltd.) द्वारा सञ्चालित
          </p>

          <dl className="mt-6 divide-y divide-line dark:divide-[#2a3832]">
            {[
              { role: "संस्थापक / प्रधान सम्पादक", name: "प्रतीक लामिछाने" },
              { role: "सम्पादक", name: "इन्दिराकुमारी शर्मा" },
              { role: "फोटो पत्रकार / सम्वाददाता", name: "प्रदीप सापकोटा" },
              { role: "अमेरिका सम्वाददाता", name: "बन्दना सापकोटा" },
            ].map(({ role, name }) => (
              <div key={role} className="flex flex-wrap gap-x-6 gap-y-1 py-3">
                <dt className="w-56 flex-none text-sm font-medium text-muted dark:text-gray-400">{role}</dt>
                <dd className="text-sm font-semibold text-ink dark:text-gray-100">{name}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Registration & legal */}
        <section className="mt-6 rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8 dark:bg-[#1e2a26] dark:border-[#2a3832]">
          <h2 className="text-xl font-bold text-ink dark:text-gray-100">दर्ता तथा कानुनी जानकारी</h2>
          <dl className="mt-4 divide-y divide-line dark:divide-[#2a3832]">
            {[
              {
                label: "सूचना तथा प्रसारण विभाग दर्ता नम्बर",
                value: "१६८१/०७६–७७",
              },
              {
                label: "प्रेस काउन्सिल नेपाल सूचीकरण नम्बर",
                value: "४५१/०७६–७७",
              },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-wrap gap-x-6 gap-y-1 py-3">
                <dt className="w-72 flex-none text-sm text-muted dark:text-gray-400">{label}</dt>
                <dd className="text-sm font-semibold text-ink dark:text-gray-100">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Contact section */}
        <section className="mt-6 rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8 dark:bg-[#1e2a26] dark:border-[#2a3832]">
          <h2 className="text-xl font-bold text-ink dark:text-gray-100">सम्पर्क</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="font-medium text-muted dark:text-gray-400">कार्यालय</dt>
              <dd className="mt-0.5 text-ink dark:text-gray-100">
                तारकेश्वर नगरपालिका वडा नम्बर ११, काठमाडौं, नेपाल
                <span className="ml-2 text-muted dark:text-gray-400">(Tarkeshwor Municipality-11, Kathmandu, Nepal)</span>
              </dd>
            </div>
            <div>
              <dt className="font-medium text-muted dark:text-gray-400">मोबाइल / भाइबर (नेपाल)</dt>
              <dd className="mt-0.5 text-ink dark:text-gray-100">
                +977–9851229512 (Viber also)
              </dd>
            </div>
            <div>
              <dt className="font-medium text-muted dark:text-gray-400">युरोप सम्पर्क</dt>
              <dd className="mt-0.5 text-ink dark:text-gray-100">
                +32 465 508 473 &nbsp;|&nbsp; +351 920 552 576 (WhatsApp also)
              </dd>
            </div>
            <div>
              <dt className="font-medium text-muted dark:text-gray-400">इमेल</dt>
              <dd className="mt-0.5 space-x-2 text-ink dark:text-gray-100">
                <a href="mailto:bestkhabarweb@gmail.com" className="text-primary hover:underline">
                  bestkhabarweb@gmail.com
                </a>
                <span className="text-muted">|</span>
                <a href="mailto:bestkhabaronlinenews@gmail.com" className="text-primary hover:underline">
                  bestkhabaronlinenews@gmail.com
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-medium text-muted dark:text-gray-400">वेबसाईट</dt>
              <dd className="mt-0.5">
                <a href="https://www.bestkhabar.com" className="text-primary hover:underline">
                  www.bestkhabar.com
                </a>
              </dd>
            </div>
          </dl>

          <Link
            href="/contact"
            className="mt-6 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
          >
            सम्पर्क गर्नुहोस्
          </Link>
        </section>

      </div>
    </NewsShell>
  );
}
