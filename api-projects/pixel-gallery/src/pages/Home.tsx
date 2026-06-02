import { Link } from 'react-router-dom';
import {
  Palette,
  Monitor,
  Images,
  ArrowRight,
  Sparkles,
  Search,
  Bookmark,
} from 'lucide-react';

export default function Home() {
  return (
    <div className='relative'>
      <div className='pointer-events-none absolute inset-0 -z-10 overflow-hidden'>
        <div className='absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-300/30 blur-3xl' />
        <div className='absolute top-32 -right-24 h-72 w-72 rounded-full bg-fuchsia-300/30 blur-3xl' />
        <div className='absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-300/20 blur-3xl' />
      </div>

      <section className='mx-auto max-w-6xl px-4 pt-10 pb-8 md:pt-16 md:pb-14'>
        <div className='rounded-3xl bg-white/70 p-6 backdrop-blur-md ring-1 ring-black/5 shadow-lg md:p-10'>
          <div className='flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between'>
            <div className='max-w-2xl'>
              <div className='inline-flex items-center gap-2 rounded-full bg-indigo-600/10 px-3 py-1 text-sm font-medium text-indigo-700 ring-1 ring-indigo-600/20'>
                <Sparkles className='h-4 w-4' />
                Curated visuals for every taste
              </div>
              <h1 className='mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl'>
                Discover art in <span className='text-indigo-600'>pixels</span>{' '}
                & <span className='text-fuchsia-600'>paint</span>
              </h1>
              <p className='mt-4 text-slate-600'>
                Browse traditional masterpieces and cutting-edge digital pieces.
                Build your own collection, learn about artists, and get
                inspired.
              </p>
              <div className='mt-6 flex flex-wrap items-center gap-3'>
                <Link
                  to='/traditional'
                  className='inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2.5 text-white shadow-md transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600/40'
                >
                  Explore Traditional
                  <ArrowRight className='h-4 w-4' />
                </Link>
                <Link
                  to='/digital'
                  className='inline-flex items-center gap-2 rounded-full bg-fuchsia-600 px-5 py-2.5 text-white shadow-md transition hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-600/40'
                >
                  Explore Digital
                  <ArrowRight className='h-4 w-4' />
                </Link>
              </div>
            </div>

            <div className='mt-2 grid w-full max-w-md grid-cols-3 gap-2 self-stretch md:mt-0'>
              {[
                'from-indigo-500 to-fuchsia-500',
                'from-cyan-500 to-indigo-500',
                'from-amber-400 to-rose-500',
                'from-emerald-400 to-teal-600',
                'from-indigo-600 to-cyan-500',
                'from-rose-500 to-fuchsia-600',
              ].map((g, i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-2xl bg-gradient-to-br ${g} opacity-90 shadow-lg ring-1 ring-black/10`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className='mx-auto max-w-6xl px-4 pb-8 md:pb-12'>
        <h2 className='mb-4 text-2xl font-semibold text-slate-900'>
          Browse by category
        </h2>
        <div className='grid gap-4 sm:grid-cols-2'>
          <Link
            to='/traditional'
            className='group relative overflow-hidden rounded-3xl bg-white p-6 shadow-lg ring-1 ring-black/5 transition hover:shadow-xl'
          >
            <div className='absolute -right-10 -top-10 h-40 w-40 rounded-full bg-indigo-100 transition group-hover:scale-110' />
            <div className='relative z-10 flex items-center gap-4'>
              <div className='inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-md'>
                <Palette className='h-6 w-6' />
              </div>
              <div>
                <h3 className='text-xl font-semibold text-slate-900'>
                  Traditional Art
                </h3>
                <p className='mt-1 text-sm text-slate-600'>
                  Paintings, drawings, sculpture & more.
                </p>
              </div>
            </div>
            <div className='mt-4 grid grid-cols-3 gap-2'>
              {['bg-indigo-200', 'bg-indigo-300', 'bg-indigo-400'].map(
                (c, i) => (
                  <div key={i} className={`aspect-video rounded-xl ${c}`} />
                )
              )}
            </div>
          </Link>

          <Link
            to='/digital'
            className='group relative overflow-hidden rounded-3xl bg-white p-6 shadow-lg ring-1 ring-black/5 transition hover:shadow-xl'
          >
            <div className='absolute -right-10 -top-10 h-40 w-40 rounded-full bg-fuchsia-100 transition group-hover:scale-110' />
            <div className='relative z-10 flex items-center gap-4'>
              <div className='inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-fuchsia-600 text-white shadow-md'>
                <Monitor className='h-6 w-6' />
              </div>
              <div>
                <h3 className='text-xl font-semibold text-slate-900'>
                  Digital Art
                </h3>
                <p className='mt-1 text-sm text-slate-600'>
                  NFTs, illustrations, concept art & renders.
                </p>
              </div>
            </div>
            <div className='mt-4 grid grid-cols-3 gap-2'>
              {['bg-fuchsia-200', 'bg-fuchsia-300', 'bg-fuchsia-400'].map(
                (c, i) => (
                  <div key={i} className={`aspect-video rounded-xl ${c}`} />
                )
              )}
            </div>
          </Link>
        </div>
      </section>

      <section className='mx-auto max-w-6xl px-4 pb-14'>
        <h2 className='mb-6 text-2xl font-semibold text-slate-900'>
          How it works
        </h2>
        <div className='grid gap-4 md:grid-cols-3'>
          <div className='rounded-2xl bg-white p-6 shadow-lg ring-1 ring-black/5'>
            <div className='inline-flex items-center justify-center rounded-xl bg-indigo-600 p-2 text-white shadow-md'>
              <Search className='h-5 w-5' />
            </div>
            <h3 className='mt-3 text-lg font-semibold text-slate-900'>
              Explore
            </h3>
            <p className='mt-1 text-sm text-slate-600'>
              Browse traditional and digital collections, filter by style and
              medium.
            </p>
          </div>
          <div className='rounded-2xl bg-white p-6 shadow-lg ring-1 ring-black/5'>
            <div className='inline-flex items-center justify-center rounded-xl bg-fuchsia-600 p-2 text-white shadow-md'>
              <Bookmark className='h-5 w-5' />
            </div>
            <h3 className='mt-3 text-lg font-semibold text-slate-900'>Save</h3>
            <p className='mt-1 text-sm text-slate-600'>
              Favorite pieces and build boards for inspiration and research.
            </p>
          </div>
          <div className='rounded-2xl bg-white p-6 shadow-lg ring-1 ring-black/5'>
            <div className='inline-flex items-center justify-center rounded-xl bg-slate-900 p-2 text-white shadow-md'>
              <Images className='h-5 w-5' />
            </div>
            <h3 className='mt-3 text-lg font-semibold text-slate-900'>Enjoy</h3>
            <p className='mt-1 text-sm text-slate-600'>
              Learn about artists and techniques, and share your curated sets.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
