import { useCallback, useMemo, useState } from 'react';

import {
  ensureGoogleReady,
  ensureToken,
  listEvents,
} from '../integrations/googleCalendar';

export type GCalEvent = {
  id: string;
  summary?: string;
  start?: { date?: string; dateTime?: string; timeZone?: string };
  end?: { date?: string; dateTime?: string; timeZone?: string };
  htmlLink?: string;
  location?: string;
};

export function useGoogleCalendar() {
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState<GCalEvent[]>([]);
  const [error, setError] = useState<string | null>(null);

  const bootstrap = useCallback(async () => {
    try {
      await ensureGoogleReady();
      const tok = window.gapi?.client?.getToken?.();
      if (tok?.access_token) setConnected(true);
    } catch {}
  }, []);

  const connect = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      await ensureToken(true);
      setConnected(true);
    } catch (e: any) {
      setError(e?.message || 'Authorization failed');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchWeek = useCallback(
    async (timeMinISO: string, timeMaxISO: string) => {
      try {
        setError(null);
        setLoading(true);
        await ensureGoogleReady();
        try {
          const items = await listEvents({
            timeMin: timeMinISO,
            timeMax: timeMaxISO,
            maxResults: 250,
          });
          setEvents(items as GCalEvent[]);
          setConnected(true);
        } catch (err: any) {
          const code = err?.status || err?.result?.error?.code;
          if (code === 401 || code === 403) {
            await ensureToken(false);
            const items = await listEvents({
              timeMin: timeMinISO,
              timeMax: timeMaxISO,
              maxResults: 250,
            });
            setEvents(items as GCalEvent[]);
            setConnected(true);
          } else {
            throw err;
          }
        }
      } catch (e: any) {
        setError(e?.message || 'Failed to fetch events');
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const connectAndFetch = useCallback(
    async (timeMinISO: string, timeMaxISO: string) => {
      await connect();
      await fetchWeek(timeMinISO, timeMaxISO);
    },
    [connect, fetchWeek]
  );

  return useMemo(
    () => ({
      connected,
      loading,
      events,
      error,
      connect,
      fetchWeek,
      bootstrap,
      connectAndFetch,
    }),
    [
      connected,
      loading,
      events,
      error,
      connect,
      fetchWeek,
      bootstrap,
      connectAndFetch,
    ]
  );
}
