"use client";

import { getCurrentWeather } from "@/src/app/services/weather.service";
import type { Weather } from "@/src/app/types/weather";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Weather() {
  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const data = await getCurrentWeather(
            coords.latitude,
            coords.longitude,
          );

          setWeather(data);
        } catch (error) {
          console.error(error);
        }
      },
      (error) => {
        console.error(error);
      },
    );
  }, []);

  if (!weather) {
    return null;
  }

  console.log("Weather data in Weather component:", weather); // Debugging line

  return (
    <div className="flex items-center gap-2">
      <Image
        src={weather.icon}
        alt={weather.condition}
        width={24}
        height={24}
      />

      <span>
        {weather.temperature}°C {weather.city}
      </span>
    </div>
  );
}
