"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";

import Link from "next/link";
import Image from "next/image";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateAdvertisement,
  getAdUploadSignature,
} from "@/src/lib/api";
import { queryKeys, queryFns } from "@/src/lib/queries";
import { useAuth } from "@/src/app/context/AuthContext";
import { ArrowLeft, Upload, X } from "lucide-react";

const inputClass =
  "mt-1 w-full rounded-lg border border-line px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary";

const POSITIONS = [
  { value: "banner", label: "Banner (full-width above content)" },
  { value: "sidebar", label: "Sidebar" },
  { value: "inline", label: "Inline (within article feed)" },
] as const;

export default function EditAdvertisementPage() {
  const { isAuthenticated } = useAuth();
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isAuthenticated) router.replace("/login");
  }, [isAuthenticated, router]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formError, setFormError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<{ url: string; publicId?: string | null } | null>(null);

  const [form, setForm] = useState({
    title: "",
    linkUrl: "",
    position: "banner" as "banner" | "sidebar" | "inline",
    isActive: true,
    order: 0,
    startDate: "",
    endDate: "",
  });

  const { data: ad, isLoading } = useQuery({
    queryKey: [...queryKeys.allAdvertisements(), id],
    queryFn: () => queryFns.allAdvertisements().then((ads) => ads.find((a) => a.id === id)),
    enabled: Boolean(id),
  });

  useEffect(() => {
    if (!ad) return;
    setForm({
      title: ad.title,
      linkUrl: ad.linkUrl ?? "",
      position: ad.position,
      isActive: ad.isActive,
      order: ad.order,
      startDate: ad.startDate ? ad.startDate.slice(0, 16) : "",
      endDate: ad.endDate ? ad.endDate.slice(0, 16) : "",
    });
    setPreview({ url: ad.imageUrl, publicId: ad.publicId });
  }, [ad]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setFormError("");
    try {
      const sig = await getAdUploadSignature();
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

  const updateMutation = useMutation({
    mutationFn: (payload: Record<string, unknown>) =>
      updateAdvertisement(id, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.allAdvertisements() });
      void queryClient.invalidateQueries({ queryKey: ["advertisements"] });
      router.push("/admin/advertisements");
    },
    onError: () => setFormError("Failed to update advertisement."),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    if (!preview) { setFormError("Please upload an image."); return; }
    const payload: Record<string, unknown> = {
      title: form.title,
      imageUrl: preview.url,
      publicId: preview.publicId ?? null,
      position: form.position,
      isActive: form.isActive,
      order: form.order,
      linkUrl: form.linkUrl || null,
      startDate: form.startDate || null,
      endDate: form.endDate || null,
    };
    updateMutation.mutate(payload);
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
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/advertisements"
              className="flex items-center gap-1 text-sm text-[#60706a] hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Advertisements
            </Link>
            <span className="text-[#d0d8d0]">/</span>
            <h1 className="text-xl font-bold text-ink">Edit Advertisement</h1>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8">
        {(formError || updateMutation.isError) && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {formError || "Failed to update advertisement."}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-2xl border border-line bg-white p-6">
            <h2 className="mb-4 text-base font-semibold text-ink">Ad Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-ink">Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-ink">
                  Link URL <span className="text-muted font-normal">(optional)</span>
                </label>
                <input
                  type="url"
                  value={form.linkUrl}
                  onChange={(e) => setForm({ ...form, linkUrl: e.target.value })}
                  className={inputClass}
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-ink">Ad Image</label>
                {preview ? (
                  <div className="mt-1 relative w-full overflow-hidden rounded-xl border border-line">
                    <Image
                      src={preview.url}
                      alt="Ad preview"
                      width={800}
                      height={200}
                      className="h-40 w-full object-cover"
                    />
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
                    className="mt-1 flex w-full cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-line px-6 py-8 text-center hover:border-primary disabled:opacity-50"
                  >
                    <Upload className="h-8 w-8 text-muted" />
                    <span className="text-sm font-medium text-ink">
                      {uploading ? "Uploading…" : "Click to replace image"}
                    </span>
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleUpload}
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-white p-6">
            <h2 className="mb-4 text-base font-semibold text-ink">Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-ink">Position</label>
                <select
                  value={form.position}
                  onChange={(e) =>
                    setForm({ ...form, position: e.target.value as typeof form.position })
                  }
                  className={inputClass}
                >
                  {POSITIONS.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={form.isActive}
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                  className="h-4 w-4 rounded border-line accent-primary"
                />
                <label htmlFor="isActive" className="text-sm font-medium text-ink">
                  Active (visible on site)
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-ink">Display Order</label>
                <input
                  type="number"
                  value={form.order}
                  onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                  className={inputClass}
                  min={0}
                />
                <p className="mt-1 text-xs text-muted">Lower number = shown first.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-ink">
                    Start Date <span className="text-muted font-normal">(optional)</span>
                  </label>
                  <input
                    type="datetime-local"
                    value={form.startDate}
                    onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink">
                    End Date <span className="text-muted font-normal">(optional)</span>
                  </label>
                  <input
                    type="datetime-local"
                    value={form.endDate}
                    onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={updateMutation.isPending || uploading}
              className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-50"
            >
              {updateMutation.isPending ? "Saving…" : "Save Changes"}
            </button>
            <Link
              href="/admin/advertisements"
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
