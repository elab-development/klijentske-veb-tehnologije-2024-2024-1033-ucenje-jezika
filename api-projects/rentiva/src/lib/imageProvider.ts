const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_KEY as string | undefined;
const PEXELS_KEY = import.meta.env.VITE_PEXELS_KEY as string | undefined;

type Provider = 'unsplash' | 'pexels';

async function fromUnsplash(query: string): Promise<string | null> {
  if (!UNSPLASH_KEY) return null;
  const url = new URL('https://api.unsplash.com/search/photos');
  url.searchParams.set('query', query);
  url.searchParams.set('orientation', 'landscape');
  url.searchParams.set('per_page', '5');

  try {
    const res = await fetch(url.toString(), {
      headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` },
    });
    if (!res.ok) return null;
    const data = await res.json();
    const first = data?.results?.[0];
    return first?.urls?.regular ?? first?.urls?.small ?? null;
  } catch {
    return null;
  }
}

async function fromPexels(query: string): Promise<string | null> {
  if (!PEXELS_KEY) return null;
  const url = new URL('https://api.pexels.com/v1/search');
  url.searchParams.set('query', query);
  url.searchParams.set('orientation', 'landscape');
  url.searchParams.set('per_page', '5');

  try {
    const res = await fetch(url.toString(), {
      headers: { Authorization: PEXELS_KEY },
    });
    if (!res.ok) return null;
    const data = await res.json();
    const first = data?.photos?.[0];
    return first?.src?.large ?? first?.src?.medium ?? null;
  } catch {
    return null;
  }
}

export async function getImageForRental(
  name: string,
  city?: string
): Promise<string | null> {
  const providers: Provider[] = ['unsplash', 'pexels'];
  const chosen = providers[Math.floor(Math.random() * providers.length)];

  const query = [name, city, 'apartment house interior real estate']
    .filter(Boolean)
    .join(' ');

  let url: string | null =
    chosen === 'unsplash' ? await fromUnsplash(query) : await fromPexels(query);

  if (!url) {
    url =
      chosen === 'unsplash'
        ? await fromPexels(query)
        : await fromUnsplash(query);
  }

  return url;
}
