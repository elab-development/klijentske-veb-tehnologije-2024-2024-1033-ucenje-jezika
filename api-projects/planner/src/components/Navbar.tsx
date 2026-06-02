import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { CalendarDays, Plus, Menu, X } from 'lucide-react';

const navigationLinks = [
  { to: '/', label: 'Home' },
  { to: '/planner', label: 'Planner' },
  { to: '/productivity', label: 'Productivity' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className='sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur'>
      <div className='mx-auto flex max-w-6xl items-center justify-between px-4 py-3'>
        <Link to='/' className='flex items-center gap-2'>
          <CalendarDays className='h-7 w-7 text-sky-600' />
          <span className='text-lg font-semibold tracking-tight text-slate-800'>
            PlanIt
          </span>
        </Link>

        <nav className='hidden md:flex items-center justify-center gap-6'>
          {navigationLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                [
                  'text-sm font-medium transition-colors',
                  isActive
                    ? 'text-sky-600'
                    : 'text-slate-600 hover:text-slate-900',
                ].join(' ')
              }
              end={link.to === '/'}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className='hidden md:flex'>
          <Link
            to='/add-task'
            className='inline-flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-2 text-white shadow hover:bg-sky-700 transition'
          >
            <Plus className='h-5 w-5' />
            <span className='text-sm font-semibold'>Add Task</span>
          </Link>
        </div>

        <button
          type='button'
          onClick={() => setOpen(true)}
          className='md:hidden inline-flex items-center justify-center rounded-lg p-2 hover:bg-slate-100'
          aria-label='Open menu'
        >
          <Menu className='h-6 w-6 text-slate-800' />
        </button>
      </div>

      {open && (
        <div className='md:hidden fixed inset-0 z-20'>
          <div
            className='absolute inset-0 bg-black/30'
            onClick={() => setOpen(false)}
          />
          <div className='absolute right-0 top-0 h-full w-full z-50 bg-white shadow-xl'>
            <div className='flex items-center justify-between border-b border-slate-200 px-4 py-3'>
              <div className='flex items-center gap-2'>
                <CalendarDays className='h-6 w-6 text-sky-600' />
                <span className='text-base font-semibold text-slate-800'>
                  PlanIt
                </span>
              </div>
              <button
                type='button'
                onClick={() => setOpen(false)}
                className='inline-flex items-center justify-center rounded-lg p-2 hover:bg-slate-100'
                aria-label='Close menu'
              >
                <X className='h-6 w-6 text-slate-800' />
              </button>
            </div>

            <nav className='flex flex-col gap-1 p-3 bg-white shadow-md rounded-b-xl'>
              {navigationLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    [
                      'rounded-lg px-3 py-2 text-sm font-medium',
                      isActive
                        ? 'bg-sky-50 text-sky-700'
                        : 'text-slate-700 hover:bg-slate-100',
                    ].join(' ')
                  }
                  end={link.to === '/'}
                >
                  {link.label}
                </NavLink>
              ))}

              <Link
                to='/add-task'
                onClick={() => setOpen(false)}
                className='mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 py-2 text-white shadow hover:bg-sky-700 transition'
              >
                <Plus className='h-5 w-5' />
                <span className='text-sm font-semibold'>Add Task</span>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
