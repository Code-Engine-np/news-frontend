import { defineRouting } from "next-intl/routing";

/**
 * Locale routing config shared by the middleware, the request config, and the
 * navigation helpers. `ne` (Nepali) is the default — the site is Nepali-first —
 * and `localePrefix: "always"` means every URL carries a `/ne` or `/en` prefix.
 */
export const routing = defineRouting({
  locales: ["ne", "en"],
  defaultLocale: "ne",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
