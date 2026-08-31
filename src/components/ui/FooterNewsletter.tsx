"use client";

import { useState } from "react";
import { Mail, CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { subscribeNewsletter } from "@/src/lib/api";

const FooterNewsletter = () => {
  const t = useTranslations("Newsletter");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setStatus("error");
      setErrorMsg(t("invalidEmail"));
      return;
    }
    setStatus("submitting");
    setErrorMsg("");
    try {
      await subscribeNewsletter(email);
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setErrorMsg(t("failed"));
    }
  };

  return (
    <div className="rounded-2xl border border-white/20 bg-white/10 px-5 py-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        {/* Icon + text */}
        <div className="flex items-center gap-4 sm:flex-shrink-0">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary">
            <Mail className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-white">{t("title")}</p>
            <p className="mt-0.5 text-sm text-white/80">{t("subtitle")}</p>
          </div>
        </div>

        {/* Form */}
        {status === "success" ? (
          <div className="flex flex-1 items-center gap-2 rounded-xl bg-white/10 px-4 py-3">
            <CheckCircle className="h-4 w-4 shrink-0 text-green-300" />
            <span className="text-sm text-white">{t("success")}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-2 sm:flex-row sm:gap-3">
            <div className="flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (status === "error") setStatus("idle"); }}
                placeholder={t("emailPlaceholder")}
                disabled={status === "submitting"}
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/50 outline-none focus:border-white/50"
                aria-label={t("emailLabel")}
              />
              {status === "error" && (
                <p className="mt-1 text-xs text-red-300">{errorMsg}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="shrink-0 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-50 sm:whitespace-nowrap"
            >
              {status === "submitting" ? t("subscribing") : `${t("subscribe")} →`}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default FooterNewsletter;
