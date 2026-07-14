import type { Advertisement, NewsArticle } from "@/src/types";

export const MAIN_NAV_ITEMS = [
  { label: "गृहपृष्ठ", href: "/" },
  { label: "समसामयिक", href: "/category/current-affairs" },
  { label: "समाज", href: "/category/society" },
  { label: "अर्थ/विकास", href: "/category/economy" },
  { label: "विशेष", href: "/category/features" },
  { label: "दृष्टिकोण", href: "/category/opinion" },
  { label: "कला", href: "/category/arts" },
  { label: "खेलकुद", href: "/category/sports" },
  { label: "प्रचलित", href: "/trending" },
];

export const FOOTER_LINK_GROUPS = [
  {
    title: "Explore",
    links: [
      { label: "Trending", href: "/trending" },
      { label: "Politics", href: "/category/politics" },
      { label: "Business", href: "/category/business" },
      { label: "Sports", href: "/category/sports" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Advertise", href: "/advertise" },
      { label: "Contact Us", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

/**
 * Static ad-slot placeholders. There is no advertisement entity in the
 * backend, so these are site configuration rather than mock API data.
 */
export const ADVERTISEMENTS: Advertisement[] = [
  {
    id: "ad1",
    title: "Best Khabar Premium",
    linkUrl: "#",
    position: "sidebar",
    size: "medium",
  },
];

export function getTrendingArticles(articles: NewsArticle[], limit = 5) {
  return [...articles]
    .sort((left, right) => right.viewCount - left.viewCount)
    .slice(0, limit);
}

export function getLatestArticles(articles: NewsArticle[], limit = 4) {
  return [...articles]
    .sort(
      (left, right) =>
        new Date(right.publishedAt).getTime() -
        new Date(left.publishedAt).getTime(),
    )
    .slice(0, limit);
}

export function getRelatedArticles(
  articles: NewsArticle[],
  article: NewsArticle,
  limit = 3,
) {
  return articles
    .filter(
      (candidate) =>
        candidate.id !== article.id &&
        candidate.category.slug === article.category.slug,
    )
    .slice(0, limit);
}

export function getSidebarArticles(
  articles: NewsArticle[],
  article?: NewsArticle,
) {
  if (!article) {
    return getTrendingArticles(articles);
  }

  const related = getRelatedArticles(articles, article, 4);
  return related.length > 0 ? related : getTrendingArticles(articles);
}
