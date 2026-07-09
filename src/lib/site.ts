import { ADVERTISEMENTS, MOCK_ARTICLES } from "@/src/lib/mock/data";
import type { NewsArticle } from "@/src/types";

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

type SectionDefinition = {
  title: string;
  intro: string;
  match: (article: NewsArticle) => boolean;
};

const SECTION_DEFINITIONS: Record<string, SectionDefinition> = {
  "current-affairs": {
    title: "समसामयिक",
    intro: "Fast-moving developments from politics, business, and world news.",
    match: (article) =>
      ["politics", "business", "world"].includes(article.category.slug),
  },
  society: {
    title: "समाज",
    intro: "Local stories, health coverage, and community reporting.",
    match: (article) =>
      ["local", "health", "entertainment"].includes(article.category.slug),
  },
  economy: {
    title: "अर्थ/विकास",
    intro: "Business, markets, policy, and growth-focused reporting.",
    match: (article) =>
      ["business", "technology"].includes(article.category.slug),
  },
  features: {
    title: "विशेष",
    intro:
      "Long-form reporting and story-led coverage from across the newsroom.",
    match: () => true,
  },
  opinion: {
    title: "दृष्टिकोण",
    intro: "Analysis and perspectives on the issues shaping the public agenda.",
    match: (article) => ["politics", "world"].includes(article.category.slug),
  },
  arts: {
    title: "कला",
    intro: "Culture, cinema, and entertainment features.",
    match: (article) => ["entertainment"].includes(article.category.slug),
  },
  sports: {
    title: "खेलकुद",
    intro: "Match reports, tournament coverage, and performance stories.",
    match: (article) => ["sports"].includes(article.category.slug),
  },
  politics: {
    title: "Politics",
    intro: "National politics and election coverage from the newsroom archive.",
    match: (article) => article.category.slug === "politics",
  },
  business: {
    title: "Business",
    intro: "Markets, policy, and enterprise news.",
    match: (article) => article.category.slug === "business",
  },
  world: {
    title: "World",
    intro: "International stories and geopolitical updates.",
    match: (article) => article.category.slug === "world",
  },
  technology: {
    title: "Technology",
    intro: "New products, AI updates, and digital innovation.",
    match: (article) => article.category.slug === "technology",
  },
  health: {
    title: "Health",
    intro: "Public health and wellbeing coverage.",
    match: (article) => article.category.slug === "health",
  },
};

const DEFAULT_SECTION: SectionDefinition = {
  title: "News",
  intro: "Latest reporting from Best Khabar.",
  match: () => true,
};

export function getArticleBySlug(slug: string) {
  return MOCK_ARTICLES.find((article) => article.slug === slug);
}

export function getAllArticleSlugs() {
  return MOCK_ARTICLES.map((article) => article.slug);
}

export function getAllSectionSlugs() {
  return Object.keys(SECTION_DEFINITIONS);
}

export function getTrendingArticles(limit = 5) {
  return [...MOCK_ARTICLES]
    .sort((left, right) => right.viewCount - left.viewCount)
    .slice(0, limit);
}

export function getLatestArticles(limit = 4) {
  return [...MOCK_ARTICLES]
    .sort(
      (left, right) =>
        new Date(right.publishedAt).getTime() -
        new Date(left.publishedAt).getTime(),
    )
    .slice(0, limit);
}

export function getRelatedArticles(article: NewsArticle, limit = 3) {
  return MOCK_ARTICLES.filter(
    (candidate) =>
      candidate.id !== article.id &&
      candidate.category.slug === article.category.slug,
  ).slice(0, limit);
}

export function getSectionDefinition(slug: string) {
  return SECTION_DEFINITIONS[slug] ?? DEFAULT_SECTION;
}

export function getSectionArticles(slug: string, limit = 6) {
  const definition = getSectionDefinition(slug);

  return [...MOCK_ARTICLES]
    .filter(definition.match)
    .sort(
      (left, right) =>
        new Date(right.publishedAt).getTime() -
        new Date(left.publishedAt).getTime(),
    )
    .slice(0, limit);
}

export function getSidebarArticles(article?: NewsArticle) {
  if (!article) {
    return getTrendingArticles();
  }

  const related = getRelatedArticles(article, 4);
  return related.length > 0 ? related : getTrendingArticles();
}

export { ADVERTISEMENTS, MOCK_ARTICLES };
