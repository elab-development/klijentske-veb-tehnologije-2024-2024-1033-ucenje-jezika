import { useEffect, useMemo, useState } from 'react';
import { fetchArtBlocksBatch } from '../services/artblocks';
import type { DigitalArt } from '../models/artblocks';
import DigitalCard from '../components/DigitalCard';
import LoadingSpinner from '../components/LoadingSpinner';

const TOKEN_IDS = Array.from({ length: 100 }, (_, i) => i);

export default function DigitalList() {
  const [items, setItems] = useState<DigitalArt[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const [collection, setCollection] = useState<string>('all');

  const [page, setPage] = useState<number>(1);
  const pageSize = 12;

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const data = await fetchArtBlocksBatch(TOKEN_IDS);
        if (mounted) setItems(data);
      } catch (e: any) {
        if (mounted) setErr(e?.message ?? 'Failed to load NFTs');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const collections = useMemo(() => {
    const set = new Set<string>();
    items.forEach((it) => it.collectionName && set.add(it.collectionName));
    return ['all', ...Array.from(set).sort()];
  }, [items]);

  const filtered = useMemo(() => {
    if (collection === 'all') return items;
    const needle = collection.toLowerCase();
    return items.filter(
      (it) => (it.collectionName || '').toLowerCase() === needle
    );
  }, [items, collection]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  useEffect(() => {
    setPage(1);
  }, [collection]);

  if (loading) return <LoadingSpinner label='Loading NFTs…' />;
  if (err) return <p className='text-red-600'>{err}</p>;

  return (
    <section className='container mx-auto max-w-6xl px-4 mb-4'>
      <div className='mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
        <h1 className='text-2xl font-semibold'>Digital Art</h1>

        <div className='flex items-center gap-2'>
          <label htmlFor='collection' className='text-sm text-slate-600'>
            Collection
          </label>
          <select
            id='collection'
            value={collection}
            onChange={(e) => {
              setCollection(e.target.value);
              setPage(1);
            }}
            className='rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600/30'
          >
            {collections.map((c) => (
              <option key={c} value={c}>
                {c === 'all' ? 'All' : c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {filtered.slice((page - 1) * pageSize, page * pageSize).map((art) => (
          <DigitalCard key={art.id} art={art} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className='mt-6 text-center text-slate-500'>
          No NFTs in “{collection}”. Try another collection.
        </p>
      )}

      {filtered.length > 0 && (
        <div className='mt-6 flex justify-center gap-2'>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`rounded-xl px-3 py-2 text-sm shadow-sm ring-1 ring-slate-200 ${
                n === page
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white hover:bg-slate-50'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
