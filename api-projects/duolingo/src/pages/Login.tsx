import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import '../styles/Login.css';
import { User } from '../models/User';
import GlobalContext from '../context/Context';

const Login = () => {
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const context = useContext(GlobalContext);

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!name) {
      toast.error('Please enter your name!', { id: 'login' });
      return;
    }

    if (!password) {
      toast.error('Please enter your password!', { id: 'login' });
      return;
    }

    const newUser = new User(name, `${name}@mail.com`);
    localStorage.setItem('user', JSON.stringify(newUser));
    if (context && newUser) {
      const { setUser, setLoggedIn } = context;
      setUser(newUser);
      setLoggedIn(true);
    }
    toast.success(`Welcome ${name}!`, { id: 'login' });
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    <div className='container'>
      <Toaster position='top-center' reverseOrder={false} />
      <div className='form-box'>
        <h1>Sign In</h1>
        <form action=''>
          <div className='input-group'>
            <div className='input-field'>
              <i className='fa-solid fa-user'></i>
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Name'
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
            <button
              type='button'
              onClick={() => {
                navigate('/register');
              }}
              className='disable'
            >
              Sign Up
            </button>
            <button type='button' onClick={handleSubmit}>
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
