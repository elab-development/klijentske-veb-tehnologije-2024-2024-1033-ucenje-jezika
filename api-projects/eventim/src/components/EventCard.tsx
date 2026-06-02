import { Link } from 'react-router-dom';
import type { IArtist, IEvent } from '../data/types';
import { EventEntity } from '../data/domain/EventEntity';

type EventLike = IEvent | EventEntity;

type EventCardProps = {
  event: EventLike;
  artistById?: Record<string, Pick<IArtist, 'name'> | undefined>;
  to?: string;
  className?: string;
  imageClassName?: string;
  showArtists?: boolean;
  placeholderSrc?: string;
};

export default function EventCard({
  event,
  artistById,
  to,
  className,
  imageClassName,
  showArtists = true,
  placeholderSrc = '/placeholder.png',
}: EventCardProps) {
  const href = to ?? `/events/${event.id}`;

  const dateStr =
    (event as any).formattedDate?.() ||
    new Intl.DateTimeFormat(navigator.language, {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(event.datetime));

  const artists =
    event.artistIds
      ?.map((id) => artistById?.[id]?.name)
      .filter(Boolean)
      .join(' · ') || 'Various artists';

  return (
    <Link
      to={href}
      aria-label={event.title}
      className={
        'group overflow-hidden rounded-2xl border border-white/10 bg-[#0f0f13] transition hover:-translate-y-0.5 hover:border-red-600/40 ' +
        (className ?? '')
      }
    >
      <div
        className={
          'aspect-[16/9] w-full overflow-hidden ' + (imageClassName ?? '')
        }
      >
        <img
          src={event.imageUrl || placeholderSrc}
          alt={event.title}
          className='h-full w-full object-cover transition duration-300 group-hover:scale-105'
          loading='lazy'
        />
      </div>

      <div className='space-y-2 p-4'>
        <div className='inline-flex items-center gap-2'>
          <span className='rounded-md bg-red-600/20 px-2 py-0.5 text-xs font-medium text-red-300'>
            {event.type}
          </span>
          <span className='text-xs text-gray-400'>{dateStr}</span>
        </div>

        <h3 className='line-clamp-1 text-base font-semibold text-white'>
          {event.title}
        </h3>

        <p className='line-clamp-1 text-sm text-gray-400'>
          {event.venue.name} · {event.venue.city}, {event.venue.country}
        </p>

        {showArtists && (
          <p className='line-clamp-1 text-xs text-gray-500'>{artists}</p>
        )}
      </div>
    </Link>
  );
}

export function EventCardSkeleton() {
  return (
    <div className='overflow-hidden rounded-2xl border border-white/10 bg-[#0f0f13]'>
      <div className='aspect-[16/9] w-full animate-pulse bg-white/5' />
      <div className='space-y-3 p-4'>
        <div className='h-3 w-24 animate-pulse rounded bg-white/10' />
        <div className='h-4 w-3/4 animate-pulse rounded bg-white/10' />
        <div className='h-3 w-1/2 animate-pulse rounded bg-white/10' />
      </div>
    </div>
  );
}
