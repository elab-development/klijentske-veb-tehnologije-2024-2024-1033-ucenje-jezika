import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { LuMenu } from 'react-icons/lu';
import { IoClose } from 'react-icons/io5';

import LogoImg from '../assets/logo.webp';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const onNavigate = () => setOpen(false);

  return (
    <header className='sticky top-0 z-40 bg-pink-100 backdrop-blur shadow-md'>
      <nav
        aria-label='Primary'
        className='container mx-auto px-4 sm:px-6 lg:px-8'
      >
        <div className='flex h-16 items-center justify-between'>
          <Link
            to='/'
            className='inline-flex items-center gap-2 text-xl font-bold text-pink-600'
            onClick={onNavigate}
          >
            <img
              src={LogoImg}
              alt='CatCaffe Logo'
              className='h-14 w-14 rounded-full object-cover'
            />
          </Link>

          <div className='hidden md:flex items-center gap-1'>
            <NavLink
              to='/'
              end
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-pink-500/50 ${
                  isActive
                    ? 'bg-pink-200 text-pink-900'
                    : 'text-gray-700 hover:bg-pink-200'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to='/cafes'
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-pink-500/50 ${
                  isActive
                    ? 'bg-pink-200 text-pink-900'
                    : 'text-gray-700 hover:bg-pink-200'
                }`
              }
            >
              Cafes
            </NavLink>
            <NavLink
              to='/about'
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-pink-500/50 ${
                  isActive
                    ? 'bg-pink-200 text-pink-900'
                    : 'text-gray-700 hover:bg-pink-200'
                }`
              }
            >
              About
            </NavLink>
            <NavLink
              to='/contact'
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-pink-500/50 ${
                  isActive
                    ? 'bg-pink-200 text-pink-900'
                    : 'text-gray-700 hover:bg-pink-200'
                }`
              }
            >
              Contact
            </NavLink>
          </div>

          <button
            type='button'
            className='md:hidden inline-flex items-center justify-center rounded-lg p-2 text-gray-700 hover:bg-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-500/50'
            onClick={() => setOpen((v) => !v)}
          >
            <span className='sr-only'>Open main menu</span>
            {open ? (
              <IoClose className='h-6 w-6 text-pink-700' />
            ) : (
              <LuMenu className='h-6 w-6 text-pink-700' />
            )}
          </button>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${
            open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className='py-2 '>
            <NavLink
              to='/'
              end
              onClick={onNavigate}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-pink-500/50 ${
                  isActive
                    ? 'bg-pink-200 text-pink-900'
                    : 'text-gray-700 hover:bg-pink-200'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to='/cafes'
              onClick={onNavigate}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-pink-500/50 ${
                  isActive
                    ? 'bg-pink-200 text-pink-900'
                    : 'text-gray-700 hover:bg-pink-200'
                }`
              }
            >
              Cafes
            </NavLink>
            <NavLink
              to='/about'
              onClick={onNavigate}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-pink-500/50 ${
                  isActive
                    ? 'bg-pink-200 text-pink-900'
                    : 'text-gray-700 hover:bg-pink-200'
                }`
              }
            >
              About
            </NavLink>
            <NavLink
              to='/contact'
              onClick={onNavigate}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-pink-500/50 ${
                  isActive
                    ? 'bg-pink-200 text-pink-900'
                    : 'text-gray-700 hover:bg-pink-200'
                }`
              }
            >
              Contact
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
}
