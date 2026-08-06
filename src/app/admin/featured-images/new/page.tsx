"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFeaturedImage, getFeaturedImageUploadSignature } from "@/src/lib/api";
import { queryKeys } from "@/src/lib/queries";
import { useAuth } from "@/src/app/context/AuthContext";
import { ArrowLeft, Upload, X } from "lucide-react";

const inputClass =
  "mt-1 w-full rounded-lg border border-line px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary";

export default function NewFeaturedImagePage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (!isAuthenticated) router.replace("/login");
  }, [isAuthenticated, router]);
  const [preview, setPreview] = useState<{ url: string; publicId: string } | null>(null);
  const [form, setForm] = useState({ caption: "", linkUrl: "", order: 0, isActive: true });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setFormError("");
    try {
      const sig = await getFeaturedImageUploadSignature();
      const fd = new FormData();
      fd.append("file", file);
      fd.append("api_key", sig.apiKey);
      fd.append("timestamp", String(sig.timestamp));
      fd.append("signature", sig.signature);
      fd.append("folder", sig.folder);
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`,
        { method: "POST", body: fd },
      );
      const data = (await res.json()) as { secure_url: string; public_id: string };
      setPreview({ url: data.secure_url, publicId: data.public_id });
    } catch {
      setFormError("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const createMutation = useMutation({
    mutationFn: (payload: Record<string, unknown>) => createFeaturedImage(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.allFeaturedImages() });
      void queryClient.invalidateQueries({ queryKey: queryKeys.featuredImages() });
      router.push("/admin/featured-images");
    },
    onError: () => setFormError("Failed to create slide."),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    if (!preview) { setFormError("Please upload an image."); return; }
    createMutation.mutate({
      imageUrl: preview.url,
      publicId: preview.publicId,
      caption: form.caption || null,
      linkUrl: form.linkUrl || null,
      order: form.order,
      isActive: form.isActive,
    });
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-3xl items-center px-4 py-4 gap-3">
          <Link href="/admin/featured-images" className="flex items-center gap-1 text-sm text-muted hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> Featured Images
          </Link>
          <span className="text-[#d0d8d0]">/</span>
          <h1 className="text-xl font-bold text-ink">New Slide</h1>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8">
        {formError && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{formError}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-2xl border border-line bg-white p-6 space-y-4">
            <h2 className="text-base font-semibold text-ink">Image</h2>

            {preview ? (
              <div className="relative overflow-hidden rounded-xl border border-line">
                <Image src={preview.url} alt="Preview" width={900} height={400} className="h-52 w-full object-cover" />
                <button
                  type="button"
                  onClick={() => setPreview(null)}
                  className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="flex w-full flex-col items-center gap-2 rounded-xl border-2 border-dashed border-line px-6 py-10 hover:border-primary disabled:opacity-50"
              >
                <Upload className="h-8 w-8 text-muted" />
                <span className="text-sm font-medium text-ink">
                  {uploading ? "Uploading…" : "Click to upload featured image"}
                </span>
                <span className="text-xs text-muted">PNG, JPG, WebP — stored in Best_News_Assets/featured</span>
              </button>
            )}
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />

            <div>
              <label className="block text-sm font-medium text-ink">
                Caption <span className="font-normal text-muted">(optional)</span>
              </label>
              <input
                type="text"
                value={form.caption}
                onChange={(e) => setForm({ ...form, caption: e.target.value })}
                className={inputClass}
                placeholder="Short description shown on the slide"
                maxLength={300}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink">
                Link URL <span className="font-normal text-muted">(optional)</span>
              </label>
              <input
                type="url"
                value={form.linkUrl}
                onChange={(e) => setForm({ ...form, linkUrl: e.target.value })}
                className={inputClass}
                placeholder="https://…"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-white p-6 space-y-4">
            <h2 className="text-base font-semibold text-ink">Settings</h2>

            <div>
              <label className="block text-sm font-medium text-ink">Display Order</label>
              <input
                type="number"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                className={inputClass}
                min={0}
              />
              <p className="mt-1 text-xs text-muted">Lower number shown first.</p>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isActive"
                checked={form.isActive}
                onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                className="h-4 w-4 accent-primary"
              />
              <label htmlFor="isActive" className="text-sm font-medium text-ink">Active (visible on homepage)</label>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={createMutation.isPending || uploading}
              className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-50"
            >
              {createMutation.isPending ? "Creating…" : "Create Slide"}
            </button>
            <Link
              href="/admin/featured-images"
              className="rounded-lg border border-line px-6 py-2.5 text-sm font-medium text-muted hover:bg-gray-50"
            >
              Cancel
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}
