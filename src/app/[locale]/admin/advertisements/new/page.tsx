"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAdvertisement, getAdUploadSignature } from "@/src/lib/api";
import { queryKeys } from "@/src/lib/queries";
import { Upload, X } from "lucide-react";

const inputClass =
  "mt-1 w-full rounded-lg border border-line bg-white px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-primary dark:bg-[#22302a] dark:text-gray-100";

const POSITIONS = [
  { value: "banner", label: "Banner (full-width above content)" },
  { value: "header", label: "Header" },
  { value: "inline", label: "Inline (within article feed)" },
] as const;

const POSITION_SPECS: Record<string, { size: string; ratio: string; note: string }> = {
  banner: {
    size: "1200 × 90 px",
    ratio: "Leaderboard (13.3 : 1)",
    note: "Full-width strip placed between content sections on the home page.",
  },
  header: {
    size: "728 × 90 px",
    ratio: "Standard leaderboard (8 : 1)",
    note: "Placed at the top of the page, above the navigation area.",
  },
  inline: {
    size: "350 × 300 px",
    ratio: "Medium rectangle (7 : 6)",
    note: "Placed in the article sidebar below the trending list.",
  },
};

export default function NewAdvertisementPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formError, setFormError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<{
    url: string;
    publicId: string;
  } | null>(null);

  const [form, setForm] = useState({
    title: "",
    linkUrl: "",
    position: "banner" as "banner" | "header" | "inline",
    isActive: true,
    order: 0,
    startDate: "",
    endDate: "",
  });

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
      const data = (await res.json()) as {
        secure_url: string;
        public_id: string;
      };
      setPreview({ url: data.secure_url, publicId: data.public_id });
    } catch {
      setFormError("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const createMutation = useMutation({
    mutationFn: (payload: Record<string, unknown>) =>
      createAdvertisement(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.allAdvertisements(),
      });
      void queryClient.invalidateQueries({ queryKey: ["advertisements"] });
      router.push("/admin/advertisements");
    },
    onError: () => setFormError("Failed to create advertisement."),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    if (!preview) {
      setFormError("Please upload an image.");
      return;
    }
    const payload: Record<string, unknown> = {
      title: form.title,
      imageUrl: preview.url,
      publicId: preview.publicId,
      position: form.position,
      isActive: form.isActive,
      order: form.order,
    };
    if (form.linkUrl) payload.linkUrl = form.linkUrl;
    if (form.startDate) payload.startDate = form.startDate;
    if (form.endDate) payload.endDate = form.endDate;
    createMutation.mutate(payload);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-ink dark:text-gray-100">
          New Advertisement
        </h1>
        <Link
          href="/admin/advertisements"
          className="rounded-lg border border-line px-4 py-2 text-sm font-medium text-muted hover:bg-gray-50 dark:hover:bg-[#22302a]"
        >
          Cancel
        </Link>
      </div>

      {formError && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
          {formError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-2xl border border-line bg-white p-6 dark:bg-[#1e2a26]">
          <h2 className="mb-4 text-base font-semibold text-ink">Ad Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink">
                Title
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className={inputClass}
                required
                placeholder="e.g. Summer Sale Banner"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink">
                Link URL{" "}
                <span className="text-muted font-normal">(optional)</span>
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
              <label className="block text-sm font-medium text-ink">
                Ad Image
              </label>
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
                    {uploading ? "Uploading…" : "Click to upload image"}
                  </span>
                  <span className="text-xs text-muted">PNG, JPG, WebP</span>
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

        <div className="rounded-2xl border border-line bg-white p-6 dark:bg-[#1e2a26]">
          <h2 className="mb-4 text-base font-semibold text-ink">Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink">
                Position
              </label>
              <select
                value={form.position}
                onChange={(e) =>
                  setForm({
                    ...form,
                    position: e.target.value as typeof form.position,
                  })
                }
                className={inputClass}
              >
                {POSITIONS.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
              {POSITION_SPECS[form.position] && (
                <div className="mt-2 flex items-start gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2.5 dark:border-blue-800/50 dark:bg-blue-950/30">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 110 20A10 10 0 0112 2z" />
                  </svg>
                  <div>
                    <p className="text-xs font-semibold text-blue-700 dark:text-blue-300">
                      Recommended size: {POSITION_SPECS[form.position].size}
                      <span className="ml-2 font-normal opacity-75">{POSITION_SPECS[form.position].ratio}</span>
                    </p>
                    <p className="mt-0.5 text-xs text-blue-600/80 dark:text-blue-400/80">
                      {POSITION_SPECS[form.position].note}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isActive"
                checked={form.isActive}
                onChange={(e) =>
                  setForm({ ...form, isActive: e.target.checked })
                }
                className="h-4 w-4 rounded border-line accent-primary"
              />
              <label
                htmlFor="isActive"
                className="text-sm font-medium text-ink"
              >
                Active (visible on site)
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink">
                Display Order
              </label>
              <input
                type="number"
                value={form.order}
                onChange={(e) =>
                  setForm({ ...form, order: Number(e.target.value) })
                }
                className={inputClass}
                min={0}
              />
              <p className="mt-1 text-xs text-muted">
                Lower number = shown first.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-ink">
                  Start Date{" "}
                  <span className="text-muted font-normal">(optional)</span>
                </label>
                <input
                  type="datetime-local"
                  value={form.startDate}
                  onChange={(e) =>
                    setForm({ ...form, startDate: e.target.value })
                  }
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink">
                  End Date{" "}
                  <span className="text-muted font-normal">(optional)</span>
                </label>
                <input
                  type="datetime-local"
                  value={form.endDate}
                  onChange={(e) =>
                    setForm({ ...form, endDate: e.target.value })
                  }
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={createMutation.isPending || uploading}
            className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-50"
          >
            {createMutation.isPending ? "Creating…" : "Create Advertisement"}
          </button>
          <Link
            href="/admin/advertisements"
            className="rounded-lg border border-line px-6 py-2.5 text-sm font-medium text-muted hover:bg-gray-50 dark:hover:bg-[#22302a]"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
