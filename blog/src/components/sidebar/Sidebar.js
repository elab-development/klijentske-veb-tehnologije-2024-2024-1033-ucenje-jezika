import React from 'react';

// utils
import './sidebar.css';
import sidebarImg from '../../assets/images/sidebar.jpg';

export default function Sidebar() {
  return (
    <div className='sidebar'>
      <div className='sidebar-item'>
        <span className='sidebar-title'>ABOUT</span>
        <img src={sidebarImg} alt='' />
        <p>
          Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
          amet ex esse.Sunt eu ut nostrud id quis proident.
        </p>
      </div>
      <div className='sidebar-item'>
        <span className='sidebar-title'>CATEGORIES</span>
        <ul className='sidebar-list'>
          <li className='sidebar-list-item'>Life</li>
          <li className='sidebar-list-item'>Music</li>
          <li className='sidebar-list-item'>Style</li>
          <li className='sidebar-list-item'>Sport</li>
          <li className='sidebar-list-item'>Cinema</li>
          <li className='sidebar-list-item'>Tech</li>
        </ul>
      </div>
      <div className='sidebar-item'>
        <span className='sidebar-title'>FOLLOW US</span>
        <div className='sidebar-social'>
          <i className='sidebar-icon fa-brands fa-square-facebook'></i>
          <i className='sidebar-icon fa-brands fa-square-twitter'></i>
          <i className='sidebar-icon fa-brands fa-square-instagram'></i>
          <i className='sidebar-icon fa-brands fa-linkedin'></i>
        </div>
      </div>
    </div>
  );
}
