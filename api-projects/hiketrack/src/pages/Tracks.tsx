import { useMemo, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import TrailCard from '../components/TrailCard';
import { TRAILS } from '../data/trails';
import { LOCATIONS } from '../data/locations';
import type { Trail } from '../data/types';
import {
  readFiltersFromStorage,
  writeFiltersToStorage,
  clearFiltersFromStorage,
  type TracksFilters,
} from '../lib/filterStorage';

const PER_PAGE = 12;
const DIFFICULTY = ['easy', 'moderate', 'hard'] as const;
const TYPES = ['loop', 'out-and-back', 'point-to-point'] as const;

const hasAnyFilterInUrl = (sp: URLSearchParams) =>
  sp.has('location') || sp.has('type') || sp.has('difficulty');

export default function Tracks() {
  const [params, setParams] = useSearchParams();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const next = new URLSearchParams(params);
    const fromLS = readFiltersFromStorage();

    if (hasAnyFilterInUrl(params)) {
      if (fromLS) {
        if (
          !next.has('location') &&
          fromLS.location &&
          fromLS.location !== 'all'
        )
          next.set('location', fromLS.location);
        if (!next.has('type') && fromLS.type && fromLS.type !== 'all')
          next.set('type', fromLS.type);
        if (
          !next.has('difficulty') &&
          fromLS.difficulty &&
          fromLS.difficulty !== 'all'
        )
          next.set('difficulty', fromLS.difficulty);
      }
      if (next.toString() !== params.toString()) {
        next.set('page', '1');
        setParams(next, { replace: true });
      }
      setHydrated(true);
      return;
    }

    if (fromLS) {
      if (fromLS.location && fromLS.location !== 'all')
        next.set('location', fromLS.location);
      if (fromLS.type && fromLS.type !== 'all') next.set('type', fromLS.type);
      if (fromLS.difficulty && fromLS.difficulty !== 'all')
        next.set('difficulty', fromLS.difficulty);
      next.set('page', '1');
      setParams(next, { replace: true });
    }
    setHydrated(true);
  }, []);

  const locationParam = params.get('location') || 'all';
  const typeParam = params.get('type') || 'all';
  const difficultyParam = params.get('difficulty') || 'all';

  useEffect(() => {
    if (!hydrated) return;
    const hasActive =
      (locationParam && locationParam !== 'all') ||
      (typeParam && typeParam !== 'all') ||
      (difficultyParam && difficultyParam !== 'all');

    if (hasActive) {
      const toSave: TracksFilters = {
        location: locationParam !== 'all' ? locationParam : null,
        type: typeParam !== 'all' ? typeParam : null,
        difficulty: difficultyParam !== 'all' ? difficultyParam : null,
      };
      writeFiltersToStorage(toSave);
    } else {
      clearFiltersFromStorage();
    }
  }, [hydrated, locationParam, typeParam, difficultyParam]);

  const filteredTrails = useMemo(() => {
    return TRAILS.filter((t: Trail) => {
      const byLocation =
        locationParam === 'all' || t.locationId === locationParam;
      const byType = typeParam === 'all' || t.type === typeParam;
      const byDifficulty =
        difficultyParam === 'all' || t.difficulty === difficultyParam;
      return byLocation && byType && byDifficulty;
    });
  }, [locationParam, typeParam, difficultyParam]);

  const page = Math.max(1, Number(params.get('page') || 1));
  const totalPages = Math.max(1, Math.ceil(filteredTrails.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);

  const pagedTrails = useMemo(() => {
    const start = (safePage - 1) * PER_PAGE;
    return filteredTrails.slice(start, start + PER_PAGE);
  }, [filteredTrails, safePage]);

  useEffect(() => {
    if (page !== safePage) {
      const next = new URLSearchParams(params);
      next.set('page', String(safePage));
      setParams(next, { replace: true });
    }
    const grid = document.getElementById('tracks-grid');
    (grid ?? window).scrollTo({ top: 0, behavior: 'smooth' });
  }, [safePage]);

  const setParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(params);
    if (value && value !== 'all') next.set(key, value);
    else next.delete(key);
    next.set('page', '1');
    setParams(next);
  };

  const goTo = (p: number) => {
    const next = new URLSearchParams(params);
    const target = Math.min(Math.max(1, p), totalPages);
    next.set('page', String(target));
    setParams(next);
  };

  const clearFilters = () => {
    const next = new URLSearchParams(params);
    next.delete('location');
    next.delete('type');
    next.delete('difficulty');
    next.set('page', '1');
    setParams(next);
    clearFiltersFromStorage();
  };

  return (
    <section>
      <header className='mb-6'>
        <h1 className='text-2xl md:text-3xl font-bold text-emerald-900'>
          Tracks
        </h1>
        <p className='mt-2 text-stone-700 text-sm'>
          Filter by location, type and difficulty. ({filteredTrails.length}{' '}
          results)
        </p>
      </header>

      <div className='mb-6 flex flex-col sm:flex-row gap-3 sm:items-end'>
        <div className='flex-1'>
          <label className='block text-sm font-medium text-stone-700 mb-1'>
            Location
          </label>
          <select
            className='w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm'
            value={locationParam}
            onChange={(e) => setParam('location', e.target.value)}
          >
            <option value='all'>All locations</option>
            {LOCATIONS.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name}
              </option>
            ))}
          </select>
        </div>

        <div className='flex-1'>
          <label className='block text-sm font-medium text-stone-700 mb-1'>
            Type
          </label>
          <select
            className='w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm'
            value={typeParam}
            onChange={(e) => setParam('type', e.target.value)}
          >
            <option value='all'>All types</option>
            {TYPES.map((t) => (
              <option key={t} value={t}>
                {t.replaceAll('-', ' ')}
              </option>
            ))}
          </select>
        </div>

        <div className='flex-1'>
          <label className='block text-sm font-medium text-stone-700 mb-1'>
            Difficulty
          </label>
          <select
            className='w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm capitalize'
            value={difficultyParam}
            onChange={(e) => setParam('difficulty', e.target.value)}
          >
            <option value='all'>All difficulties</option>
            {DIFFICULTY.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={clearFilters}
          className='whitespace-nowrap rounded-md border border-stone-300 px-3 py-2 text-sm text-stone-700 hover:bg-stone-100'
          title='Clear filters'
        >
          Clear
        </button>
      </div>

      <div
        id='tracks-grid'
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'
      >
        {pagedTrails.map((trail) => {
          const location = LOCATIONS.find((l) => l.id === trail.locationId);
          return <TrailCard key={trail.id} trail={trail} location={location} />;
        })}
      </div>

      <div className='mt-8 flex items-center justify-center gap-2'>
        <button
          onClick={() => goTo(safePage - 1)}
          disabled={safePage <= 1}
          className='px-3 py-1.5 rounded-md border border-stone-300 text-stone-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-stone-100'
        >
          Previous
        </button>

        <div className='flex items-center gap-1'>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => goTo(p)}
              className={
                'min-w-9 px-3 py-1.5 rounded-md border text-sm ' +
                (p === safePage
                  ? 'bg-emerald-700 border-emerald-700 text-white'
                  : 'border-stone-300 text-stone-700 hover:bg-stone-100')
              }
              aria-current={p === safePage ? 'page' : undefined}
            >
              {p}
            </button>
          ))}
        </div>

        <button
          onClick={() => goTo(safePage + 1)}
          disabled={safePage >= totalPages}
          className='px-3 py-1.5 rounded-md border border-stone-300 text-stone-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-stone-100'
        >
          Next
        </button>
      </div>

      <p className='mt-3 text-center text-sm text-stone-600'>
        Page {safePage} of {totalPages} • Showing {pagedTrails.length} /{' '}
        {filteredTrails.length}
      </p>
    </section>
  );
}
