import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { LOCATIONS } from '../data/locations';

export default function Home() {
  return (
    <section>
      <div className='bg-white border border-stone-200 rounded-xl p-6 shadow-sm'>
        <h1 className='text-2xl md:text-3xl font-bold text-emerald-900'>
          HikeTrack
        </h1>
        <p className='mt-2 text-stone-700 leading-relaxed'>
          Discover and plan hiking trails across Serbia. Explore routes by
          location, difficulty, and type — check trail maps, elevation, and
          real-time weather forecasts. Everything you need for your next hike,
          in one place.
        </p>

        <div className='mt-4 flex gap-3'>
          <Link
            to='/tracks'
            className='inline-block rounded-md bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 transition'
          >
            Browse all tracks
          </Link>
          <Link
            to='/weather'
            className='inline-block rounded-md border border-stone-300 text-stone-800 hover:bg-stone-100 px-4 py-2 transition'
          >
            Check weather
          </Link>
        </div>
      </div>

      <div className='mt-8'>
        <h2 className='text-xl font-semibold text-stone-900 flex items-center gap-2'>
          <MapPin className='w-5 h-5 text-emerald-700' />
          Popular locations
        </h2>
        <p className='text-sm text-stone-600 mt-1'>
          Click on a location to view available hiking trails in that area.
        </p>

        <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
          {LOCATIONS.map((loc) => (
            <Link
              key={loc.id}
              to={`/tracks?location=${encodeURIComponent(loc.id)}&page=1`}
              className='group relative overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm hover:shadow-md transition'
              title={`Show tracks in ${loc.name}`}
            >
              {loc.imageUrl ? (
                <img
                  src={loc.imageUrl}
                  alt={loc.name}
                  className='h-40 w-full object-cover transition group-hover:scale-105'
                  loading='lazy'
                />
              ) : (
                <div className='h-40 w-full bg-stone-200' />
              )}

              <div className='p-4'>
                <h3 className='text-base font-semibold text-stone-900'>
                  {loc.name}
                </h3>
                <p className='text-xs text-stone-600 mt-1'>
                  {loc.lat.toFixed(3)}, {loc.lon.toFixed(3)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
