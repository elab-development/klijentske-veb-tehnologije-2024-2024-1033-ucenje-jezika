import { ThermometerSun, MapPin } from 'lucide-react';

import { useLocationStore } from '../store/location';
import { WeatherService } from '../services/WeatherService';
import { useCurrentWeather } from '../hooks/useCurrentWeather';
import AlertCard from '../components/info/AlertCard';
import Loading from '../components/info/Loading';

export default function Current() {
  const { location } = useLocationStore();
  const lat = location?.lat ?? null;
  const lon = location?.lng ?? null;

  const { data, loading, error } = useCurrentWeather(lat, lon, {
    units: 'metric',
  });

  if (!location) {
    return (
      <div className='max-w-3xl mx-auto'>
        <AlertCard variant='info' title='No location set'>
          Go to{' '}
          <a href='/' className='text-orange-700 underline'>
            Home
          </a>{' '}
          and pick a location to see current weather.
        </AlertCard>
      </div>
    );
  }

  if (loading) {
    return (
      <div className='max-w-5xl mx-auto'>
        <Loading lines={6} />
      </div>
    );
  }

  if (error) {
    return (
      <div className='max-w-3xl mx-auto'>
        <AlertCard variant='error' title='Couldn’t load weather'>
          {error}
        </AlertCard>
      </div>
    );
  }

  const locLabel = location.label || data?.name || 'Selected location';
  const temp = Math.round(data?.main?.temp ?? 0);
  const cond = data?.weather?.[0];
  const iconUrl = cond?.icon ? WeatherService.iconUrl(cond.icon, '4x') : null;
  const descr = cond?.description
    ? cond.description.replace(/\b\w/g, (m) => m.toUpperCase())
    : '';

  return (
    <div className='max-w-3xl mx-auto'>
      <div className='rounded-3xl bg-white shadow-xl ring-1 ring-orange-100 p-6 md:p-8'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2 text-slate-700'>
            <MapPin size={18} className='text-orange-600' />
            <h2 className='text-xl md:text-2xl font-bold text-slate-900'>
              {locLabel}
            </h2>
          </div>
          <ThermometerSun className='text-orange-600' />
        </div>

        <div className='mt-4 flex items-center gap-6'>
          {iconUrl ? (
            <img
              src={iconUrl}
              alt={cond?.description || 'weather icon'}
              className='h-28 w-28 rounded-2xl bg-white ring-1 ring-orange-100 p-2'
              loading='eager'
            />
          ) : (
            <div className='h-28 w-28 rounded-2xl bg-orange-50 ring-1 ring-orange-100' />
          )}

          <div>
            <div className='text-5xl md:text-6xl font-extrabold text-slate-900'>
              {isFinite(temp) ? `${temp}°C` : '--'}
            </div>
            <div className='mt-1 text-slate-600 capitalize'>{descr || '—'}</div>
          </div>
        </div>

        <div className='mt-6 grid grid-cols-2 gap-4 text-sm text-slate-600'>
          <div className='rounded-xl bg-orange-50/60 ring-1 ring-orange-100 p-3'>
            <span className='font-semibold text-slate-900'>Feels like:</span>{' '}
            {Math.round(data?.main?.feels_like ?? NaN)}°C
          </div>
          <div className='rounded-xl bg-orange-50/60 ring-1 ring-orange-100 p-3'>
            <span className='font-semibold text-slate-900'>Humidity:</span>{' '}
            {data?.main?.humidity != null ? `${data.main.humidity}%` : '—'}
          </div>
        </div>
      </div>
    </div>
  );
}
