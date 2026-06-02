import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className='bg-white shadow-md'>
      <nav className='container mx-auto flex items-center justify-between px-4 py-3'>
        <div className='text-xl font-bold text-orange-600 flex items-center gap-2'>
          WeatherApp
        </div>

        <button
          className='md:hidden text-orange-600 focus:outline-none'
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <div
          className={`${
            isOpen ? 'block z-50' : 'hidden'
          } absolute top-14 left-0 w-full bg-white shadow-md md:static md:block md:w-auto md:shadow-none`}
        >
          <ul className='flex flex-col md:flex-row md:space-x-6'>
            {[
              { to: '/', label: 'Home', end: true },
              { to: '/current', label: 'Current' },
              { to: '/hourly', label: 'Hourly' },
              { to: '/weekly', label: 'Week' },
              { to: '/details', label: 'Details' },
            ].map(({ to, label, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `block px-4 py-2 transition border-b-2 ${
                      isActive
                        ? 'border-orange-600 text-orange-600'
                        : 'border-transparent text-slate-700 hover:bg-orange-100 hover:border-orange-300'
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
