import { Link } from 'react-router-dom';

import '../styles/Header.css';
import { useSidebar } from '../hooks/useSidebar.hook';

const Header = () => {
  const { sidebarActive, setSidebarActive } = useSidebar();

  return (
    <header className='header'>
      <section className='flex'>
        <Link to='/' className='logo'>
          Duolingo
        </Link>
        <div className='icons'>
          <div
            id='menu-btn'
            className='fas fa-bars'
            onClick={() => setSidebarActive(!sidebarActive)}
          ></div>
        </div>
      </section>
    </header>
  );
};

export default Header;
