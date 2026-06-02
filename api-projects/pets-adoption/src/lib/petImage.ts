// src/lib/petImage.ts
import type { Category } from '../domain/pets';

type PexelsPhoto = {
  id: number;
  alt?: string | null;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
};
type PexelsSearchResponse = {
  total_results: number;
  photos: PexelsPhoto[];
};

function buildQuery(category: Category, breed?: string) {
  const cat = (category as string) || 'pet';
  const b = (breed ?? '').trim().toLowerCase();
  const ignore = ['mixed', 'mix', 'domestic shorthair', 'domestic longhair'];
  const useBreed = b && !ignore.some((w) => b.includes(w));
  return useBreed ? `${cat} ${b}` : `${cat}`;
}

export async function fetchPexelsPhotoUrl(
  category: Category,
  breed?: string
): Promise<string> {
  const apiKey = import.meta.env.VITE_PEXELS_API_KEY as string | undefined;
  if (!apiKey) {
    if (import.meta.env.DEV) console.warn('Missing VITE_PEXELS_API_KEY');
    return '';
  }

  const params = new URLSearchParams({
    query: buildQuery(category, breed),
    per_page: '1',
    orientation: 'landscape',
    locale: 'en-US',
  });

  try {
    const res = await fetch(
      `https://api.pexels.com/v1/search?${params.toString()}`,
      {
        headers: { Authorization: apiKey },
      }
    );
    if (!res.ok) return '';

    const data = (await res.json()) as PexelsSearchResponse;
    const p = data.photos?.[0];
    return (
      p?.src?.landscape ||
      p?.src?.large ||
      p?.src?.large2x ||
      p?.src?.medium ||
      ''
    );
  } catch {
    return '';
  }
}
