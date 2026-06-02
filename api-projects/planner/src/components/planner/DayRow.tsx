import { useMemo, useState } from 'react';
import { CalendarDays, CheckCircle2, Undo2, Flag } from 'lucide-react';
import { useTasks } from '../../store/useTasks';
import { formatDayLabel, toISODate } from '../../lib/date';
import { getDragTaskId } from '../../lib/dnd';
import PriorityBadge from '../tasks/PriorityBadge';
import type { GCalEvent } from '../../hooks/useGoogleCalendar';

type Props = {
  date: Date;
  events?: GCalEvent[];
  holidays?: GCalEvent[];
};

function formatEventTime(ev: GCalEvent): string {
  const s = ev.start?.dateTime;
  const e = ev.end?.dateTime;
  if (!s || !e) return 'All-day';
  const start = new Date(s).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  const end = new Date(e).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  return `${start} – ${end}`;
}

export default function DayRow({ date, events = [], holidays = [] }: Props) {
  const dateISO = useMemo(() => toISODate(date), [date]);

  const tasks = useTasks((s) => s.tasks);
  const markDone = useTasks((s) => s.markDone);
  const unscheduleTask = useTasks((s) => s.unscheduleTask);
  const scheduleTask = useTasks((s) => s.scheduleTask);

  const todays = useMemo(
    () => tasks.filter((t) => t.scheduledDate === dateISO),
    [tasks, dateISO]
  );

  const [dragDepth, setDragDepth] = useState(0);
  const isOver = dragDepth > 0;

  return (
    <div
      onDragEnter={(e) => {
        e.preventDefault();
        setDragDepth((d) => d + 1);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        setDragDepth((d) => Math.max(0, d - 1));
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
      }}
      onDrop={(e) => {
        e.preventDefault();
        setDragDepth(0);
        const taskId = getDragTaskId(e);
        if (taskId) scheduleTask(taskId, dateISO);
      }}
      className={[
        'rounded-xl border bg-white p-4 shadow-sm transition',
        isOver ? 'border-sky-300 ring-2 ring-sky-200' : 'border-slate-200',
      ].join(' ')}
      aria-dropeffect='move'
    >
      <div className='mb-3 flex items-center justify-between'>
        <h3 className='text-sm font-semibold text-slate-800'>
          {formatDayLabel(date)}
        </h3>
        <span className='text-xs text-slate-500'>
          {todays.length} task{todays.length !== 1 ? 's' : ''}
        </span>
      </div>

      {todays.length === 0 ? (
        <div
          className={[
            'rounded-lg border border-dashed p-4 text-center text-sm',
            isOver
              ? 'border-sky-300 text-sky-700 bg-sky-50'
              : 'border-slate-300 text-slate-500',
          ].join(' ')}
        >
          {isOver ? 'Drop to schedule' : 'No tasks assigned to this day.'}
        </div>
      ) : (
        <ul className='space-y-2'>
          {todays.map((t) => (
            <li
              key={t.id}
              className={[
                'flex items-start justify-between gap-3 rounded-lg border p-3 transition',
                t.status === 'done'
                  ? 'border-emerald-200 bg-emerald-50'
                  : 'border-slate-200',
              ].join(' ')}
            >
              <div className='min-w-0'>
                <div className='flex items-center gap-2'>
                  <p className='truncate text-sm font-medium text-slate-900'>
                    {t.title}
                  </p>
                  <PriorityBadge value={t.priority} />
                </div>
                {t.location && (
                  <p className='mt-1 truncate text-xs text-slate-600'>
                    {t.location}
                  </p>
                )}
                {t.description && (
                  <p className='mt-0.5 line-clamp-2 text-xs text-slate-600'>
                    {t.description}
                  </p>
                )}
              </div>

              <div className='flex shrink-0 items-center gap-1'>
                <button
                  onClick={() => markDone(t.id)}
                  className='inline-flex items-center rounded-md p-2 text-emerald-600 hover:bg-emerald-100'
                  title='Mark as done'
                  aria-label='Mark as done'
                >
                  <CheckCircle2 className='h-5 w-5' />
                </button>
                <button
                  onClick={() => unscheduleTask(t.id)}
                  className='inline-flex items-center rounded-md p-2 text-slate-600 hover:bg-slate-100'
                  title='Remove from this date'
                  aria-label='Remove from this date'
                >
                  <Undo2 className='h-5 w-5' />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {holidays.length > 0 && (
        <div className='mt-3'>
          <div className='mb-1 flex items-center gap-2 text-xs font-semibold text-amber-700'>
            <Flag className='h-4 w-4' />
            Public Holidays
          </div>
          <ul className='space-y-1'>
            {holidays.map((ev) => (
              <li
                key={ev.id}
                className='rounded-md border border-amber-200 bg-amber-50 p-2'
                title={ev.summary || '(No title)'}
              >
                <div className='flex items-center justify-between gap-2'>
                  <p className='truncate text-xs font-medium text-slate-900'>
                    {ev.summary || '(No title)'}
                  </p>
                  {ev.start?.dateTime && ev.end?.dateTime && (
                    <span className='shrink-0 text-[11px] text-slate-600'>
                      {formatEventTime(ev)}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {events.length > 0 && (
        <div className='mt-3'>
          <div className='mb-1 flex items-center gap-2 text-xs font-semibold text-sky-700'>
            <CalendarDays className='h-4 w-4' />
            Google Calendar
          </div>
          <ul className='space-y-1'>
            {events.map((ev) => (
              <li
                key={ev.id}
                className='rounded-md border border-sky-200 bg-sky-50 p-2'
                title={ev.summary || '(No title)'}
              >
                <div className='flex items-center justify-between gap-2'>
                  <p className='truncate text-xs font-medium text-slate-900'>
                    {ev.summary || '(No title)'}
                  </p>
                  <span className='shrink-0 text-[11px] text-slate-600'>
                    {formatEventTime(ev)}
                  </span>
                </div>
                {ev.location && (
                  <p className='mt-0.5 truncate text-[11px] text-slate-600'>
                    {ev.location}
                  </p>
                )}
                {ev.htmlLink && (
                  <a
                    href={ev.htmlLink}
                    target='_blank'
                    rel='noreferrer'
                    className='mt-1 inline-block text-[11px] font-medium text-sky-700 hover:underline'
                  >
                    Open in Google Calendar
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
