import type { Advertisement, NewsArticle } from "@/src/types";

/**
 * Main navigation. `key` maps to a key in the `Nav` message namespace
 * (see messages/*.json) so labels are localized at render time; `href` is the
 * locale-agnostic path (the locale prefix is added by next-intl's <Link>).
 */
export const MAIN_NAV_ITEMS = [
  { key: "home", href: "/" },
  { key: "currentAffairs", href: "/category/current-affairs" },
  { key: "society", href: "/category/society" },
  { key: "economy", href: "/category/economy" },
  { key: "features", href: "/category/features" },
  { key: "opinion", href: "/category/opinion" },
  { key: "arts", href: "/category/arts" },
  { key: "sports", href: "/category/sports" },
  { key: "trending", href: "/trending" },
] as const;

export const SOCIAL_LINKS = [
  {
    id: "facebook",
    label: "Facebook",
    href: "https://facebook.com/bestkhabar",
    color: "#1877F2",
    hoverColor: "#0d6efd",
  },
  {
    id: "youtube",
    label: "YouTube",
    href: "https://youtube.com/@bestkhabar",
    color: "#FF0000",
    hoverColor: "#cc0000",
  },
  {
    id: "tiktok",
    label: "TikTok",
    href: "https://tiktok.com/@bestkhabar",
    color: "#010101",
    hoverColor: "#333",
  },
  {
    id: "twitter",
    label: "X (Twitter)",
    href: "https://x.com/bestkhabar",
    color: "#000000",
    hoverColor: "#222",
  },
] as const;

/**
 * Footer link groups. `titleKey` / `labelKey` map to keys in the `Footer`
 * message namespace so the footer chrome is localized.
 */
export const FOOTER_LINK_GROUPS = [
  {
    titleKey: "exploreTitle",
    links: [
      { labelKey: "linkTrending", href: "/trending" },
      { labelKey: "linkPolitics", href: "/category/politics" },
      { labelKey: "linkBusiness", href: "/category/business" },
      { labelKey: "linkSports", href: "/category/sports" },
    ],
  },
  {
    titleKey: "companyTitle",
    links: [
      { labelKey: "linkAbout", href: "/about" },
      { labelKey: "linkAdvertise", href: "/advertise" },
      { labelKey: "linkContact", href: "/contact" },
      { labelKey: "linkPrivacy", href: "/privacy" },
    ],
  },
] as const;

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
