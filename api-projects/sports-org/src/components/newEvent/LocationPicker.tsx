import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import {
  GoogleMap,
  Marker,
  Autocomplete,
  useJsApiLoader,
} from '@react-google-maps/api';
import type { Location } from '../../types/event';

type Props = {
  value?: Location | null;
  onChange: (loc: Location) => void;
  label?: string;
};

const containerStyle = {
  width: '100%',
  height: '320px',
  borderRadius: '0.75rem',
};

function parseCityCountry(components: google.maps.GeocoderAddressComponent[]) {
  let city = '';
  let country = '';
  for (const c of components) {
    if (
      c.types.includes('locality') ||
      c.types.includes('postal_town') ||
      c.types.includes('administrative_area_level_2')
    ) {
      if (!city) city = c.long_name;
    }
    if (c.types.includes('country')) {
      country = c.long_name;
    }
  }
  return { city, country };
}

export default function LocationPicker({ value, onChange }: Props) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: ['places'],
  });

  const defaultCenter = useMemo(() => ({ lat: 44.8125, lng: 20.4612 }), []);
  const [center, setCenter] = useState<google.maps.LatLngLiteral>(
    value ? { lat: value.lat, lng: value.lng } : defaultCenter
  );
  const [marker, setMarker] = useState<google.maps.LatLngLiteral | null>(
    value ? { lat: value.lat, lng: value.lng } : null
  );
  const acRef = useRef<google.maps.places.Autocomplete | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    if (value) {
      setCenter({ lat: value.lat, lng: value.lng });
      setMarker({ lat: value.lat, lng: value.lng });
    }
  }, [value]);

  const onLoadMap = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const onPlaceChanged = useCallback(async () => {
    if (!acRef.current) return;
    const place = acRef.current.getPlace();
    if (!place || !place.geometry || !place.geometry.location) return;

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    setCenter({ lat, lng });
    setMarker({ lat, lng });
    if (mapRef.current) mapRef.current.panTo({ lat, lng });

    // Try reading city/country from place directly
    let city = '';
    let country = '';
    if (place.address_components) {
      const parsed = parseCityCountry(place.address_components);
      city = parsed.city;
      country = parsed.country;
    }

    // If missing, use Geocoder
    if (!city || !country) {
      const geocoder = new google.maps.Geocoder();
      const res = await geocoder.geocode({ location: { lat, lng } });
      const comp = res.results?.[0]?.address_components;
      if (comp) {
        const parsed = parseCityCountry(comp);
        city = city || parsed.city;
        country = country || parsed.country;
      }
    }

    onChange({ city, country, lat, lng });
  }, [onChange]);

  const onMapClick = useCallback(
    async (e: google.maps.MapMouseEvent) => {
      if (!e.latLng) return;
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      setMarker({ lat, lng });

      const geocoder = new google.maps.Geocoder();
      const res = await geocoder.geocode({ location: { lat, lng } });
      const comp = res.results?.[0]?.address_components;
      let city = '';
      let country = '';
      if (comp) {
        const parsed = parseCityCountry(comp);
        city = parsed.city;
        country = parsed.country;
      }
      onChange({ city, country, lat, lng });
    },
    [onChange]
  );

  if (!isLoaded) {
    return (
      <div className='rounded-xl shadow-lg bg-gray-50 p-4 text-sm text-gray-600'>
        Loading map…
      </div>
    );
  }

  return (
    <div className='space-y-3'>
      <label className='block text-sm font-medium text-gray-700'>
        <h3 className='text-lg font-semibold'>Event Location</h3>
      </label>
      <Autocomplete
        onLoad={(ac) => (acRef.current = ac)}
        onPlaceChanged={onPlaceChanged}
      >
        <input
          className='w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-600'
          placeholder='Search city, venue, address…'
        />
      </Autocomplete>

      <div className='overflow-hidden rounded-xl border border-gray-300'>
        <GoogleMap
          onLoad={onLoadMap}
          mapContainerStyle={containerStyle}
          center={center}
          zoom={marker ? 13 : 8}
          onClick={onMapClick}
          options={{ streetViewControl: false, mapTypeControl: false }}
        >
          {marker && <Marker position={marker} />}
        </GoogleMap>
      </div>

      {value && (
        <p className='text-sm text-gray-600'>
          Selected:{' '}
          <span className='font-medium'>
            {value.city || '—'}, {value.country || '—'}
          </span>{' '}
          ({value.lat.toFixed(4)}, {value.lng.toFixed(4)})
        </p>
      )}
    </div>
  );
}
