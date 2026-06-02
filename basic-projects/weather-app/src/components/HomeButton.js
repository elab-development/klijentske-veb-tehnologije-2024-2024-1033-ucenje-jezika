import React from 'react';
import { Link } from 'react-router-dom';
import { TiWeatherSunny } from 'react-icons/ti';

const HomeButton = () => {
  return (
    <Link to={'/'}>
      <div className='home-btn'>
        <TiWeatherSunny size={50} />
      </div>
    </Link>
  );
};

export default HomeButton;
