import type { HourlyItem } from '../../types/weather';
import { WeatherService } from '../../services/WeatherService';

type Props = {
  hour: HourlyItem;
  tzOffset: number;
};

function formatHour(ts: number, tz: number) {
  const ms = (ts + tz) * 1000;
  return new Date(ms).toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function HourCard({ hour, tzOffset }: Props) {
  const cond = hour.weather?.[0];
  const icon = cond?.icon ? WeatherService.iconUrl(cond.icon, '2x') : null;
  const popPct = Math.round((hour.pop ?? 0) * 100);

  return (
    <div className='min-w-[160px] rounded-2xl p-4 ring-1 ring-orange-100 bg-orange-50/60'>
      <div className='text-xs text-slate-600'>
        {formatHour(hour.dt, tzOffset)}
      </div>
      <div className='mt-2 flex items-center gap-3'>
        {icon && (
          <img
            src={icon}
            alt={cond?.description || 'weather'}
            className='h-12 w-12 rounded-xl bg-white ring-1 ring-orange-100 p-1'
            loading='lazy'
          />
        )}
        <div>
          <div className='text-lg font-semibold text-slate-900'>
            {Math.round(hour.temp)}°
          </div>
          <div className='text-xs text-slate-600 capitalize'>
            {cond?.description || '—'}
          </div>
        </div>
      </div>
      <div className='mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600'>
        <div className='rounded-lg bg-white/70 ring-1 ring-orange-100 p-2'>
          Feels {Math.round(hour.feels_like)}°
        </div>
        <div className='rounded-lg bg-white/70 ring-1 ring-orange-100 p-2'>
          POP {popPct}%
        </div>
      </div>
    </div>
  );
}
