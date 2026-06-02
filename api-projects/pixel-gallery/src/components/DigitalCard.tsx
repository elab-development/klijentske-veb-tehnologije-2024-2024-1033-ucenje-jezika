import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { DigitalArt } from '../models/artblocks';
import { Heart } from 'lucide-react';
import { isFavoriteId, toggleFavoriteId } from '../utils/favorites';

export default function DigitalCard({ art }: { art: DigitalArt }) {
  const idStr = String(art.id);
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(isFavoriteId(idStr));
  }, [idStr]);

  const onHeartClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const now = toggleFavoriteId(idStr);
    setActive(now);
  };

  return (
    <Link
      to={`/digital/${encodeURIComponent(art.id)}`}
      className='group relative overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-black/5 transition hover:shadow-xl'
    >
      <button
        onClick={onHeartClick}
        aria-label={active ? 'Remove from favorites' : 'Add to favorites'}
        aria-pressed={active}
        className='
          absolute right-2 top-2 z-10 inline-flex h-9 w-9 items-center justify-center 
          rounded-full bg-black/50 hover:bg-black/70 transition
        '
      >
        <Heart
          className={`h-5 w-5 ${
            active ? 'text-rose-400 fill-rose-400' : 'text-white'
          }`}
        />
      </button>

      <div className='aspect-[4/3] bg-slate-100'>
        {art.imageUrl ? (
          <img
            src={art.imageUrl}
            alt={art.title}
            className='h-full w-full object-cover transition group-hover:scale-[1.02]'
            loading='lazy'
          />
        ) : (
          <div className='flex h-full items-center justify-center text-slate-400'>
            No image
          </div>
        )}
      </div>
      <div className='p-4'>
        <h3 className='line-clamp-1 font-semibold text-slate-900'>
          {art.title}
        </h3>
        <p className='line-clamp-1 text-sm text-slate-600'>
          {art.collectionName}
          {art.artist ? ` • ${art.artist}` : ''}
        </p>
      </div>
    </Link>
  );
}
