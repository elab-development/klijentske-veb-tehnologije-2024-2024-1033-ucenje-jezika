import { useEffect, useState } from 'react';

import { fetchCatCafesByCity } from '../api/google/PlacesServiceAdapter';
import type { ICatCafe } from '../types/cafe';
import CafeCard from '../components/cafes/CafeCard';
import CitySearch from '../components/cafes/CitySearch';
import SortMenu from '../components/cafes/SortMenu';

export default function Cafes() {
  const [city, setCity] = useState('Belgrade');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cafes, setCafes] = useState<ICatCafe[]>([]);
  const [nextPage, setNextPage] = useState<
    ((cb: (cafes: ICatCafe[]) => void) => void) | undefined
  >();
  const [sortBy, setSortBy] = useState<'default' | 'rating' | 'name'>(
    'default'
  );

  async function fetchCats() {
    setLoading(true);
    try {
      const { cafes: newCafes, nextPage } = await fetchCatCafesByCity(city);
      setCafes(newCafes);
      setNextPage(() => nextPage);
    } catch (e: any) {
      setError(e?.message ?? 'Failed to fetch cafés.');
    } finally {
      setLoading(false);
    }
  }

  function loadMore() {
    if (nextPage) {
      setLoading(true);
      nextPage((moreCafes) => {
        setCafes((prev) => [...prev, ...moreCafes]);
        setLoading(false);
      });
    }
  }

  const sortedCafes = [...cafes].sort((a, b) => {
    if (sortBy === 'rating') return (b.rating ?? 0) - (a.rating ?? 0);
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  useEffect(() => {
    fetchCats();
  }, []);

  return (
    <section className='min-h-[calc(100vh-4rem)] bg-pink-50'>
      <div className='container mx-auto px-6 py-8'>
        <div className='mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <h1 className='text-3xl font-bold text-gray-800'>Cat Cafés</h1>
          <div className='flex gap-3'>
            <CitySearch city={city} setCity={setCity} fetchCats={fetchCats} />
            <SortMenu value={sortBy} onChange={setSortBy} />
          </div>
        </div>

        {loading && <div className='text-gray-600'>Loading cafés…</div>}
        {error && (
          <div className='rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-red-700'>
            {error}
          </div>
        )}

        {!loading && !error && cafes.length === 0 && (
          <div className='text-gray-600'>No results yet.</div>
        )}

        <ul className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {sortedCafes.map((cafe) => (
            <CafeCard key={cafe.id} cafe={cafe} />
          ))}
        </ul>

        {nextPage && !loading && (
          <div className='mt-6 flex justify-center'>
            <button
              onClick={loadMore}
              className='rounded-full bg-pink-600 px-6 py-2 text-white font-semibold shadow hover:bg-pink-700'
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
