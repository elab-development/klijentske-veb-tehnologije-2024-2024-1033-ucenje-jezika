import { Link } from 'react-router-dom';
import {
  MapPin,
  PawPrint,
  Info,
  Calendar,
  Venus,
  Mars,
  Ruler,
} from 'lucide-react';

import type { IPet } from '../../domain/pets';
import { CategoryBadge, StatusBadge } from './Badges';
import PetPhoto from './PetPhoto';

type Props = {
  pet: IPet;
};

export default function PetCard({ pet }: Props) {
  return (
    <article className='group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md'>
      <div className='relative aspect-[4/3] overflow-hidden'>
        <PetPhoto
          category={pet.category}
          breed={pet.breed}
          alt={pet.name}
          className='h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]'
        />
        <StatusBadge status={pet.status} />
      </div>

      <div className='flex flex-col gap-3 p-4'>
        <div className='flex items-start justify-between gap-2'>
          <h3 className='text-lg font-semibold text-slate-900'>{pet.name}</h3>
          <CategoryBadge category={pet.category} />
        </div>

        <p className='text-sm text-slate-600'>{pet.description}</p>

        <ul className='mt-1 grid grid-cols-2 gap-2 text-xs text-slate-600 md:grid-cols-3'>
          <li className='inline-flex items-center gap-1'>
            <Calendar className='h-4 w-4 text-slate-400' />
            {pet.ageYears} {pet.ageYears === 1 ? 'year' : 'years'}
          </li>
          <li className='inline-flex items-center gap-1'>
            <PawPrint className='h-4 w-4 text-slate-400' />
            {pet.breed ?? 'Mixed'}
          </li>
          <li className='inline-flex items-center gap-1'>
            <MapPin className='h-4 w-4 text-slate-400' />
            {pet.location}
          </li>
          <li className='inline-flex items-center gap-1 capitalize'>
            <Ruler className='h-4 w-4 text-slate-400' />
            {pet.size}
          </li>
          <li className='inline-flex items-center gap-1 capitalize'>
            {pet.sex === 'female' ? (
              <Venus className='h-4 w-4 text-slate-400' />
            ) : (
              <Mars className='h-4 w-4 text-slate-400' />
            )}
            {pet.sex}
          </li>
          <li className='inline-flex items-center gap-1'>
            <Info className='h-4 w-4 text-slate-400' />
            {pet.vaccinated ? 'Vaccinated' : 'Health-checked'}
          </li>
        </ul>

        <div className='mt-2'>
          <Link
            to={`/pets/${pet.id}`}
            className='inline-flex h-10 items-center justify-center rounded-xl bg-emerald-600 px-4 text-sm font-semibold text-white transition hover:bg-emerald-700 whitespace-nowrap leading-none'
          >
            View details
          </Link>
        </div>
      </div>
    </article>
  );
}
