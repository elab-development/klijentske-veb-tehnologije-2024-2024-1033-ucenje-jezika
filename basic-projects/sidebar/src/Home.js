// react imports
import React, { useContext } from 'react';
import { FaBars } from 'react-icons/fa';

// context
import { AppContext } from './context';
// import { useGlobalContext } from './context';

const Home = () => {
  // const data = useGlobalContext();  // alternative
  const { openSidebar, openModal } = useContext(AppContext);

  return (
    <main>
      <button className='sidebar-toggle' onClick={openSidebar}>
        <FaBars />
      </button>
      <button className='btn' onClick={openModal}>
        show modal
      </button>
    </main>
  );
};

export default Home;
