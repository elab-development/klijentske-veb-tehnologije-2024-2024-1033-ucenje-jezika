import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Trophy,
  Home,
  PlusCircle,
  Phone,
  CalendarDays,
  Menu,
  X,
} from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className='bg-indigo-600 text-white shadow sticky top-0 z-50'>
      <div className='mx-auto flex max-w-6xl items-center justify-between px-4 py-3'>
        <NavLink to='/' className='flex items-center gap-2 text-lg font-bold'>
          <Trophy className='h-6 w-6' aria-hidden='true' />
          sports.org
        </NavLink>

        <nav className='hidden md:flex items-center gap-2'>
          <NavLink
            to='/'
            end
            className={({ isActive }) =>
              `flex items-center gap-1 px-3 py-2 rounded-md transition ${
                isActive ? 'bg-indigo-800' : 'hover:bg-indigo-700'
              }`
            }
          >
            <Home className='h-4 w-4' aria-hidden='true' /> Home
          </NavLink>

          <NavLink
            to='/events'
            className={({ isActive }) =>
              `flex items-center gap-1 px-3 py-2 rounded-md transition ${
                isActive ? 'bg-indigo-800' : 'hover:bg-indigo-700'
              }`
            }
          >
            <CalendarDays className='h-4 w-4' aria-hidden='true' /> Events
          </NavLink>

          <NavLink
            to='/new'
            className={({ isActive }) =>
              `flex items-center gap-1 px-3 py-2 rounded-md transition ${
                isActive ? 'bg-indigo-800' : 'hover:bg-indigo-700'
              }`
            }
          >
            <PlusCircle className='h-4 w-4' aria-hidden='true' /> Add Event
          </NavLink>

          <NavLink
            to='/contact'
            className={({ isActive }) =>
              `flex items-center gap-1 px-3 py-2 rounded-md transition ${
                isActive ? 'bg-indigo-800' : 'hover:bg-indigo-700'
              }`
            }
          >
            <Phone className='h-4 w-4' aria-hidden='true' /> Contact
          </NavLink>
        </nav>

        <button
          type='button'
          className='md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-white'
          aria-controls='mobile-nav'
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className='sr-only'>Toggle menu</span>
          {open ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
        </button>
      </div>

      <div
        id='mobile-nav'
        className={`md:hidden bg-indigo-700 border-t border-indigo-600 transition-[max-height,opacity] duration-200 overflow-hidden ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className='mx-auto max-w-6xl px-4 py-2'>
          <NavLink
            to='/'
            end
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-md transition ${
                isActive ? 'bg-indigo-800 text-white' : 'hover:bg-indigo-600'
              }`
            }
          >
            <Home className='h-4 w-4' aria-hidden='true' /> Home
          </NavLink>

          <NavLink
            to='/events'
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `mt-1 flex items-center gap-2 px-3 py-2 rounded-md transition ${
                isActive ? 'bg-indigo-800 text-white' : 'hover:bg-indigo-600'
              }`
            }
          >
            <CalendarDays className='h-4 w-4' aria-hidden='true' /> Events
          </NavLink>

          <NavLink
            to='/new'
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `mt-1 flex items-center gap-2 px-3 py-2 rounded-md transition ${
                isActive ? 'bg-indigo-800 text-white' : 'hover:bg-indigo-600'
              }`
            }
          >
            <PlusCircle className='h-4 w-4' aria-hidden='true' /> Add Event
          </NavLink>

          <NavLink
            to='/contact'
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `mt-1 flex items-center gap-2 px-3 py-2 rounded-md transition ${
                isActive ? 'bg-indigo-800 text-white' : 'hover:bg-indigo-600'
              }`
            }
          >
            <Phone className='h-4 w-4' aria-hidden='true' /> Contact
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
