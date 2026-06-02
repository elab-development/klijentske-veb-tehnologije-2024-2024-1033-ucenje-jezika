import { useCallback, useMemo, useRef, useState } from 'react';
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
} from '@react-google-maps/api';
import { MapPin, Search, Crosshair } from 'lucide-react';
import { useLocationStore } from '../store/location';
import { LocationService } from '../services/LocationService';
import type { SelectedLocation } from '../types/location';

const libraries = ['places'] as 'places'[];

export default function Home() {
  const { setLocation, location } = useLocationStore();
  const [center, setCenter] = useState<{ lat: number; lng: number }>(
    location
      ? { lat: location.lat, lng: location.lng }
      : { lat: 44.7866, lng: 20.4489 } // Belgrade default
  );
  const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(
    location ? { lat: location.lat, lng: location.lng } : null
  );

  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const mapContainerStyle = useMemo(
    () => ({ width: '100%', height: '360px' }),
    []
  );

  const onLoadAutocomplete = (ac: google.maps.places.Autocomplete) => {
    autocompleteRef.current = ac;
  };

  const applySelection = useCallback(
    async (lat: number, lng: number, placeId?: string) => {
      setBusy(true);
      try {
        const meta = await LocationService.reverseGeocode(lat, lng);
        const selected: SelectedLocation = {
          lat,
          lng,
          placeId,
          city: meta.city,
          region: meta.region,
          country: meta.country,
          formattedAddress: meta.formattedAddress,
          label: meta.label || `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
        };
        setLocation(selected);
        setMarker({ lat, lng });
        setCenter({ lat, lng });
      } finally {
        setBusy(false);
      }
    },
    [setLocation]
  );

  const onPlaceChanged = async () => {
    const ac = autocompleteRef.current;
    if (!ac) return;
    const place = ac.getPlace();
    if (!place?.geometry?.location) return;
    await applySelection(
      place.geometry.location.lat(),
      place.geometry.location.lng(),
      place.place_id
    );
  };

  const handleMapClick = async (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;
    await applySelection(e.latLng.lat(), e.latLng.lng());
  };

  const useMyLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(async (pos) => {
      await applySelection(pos.coords.latitude, pos.coords.longitude);
    });
  };

  return (
    <section className='space-y-6'>
      {/* HERO */}
      <div className='relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-50 to-white ring-1 ring-orange-100'>
        <div className='px-6 py-10 md:px-10 md:py-14'>
          <div className='max-w-4xl'>
            <h1 className='text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900'>
              Choose your location
            </h1>
            <p className='mt-3 text-slate-600 md:text-lg'>
              Search, click on the map, or use your current position. We’ll use
              this across the app.
            </p>
          </div>

          <div className='mt-6 rounded-3xl bg-white/80 backdrop-blur shadow-xl ring-1 ring-orange-100'>
            <div className='p-4 md:p-6'>
              <div className='flex flex-col gap-3 md:flex-row md:items-center'>
                {isLoaded ? (
                  <Autocomplete
                    onLoad={onLoadAutocomplete}
                    onPlaceChanged={onPlaceChanged}
                  >
                    <div className='relative flex-1'>
                      <Search
                        className='absolute left-3 top-1/2 -translate-y-1/2 text-slate-500'
                        size={18}
                      />
                      <input
                        ref={inputRef}
                        type='text'
                        placeholder='Search city, address, or place'
                        className='w-full rounded-xl border border-slate-200 bg-white px-9 py-3 text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-orange-400'
                      />
                    </div>
                  </Autocomplete>
                ) : (
                  <div className='h-[48px] w-full animate-pulse rounded-xl bg-slate-100 md:flex-1' />
                )}

                <button
                  onClick={useMyLocation}
                  className='inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white bg-orange-600 hover:bg-orange-700 active:bg-orange-800 transition'
                >
                  <Crosshair size={18} />
                  Use my location
                </button>
              </div>

              <div className='mt-4'>
                {isLoaded ? (
                  <GoogleMap
                    center={center}
                    zoom={marker ? 11 : 4}
                    onClick={handleMapClick}
                    mapContainerStyle={mapContainerStyle}
                    options={{
                      disableDefaultUI: true,
                      zoomControl: true,
                      streetViewControl: false,
                      fullscreenControl: false,
                    }}
                  >
                    {marker && <Marker position={marker} />}
                  </GoogleMap>
                ) : (
                  <div className='h-[360px] w-full animate-pulse rounded-2xl bg-slate-100' />
                )}
              </div>

              <div className='mt-4 flex flex-col items-start gap-2 md:flex-row md:items-center md:justify-between'>
                <div className='flex items-center gap-2 text-slate-700'>
                  <MapPin size={18} className='text-orange-600' />
                  {location ? (
                    <span className='text-sm'>
                      <span className='font-semibold text-slate-900'>
                        {location.label}
                      </span>{' '}
                      <span className='text-slate-500'>
                        ({location.lat.toFixed(4)}, {location.lng.toFixed(4)})
                      </span>
                    </span>
                  ) : (
                    <span className='text-sm'>Choose a location to start</span>
                  )}
                </div>

                <div className='text-sm text-slate-500'>
                  {busy
                    ? 'Resolving address…'
                    : location
                    ? 'Location set (memory only)'
                    : ''}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className='text-sm text-slate-500'>
        Tip: Click anywhere on the map to drop a marker. We’ll reverse-geocode
        it to a city/region.
      </p>
    </section>
  );
}
