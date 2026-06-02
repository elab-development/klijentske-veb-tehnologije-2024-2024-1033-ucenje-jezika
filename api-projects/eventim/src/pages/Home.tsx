import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { useEventim } from '../store/eventim';
import { loadFromTicketmasterAndSet } from '../api/sync';
import EventCard, { EventCardSkeleton } from '../components/EventCard';

export default function Home() {
  const { events, artists, lastSyncSource, lastSyncAt } = useEventim();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const hasKey = Boolean(import.meta.env.VITE_TICKETMASTER_KEY);
    if (!hasKey || lastSyncSource) return;
    (async () => {
      try {
        setLoading(true);
        await loadFromTicketmasterAndSet({
          countryCode: 'US',
          keyword: 'music',
          size: 24,
        });
      } catch (e: any) {
        setErr(e?.message ?? 'Failed to fetch Ticketmaster data.');
      } finally {
        setLoading(false);
      }
    })();
  }, [lastSyncSource]);

  const artistById = useMemo(
    () => Object.fromEntries(artists.map((a) => [a.id, a])),
    [artists]
  );

  const featuredEvents = useMemo(() => {
    const now = Date.now();
    const byTime = [...events].sort(
      (a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
    );
    const upcoming = byTime.filter(
      (e) => new Date(e.datetime).getTime() >= now
    );
    return (upcoming.length ? upcoming : byTime).slice(0, 3);
  }, [events]);

  const topArtists = useMemo(() => {
    if (!events.length || !artists.length) return artists.slice(0, 3);
    const counts: Record<string, number> = {};
    for (const ev of events)
      for (const id of ev.artistIds) counts[id] = (counts[id] ?? 0) + 1;
    const sorted = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([id]) => artists.find((a) => a.id === id))
      .filter(Boolean) as typeof artists;
    const fill = [...sorted, ...artists.filter((a) => !sorted.includes(a))];
    return fill.slice(0, 3);
  }, [events, artists]);

  return (
    <div className='pb-12'>
      <section className='relative isolate overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-black to-[#0b0b0d] px-6 py-16 sm:px-10 sm:py-20 lg:px-16'>
        <div className='pointer-events-none absolute inset-0 -z-10'>
          <div className='absolute -top-24 right-[-10%] h-72 w-72 rounded-full bg-red-600/20 blur-3xl' />
          <div className='absolute -bottom-24 left-[-10%] h-72 w-72 rounded-full bg-red-600/10 blur-3xl' />
        </div>

        <div className='mx-auto max-w-3xl text-center'>
          <span className='inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-xs text-gray-300'>
            <span className='inline-block h-1.5 w-1.5 rounded-full bg-red-500' />
            Live music tracker
          </span>
          <h1 className='mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl'>
            Discover concerts & festivals.{' '}
            <span className='text-red-500'>Review</span>,{' '}
            <span className='text-red-500'>reserve</span>, and follow your
            favorite artists.
          </h1>
          <p className='mt-4 text-base text-gray-300 sm:text-lg'>
            Eventim keeps your music calendar in one place — browse events, read
            reviews, and save your seat in a few clicks.
          </p>

          <div className='mt-6 flex flex-col items-center justify-center gap-3 text-xs text-gray-400 sm:flex-row'>
            {loading && (
              <span className='text-red-300'>Loading live data…</span>
            )}
            {err && <span className='text-red-300'>{err}</span>}
            {lastSyncAt && (
              <span className='opacity-80'>
                Synced from {lastSyncSource} ·{' '}
                {new Date(lastSyncAt).toLocaleString()}
              </span>
            )}
          </div>

          <div className='mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row'>
            <Link
              to='/events'
              className='w-full rounded-xl bg-red-600 px-5 py-3 text-center text-sm font-semibold text-white shadow-md shadow-red-600/30 transition hover:bg-red-500 sm:w-auto'
            >
              Browse Events
            </Link>
            <Link
              to='/artists'
              className='w-full rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-center text-sm font-semibold text-gray-200 transition hover:bg-red-600/20 hover:text-white sm:w-auto'
            >
              Explore Artists
            </Link>
          </div>
        </div>
      </section>

      <section className='mt-12'>
        <div className='mb-6 flex items-end justify-between'>
          <div>
            <h2 className='text-2xl font-semibold text-white'>
              Featured Events
            </h2>
            <p className='text-sm text-gray-400'>
              Handpicked picks happening soon around the region.
            </p>
          </div>
          <Link
            to='/events'
            className='hidden rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-gray-200 transition hover:bg-red-600/20 hover:text-white sm:inline-block'
          >
            View all
          </Link>
        </div>

        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {loading && featuredEvents.length === 0
            ? [0, 1, 2].map((i) => <EventCardSkeleton key={i} />)
            : featuredEvents.map((ev) => (
                <EventCard key={ev.id} event={ev} artistById={artistById} />
              ))}
        </div>

        <div className='mt-6 text-center sm:hidden'>
          <Link
            to='/events'
            className='inline-block rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-gray-200 transition hover:bg-red-600/20 hover:text-white'
          >
            View all
          </Link>
        </div>
      </section>

      <section className='mt-12'>
        <div className='mb-6 flex items-end justify-between'>
          <div>
            <h2 className='text-2xl font-semibold text-white'>Top Artists</h2>
            <p className='text-sm text-gray-400'>
              Trending performers you might like.
            </p>
          </div>
          <Link
            to='/artists'
            className='hidden rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-gray-200 transition hover:bg-red-600/20 hover:text-white sm:inline-block'
          >
            View all
          </Link>
        </div>

        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {topArtists.map((a) => (
            <Link
              key={a.id}
              to={`/artists/${a.id}`}
              className='group overflow-hidden rounded-2xl border border-white/10 bg-[#0f0f13] transition hover:-translate-y-0.5 hover:border-red-600/50'
            >
              <div className='aspect-[4/3] w-full overflow-hidden'>
                <img
                  src={a.imageUrl || '/avatar-placeholder.jpg'}
                  alt={a.name}
                  className='h-full w-full object-cover transition duration-300 group-hover:scale-105'
                  loading='lazy'
                />
              </div>
              <div className='space-y-1 p-4'>
                <h3 className='line-clamp-1 text-base font-semibold text-white'>
                  {a.name}
                </h3>
                <p className='line-clamp-1 text-sm text-gray-400'>
                  {a.genre?.join(', ') ?? 'Artist'}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className='mt-6 text-center sm:hidden'>
          <Link
            to='/artists'
            className='inline-block rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-gray-200 transition hover:bg-red-600/20 hover:text-white'
          >
            View all
          </Link>
        </div>
      </section>
    </div>
  );
}
