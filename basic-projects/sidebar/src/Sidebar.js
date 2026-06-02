// react imports
import React, { useContext } from 'react';
import { FaTimes } from 'react-icons/fa';

// data
import logo from './logo.svg';
import { social, links } from './data';

// context
import { AppContext } from './context';

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useContext(AppContext);

  return (
    <aside className={`sidebar ${isSidebarOpen && 'show-sidebar'}`}>
      <div className='sidebar-header'>
        <img src={logo} alt='logo' className='logo' />
        <button className='close-btn' onClick={closeSidebar}>
          <FaTimes />
        </button>
      </div>
      <ul className='links'>
        {links.map((link) => {
          const { id, url, text, icon } = link;
          return (
            <li key={id}>
              <a href={url}>
                {icon}
                {text}
              </a>
            </li>
          );
        })}
      </ul>
      <ul className='social-icons'>
        {social.map((link) => {
          const { id, url, icon } = link;
          return (
            <li key={id}>
              <a href={url}>{icon}</a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
