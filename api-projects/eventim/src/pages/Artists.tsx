import { useMemo, useState, useEffect } from 'react';

import { useEventim } from '../store/eventim';
import { loadFromTicketmasterAndSet } from '../api/sync';
import ArtistCard, { ArtistCardSkeleton } from '../components/ArtistCard';
import Pagination from '../components/Pagination';

const PAGE_SIZE = 20;

export default function Artists() {
  const { artists, events } = useEventim();
  const [q, setQ] = useState('');
  const [genre, setGenre] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const eventCountByArtist = useMemo(() => {
    const m: Record<string, number> = {};
    for (const ev of events)
      for (const id of ev.artistIds) m[id] = (m[id] ?? 0) + 1;
    return m;
  }, [events]);

  const genreOptions = useMemo(() => {
    const set = new Set<string>();
    for (const a of artists) (a.genre ?? []).forEach((g) => g && set.add(g));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [artists]);

  const countryOptions = useMemo(() => {
    const set = new Set<string>();
    for (const a of artists) if (a.country) set.add(a.country);
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [artists]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return artists
      .filter((a) => {
        if (genre && !(a.genre ?? []).some((g) => g === genre)) return false;
        if (country && a.country !== country) return false;
        if (!query) return true;
        const hay = `${a.name} ${(a.genre ?? []).join(' ')} ${
          a.country ?? ''
        }`.toLowerCase();
        return hay.includes(query);
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [artists, q, genre, country]);

  useEffect(() => {
    setPage(1);
  }, [q, genre, country, filtered.length]);

  const total = filtered.length;
  const start = (page - 1) * PAGE_SIZE;
  const paginated = filtered.slice(start, start + PAGE_SIZE);

  async function onRefresh() {
    try {
      setLoading(true);
      setErr(null);
      await loadFromTicketmasterAndSet({
        countryCode: 'US',
        keyword: 'music',
        size: 50,
      });
      setPage(1);
    } catch (e: any) {
      setErr(e?.message ?? 'Failed to fetch data.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='py-8'>
      <div className='mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4'>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder='Search artists, genres, countries…'
          className='w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-gray-200 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/60'
        />

        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className='rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500/60'
        >
          <option value=''>All genres</option>
          {genreOptions.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className='rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500/60'
        >
          <option value=''>All countries</option>
          {countryOptions.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <div className='flex items-center justify-end'>
          <button
            onClick={onRefresh}
            disabled={loading}
            className='rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-md shadow-red-600/30 transition hover:bg-red-500 disabled:opacity-60'
          >
            {loading ? 'Loading…' : 'Refresh from Ticketmaster'}
          </button>
        </div>
      </div>

      {err && (
        <div className='mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200'>
          {err}
        </div>
      )}

      <div className='mb-4 text-sm text-gray-400'>
        Showing <span className='text-gray-200'>{paginated.length}</span> on
        this page of <span className='text-gray-200'>{total}</span> artists
      </div>

      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {loading && artists.length === 0
          ? [0, 1, 2, 3, 4, 5, 6, 7].map((i) => <ArtistCardSkeleton key={i} />)
          : paginated.map((a) => (
              <ArtistCard
                key={a.id}
                artist={a}
                eventCount={eventCountByArtist[a.id] ?? 0}
              />
            ))}
      </div>

      {total === 0 && (
        <div className='mt-10 rounded-xl border border-white/10 bg-black/40 p-6 text-center text-gray-400'>
          No artists match your filters. Try clearing genre or country filters.
        </div>
      )}

      <Pagination
        page={page}
        pageSize={PAGE_SIZE}
        total={total}
        onPageChange={setPage}
      />
    </div>
  );
}
