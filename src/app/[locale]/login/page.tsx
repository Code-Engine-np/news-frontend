"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useRouter, Link } from "@/src/i18n/navigation";
import { useAuth } from "@/src/app/context/AuthContext";

export default function LoginPage() {
  const t = useTranslations("Login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();
  // console.log("isAuthenticated:", isAuthenticated); // Debugging line
  // Redirect after mount if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/admin");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login(email, password);

      router.push("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : t("loginFailed"));
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f9f9f9] px-4">
      <div className="w-full max-w-md rounded-2xl border border-line bg-white p-8 shadow-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-ink">{t("title")}</h1>
          <p className="mt-2 text-sm text-[#60706a]">{t("subtitle")}</p>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-ink"
            >
              {t("email")}
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-line px-4 py-2.5 outline-none transition-colors focus:border-primary"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-ink"
            >
              {t("password")}
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-line px-4 py-2.5 outline-none transition-colors focus:border-primary"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-50"
          >
            {isLoading ? t("signingIn") : t("signIn")}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-[#60706a]">
          <Link href="/" className="hover:text-primary">
            {t("backHome")}
          </Link>
        </div>
      </div>
    </div>
  );
}
