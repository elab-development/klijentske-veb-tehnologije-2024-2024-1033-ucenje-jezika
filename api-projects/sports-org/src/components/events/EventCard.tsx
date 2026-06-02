import { Link } from 'react-router-dom';
import { CalendarDays, Clock, MapPin, Users } from 'lucide-react';

import type { Event } from '../../types/event';

type Props = { event: Event };

export default function EventCard({ event }: Props) {
  return (
    <article className='h-full rounded-2xl shadow-sm bg-white p-5 hover:shadow-md transition'>
      <div className='flex items-start justify-between gap-4'>
        <div>
          <h3 className='text-lg font-semibold'>{event.title}</h3>
          <p className='text-sm text-indigo-700 font-medium'>{event.sport}</p>
        </div>
        <Link
          to={`/events/${event.id}`}
          className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700'
        >
          View
        </Link>
      </div>

      <div className='mt-3 grid grid-cols-1 gap-2 text-sm text-gray-700'>
        <div className='flex items-center gap-2'>
          <CalendarDays className='h-4 w-4 text-gray-500' />
          <span>{new Date(event.date).toLocaleDateString()}</span>
        </div>
        <div className='flex items-center gap-2'>
          <Clock className='h-4 w-4 text-gray-500' />
          <span>{event.time}</span>
        </div>
        <div className='flex items-center gap-2'>
          <MapPin className='h-4 w-4 text-gray-500' />
          <span>
            {event.location.city}, {event.location.country}
          </span>
        </div>
        {event.teams?.length ? (
          <div className='flex items-center gap-2'>
            <Users className='h-4 w-4 text-gray-500' />
            <span>
              {event.teams.length} {event.teams.length === 1 ? 'team' : 'teams'}
            </span>
          </div>
        ) : null}
      </div>
    </article>
  );
}
