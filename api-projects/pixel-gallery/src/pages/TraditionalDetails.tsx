import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { TraditionalArt } from '../models/aic';
import { AicArtItem } from '../models/aic';
import { ExternalLink } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

export default function TraditionalDetails() {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<TraditionalArt | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      if (!id) return;
      setLoading(true);
      setErr(null);
      try {
        const fields = [
          'id',
          'title',
          'artist_title',
          'artist_display',
          'date_display',
          'department_title',
          'artwork_type_title',
          'image_id',
          'api_link',
        ].join(',');

        const res = await fetch(
          `https://api.artic.edu/api/v1/artworks/${id}?fields=${fields}`
        );
        if (!res.ok) throw new Error(`Failed ${res.status}`);
        const json = await res.json();
        const iiif = json.config?.iiif_url || 'https://www.artic.edu/iiif/2';

        const mapped = new AicArtItem(json.data, iiif);
        if (mounted) setItem(mapped);
      } catch (e: any) {
        if (mounted) setErr(e?.message ?? 'Failed to load item');
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
        <p className='text-slate-600'>Artwork not found.</p>
      )}

      {item && (
        <div className='rounded-2xl bg-white p-5 shadow-lg ring-1 ring-black/5'>
          <header className='mb-4'>
            <h1 className='text-3xl font-bold text-slate-900'>{item.title}</h1>
            <p className='mt-1 text-slate-600'>
              {item.artist}
              {item.category ? ` • ${item.category}` : ''}
              {item.dateText ? ` • ${item.dateText}` : ''}
            </p>
          </header>

          {item.imageLarge && (
            <div className='mb-5 overflow-hidden rounded-2xl bg-slate-100 shadow-md'>
              <img
                src={item.imageLarge}
                alt={item.title}
                className='w-full object-cover'
              />
            </div>
          )}

          <dl className='grid gap-4 sm:grid-cols-2'>
            <div>
              <dt className='text-xs font-medium uppercase tracking-wide text-slate-500'>
                Artist
              </dt>
              <dd className='text-slate-900'>{item.artist || 'Unknown'}</dd>
            </div>

            <div>
              <dt className='text-xs font-medium uppercase tracking-wide text-slate-500'>
                Category
              </dt>
              <dd className='text-slate-900'>{item.category || '—'}</dd>
            </div>

            <div>
              <dt className='text-xs font-medium uppercase tracking-wide text-slate-500'>
                Department
              </dt>
              <dd className='text-slate-900'>{item.department || '—'}</dd>
            </div>

            <div>
              <dt className='text-xs font-medium uppercase tracking-wide text-slate-500'>
                Date
              </dt>
              <dd className='text-slate-900'>{item.dateText || '—'}</dd>
            </div>
          </dl>

          <div className='mt-6 flex flex-wrap gap-3'>
            {item.imageLarge && (
              <a
                href={item.imageLarge}
                target='_blank'
                rel='noreferrer'
                className='inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800'
              >
                Open image
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
                View on Art Institute of Chicago
                <ExternalLink className='h-4 w-4' />
              </a>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
