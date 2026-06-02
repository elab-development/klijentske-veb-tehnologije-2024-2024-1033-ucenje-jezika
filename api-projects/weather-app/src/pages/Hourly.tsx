import { MapPin, Clock } from 'lucide-react';

import { useLocationStore } from '../store/location';
import { useHourlyWeather } from '../hooks/useHourlyWeather';
import HourCard from '../components/weather/HourCard';
import Loading from '../components/info/Loading';
import AlertCard from '../components/info/AlertCard';

export default function Hourly() {
  const { location } = useLocationStore();
  const lat = location?.lat ?? null;
  const lon = location?.lng ?? null;

  const { data, loading, error } = useHourlyWeather(lat, lon, {
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

  if (error || !data) {
    return (
      <div className='max-w-4xl mx-auto'>
        <AlertCard variant='error' title='Couldn’t load hourly forecast'>
          {error || 'Unknown error'}
        </AlertCard>
      </div>
    );
  }

  const tz = data.timezone_offset ?? 0;
  const hours = data.hourly.slice(0, 24);

  return (
    <div className='max-w-5xl mx-auto'>
      <div className='rounded-3xl bg-white shadow-xl ring-1 ring-orange-100 p-6 md:p-8'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2 text-slate-700'>
            <MapPin size={18} className='text-orange-600' />
            <h2 className='text-xl md:text-2xl font-bold text-slate-900'>
              {location.label || 'Hourly forecast'}
            </h2>
          </div>
          <Clock className='text-orange-600' />
        </div>

        <div className='mt-6 flex gap-4 overflow-x-auto pb-2'>
          {hours.map((h) => (
            <HourCard key={h.dt} hour={h} tzOffset={tz} />
          ))}
        </div>
      </div>
    </div>
  );
}
