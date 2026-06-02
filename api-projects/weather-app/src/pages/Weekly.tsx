import { CalendarDays, MapPin } from 'lucide-react';

import { useLocationStore } from '../store/location';
import { useWeeklyWeather } from '../hooks/useWeeklyWeather';
import WeatherDayCard from '../components/weather/WeatherDayCard';
import Loading from '../components/info/Loading';
import AlertCard from '../components/info/AlertCard';

export default function Weekly() {
  const { location } = useLocationStore();
  const lat = location?.lat ?? null;
  const lon = location?.lng ?? null;

  const { data, loading, error } = useWeeklyWeather(lat, lon, {
    units: 'metric',
  });

  if (!location) {
    return (
      <div className='max-w-4xl mx-auto'>
        <AlertCard variant='info' title='No location set'>
          Go to{' '}
          <a href='/' className='text-orange-700 underline'>
            Home
          </a>{' '}
          and pick a location to see the hourly forecast.
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
      <div className='max-w-4xl mx-auto'>
        <AlertCard variant='error' title='Couldn’t load hourly forecast'>
          {error || 'Unknown error'}
        </AlertCard>
      </div>
    );
  }

  const tzOffset = data?.timezone_offset ?? 0;
  const days = data?.daily?.slice(0, 7) || [];

  return (
    <div className='max-w-5xl mx-auto'>
      <div className='rounded-3xl bg-white shadow-xl ring-1 ring-orange-100 p-6 md:p-8'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2 text-slate-700'>
            <MapPin size={18} className='text-orange-600' />
            <h2 className='text-xl md:text-2xl font-bold text-slate-900'>
              {location.label || 'Weekly forecast'}
            </h2>
          </div>
          <CalendarDays className='text-orange-600' />
        </div>

        <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          {days.map((d) => (
            <WeatherDayCard key={d.dt} day={d} tzOffset={tzOffset} />
          ))}
        </div>
      </div>
    </div>
  );
}
