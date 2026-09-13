"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Replaces a percent-encoded URL in the browser address bar with the
 * human-readable decoded IRI form (e.g. Nepali Unicode instead of %E0%A4%…).
 *
 * Next.js pushes the encoded form via history.pushState; this component
 * immediately replaces it with the decoded form so copying the URL gives
 * readable Nepali characters rather than percent-encoded bytes.
 */
export default function UrlDecoder() {
  const pathname = usePathname();

  useEffect(() => {
    try {
      const decoded = decodeURI(window.location.pathname);
      if (decoded !== window.location.pathname) {
        window.history.replaceState(
          window.history.state,
          "",
          decoded + window.location.search + window.location.hash,
        );
      }
    } catch {
      // ignore malformed URI sequences
    }
  }, [pathname]);

  return null;
}
