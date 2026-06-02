// react imports
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiMenuAlt3 } from 'react-icons/hi';

function Navbar() {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
    if (!nav) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'scroll';
    }
  };

  return (
    <div className='absolute w-full flex justify-between p-4 items-center'>
      <Link to='/'>
        <h1 className='text-white font-bold text-2xl z-20'>Experiences</h1>
      </Link>
      <HiMenuAlt3
        size={25}
        className='z-20 text-white cursor-pointer'
        onClick={handleNav}
      />
      <div
        className={
          nav
            ? 'fixed text-gray-300 left-0 top-0 w-full h-screen bg-black/90 px-4 py-7 flex-col z-10 ease-in duration-500'
            : 'absolute top-0 h-screen left-[-100%] ease-in duration-500'
        }
      >
        <ul className='flex flex-col fixed w-full h-full items-center justify-center'>
          <li className='nav-li' onClick={handleNav}>
            <Link to='/'>Home</Link>
          </li>
          <li className='nav-li' onClick={handleNav}>
            <Link to='/plans'>Plan your trip</Link>
          </li>
          <li className='nav-li' onClick={handleNav}>
            <Link to='/rooms'>Rooms</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
