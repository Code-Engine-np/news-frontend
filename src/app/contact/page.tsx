import NewsShell from "@/src/components/layout/NewsShell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Best Khabar",
  description: "Get in touch with the Best Khabar newsroom.",
};

export default function ContactPage() {
  return (
    <NewsShell>
      <div className="mx-auto w-full max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-6">
        <section className="rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Contact us
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-ink sm:text-4xl">
            Reach the Best Khabar team
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-muted">
            For story tips, editorial corrections, and partnership requests, use
            the channels below.
          </p>
        </section>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-line bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-ink">Contact details</h2>
            <dl className="mt-4 space-y-4 text-sm text-muted">
              <div>
                <dt className="font-semibold text-ink">Email</dt>
                <dd>newsroom@bestkhabar.com</dd>
              </div>
              <div>
                <dt className="font-semibold text-ink">Phone</dt>
                <dd>+977-01-555-0101</dd>
              </div>
              <div>
                <dt className="font-semibold text-ink">Office</dt>
                <dd>Kathmandu, Nepal</dd>
              </div>
            </dl>
          </section>

          <section className="rounded-2xl border border-line bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-ink">Send a message</h2>
            <div className="mt-4 space-y-4 text-sm text-muted">
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
