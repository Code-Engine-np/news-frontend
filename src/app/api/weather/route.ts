import { NextResponse } from "next/server";
import { getCurrentWeather } from "@/src/app/services/weather.service";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lat = Number(searchParams.get("lat"));
  const lon = Number(searchParams.get("lon"));

  if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
    return NextResponse.json(
      { error: "Valid 'lat' and 'lon' query parameters are required" },
      { status: 400 },
    );
  }

  try {
    const weather = await getCurrentWeather(lat, lon);
    return NextResponse.json(weather, {
      headers: { "Cache-Control": "public, s-maxage=600, max-age=600" },
    });
  } catch (error) {
    console.error("Weather API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather" },
      { status: 502 },
    );
  }
}
