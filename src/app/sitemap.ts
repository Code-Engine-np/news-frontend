import type { MetadataRoute } from "next";
import {
  getAllArticleSlugs,
  getAllSectionSlugs,
  getArticleBySlug,
} from "@/src/app/lib/site";

const SITE_URL = "https://bestkhabar.com";

export default function sitemap(): MetadataRoute.Sitemap {
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

  const categoryRoutes = getAllSectionSlugs().map((slug) => ({
    url: `${SITE_URL}/category/${slug}`,
    changeFrequency: "hourly" as const,
    priority: 0.7,
  }));

  const articleRoutes = getAllArticleSlugs().map((slug) => {
    const article = getArticleBySlug(slug);
    return {
      url: `${SITE_URL}/article/${slug}`,
      lastModified: article ? new Date(article.updatedAt) : undefined,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    };
  });

  return [...staticRoutes, ...categoryRoutes, ...articleRoutes];
}
