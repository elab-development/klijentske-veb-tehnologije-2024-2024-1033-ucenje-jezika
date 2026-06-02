import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PawPrint, Search, Heart, ShieldCheck, Sparkles } from 'lucide-react';

import { Feature } from '../components/home/Feature';
import { Badge } from '../components/home/Badge';
import AdoptedPetImage from '../components/home/AdoptedPetImage';

export default function Home() {
  const navigate = useNavigate();
  const [q, setQ] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const term = q.trim();
    navigate(term ? `/pets?q=${encodeURIComponent(term)}` : '/pets');
  };

  return (
    <div className='space-y-16'>
      <section className='relative overflow-hidden rounded-2xl border border-slate-200 bg-white'>
        <div className='pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-emerald-200/50 blur-3xl' />
        <div className='pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-cyan-200/50 blur-3xl' />

        <div className='relative grid gap-10 p-6 sm:p-10 lg:grid-cols-2 lg:items-center lg:gap-12'>
          <div className='space-y-6'>
            <div className='inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700'>
              <Sparkles className='h-4 w-4' />
              Find your new best friend
            </div>

            <h1 className='text-4xl font-extrabold tracking-tight sm:text-5xl'>
              Adopt love.{' '}
              <span className='text-emerald-600'>Change two lives.</span>
            </h1>

            <p className='max-w-prose text-lg text-slate-700'>
              Paws & Friends is a friendly place to discover pets looking for a
              forever home. Browse, learn more about each pet, and send a quick
              inquiry — all in a few clicks.
            </p>

            <form
              onSubmit={onSubmit}
              className='grid gap-3 sm:flex sm:items-center'
            >
              <div className='relative w-full sm:max-w-md'>
                <Search className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400' />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  className='w-full rounded-xl border border-slate-300 bg-white px-9 py-3 text-slate-900 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-300/60'
                  placeholder='Search by name, breed, size…'
                />
              </div>

              <button
                type='submit'
                className='cursor-pointer inline-flex h-12 items-center justify-center rounded-xl bg-emerald-600 px-6 font-semibold text-white shadow-sm transition hover:bg-emerald-700 active:scale-[0.99] whitespace-nowrap leading-none'
              >
                Browse pets
              </button>

              <Link
                to='/about'
                className='cursor-pointer inline-flex h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-6 font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 whitespace-nowrap leading-none'
              >
                About us
              </Link>
            </form>

            <div className='grid gap-4 sm:grid-cols-3'>
              <Badge
                icon={<PawPrint className='h-4 w-4' />}
                title='Verified profiles'
              />
              <Badge
                icon={<Heart className='h-4 w-4' />}
                title='Welfare first'
              />
              <Badge
                icon={<ShieldCheck className='h-4 w-4' />}
                title='Safe & transparent'
              />
            </div>
          </div>

          <div className='relative'>
            <div className='aspect-[4/3] w-full overflow-hidden rounded-2xl border border-slate-200 shadow-sm'>
              <AdoptedPetImage
                query='happy adopted pets'
                imgClassName='h-full w-full object-cover'
              />
            </div>

            <div className='pointer-events-none absolute -bottom-4 -left-4 hidden w-48 select-none rounded-xl border border-emerald-200 bg-white/90 p-3 shadow-md backdrop-blur sm:block'>
              <div className='flex items-center gap-2'>
                <span className='inline-grid h-8 w-8 place-items-center rounded-full bg-emerald-600 text-white'>
                  <PawPrint className='h-4 w-4' />
                </span>
                <div className='text-sm'>
                  <p className='font-semibold'>3,200+ happy matches</p>
                  <p className='text-slate-500'>Join the community</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='grid gap-4 sm:grid-cols-3'>
        <Feature
          title='Browse quickly'
          desc='Explore our site and fine your future best friend.'
          icon={<Search className='h-5 w-5' />}
        />
        <Feature
          title='Learn before you adopt'
          desc='Open a pet profile to see details, personality, and care notes.'
          icon={<PawPrint className='h-5 w-5' />}
        />
        <Feature
          title='Send an inquiry'
          desc='Use the modal on the pet page to send a quick adoption message.'
          icon={<Heart className='h-5 w-5' />}
        />
      </section>
    </div>
  );
}
