const OPENWEATHER_API_KEY = process.env.OPEN_WEATHER_KEY;

export async function fetchWeather(latitude: string, longitude: string) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OPENWEATHER_API_KEY}&units=metric`,
    {
      next: {
        revalidate: 600,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather.");
  }

  return response.json();
}
