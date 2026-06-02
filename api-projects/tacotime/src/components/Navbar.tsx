import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { RxHamburgerMenu } from 'react-icons/rx';
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';

import '../styles/Navbar.css';
import ButtonComponent from './ButtonComponent';

const Navbar = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  const handleButtonClick = () => {
    console.log('Button clicked!');
  };

  return (
    <>
      <header className='row container'>
        <Link to={'/'} className='logo lobsterFont'>
          TacoTime
        </Link>
        <div
          className='toggleMenu'
          data-testid='toggle-menu'
          onClick={() => setOpenSidebar(!openSidebar)}
        >
          <RxHamburgerMenu size={20} />
        </div>
        <nav className='navigation'>
          <ul className='primary-links row'>
            <li>
              <NavLink
                to={'/'}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={'/recipes'}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Recipes
              </NavLink>
            </li>
            <li>
              <NavLink
                to={'/about'}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                About us
              </NavLink>
            </li>
            <li>
              <NavLink
                to={'/favorites'}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Favorites
              </NavLink>
            </li>
            <li>
              <NavLink
                to={'/contact'}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                Contact us
              </NavLink>
            </li>
          </ul>
          <ul className='secondary-links row'>
            <li>
              <Link to={'/'}>
                <FaFacebookF />
              </Link>
            </li>
            <li>
              <Link to={'/'}>
                <FaInstagram />
              </Link>
            </li>
            <li>
              <Link to={'/'}>
                <FaTiktok />
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <div
        className={`sidebar ${openSidebar && 'open'}`}
        role='navigation'
        aria-label='sidebar'
      >
        <ul className='sidebar-primary-links'>
          <li onClick={() => setOpenSidebar(false)}>
            <NavLink
              to={'/'}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Home
            </NavLink>
          </li>
          <li onClick={() => setOpenSidebar(false)}>
            <NavLink
              to={'/recipes'}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Recipes
            </NavLink>
          </li>
          <li onClick={() => setOpenSidebar(false)}>
            <NavLink
              to={'/about'}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              About us
            </NavLink>
          </li>
          <li onClick={() => setOpenSidebar(false)}>
            <NavLink
              to={'/favorites'}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Favorites
            </NavLink>
          </li>
          <li onClick={() => setOpenSidebar(false)}>
            <NavLink
              to={'/contact'}
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Contact us
            </NavLink>
          </li>
        </ul>
        <ul className='sidebar-secondary-links'>
          <li onClick={() => setOpenSidebar(false)}>
            <Link to={'/'}>
              <FaFacebookF />
            </Link>
          </li>
          <li onClick={() => setOpenSidebar(false)}>
            <Link to={'/'}>
              <FaInstagram />
            </Link>
          </li>
          <li onClick={() => setOpenSidebar(false)}>
            <Link to={'/'}>
              <FaTiktok />
            </Link>
          </li>
        </ul>
      </div>
      <ButtonComponent onButtonClick={handleButtonClick} />
    </>
  );
};

export default Navbar;
