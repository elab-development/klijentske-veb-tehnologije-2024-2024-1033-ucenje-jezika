import { type FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../store/auth-context';
import sideImageUrl from '../assets/login-side.png';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    setError(null);
    setLoading(true);
    try {
      await login({ email, password });
      navigate('/', { replace: true });
    } catch (err: any) {
      setError(err.message || 'Greška pri logovanju');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white text-slate-900'>
      <div className='relative hidden lg:block'>
        <img
          src={sideImageUrl}
          alt='Moderne stambene zgrade'
          className='absolute inset-0 h-full w-full object-cover'
          loading='eager'
        />
        <div className='absolute inset-0 bg-black/10' />
      </div>

      <div className='flex items-center justify-center px-6 py-10 sm:px-10'>
        <div className='w-full max-w-md'>
          <h1 className='text-3xl sm:text-4xl font-semibold leading-tight text-center'>
            Dobrodošli nazad <br />
            <span className='text-[color:var(--secondary)]'>na</span>{' '}
            <span className='text-[color:var(--accent)] font-bold'>
              Rentivu!
            </span>
          </h1>

          <p className='mt-6 text-sm text-slate-500 text-center'>
            Prijavite se na Vaš nalog
          </p>

          <form onSubmit={onSubmit} className='mt-6 space-y-4'>
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
                placeholder='you@example.com'
                className='w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none focus:ring-2 focus:ring-[color:var(--highlight)]'
              />
            </div>

            <div>
              <label
                htmlFor='password'
                className='mb-1 block text-sm font-medium text-slate-700'
              >
                Vaša lozinka
              </label>
              <input
                id='password'
                name='password'
                type='password'
                required
                className='w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm outline-none focus:ring-2 focus:ring-[color:var(--highlight)]'
              />
            </div>

            {error && (
              <p className='text-sm text-red-600 font-medium'>{error}</p>
            )}

            <button
              type='submit'
              disabled={loading}
              className='cursor-pointer w-full rounded-lg bg-[color:var(--secondary)] px-4 py-2.5 font-medium text-white shadow-sm transition hover:bg-[color:var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--highlight)] disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {loading ? 'Prijavljivanje...' : 'Login'}
            </button>
          </form>

          <p className='mt-8 text-center text-xs text-slate-500'>
            Nemate nalog?{' '}
            <Link
              to={'/register'}
              className='text-[color:var(--accent)] hover:underline'
            >
              Registrujte se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
