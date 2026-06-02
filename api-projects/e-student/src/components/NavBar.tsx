import { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FiMenu,
  FiX,
  FiLayers,
  FiHome,
  FiBookOpen,
  FiClipboard,
  FiLogOut,
} from 'react-icons/fi';

const linkBase =
  'inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition';
const linkActive = 'bg-blue-600 text-white shadow';
const linkIdle = 'text-gray-700 hover:bg-gray-100 active:bg-gray-200';

function navClass(isActive: boolean) {
  return `${linkBase} ${isActive ? linkActive : linkIdle}`;
}

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const close = () => setOpen(false);
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className='sticky top-0 z-40 bg-white/80 backdrop-blur shadow-sm'>
      <div className='mx-auto flex justify-between max-w-5xl items-center gap-4 px-4 py-3'>
        <Link to='/' className='flex items-center gap-2'>
          <FiLayers className='h-6 w-6 text-blue-600' aria-hidden />
          <span className='text-lg font-semibold tracking-tight'>
            e-Student
          </span>
        </Link>

        <nav className='hidden md:flex items-center gap-2'>
          <NavLink to='/' end className={({ isActive }) => navClass(isActive)}>
            <FiHome aria-hidden /> Početna
          </NavLink>
          <NavLink to='/exams' className={({ isActive }) => navClass(isActive)}>
            <FiBookOpen aria-hidden /> Ispiti
          </NavLink>
          <NavLink
            to='/my-registrations'
            className={({ isActive }) => navClass(isActive)}
          >
            <FiClipboard aria-hidden /> Moje prijave
          </NavLink>
        </nav>

        {user && (
          <button
            onClick={handleLogout}
            className='hidden md:inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100'
          >
            <FiLogOut /> Logout
          </button>
        )}

        <button
          type='button'
          className='ml-auto inline-flex items-center justify-center rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden'
          aria-label='Otvori meni'
          aria-expanded={open ? 'true' : 'false'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <FiX className='h-6 w-6' /> : <FiMenu className='h-6 w-6' />}
        </button>
      </div>

      {open && (
        <div className='md:hidden border-t border-gray-100 bg-white'>
          <nav className='mx-auto flex max-w-5xl flex-col gap-2 px-4 py-3'>
            <NavLink
              to='/'
              end
              className={({ isActive }) => navClass(isActive)}
              onClick={close}
            >
              <FiHome aria-hidden /> Početna
            </NavLink>
            <NavLink
              to='/exams'
              className={({ isActive }) => navClass(isActive)}
              onClick={close}
            >
              <FiBookOpen aria-hidden /> Ispiti
            </NavLink>
            <NavLink
              to='/my-registrations'
              className={({ isActive }) => navClass(isActive)}
              onClick={close}
            >
              <FiClipboard aria-hidden /> Moje prijave
            </NavLink>

            {user && (
              <button
                onClick={() => {
                  close();
                  handleLogout();
                }}
                className='inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100'
              >
                <FiLogOut /> Logout
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
