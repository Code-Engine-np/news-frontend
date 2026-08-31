import type { Advertisement, NewsArticle } from "@/src/types";

export type NavChild = {
  readonly key: string;
  readonly href: string;
  readonly label: string;
};

export type NavItem = {
  readonly key: string;
  readonly href: string;
  readonly label: string;
  readonly children?: readonly NavChild[];
};

/**
 * Main navigation. `key` maps to a key in the `Nav` message namespace
 * (see messages/*.json) so labels are localized at render time; `href` is the
 * locale-agnostic path (the locale prefix is added by next-intl's <Link>).
 * `label` is the canonical English name used when creating backend categories.
 */
export const MAIN_NAV_ITEMS: readonly NavItem[] = [
  { key: "examplary-world", href: "/category/examplary-world", label: "Examplary World" },
  {
    key: "all-nepal",
    href: "/category/all-nepal",
    label: "All Nepal",
    children: [
      { key: "kathmandu-valley", href: "/category/kathmandu-valley", label: "Kathmandu Valley" },
      { key: "current-politics", href: "/category/current-politics", label: "Current Politics" },
      { key: "state-news", href: "/category/state-news", label: "State News" },
      { key: "nepal-khabar", href: "/category/nepal-khabar", label: "Nepal Khabar" },
    ],
  },
  {
    key: "abroad-news",
    href: "/category/abroad-news",
    label: "Abroad News",
    children: [
      { key: "asia", href: "/category/asia", label: "Asia" },
      { key: "europe", href: "/category/europe", label: "Europe" },
      { key: "america", href: "/category/america", label: "America" },
      { key: "canada", href: "/category/canada", label: "Canada" },
      { key: "australia", href: "/category/australia", label: "Australia" },
      { key: "others", href: "/category/others", label: "Others" },
    ],
  },
  { key: "arts-literature-entertainment", href: "/category/arts-literature-entertainment", label: "Arts, Literature & Entertainment" },
  { key: "tourism-ghumgham", href: "/category/tourism-ghumgham", label: "Tourism & Ghumgham" },
  { key: "opinion", href: "/category/opinion", label: "Opinion" },
  { key: "best-videos", href: "/category/best-videos", label: "Best Videos" },
  { key: "english", href: "/category/english-news", label: "English News" },
  { key: "old-site", href: "https://old.bestkhabar.com/", label: "Old Site" },
];

export const SOCIAL_LINKS = [
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/Bestkhabarweb/",
    color: "#1877F2",
    hoverColor: "#0d6efd",
  },
  {
    id: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/@bestkhabarnews",
    color: "#FF0000",
    hoverColor: "#cc0000",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/bestkhabar/",
    color: "#010101",
    hoverColor: "#333",
  },
  {
    id: "twitter",
    label: "X (Twitter)",
    href: "https://x.com/best_khabar",
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
      // { labelKey: "linkPolitics", href: "/category/politics" },
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
