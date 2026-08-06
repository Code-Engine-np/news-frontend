"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { sendContactMessage } from "@/src/lib/api";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "mt-1 w-full rounded-lg border border-line bg-transparent px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-primary dark:border-[#2a3832] dark:text-gray-100";

const ContactForm = () => {
  const t = useTranslations("Contact");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const update =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (status === "error") setStatus("idle");
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email.includes("@")) {
      setStatus("error");
      setErrorMessage(t("invalidEmail"));
      return;
    }
    setStatus("submitting");
    setErrorMessage("");
    try {
      await sendContactMessage({
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim() || undefined,
        message: form.message.trim(),
      });
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMessage(t("error"));
      console.error("Contact form error:", err);
    }
  };

  if (status === "success") {
    return (
      <div className="flex items-center gap-3 rounded-xl bg-[#f6faf7] p-6 text-sm text-ink dark:bg-[#22302a] dark:text-gray-100">
        <CheckCircle className="h-6 w-6 shrink-0 text-primary" />
        <span className="font-medium">{t("success")}</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cf-name" className="block text-sm font-medium text-ink">
            {t("nameLabel")}
          </label>
          <input
            id="cf-name"
            type="text"
            value={form.name}
            onChange={update("name")}
            required
            maxLength={120}
            placeholder={t("namePlaceholder")}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="cf-email" className="block text-sm font-medium text-ink">
            {t("emailLabel")}
          </label>
          <input
            id="cf-email"
            type="email"
            value={form.email}
            onChange={update("email")}
            required
            placeholder={t("emailPlaceholder")}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="cf-subject" className="block text-sm font-medium text-ink">
          {t("subjectLabel")}{" "}
          <span className="font-normal text-muted">{t("optional")}</span>
        </label>
        <input
          id="cf-subject"
          type="text"
          value={form.subject}
          onChange={update("subject")}
          maxLength={200}
          placeholder={t("subjectPlaceholder")}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="cf-message" className="block text-sm font-medium text-ink">
          {t("messageLabel")}
        </label>
        <textarea
          id="cf-message"
          value={form.message}
          onChange={update("message")}
          required
          rows={5}
          maxLength={5000}
          placeholder={t("messagePlaceholder")}
          className={`${inputClass} resize-y`}
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-50"
      >
        {status === "submitting" ? (
          t("sending")
        ) : (
          <>
            {t("send")}
            <Send className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
};

export default ContactForm;
