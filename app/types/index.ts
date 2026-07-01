/**
 * Core domain types for the Best Khabar news portal.
 * These interfaces represent the contract between the UI and the backend (NestJS REST API).
 * TODO: Sync with actual API schema once the backend is ready.
 */

export interface Author {
  id: string;
  name: string;
  avatar: string;
  slug: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  color: string; // Tailwind color class, e.g. "bg-emerald-600"
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface Advertisement {
  id: string;
  title: string;
  imageUrl: string;
  linkUrl: string;
  position: "sidebar" | "footer" | "hero" | "inline";
  size: "small" | "medium" | "large" | "full-width";
}

export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: Category;
  author: Author;
  tags: Tag[];
  publishedAt: string; // ISO 8601
  updatedAt: string;
  isBreaking: boolean;
  isFeatured: boolean;
  viewCount: number;
  commentCount: number;
}