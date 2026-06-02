import { addDays, startOfWeek } from './date';

export function capitalize(s: string): string {
  return s ? s.charAt(0).toUpperCase() + s.slice(1) : s;
}

export function buildLastNWeeks(n: number): Date[] {
  const today = new Date();
  const start = startOfWeek(today, 1);
  return Array.from({ length: n }, (_, i) => addDays(start, -7 * (n - 1 - i)));
}

export function sameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function formatWeekLabel(d: Date): string {
  const month = d.toLocaleString([], { month: 'short' });
  return `Week of ${month} ${d.getDate()}`;
}
