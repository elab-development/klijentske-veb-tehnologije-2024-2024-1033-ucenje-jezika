import { Link } from 'react-router-dom';
import type { TraditionalArt } from '../models/aic';
import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { isFavoriteId, toggleFavoriteId } from '../utils/favorites';

export default function TraditionalCard({ art }: { art: TraditionalArt }) {
  const idStr = String(art.id);
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(isFavoriteId(idStr));
  }, [idStr]);

  const onHeartClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const nowActive = toggleFavoriteId(idStr);
    setActive(nowActive);
  };

  return (
    <Link
      to={`/traditional/${art.id}`}
      className='group relative overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-black/5 transition hover:shadow-xl'
    >
      <button
        onClick={onHeartClick}
        aria-label={active ? 'Remove from favorites' : 'Add to favorites'}
        aria-pressed={active}
        className='absolute right-2 top-2 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/80 backdrop-blur-md shadow-md ring-1 ring-black/5 transition hover:bg-white'
      >
        <Heart
          className={`h-5 w-5 transition ${
            active ? 'fill-rose-500 text-rose-500' : 'text-slate-700'
          }`}
        />
      </button>

      <div className='aspect-[4/3] bg-slate-100'>
        {art.imageSmall ? (
          <img
            src={art.imageSmall}
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
          {art.artist} • {art.category}
        </p>
        {art.dateText && (
          <p className='mt-1 text-xs text-slate-500'>{art.dateText}</p>
        )}
      </div>
    </Link>
  );
}
