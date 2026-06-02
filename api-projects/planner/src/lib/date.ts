export function addDays(d: Date, days: number) {
  const nd = new Date(d);
  nd.setDate(d.getDate() + days);
  return nd;
}

export function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function startOfWeek(date: Date, weekStartsOn: 0 | 1 = 1): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = (day - weekStartsOn + 7) % 7;
  d.setDate(d.getDate() - diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function endOfWeek(date: Date, weekStartsOn: 0 | 1 = 1): Date {
  const start = startOfWeek(date, weekStartsOn);
  const end = addDays(start, 6);
  end.setHours(23, 59, 59, 999);
  return end;
}

export function formatDayLabel(d: Date): string {
  const day = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(d);
  const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(d);
  return `${day} • ${month} ${d.getDate()}`;
}

export function formatWeekRangeLabel(start: Date, end: Date): string {
  const monthStart = new Intl.DateTimeFormat('en-US', {
    month: 'short',
  }).format(start);
  const monthEnd = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
    end
  );
  const year =
    start.getFullYear() === end.getFullYear()
      ? `${start.getFullYear()}`
      : `${start.getFullYear()}–${end.getFullYear()}`;

  if (monthStart === monthEnd) {
    return `${monthStart} ${start.getDate()}–${end.getDate()}, ${year}`;
  }

  return `${monthStart} ${start.getDate()} – ${monthEnd} ${end.getDate()}, ${year}`;
}

export function toISODateLocalFromString(s: string): string {
  const d = new Date(s);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
