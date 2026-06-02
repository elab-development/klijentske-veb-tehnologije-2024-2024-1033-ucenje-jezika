import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen((prev) => !prev);
  const closeMenu = () => setOpen(false);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/tracks', label: 'Tracks' },
    { to: '/weather', label: 'Weather' },
  ];

  return (
    <header className='bg-emerald-800 text-emerald-50 shadow-md'>
      <nav className='mx-auto max-w-6xl px-4 py-3 flex items-center justify-between'>
        <div className='font-bold text-lg tracking-wide'>HikeTrack</div>

        <div className='hidden md:flex gap-2'>
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-md transition ${
                  isActive
                    ? 'bg-emerald-700'
                    : 'hover:bg-emerald-700/70 hover:text-amber-200'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        <button
          className='md:hidden p-2 rounded-md hover:bg-emerald-700 transition'
          onClick={toggleMenu}
          aria-label='Toggle menu'
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <div
        className={`md:hidden bg-emerald-700 transition-all duration-300 overflow-hidden ${
          open ? 'max-h-48' : 'max-h-0'
        }`}
      >
        <div className='flex flex-col items-start px-4 pb-3 gap-2'>
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={closeMenu}
              className={({ isActive }) =>
                `w-full px-3 py-2 rounded-md transition ${
                  isActive
                    ? 'bg-emerald-600 text-amber-200'
                    : 'hover:bg-emerald-600 hover:text-amber-100'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
}
