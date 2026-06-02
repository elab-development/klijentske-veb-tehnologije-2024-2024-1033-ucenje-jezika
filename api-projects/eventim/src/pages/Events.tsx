import { useMemo, useState, useEffect } from 'react';

import { useEventim } from '../store/eventim';
import { loadFromTicketmasterAndSet } from '../api/sync';
import EventCard from '../components/EventCard';
import Pagination from '../components/Pagination';

const PAGE_SIZE = 20;

export default function Events() {
  const { artists, filters, setFilters, getEventEntities } = useEventim();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [country, setCountry] = useState('US');
  const [kw, setKw] = useState('music');
  const [page, setPage] = useState(1);

  const artistById = useMemo(
    () => Object.fromEntries(artists.map((a) => [a.id, a])),
    [artists]
  );

  async function onFetch() {
    try {
      setLoading(true);
      setErr(null);
      await loadFromTicketmasterAndSet({
        countryCode: country,
        keyword: kw,
        size: 50,
      });
      setPage(1);
    } catch (e: any) {
      setErr(e?.message ?? 'Failed to fetch data.');
    } finally {
      setLoading(false);
    }
  }

  const entities = getEventEntities();

  const filtered = useMemo(() => {
    const res = entities
      .filter((ev) => {
        if (filters.typeFilter !== 'all' && ev.type !== filters.typeFilter)
          return false;
        if (
          filters.artistFilter &&
          !ev.artistIds.includes(filters.artistFilter)
        )
          return false;
        const hay = `${ev.title} ${ev.venue.city} ${ev.venue.country} ${
          ev.venue.name
        } ${ev.artistIds
          .map((id) => artistById[id]?.name ?? '')
          .join(' ')}`.toLowerCase();
        return hay.includes(filters.search.toLowerCase());
      })
      .sort(
        (a, b) =>
          new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
      );
    return res;
  }, [entities, filters, artistById]);

  useEffect(() => {
    setPage(1);
  }, [filters, filtered.length]);

  const total = filtered.length;
  const start = (page - 1) * PAGE_SIZE;
  const paginated = filtered.slice(start, start + PAGE_SIZE);

  return (
    <div className='py-8'>
      <div className='mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4'>
        <div className='flex gap-2'>
          <input
            value={filters.search}
            onChange={(e) => setFilters({ search: e.target.value })}
            placeholder='Search events, cities, artists...'
            className='w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-gray-200 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/60'
          />
        </div>

        <select
          value={filters.typeFilter}
          onChange={(e) => setFilters({ typeFilter: e.target.value as any })}
          className='rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500/60'
        >
          <option value='all'>All types</option>
          <option value='concert'>Concert</option>
          <option value='festival'>Festival</option>
        </select>

        <select
          value={filters.artistFilter ?? ''}
          onChange={(e) => setFilters({ artistFilter: e.target.value || null })}
          className='rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500/60'
        >
          <option value=''>All artists</option>
          {artists.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>

        <div className='flex items-center gap-2'>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className='w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500/60'
            title='Country (ISO 2)'
          >
            <option value='DE'>Germany</option>
            <option value='US'>USA</option>
            <option value='GB'>UK</option>
            <option value='IT'>Italy</option>
            <option value='FR'>France</option>
          </select>

          <input
            value={kw}
            onChange={(e) => setKw(e.target.value)}
            placeholder='Keyword (e.g., music, concert, artist)'
            className='w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-gray-200 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/60'
          />

          <button
            onClick={onFetch}
            disabled={loading}
            className='whitespace-nowrap rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-md shadow-red-600/30 transition hover:bg-red-500 disabled:opacity-60'
          >
            {loading ? 'Loading...' : 'Load from Ticketmaster'}
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
        this page of <span className='text-gray-200'>{total}</span> events
      </div>

      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {paginated.map((ev) => (
          <EventCard key={ev.id} event={ev} artistById={artistById} />
        ))}
      </div>

      {total === 0 && (
        <div className='mt-10 rounded-xl border border-white/10 bg-black/40 p-6 text-center text-gray-400'>
          No events match your filters. Try changing the country or keyword.
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
