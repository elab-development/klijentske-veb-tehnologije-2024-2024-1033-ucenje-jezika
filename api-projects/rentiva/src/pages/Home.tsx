import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/home-bg.png';
import AppLayout from '../components/AppLayout';
import { Field } from '../components/home/Field';

type Filters = {
  q: string;
  type: '' | 'apartment' | 'house' | 'office';
  priceMax: string;
  location: '' | 'Beograd' | 'Novi Sad' | 'Niš' | 'Subotica';
};

export default function Home() {
  const navigate = useNavigate();

  const [filters, setFilters] = useState<Filters>({
    q: '',
    type: '',
    priceMax: '',
    location: '',
  });

  function update<K extends keyof Filters>(key: K, value: Filters[K]) {
    setFilters((s) => ({ ...s, [key]: value }));
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();

    const params = new URLSearchParams();
    if (filters.q.trim()) params.set('q', filters.q.trim());
    if (filters.type) params.set('type', filters.type);
    if (filters.priceMax && Number(filters.priceMax) >= 0) {
      params.set('priceMax', String(Number(filters.priceMax)));
    }
    if (filters.location) params.set('location', filters.location);

    navigate(`/rentals${params.toString() ? `?${params}` : ''}`);
  }

  return (
    <AppLayout bgImage={bgImage} overlay={0.1}>
      <div className='mx-auto flex min-h-[70vh] w-[95%] max-w-6xl flex-col justify-center'>
        <section className='max-w-3xl text-slate-900'>
          <h1 className='text-4xl sm:text-5xl leading-tight font-light'>
            Uživajte u najluksuznijim{' '}
            <span className='font-extrabold italic decoration-[color:var(--accent)] underline-offset-4'>
              nekretninama
            </span>{' '}
            na teritoriji Srbije!
          </h1>
        </section>

        <section className='mt-8 w-full'>
          <div className='mx-auto w-full rounded-3xl bg-white/75 p-6 shadow-xl backdrop-blur'>
            <h2 className='mb-4 text-lg md:text-xl font-semibold text-slate-800'>
              Pronađite smeštaj po Vašim merama:
            </h2>

            <form
              onSubmit={onSubmit}
              className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'
            >
              <Field label='Pretraga'>
                <input
                  type='text'
                  placeholder='Unesite naziv, opis ili lokaciju...'
                  value={filters.q}
                  onChange={(e) => update('q', e.target.value)}
                  className='w-full rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-[color:var(--highlight)]'
                />
              </Field>

              <Field label='Tip'>
                <select
                  value={filters.type}
                  onChange={(e) =>
                    update('type', e.target.value as Filters['type'])
                  }
                  className='w-full rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-[color:var(--highlight)]'
                >
                  <option value=''>Svi tipovi</option>
                  <option value='apartment'>Stan</option>
                  <option value='house'>Kuća</option>
                  <option value='office'>Poslovni prostor</option>
                </select>
              </Field>

              <Field label='Cena do (€)'>
                <input
                  type='number'
                  min={0}
                  placeholder='800'
                  value={filters.priceMax}
                  onChange={(e) => update('priceMax', e.target.value)}
                  className='w-full rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-[color:var(--highlight)]'
                />
              </Field>

              <Field label='Lokacija'>
                <select
                  value={filters.location}
                  onChange={(e) =>
                    update('location', e.target.value as Filters['location'])
                  }
                  className='w-full rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-[color:var(--highlight)]'
                >
                  <option value=''>Sve lokacije</option>
                  <option value='Beograd'>Beograd, Srbija</option>
                  <option value='Novi Sad'>Novi Sad, Srbija</option>
                  <option value='Niš'>Niš, Srbija</option>
                  <option value='Subotica'>Subotica, Srbija</option>
                </select>
              </Field>

              <div className='sm:col-span-2 lg:col-span-4 flex justify-end pt-2'>
                <button
                  type='submit'
                  className='cursor-pointer rounded-xl bg-[color:var(--secondary)] px-6 py-2.5 font-medium text-white shadow-sm hover:bg-[color:var(--primary)]'
                >
                  Pretraži
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
