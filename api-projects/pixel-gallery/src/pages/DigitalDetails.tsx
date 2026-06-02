import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { DigitalArt } from '../models/artblocks';
import { DigitalArtItem, type ArtBlocksRaw } from '../models/artblocks';
import { ExternalLink } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

export default function DigitalDetails() {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<DigitalArt | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!id) return;
      setLoading(true);
      setErr(null);
      try {
        const res = await fetch(
          `https://token.artblocks.io/${encodeURIComponent(id)}`
        );
        if (!res.ok) throw new Error(`Failed ${res.status}`);
        const raw = (await res.json()) as ArtBlocksRaw;
        if (!raw.tokenID) raw.tokenID = id;

        const mapped = new DigitalArtItem(raw);
        if (mapped.imageUrl || mapped.htmlUrl) {
          if (mounted) setItem(mapped);
        } else {
          if (mounted) setErr('No media available for this token.');
        }
      } catch (e: any) {
        if (mounted) setErr(e?.message ?? 'Failed to load token');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  return (
    <section className='container mx-auto max-w-4xl px-4 py-6'>
      {loading && <LoadingSpinner label='Loading details…' />}
      {err && <p className='text-red-600'>{err}</p>}
      {!loading && !err && !item && (
        <p className='text-slate-600'>NFT not found.</p>
      )}

      {item && (
        <div className='rounded-2xl bg-white p-5 shadow-lg ring-1 ring-black/5'>
          <header className='mb-4'>
            <h1 className='text-3xl font-bold text-slate-900'>{item.title}</h1>
            <p className='mt-1 text-slate-600'>{item.collectionName}</p>
          </header>

          {item.imageUrl ? (
            <div className='mb-5 overflow-hidden rounded-2xl bg-slate-100 shadow-md'>
              <img
                src={item.imageUrl}
                alt={item.title}
                className='w-full object-cover'
                loading='lazy'
              />
            </div>
          ) : item.htmlUrl ? (
            <div className='mb-5 overflow-hidden rounded-2xl bg-slate-100 shadow-md'>
              <iframe
                src={item.htmlUrl}
                title={item.title}
                className='h-[60vh] w-full'
              />
            </div>
          ) : null}

          <dl className='grid gap-4 sm:grid-cols-2'>
            <div>
              <dt className='text-xs font-medium uppercase tracking-wide text-slate-500'>
                Collection
              </dt>
              <dd className='text-slate-900'>{item.collectionName || '—'}</dd>
            </div>
            <div>
              <dt className='text-xs font-medium uppercase tracking-wide text-slate-500'>
                Token ID
              </dt>
              <dd className='text-slate-900'>{id}</dd>
            </div>
          </dl>

          <div className='mt-6 flex flex-wrap gap-3'>
            {item.imageUrl && (
              <a
                href={item.imageUrl}
                target='_blank'
                rel='noreferrer'
                className='inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800'
              >
                Open image
                <ExternalLink className='h-4 w-4' />
              </a>
            )}
            {item.htmlUrl && (
              <a
                href={item.htmlUrl}
                target='_blank'
                rel='noreferrer'
                className='inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-sm ring-1 ring-black/5 hover:bg-slate-50'
              >
                Live render
                <ExternalLink className='h-4 w-4' />
              </a>
            )}
            {item.sourceUrl && (
              <a
                href={item.sourceUrl}
                target='_blank'
                rel='noreferrer'
                className='inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow-sm ring-1 ring-black/5 hover:bg-slate-50'
              >
                View on Art Blocks
                <ExternalLink className='h-4 w-4' />
              </a>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
