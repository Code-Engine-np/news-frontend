import { headers } from "next/headers";

export async function getClientIP(): Promise<string | null> {
  const headersList = await headers();

  const forwarded = headersList.get("x-forwarded-for");
  const realIP = headersList.get("x-real-ip");
  const cfIP = headersList.get("cf-connecting-ip");

  if (cfIP) {
    return cfIP;
  }

  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  if (realIP) {
    return realIP;
  }

  return null;
}
