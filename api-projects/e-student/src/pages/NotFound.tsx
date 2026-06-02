import { Link } from 'react-router-dom';
import { FiAlertTriangle } from 'react-icons/fi';

export default function NotFound() {
  return (
    <div className='min-h-dvh bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4'>
      <div className='w-full max-w-md rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100 text-center'>
        <div className='mb-4 flex justify-center'>
          <div className='flex h-14 w-14 items-center justify-center rounded-full bg-blue-100'>
            <FiAlertTriangle className='h-7 w-7 text-blue-600' />
          </div>
        </div>
        <h1 className='text-4xl font-bold text-gray-900'>404</h1>
        <h2 className='mt-1 text-xl font-semibold text-gray-900'>
          Stranica nije pronađena
        </h2>
        <p className='mt-2 text-sm text-gray-600'>
          Proverite URL ili se vratite na početnu stranicu.
        </p>
        <Link
          to='/'
          className='mt-5 inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 transition'
        >
          ← Nazad na početnu
        </Link>
      </div>
    </div>
  );
}
