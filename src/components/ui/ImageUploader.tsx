// src/components/ImageUploader.tsx
"use client";

import { useRef, useState } from "react";
import { handleImageUpload } from "@/src/editor/utils/imageUpload";
import { deleteImageFromCloudinary } from "@/src/lib/cloudinary";
import Image from "next/image";
import { CloudinaryUploadResponse } from "@/src/types/cloudinary";

interface ImageUploaderProps {
  images: CloudinaryUploadResponse[]; // controlled by parent
  onChange: (images: CloudinaryUploadResponse[]) => void; // parent updates its state
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

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setUploading(true);
    await handleImageUpload(setUploadError, event, (url) =>
      onChange([...images, { ...url, alt_text: "", caption: "" }]),
    );
    setUploading(false);
  };

  const handleDelete = async (index: number) => {
    const image = images[index];
    setDeletingIndex(index);
    try {
      await deleteImageFromCloudinary(image);
      onChange(images.filter((_, i) => i !== index));
    } catch {
      setUploadError("Failed to delete image.");
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
      images.map((image, i) =>
        i === index ? { ...image, [field]: value } : image,
      ),
    );
  };

  const canAddMore = images.length < maxImages;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">
          Article Images
        </label>
        <span className="text-xs text-gray-400">
          {images.length}/{maxImages}
        </span>
      </div>

      {/* Image previews */}
      {images.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {images.map((image, index) => (
            <div
              key={image.public_id || index}
              className="flex gap-3 rounded-lg border border-gray-200 p-3"
            >
              <div className="relative group w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200">
                <Image
                  src={image.secure_url}
                  alt={image.alt_text || `Article image ${index + 1}`}
                  fill
                  sizes="6rem"
                  quality={75}
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  {deletingIndex === index ? (
                    <span className="text-white text-xs">Deleting...</span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleDelete(index)}
                      className="text-white bg-red-500 hover:bg-red-600 rounded-full w-7 h-7 flex items-center justify-center text-sm"
                      title="Remove image"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <span className="absolute top-1 left-1 bg-black/60 text-white text-[10px] rounded px-1">
                  {index + 1}
                </span>
              </div>

              <div className="flex-1 min-w-0 space-y-2">
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
                    placeholder="Describe the image"
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
          ))}
        </div>
      )}

      {/* Upload button */}
      {canAddMore && (
        <div>
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
            className="flex items-center gap-2 px-4 py-2 border border-dashed border-gray-300 rounded-lg text-sm text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-colors disabled:opacity-50"
          >
            {uploading ? (
              <>
                <span className="animate-spin">⏳</span> Uploading...
              </>
            ) : (
              <>
                <span>+</span> Add Image
              </>
            )}
          </button>
        </div>
      )}

      {uploadError && <p className="text-sm text-red-600">{uploadError}</p>}
    </div>
  );
}
