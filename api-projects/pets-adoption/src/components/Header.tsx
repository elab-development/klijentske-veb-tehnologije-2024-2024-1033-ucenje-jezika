import { NavLink, Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu, PawPrint } from 'lucide-react';

const nav = [
  { to: '/', label: 'Home' },
  { to: '/pets', label: 'Pets' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className='border-b border-slate-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50'>
      <div className='container mx-auto max-w-6xl px-4'>
        <div className='flex items-center justify-between h-16'>
          <Link to='/' className='flex items-center gap-2 font-semibold'>
            <span className='inline-grid place-items-center h-8 w-8 rounded-full bg-emerald-500 text-white'>
              <PawPrint className='h-5 w-5' />
            </span>
            <span className='tracking-tight'>Paws & Friends</span>
          </Link>

          <nav className='hidden md:flex items-center gap-2'>
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-slate-100 ${
                    isActive
                      ? 'text-emerald-700 bg-emerald-50'
                      : 'text-slate-700'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <button
            aria-label='Open menu'
            onClick={() => setOpen((v) => !v)}
            className='md:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg border border-slate-200 hover:bg-slate-100'
          >
            <Menu className='h-5 w-5' />
          </button>
        </div>

        {open && (
          <div className='md:hidden pb-4'>
            <nav className='grid gap-1'>
              {nav.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-slate-100 ${
                      isActive
                        ? 'text-emerald-700 bg-emerald-50'
                        : 'text-slate-700'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
