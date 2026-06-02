import { type FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../store/auth-context';
import sideImageUrl from '../assets/register-side.png';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const fullName = (fd.get('name') as string)?.trim();
    const email = (fd.get('email') as string)?.trim();
    const password = (fd.get('password') as string) || '';
    const confirm = (fd.get('confirm') as string) || '';
    const phone = (fd.get('phone') as string)?.trim() || undefined;

    if (password !== confirm) {
      setError('Lozinke se ne poklapaju.');
      return;
    }
    if (password.length < 6) {
      setError('Lozinka mora imati najmanje 6 karaktera.');
      return;
    }

    setError(null);
    setLoading(true);
    try {
      await register({ fullName, email, password, phone });
      navigate('/', { replace: true });
    } catch (err: any) {
      setError(err?.message || 'Registracija neuspešna.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white text-slate-900'>
      <div className='relative hidden lg:block'>
        <img
          src={sideImageUrl}
          alt='Luksuzni apartmani u prirodi'
          className='absolute inset-0 h-full w-full object-cover'
          loading='eager'
        />
        <div className='absolute inset-0 bg-black/10' />
      </div>

      <div className='flex items-center justify-center px-6 py-10 sm:px-10'>
        <div className='w-full max-w-md'>
          <h1 className='text-3xl sm:text-4xl font-semibold leading-tight text-center'>
            Dobrodošli <span className='text-[color:var(--secondary)]'>na</span>{' '}
            <span className='text-[color:var(--accent)] font-bold'>
              Rentivu!
            </span>
          </h1>

          <p className='mt-6 text-sm text-slate-500 text-center'>
            Registrujte se
          </p>

          <form onSubmit={onSubmit} className='mt-4 space-y-4'>
            <div>
              <label
                htmlFor='name'
                className='mb-1 block text-sm font-medium text-slate-700'
              >
                Ime i prezime
              </label>
              <input
                id='name'
                name='name'
                type='text'
                required
                className='w-full rounded-lg border border-slate-300 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-[color:var(--highlight)]'
              />
            </div>

            <div>
              <label
                htmlFor='email'
                className='mb-1 block text-sm font-medium text-slate-700'
              >
                Vaš email
              </label>
              <input
                id='email'
                name='email'
                type='email'
                required
                className='w-full rounded-lg border border-slate-300 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-[color:var(--highlight)]'
              />
            </div>

            <div>
              <label
                htmlFor='password'
                className='mb-1 block text-sm font-medium text-slate-700'
              >
                Lozinka
              </label>
              <input
                id='password'
                name='password'
                type='password'
                required
                className='w-full rounded-lg border border-slate-300 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-[color:var(--highlight)]'
              />
            </div>

            <div>
              <label
                htmlFor='confirm'
                className='mb-1 block text-sm font-medium text-slate-700'
              >
                Potvrda lozinke
              </label>
              <input
                id='confirm'
                name='confirm'
                type='password'
                required
                className='w-full rounded-lg border border-slate-300 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-[color:var(--highlight)]'
              />
            </div>

            <div>
              <label
                htmlFor='phone'
                className='mb-1 block text-sm font-medium text-slate-700'
              >
                Kontakt
              </label>
              <input
                id='phone'
                name='phone'
                type='tel'
                className='w-full rounded-lg border border-slate-300 bg-white px-3 py-2 shadow-sm outline-none focus:ring-2 focus:ring-[color:var(--highlight)]'
              />
            </div>

            {error && (
              <p className='text-sm font-medium text-red-600'>{error}</p>
            )}

            <button
              type='submit'
              disabled={loading}
              className='cursor-pointer w-full rounded-lg bg-[color:var(--secondary)] px-4 py-2.5 font-medium text-white shadow-sm transition hover:bg-[color:var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--highlight)] disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {loading ? 'Kreiranje naloga...' : 'Registruj se'}
            </button>
          </form>

          <p className='mt-8 text-center text-xs text-slate-500'>
            Već imate nalog?{' '}
            <Link
              to={'/login'}
              className='text-[color:var(--accent)] hover:underline'
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
