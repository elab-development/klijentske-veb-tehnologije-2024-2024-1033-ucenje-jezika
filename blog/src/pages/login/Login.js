// react imports
import React from 'react';
import { Link } from 'react-router-dom';

// utils
import './login.css';

export default function Login() {
  return (
    <div className='login'>
      <form className='login-form'>
        <label>Email</label>
        <input className='login-input' type='email' placeholder='Email' />
        <label>Password</label>
        <input className='login-input' type='password' placeholder='Password' />
        <button className='login-button'>Login</button>
      </form>
      <button className='login-register-button'>
        <Link to='/register' className='link'>
          Register
        </Link>
      </button>
    </div>
  );
}
