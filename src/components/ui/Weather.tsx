"use client";

import type { Weather } from "@/src/types/weather";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Weather() {
  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const response = await fetch(
            `/api/weather?lat=${coords.latitude}&lon=${coords.longitude}`,
          );

          if (!response.ok) return;

          const data: Weather = await response.json();
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
