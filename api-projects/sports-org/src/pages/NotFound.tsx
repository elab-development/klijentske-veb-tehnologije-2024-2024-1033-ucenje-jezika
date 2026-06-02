import {
  Link,
  isRouteErrorResponse,
  useLocation,
  useRouteError,
} from 'react-router-dom';
import { Ban } from 'lucide-react';

export default function NotFound() {
  const error = useRouteError();
  const { pathname, search } = useLocation();

  const msg = isRouteErrorResponse(error)
    ? `${error.status} — ${error.statusText}`
    : "We couldn't find that page";

  return (
    <div className='mx-auto max-w-3xl flex h-full items-center justify-center px-4 py-16'>
      <div className='relative overflow-hidden rounded-3xl shadow-xl bg-white'>
        <div className='p-8 sm:p-10'>
          <div className='mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-2xl'>
            <Ban className='text-red-500' />
          </div>

          <h1
            tabIndex={-1}
            className='text-3xl font-bold tracking-tight sm:text-4xl'
          >
            404 — Oops! Lost in the brackets.
          </h1>

          <p className='mt-3 text-gray-600'>
            {msg}. The page{' '}
            <code className='rounded bg-gray-100 px-2 py-1'>
              {pathname}
              {search}
            </code>{' '}
            doesn’t exist or may have moved.
          </p>

          <div className='mt-6 grid gap-3 sm:flex sm:flex-wrap'>
            <Link
              to='/'
              className='inline-flex items-center justify-center rounded-xl bg-gray-900 px-4 py-2 text-white transition hover:opacity-90'
            >
              ← Back to Home
            </Link>

            <Link
              to='/events'
              className='inline-flex items-center justify-center rounded-xl border px-4 py-2 text-gray-800 transition hover:bg-gray-50'
            >
              Browse Events
            </Link>

            <Link
              to='/new'
              className='inline-flex items-center justify-center rounded-xl border px-4 py-2 text-gray-800 transition hover:bg-gray-50'
            >
              Create Event
            </Link>
          </div>

          <div className='mt-8 rounded-2xl border bg-gray-50 p-4'>
            <h2 className='text-sm font-semibold text-gray-700'>Quick links</h2>
            <ul className='mt-2 grid list-disc gap-1 pl-5 text-sm text-gray-600 sm:grid-cols-2'>
              <li>
                <Link to='/contact' className='underline hover:no-underline'>
                  Contact page (map & info)
                </Link>
              </li>
              <li>
                <Link
                  to='/events?sport=football'
                  className='underline hover:no-underline'
                >
                  Football events
                </Link>
              </li>
              <li>
                <Link
                  to='/events?today=true'
                  className='underline hover:no-underline'
                >
                  Today’s events
                </Link>
              </li>
              <li>
                <Link
                  to='/events?near=me'
                  className='underline hover:no-underline'
                >
                  Nearby events
                </Link>
              </li>
            </ul>
          </div>

          <p className='mt-6 text-xs text-gray-500'>
            Tip: Check the URL or navigate with the menu above.
          </p>
        </div>
      </div>
    </div>
  );
}
