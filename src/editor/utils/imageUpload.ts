import { ChangeEvent } from "react";
import { uploadImageToCloudinary } from "@/src/lib/cloudinary";
import { CloudinaryUploadResponse } from "@/src/types/cloudinary";

export async function handleImageUpload(
  setUploadError: (error: string) => void,
  event: ChangeEvent<HTMLInputElement>,
  onImageUploaded: (ImageResponse: CloudinaryUploadResponse) => void,
) {
  const file = event.target.files?.[0];
  event.target.value = "";

  if (!file) return;

  try {
    setUploadError("");
    const url = await uploadImageToCloudinary(file);
    onImageUploaded(url);
  } catch (error) {
    setUploadError(
      error instanceof Error ? error.message : "Failed to upload image.",
    );
  }
}
