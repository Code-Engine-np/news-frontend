// "use client";

// import { useState } from "react";
// import { Mail, CheckCircle } from "lucide-react";
// import { useTranslations } from "next-intl";
// import { subscribeNewsletter } from "@/src/lib/api";

// const FooterNewsletter = () => {
//   const t = useTranslations("Newsletter");
//   const [email, setEmail] = useState("");
//   const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
//   const [errorMsg, setErrorMsg] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!email.includes("@")) {
//       setStatus("error");
//       setErrorMsg(t("invalidEmail"));
//       return;
//     }
//     setStatus("submitting");
//     setErrorMsg("");
//     try {
//       await subscribeNewsletter(email);
//       setStatus("success");
//       setEmail("");
//     } catch {
//       setStatus("error");
//       setErrorMsg(t("failed"));
//     }
//   };

//   return (
//     <div className="rounded-2xl border border-white/20 bg-white/10 px-5 py-5">
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
//         {/* Icon + text */}
//         <div className="flex items-center gap-4 sm:flex-shrink-0">
//           <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary">
//             <Mail className="h-5 w-5 text-white" />
//           </div>
//           <div>
//             <p className="font-bold text-white">{t("title")}</p>
//             <p className="mt-0.5 text-sm text-white/80">{t("subtitle")}</p>
//           </div>
//         </div>

//         {/* Form */}
//         {status === "success" ? (
//           <div className="flex flex-1 items-center gap-2 rounded-xl bg-white/10 px-4 py-3">
//             <CheckCircle className="h-4 w-4 shrink-0 text-green-300" />
//             <span className="text-sm text-white">{t("success")}</span>
//           </div>
//         ) : (
//           <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-2 sm:flex-row sm:gap-3">
//             <div className="flex-1">
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => { setEmail(e.target.value); if (status === "error") setStatus("idle"); }}
//                 placeholder={t("emailPlaceholder")}
//                 disabled={status === "submitting"}
//                 className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white placeholder-white/50 outline-none focus:border-white/50"
//                 aria-label={t("emailLabel")}
//               />
//               {status === "error" && (
//                 <p className="mt-1 text-xs text-red-300">{errorMsg}</p>
//               )}
//             </div>
//             <button
//               type="submit"
//               disabled={status === "submitting"}
//               className="shrink-0 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-50 sm:whitespace-nowrap"
//             >
//               {status === "submitting" ? t("subscribing") : `${t("subscribe")} →`}
//             </button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FooterNewsletter;
"use client";

import { useState } from "react";
import { Mail, CheckCircle, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { subscribeNewsletter } from "@/src/lib/api";

const FooterNewsletter = () => {
  const t = useTranslations("Newsletter");

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    <section className="relative overflow-hidden rounded-[22px] border border-white/20 bg-white/[0.08]">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-16 -top-24 h-52 w-52 rounded-full bg-white/[0.06]" />
      <div className="pointer-events-none absolute -bottom-28 left-1/3 h-44 w-44 rounded-full bg-white/[0.04]" />

      <div className="relative px-5 py-5 sm:px-6 sm:py-6 lg:px-7">
        {status === "success" ? (
          /* =====================================================
             SUCCESS STATE
          ===================================================== */
          <div className="flex min-h-[100px] items-center justify-center">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-primary-bright shadow-lg">
                <CheckCircle className="h-6 w-6" />
              </div>

              <div>
                <p className="text-[17px] font-extrabold text-white">
                  {t("success")}
                </p>

                <p className="mt-1 text-[14px] font-medium text-white/75">
                  धन्यवाद! तपाईं हाम्रो न्यूजलेटरमा सदस्य हुनुभएको छ।
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* =====================================================
             NEWSLETTER CONTENT
          ===================================================== */
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:gap-8">
            {/* =================================================
                ICON + TEXT
            ================================================= */}
            <div className="flex items-center gap-4 xl:min-w-[390px]">
              {/* Icon */}
              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-primary-bright shadow-[0_8px_25px_rgba(0,0,0,0.12)]">
                <Mail className="h-6 w-6" />

                {/* Small decorative dot */}
                <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-white/60" />
              </div>

              {/* Text */}
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-[18px] font-extrabold leading-6 text-white">
                    {t("title")}
                  </p>

                  <span className="hidden rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white/70 sm:inline-block">
                    Newsletter
                  </span>
                </div>

                <p className="mt-1.5 max-w-md text-[14px] font-medium leading-6 text-white/80">
                  {t("subtitle")}
                </p>
              </div>
            </div>

            {/* =================================================
                FORM
            ================================================= */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-1 flex-col gap-2.5 sm:flex-row sm:items-start"
            >
              {/* Input */}
              <div className="flex-1">
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/45" />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);

                      if (status === "error") {
                        setStatus("idle");
                        setErrorMsg("");
                      }
                    }}
                    placeholder={t("emailPlaceholder")}
                    disabled={status === "submitting"}
                    aria-label={t("emailLabel")}
                    className="h-[52px] w-full rounded-xl border border-white/20 bg-black/[0.08] pl-12 pr-4 text-[15px] font-medium text-white outline-none transition-all duration-300 placeholder:text-white/50 hover:border-white/30 focus:border-white/60 focus:bg-black/[0.12] disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>

                {status === "error" && (
                  <p className="mt-1.5 px-1 text-[13px] font-medium text-red-200">
                    {errorMsg}
                  </p>
                )}
              </div>

              {/* Subscribe button */}
              <button
                type="submit"
                disabled={status === "submitting"}
                className="group flex h-[52px] shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 text-[15px] font-extrabold text-primary-bright shadow-[0_8px_25px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/95 hover:shadow-[0_12px_30px_rgba(0,0,0,0.18)] disabled:cursor-not-allowed disabled:opacity-50 sm:px-7"
              >
                <span>
                  {status === "submitting" ? t("subscribing") : t("subscribe")}
                </span>

                {status !== "submitting" && (
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

export default FooterNewsletter;
