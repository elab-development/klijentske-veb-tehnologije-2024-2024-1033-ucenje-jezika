import { useMemo } from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from 'chart.js';

import { useTasks } from '../store/useTasks';
import { addDays, startOfWeek } from '../lib/date';
import ChartCard from '../components/charts/ChartCard';
import {
  capitalize,
  buildLastNWeeks,
  sameDay,
  formatWeekLabel,
} from '../lib/analytics';
import { COLORS } from '../lib/chartTheme';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
);

const STATUSES = ['created', 'pending', 'done', 'canceled'] as const;
const PRIORITIES = ['low', 'medium', 'high', 'urgent'] as const;

export default function ProductivityPage() {
  const tasks = useTasks((s) => s.tasks);

  const statusData = useMemo(() => {
    const counts = Object.fromEntries(STATUSES.map((s) => [s, 0])) as Record<
      (typeof STATUSES)[number],
      number
    >;
    for (const t of tasks) counts[t.status] = (counts[t.status] ?? 0) + 1;

    const bg = STATUSES.map((s) => COLORS.status[s].bg);
    const br = STATUSES.map((s) => COLORS.status[s].border);

    return {
      labels: STATUSES.map(capitalize),
      datasets: [
        {
          data: STATUSES.map((s) => counts[s]),
          backgroundColor: bg,
          borderColor: br,
          borderWidth: 1,
          hoverOffset: 6,
        },
      ],
    };
  }, [tasks]);

  const priorityData = useMemo(() => {
    const counts = Object.fromEntries(PRIORITIES.map((p) => [p, 0])) as Record<
      (typeof PRIORITIES)[number],
      number
    >;
    for (const t of tasks) counts[t.priority] = (counts[t.priority] ?? 0) + 1;

    const bg = PRIORITIES.map((p) => COLORS.priority[p].bg);
    const br = PRIORITIES.map((p) => COLORS.priority[p].border);

    return {
      labels: PRIORITIES.map(capitalize),
      datasets: [
        {
          data: PRIORITIES.map((p) => counts[p]),
          backgroundColor: bg,
          borderColor: br,
          borderWidth: 1,
          hoverOffset: 6,
        },
      ],
    };
  }, [tasks]);

  const createdPerWeek = useMemo(() => {
    const weeks = buildLastNWeeks(8);
    const labels = weeks.map((w) => formatWeekLabel(w));
    const counts = weeks.map(() => 0);

    for (const t of tasks) {
      const created = new Date(t.createdAt);
      const weekStart = startOfWeek(created, 1);
      const idx = weeks.findIndex((w) => sameDay(w, weekStart));
      if (idx >= 0) counts[idx] += 1;
    }

    return {
      labels,
      datasets: [
        {
          label: 'Tasks created',
          data: counts,
          borderColor: COLORS.series.createdPerWeek.border,
          backgroundColor: COLORS.series.createdPerWeek.bg,
          fill: true,
          pointRadius: 3,
          tension: 0.35,
        },
      ],
    };
  }, [tasks]);

  const scheduledThisWeek = useMemo(() => {
    const anchor = new Date();
    const weekStartDate = startOfWeek(anchor, 1);
    const days = Array.from({ length: 7 }, (_, i) => addDays(weekStartDate, i));
    const labels = days.map((d) =>
      d.toLocaleDateString([], { weekday: 'short' })
    );
    const iso = (d: Date) =>
      `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
        d.getDate()
      ).padStart(2, '0')}`;
    const counts = days.map(() => 0);

    for (const t of tasks) {
      if (!t.scheduledDate) continue;
      const idx = days.findIndex((d) => iso(d) === t.scheduledDate);
      if (idx >= 0) counts[idx] += 1;
    }

    return {
      labels,
      datasets: [
        {
          label: 'Scheduled this week',
          data: counts,
          backgroundColor: COLORS.series.scheduledBar.bg,
          borderColor: COLORS.series.scheduledBar.border,
          borderWidth: 1,
        },
      ],
    };
  }, [tasks]);

  return (
    <div className='mx-auto max-w-6xl space-y-6'>
      <header>
        <h1 className='text-2xl font-bold text-slate-900'>Productivity</h1>
        <p className='mt-1 text-sm text-slate-600'>
          Snapshot and trends based on your local tasks.
        </p>
      </header>

      <div className='grid gap-6 md:grid-cols-2'>
        <ChartCard
          title='Tasks by Status'
          hint='Current distribution of task statuses.'
        >
          <Doughnut
            data={statusData}
            options={{
              plugins: { legend: { position: 'bottom' } },
              maintainAspectRatio: false,
            }}
          />
        </ChartCard>

        <ChartCard
          title='Tasks by Priority'
          hint='Current distribution across priority levels.'
        >
          <Doughnut
            data={priorityData}
            options={{
              plugins: { legend: { position: 'bottom' } },
              maintainAspectRatio: false,
            }}
          />
        </ChartCard>

        <ChartCard
          title='Tasks Created per Week'
          hint='Last 8 weeks of task creation.'
        >
          <Line
            data={createdPerWeek}
            options={{
              scales: { y: { beginAtZero: true, ticks: { precision: 0 } } },
              plugins: { legend: { display: false } },
              maintainAspectRatio: false,
            }}
          />
        </ChartCard>

        <ChartCard
          title='Scheduled This Week'
          hint='How many tasks are assigned to each day this week.'
        >
          <Bar
            data={scheduledThisWeek}
            options={{
              scales: { y: { beginAtZero: true, ticks: { precision: 0 } } },
              plugins: { legend: { display: false } },
              maintainAspectRatio: false,
            }}
          />
        </ChartCard>
      </div>
    </div>
  );
}
