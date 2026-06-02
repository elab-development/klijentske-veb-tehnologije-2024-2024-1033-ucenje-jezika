import React from 'react';

import ForecastCard from './ForecastCard';

const ForecastWeather = ({ forecastInfo }) => {
  return (
    <div className='forecast-container'>
      <p>{forecastInfo?.city?.name} forecast for the next 3 days</p>
      <div className='forecast'>
        {forecastInfo?.list?.slice(0, 24).map((day) => (
          <ForecastCard key={day?.dt_txt} day={day} />
        ))}
      </div>
    </div>
  );
};

export default ForecastWeather;
