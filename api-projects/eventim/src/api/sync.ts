import type { IArtist, IEvent } from '../data/types';
import { fetchTicketmasterEvents, type TMFetchOptions } from './ticketmaster';
import { useEventim } from '../store/eventim';

function dedupeById<T extends { id: string }>(arr: T[]): T[] {
  const seen = new Set<string>();
  const out: T[] = [];
  for (const x of arr) {
    if (!seen.has(x.id)) {
      seen.add(x.id);
      out.push(x);
    }
  }
  return out;
}

export async function loadFromTicketmasterAndSet(opts?: TMFetchOptions) {
  const { artists, events } = await fetchTicketmasterEvents(opts);
  useEventim.getState().setCatalog(
    {
      artists: dedupeById<IArtist>(artists),
      events: dedupeById<IEvent>(events),
    },
    { source: 'ticketmaster' }
  );
}
