import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Gamepad2, Menu, X, BarChart3, Home } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/game', label: 'Play', icon: Gamepad2 },
  { to: '/stats', label: 'Stats', icon: BarChart3 },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className='sticky top-0 z-40 bg-white shadow-md'>
      <div className='max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 items-center justify-between'>
          <Link to='/' className='flex items-center gap-2 font-semibold'>
            <Gamepad2 className='h-6 w-6 text-blue-600' />
            <span>Word Association</span>
          </Link>

          {/* Desktop nav */}
          <nav className='hidden md:flex items-center gap-2'>
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors shadow-sm 
                  ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`
                }
              >
                <Icon className='h-4 w-4' />
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            className='md:hidden inline-flex items-center justify-center rounded-xl p-2 hover:bg-gray-50'
            aria-label='Toggle navigation'
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className='md:hidden bg-white shadow-md'>
          <nav className='max-w-7xl mx-auto px-4 py-2 space-y-1'>
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm
                   ${
                     isActive || pathname === to
                       ? 'bg-blue-50'
                       : 'hover:bg-gray-50'
                   }`
                }
              >
                <Icon className='h-4 w-4' />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
