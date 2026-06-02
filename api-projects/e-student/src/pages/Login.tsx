import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';
import { FiLayers, FiUser, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

export default function Login() {
  const { user, login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  if (user) return <Navigate to='/' replace />;

  useEffect(() => {
    setError('');
  }, [username, password]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = login(username.trim(), password);
    if (ok) {
      navigate('/', { replace: true });
    } else {
      setError('Pogrešno korisničko ime ili lozinka.');
    }
  };

  return (
    <div className='min-h-dvh bg-gradient-to-br from-blue-50 via-white to-indigo-50'>
      <div className='mx-auto flex min-h-dvh max-w-5xl items-center justify-center px-4 py-10'>
        <section className='w-full max-w-md'>
          <div className='mb-6 flex items-center justify-center gap-2'>
            <FiLayers className='h-8 w-8 text-blue-600' aria-hidden />
            <h1 className='text-2xl font-semibold tracking-tight text-gray-900'>
              e-Student
            </h1>
          </div>

          <div className='rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100'>
            <header className='mb-4'>
              <h2 className='text-xl font-semibold text-gray-900'>Prijava</h2>
              <p className='mt-1 text-sm text-gray-600'>
                Prijavite se pomoću dodeljenog naloga.
              </p>
            </header>

            <form onSubmit={handleSubmit} className='space-y-4'>
              <label className='block'>
                <span className='mb-1 block text-sm font-medium text-gray-700'>
                  Korisničko ime
                </span>
                <div className='relative'>
                  <FiUser className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                  <input
                    className='w-full rounded-xl border border-gray-300 bg-white px-10 py-2 outline-none ring-blue-200 placeholder:text-gray-400 focus:border-blue-500 focus:ring'
                    placeholder='npr. pera'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete='username'
                  />
                </div>
              </label>

              <label className='block'>
                <span className='mb-1 block text-sm font-medium text-gray-700'>
                  Lozinka
                </span>
                <div className='relative'>
                  <FiLock className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
                  <input
                    className='w-full rounded-xl border border-gray-300 bg-white px-10 py-2 pr-12 outline-none ring-blue-200 placeholder:text-gray-400 focus:border-blue-500 focus:ring'
                    type={showPass ? 'text' : 'password'}
                    placeholder='••••••'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete='current-password'
                  />
                  <button
                    type='button'
                    onClick={() => setShowPass((s) => !s)}
                    className='absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-500 hover:bg-gray-100'
                    aria-label={showPass ? 'Sakrij lozinku' : 'Prikaži lozinku'}
                  >
                    {showPass ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </label>

              {error && (
                <p className='text-sm font-medium text-red-600'>{error}</p>
              )}

              <button
                type='submit'
                className='mt-2 w-full rounded-xl bg-blue-600 px-4 py-2.5 text-white transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200'
              >
                Prijavi se
              </button>
            </form>

            <div className='mt-5 rounded-xl bg-gray-50 p-3 text-sm text-gray-600'>
              <p className='mb-1 font-medium text-gray-700'>Demo nalozi:</p>
              <ul className='list-inside list-disc space-y-0.5'>
                <li>
                  <span className='font-mono'>pera / 123</span>
                </li>
                <li>
                  <span className='font-mono'>mika / 456</span>
                </li>
                <li>
                  <span className='font-mono'>ana / 789</span>
                </li>
              </ul>
              <p className='mt-2 text-xs'>
                Nemate nalog? Kontaktirajte studentsku službu.{' '}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
