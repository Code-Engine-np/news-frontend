"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFeaturedImage, getFeaturedImageUploadSignature } from "@/src/lib/api";
import { queryKeys, queryFns } from "@/src/lib/queries";
import { useAuth } from "@/src/app/context/AuthContext";
import { ArrowLeft, Upload, X } from "lucide-react";

const inputClass =
  "mt-1 w-full rounded-lg border border-line px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary";

export default function EditFeaturedImagePage() {
  const { isAuthenticated } = useAuth();
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [formError, setFormError] = useState("");
  const [preview, setPreview] = useState<{ url: string; publicId?: string | null } | null>(null);
  const [form, setForm] = useState({ caption: "", linkUrl: "", order: 0, isActive: true });

  useEffect(() => {
    if (!isAuthenticated) router.replace("/login");
  }, [isAuthenticated, router]);

  const { data: slide, isLoading } = useQuery({
    queryKey: [...queryKeys.allFeaturedImages(), id],
    queryFn: () => queryFns.allFeaturedImages().then((all) => all.find((s) => s.id === id)),
    enabled: Boolean(id),
  });

  useEffect(() => {
    if (!slide) return;
    setForm({
      caption: slide.caption ?? "",
      linkUrl: slide.linkUrl ?? "",
      order: slide.order,
      isActive: slide.isActive,
    });
    setPreview({ url: slide.imageUrl, publicId: slide.publicId });
  }, [slide]);

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
      setFormError("Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const updateMutation = useMutation({
    mutationFn: (payload: Record<string, unknown>) => updateFeaturedImage(id, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.allFeaturedImages() });
      void queryClient.invalidateQueries({ queryKey: queryKeys.featuredImages() });
      router.push("/admin/featured-images");
    },
    onError: () => setFormError("Failed to update slide."),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    if (!preview) { setFormError("Image is required."); return; }
    updateMutation.mutate({
      imageUrl: preview.url,
      publicId: preview.publicId ?? null,
      caption: form.caption || null,
      linkUrl: form.linkUrl || null,
      order: form.order,
      isActive: form.isActive,
    });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f9f9f9]">
        <p className="text-muted">Loading…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      <header className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-3xl items-center px-4 py-4 gap-3">
          <Link href="/admin/featured-images" className="flex items-center gap-1 text-sm text-muted hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> Featured Images
          </Link>
          <span className="text-[#d0d8d0]">/</span>
          <h1 className="text-xl font-bold text-ink">Edit Slide</h1>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8">
        {(formError || updateMutation.isError) && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {formError || "Failed to update slide."}
          </div>
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
                  {uploading ? "Uploading…" : "Click to replace image"}
                </span>
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
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isActive"
                checked={form.isActive}
                onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                className="h-4 w-4 accent-primary"
              />
              <label htmlFor="isActive" className="text-sm font-medium text-ink">Active</label>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={updateMutation.isPending || uploading}
              className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-50"
            >
              {updateMutation.isPending ? "Saving…" : "Save Changes"}
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
