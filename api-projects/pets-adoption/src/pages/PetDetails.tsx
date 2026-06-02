import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  MapPin,
  Calendar,
  Ruler,
  Venus,
  Mars,
  PawPrint,
  Info,
} from 'lucide-react';

import type { Category } from '../domain/pets';
import type { Inquiry } from '../models/Inquiry';
import { getPetById } from '../data/pets';
import { getInquiriesByPet } from '../storage/inquiries';
import PetPhoto from '../components/pets/PetPhoto';
import { CategoryBadge, StatusBadge } from '../components/pets/Badges';
import InquiryModal from '../components/inquiry/InquiryModal';

export default function PetDetails() {
  const { id } = useParams<{ id: string }>();
  const pet = id ? getPetById(id) : null;

  const [open, setOpen] = useState(false);
  const [existing, setExisting] = useState<Inquiry | null>(null);

  useEffect(() => {
    if (!pet) return;
    const found = getInquiriesByPet(pet.id)[0] ?? null;
    setExisting(found);
  }, [pet?.id]);

  if (!pet) {
    return (
      <section className='space-y-6'>
        <h1 className='text-2xl font-bold tracking-tight'>Pet not found</h1>
        <p className='text-slate-600'>We couldn’t find a pet with id “{id}”.</p>
        <Link
          to='/pets'
          className='inline-flex h-10 items-center justify-center rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50'
        >
          Back to Pets
        </Link>
      </section>
    );
  }

  const galleryVariants = getGalleryVariants(pet.category);

  return (
    <section className='space-y-8'>
      <div className='flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
        <div className='space-y-1'>
          <div className='flex items-center gap-2'>
            <h1 className='text-3xl font-bold tracking-tight'>{pet.name}</h1>
          </div>
          <div className='flex items-center gap-2'>
            <StatusBadge status={pet.status} isAbs={false} />
            <CategoryBadge category={pet.category} />
            {pet.breed ? (
              <span className='rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-700'>
                {pet.breed}
              </span>
            ) : null}
          </div>
        </div>

        <Link
          to='/pets'
          className='inline-flex h-10 items-center justify-center rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50'
        >
          Back to Pets
        </Link>
      </div>

      <div className='relative overflow-hidden rounded-2xl border border-slate-200'>
        <div className='aspect-[16/9] w-full'>
          <PetPhoto
            category={pet.category}
            breed={pet.breed}
            alt={`${pet.name} hero`}
            className='h-full w-full object-cover'
          />
        </div>
      </div>

      <div className='grid gap-6 lg:grid-cols-3'>
        <div className='space-y-4 rounded-2xl border border-slate-200 bg-white p-5 lg:col-span-2'>
          <h2 className='text-lg font-semibold'>About {pet.name}</h2>
          <p className='text-slate-700'>{pet.description}</p>

          <ul className='mt-2 grid gap-3 text-sm text-slate-700 sm:grid-cols-2'>
            <li className='inline-flex items-center gap-2'>
              <Calendar className='h-4 w-4 text-slate-400' />
              {pet.ageYears} {pet.ageYears === 1 ? 'year' : 'years'} old
            </li>
            <li className='inline-flex items-center gap-2'>
              <PawPrint className='h-4 w-4 text-slate-400' />
              {pet.breed ?? 'Mixed'}
            </li>
            <li className='inline-flex items-center gap-2'>
              <MapPin className='h-4 w-4 text-slate-400' />
              {pet.location}
            </li>
            <li className='inline-flex items-center gap-2 capitalize'>
              <Ruler className='h-4 w-4 text-slate-400' />
              {pet.size}
            </li>
            <li className='inline-flex items-center gap-2 capitalize'>
              {pet.sex === 'female' ? (
                <Venus className='h-4 w-4 text-slate-400' />
              ) : (
                <Mars className='h-4 w-4 text-slate-400' />
              )}
              {pet.sex}
            </li>
            <li className='inline-flex items-center gap-2'>
              <Info className='h-4 w-4 text-slate-400' />
              {pet.vaccinated ? 'Vaccinated' : 'Health-checked'}
              {pet.neutered ? ' • Neutered' : ''}{' '}
              {pet.microchipped ? ' • Microchipped' : ''}
            </li>
          </ul>

          {pet.goodWith && (
            <div className='text-sm text-slate-700'>
              <span className='font-medium'>Good with:</span>{' '}
              <span>
                {[
                  pet.goodWith.children ? 'children' : null,
                  pet.goodWith.dogs ? 'dogs' : null,
                  pet.goodWith.cats ? 'cats' : null,
                ]
                  .filter(Boolean)
                  .join(', ') || '—'}
              </span>
            </div>
          )}
        </div>

        <div className='space-y-3 rounded-2xl border border-slate-200 bg-white p-5'>
          <h2 className='text-lg font-semibold'>Interested in {pet.name}?</h2>
          <p className='text-sm text-slate-600'>
            Send a quick inquiry and the shelter will get back to you shortly.
          </p>

          <button
            type='button'
            disabled={!!existing}
            onClick={() => setOpen(true)}
            className='cursor-pointer inline-flex h-11 w-full items-center justify-center rounded-xl bg-emerald-600 px-4 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-60'
          >
            Send inquiry
          </button>

          {existing && (
            <div className='mt-2 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900'>
              <p className='font-semibold'>Inquiry already sent</p>
              <p className='mt-1'>
                <span className='font-medium'>Email:</span> {existing.email}
              </p>
              <p className='mt-1'>
                <span className='font-medium'>Date:</span>{' '}
                {new Date(existing.createdAt).toLocaleString()}
              </p>
              <p className='mt-2 whitespace-pre-line'>{existing.message}</p>
            </div>
          )}
        </div>
      </div>

      <div className='space-y-3'>
        <h2 className='text-lg font-semibold'>Gallery</h2>
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {galleryVariants.map((suffix, i) => (
            <div
              key={i}
              className='relative aspect-[4/3] overflow-hidden rounded-xl border border-slate-200'
            >
              <PetPhoto
                category={pet.category}
                breed={[pet.breed, suffix].filter(Boolean).join(' ')}
                alt={`${pet.name} ${suffix}`}
                className='h-full w-full object-cover'
              />
            </div>
          ))}
        </div>
      </div>

      <InquiryModal
        open={open}
        onClose={() => setOpen(false)}
        petId={pet.id}
        petName={pet.name}
        onCreated={(inq) => setExisting(inq)}
      />
    </section>
  );
}

function getGalleryVariants(category: Category): string[] {
  switch (category) {
    case 'dog':
      return [
        'portrait',
        'running',
        'outdoors',
        'playing',
        'sitting',
        'closeup',
      ];
    case 'cat':
      return [
        'portrait',
        'sleeping',
        'window',
        'stretching',
        'playing',
        'closeup',
      ];
    case 'rabbit':
      return ['portrait', 'indoors', 'hay', 'sitting', 'eating', 'closeup'];
    case 'bird':
      return ['perched', 'colorful', 'flying', 'branch', 'portrait', 'closeup'];
    default:
      return ['portrait', 'outdoors', 'playing', 'sitting', 'closeup', 'happy'];
  }
}
