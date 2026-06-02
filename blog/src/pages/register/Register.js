// react imports
import React from 'react';
import { Link } from 'react-router-dom';

// utils
import './register.css';

export default function Register() {
  return (
    <div className='register'>
      <form className='register-form'>
        <label>Username</label>
        <input
          className='register-input'
          type='text'
          placeholder='Enter your Username'
        />
        <label>Email</label>
        <input
          className='register-input'
          type='email'
          placeholder='Enter your Email'
        />
        <label>Password</label>
        <input
          className='register-input'
          type='password'
          placeholder='Enter your Password'
        />
        <button className='register-button'>Register</button>
      </form>
      <button className='register-login-button'>
        <Link to='/login' className='link'>
          Login
        </Link>
      </button>
    </div>
  );
}
