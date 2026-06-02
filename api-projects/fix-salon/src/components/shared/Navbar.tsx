import { Link } from 'react-router-dom';
import { FaHome, FaUserCircle } from 'react-icons/fa';

import logo from '../../assets/logo.png';

const Navbar = () => {
  return (
    <div className='flex flex-col'>
      <div className='bg-primary h-[45px] w-full'></div>
      <div className='flex flex-row justify-center sm:justify-between items-center p-5 bg-gray'>
        <img src={logo} alt='logo' className='h-32 hidden sm:flex' />
        <div className='flex flex-col items-center justify-center sm:flex-row gap-5 text-tertiary uppercase font-bold'>
          <Link to='/'>
            <FaHome size={25} />
          </Link>
          <Link to='/login'>
            <FaUserCircle size={25} className='cursor-pointer' />
          </Link>
          <Link to='/about'>O nama</Link>
          <Link to='/services'>Usluge</Link>
          <Link to='/contact'>Kontakt</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
