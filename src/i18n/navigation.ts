import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Locale-aware navigation APIs. Use these `Link` / `useRouter` / `redirect` /
 * `usePathname` in place of the ones from `next/link` and `next/navigation`
 * for internal navigation so the active locale prefix is preserved
 * automatically. (`useParams`, `useSearchParams`, `notFound` are not provided
 * here — keep importing those from `next/navigation`.)
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
