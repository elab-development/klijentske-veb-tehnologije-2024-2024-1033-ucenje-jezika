import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Palette, Monitor, Images, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header className='sticky top-0 z-40 bg-gradient-to-b from-indigo-50 to-transparent'>
      <div className='container mx-auto px-4 py-3'>
        {/* Shell with soft shadow + rounded */}
        <div className='flex items-center justify-between rounded-2xl bg-white/80 backdrop-blur-md px-4 py-3 shadow-lg ring-1 ring-black/5'>
          {/* Brand */}
          <NavLink to='/' className='flex items-center gap-2'>
            <span className='inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white shadow-md'>
              <Images className='h-5 w-5' />
            </span>
            <span className='text-xl font-bold tracking-tight'>
              Pixel<span className='text-indigo-600'>Gallery</span>
            </span>
          </NavLink>

          {/* Desktop nav */}
          <nav className='hidden md:flex items-center gap-2'>
            <NavLink
              to='/'
              end
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all 
                ${
                  isActive
                    ? 'text-white bg-indigo-600 shadow-md'
                    : 'text-slate-700 hover:text-slate-900 bg-white/70 hover:bg-white shadow-sm'
                }`
              }
            >
              <Home size={18} />
              <span>Home</span>
            </NavLink>
            <NavLink
              to='/traditional'
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all 
                ${
                  isActive
                    ? 'text-white bg-indigo-600 shadow-md'
                    : 'text-slate-700 hover:text-slate-900 bg-white/70 hover:bg-white shadow-sm'
                }`
              }
            >
              <Palette size={18} />
              <span>Traditional</span>
            </NavLink>
            <NavLink
              to='/digital'
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all 
                ${
                  isActive
                    ? 'text-white bg-indigo-600 shadow-md'
                    : 'text-slate-700 hover:text-slate-900 bg-white/70 hover:bg-white shadow-sm'
                }`
              }
            >
              <Monitor size={18} />
              <span>Digital</span>
            </NavLink>
          </nav>

          {/* Mobile toggle */}
          <button
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls='mobile-menu'
            onClick={() => setOpen((v) => !v)}
            className='md:hidden inline-flex items-center justify-center rounded-xl p-2 bg-white/80 hover:bg-white shadow-sm ring-1 ring-black/5'
          >
            {open ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
          </button>
        </div>

        {/* Mobile menu panel */}
        <div
          id='mobile-menu'
          className={`md:hidden transition-[max-height,opacity] duration-300 ease-out overflow-hidden ${
            open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className='mt-3 rounded-2xl bg-white/90 backdrop-blur-md p-3 shadow-xl ring-1 ring-black/5'>
            <div className='flex flex-col gap-2'>
              <NavLink
                to='/'
                end
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all 
                  ${
                    isActive
                      ? 'text-white bg-indigo-600 shadow-md'
                      : 'text-slate-700 hover:text-slate-900 bg-white/70 hover:bg-white shadow-sm'
                  }`
                }
              >
                <Home size={18} />
                <span>Home</span>
              </NavLink>
              <NavLink
                to='/traditional'
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all 
                  ${
                    isActive
                      ? 'text-white bg-indigo-600 shadow-md'
                      : 'text-slate-700 hover:text-slate-900 bg-white/70 hover:bg-white shadow-sm'
                  }`
                }
              >
                <Palette size={18} />
                <span>Traditional</span>
              </NavLink>
              <NavLink
                to='/digital'
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all 
                  ${
                    isActive
                      ? 'text-white bg-indigo-600 shadow-md'
                      : 'text-slate-700 hover:text-slate-900 bg-white/70 hover:bg-white shadow-sm'
                  }`
                }
              >
                <Monitor size={18} />
                <span>Digital</span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
