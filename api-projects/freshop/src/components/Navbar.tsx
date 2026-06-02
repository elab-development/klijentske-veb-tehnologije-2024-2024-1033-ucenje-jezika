import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';

const Navbar: React.FC = () => {
  return (
    <header className='main-header'>
      <nav className='navbar navbar-expand-lg navbar-light bg-light navbar-default bootsnav'>
        <div className='container'>
          <div className='navbar-header'>
            <button
              className='navbar-toggler'
              type='button'
              data-toggle='collapse'
              data-target='#navbar-menu'
              aria-controls='navbars-rs-food'
              aria-expanded='false'
              aria-label='Toggle navigation'
            >
              <i className='fa fa-bars'></i>
            </button>

            <Link to='/'>
              <img src={logo} className='logo' alt='logo' />
            </Link>
          </div>

          <div className='collapse navbar-collapse' id='navbar-menu'>
            <ul
              className='nav navbar-nav ml-auto'
              data-in='fadeInDown'
              data-out='fadeOutUp'
            >
              <li className='nav-item'>
                <Link to='/'>Home</Link>
              </li>
              <li className='nav-item'>
                <Link to='/about'>About Us</Link>
              </li>

              <li className='nav-item'>
                <Link to='/blog'>Blog</Link>
              </li>
              <li className='nav-item'>
                <Link to='/contact'>Contact Us</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
