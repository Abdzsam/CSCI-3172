import type { Context, Config } from "@netlify/functions";

interface WeatherCache {
  data: WeatherData;
  timestamp: number;
}

interface WeatherData {
  city: string;
  temperature: number;
  humidity: number;
  description?: string;
  icon?: string;
}

const WEATHER_CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

let weatherCache: WeatherCache | null = null;

export default async (req: Request, context: Context): Promise<Response> => {
  try {
    // Check cache first
    if (weatherCache && Date.now() - weatherCache.timestamp < WEATHER_CACHE_DURATION) {
      return new Response(JSON.stringify(weatherCache.data), {
        headers: { "Content-Type": "application/json" },
      });
    }

    const OPENWEATHER_API_KEY = Netlify.env.get("OPENWEATHERMAP_API_KEY");

    if (!OPENWEATHER_API_KEY) {
      console.warn("Weather API: OPENWEATHERMAP_API_KEY not configured.");
      return new Response(
        JSON.stringify({
          error: "Weather API key not configured",
          message: "OPENWEATHERMAP_API_KEY environment variable is missing.",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const city = "Halifax";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`;

    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenWeather API error:", response.status, response.statusText);
      console.error("Error details:", errorText);

      return new Response(
        JSON.stringify({
          error: "Failed to fetch weather data",
          message: `OpenWeatherMap API returned status ${response.status}. ${
            response.status === 401 ? "Please verify your API key is valid." : ""
          }`,
        }),
        {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const data = await response.json();

    const weatherData: WeatherData = {
      city: data.name,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      description: data.weather[0]?.description,
      icon: data.weather[0]?.icon,
    };

    weatherCache = {
      data: weatherData,
      timestamp: Date.now(),
    };

    return new Response(JSON.stringify(weatherData), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching weather:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to fetch weather data",
        message: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

export const config: Config = {
  path: "/api/weather",
};
