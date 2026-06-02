import { useEffect, useMemo, useState } from 'react';
import { fetchAicBatch } from '../services/aic';
import type { TraditionalArt } from '../models/aic';
import TraditionalCard from '../components/TraditionalCard';
import LoadingSpinner from '../components/LoadingSpinner';

export default function TraditionalList() {
  const [items, setItems] = useState<TraditionalArt[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const [author, setAuthor] = useState<string>('all');

  const [page, setPage] = useState<number>(1);
  const pageSize = 12;

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const data = await fetchAicBatch({ limit: 100, pageSize: 100 });
        const withImage = data.filter(
          (art) => art.imageSmall || art.imageLarge
        );
        if (mounted) setItems(withImage);
      } catch (e: any) {
        if (mounted) setErr(e?.message ?? 'Failed to load');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const authors = useMemo(() => {
    const set = new Set<string>();
    items.forEach((it) => it.artist && set.add(it.artist));
    return ['all', ...Array.from(set).sort()];
  }, [items]);

  const filtered = useMemo(() => {
    if (author === 'all') return items;
    const needle = author.toLowerCase();
    return items.filter((it) => (it.artist || '').toLowerCase() === needle);
  }, [items, author]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));

  useEffect(() => {
    setPage(1);
  }, [author]);

  if (loading) return <LoadingSpinner label='Loading art…' />;
  if (err) return <p className='text-red-600'>{err}</p>;

  return (
    <section className='container mx-auto max-w-6xl px-4 mb-4'>
      <div className='mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
        <h1 className='text-2xl font-semibold'>Traditional Art</h1>

        <div className='flex items-center gap-2'>
          <label htmlFor='author' className='text-sm text-slate-600'>
            Author
          </label>
          <select
            id='author'
            value={author}
            onChange={(e) => {
              setAuthor(e.target.value);
              setPage(1);
            }}
            className='rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600/30'
          >
            {authors.map((a) => (
              <option key={a} value={a}>
                {a === 'all' ? 'All' : a}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {filtered.slice((page - 1) * pageSize, page * pageSize).map((art) => (
          <TraditionalCard key={art.id} art={art} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className='mt-6 text-center text-slate-500'>
          No artworks by “{author}”. Try another author.
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
