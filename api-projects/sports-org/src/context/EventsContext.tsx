import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { type Event as EventType } from '../types/event';
import { defaultEvents } from '../data/defaultEvents';

type EventsContextValue = {
  events: EventType[];
  addEvent: (e: EventType) => void;
};

const EventsContext = createContext<EventsContextValue | undefined>(undefined);

function mergeDefaultAndStored(
  defaults: EventType[],
  stored: EventType[] | null
): EventType[] {
  const map = new Map<string, EventType>();
  for (const e of defaults) map.set(e.id, e);
  if (stored && Array.isArray(stored)) {
    for (const e of stored) map.set(e.id, e);
  }
  return Array.from(map.values()).sort((a, b) => {
    const ad = new Date(`${a.date}T${a.time}`).getTime();
    const bd = new Date(`${b.date}T${b.time}`).getTime();
    return ad - bd;
  });
}

export function EventsProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<EventType[]>([]);

  useEffect(() => {
    try {
      const storageEvents = localStorage.getItem('sports.org/events');
      const stored: EventType[] | null = storageEvents
        ? JSON.parse(storageEvents)
        : null;
      setEvents(mergeDefaultAndStored(defaultEvents, stored));
    } catch {
      setEvents(defaultEvents);
    }
  }, []);

  const api = useMemo<EventsContextValue>(
    () => ({
      events,
      addEvent: (e) => {
        setEvents((prev) => {
          if (prev.some((x) => x.id === e.id)) return prev;

          const next = [...prev, e].sort((a, b) => {
            const ad = new Date(`${a.date}T${a.time}`).getTime();
            const bd = new Date(`${b.date}T${b.time}`).getTime();
            return ad - bd;
          });

          try {
            localStorage.setItem('sports.org/events', JSON.stringify(next));
          } catch {}

          return next;
        });
      },
    }),
    [events]
  );

  return (
    <EventsContext.Provider value={api}>{children}</EventsContext.Provider>
  );
}

export function useEvents() {
  const ctx = useContext(EventsContext);
  if (!ctx) throw new Error('useEvents must be used within EventsProvider');
  return ctx;
}
