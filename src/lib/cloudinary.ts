import { getDeleteSignature, getUploadSignature } from "@/src/lib/api";
import { CloudinaryUploadResponse } from "@/src/types/cloudinary";

export async function uploadImageToCloudinary(
  file: File,
  // folder?: string,
): Promise<CloudinaryUploadResponse> {
  const res = await getUploadSignature(
    localStorage.getItem("best_khabar_access_token") || "",
  );

  console.log("res", res);

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", res.apiKey);
  formData.append("timestamp", res.timestamp.toString());
  formData.append("signature", res.signature);
  formData.append("folder", res.folder);

  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${res.cloudName}/image/upload`;

  const uploadResponse = await fetch(cloudinaryUrl, {
    method: "POST",
    body: formData,
  });

  if (!uploadResponse.ok) {
    throw new Error("Failed to upload image to Cloudinary");
  }

  const uploadResult = await uploadResponse.json();
  console.log("Upload result:", uploadResult);
  return {
    secure_url: uploadResult.secure_url,
    resource_type: uploadResult.resource_type,
    public_id: uploadResult.public_id,
  };
}

export async function deleteImageFromCloudinary(
  imageRequest: CloudinaryUploadResponse,
): Promise<void> {
  console.log("Deleting image from Cloudinary:", imageRequest.public_id);
  const res = await getDeleteSignature(
    localStorage.getItem("best_khabar_access_token") || "",
    imageRequest.public_id,
  );

  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${res.cloudName}/image/destroy`;

  const publicId = imageRequest.public_id; // Extract public_id from URL

  if (!publicId) {
    throw new Error("Invalid image URL");
  }

  const formData = new FormData();
  formData.append("public_id", publicId);
  formData.append("api_key", res.apiKey);
  formData.append("timestamp", res.timestamp.toString());
  formData.append("signature", res.signature);

  const deleteResponse = await fetch(cloudinaryUrl, {
    method: "POST",
    body: formData,
  });

  if (!deleteResponse.ok) {
    throw new Error("Failed to delete image from Cloudinary");
  }
}
