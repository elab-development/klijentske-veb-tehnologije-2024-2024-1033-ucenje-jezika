import { useEffect, useMemo, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useAuth } from '../store/auth-context';

import listBg from '../assets/rentals-bg.png';
import placeholderImg from '../assets/rental-placeholder.png';
import { rentals } from '../data/rentals';
import { getImageForRental } from '../lib/imageProvider';
import AppLayout from '../components/AppLayout';
import {
  type Reservation,
  listReservationsFor,
  addReservation,
  hasConflict,
} from '../lib/reservations';

export default function RentalDetails() {
  const { id } = useParams<{ id: string }>();
  const { currentUser } = useAuth();

  const rental = useMemo(() => rentals.find((r) => r.id === id), [id]);

  if (!rental) {
    return <Navigate to='/rentals' replace />;
  }

  // Images state
  const [mainUrl, setMainUrl] = useState<string | null>(null);
  const [gallery, setGallery] = useState<(string | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const [loading, setLoading] = useState(true);

  // Reservations state
  const [reservations, setReservations] = useState<Reservation[]>(() =>
    listReservationsFor(rental.id)
  );
  const [date, setDate] = useState<string>(''); // yyyy-mm-dd
  const [time, setTime] = useState<string>(''); // HH:mm
  const [resError, setResError] = useState<string | null>(null);
  const [resSuccess, setResSuccess] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    (async () => {
      setLoading(true);
      try {
        const main = await getImageForRental(rental.name, rental.location.city);

        const queries = [
          `${rental.name} interior`,
          `${rental.name} living room`,
          `${rental.name} bedroom`,
          `${rental.name} bathroom`,
        ];

        const results = await Promise.all(
          queries.map((q) => getImageForRental(q, rental.location.city))
        );

        if (mounted) {
          setMainUrl(main ?? null);
          setGallery(results.map((u: any) => u ?? null));
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [rental.id, rental.name, rental.location.city]);

  function toISOLocal(d: string, t: string) {
    // d: "YYYY-MM-DD", t: "HH:mm" -> ISO string in local time
    const [yy, mm, dd] = d.split('-').map(Number);
    const [hh, min] = t.split(':').map(Number);
    const dt = new Date(yy, (mm ?? 1) - 1, dd ?? 1, hh ?? 0, min ?? 0, 0, 0);
    return dt.toISOString();
  }

  function onReserve(e: React.FormEvent) {
    e.preventDefault();
    setResError(null);
    setResSuccess(null);

    if (!currentUser) {
      setResError('Morate biti prijavljeni da biste rezervisali termin.');
      return;
    }
    if (!date || !time) {
      setResError('Izaberite datum i vreme.');
      return;
    }

    const iso = toISOLocal(date, time);
    const when = new Date(iso);
    const now = new Date();
    if (when.getTime() <= now.getTime()) {
      setResError('Termin mora biti u budućnosti.');
      return;
    }

    // konflikt: isti termin za istu nekretninu
    if (hasConflict(rental!.id, iso)) {
      setResError('Ovaj termin je već rezervisan. Izaberite drugi termin.');
      return;
    }

    const name = currentUser.fullName || 'Korisnik';
    addReservation({ rentalId: rental!.id, userName: name, datetime: iso });

    setReservations(listReservationsFor(rental!.id));
    setResSuccess('Uspešno ste rezervisali termin pregleda.');
    setDate('');
    setTime('');
  }

  return (
    <AppLayout bgImage={listBg} overlay={0}>
      <div className='mx-auto w-[95%] max-w-6xl'>
        <section className='grid grid-cols-1 gap-5 lg:grid-cols-3'>
          <div className='lg:col-span-2'>
            <div className='relative h-64 w-full overflow-hidden rounded-3xl sm:h-80 md:h-96 bg-slate-200'>
              {loading ? (
                <Skeleton />
              ) : (
                <img
                  src={mainUrl ?? placeholderImg}
                  alt={rental.name}
                  className='h-full w-full object-cover'
                  loading='eager'
                />
              )}
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            {gallery.map((url, i) => (
              <div
                key={i}
                className='relative h-28 w-full overflow-hidden rounded-2xl sm:h-32 md:h-36 bg-slate-200'
              >
                {loading ? (
                  <Skeleton />
                ) : (
                  <img
                    src={url ?? placeholderImg}
                    alt={`${rental.name} photo ${i + 1}`}
                    className='h-full w-full object-cover'
                    loading='lazy'
                  />
                )}
              </div>
            ))}
          </div>
        </section>

        <section className='mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3'>
          <div className='lg:col-span-2'>
            <div className='text-slate-700 font-semibold'>
              € {rental.price}
              <span className='text-xs font-normal text-slate-500'>
                {' '}
                /mesečno
              </span>
            </div>

            <h1 className='mt-2 text-2xl sm:text-3xl font-semibold text-slate-900'>
              {rental.name}
            </h1>
            <p className='mt-1 text-sm text-slate-500'>
              {rental.location.address}
            </p>
          </div>

          <aside className='rounded-3xl bg-white/75 p-5 shadow-xl backdrop-blur'>
            <h2 className='text-lg font-semibold text-slate-800'>Opis</h2>
            <p className='mt-2 text-sm leading-6 text-slate-700'>
              {rental.description}
            </p>
          </aside>
        </section>

        <section className='mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3'>
          <div className='lg:col-span-2 rounded-3xl bg-white/75 p-5 shadow-xl backdrop-blur'>
            <h2 className='text-lg font-semibold text-slate-800'>
              Zakazani pregledi
            </h2>
            {reservations.length === 0 ? (
              <p className='mt-2 text-sm text-slate-600'>
                Još nema rezervacija.
              </p>
            ) : (
              <ul className='mt-3 divide-y divide-slate-200'>
                {reservations.map((r) => (
                  <li
                    key={r.id}
                    className='py-2 flex items-center justify-between text-sm'
                  >
                    <span className='font-medium text-slate-800'>
                      {r.userName}
                    </span>
                    <span className='text-slate-600'>
                      {new Date(r.datetime).toLocaleString('sr-RS')}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className='rounded-3xl bg-white/75 p-5 shadow-xl backdrop-blur'>
            <h2 className='text-lg font-semibold text-slate-800'>
              Rezervišite pregled
            </h2>

            <form onSubmit={onReserve} className='mt-3 space-y-3'>
              <div>
                <label className='mb-1 block text-sm font-medium text-slate-700'>
                  Datum
                </label>
                <input
                  type='date'
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className='w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-[color:var(--highlight)]'
                  required
                />
              </div>

              <div>
                <label className='mb-1 block text-sm font-medium text-slate-700'>
                  Vreme
                </label>
                <input
                  type='time'
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className='w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-[color:var(--highlight)]'
                  required
                />
              </div>

              {resError && (
                <p className='text-sm font-medium text-red-600'>{resError}</p>
              )}
              {resSuccess && (
                <p className='text-sm font-medium text-green-700'>
                  {resSuccess}
                </p>
              )}

              <button
                type='submit'
                className='cursor-pointer w-full rounded-lg bg-[color:var(--secondary)] px-4 py-2.5 text-white hover:bg-[color:var(--primary)]'
              >
                Potvrdi rezervaciju
              </button>
            </form>

            {!currentUser && (
              <p className='mt-2 text-xs text-slate-500'>
                * Morate biti prijavljeni da biste zakazali termin.
              </p>
            )}
          </div>
        </section>
      </div>
    </AppLayout>
  );
}

function Skeleton() {
  return <div className='h-full w-full animate-pulse bg-slate-200/70' />;
}
