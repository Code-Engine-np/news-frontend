import type { Metadata } from "next";
import Link from "next/link";
import NewsShell from "@/src/app/components/layout/NewsShell";

export const metadata: Metadata = {
  title: "Privacy Policy | Best Khabar",
  description: "How Best Khabar handles privacy and reader data.",
};

export default function PrivacyPage() {
  return (
    <NewsShell>
      <div className="mx-auto w-full max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-6">
        <section className="rounded-2xl border border-[#d8dfd8] bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0a8f61]">
            Privacy Policy
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-[#1a1c1c] sm:text-4xl">
            Reader privacy matters
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[#51605a]">
            Best Khabar uses basic analytics, newsletter signups, and
            advertising placements to keep the site running while respecting
            reader privacy.
          </p>
        </section>

        <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {[
            "We only collect information needed to operate the site and newsletter.",
            "Advertising partners may use standard browser cookies for campaign measurement.",
            "You can unsubscribe from email updates at any time.",
            "Policy updates will be reflected on this page as the site evolves.",
          ].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-[#d8dfd8] bg-white p-6 shadow-sm"
            >
              <p className="text-base leading-7 text-[#1a1c1c]">{item}</p>
            </div>
          ))}
        </section>

        <section className="mt-8 rounded-2xl border border-[#d8dfd8] bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-[#1a1c1c]">Questions?</h2>
          <p className="mt-3 text-[#51605a]">
            Contact the team if you need clarifications about the way Best
            Khabar uses your information.
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-flex rounded-full bg-[#0a8f61] px-5 py-3 text-sm font-semibold text-white"
          >
            Contact us
          </Link>
        </section>
      </div>
    </NewsShell>
  );
}
