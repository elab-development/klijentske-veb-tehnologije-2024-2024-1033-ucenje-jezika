import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IoIosLink } from 'react-icons/io';
import { FaStar, FaPhone } from 'react-icons/fa';

import { fetchCafeDetails } from '../api/google/PlacesServiceAdapter';
import { CatImageService } from '../api/catapi/CatImageService';
import type { ICatCafeDetails } from '../types/cafe';
import Reservations from '../components/cafes/Reservations';

export default function Cafe() {
  const { id } = useParams<{ id: string }>();

  const [cafe, setCafe] = useState<ICatCafeDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [accordionOpen, setAccordionOpen] = useState(false);

  const [fallbackPhotos, setFallbackPhotos] = useState<string[]>([]);
  const catService = useMemo(() => new CatImageService(), []);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchCafeDetails(id)
      .then((data) => setCafe(data))
      .catch((err) => setError(err.message ?? 'Failed to load cafe.'))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    let alive = true;
    async function loadCats() {
      if (!cafe) return;
      if (cafe.photos && cafe.photos.length > 0) {
        setFallbackPhotos([]);
        return;
      }
      try {
        const urls = await catService.fetchRandom(6);
        if (alive) setFallbackPhotos(urls);
      } catch {
        if (alive) setFallbackPhotos([]);
      }
    }
    loadCats();
    return () => {
      alive = false;
    };
  }, [cafe, catService]);

  if (loading) return <div className='p-6'>Loading café...</div>;
  if (error) return <div className='p-6 text-red-600'>{error}</div>;
  if (!cafe) return <div className='p-6'>No data found.</div>;

  const hasCoords = Number.isFinite(cafe.lat) && Number.isFinite(cafe.lng);

  const photosToShow =
    cafe.photos && cafe.photos.length > 0 ? cafe.photos : fallbackPhotos;

  return (
    <section className='min-h-[calc(100vh-4rem)] bg-pink-50'>
      <div className='container mx-auto px-6 py-8'>
        <div className='bg-white rounded-xl shadow-lg p-6 md:grid md:grid-cols-3 md:gap-6'>
          <div className='space-y-6 mb-6 md:mb-0'>
            {hasCoords && (
              <div className='w-full h-48 rounded-lg overflow-hidden shadow-sm'>
                <iframe
                  title={`${cafe.name} map`}
                  src={`https://www.google.com/maps?q=${cafe.lat},${cafe.lng}&hl=en&z=15&output=embed`}
                  width='100%'
                  height='100%'
                  style={{ border: 0 }}
                  loading='lazy'
                />
              </div>
            )}

            {cafe.openingHours && cafe.openingHours.length > 0 && (
              <div className='rounded-lg shadow-sm'>
                <button
                  onClick={() => setAccordionOpen(!accordionOpen)}
                  className='flex w-full justify-between items-center px-4 py-3 font-semibold text-gray-800'
                >
                  <span>Opening Hours</span>
                  <span
                    className={`transform transition-transform ${
                      accordionOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                  >
                    ▼
                  </span>
                </button>
                {accordionOpen && (
                  <div className='px-4 pb-3 text-gray-700 space-y-1'>
                    {cafe.openingHours.map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                  </div>
                )}
              </div>
            )}

            <Reservations cafeId={cafe.id} />
          </div>

          <div className='md:col-span-2'>
            <h1 className='text-3xl font-bold text-gray-800 mb-4'>
              {cafe.name}
            </h1>
            <p className='text-gray-600 mb-2'>{cafe.address}</p>

            {cafe.phoneNumber && (
              <p className='text-gray-600 mb-2 flex items-center gap-2'>
                <FaPhone /> {cafe.phoneNumber}
              </p>
            )}

            {cafe.website && (
              <p className='text-gray-600 mb-2 flex items-center gap-2'>
                <IoIosLink />
                <a
                  href={cafe.website}
                  target='_blank'
                  rel='noreferrer'
                  className='text-pink-600 hover:underline'
                >
                  {cafe.name}
                </a>
              </p>
            )}

            {cafe.rating && (
              <p className='text-gray-700 mb-4 flex items-center gap-2'>
                <FaStar className='text-yellow-400' /> {cafe.rating} (
                {cafe.ratingsCount} reviews)
              </p>
            )}

            {photosToShow.length > 0 && (
              <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                {photosToShow.map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt={`${cafe.name} photo ${idx + 1}`}
                    className='rounded-lg object-cover w-full h-60'
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
