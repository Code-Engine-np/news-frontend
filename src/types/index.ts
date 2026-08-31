/**
 * Core domain types for the Best Khabar news portal.
 * Aligned with the NestJS backend TypeORM entities.
 */

/**
 * Backend Article (matches NewsArticle entity)
 * GET /api/articles/:id
 * GET /api/articles/published
 * GET /api/news-articles/:id
 */
export interface ApiArticle {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  status: "draft" | "published" | "archived";
  author: ApiAuthor;
  category: ApiCategory;
  images: ApiImage[];
  articleTags?: ApiArticleTag[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Backend Author (matches User entity)
 */
export interface ApiAuthor {
  id: string;
  fullName: string;
  email?: string;
  role?: string;
}

export interface ApiFeaturedImage {
  id: string;
  imageUrl: string;
  publicId?: string | null;
  caption?: string | null;
  linkUrl?: string | null;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ApiAdvertisement {
  id: string;
  title: string;
  linkUrl?: string | null;
  imageUrl: string;
  publicId?: string | null;
  position: "banner" | "sidebar" | "inline";
  isActive: boolean;
  order: number;
  startDate?: string | null;
  endDate?: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * Backend Category (matches Category entity)
 * GET /api/categories
 * GET /api/categories/:id
 * GET /api/categories/slug/:slug
 */
export interface ApiCategory {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  parentId?: string | null;
}

/**
 * Backend Image (matches Image entity)
 */
export interface ApiImage {
  id: string;
  secureUrl?: string | null;
  publicId?: string | null;
  resourceType?: string | null;
  youtubeUrl?: string | null;
  altText?: string | null;
  caption?: string | null;
}

/**
 * Backend ArticleTag (matches ArticleTag entity)
 */
export interface ApiArticleTag {
  id: string;
  tagId: string;
  tag: ApiTag;
}

/**
 * Backend Tag (matches Tag entity)
 */
export interface ApiTag {
  id: string;
  slug: string;
  nameEn?: string | null;
  nameNe?: string | null;
}

/**
 * Frontend-facing Article (aggregated from published API)
 * Used in pages and components
 */
export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  /** YouTube video ID extracted from embedded content, if present. */
  featuredVideoId?: string;
  category: Category;
  author: Author;
  tags: Tag[];
  publishedAt: string;
  updatedAt: string;
  status: "draft" | "published" | "archived";
  isBreaking: boolean;
  isFeatured: boolean;
  viewCount: number;
}

export interface Author {
  id: string;
  fullName: string;
  avatar: string;
  slug: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
  description?: string;
  parentId?: string | null;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface Advertisement {
  id: string;
  title: string;
  linkUrl: string;
  position: "sidebar" | "footer" | "hero" | "inline" | "header";
  size: "small" | "medium" | "large" | "full-width";
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

export interface ApiPopupNotice {
  id: string;
  title: string;
  content: string;
  buttonText: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
