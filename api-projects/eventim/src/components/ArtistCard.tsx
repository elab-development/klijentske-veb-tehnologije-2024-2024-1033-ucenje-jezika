import { Link } from 'react-router-dom';

import type { IArtist } from '../data/types';

type Props = {
  artist: IArtist;
  to?: string;
  eventCount?: number;
  className?: string;
  placeholderSrc?: string;
};

export default function ArtistCard({
  artist,
  to,
  eventCount,
  className,
  placeholderSrc = '/avatar-placeholder.jpg',
}: Props) {
  const href = to ?? `/artists/${artist.id}`;

  return (
    <Link
      to={href}
      aria-label={artist.name}
      className={
        'group overflow-hidden rounded-2xl border border-white/10 bg-[#0f0f13] transition hover:-translate-y-0.5 hover:border-red-600/40 ' +
        (className ?? '')
      }
    >
      <div className='aspect-[4/3] w-full overflow-hidden'>
        <img
          src={artist.imageUrl || placeholderSrc}
          alt={artist.name}
          className='h-full w-full object-cover transition duration-300 group-hover:scale-105'
          loading='lazy'
        />
      </div>

      <div className='space-y-1 p-4'>
        <h3 className='line-clamp-1 text-base font-semibold text-white'>
          {artist.name}
        </h3>
        <p className='line-clamp-1 text-sm text-gray-400'>
          {artist.genre?.join(', ') ?? 'Artist'}
          {artist.country ? ` · ${artist.country}` : ''}
        </p>
        {typeof eventCount === 'number' && (
          <p className='text-xs text-gray-500'>{eventCount} event(s)</p>
        )}
      </div>
    </Link>
  );
}

export function ArtistCardSkeleton() {
  return (
    <div className='overflow-hidden rounded-2xl border border-white/10 bg-[#0f0f13]'>
      <div className='aspect-[4/3] w-full animate-pulse bg-white/5' />
      <div className='space-y-3 p-4'>
        <div className='h-4 w-3/4 animate-pulse rounded bg-white/10' />
        <div className='h-3 w-1/2 animate-pulse rounded bg-white/10' />
      </div>
    </div>
  );
}
