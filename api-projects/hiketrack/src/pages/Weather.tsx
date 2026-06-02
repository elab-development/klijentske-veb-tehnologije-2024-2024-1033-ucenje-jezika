import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LOCATIONS } from '../data/locations';
import { WeatherService, type DailyForecast } from '../lib/WeatherService';
import { CloudSun, MapPin } from 'lucide-react';

type Current = {
  temp: number;
  feelsLike: number;
  humidity: number;
  wind: number;
  description: string;
  icon: string;
  ts: number;
};

export default function Weather() {
  const [params, setParams] = useSearchParams();
  const selected = params.get('loc') || LOCATIONS[0]?.id;

  const location = useMemo(
    () => LOCATIONS.find((l) => l.id === selected) ?? LOCATIONS[0],
    [selected]
  );

  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [current, setCurrent] = useState<Current | null>(null);
  const [forecast, setForecast] = useState<DailyForecast[] | null>(null);

  const pick = (locId: string) => {
    params.set('loc', locId);
    setParams(params);
  };

  useEffect(() => {
    let cancelled = false;
    async function run() {
      if (!location) return;
      setLoading(true);
      setErr(null);
      try {
        const [c, f] = await Promise.all([
          WeatherService.getCurrent(location.lat, location.lon, 'en'),
          WeatherService.getForecast(location.lat, location.lon, 'en'),
        ]);
        if (!cancelled) {
          setCurrent(c);
          setForecast(f);
        }
      } catch (e: any) {
        if (!cancelled) setErr(e?.message ?? 'Failed to load weather');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [location?.id]);

  return (
    <section>
      <header className='mb-6'>
        <h1 className='text-2xl md:text-3xl font-bold text-emerald-900 flex items-center gap-2'>
          <CloudSun className='w-6 h-6' /> Weather
        </h1>
        <p className='text-stone-700 mt-1 text-sm'>
          Choose a location to see the current conditions and multi-day
          forecast.
        </p>
      </header>

      <div className='mb-6 flex gap-2 overflow-x-auto pb-1'>
        {LOCATIONS.map((loc) => (
          <button
            key={loc.id}
            onClick={() => pick(loc.id)}
            className={
              'flex items-center gap-2 rounded-lg border px-3 py-2 whitespace-nowrap transition ' +
              (loc.id === location?.id
                ? 'bg-emerald-700 text-white border-emerald-700'
                : 'bg-white text-stone-800 border-stone-300 hover:bg-stone-100')
            }
            title={loc.name}
          >
            <MapPin className='w-4 h-4 shrink-0' />
            <span className='text-sm'>{loc.name}</span>
          </button>
        ))}
      </div>

      {err && (
        <div className='mb-4 rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-rose-700'>
          {err}
        </div>
      )}
      {loading && (
        <div className='mb-6 text-stone-600 text-sm'>Loading weather…</div>
      )}

      {current && (
        <div className='bg-white rounded-xl border border-stone-200 shadow-sm p-4 mb-6 flex items-center justify-between'>
          <div>
            <h2 className='text-lg font-semibold text-emerald-900'>
              {location?.name}
            </h2>
            <p className='text-stone-700 capitalize'>{current.description}</p>
            <div className='mt-2 flex flex-wrap gap-4 text-sm text-stone-700'>
              <span>
                Temp: <strong>{current.temp}°C</strong>
              </span>
              <span>
                Feels like: <strong>{current.feelsLike}°C</strong>
              </span>
              <span>
                Humidity: <strong>{current.humidity}%</strong>
              </span>
              <span>
                Wind: <strong>{current.wind} m/s</strong>
              </span>
            </div>
          </div>
          <img
            alt={current.description}
            src={WeatherService.getIconUrl(current.icon)}
            className='w-16 h-16'
          />
        </div>
      )}

      {forecast && (
        <>
          <h3 className='text-base font-semibold text-stone-800 mb-3'>
            Next days
          </h3>
          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4'>
            {forecast.map((d) => (
              <div
                key={d.dateISO}
                className='bg-white rounded-xl border border-stone-200 shadow-sm p-4 text-center'
              >
                <div className='text-sm text-stone-600'>
                  {new Date(d.dateISO).toLocaleDateString(undefined, {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  })}
                </div>
                <img
                  alt={d.description}
                  src={WeatherService.getIconUrl(d.icon)}
                  className='mx-auto my-2 w-12 h-12'
                />
                <div className='text-sm capitalize text-stone-700'>
                  {d.description}
                </div>
                <div className='mt-2 font-semibold'>
                  {d.max}° /{' '}
                  <span className='text-stone-600 font-normal'>{d.min}°C</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
