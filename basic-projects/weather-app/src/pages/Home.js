import React from 'react';
import { Link } from 'react-router-dom';
import { TiWeatherPartlySunny } from 'react-icons/ti';
import { MdOutlineCalendarMonth } from 'react-icons/md';

const Home = () => {
  return (
    <div className='home'>
      <Link to={'/weather'}>
        <div className='card'>
          <TiWeatherPartlySunny size={50} />
          Current Weather
        </div>
      </Link>

      <Link to={'/forecast'}>
        <div className='card'>
          <MdOutlineCalendarMonth size={50} />3 Days Forecast
        </div>
      </Link>
    </div>
  );
};

export default Home;
