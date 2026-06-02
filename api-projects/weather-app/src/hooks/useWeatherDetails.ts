import { useEffect, useState } from 'react';
import type { OneCallCurrentResponse, Units } from '../types/weather';
import { WeatherService } from '../services/WeatherService';

export function useWeatherDetails(
  lat: number | null,
  lon: number | null,
  { units = 'metric' as Units } = {}
) {
  const [data, setData] = useState<OneCallCurrentResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (lat == null || lon == null) return;
      setLoading(true);
      setErr(null);
      try {
        const resp = await WeatherService.currentOneCall(lat, lon, units);
        if (!cancelled) setData(resp);
      } catch (e: any) {
        if (!cancelled) setErr(e?.message || 'Failed to load details');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [lat, lon, units]);

  return { data, loading, error };
}
