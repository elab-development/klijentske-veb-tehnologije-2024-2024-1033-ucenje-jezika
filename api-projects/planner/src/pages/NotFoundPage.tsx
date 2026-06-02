import { Link, useLocation } from 'react-router-dom';
import { SearchX, Home, CalendarDays, Plus, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  const location = useLocation();

  return (
    <div className='mx-auto max-w-3xl'>
      <section className='overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-rose-50 via-sky-50 to-white p-8 shadow-sm md:p-12'>
        <div className='flex items-start gap-4'>
          <div className='rounded-xl border border-slate-200 bg-white p-3 shadow-sm'>
            <SearchX className='h-8 w-8 text-rose-500' />
          </div>
          <div className='min-w-0'>
            <p className='text-sm font-semibold tracking-wide text-rose-600'>
              404
            </p>
            <h1 className='mt-1 text-3xl font-bold tracking-tight text-slate-900'>
              Page not found
            </h1>
            <p className='mt-2 text-sm text-slate-700'>
              We couldn’t find{' '}
              <span className='rounded-md bg-white px-1.5 py-0.5 font-mono text-[12px] text-slate-800 shadow-sm'>
                {location.pathname || '/'}
              </span>
              . It may have been moved or the URL is incorrect.
            </p>

            <div className='mt-6 flex flex-wrap items-center gap-3'>
              <Link
                to='/'
                className='inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800'
              >
                <Home className='h-4 w-4' />
                Go Home
              </Link>
              <Link
                to='/planner'
                className='inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50'
              >
                <CalendarDays className='h-4 w-4' />
                Open Planner
              </Link>
              <Link
                to='/add-task'
                className='inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50'
              >
                <Plus className='h-4 w-4' />
                Add Task
              </Link>
              <button
                onClick={() => window.history.back()}
                className='inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50'
                aria-label='Go back'
              >
                <ArrowLeft className='h-4 w-4' />
                Go Back
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className='mt-6 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm'>
        <ul className='list-inside list-disc space-y-1'>
          <li>Check the URL for typos.</li>
          <li>Use the buttons above to navigate.</li>
          <li>
            Need to plan something? Quickly{' '}
            <Link
              to='/add-task'
              className='font-medium text-sky-700 hover:underline'
            >
              add a task
            </Link>{' '}
            and schedule it in the Planner.
          </li>
        </ul>
      </div>
    </div>
  );
}
