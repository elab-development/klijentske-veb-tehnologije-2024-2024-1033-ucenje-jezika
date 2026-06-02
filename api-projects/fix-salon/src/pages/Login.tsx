import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import {
  User,
  checkIfUserExists,
  checkUsersPassword,
  loginUser,
  logoutUser,
} from '../models/User';
import { useLoggedInUser } from '../hooks/useLoggedInUser.hook';

const Login = () => {
  const { loggedInUser } = useLoggedInUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email.trim() === '') {
      toast.error(<b className='text-lg'>Unesite Vašu email adresu!</b>);
      return;
    }
    if (password.trim() === '') {
      toast.error(<b className='text-lg'>Unesite Vašu lozinku!</b>);
      return;
    }

    let user: User | undefined = checkIfUserExists(email);
    if (!user) {
      toast.error(
        <b className='text-lg'>Korisnik sa ovim emailom ne postoji!</b>
      );
      return;
    } else {
      if (!checkUsersPassword(user, password)) {
        toast.error(<b className='text-lg'>Pogrešna lozinka!</b>);
      } else {
        toast.success(<b className='text-lg'>Uspešno ste se ulogovali!</b>);
        loginUser(user.name);
        navigate('/');
      }
    }
  };

  return (
    <>
      {loggedInUser ? (
        <div className='flex flex-col justify-center gap-10 items-center bg-login min-h-[60vh]'>
          <p className='text-5xl text-center bg-white px-20 pt-2 pb-5'>
            Zdravo, {loggedInUser.name}
          </p>
          <Link
            className='bg-secondary text-white hover:bg-tertiary py-2 px-5 text-2xl uppercase'
            to='/services'
          >
            Istraži našu ponudu
          </Link>
          <button
            className='bg-secondary text-white hover:bg-tertiary py-2 px-5 text-2xl uppercase'
            onClick={() => {
              logoutUser();
              navigate('/');
            }}
          >
            Izloguj se
          </button>
        </div>
      ) : (
        <div className='flex flex-col justify-center gap-10 items-center bg-login min-h-[60vh]'>
          <p className='text-5xl bg-white px-20 pt-2 pb-5'>Ulogujte se</p>
          <form className='flex flex-col gap-5' onSubmit={handleLogin}>
            <input
              type='email'
              placeholder='Email adresa'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='bg-primary p-4 rounded-lg w-80'
            />
            <input
              type='password'
              placeholder='Šifra'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='bg-primary p-4 rounded-lg w-80'
            />
            <button
              type='submit'
              className='bg-secondary text-white hover:bg-tertiary py-2 text-2xl uppercase'
            >
              uloguj se
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
