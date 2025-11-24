import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

const OPENWEATHER_API_KEY = process.env.OPENWEATHERMAP_API_KEY;
const WEATHER_CACHE_DURATION = 10 * 60 * 1000;

interface WeatherCache {
  data: any;
  timestamp: number;
}

let weatherCache: WeatherCache | null = null;

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getProjects();
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ 
        error: "Failed to fetch projects",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  app.get("/api/weather", async (req, res) => {
    try {
      if (weatherCache && Date.now() - weatherCache.timestamp < WEATHER_CACHE_DURATION) {
        return res.json(weatherCache.data);
      }

      if (!OPENWEATHER_API_KEY) {
        console.warn("Weather API: OPENWEATHERMAP_API_KEY not configured. Get a free key at https://openweathermap.org/api");
        return res.status(500).json({ 
          error: "Weather API key not configured",
          message: "OPENWEATHERMAP_API_KEY environment variable is missing. Sign up at https://openweathermap.org/api to get a free API key."
        });
      }

      const city = "Halifax";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`;

      const response = await fetch(url);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("OpenWeather API error:", response.status, response.statusText);
        console.error("Error details:", errorText);
        
        if (response.status === 401) {
          console.warn("Weather API key is invalid. Please verify your OPENWEATHERMAP_API_KEY secret at https://openweathermap.org/api");
        }
        
        return res.status(response.status).json({ 
          error: "Failed to fetch weather data",
          message: `OpenWeatherMap API returned status ${response.status}. ${response.status === 401 ? "Please verify your API key is valid." : ""}`
        });
      }

      const data = await response.json();

      const weatherData = {
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

      res.json(weatherData);
    } catch (error) {
      console.error("Error fetching weather:", error);
      res.status(500).json({ 
        error: "Failed to fetch weather data",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
