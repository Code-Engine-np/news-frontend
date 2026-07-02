import { headers } from "next/headers";

export async function getVisitorLocation() {
  const headerList = await headers();

  const city = headerList.get("x-vercel-ip-city");
  const latitude = headerList.get("x-vercel-ip-latitude");
  const longitude = headerList.get("x-vercel-ip-longitude");

  if (!latitude || !longitude) {
    return null;
  }

  return {
    city,
    latitude,
    longitude,
  };
}
