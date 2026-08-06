import "server-only";

const API_KEY = process.env.WEATHER_API_KEY;

export async function fetchWeather(lat: number, lon: number) {
  if (!API_KEY) {
    throw new Error("WEATHER_API_KEY is not configured");
  }

  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${lat},${lon}`,
    // Cache upstream responses for 10 minutes to stay within rate limits.
    { next: { revalidate: 600 } },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather");
  }

  return response.json();
}
