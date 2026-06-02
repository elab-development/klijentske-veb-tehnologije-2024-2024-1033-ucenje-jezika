import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';

import { useAuth } from '../store/auth-context';

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  async function onLogout() {
    await logout();
    navigate('/login', { replace: true });
  }

  return (
    <header className='fixed inset-x-0 top-0 z-40'>
      <nav className='mx-auto w-full'>
        <div className='mx-auto max-w-6xl px-4'>
          <div className='mt-4 rounded-2xl border border-white/60 bg-white/55 backdrop-blur-md shadow-sm'>
            <div className='flex items-center justify-between px-4 py-3'>
              <NavLink
                to='/'
                className='text-xl font-bold text-[color:var(--accent)]'
              >
                Rentiva
              </NavLink>

              <div className='hidden md:flex items-center gap-2'>
                <NavLink
                  to='/'
                  end
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-sm font-medium transition ${
                      isActive
                        ? 'bg-white/90 text-[color:var(--primary)] shadow-sm'
                        : 'text-slate-700 hover:bg-white/70'
                    }`
                  }
                >
                  Početna strana
                </NavLink>
                <NavLink
                  to='/rentals'
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-sm font-medium transition ${
                      isActive
                        ? 'bg-white/90 text-[color:var(--primary)] shadow-sm'
                        : 'text-slate-700 hover:bg-white/70'
                    }`
                  }
                >
                  Nekretnine
                </NavLink>
              </div>

              <div className='hidden md:block'>
                <button
                  onClick={onLogout}
                  className='cursor-pointer rounded-lg bg-[color:var(--secondary)] px-4 py-2 text-white hover:bg-[color:var(--primary)]'
                >
                  Logout
                </button>
              </div>

              <button
                className='md:hidden inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white/80 px-3 py-2'
                onClick={() => setOpen((v) => !v)}
                aria-label='Open menu'
              >
                <Menu className='h-5 w-5 text-slate-700' />
              </button>
            </div>

            {open && (
              <div className='md:hidden border-t border-white/70 px-4 py-3'>
                <div className='flex flex-col gap-2'>
                  <NavLink
                    to='/'
                    end
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-lg text-sm font-medium transition ${
                        isActive
                          ? 'bg-white/90 text-[color:var(--primary)] shadow-sm'
                          : 'text-slate-700 hover:bg-white/70'
                      }`
                    }
                  >
                    Početna strana
                  </NavLink>
                  <NavLink
                    to='/rentals'
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-lg text-sm font-medium transition ${
                        isActive
                          ? 'bg-white/90 text-[color:var(--primary)] shadow-sm'
                          : 'text-slate-700 hover:bg-white/70'
                      }`
                    }
                  >
                    Nekretnine
                  </NavLink>
                  <button
                    onClick={onLogout}
                    className='cursor-pointer mt-1 rounded-lg bg-[color:var(--secondary)] px-4 py-2 text-white hover:bg-[color:var(--primary)]'
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
