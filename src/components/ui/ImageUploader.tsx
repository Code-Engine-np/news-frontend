"use client";

import { useRef, useState } from "react";
import { handleImageUpload } from "@/src/editor/utils/imageUpload";
import { deleteImageFromCloudinary } from "@/src/lib/cloudinary";
import { extractYouTubeVideoId, getYouTubeThumbnailUrl } from "@/src/lib/youtube";
import Image from "next/image";
import { PlayCircle, X } from "lucide-react";
import { CloudinaryUploadResponse } from "@/src/types/cloudinary";

interface ImageUploaderProps {
  images: CloudinaryUploadResponse[];
  onChange: (images: CloudinaryUploadResponse[]) => void;
  maxImages?: number;
}

export default function ImageUploader({
  images,
  onChange,
  maxImages = 5,
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadError, setUploadError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null);
  const [ytInput, setYtInput] = useState("");
  const [ytError, setYtError] = useState("");

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setUploading(true);
    setUploadError("");
    await handleImageUpload(setUploadError, event, (url) =>
      onChange([...images, { ...url, alt_text: "", caption: "" }]),
    );
    setUploading(false);
  };

  const handleAddYouTube = () => {
    setYtError("");
    const videoId = extractYouTubeVideoId(ytInput.trim());
    if (!videoId) {
      setYtError("Enter a valid YouTube URL (e.g. youtube.com/watch?v=…)");
      return;
    }
    onChange([
      ...images,
      {
        youtube_url: ytInput.trim(),
        alt_text: "",
        caption: "",
      },
    ]);
    setYtInput("");
  };

  const handleDelete = async (index: number) => {
    const image = images[index];
    setDeletingIndex(index);
    try {
      // Only call Cloudinary delete for uploaded images, not YouTube entries.
      if (image.public_id) {
        await deleteImageFromCloudinary(image);
      }
      onChange(images.filter((_, i) => i !== index));
    } catch {
      setUploadError("Failed to remove image.");
    } finally {
      setDeletingIndex(null);
    }
  };

  const handleFieldChange = (
    index: number,
    field: "alt_text" | "caption",
    value: string,
  ) => {
    onChange(
      images.map((img, i) => (i === index ? { ...img, [field]: value } : img)),
    );
  };

  const canAddMore = images.length < maxImages;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Media</span>
        <span className="text-xs text-gray-400">
          {images.length}/{maxImages}
        </span>
      </div>

      {/* Previews */}
      {images.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {images.map((image, index) => {
            const isYouTube = Boolean(image.youtube_url);
            const videoId = isYouTube
              ? extractYouTubeVideoId(image.youtube_url!)
              : undefined;
            const thumbSrc = videoId
              ? getYouTubeThumbnailUrl(videoId)
              : image.secure_url ?? "";

            return (
              <div
                key={image.public_id ?? image.youtube_url ?? index}
                className="flex gap-3 rounded-lg border border-gray-200 p-3"
              >
                {/* Thumbnail */}
                <div className="group relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-black">
                  {thumbSrc && (
                    <Image
                      src={thumbSrc}
                      alt={image.alt_text || `Media ${index + 1}`}
                      fill
                      sizes="6rem"
                      quality={75}
                      className="object-cover"
                    />
                  )}
                  {isYouTube && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <PlayCircle className="h-8 w-8 text-white" />
                    </div>
                  )}
                  {/* Delete overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                    {deletingIndex === index ? (
                      <span className="text-xs text-white">Removing…</span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleDelete(index)}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
                        title="Remove"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <span className="absolute left-1 top-1 rounded bg-black/60 px-1 text-[10px] text-white">
                    {index + 1}
                  </span>
                </div>

                {/* Fields */}
                <div className="min-w-0 flex-1 space-y-2">
                  {isYouTube && (
                    <p className="truncate text-[11px] text-gray-400">
                      {image.youtube_url}
                    </p>
                  )}
                  <div>
                    <label className="text-xs font-medium text-gray-500">
                      Alt text
                    </label>
                    <input
                      type="text"
                      value={image.alt_text ?? ""}
                      onChange={(e) =>
                        handleFieldChange(index, "alt_text", e.target.value)
                      }
                      placeholder="Describe the media"
                      className="mt-0.5 w-full rounded-md border border-gray-200 px-2 py-1.5 text-sm outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500">
                      Caption
                    </label>
                    <input
                      type="text"
                      value={image.caption ?? ""}
                      onChange={(e) =>
                        handleFieldChange(index, "caption", e.target.value)
                      }
                      placeholder="Optional caption"
                      className="mt-0.5 w-full rounded-md border border-gray-200 px-2 py-1.5 text-sm outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add buttons */}
      {canAddMore && (
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {/* Upload image */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleUpload}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-2 rounded-lg border border-dashed border-gray-300 px-4 py-2 text-sm text-gray-500 transition-colors hover:border-blue-400 hover:text-blue-500 disabled:opacity-50"
            >
              {uploading ? "Uploading…" : "+ Add Image"}
            </button>
          </div>

          {/* YouTube URL input */}
          <div className="flex gap-2">
            <input
              type="url"
              value={ytInput}
              onChange={(e) => {
                setYtInput(e.target.value);
                setYtError("");
              }}
              onKeyDown={(e) => e.key === "Enter" && handleAddYouTube()}
              placeholder="YouTube URL (youtube.com/watch?v=…)"
              className="min-w-0 flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-primary"
            />
            <button
              type="button"
              onClick={handleAddYouTube}
              disabled={!ytInput.trim()}
              className="flex-shrink-0 rounded-lg border border-dashed border-gray-300 px-4 py-2 text-sm text-gray-500 transition-colors hover:border-red-400 hover:text-red-500 disabled:opacity-40"
            >
              + YouTube
            </button>
          </div>
          {ytError && <p className="text-xs text-red-500">{ytError}</p>}
        </div>
      )}

      {uploadError && <p className="text-sm text-red-600">{uploadError}</p>}
    </div>
  );
}
