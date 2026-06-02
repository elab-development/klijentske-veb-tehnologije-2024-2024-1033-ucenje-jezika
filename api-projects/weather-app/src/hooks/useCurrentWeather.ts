import { useEffect, useState } from 'react';
import { WeatherService } from '../services/WeatherService';
import type { Units, WeatherCurrentResponse } from '../types/weather';

export function useCurrentWeather(
  lat: number | null,
  lon: number | null,
  { units = 'metric' as Units } = {}
) {
  const [data, setData] = useState<WeatherCurrentResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      if (lat == null || lon == null) return;
      setLoading(true);
      setErr(null);
      try {
        const resp = await WeatherService.current(lat, lon, units);
        if (!cancelled) setData(resp);
      } catch (e: any) {
        if (!cancelled) setErr(e?.message || 'Failed to load weather');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [lat, lon, units]);

  return { data, loading, error };
}
