import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import bgImage from '../assets/rentals-bg.png';
import placeholderImg from '../assets/rental-placeholder.png';
import { rentals } from '../data/rentals';
import { getImageForRental } from '../lib/imageProvider';
import AppLayout from '../components/AppLayout';
import RentalCard from '../components/rentals/RentalCard';

type ImagesMap = Record<string, string | null>;
const PAGE_SIZE = 9;

export default function Rentals() {
  const [images, setImages] = useState<ImagesMap>({});
  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get('q')?.toLowerCase() ?? '';
  const type = searchParams.get('type') ?? '';
  const priceMax = searchParams.get('priceMax');
  const location = searchParams.get('location') ?? '';
  const sort = searchParams.get('sort') ?? '';

  const filtered = useMemo(() => {
    return rentals.filter((r) => {
      if (
        q &&
        !(
          r.name.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.location.city.toLowerCase().includes(q) ||
          r.location.address.toLowerCase().includes(q)
        )
      )
        return false;

      if (type && r.type !== type) return false;
      if (priceMax && r.price > Number(priceMax)) return false;
      if (location && r.location.city !== location) return false;
      return true;
    });
  }, [q, type, priceMax, location]);

  const sorted = useMemo(() => {
    if (sort === 'price_asc')
      return [...filtered].sort((a, b) => a.price - b.price);
    if (sort === 'price_desc')
      return [...filtered].sort((a, b) => b.price - a.price);
    return filtered;
  }, [filtered, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const pageParam = parseInt(searchParams.get('page') || '1', 10);
  const page = Math.min(Math.max(1, pageParam), totalPages);
  const start = (page - 1) * PAGE_SIZE;

  const pageItems = useMemo(
    () => sorted.slice(start, start + PAGE_SIZE),
    [sorted, start]
  );

  function setParam(key: string, value?: string) {
    const next = new URLSearchParams(searchParams);
    if (value && value.length > 0) next.set(key, value);
    else next.delete(key);
    setSearchParams(next, { replace: true });
  }

  function goToPage(p: number) {
    const n = Math.min(Math.max(1, p), totalPages);
    setParam('page', String(n));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function onChangeSort(value: string) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set('sort', value);
    else next.delete('sort');
    next.set('page', '1');
    setSearchParams(next, { replace: true });
  }

  function onResetFilters() {
    const next = new URLSearchParams(searchParams);
    ['q', 'type', 'priceMax', 'location', 'sort', 'page'].forEach((k) =>
      next.delete(k)
    );
    setSearchParams(next, { replace: true });
  }

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const missing = pageItems.filter((r) => images[r.id] == null);
      if (missing.length === 0) return;

      const results = await Promise.all(
        missing.map(async (r) => {
          const url = await getImageForRental(r.name, r.location.city);
          return [r.id, url] as const;
        })
      );

      if (cancelled) return;
      setImages((prev) => {
        const next = { ...prev };
        for (const [id, url] of results) next[id] = url ?? null;
        return next;
      });
    })();

    return () => {
      cancelled = true;
    };
  }, [pageItems, images]);

  return (
    <AppLayout bgImage={bgImage} overlay={0}>
      <div className='mx-auto w-[95%] max-w-6xl'>
        <header className='mb-4 flex flex-col gap-3 sm:mb-6 sm:flex-row sm:items-end sm:justify-between'>
          <div>
            <h1 className='text-2xl sm:text-3xl font-semibold text-slate-900'>
              Nekretnine
            </h1>
            <p className='text-sm text-slate-600 mt-1'>
              Pregled svih dostupnih nekretnina.
            </p>
          </div>

          <div className='flex items-center gap-3'>
            <select
              value={sort}
              onChange={(e) => onChangeSort(e.target.value)}
              className='rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[color:var(--highlight)]'
              title='Sortiraj po ceni'
            >
              <option value=''>Bez sortiranja</option>
              <option value='price_asc'>Cena: rastuće</option>
              <option value='price_desc'>Cena: opadajuće</option>
            </select>

            <button
              onClick={onResetFilters}
              className='rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50'
            >
              Resetuj filtere
            </button>
          </div>
        </header>

        {sorted.length === 0 ? (
          <p className='text-sm text-slate-600'>
            Nema rezultata za zadate filtere.
          </p>
        ) : (
          <>
            <section className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'>
              {pageItems.map((r) => (
                <RentalCard
                  key={r.id}
                  rental={r}
                  imageUrl={images[r.id] ?? null}
                  placeholder={placeholderImg}
                />
              ))}
            </section>

            <div className='mt-6 flex flex-wrap items-center justify-center gap-2'>
              <button
                onClick={() => goToPage(page - 1)}
                disabled={page <= 1}
                className='cursor-pointer rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm disabled:opacity-50'
              >
                ← Prethodna
              </button>

              {Array.from({ length: totalPages }).map((_, i) => {
                const p = i + 1;
                const active = p === page;
                return (
                  <button
                    key={p}
                    onClick={() => goToPage(p)}
                    className={`cursor-pointer h-9 w-9 rounded-lg border px-0 text-sm ${
                      active
                        ? 'border-[color:var(--secondary)] bg-[color:var(--secondary)] text-white'
                        : 'border-slate-300 bg-white hover:bg-slate-50'
                    }`}
                  >
                    {p}
                  </button>
                );
              })}

              <button
                onClick={() => goToPage(page + 1)}
                disabled={page >= totalPages}
                className='cursor-pointer rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm disabled:opacity-50'
              >
                Sledeća →
              </button>
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
}
