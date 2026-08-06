import type { MetadataRoute } from "next";
import { getCategories, getPublishedArticles } from "@/src/lib/api";

const SITE_URL = "https://bestkhabar.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/trending",
    "/about",
    "/advertise",
    "/contact",
    "/privacy",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "daily" as const,
    priority: path === "" ? 1 : 0.6,
  }));

  const [categories, articles] = await Promise.all([
    getCategories().catch(() => []),
    getPublishedArticles().catch(() => []),
  ]);

  const categoryRoutes = (categories ?? []).map((category) => ({
    url: `${SITE_URL}/category/${category.slug}`,
    changeFrequency: "hourly" as const,
    priority: 0.7,
  }));

  const articleRoutes = articles.map((article) => ({
    url: `${SITE_URL}/article/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes, ...articleRoutes];
}
