import { useQuery } from "@tanstack/react-query";
import { Cloud, Droplets, Loader2, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Weather } from "@shared/schema";

export function WeatherWidget() {
  const { data: weather, isLoading, error } = useQuery<Weather>({
    queryKey: ["/api/weather"],
    refetchInterval: 600000,
  });

  if (isLoading) {
    return (
      <Card className="p-6 w-52 hover-elevate transition-all" data-testid="card-weather-loading">
        <div className="flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      </Card>
    );
  }

  if (error || !weather) {
    return (
      <Card className="p-6 w-52 hover-elevate transition-all border-destructive/50" data-testid="card-weather-error">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            <h3 className="font-semibold text-sm">Weather Error</h3>
          </div>
          
          <p className="text-xs text-muted-foreground leading-relaxed">
            Unable to fetch weather data. Please configure a valid OpenWeatherMap API key in your secrets.
          </p>
          
          <a 
            href="https://openweathermap.org/api" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-primary hover:underline block"
          >
            Get free API key →
          </a>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 w-52 hover-elevate transition-all" data-testid="card-weather">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Cloud className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-sm" data-testid="text-weather-city">
            {weather.city}
          </h3>
        </div>
        
        <div className="space-y-2">
          <div className="text-3xl font-bold" data-testid="text-weather-temp">
            {Math.round(weather.temperature)}°C
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Droplets className="h-4 w-4" />
            <span data-testid="text-weather-humidity">{weather.humidity}% humidity</span>
          </div>

          {weather.description && (
            <p className="text-xs text-muted-foreground capitalize" data-testid="text-weather-description">
              {weather.description}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
