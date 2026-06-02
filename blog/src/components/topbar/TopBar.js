// react imports
import React from 'react';
import { Link } from 'react-router-dom';

// utils
import './topbar.css';

export default function TopBar() {
  const user = false;

  return (
    <div className='top'>
      <div className='top-left'>
        <i className='top-icon fa-brands fa-square-facebook'></i>
        <i className='top-icon fa-brands fa-square-twitter'></i>
        <i className='top-icon fa-brands fa-square-instagram'></i>
        <i className='top-icon fa-brands fa-linkedin'></i>
      </div>
      <div className='top-center'>
        <ul className='top-list'>
          <li className='top-list-item'>
            <Link to='/' className='link'>
              HOME
            </Link>
          </li>
          <li className='top-list-item'>
            <Link to='/' className='link'>
              ABOUT
            </Link>
          </li>
          <li className='top-list-item'>
            <Link to='/' className='link'>
              CONTACT
            </Link>
          </li>
          <li className='top-list-item'>
            <Link to='/write' className='link'>
              WRITE
            </Link>
          </li>
          <li className='top-list-item'>{user && 'LOGOUT'}</li>
        </ul>
      </div>
      <div className='top-right'>
        {user ? (
          <img
            src='https://manager.almadarisp.com/user/img/user.png'
            alt='user'
            className='top-image'
          />
        ) : (
          <ul className='top-list'>
            <li className='top-list-item'>
              <Link className='link' to='/login'>
                LOGIN
              </Link>
            </li>
            <li className='top-list-item'>
              <Link className='link' to='/register'>
                REGISTER
              </Link>
            </li>
          </ul>
        )}

        <i className='top-search-icon fa-solid fa-magnifying-glass'></i>
      </div>
    </div>
  );
}
