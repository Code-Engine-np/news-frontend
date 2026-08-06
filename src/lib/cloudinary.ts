import { getDeleteSignature, getUploadSignature } from "@/src/lib/api";
import { CloudinaryUploadResponse } from "@/src/types/cloudinary";

export async function uploadImageToCloudinary(
  file: File,
): Promise<CloudinaryUploadResponse> {
  const res = await getUploadSignature(
    localStorage.getItem("best_khabar_access_token") || "",
  );

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
  return {
    secure_url: uploadResult.secure_url as string,
    resource_type: uploadResult.resource_type as string,
    public_id: uploadResult.public_id as string,
  };
}

export async function deleteImageFromCloudinary(
  imageRequest: CloudinaryUploadResponse,
): Promise<void> {
  const publicId = imageRequest.public_id;
  if (!publicId) {
    throw new Error("No public_id to delete");
  }

  const res = await getDeleteSignature(
    localStorage.getItem("best_khabar_access_token") || "",
    publicId,
  );

  const formData = new FormData();
  formData.append("public_id", publicId);
  formData.append("api_key", res.apiKey);
  formData.append("timestamp", res.timestamp.toString());
  formData.append("signature", res.signature);

  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${res.cloudName}/image/destroy`;
  const deleteResponse = await fetch(cloudinaryUrl, {
    method: "POST",
    body: formData,
  });

  if (!deleteResponse.ok) {
    throw new Error("Failed to delete image from Cloudinary");
  }
}
