import { Link } from 'react-router-dom';

import LogoImg from '../assets/logo.webp';

export default function Footer() {
  return (
    <footer className='bg-pink-100 border-t border-pink-200'>
      <div className='container mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4'>
        <Link to='/' className='flex items-center gap-2'>
          <img
            src={LogoImg}
            alt='CatCaffe Logo'
            className='h-20 w-20 rounded-full'
          />
        </Link>

        <nav className='flex gap-6 text-gray-600 text-sm'>
          <Link to='/cafes' className='hover:text-pink-600 transition'>
            Cafés
          </Link>
          <Link to='/contact' className='hover:text-pink-600 transition'>
            Contact
          </Link>
          <Link to='/about' className='hover:text-pink-600 transition'>
            About
          </Link>
        </nav>

        <div className='text-gray-500 text-sm'>
          © {new Date().getFullYear()} CatCaffe App. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
