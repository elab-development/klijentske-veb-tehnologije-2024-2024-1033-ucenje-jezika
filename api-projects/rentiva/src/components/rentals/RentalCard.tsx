import { Link } from 'react-router-dom';
import type { Rental } from '../../types/rental';

type Props = {
  rental: Rental;
  imageUrl?: string | null;
  placeholder: string;
};

export default function RentalCard({ rental, imageUrl, placeholder }: Props) {
  const img = imageUrl ?? placeholder;

  return (
    <article className='group overflow-hidden rounded-3xl bg-white shadow-sm border border-slate-200'>
      <div className='relative h-40 w-full sm:h-44'>
        <img
          src={img}
          alt={rental.name}
          className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]'
          loading='lazy'
        />
        <div className='absolute right-3 top-3 rounded-lg bg-[color:var(--secondary)] px-3 py-1 text-xs font-semibold text-white shadow'>
          € {rental.price}
        </div>
      </div>

      <div className='p-4'>
        <div className='text-xs text-slate-500 mb-1'>
          {rental.type === 'apartment' && 'Stan'}
          {rental.type === 'house' && 'Kuća'}
          {rental.type === 'office' && 'Poslovni prostor'}
          {' • '}
          {rental.location.city}
        </div>

        <h3 className='text-lg font-semibold text-slate-900'>{rental.name}</h3>
        <p className='mt-1 text-xs text-slate-500'>{rental.location.address}</p>

        <div className='mt-3'>
          <Link
            to={`/rentals/${rental.id}`}
            className='inline-flex rounded-lg bg-[color:var(--secondary)] px-3 py-1.5 text-sm text-white hover:bg-[color:var(--primary)]'
          >
            Detalji
          </Link>
        </div>
      </div>
    </article>
  );
}
