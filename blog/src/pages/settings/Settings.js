import React from 'react';

// components
import Sidebar from '../../components/sidebar/Sidebar';

// utils
import './settings.css';

export default function Settings() {
  return (
    <div className='settings'>
      <div className='settings-wrapper'>
        <div className='settings-title'>
          <span className='settings-update-title'>Update your Account</span>
          <span className='settings-delete-title'>Delete Account</span>
        </div>
        <form className='settings-form'>
          <label>Profile Picture</label>
          <div className='settings-profile-picture'>
            <img
              src='https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
              alt=''
            />
            <label htmlFor='fileInput'>
              <i className='settings-profile-picture-icon fa-regular fa-user'></i>
            </label>
            <input type='file' id='fileInput' style={{ display: 'none' }} />
          </div>
          <label>Username</label>
          <input type='text' placeholder='Damir' />
          <label>Email</label>
          <input type='email' placeholder='dd20191015@student.fon.bg.ac.rs' />
          <label>Password</label>
          <input type='password' />
          <button className='settings-submit'>Update</button>
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
