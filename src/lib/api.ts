/**
 * API Client for the NestJS backend.
 * Base URL: http://localhost:3001
 * Docs: http://localhost:3001/docs-json
 *
 * All frontend data fetching should go through these functions.
 */

import {
  ApiAdvertisement,
  ApiFeaturedImage,
  ApiArticle,
  ApiCategory,
  NewsArticle,
  Category,
  UserProfile,
  LoginDto,
  AuthResponse,
  RefreshTokenDto,
} from "@/src/types";
import {
  CloudinaryDeleteSignature,
  CloudinaryUploadSignature,
} from "@/src/types/cloudinary";
import { extractYouTubeVideoId } from "@/src/lib/youtube";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

let refreshPromise: Promise<void> | null = null; // prevents concurrent refresh calls

async function refreshTokens(): Promise<void> {
  const refreshToken = localStorage.getItem("best_khabar_refresh_token");
  if (!refreshToken) throw new Error("No refresh token");

  const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) {
    localStorage.removeItem("best_khabar_access_token");
    localStorage.removeItem("best_khabar_refresh_token");
    window.location.href = "/login";
    throw new Error("Session expired");
  }

  const data = await res.json();
  localStorage.setItem("best_khabar_access_token", data.AuthTokens.accessToken);
  localStorage.setItem(
    "best_khabar_refresh_token",
    data.AuthTokens.refreshToken,
  );
}

function buildAuthedHeaders(token: string, extra?: HeadersInit): HeadersInit {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    ...extra,
  };
}

export async function fetchAuthed<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const token = localStorage.getItem("best_khabar_access_token");
  if (!token) {
    window.location.href = "/login";
    throw new Error("No access token");
  }

  let res = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: buildAuthedHeaders(token, init?.headers),
  });

  if (res.status === 401) {
    try {
      if (!refreshPromise) {
        refreshPromise = refreshTokens().finally(() => {
          refreshPromise = null;
        });
      }
      await refreshPromise;
    } catch {
      throw new Error("Authentication failed");
    }

    const newToken = localStorage.getItem("best_khabar_access_token") ?? "";
    res = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers: buildAuthedHeaders(newToken, init?.headers),
    });
  }

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`API ${res.status}: ${error}`);
  }

  return res.json() as Promise<T>;
}

export async function fetchJson<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
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
  return fetchAuthed<void>("/auth/logout", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function getMe(token: string): Promise<UserProfile> {
  return fetchAuthed<UserProfile>("/auth/me", {
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
  return fetchAuthed<ApiArticle>("/articles", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
}

/** GET /api/articles/upload-signature  -  get Cloudinary upload signature (auth required) */
export async function getUploadSignature(
  token: string,
): Promise<CloudinaryUploadSignature> {
  return fetchAuthed<CloudinaryUploadSignature>("/articles/upload-signature", {
    headers: { Authorization: `Bearer ${token}` },
  });
}

/** GET /api/articles/delete-signature  -  get Cloudinary delete signature (auth required) */
export async function getDeleteSignature(
  token: string,
  publicId: string,
): Promise<CloudinaryDeleteSignature> {
  return fetchAuthed<CloudinaryDeleteSignature>(
    `/articles/delete-signature?publicId=${publicId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
}

/** PATCH /api/articles/:id  -  update article (auth required) */
export async function updateArticle(
  id: string,
  data: Record<string, unknown>,
  token: string,
): Promise<ApiArticle> {
  return fetchAuthed<ApiArticle>(`/articles/${id}`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  });
}

/** DELETE /api/articles/:id  -  delete article (auth required) */
export async function deleteArticle(id: string, token: string): Promise<void> {
  return fetchAuthed<void>(`/articles/${id}`, {
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

/** GET /api/articles  -  list all articles (auth required) */
export async function getAllArticles(): Promise<ApiArticle[]> {
  const accessToken = localStorage.getItem("best_khabar_access_token");
  return fetchAuthed<ApiArticle[]>("/articles", {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}

/** GET /api/articles/:id  -  single article */
export async function getArticle(id: string): Promise<ApiArticle> {
  return fetchJson<ApiArticle>(`/articles/${id}`);
}

/** GET /api/articles/slug/:slug  -  single article by slug */
export async function getArticleBySlug(slug: string): Promise<ApiArticle> {
  return fetchJson<ApiArticle>(`/articles/slug/${slug}`);
}

/** GET /api/news-articles/:id  -  single news article */
export async function getNewsArticle(id: string): Promise<ApiArticle> {
  return fetchJson<ApiArticle>(`/news-articles/${id}`);
}

/* ------------------------------------------------------------------ */
/*  Categories                                                         */
/* ------------------------------------------------------------------ */

/** GET /api/categories */
export async function getCategories(): Promise<ApiCategory[] | null> {
  return fetchJson<ApiCategory[]>("/categories");
}

/** GET /api/categories/:id */
export async function getCategory(id: string): Promise<ApiCategory> {
  return fetchJson<ApiCategory>(`/categories/${id}`);
}

/** GET /api/categories/slug/:slug */
export async function getCategoryBySlug(slug: string): Promise<ApiCategory> {
  return fetchJson<ApiCategory>(`/categories/slug/${slug}`);
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

export interface ContactMessagePayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export async function sendContactMessage(
  payload: ContactMessagePayload,
): Promise<{ success: boolean }> {
  return fetchJson<{ success: boolean }>("/contact", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/** DELETE /api/newsletter-subscriptions/:email */
export async function unsubscribeNewsletter(email: string): Promise<void> {
  return fetchJson<void>(`/newsletter-subscriptions/${email}`, {
    method: "DELETE",
  });
}

/* ------------------------------------------------------------------ */
/*  Featured Images                                                    */
/* ------------------------------------------------------------------ */

export async function getFeaturedImages(): Promise<ApiFeaturedImage[]> {
  return fetchJson<ApiFeaturedImage[]>("/featured-images");
}

export async function getAllFeaturedImages(): Promise<ApiFeaturedImage[]> {
  return fetchAuthed<ApiFeaturedImage[]>("/featured-images/admin/all");
}

export async function createFeaturedImage(
  payload: Record<string, unknown>,
): Promise<ApiFeaturedImage> {
  return fetchAuthed<ApiFeaturedImage>("/featured-images", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function updateFeaturedImage(
  id: string,
  payload: Record<string, unknown>,
): Promise<ApiFeaturedImage> {
  return fetchAuthed<ApiFeaturedImage>(`/featured-images/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function deleteFeaturedImage(id: string): Promise<void> {
  return fetchAuthed<void>(`/featured-images/${id}`, { method: "DELETE" });
}

export async function getFeaturedImageUploadSignature() {
  return fetchAuthed<{
    timestamp: number;
    signature: string;
    apiKey: string;
    cloudName: string;
    folder: string;
  }>("/featured-images/upload-signature");
}

/* ------------------------------------------------------------------ */
/*  Advertisements                                                     */
/* ------------------------------------------------------------------ */

/** GET /api/advertisements?position=banner (public, active only) */
export async function getAdvertisements(
  position?: "banner" | "sidebar" | "inline",
): Promise<ApiAdvertisement[]> {
  const qs = position ? `?position=${position}` : "";
  return fetchJson<ApiAdvertisement[]>(`/advertisements${qs}`);
}

/** GET /api/advertisements/admin/all (admin) */
export async function getAllAdvertisements(): Promise<ApiAdvertisement[]> {
  return fetchAuthed<ApiAdvertisement[]>("/advertisements/admin/all");
}

/** POST /api/advertisements (admin) */
export async function createAdvertisement(
  payload: Record<string, unknown>,
): Promise<ApiAdvertisement> {
  return fetchAuthed<ApiAdvertisement>("/advertisements", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

/** PATCH /api/advertisements/:id (admin) */
export async function updateAdvertisement(
  id: string,
  payload: Record<string, unknown>,
): Promise<ApiAdvertisement> {
  return fetchAuthed<ApiAdvertisement>(`/advertisements/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

/** DELETE /api/advertisements/:id (admin) */
export async function deleteAdvertisement(id: string): Promise<void> {
  return fetchAuthed<void>(`/advertisements/${id}`, { method: "DELETE" });
}

/** GET /api/advertisements/upload-signature (admin) */
export async function getAdUploadSignature() {
  return fetchAuthed<{
    timestamp: number;
    signature: string;
    apiKey: string;
    cloudName: string;
    folder: string;
  }>("/advertisements/upload-signature");
}

/* ------------------------------------------------------------------ */
/*  Mappers: API -> Frontend types                                     */
/* ------------------------------------------------------------------ */

export function mapApiCategoryToCategory(apiCat: ApiCategory): Category {
  return {
    id: apiCat.id,
    name: apiCat.name || "",
    slug: apiCat.slug,
    color: "bg-gray-600",
    description: apiCat.description ?? undefined,
    parentId: apiCat.parentId ?? null,
  };
}

export function mapApiArticleToNewsArticle(api: ApiArticle): NewsArticle {
  const category = api.category
    ? mapApiCategoryToCategory(api.category)
    : {
        id: "",
        name: "",
        slug: "",
        color: "bg-gray-600",
      };

  const firstImage = api.images?.[0];
  const featuredImage = firstImage?.secureUrl || "";
  const featuredVideoId = firstImage?.youtubeUrl
    ? extractYouTubeVideoId(firstImage.youtubeUrl)
    : undefined;

  return {
    id: api.id,
    title: api.title,
    slug: api.slug,
    excerpt: api.summary,
    content: api.content,
    featuredImage,
    featuredVideoId,
    category,
    author: {
      id: api.author.id,
      fullName: api.author.fullName,
      avatar: "",
      slug: api.author.fullName.toLowerCase().replace(/\s+/g, "-"),
    },
    tags: [],
    publishedAt: api.createdAt,
    updatedAt: api.updatedAt,
    status: api.status,
    isBreaking: false,
    isFeatured: false,
    viewCount: 0,
  };
}
