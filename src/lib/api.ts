/**
 * API Client for the NestJS backend.
 * Base URL: http://localhost:3001
 * Docs: http://localhost:3001/docs-json
 *
 * All frontend data fetching should go through these functions.
 */

import {
  ApiArticle,
  ApiCategory,
  ApiComment,
  NewsArticle,
  Category,
  UserProfile,
  LoginDto,
  AuthResponse,
  RefreshTokenDto,
} from "@/src/app/types";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3001/api";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

async function fetchJson<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    } as HeadersInit,
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`API ${res.status}: ${error}`);
  }

  return res.json() as Promise<T>;
}

/* ------------------------------------------------------------------ */
/*  Auth                                                               */
/* ------------------------------------------------------------------ */

export async function login(credentials: LoginDto): Promise<AuthResponse> {
  return fetchJson<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export async function refreshToken(
  dto: RefreshTokenDto,
): Promise<AuthResponse> {
  return fetchJson<AuthResponse>("/auth/refresh", {
    method: "POST",
    body: JSON.stringify(dto),
  });
}

export async function logout(token: string): Promise<void> {
  return fetchJson<void>("/auth/logout", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function getMe(token: string): Promise<UserProfile> {
  return fetchJson<UserProfile>("/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
}

/* ------------------------------------------------------------------ */
/*  Admin Articles (CRUD)                                              */
/* ------------------------------------------------------------------ */

/** POST /api/articles  -  create new article (auth required) */
export async function createArticle(
  data: Record<string, unknown>,
  token: string,
): Promise<ApiArticle> {
  return fetchJson<ApiArticle>("/articles", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
}

/** PATCH /api/articles/:id  -  update article (auth required) */
export async function updateArticle(
  id: string,
  data: Record<string, unknown>,
  token: string,
): Promise<ApiArticle> {
  return fetchJson<ApiArticle>(`/articles/${id}`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
}

/** DELETE /api/articles/:id  -  delete article (auth required) */
export async function deleteArticle(id: string, token: string): Promise<void> {
  return fetchJson<void>(`/articles/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
}

/* ------------------------------------------------------------------ */
/*  Articles (published)                                               */
/* ------------------------------------------------------------------ */

/** GET /api/articles/published  -  list published articles */
export async function getPublishedArticles(): Promise<ApiArticle[]> {
  return fetchJson<ApiArticle[]>("/articles/published");
}

/** GET /api/news-articles/published  -  list published news articles */
export async function getPublishedNewsArticles(): Promise<ApiArticle[]> {
  return fetchJson<ApiArticle[]>("/news-articles/published");
}

/** GET /api/articles/:id  -  single article */
export async function getArticle(id: string): Promise<ApiArticle> {
  return fetchJson<ApiArticle>(`/articles/${id}`);
}

/** GET /api/news-articles/:id  -  single news article */
export async function getNewsArticle(id: string): Promise<ApiArticle> {
  return fetchJson<ApiArticle>(`/news-articles/${id}`);
}

/* ------------------------------------------------------------------ */
/*  Categories                                                         */
/* ------------------------------------------------------------------ */

/** GET /api/categories */
export async function getCategories(): Promise<ApiCategory[]> {
  return fetchJson<ApiCategory[]>("/categories");
}

/** GET /api/categories/:id */
export async function getCategory(id: string): Promise<ApiCategory> {
  return fetchJson<ApiCategory>(`/categories/${id}`);
}

/* ------------------------------------------------------------------ */
/*  Comments                                                           */
/* ------------------------------------------------------------------ */

/** GET /api/comments/article/:articleId */
export async function getComments(articleId: string): Promise<ApiComment[]> {
  return fetchJson<ApiComment[]>(`/comments/article/${articleId}`);
}

/** POST /api/comments  (requires auth) */
export async function createComment(
  articleId: string,
  content: string,
  token: string,
): Promise<ApiComment> {
  return fetchJson<ApiComment>("/comments", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ articleId, content }),
  });
}

/* ------------------------------------------------------------------ */
/*  Article Likes                                                      */
/* ------------------------------------------------------------------ */

/** GET /api/article-likes/article/:articleId */
export async function getArticleLikes(articleId: string): Promise<number> {
  const likes = await fetchJson<{ count: number }>(
    `/article-likes/article/${articleId}`,
  );
  return likes.count;
}

/** POST /api/article-likes/article/:articleId  (requires auth) */
export async function toggleArticleLike(
  articleId: string,
  token: string,
): Promise<{ liked: boolean }> {
  return fetchJson<{ liked: boolean }>(`/article-likes/article/${articleId}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
}

/* ------------------------------------------------------------------ */
/*  Article Views                                                      */
/* ------------------------------------------------------------------ */

/** POST /api/article-views/article/:articleId */
export async function recordArticleView(articleId: string): Promise<void> {
  return fetchJson<void>(`/article-views/article/${articleId}`, {
    method: "POST",
  });
}

/* ------------------------------------------------------------------ */
/*  Newsletter Subscriptions                                           */
/* ------------------------------------------------------------------ */

/** POST /api/newsletter-subscriptions */
export async function subscribeNewsletter(
  email: string,
  fullName?: string,
): Promise<void> {
  return fetchJson<void>("/newsletter-subscriptions", {
    method: "POST",
    body: JSON.stringify({ email, fullName }),
  });
}

/** DELETE /api/newsletter-subscriptions/:email */
export async function unsubscribeNewsletter(email: string): Promise<void> {
  return fetchJson<void>(`/newsletter-subscriptions/${email}`, {
    method: "DELETE",
  });
}

/* ------------------------------------------------------------------ */
/*  Mappers: API -> Frontend types                                     */
/* ------------------------------------------------------------------ */

export function mapApiCategoryToCategory(apiCat: ApiCategory): Category {
  return {
    id: apiCat.id,
    name: apiCat.nameNe || apiCat.nameEn,
    slug: apiCat.slug,
    color: "bg-gray-600", // Default, can be overridden
    description: apiCat.descriptionNe || apiCat.descriptionEn,
  };
}

export function mapApiArticleToNewsArticle(api: ApiArticle): NewsArticle {
  return {
    id: api.id,
    title: api.titleNe || api.titleEn,
    slug: api.slugNe || api.slugEn,
    excerpt: api.summaryNe || api.summaryEn,
    content: api.contentNe || api.contentEn,
    // TODO: populate from separate category endpoint
    featuredImage: "",
    category: {
      id: api.categoryId,
      name: "",
      slug: "",
      color: "bg-gray-600",
    },
    author: { id: "", name: "", avatar: "", slug: "" },
    tags: [],
    publishedAt: api.createdAt,
    updatedAt: api.updatedAt,
    status: api.status,
    isBreaking: false,
    isFeatured: false,
    viewCount: 0,
    commentCount: 0,
  };
}
