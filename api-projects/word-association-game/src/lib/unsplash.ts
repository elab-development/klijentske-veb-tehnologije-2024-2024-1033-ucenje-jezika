export type UnsplashPhoto = {
  id: string;
  alt_description: string | null;
  description: string | null;
  urls: { small: string; regular: string; full: string };
  links: { html: string; download_location: string };
  user: { name: string; username: string; links: { html: string } };
};

const BASE = 'https://api.unsplash.com';

const KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY as string;
const APP_NAME =
  (import.meta.env.VITE_UNSPLASH_APP_NAME as string) || 'Word Association Game';

if (!KEY) {
  console.warn('Missing VITE_UNSPLASH_ACCESS_KEY; Unsplash calls will fail.');
}

function headers() {
  return { Authorization: `Client-ID ${KEY}` };
}

export async function fetchRandomPhoto(
  query: string,
  opts?: {
    orientation?: 'landscape' | 'portrait' | 'squarish';
    signal?: AbortSignal;
  }
): Promise<UnsplashPhoto | null> {
  const url = new URL(`${BASE}/photos/random`);
  if (query) url.searchParams.set('query', query);
  url.searchParams.set('orientation', opts?.orientation ?? 'landscape');
  url.searchParams.set('content_filter', 'high');
  url.searchParams.set('count', '1');

  const res = await fetch(url.toString(), {
    headers: headers(),
    signal: opts?.signal,
  });
  if (!res.ok) {
    console.error('Unsplash random error', res.status, await res.text());
    return null;
  }

  const data = await res.json();
  const photo: UnsplashPhoto | undefined = Array.isArray(data) ? data[0] : data;
  return photo ?? null;
}

export function buildAttribution(photo: UnsplashPhoto) {
  const userUrl = `${photo.user.links.html}?utm_source=${encodeURIComponent(
    APP_NAME
  )}&utm_medium=referral`;
  const upsUrl = `https://unsplash.com/?utm_source=${encodeURIComponent(
    APP_NAME
  )}&utm_medium=referral`;
  return { userName: photo.user.name, userUrl, upsUrl };
}
