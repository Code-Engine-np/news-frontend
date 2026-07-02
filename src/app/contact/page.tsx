import type { Metadata } from "next";
import NewsShell from "@/src/app/components/layout/NewsShell";

export const metadata: Metadata = {
  title: "Contact Us | Best Khabar",
  description: "Get in touch with the Best Khabar newsroom.",
};

export default function ContactPage() {
  return (
    <NewsShell>
      <div className="mx-auto w-full max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-6">
        <section className="rounded-2xl border border-[#d8dfd8] bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0a8f61]">
            Contact us
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-[#1a1c1c] sm:text-4xl">
            Reach the Best Khabar team
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-[#51605a]">
            For story tips, editorial corrections, and partnership requests, use
            the channels below.
          </p>
        </section>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-[#d8dfd8] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-[#1a1c1c]">
              Contact details
            </h2>
            <dl className="mt-4 space-y-4 text-sm text-[#51605a]">
              <div>
                <dt className="font-semibold text-[#1a1c1c]">Email</dt>
                <dd>newsroom@bestkhabar.com</dd>
              </div>
              <div>
                <dt className="font-semibold text-[#1a1c1c]">Phone</dt>
                <dd>+977-01-555-0101</dd>
              </div>
              <div>
                <dt className="font-semibold text-[#1a1c1c]">Office</dt>
                <dd>Kathmandu, Nepal</dd>
              </div>
            </dl>
          </section>

          <section className="rounded-2xl border border-[#d8dfd8] bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-[#1a1c1c]">
              Send a message
            </h2>
            <div className="mt-4 space-y-4 text-sm text-[#51605a]">
              <div className="rounded-xl bg-[#f6faf7] p-4">
                This screen is ready for form wiring when the backend endpoint
                is available.
              </div>
              <div className="rounded-xl bg-[#f6faf7] p-4">
                Editorial corrections, advertising inquiries, and general
                support can all be routed here.
              </div>
            </div>
          </section>
        </div>
      </div>
    </NewsShell>
  );
}
