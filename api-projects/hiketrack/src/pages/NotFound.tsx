import { Link } from 'react-router-dom';
import { Mountain, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <section className='min-h-[60vh] flex flex-col items-center justify-center text-center'>
      <div className='flex items-center justify-center mb-6'>
        <Mountain className='w-12 h-12 text-emerald-700' />
      </div>

      <h1 className='text-4xl font-bold text-emerald-900 mb-2'>
        404 – Page not found
      </h1>
      <p className='text-stone-600 max-w-md'>
        Looks like you’ve wandered off the trail. The page you’re looking for
        doesn’t exist or has been moved.
      </p>

      <div className='mt-8 flex flex-wrap gap-3 justify-center'>
        <Link
          to='/'
          className='inline-flex items-center gap-2 rounded-md bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 transition'
        >
          <ArrowLeft className='w-4 h-4' />
          Back to Home
        </Link>
        <Link
          to='/tracks'
          className='inline-flex items-center gap-2 rounded-md border border-stone-300 text-stone-800 hover:bg-stone-100 px-4 py-2 transition'
        >
          Browse Tracks
        </Link>
      </div>
    </section>
  );
}
