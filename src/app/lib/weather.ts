const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY!;

export async function fetchWeather(lat: number, lon: number) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${lat},${lon}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather");
  }

  return response.json();
}
