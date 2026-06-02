import { useCallback, useMemo, useRef, useState } from 'react';
import { ensureGoogleReady } from '../integrations/googleCalendar';
import type { GCalEvent } from './useGoogleCalendar';

const HOLIDAY_CAL_ID_RS_EN =
  'en.rs.official#holiday@group.v.calendar.google.com';

export function useHolidayCalendar(calendarId: string = HOLIDAY_CAL_ID_RS_EN) {
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState<GCalEvent[]>([]);
  const [error, setError] = useState<string | null>(null);

  const lastRangeRef = useRef<string | null>(null);

  const fetchWeek = useCallback(
    async (timeMinISO: string, timeMaxISO: string) => {
      const key = `${calendarId}|${timeMinISO}|${timeMaxISO}`;
      if (lastRangeRef.current === key) return; // de-dupe
      lastRangeRef.current = key;

      try {
        setError(null);
        setLoading(true);
        await ensureGoogleReady();
        const res = await window.gapi.client.calendar.events.list({
          calendarId,
          timeMin: timeMinISO,
          timeMax: timeMaxISO,
          singleEvents: true,
          orderBy: 'startTime',
          maxResults: 200,
          showDeleted: false,
        });
        setEvents(res.result.items ?? []);
      } catch (e: any) {
        setError(e?.message || 'Failed to fetch holiday events');
      } finally {
        setLoading(false);
      }
    },
    [calendarId]
  );

  return useMemo(
    () => ({ loading, events, error, fetchWeek }),
    [loading, events, error, fetchWeek]
  );
}
