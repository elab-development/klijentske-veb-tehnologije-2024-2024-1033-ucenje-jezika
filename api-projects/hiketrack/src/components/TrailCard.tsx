import { MapPin, Mountain, Clock, Route } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Trail, Location } from '../data/types';

type Props = {
  trail: Trail;
  location: Location | undefined;
};

export default function TrailCard({ trail, location }: Props) {
  return (
    <Link
      to={`/tracks/${trail.id}`}
      className='block bg-white rounded-xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-md hover:scale-[1.01] transition'
    >
      {location?.imageUrl ? (
        <img
          src={location.imageUrl}
          alt={location.name}
          className='h-40 w-full object-cover'
          loading='lazy'
        />
      ) : (
        <div className='h-40 w-full bg-stone-200' />
      )}

      <div className='p-4'>
        <div className='flex items-start justify-between gap-3'>
          <h3 className='text-lg font-semibold text-emerald-900 leading-snug'>
            {trail.name}
          </h3>

          <span
            className={
              'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium capitalize ' +
              (trail.difficulty === 'easy'
                ? 'bg-emerald-100 text-emerald-800'
                : trail.difficulty === 'moderate'
                ? 'bg-amber-100 text-amber-800'
                : 'bg-rose-100 text-rose-800')
            }
            title='Difficulty'
          >
            {trail.difficulty}
          </span>
        </div>

        <div className='mt-2 flex items-center text-stone-600 gap-1.5 text-sm'>
          <MapPin className='w-4 h-4' />
          <span>{location?.name ?? 'Unknown location'}</span>
        </div>

        <ul className='mt-3 grid grid-cols-3 gap-2 text-sm text-stone-700'>
          <li className='flex items-center gap-1.5'>
            <Route className='w-4 h-4' />
            <span>{trail.distanceKm} km</span>
          </li>
          <li className='flex items-center gap-1.5'>
            <Mountain className='w-4 h-4' />
            <span>{trail.elevationGainM} m</span>
          </li>
          <li className='flex items-center gap-1.5'>
            <Clock className='w-4 h-4' />
            <span>{trail.estTimeH} h</span>
          </li>
        </ul>

        {trail.tags?.length ? (
          <div className='mt-3 flex flex-wrap gap-1.5'>
            {trail.tags.slice(0, 4).map((t) => (
              <span
                key={t}
                className='text-xs bg-stone-100 text-stone-700 px-2 py-0.5 rounded'
              >
                {t}
              </span>
            ))}
          </div>
        ) : null}

        <div className='mt-3 text-xs text-stone-500 capitalize'>
          Type: {trail.type.replaceAll('-', ' ')}
        </div>
      </div>
    </Link>
  );
}
