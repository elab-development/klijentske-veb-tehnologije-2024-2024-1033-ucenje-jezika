import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CalendarDays, Clock, MapPin, Users, ArrowLeft } from 'lucide-react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useEvents } from '../context/EventsContext';

export default function EventDetails() {
  const { id } = useParams<{ id: string }>();
  const { events } = useEvents();

  const event = useMemo(() => events.find((e) => e.id === id), [events, id]);

  if (!event) {
    return (
      <section className='mx-auto max-w-6xl space-y-6'>
        <Link
          to='/events'
          className='inline-flex items-center gap-2 rounded-md shadow-md px-3 py-2 text-sm hover:bg-gray-50'
        >
          <ArrowLeft className='h-4 w-4' />
          Back to events
        </Link>

        <div className='rounded-2xl shadow-md bg-white p-8 text-center'>
          <h1 className='text-xl font-semibold'>Event not found</h1>
          <p className='mt-2 text-gray-600'>
            We couldn’t find an event with ID{' '}
            <span className='font-mono'>{id}</span>.
          </p>
        </div>
      </section>
    );
  }

  const dateLabel = new Date(event.date).toLocaleDateString();
  const timeLabel = event.time;

  return (
    <section className='mx-auto max-w-6xl space-y-6'>
      <div className='flex items-center justify-between'>
        <Link
          to='/events'
          className='inline-flex items-center gap-2 rounded-md shadow-md px-3 py-2 text-sm hover:bg-gray-50'
        >
          <ArrowLeft className='h-4 w-4' />
          Back to events
        </Link>
      </div>

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        <div className='rounded-2xl bg-white p-6 shadow-sm'>
          <div className='flex flex-col justify-between gap-4 sm:flex-row sm:items-start'>
            <div>
              <h1 className='text-2xl font-semibold'>{event.title}</h1>
              <p className='text-indigo-700 font-medium'>{event.sport}</p>
            </div>

            <div className='grid grid-cols-1 gap-2 text-sm text-gray-700 sm:text-right'>
              <div className='flex items-center gap-2 sm:justify-end'>
                <CalendarDays className='h-4 w-4 text-gray-500' />
                <span>{dateLabel}</span>
              </div>
              <div className='flex items-center gap-2 sm:justify-end'>
                <Clock className='h-4 w-4 text-gray-500' />
                <span>{timeLabel}</span>
              </div>
              <div className='flex items-center gap-2 sm:justify-end'>
                <MapPin className='h-4 w-4 text-gray-500' />
                <span>
                  {event.location.city}, {event.location.country}
                </span>
              </div>
            </div>
          </div>

          {event.description ? (
            <p className='mt-4 text-gray-700'>{event.description}</p>
          ) : null}
        </div>

        <EventMap
          lat={event.location.lat}
          lng={event.location.lng}
          label={`${event.title} • ${event.location.city}, ${event.location.country}`}
        />
      </div>

      {event.teams?.length ? (
        <div className='rounded-2xl bg-white p-6 shadow-sm'>
          <div className='mb-4 flex items-center gap-2'>
            <Users className='h-5 w-5 text-gray-600' />
            <h2 className='text-lg font-semibold'>Teams & players</h2>
          </div>

          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
            {event.teams.map((team) => (
              <div key={team.name} className='rounded-xl shadow-md p-4'>
                <div className='text-base font-semibold'>{team.name}</div>
                {team.players?.length ? (
                  <ul className='mt-2 list-disc pl-5 text-sm text-gray-700'>
                    {team.players.map((p, i) => (
                      <li key={`${team.name}-${p}-${i}`}>{p}</li>
                    ))}
                  </ul>
                ) : (
                  <p className='mt-2 text-sm text-gray-500'>
                    No players listed.
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}

function EventMap({
  lat,
  lng,
  label,
}: {
  lat: number;
  lng: number;
  label: string;
}) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: ['places'],
  });

  const center = { lat, lng };

  return (
    <div className='rounded-2xl bg-white p-6 shadow-sm'>
      <h2 className='mb-3 text-lg font-semibold'>Location</h2>
      <div className='overflow-hidden rounded-xl shadow-md'>
        {!isLoaded ? (
          <div className='h-[360px] w-full bg-gray-50 p-4 text-sm text-gray-600'>
            Loading map…
          </div>
        ) : (
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '150px' }}
            center={center}
            zoom={14}
            options={{ streetViewControl: false, mapTypeControl: false }}
          >
            <Marker position={center} />
          </GoogleMap>
        )}
      </div>
      <p className='mt-2 text-sm text-gray-600'>{label}</p>
    </div>
  );
}
