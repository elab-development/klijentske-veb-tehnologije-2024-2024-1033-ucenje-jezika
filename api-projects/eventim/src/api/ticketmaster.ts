import type { IArtist, IEvent } from '../data/types';

const TM_BASE = 'https://app.ticketmaster.com/discovery/v2';
const KEY = import.meta.env.VITE_TICKETMASTER_KEY;

export type TMFetchOptions = {
  countryCode?: string;
  keyword?: string;
  size?: number;
};

export async function fetchTicketmasterEvents(opts?: TMFetchOptions) {
  if (!KEY) throw new Error('Missing VITE_TICKETMASTER_KEY in .env');

  const countryCode = opts?.countryCode ?? 'US';
  const keyword = opts?.keyword ?? 'music';
  const size = 200;

  const url = `${TM_BASE}/events.json?apikey=${KEY}&classificationName=music&keyword=${encodeURIComponent(
    keyword
  )}&countryCode=${countryCode}&size=${size}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Ticketmaster error: ${res.status}`);
  const json = await res.json();

  const events: IEvent[] = (json._embedded?.events ?? []).map((e: any) => ({
    id: `tm-${e.id}`,
    title: e.name,
    type: 'concert',
    datetime: e?.dates?.start?.dateTime ?? new Date().toISOString(),
    venue: {
      name: e._embedded?.venues?.[0]?.name ?? 'Unknown venue',
      city: e._embedded?.venues?.[0]?.city?.name ?? '—',
      country: e._embedded?.venues?.[0]?.country?.name ?? '—',
    },
    artistIds: (e._embedded?.attractions ?? []).map((a: any) => `tm-${a.id}`),
    imageUrl: e.images?.[0]?.url,
    externalIds: { ticketmasterEventId: e.id },
    description: e.info || e.pleaseNote || '',
  }));

  // Normalize artists (attractions)
  const artistMap: Record<string, IArtist> = {};
  for (const e of json._embedded?.events ?? []) {
    for (const a of e._embedded?.attractions ?? []) {
      const id = `tm-${a.id}`;
      if (!artistMap[id]) {
        artistMap[id] = {
          id,
          name: a.name,
          imageUrl: a.images?.[0]?.url,
          externalIds: { ticketmasterAttractionId: a.id },
        };
      }
    }
  }

  return { artists: Object.values(artistMap), events };
}
