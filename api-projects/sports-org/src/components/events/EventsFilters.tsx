import { Search, RotateCcw } from 'lucide-react';

type SortKey = 'date' | 'title' | 'sport' | 'city';
type SortDir = 'asc' | 'desc';

type Props = {
  q: string;
  setQ: (v: string) => void;

  sport: string;
  setSport: (v: string) => void;
  sports: string[];

  city: string;
  setCity: (v: string) => void;
  country: string;
  setCountry: (v: string) => void;

  dateFrom: string;
  setDateFrom: (v: string) => void;
  dateTo: string;
  setDateTo: (v: string) => void;

  sortKey: SortKey;
  setSortKey: (v: SortKey) => void;
  sortDir: SortDir;
  setSortDir: (v: SortDir) => void;

  onReset: () => void;
};

export default function EventsFilters({
  q,
  setQ,
  sport,
  setSport,
  sports,
  city,
  setCity,
  country,
  setCountry,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  sortKey,
  setSortKey,
  sortDir,
  setSortDir,
  onReset,
}: Props) {
  return (
    <div className='rounded-2xl bg-white p-4 shadow-lg'>
      <div className='grid grid-cols-1 gap-3 md:grid-cols-3'>
        <div className='md:col-span-2'>
          <label className='block text-sm font-medium text-gray-700'>
            Search
          </label>
          <div className='mt-1 flex items-center gap-2 rounded-lg border border-gray-300 px-2'>
            <Search className='h-4 w-4 text-gray-500' />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder='Title, description, sport, city, country…'
              className='w-full py-2 outline-none'
            />
          </div>
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Sport
          </label>
          <select
            value={sport}
            onChange={(e) => setSport(e.target.value)}
            className='mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-600'
          >
            <option value='All'>All</option>
            {sports.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className='mt-4 grid grid-cols-1 gap-3 md:grid-cols-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            City
          </label>
          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder='Any'
            className='mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-600'
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Country
          </label>
          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder='Any'
            className='mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-600'
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700'>
            From
          </label>
          <input
            type='date'
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className='mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-600'
          />
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700'>To</label>
          <input
            type='date'
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className='mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-600'
          />
        </div>
      </div>

      <div className='mt-4 grid grid-cols-1 gap-3 md:grid-cols-3'>
        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Sort by
          </label>
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            className='mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-600'
          >
            <option value='date'>Date</option>
            <option value='title'>Event name</option>
            <option value='sport'>Sport</option>
            <option value='city'>City</option>
          </select>
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700'>
            Direction
          </label>
          <select
            value={sortDir}
            onChange={(e) => setSortDir(e.target.value as SortDir)}
            className='mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-600'
          >
            <option value='asc'>Ascending</option>
            <option value='desc'>Descending</option>
          </select>
        </div>

        <div className='flex items-end'>
          <button
            type='button'
            onClick={onReset}
            className='inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-700'
            title='Reset all filters'
          >
            <RotateCcw className='h-4 w-4' />
            Reset filters
          </button>
        </div>
      </div>
    </div>
  );
}
