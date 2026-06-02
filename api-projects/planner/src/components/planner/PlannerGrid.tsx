import { useMemo, useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  LogIn,
  RefreshCw,
} from 'lucide-react';

import {
  addDays,
  startOfWeek,
  endOfWeek,
  formatWeekRangeLabel,
  toISODateLocalFromString,
} from '../../lib/date';
import DayRow from './DayRow';
import { useGoogleCalendar } from '../../hooks/useGoogleCalendar';
import { useHolidayCalendar } from '../../hooks/useHolidayCalendar';
import type { GCalEvent } from '../../hooks/useGoogleCalendar';

function keyFromDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function toISOStartOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x.toISOString();
}
function toISOStartOfNextDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  x.setDate(x.getDate() + 1);
  return x.toISOString();
}

function eventDayKey(ev: GCalEvent): string | undefined {
  if (ev.start?.date) return ev.start.date;
  const dt = ev.start?.dateTime;
  if (!dt) return undefined;
  return toISODateLocalFromString(dt);
}

export default function PlannerGrid() {
  const [anchor, setAnchor] = useState<Date>(() => new Date());

  const weekStart = useMemo(() => startOfWeek(anchor, 1), [anchor]);
  const weekEnd = useMemo(() => endOfWeek(anchor, 1), [anchor]);
  const days = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)),
    [weekStart]
  );

  const timeMinISO = toISOStartOfDay(weekStart);
  const timeMaxISO = toISOStartOfNextDay(weekEnd);

  const {
    connected,
    loading,
    events,
    error,
    bootstrap,
    fetchWeek,
    connectAndFetch,
  } = useGoogleCalendar();

  const { events: holEvents, fetchWeek: fetchHolidayWeek } =
    useHolidayCalendar();

  useEffect(() => {
    bootstrap();
  }, [bootstrap]);

  useEffect(() => {
    if (connected) {
      fetchWeek(timeMinISO, timeMaxISO);
    }
    fetchHolidayWeek(timeMinISO, timeMaxISO);
  }, [connected, timeMinISO, timeMaxISO, fetchWeek, fetchHolidayWeek]);

  const eventsByDay = useMemo(() => {
    const map: Record<string, GCalEvent[]> = {};
    for (const ev of events) {
      const key = eventDayKey(ev);
      if (!key) continue;
      (map[key] ||= []).push(ev);
    }
    return map;
  }, [events]);

  const holidaysByDay = useMemo(() => {
    const map: Record<string, GCalEvent[]> = {};
    for (const ev of holEvents) {
      const key = eventDayKey(ev);
      if (!key) continue;
      (map[key] ||= []).push(ev);
    }
    return map;
  }, [holEvents]);

  const goPrevWeek = () => setAnchor((d) => addDays(d, -7));
  const goNextWeek = () => setAnchor((d) => addDays(d, +7));
  const goToday = () => setAnchor(new Date());

  return (
    <section className='min-h-[60vh] rounded-xl border border-slate-200 bg-white p-4 shadow-sm'>
      <div className='mb-4 flex flex-wrap items-center justify-between gap-3'>
        <div className='flex items-center gap-2'>
          <CalendarDays className='h-5 w-5 text-sky-600' />
          <h1 className='text-lg font-semibold text-slate-800'>
            {formatWeekRangeLabel(weekStart, weekEnd)}
          </h1>
        </div>

        <div className='flex items-center gap-2'>
          {!connected ? (
            <button
              onClick={() => connectAndFetch(timeMinISO, timeMaxISO)}
              className='inline-flex items-center gap-2 rounded-lg bg-sky-600 px-3 py-2 text-sm font-semibold text-white hover:bg-sky-700'
              title='Connect Google Calendar'
            >
              <LogIn className='h-4 w-4' />
              Connect Calendar
            </button>
          ) : (
            <button
              onClick={() => fetchWeek(timeMinISO, timeMaxISO)}
              className='inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50'
              title='Refresh Google events'
              aria-label='Refresh'
              disabled={loading}
            >
              <RefreshCw className='h-4 w-4' />
              Refresh
            </button>
          )}

          <button
            onClick={goPrevWeek}
            className='inline-flex items-center rounded-lg border border-slate-200 bg-white p-2 hover:bg-slate-50'
            aria-label='Previous week'
            title='Previous week'
          >
            <ChevronLeft className='h-5 w-5' />
          </button>
          <button
            onClick={goToday}
            className='rounded-lg bg-sky-600 px-3 py-2 text-sm font-semibold text-white hover:bg-sky-700'
          >
            Today
          </button>
          <button
            onClick={goNextWeek}
            className='inline-flex items-center rounded-lg border border-slate-200 bg-white p-2 hover:bg-slate-50'
            aria-label='Next week'
            title='Next week'
          >
            <ChevronRight className='h-5 w-5' />
          </button>
        </div>
      </div>

      {error && (
        <div className='mb-3 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700'>
          {error}
        </div>
      )}

      <div className='grid grid-cols-1 gap-3'>
        {days.map((d) => {
          const key = keyFromDate(d);
          return (
            <DayRow
              key={d.toISOString()}
              date={d}
              events={eventsByDay[key] || []}
              holidays={holidaysByDay[key] || []}
            />
          );
        })}
      </div>
    </section>
  );
}
