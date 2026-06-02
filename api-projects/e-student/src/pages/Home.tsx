import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { examService } from '../services/examService';

type Holiday = {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
};

export default function Home() {
  const data = useMemo(() => examService.getData(), []);
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [loadingH, setLoadingH] = useState(true);
  const [errorH, setErrorH] = useState<string | null>(null);

  useEffect(() => {
    const year = new Date().getFullYear();
    fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/RS`)
      .then((resp) => {
        if (!resp.ok) throw new Error('Greška pri učitavanju praznika');
        return resp.json();
      })
      .then((data: any[]) => {
        const hs = data.map((h) => ({
          date: h.date,
          localName: h.localName || h.name,
          name: h.name,
          countryCode: h.countryCode || 'RS',
        }));
        setHolidays(hs);
        setLoadingH(false);
      })
      .catch((err) => {
        console.error('Holiday fetch error:', err);
        setErrorH('Ne mogu da učitam praznike');
        setLoadingH(false);
      });
  }, []);

  return (
    <section className='space-y-8'>
      <header>
        <h1 className='text-2xl font-semibold'>
          Dobrodošli na platformu za prijavu kolokvijuma i ispita
        </h1>
      </header>

      <div className='grid gap-4 sm:grid-cols-2'>
        <Link
          to='/exams'
          className='rounded-xl border bg-white p-5 hover:shadow transition'
        >
          <h2 className='font-medium'>Ispiti</h2>
          <p className='text-sm text-gray-600'>
            Pregled svih ispita i prijava.
          </p>
        </Link>
        <Link
          to='/my-registrations'
          className='rounded-xl border bg-white p-5 hover:shadow transition'
        >
          <h2 className='font-medium'>Moje prijave</h2>
          <p className='text-sm text-gray-600'>
            Vaše trenutne prijave i statusi.
          </p>
        </Link>
      </div>

      <div>
        <h2 className='mb-3 text-xl font-semibold'>Pregled ispitnih rokova</h2>
        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {data.sessions.map((s) => (
            <div
              key={s.id}
              className='rounded-xl border bg-white p-4 shadow-sm ring-1 ring-gray-100'
            >
              <h3 className='text-lg font-medium text-gray-900'>
                {s.name} {s.year}
              </h3>
              <ul className='mt-2 space-y-1 text-sm text-gray-700'>
                <li>
                  <span className='font-medium'>Prijave: </span>
                  {s.regStart} – {s.regEnd}
                </li>
                <li>
                  <span className='font-medium'>Ispitni period: </span>
                  {s.periodStart} – {s.periodEnd}
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className='mb-3 text-xl font-semibold'>Neradni dani (Praznici)</h2>
        {loadingH && (
          <p className='text-sm text-gray-500'>Učitavanje praznika...</p>
        )}
        {errorH && <p className='text-sm text-red-600'>{errorH}</p>}
        {!loadingH && !errorH && holidays.length === 0 && (
          <p className='text-sm text-gray-500'>
            Nema praznika pronađenih za ovu godinu.
          </p>
        )}
        {!loadingH && !errorH && holidays.length > 0 && (
          <ul className='space-y-1 text-sm text-gray-700'>
            {holidays.map((h) => (
              <li key={h.date} className='flex items-center gap-2'>
                <span className='font-medium'>{h.date}:</span> {h.localName}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
