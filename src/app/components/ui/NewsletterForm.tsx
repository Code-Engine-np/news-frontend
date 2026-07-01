"use client";

import { useState } from "react";
import { Mail, Send, CheckCircle } from "lucide-react";

const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      return;
    }

    setStatus("submitting");

    // TODO: Replace with actual API call to NestJS backend
    // await fetch('/api/newsletter/subscribe', { method: 'POST', body: JSON.stringify({ email }) });

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStatus("success");
    setEmail("");
  };

  return (
    <div className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-2xl shadow-lg p-6 text-white">
      <div className="flex items-center space-x-2 mb-4">
        <Mail className="h-5 w-5" />
        <h3 className="text-lg font-bold">Newsletter</h3>
      </div>

      <p className="text-brand-100 text-sm mb-4">
        Stay updated with the latest news delivered straight to your inbox.
      </p>

      {status === "success" ? (
        <div className="flex items-center space-x-2 bg-white/10 rounded-lg p-4">
          <CheckCircle className="h-5 w-5 text-brand-300" />
          <span className="text-sm font-medium">
            Thank you for subscribing!
          </span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              placeholder="Enter your email"
              className="w-full pl-4 pr-10 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
              disabled={status === "submitting"}
              aria-label="Email address"
            />
            <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" />
          </div>

          {status === "error" && (
            <p className="text-red-300 text-xs">
              Please enter a valid email address.
            </p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full flex items-center justify-center px-4 py-3 bg-white text-brand-700 font-medium rounded-lg hover:bg-brand-50 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "submitting" ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-brand-600"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Subscribing...
              </span>
            ) : (
              <span className="flex items-center">
                Subscribe
                <Send className="h-4 w-4 ml-2" />
              </span>
            )}
          </button>
        </form>
      )}

      <p className="mt-3 text-xs text-brand-200">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  );
};

export default NewsletterForm;
