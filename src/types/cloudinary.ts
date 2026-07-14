export interface CloudinaryUploadSignature {
  timestamp: number;
  signature: string;
  apiKey: string;
  cloudName: string;
  folder: string;
}

export interface CloudinaryDeleteSignature {
  timestamp: number;
  signature: string;
  apiKey: string;
  cloudName: string;
}

export interface CloudinaryUploadResponse {
  secure_url: string;
  resource_type: string;
  public_id: string;
  alt_text?: string;
  caption?: string;
}
