import { WeatherService } from '../../services/WeatherService';
import type { DailyItem } from '../../types/weather';

type Props = {
  day: DailyItem;
  tzOffset: number;
};

function formatDay(ts: number, tzOffsetSec: number) {
  const ms = (ts + tzOffsetSec) * 1000;
  return new Date(ms).toLocaleDateString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}

export default function WeatherDayCard({ day, tzOffset }: Props) {
  const cond = day.weather?.[0];
  const icon = cond?.icon ? WeatherService.iconUrl(cond.icon, '2x') : null;

  return (
    <div className='rounded-2xl p-4 ring-1 ring-orange-100 bg-orange-50/60'>
      <div className='text-sm text-slate-600'>
        {formatDay(day.dt, tzOffset)}
      </div>
      <div className='mt-2 flex items-center gap-3'>
        {icon && (
          <img
            src={icon}
            alt={cond?.description || 'weather'}
            className='h-14 w-14 rounded-xl bg-white ring-1 ring-orange-100 p-1'
            loading='lazy'
          />
        )}
        <div>
          <div className='text-lg font-semibold text-slate-900'>
            {Math.round(day.temp.max)}° / {Math.round(day.temp.min)}°
          </div>
          <div className='text-sm text-slate-600 capitalize'>
            {cond?.description || '—'}
          </div>
        </div>
      </div>

      <div className='mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600'>
        <div className='rounded-lg bg-white/70 ring-1 ring-orange-100 p-2'>
          Feels: {Math.round(day.feels_like.day)}°
        </div>
        <div className='rounded-lg bg-white/70 ring-1 ring-orange-100 p-2'>
          Humidity: {day.humidity}%
        </div>
        <div className='rounded-lg bg-white/70 ring-1 ring-orange-100 p-2'>
          Wind: {Math.round(day.wind_speed)} {/** m/s metric */}
        </div>
        <div className='rounded-lg bg-white/70 ring-1 ring-orange-100 p-2'>
          POP: {Math.round((day.pop ?? 0) * 100)}%
        </div>
      </div>
    </div>
  );
}
