import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import '../styles/Login.css';
import { User } from '../models/User';
import GlobalContext from '../context/Context';

const Register = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const context = useContext(GlobalContext);

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!name) {
      toast.error('Please enter your name!', { id: 'register' });
      return;
    }

    if (!email) {
      toast.error('Please enter your email!', { id: 'register' });
      return;
    }

    const emailCharacters = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!emailCharacters.test(email)) {
      toast.error('Please enter a valid email address!', { id: 'register' });
      return;
    }

    if (!password) {
      toast.error('Please enter your password!', { id: 'register' });
      return;
    }

    const newUser = new User(name, email);
    localStorage.setItem('user', JSON.stringify(newUser));
    if (context && newUser) {
      const { setUser, setLoggedIn } = context;
      setUser(newUser);
      setLoggedIn(true);
    }
    toast.success(`Welcome ${name}!`, { id: 'register' });
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    <div className='container'>
      <Toaster position='top-center' reverseOrder={false} />
      <div className='form-box'>
        <h1>Sign Up</h1>
        <form action=''>
          <div className='input-group'>
            <div className='input-field' id='nameField'>
              <i className='fa-solid fa-user'></i>
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Name'
              />
            </div>
            <div className='input-field'>
              <i className='fa-solid fa-envelope'></i>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'
              />
            </div>
            <div className='input-field'>
              <i className='fa-solid fa-lock'></i>
              <input
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
              />
            </div>
            <p>
              Forgot password? <a href='#'>Click here!</a>
            </p>
          </div>
          <div className='btn-field'>
            <button type='button' onClick={handleSubmit}>
              Sign Up
            </button>
            <button
              type='button'
              className='disable'
              onClick={() => navigate('/login')}
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
