import { getVisitorLocation } from "@/src/app/lib/location";
import { fetchWeather } from "@/src/app/lib/weather";
import { Weather } from "@/src/app/types/weather";

export async function getVisitorWeather(): Promise<Weather | null> {
  const location = await getVisitorLocation();

  if (!location) {
    return null;
  }

  const weather = await fetchWeather(location.latitude, location.longitude);

  return {
    city: weather.name,
    temperature: Math.round(weather.main.temp),
  };
}
