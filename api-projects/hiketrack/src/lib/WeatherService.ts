type OWMWeather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

type OWMCurrentResponse = {
  weather: OWMWeather[];
  main: { temp: number; feels_like: number; humidity: number };
  wind: { speed: number };
  dt: number;
  name?: string;
};

type OWMForecastItem = {
  dt: number;
  main: { temp_min: number; temp_max: number; temp: number; humidity: number };
  weather: OWMWeather[];
  wind: { speed: number };
  dt_txt: string;
};

type OWMForecastResponse = {
  list: OWMForecastItem[];
  city: { name: string; timezone: number };
};

export type DailyForecast = {
  dateISO: string;
  min: number;
  max: number;
  icon: string;
  description: string;
};

const BASE = 'https://api.openweathermap.org/data/2.5';

function getKey(): string {
  const key = import.meta.env.VITE_OWM_API_KEY as string | undefined;
  if (!key) {
    throw new Error('Missing VITE_OWM_API_KEY in .env');
  }
  return key;
}

export class WeatherService {
  static async getCurrent(lat: number, lon: number, lang = 'en') {
    const url = `${BASE}/weather?lat=${lat}&lon=${lon}&appid=${getKey()}&units=metric&lang=${lang}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch current weather');
    const data: OWMCurrentResponse = await res.json();
    return {
      temp: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      wind: data.wind.speed,
      description: data.weather?.[0]?.description ?? '',
      icon: data.weather?.[0]?.icon ?? '01d',
      ts: data.dt * 1000,
    };
  }

  static async getForecast(lat: number, lon: number, lang = 'en') {
    const url = `${BASE}/forecast?lat=${lat}&lon=${lon}&appid=${getKey()}&units=metric&lang=${lang}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch forecast');
    const data: OWMForecastResponse = await res.json();

    const byDay = new Map<string, OWMForecastItem[]>();
    for (const it of data.list) {
      const d = new Date(it.dt * 1000);
      const iso = d.toISOString().slice(0, 10);
      const arr = byDay.get(iso) ?? [];
      arr.push(it);
      byDay.set(iso, arr);
    }

    const days: DailyForecast[] = [];
    for (const [dateISO, items] of byDay.entries()) {
      const min = Math.round(Math.min(...items.map((i) => i.main.temp_min)));
      const max = Math.round(Math.max(...items.map((i) => i.main.temp_max)));
      const freq = new Map<string, number>();
      const icons = new Map<string, number>();
      for (const i of items) {
        const w = i.weather?.[0];
        if (!w) continue;
        freq.set(w.description, (freq.get(w.description) ?? 0) + 1);
        icons.set(w.icon, (icons.get(w.icon) ?? 0) + 1);
      }
      const description =
        [...freq.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? '';
      const icon =
        [...icons.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? '01d';

      days.push({ dateISO, min, max, icon, description });
    }

    return days.sort((a, b) => a.dateISO.localeCompare(b.dateISO)).slice(0, 5);
  }

  static getIconUrl(icon: string) {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  }
}
