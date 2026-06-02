import React from 'react';

// utils
import { FaCoins } from 'react-icons/fa';
import './navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <Link to='/'>
      <div className='navbar'>
        <FaCoins className='icon' />
        <h1>
          CCoin <span className='purple'>Search</span>
        </h1>
      </div>
    </Link>
  );
}

export default Navbar;
