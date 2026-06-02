import { useParams, Link } from 'react-router-dom';
import { MapPin, Mountain, Clock, Route, ArrowLeft } from 'lucide-react';
import { TRAILS } from '../data/trails';
import { LOCATIONS } from '../data/locations';
import MapView from '../components/MapView';

export default function Track() {
  const { id } = useParams<{ id: string }>();
  const trail = TRAILS.find((t) => t.id === id);
  const location = LOCATIONS.find((l) => l.id === trail?.locationId);

  if (!trail)
    return (
      <section className='text-center py-16'>
        <h2 className='text-2xl font-semibold text-rose-600'>
          Trail not found
        </h2>
        <Link
          to='/tracks'
          className='inline-block mt-4 text-emerald-700 hover:underline'
        >
          ← Back to Tracks
        </Link>
      </section>
    );

  return (
    <section>
      <header className='mb-6'>
        <Link
          to='/tracks'
          className='inline-flex items-center gap-1 text-sm text-emerald-700 hover:underline'
        >
          <ArrowLeft className='w-4 h-4' /> Back to Tracks
        </Link>

        <h1 className='text-2xl md:text-3xl font-bold text-emerald-900 mt-3'>
          {trail.name}
        </h1>
      </header>

      {location?.imageUrl && (
        <img
          src={location.imageUrl}
          alt={location.name}
          className='rounded-xl w-full max-h-[400px] object-cover mb-6'
        />
      )}

      <div className='space-y-4'>
        <p className='text-stone-700'>{trail.description}</p>

        <div className='flex flex-wrap gap-4 text-sm text-stone-700'>
          <div className='flex items-center gap-1.5'>
            <MapPin className='w-4 h-4' />
            <span>{location?.name}</span>
          </div>
          <div className='flex items-center gap-1.5'>
            <Route className='w-4 h-4' />
            <span>{trail.distanceKm} km</span>
          </div>
          <div className='flex items-center gap-1.5'>
            <Mountain className='w-4 h-4' />
            <span>{trail.elevationGainM} m elevation</span>
          </div>
          <div className='flex items-center gap-1.5'>
            <Clock className='w-4 h-4' />
            <span>{trail.estTimeH} h estimated</span>
          </div>
        </div>

        {trail.startLat && trail.startLon ? (
          <MapView
            lat={trail.startLat}
            lon={trail.startLon}
            label={trail.name}
          />
        ) : (
          <p className='text-sm text-stone-500 italic'>
            No map data available for this trail.
          </p>
        )}
      </div>
    </section>
  );
}
