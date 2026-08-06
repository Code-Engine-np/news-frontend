/**
 * Centralised query keys and query functions for TanStack Query.
 *
 * Query keys follow a tuple convention so callers can invalidate at any
 * level of granularity:
 *   ['articles']              → all article queries
 *   ['articles', 'published'] → only the published list
 *   ['articles', 'all']       → only the admin list
 *   ['article', 'slug', slug] → one article by slug
 *   ['article', 'id', id]     → one article by id
 *   ['categories']            → all categories
 *   ['category', slug]        → one category
 */

import {
  getAllAdvertisements,
  getAllArticles,
  getAllFeaturedImages,
  getAdvertisements,
  getArticle,
  getArticleBySlug,
  getCategories,
  getCategoryBySlug,
  getFeaturedImages,
  getPublishedArticles,
} from "@/src/lib/api";
import type {
  ApiAdvertisement,
  ApiFeaturedImage,
  ApiArticle,
  ApiCategory,
} from "@/src/types";

export const queryKeys = {
  publishedArticles: () => ["articles", "published"] as const,
  allArticles: () => ["articles", "all"] as const,
  article: (slug: string) => ["article", "slug", slug] as const,
  articleById: (id: string) => ["article", "id", id] as const,
  categories: () => ["categories"] as const,
  category: (slug: string) => ["category", slug] as const,
  advertisements: (position?: string) =>
    position ? ["advertisements", position] : (["advertisements"] as const),
  allAdvertisements: () => ["advertisements", "all"] as const,
  featuredImages: () => ["featured-images"] as const,
  allFeaturedImages: () => ["featured-images", "all"] as const,
} as const;

export const queryFns = {
  publishedArticles: (): Promise<ApiArticle[]> => getPublishedArticles(),
  allArticles: (): Promise<ApiArticle[]> => getAllArticles(),
  article: (slug: string) => () => getArticleBySlug(slug),
  articleById: (id: string) => () => getArticle(id),
  categories: (): Promise<ApiCategory[] | null> => getCategories(),
  category: (slug: string) => () => getCategoryBySlug(slug),
  advertisements:
    (position?: "banner" | "sidebar" | "inline") =>
    (): Promise<ApiAdvertisement[]> =>
      getAdvertisements(position),
  allAdvertisements: (): Promise<ApiAdvertisement[]> => getAllAdvertisements(),
  featuredImages: (): Promise<ApiFeaturedImage[]> => getFeaturedImages(),
  allFeaturedImages: (): Promise<ApiFeaturedImage[]> => getAllFeaturedImages(),
};
