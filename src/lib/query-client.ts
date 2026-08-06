import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

/**
 * Server-side QueryClient factory.
 * React's cache() ensures one instance per request so prefetches from
 * multiple server components in the same request tree share the same client
 * and never issue duplicate fetches.
 */
export const getQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000,
        },
      },
    }),
);
