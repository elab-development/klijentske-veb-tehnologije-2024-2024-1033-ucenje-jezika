import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useEventim } from '../store/eventim';
import EventCard from '../components/EventCard';

export default function ArtistDetail() {
  const { id: artistId = '' } = useParams();
  const { artists, events } = useEventim();

  const artist = artists.find((a) => a.id === artistId) || null;

  const artistEvents = useMemo(() => {
    const list = events.filter((e) => e.artistIds.includes(artistId));
    return list.sort(
      (a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
    );
  }, [events, artistId]);

  const artistById = useMemo(
    () => Object.fromEntries(artists.map((a) => [a.id, a])),
    [artists]
  );

  if (!artist) {
    return (
      <div className='py-16 text-center'>
        <h1 className='text-2xl font-semibold text-white'>Artist not found</h1>
        <p className='mt-2 text-sm text-gray-400'>
          The artist you’re looking for doesn’t exist or hasn’t been loaded yet.
        </p>
        <Link
          to='/artists'
          className='mt-6 inline-block rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500'
        >
          Back to Artists
        </Link>
      </div>
    );
  }

  return (
    <div className='py-8'>
      {/* Header */}
      <section className='relative overflow-hidden rounded-2xl border border-white/10 bg-[#0f0f13]'>
        <div className='grid gap-6 p-6 sm:grid-cols-[220px_1fr] sm:p-8'>
          {/* Image */}
          <div className='overflow-hidden rounded-xl border border-white/10 bg-white/5'>
            <img
              src={artist.imageUrl || '/avatar-placeholder.jpg'}
              alt={artist.name}
              className='h-full w-full object-cover'
              loading='lazy'
            />
          </div>

          {/* Info */}
          <div className='space-y-3'>
            <h1 className='text-2xl font-bold text-white sm:text-3xl'>
              {artist.name}
            </h1>

            <div className='flex flex-wrap items-center gap-2 text-sm'>
              <span className='rounded-md bg-white/5 px-2 py-1 text-gray-300'>
                {artist.genre?.join(', ') || 'Genre: —'}
              </span>
              <span className='rounded-md bg-white/5 px-2 py-1 text-gray-300'>
                Country: {artist.country ?? '—'}
              </span>
              <span className='rounded-md bg-white/5 px-2 py-1 text-gray-300'>
                Events: {artistEvents.length}
              </span>
            </div>

            {artist.bio ? (
              <p className='max-w-3xl text-sm leading-relaxed text-gray-300'>
                {artist.bio}
              </p>
            ) : (
              <p className='max-w-3xl text-sm leading-relaxed text-gray-400'>
                No bio yet.
              </p>
            )}

            <div className='flex flex-wrap gap-2 pt-2'>
              <Link
                to='/artists'
                className='rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-gray-200 transition hover:bg-red-600/20 hover:text-white'
              >
                Back to Artists
              </Link>
              <Link
                to='/events'
                className='rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-gray-200 transition hover:bg-red-600/20 hover:text-white'
              >
                Browse Events
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Artist's Events */}
      <section className='mt-10'>
        <div className='mb-4 flex items-end justify-between'>
          <div>
            <h2 className='text-xl font-semibold text-white'>Shows</h2>
            <p className='text-sm text-gray-400'>
              Events featuring {artist.name}.
            </p>
          </div>
          <span className='text-sm text-gray-400'>
            {artistEvents.length} total
          </span>
        </div>

        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {artistEvents.length > 0 ? (
            artistEvents.map((ev) => (
              <EventCard key={ev.id} event={ev} artistById={artistById} />
            ))
          ) : (
            <div className='rounded-2xl border border-white/10 bg-[#0f0f13] p-6 text-center text-gray-400'>
              No events for this artist yet. Try fetching data on the Events
              page.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
