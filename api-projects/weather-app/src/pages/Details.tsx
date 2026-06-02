import {
  MapPin,
  Wind,
  Droplets,
  Gauge,
  Eye,
  Sunrise,
  Sunset,
  Thermometer,
  Cloud,
} from 'lucide-react';

import { useLocationStore } from '../store/location';
import { WeatherService } from '../services/WeatherService';
import { useWeatherDetails } from '../hooks/useWeatherDetails';
import StatItem from '../components/weather/StatItem';
import AlertCard from '../components/info/AlertCard';
import Loading from '../components/info/Loading';

function fmtTime(unixSec: number | undefined, tzOffset: number) {
  if (!unixSec && unixSec !== 0) return '—';
  const ms = (unixSec + tzOffset) * 1000;
  return new Date(ms).toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function Details() {
  const { location } = useLocationStore();
  const lat = location?.lat ?? null;
  const lon = location?.lng ?? null;

  const { data, loading, error } = useWeatherDetails(lat, lon, {
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
          and pick a location to see details.
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
        <AlertCard variant='error' title='Couldn’t load details'>
          {error || 'Unknown error'}
        </AlertCard>
      </div>
    );
  }

  const cur = data.current;
  const tz = data.timezone_offset ?? 0;
  const cond = cur.weather?.[0];
  const icon = cond?.icon ? WeatherService.iconUrl(cond.icon, '2x') : null;

  return (
    <div className='max-w-5xl mx-auto'>
      <div className='rounded-3xl bg-white shadow-xl ring-1 ring-orange-100 p-6 md:p-8'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2 text-slate-700'>
            <MapPin size={18} className='text-orange-600' />
            <h2 className='text-xl md:text-2xl font-bold text-slate-900'>
              {location.label || 'Details'}
            </h2>
          </div>
          <div className='flex items-center gap-3'>
            {icon && (
              <img
                src={icon}
                alt={cond?.description || 'weather'}
                className='h-12 w-12 rounded-xl bg-white ring-1 ring-orange-100 p-1'
                loading='lazy'
              />
            )}
            <div className='text-right'>
              <div className='text-3xl font-extrabold text-slate-900'>
                {Math.round(cur.temp)}°C
              </div>
              <div className='text-sm text-slate-600 capitalize'>
                {cond?.description || '—'}
              </div>
            </div>
          </div>
        </div>

        <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          <StatItem
            label='Feels like'
            value={
              <span className='inline-flex items-center gap-1'>
                <Thermometer size={16} className='text-orange-600' />
                {Math.round(cur.feels_like)}°C
              </span>
            }
          />
          <StatItem
            label='Humidity'
            value={
              <span className='inline-flex items-center gap-1'>
                <Droplets size={16} className='text-orange-600' />
                {cur.humidity}%
              </span>
            }
          />
          <StatItem
            label='Pressure'
            value={
              <span className='inline-flex items-center gap-1'>
                <Gauge size={16} className='text-orange-600' />
                {cur.pressure} hPa
              </span>
            }
          />
          <StatItem
            label='Visibility'
            value={
              <span className='inline-flex items-center gap-1'>
                <Eye size={16} className='text-orange-600' />
                {cur.visibility != null
                  ? `${Math.round(cur.visibility / 1000)} km`
                  : '—'}
              </span>
            }
          />

          <StatItem
            label='Wind speed'
            value={
              <span className='inline-flex items-center gap-1'>
                <Wind size={16} className='text-orange-600' />
                {Math.round(cur.wind_speed)} m/s
              </span>
            }
          />
          <StatItem
            label='Wind gust'
            value={
              cur.wind_gust != null ? `${Math.round(cur.wind_gust)} m/s` : '—'
            }
            hint='If available'
          />
          <StatItem
            label='Wind direction'
            value={`${cur.wind_deg}°`}
            hint='Meteorological degrees'
          />
          <StatItem
            label='Cloudiness'
            value={
              <span className='inline-flex items-center gap-1'>
                <Cloud size={16} className='text-orange-600' />
                {cur.clouds}%
              </span>
            }
          />

          <StatItem label='UV index' value={cur.uvi != null ? cur.uvi : '—'} />
          <StatItem
            label='Dew point'
            value={`${Math.round(cur.dew_point)}°C`}
          />
          <StatItem
            label='Sunrise'
            value={
              <span className='inline-flex items-center gap-1'>
                <Sunrise size={16} className='text-orange-600' />
                {fmtTime(cur.sunrise, tz)}
              </span>
            }
          />
          <StatItem
            label='Sunset'
            value={
              <span className='inline-flex items-center gap-1'>
                <Sunset size={16} className='text-orange-600' />
                {fmtTime(cur.sunset, tz)}
              </span>
            }
          />
        </div>
      </div>
    </div>
  );
}
