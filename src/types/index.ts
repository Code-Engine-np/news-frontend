/**
 * Core domain types for the Best Khabar news portal.
 * Aligned with the NestJS backend API schema.
 */

/**
 * Backend Article (Admin/Editor full schema)
 * GET /api/articles/:id
 * GET /api/news-articles/:id
 */
export interface ApiArticle {
  id: string;
  categoryId: string;
  category: ApiCategory;
  slugEn: string;
  slugNe: string;
  titleEn: string;
  titleNe: string;
  summaryEn: string;
  summaryNe: string;
  contentEn: string;
  contentNe: string;
  status: "draft" | "published" | "archived";
  tagIds: string[];
  createdAt: string; // ISO 8601
  updatedAt: string;
}

/**
 * Frontend-facing Article (aggregated from published API)
 * Used in pages and components
 */
export interface NewsArticle {
  id: string;
  title: string; // Maps from titleEn
  slug: string; // Maps from slugEn
  excerpt: string; // Maps from summaryEn
  content: string; // Maps from contentEn
  featuredImage: string;
  category: Category;
  author: Author;
  tags: Tag[];
  publishedAt: string;
  updatedAt: string;
  status: "draft" | "published" | "archived";
  isBreaking: boolean;
  isFeatured: boolean;
  viewCount: number;
  commentCount: number;
}

export interface Author {
  id: string;
  name: string;
  avatar: string;
  slug: string;
}

export interface Category {
  id: string;
  name: string; // Backend: nameNe or nameEn
  slug: string; // Backend: slug
  color: string; // Tailwind color class
  description?: string;
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

/**
 * Backend Category schema
 * GET /api/categories
 */
export interface ApiCategory {
  id: string;
  slug: string;
  nameEn: string;
  nameNe: string;
  descriptionEn?: string;
  descriptionNe?: string;
}

/**
 * Comment schema
 * GET /api/comments/article/:articleId
 * POST /api/comments
 */
export interface ApiComment {
  id: string;
  articleId: string;
  content: string;
  author?: Author;
  createdAt: string;
}

/**
 * Article like schema
 * GET/POST /api/article-likes/article/:articleId
 */
export interface ApiArticleLike {
  id: string;
  articleId: string;
  userId: string;
  createdAt: string;
}

/**
 * User profile (from auth)
 * GET /api/auth/me
 */
export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: "admin" | "editor" | "viewer";
}

/**
 * Login / Auth types
 * POST /api/auth/login
 * POST /api/auth/refresh
 */
export interface LoginDto {
  email: string;
  password: string;
}

export interface RefreshTokenDto {
  refreshToken: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthResponse {
  AuthTokens: AuthTokens;
  user: UserProfile;
}
