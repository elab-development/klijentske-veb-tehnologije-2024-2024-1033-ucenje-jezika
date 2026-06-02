import { useEffect, useState } from 'react';
import fallbackPet from '../../assets/pet-placeholder.avif';

type UnsplashPhoto = {
  id: string;
  urls: { regular: string; full: string; small: string };
  alt_description: string | null;
  description: string | null;
};

type Props = {
  query?: string;
  imgClassName?: string;
};

export default function AdoptedPetImage({
  query = 'adopted pet',
  imgClassName = 'h-full w-full object-cover',
}: Props) {
  const [src, setSrc] = useState<string | null>(null);
  const [alt, setAlt] = useState('Adopted pet');
  const [loading, setLoading] = useState(true);
  const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY as
    | string
    | undefined;

  useEffect(() => {
    async function fetchImage() {
      if (!accessKey) {
        setSrc(fallbackPet);
        setAlt('Adopted pet (fallback)');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const params = new URLSearchParams({
          query,
          orientation: 'landscape',
          count: '1',
        });
        const res = await fetch(
          `https://api.unsplash.com/photos/random?${params.toString()}`,
          {
            headers: { Authorization: `Client-ID ${accessKey}` },
            cache: 'no-store',
          }
        );
        if (!res.ok) throw new Error('Unsplash error');

        const data: UnsplashPhoto | UnsplashPhoto[] = await res.json();
        const photo = Array.isArray(data) ? data[0] : data;
        if (photo?.urls?.regular) {
          setSrc(photo.urls.regular);
          setAlt(
            photo.alt_description ||
              photo.description ||
              'Adopted pet from Unsplash'
          );
        } else {
          setSrc(fallbackPet);
          setAlt('Adopted pet (fallback)');
        }
      } catch {
        setSrc(fallbackPet);
        setAlt('Adopted pet (fallback)');
      } finally {
        setLoading(false);
      }
    }
    fetchImage();
  }, [query, accessKey]);

  if (loading)
    return (
      <div
        className={`animate-pulse bg-slate-200 ${imgClassName}`}
        aria-label='Loading image…'
      />
    );

  return (
    <img
      src={src || fallbackPet}
      alt={alt}
      className={imgClassName}
      loading='lazy'
    />
  );
}
