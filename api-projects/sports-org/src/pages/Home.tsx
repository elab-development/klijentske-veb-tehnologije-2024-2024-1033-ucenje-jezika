import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import {
  CalendarDays,
  MapPin,
  PlusCircle,
  Search,
  Shield,
  Users,
} from 'lucide-react';
import { useEvents } from '../context/EventsContext';

export default function Home() {
  const { events } = useEvents();

  const { eventCount, cityCount, teamCount } = useMemo(() => {
    const eventCount = events.length;

    const cities = new Set<string>();
    let teamCount = 0;

    for (const e of events) {
      if (e.location?.city) cities.add(e.location.city);
      teamCount += e.teams?.length ?? 0;
    }

    return { eventCount, cityCount: cities.size, teamCount };
  }, [events]);

  return (
    <div className='space-y-16'>
      <section className='relative overflow-hidden rounded-3xl bg-indigo-600 text-white'>
        <div className='absolute inset-0'>
          <div className='absolute -top-24 -right-24 h-72 w-72 rounded-full bg-indigo-400/30 blur-3xl' />
          <div className='absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl' />
        </div>

        <div className='relative px-6 py-16 sm:px-10 sm:py-20'>
          <div className='mx-auto max-w-4xl text-center'>
            <h1 className='text-4xl font-extrabold tracking-tight sm:text-5xl'>
              Plan, organize & track sports events
            </h1>
            <p className='mt-4 text-indigo-100'>
              Create tournaments, schedule matches, pick locations on the map,
              and share details — all in a clean, fast interface. No backend
              needed: everything is stored locally.
            </p>

            <div className='mt-8 flex flex-wrap items-center justify-center gap-3'>
              <Link
                to='/events'
                className='inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-indigo-700 shadow transition hover:opacity-95'
              >
                <Search className='h-5 w-5' />
                Browse Events
              </Link>
              <Link
                to='/new'
                className='inline-flex items-center gap-2 rounded-xl bg-indigo-800 px-5 py-3 font-semibold text-white shadow transition hover:bg-indigo-900'
              >
                <PlusCircle className='h-5 w-5' />
                Create Event
              </Link>
            </div>

            <div className='mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3'>
              <div className='rounded-2xl bg-white/10 p-4'>
                <div className='text-sm text-indigo-100'>Active events</div>
                <div className='text-2xl font-bold'>
                  {eventCount.toLocaleString()}
                </div>
              </div>
              <div className='rounded-2xl bg-white/10 p-4'>
                <div className='text-sm text-indigo-100'>Cities covered</div>
                <div className='text-2xl font-bold'>
                  {cityCount.toLocaleString()}
                </div>
              </div>
              <div className='rounded-2xl bg-white/10 p-4'>
                <div className='text-sm text-indigo-100'>Teams registered</div>
                <div className='text-2xl font-bold'>
                  {teamCount.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className='mx-auto max-w-6xl'>
          <h2 className='text-2xl font-bold text-gray-900'>
            Everything you need for sports events
          </h2>
          <p className='mt-2 text-gray-600'>
            From smart search to maps and team management — start quickly and
            scale your tournaments.
          </p>

          <div className='mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
            <div className='rounded-2xl bg-white p-5 shadow-sm'>
              <div className='inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700'>
                <Search className='h-5 w-5' />
              </div>
              <h3 className='mt-4 text-lg font-semibold'>Powerful search</h3>
              <p className='mt-1 text-sm text-gray-600'>
                Filter events by date, time, location, and sport type to find
                exactly what you need.
              </p>
            </div>

            <div className='rounded-2xl bg-white p-5 shadow-sm'>
              <div className='inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700'>
                <MapPin className='h-5 w-5' />
              </div>
              <h3 className='mt-4 text-lg font-semibold'>Map locations</h3>
              <p className='mt-1 text-sm text-gray-600'>
                Pick a place directly on Google Maps when creating an event and
                preview it later.
              </p>
            </div>

            <div className='rounded-2xl bg-white p-5 shadow-sm'>
              <div className='inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700'>
                <Users className='h-5 w-5' />
              </div>
              <h3 className='mt-4 text-lg font-semibold'>Teams & details</h3>
              <p className='mt-1 text-sm text-gray-600'>
                Add descriptions, rosters, and match info — keep everything in
                one place.
              </p>
            </div>

            <div className='rounded-2xl bg-white p-5 shadow-sm'>
              <div className='inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700'>
                <Shield className='h-5 w-5' />
              </div>
              <h3 className='mt-4 text-lg font-semibold'>Local-first</h3>
              <p className='mt-1 text-sm text-gray-600'>
                No backend required. Your data stays in the browser’s local
                storage.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className='rounded-3xl bg-white shadow-sm'>
        <div className='mx-auto max-w-6xl px-6 py-10 sm:px-10'>
          <h2 className='text-2xl font-bold text-gray-900'>How it works</h2>
          <div className='mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3'>
            <div className='rounded-2xl p-6 shadow-sm'>
              <div className='inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700'>
                <PlusCircle className='h-5 w-5' />
              </div>
              <h3 className='mt-4 font-semibold'>1. Create</h3>
              <p className='mt-1 text-sm text-gray-600'>
                Open <span className='font-medium'>Create Event</span>, fill in
                details, and pick a location on the map.
              </p>
            </div>

            <div className='rounded-2xl p-6 shadow-sm'>
              <div className='inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700'>
                <CalendarDays className='h-5 w-5' />
              </div>
              <h3 className='mt-4 font-semibold'>2. Organize</h3>
              <p className='mt-1 text-sm text-gray-600'>
                Manage dates, times, and teams. Everything saves automatically
                to local storage.
              </p>
            </div>

            <div className='rounded-2xl p-6 shadow-sm'>
              <div className='inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700'>
                <MapPin className='h-5 w-5' />
              </div>
              <h3 className='mt-4 font-semibold'>3. Share</h3>
              <p className='mt-1 text-sm text-gray-600'>
                View each event with an embedded map and share the link with
                your team.
              </p>
            </div>
          </div>

          <div className='mt-8 flex flex-wrap items-center gap-3'>
            <Link
              to='/events'
              className='inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow transition hover:bg-indigo-700'
            >
              Browse Events
            </Link>
            <Link
              to='/new'
              className='inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold text-indigo-700 transition hover:bg-indigo-50'
            >
              Create Event
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
