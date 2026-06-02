import { Link } from 'react-router-dom';
import { CalendarDays } from 'lucide-react';

export default function Footer() {
  return (
    <footer className='mt-12 border-t border-slate-200 bg-white'>
      <div className='mx-auto max-w-6xl px-4 py-8'>
        <div className='flex flex-col items-center justify-between gap-4 md:flex-row'>
          <div className='flex items-center gap-2'>
            <CalendarDays className='h-6 w-6 text-sky-600' />
            <span className='text-sm font-semibold text-slate-800'>PlanIt</span>
          </div>

          <nav className='flex flex-wrap items-center justify-center gap-4 text-sm'>
            <Link to='/' className='text-slate-600 hover:text-slate-900'>
              Home
            </Link>
            <Link to='/planner' className='text-slate-600 hover:text-slate-900'>
              Planner
            </Link>
            <Link
              to='/productivity'
              className='text-slate-600 hover:text-slate-900'
            >
              Productivity
            </Link>
            <Link
              to='/add-task'
              className='text-slate-600 hover:text-slate-900'
            >
              Add Task
            </Link>
          </nav>

          <p className='text-xs text-slate-500'>
            © {new Date().getFullYear()} PlanIt.
          </p>
        </div>
      </div>
    </footer>
  );
}
