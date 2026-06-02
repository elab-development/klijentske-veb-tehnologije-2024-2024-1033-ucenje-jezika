import { Link } from 'react-router-dom';
import {
  CalendarDays,
  ListTodo,
  BarChart3,
  Plus,
  MoveRight,
  CheckCircle2,
} from 'lucide-react';

import { useTasks } from '../store/useTasks';
import { FeatureCard } from '../components/home/FeatureCard';

export default function HomePage() {
  const tasks = useTasks((s) => s.tasks);
  const backlogCount = tasks.filter(
    (t) => t.status === 'created' && !t.scheduledDate
  ).length;
  const doneCount = tasks.filter((t) => t.status === 'done').length;

  return (
    <div className='mx-auto max-w-6xl space-y-10'>
      <section className='overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-sky-50 via-indigo-50 to-white p-8 shadow-sm md:p-12'>
        <div className='flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between'>
          <div className='max-w-2xl'>
            <div className='mb-3 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/60 px-3 py-1 text-xs font-medium text-sky-700'>
              <CalendarDays className='h-4 w-4' />
              Plan your week faster
            </div>
            <h1 className='text-3xl font-bold tracking-tight text-slate-900 md:text-4xl'>
              Planit — your local-first weekly planner
            </h1>
            <p className='mt-3 text-slate-700'>
              Create tasks, drag them onto your week, and track productivity —
              all saved locally. Connect Google Calendar and overlay your events
              and public holidays.
            </p>

            <div className='mt-6 flex flex-wrap items-center gap-3'>
              <Link
                to='/add-task'
                className='inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500'
              >
                <Plus className='h-4 w-4' />
                Add Task
              </Link>
              <Link
                to='/planner'
                className='inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50'
              >
                Open Planner
                <MoveRight className='h-4 w-4' />
              </Link>
              <Link
                to='/productivity'
                className='inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50'
              >
                Productivity
                <BarChart3 className='h-4 w-4' />
              </Link>
            </div>
          </div>

          <div className='grid w-full max-w-sm grid-cols-2 gap-3 rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm md:max-w-xs'>
            <div className='rounded-lg border border-slate-100 p-3'>
              <p className='text-2xl font-bold text-slate-900'>
                {backlogCount}
              </p>
              <p className='text-xs text-slate-600'>Backlog tasks</p>
            </div>
            <div className='rounded-lg border border-slate-100 p-3'>
              <p className='flex items-center justify-center gap-1 text-2xl font-bold text-emerald-600'>
                <CheckCircle2 className='h-5 w-5' />
                {doneCount}
              </p>
              <p className='text-xs text-slate-600'>Done total</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className='mb-4 text-lg font-semibold text-slate-900'>
          What you can do
        </h2>
        <div className='grid gap-4 md:grid-cols-3'>
          <FeatureCard
            icon={<ListTodo className='h-5 w-5 text-sky-600' />}
            title='Create & backlog'
            desc='Add tasks quickly and keep them in your backlog until you’re ready to schedule.'
            to='/add-task'
            cta='Add a task'
          />
          <FeatureCard
            icon={<CalendarDays className='h-5 w-5 text-sky-600' />}
            title='Drag onto your week'
            desc='Use the weekly planner to drag tasks to specific days. Works great on desktop and mobile.'
            to='/planner'
            cta='Open planner'
          />
          <FeatureCard
            icon={<BarChart3 className='h-5 w-5 text-sky-600' />}
            title='Track productivity'
            desc='See how you’re doing over time. Mark tasks done and review your progress.'
            to='/productivity'
            cta='View insights'
          />
        </div>
      </section>

      <section className='rounded-xl border border-slate-200 bg-white p-6 shadow-sm'>
        <h2 className='mb-3 text-lg font-semibold text-slate-900'>
          How it works
        </h2>
        <ol className='space-y-2 text-sm text-slate-700'>
          <li>
            <span className='font-semibold'>1.</span> Create tasks in{' '}
            <Link
              to='/add-task'
              className='font-medium text-sky-700 hover:underline'
            >
              Add Task
            </Link>
            .
          </li>
          <li>
            <span className='font-semibold'>2.</span> Go to{' '}
            <Link
              to='/planner'
              className='font-medium text-sky-700 hover:underline'
            >
              Planner
            </Link>{' '}
            and drag tasks from Backlog to a specific day.
          </li>
          <li>
            <span className='font-semibold'>3.</span> Mark tasks as done, or
            unschedule to return them to Backlog.
          </li>
        </ol>
      </section>
    </div>
  );
}
