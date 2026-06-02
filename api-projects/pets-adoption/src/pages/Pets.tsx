import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';

import type { Category } from '../domain/pets';
import { PETS } from '../data/pets';
import PetCard from '../components/pets/PetCard';

const CATEGORY_OPTIONS: Array<{ label: string; value: Category | 'all' }> = [
  { label: 'All categories', value: 'all' },
  { label: 'Dogs', value: 'dog' },
  { label: 'Cats', value: 'cat' },
  { label: 'Rabbits', value: 'rabbit' },
  { label: 'Birds', value: 'bird' },
];

export default function Pets() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQ = searchParams.get('q') ?? '';
  const initialCategory =
    (searchParams.get('category') as Category | 'all') ?? 'all';
  const initialPage = Math.max(
    1,
    parseInt(searchParams.get('page') || '1', 10) || 1
  );

  const [query, setQuery] = useState(initialQ);
  const [category, setCategory] = useState<Category | 'all'>(initialCategory);
  const [page, setPage] = useState<number>(initialPage);

  const filtered = useMemo(() => {
    return PETS.filter((p) =>
      category === 'all' ? true : p.category === category
    ).filter((p) => p.matchesQuery(query));
  }, [category, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / 9));
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);
  useEffect(() => {
    setPage(1);
  }, [query, category]);

  useEffect(() => {
    const next = new URLSearchParams();
    if (query) next.set('q', query);
    if (category !== 'all') next.set('category', category);
    if (page > 1) next.set('page', String(page));
    setSearchParams(next, { replace: true });
  }, [query, category, page, setSearchParams]);

  const start = (page - 1) * 9;
  const current = filtered.slice(start, start + 9);

  return (
    <section className='space-y-6'>
      <header className='flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>Pets</h1>
          <p className='text-slate-600'>
            Browse all pets currently in our demo database.
          </p>
          <p className='mt-1 text-sm text-slate-500'>
            Showing <span className='font-medium'>{filtered.length}</span>{' '}
            {filtered.length === 1 ? 'pet' : 'pets'}
          </p>
        </div>

        <div className='flex w-full flex-col gap-3 sm:w-auto sm:flex-row'>
          <div className='relative sm:w-80'>
            <label htmlFor='pet-search' className='sr-only'>
              Search pets
            </label>
            <Search className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400' />
            <input
              id='pet-search'
              type='text'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Search by name, breed, location…'
              className='w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100'
            />
          </div>

          <div>
            <label htmlFor='pet-category' className='sr-only'>
              Filter by category
            </label>
            <select
              id='pet-category'
              value={category}
              onChange={(e) => setCategory(e.target.value as Category | 'all')}
              className='w-full rounded-xl border border-slate-300 bg-white py-2.5 px-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 sm:w-48'
            >
              {CATEGORY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {filtered.length === 0 ? (
        <div className='rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-600'>
          No pets match your search. Try a different keyword or category.
        </div>
      ) : (
        <>
          <div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
            {current.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>

          <div className='flex items-center justify-center gap-1'>
            <button
              type='button'
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className='rounded-lg px-3 py-2 text-sm font-medium text-slate-700 disabled:opacity-50 hover:bg-slate-100 border border-slate-200 bg-white'
            >
              Prev
            </button>

            {getPageNumbers(page, totalPages).map((p, i) =>
              p === '…' ? (
                <span
                  key={`dots-${i}`}
                  className='px-2 text-slate-500 select-none'
                >
                  …
                </span>
              ) : (
                <button
                  type='button'
                  key={p}
                  onClick={() => setPage(p as number)}
                  className={
                    page === p
                      ? 'rounded-lg px-3 py-2 text-sm font-semibold text-white bg-emerald-600'
                      : 'rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 border border-slate-200 bg-white'
                  }
                >
                  {p}
                </button>
              )
            )}

            <button
              type='button'
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className='rounded-lg px-3 py-2 text-sm font-medium text-slate-700 disabled:opacity-50 hover:bg-slate-100 border border-slate-200 bg-white'
            >
              Next
            </button>
          </div>
        </>
      )}
    </section>
  );
}

function getPageNumbers(
  current: number,
  total: number,
  max = 7
): Array<number | '…'> {
  if (total <= max) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages = new Set<number>();
  pages.add(1);
  pages.add(total);

  pages.add(current);
  if (current - 1 > 1) pages.add(current - 1);
  if (current + 1 < total) pages.add(current + 1);

  let left = current - 2;
  let right = current + 2;
  while (pages.size < Math.min(total, max - 0) && (left > 1 || right < total)) {
    if (left > 1) pages.add(left--);
    if (pages.size >= max) break;
    if (right < total) pages.add(right++);
  }

  const sorted = Array.from(pages).sort((a, b) => a - b);
  const out: Array<number | '…'> = [];
  for (let i = 0; i < sorted.length; i++) {
    out.push(sorted[i]);
    if (i < sorted.length - 1 && sorted[i + 1] !== sorted[i] + 1) {
      out.push('…');
    }
  }
  return out;
}
