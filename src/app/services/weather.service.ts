import { fetchWeather } from "@/src/app/lib/weather";
import { Weather } from "@/src/app/types/weather";

export async function getCurrentWeather(
  latitude: number,
  longitude: number,
): Promise<Weather> {
  const data = await fetchWeather(latitude, longitude);

  return {
    city: data.location.name,
    country: data.location.country,
    temperature: Math.round(data.current.temp_c),
    condition: data.current.condition.text,
    icon: `https:${data.current.condition.icon}`,
  };
}
