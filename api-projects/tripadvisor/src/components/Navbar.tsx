import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useLoggedIn } from '../hooks/useLoggedIn';
import { useEffect, useState } from 'react';
// import ButtonComponent from './ButtonComponent';

const Navbar = () => {
  const [user, setUser] = useState('');
  const { loggedIn, setLoggedIn } = useLoggedIn();

  useEffect(() => {
    let storage = localStorage.getItem('user');
    if (storage) {
      setUser(storage);
    } else {
      setUser('');
    }
  }, [loggedIn]);

  // const handleButtonClick = () => {
  //   console.log('Button clicked!');
  // };

  return (
    <div className='flex py-4 sm:pl-20 sm:justify-between items-center navbar flex-col sm:flex-row'>
      <Link to={'/'} className='flex items-center gap-2'>
        <img
          src={logo}
          className='w-10 h-10 bg-green-400 rounded-full'
          alt='logo'
        />
        <h1 className='font-bold text-2xl'>Tripadvisor</h1>
      </Link>
      <div className='flex justify-end gap-10 sm:mr-20'>
        {user && (
          <h1 className='font-semibold mt-2'>
            Welcome, <span className='text-green-500'>{user}</span> !
          </h1>
        )}
        {loggedIn && (
          <Link
            to={'/login'}
            onClick={() => {
              localStorage.removeItem('user');
              setLoggedIn(false);
            }}
          >
            <h1 className='font-semibold mt-2'>Logout</h1>
          </Link>
        )}
        {/* Testing purposes */}
        {/* <span 
          onClick={() => {
            localStorage.removeItem('user');
            setLoggedIn(false);
          }}
        >
          Logout
        </span> */}
      </div>
      {/* Testing purposes */}
      {/* <ButtonComponent onButtonClick={handleButtonClick} /> */}
    </div>
  );
};

export default Navbar;
