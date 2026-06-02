import { useEffect, useMemo, useState } from 'react';

import EventCard from '../components/events/EventCard';
import EventsFilters from '../components/events/EventsFilters';
import Pagination from '../components/events/Pagination';
import { useEvents } from '../context/EventsContext';
import { sports } from '../data/sports';

type SortKey = 'date' | 'title' | 'sport' | 'city';
type SortDir = 'asc' | 'desc';

export default function Events() {
  const { events } = useEvents();

  // filters
  const [q, setQ] = useState('');
  const [sport, setSport] = useState('All');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // sorting
  const [sortKey, setSortKey] = useState<SortKey>('date');
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  // pagination
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [q, sport, city, country, dateFrom, dateTo, sortKey, sortDir]);

  // filter + sort
  const filteredSorted = useMemo(() => {
    const query = q.trim().toLowerCase();
    const withinRange = (d: string) => {
      if (dateFrom && d < dateFrom) return false;
      if (dateTo && d > dateTo) return false;
      return true;
    };

    const filtered = events.filter((e) => {
      if (sport !== 'All' && e.sport !== sport) return false;
      if (!withinRange(e.date)) return false;
      if (city && e.location.city.toLowerCase() !== city.trim().toLowerCase())
        return false;
      if (
        country &&
        e.location.country.toLowerCase() !== country.trim().toLowerCase()
      )
        return false;

      if (query) {
        const hay =
          `${e.title} ${e.description} ${e.sport} ${e.location.city} ${e.location.country}`.toLowerCase();
        if (!hay.includes(query)) return false;
      }
      return true;
    });

    const cmp = (a: (typeof events)[number], b: (typeof events)[number]) => {
      let res = 0;
      if (sortKey === 'date') {
        const ad = new Date(`${a.date}T${a.time}`).getTime();
        const bd = new Date(`${b.date}T${b.time}`).getTime();
        res = ad - bd;
      } else if (sortKey === 'title') {
        res = a.title.localeCompare(b.title);
      } else if (sortKey === 'sport') {
        res = a.sport.localeCompare(b.sport);
      } else if (sortKey === 'city') {
        res = a.location.city.localeCompare(b.location.city);
      }
      return sortDir === 'asc' ? res : -res;
    };

    return filtered.sort(cmp);
  }, [events, q, sport, city, country, dateFrom, dateTo, sortKey, sortDir]);

  // pagination
  const total = filteredSorted.length;
  const totalPages = Math.max(1, Math.ceil(total / 9));
  const start = (page - 1) * 9;
  const current = filteredSorted.slice(start, start + 9);

  const resetAll = () => {
    setQ('');
    setSport('All');
    setCity('');
    setCountry('');
    setDateFrom('');
    setDateTo('');
    setSortKey('date');
    setSortDir('asc');
  };

  return (
    <section className='mx-auto max-w-6xl space-y-6'>
      <div className='flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between'>
        <h1 className='text-2xl font-semibold'>Sports Events</h1>
        <div className='text-sm text-gray-600'>
          Showing <span className='font-medium'>{current.length}</span> of{' '}
          <span className='font-medium'>{total}</span>
        </div>
      </div>

      <EventsFilters
        q={q}
        setQ={setQ}
        sport={sport}
        setSport={setSport}
        sports={sports}
        city={city}
        setCity={setCity}
        country={country}
        setCountry={setCountry}
        dateFrom={dateFrom}
        setDateFrom={setDateFrom}
        dateTo={dateTo}
        setDateTo={setDateTo}
        sortKey={sortKey}
        setSortKey={setSortKey}
        sortDir={sortDir}
        setSortDir={setSortDir}
        onReset={resetAll}
      />

      {current.length ? (
        <ul className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {current.map((e) => (
            <li key={e.id}>
              <EventCard event={e} />
            </li>
          ))}
        </ul>
      ) : (
        <div className='rounded-2xl border border-gray-300 bg-white p-8 text-center text-gray-600'>
          No events match your filters.{' '}
          <a
            href='/new'
            className='text-indigo-700 underline hover:no-underline'
          >
            Create one
          </a>
          .
        </div>
      )}

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </section>
  );
}
