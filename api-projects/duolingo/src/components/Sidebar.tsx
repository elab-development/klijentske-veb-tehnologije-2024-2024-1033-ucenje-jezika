import { Link } from 'react-router-dom';

import logo from '../assets/logo.png';
import '../styles/Sidebar.css';
import { useSidebar } from '../hooks/useSidebar.hook';
import { useUser } from '../hooks/useUser.hook';
import { useLoggedIn } from '../hooks/useLoggedIn.hook';

const Sidebar = () => {
  const { sidebarActive, setSidebarActive } = useSidebar();
  const { user } = useUser();
  const { setLoggedIn } = useLoggedIn();

  const logout = () => {
    localStorage.removeItem('finishedCourses');
    localStorage.removeItem('user');
    setLoggedIn(false);
  };

  return (
    <div className={`side-bar ${sidebarActive ? 'active' : ''}`}>
      <div id='close-btn' onClick={() => setSidebarActive(false)}>
        <i className='fas fa-times'></i>
      </div>

      <div className='profile'>
        <img src={logo} className='image' alt='user' />
        <h3 className='name'>{user.name}</h3>
        <p className='mail'>{user.email}</p>
      </div>

      <nav className='navbar'>
        <Link to={'/'}>
          <i className='fas fa-home'></i>
          <span className='capitalize'>home</span>
        </Link>
        <Link to={'/courses'}>
          <i className='fas fa-graduation-cap'></i>
          <span className='capitalize'>courses</span>
        </Link>
        <Link to={'/upcoming'}>
          <i className='fas fa-language'></i>
          <span className='capitalize'>upcoming</span>
        </Link>
        <Link to={'/login'} onClick={logout}>
          <i className='fas fa-sign-out'></i>
          <span className='capitalize'>logout</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
