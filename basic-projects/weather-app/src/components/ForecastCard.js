import React from 'react';

import {
  TiWeatherSunny,
  TiWeatherCloudy,
  TiWeatherShower,
  TiWeatherSnow,
} from 'react-icons/ti';

const ForecastCard = ({ day }) => {
  return (
    <div className='forecast-card'>
      <div className='datetime'>
        {new Date(day?.dt_txt).toDateString()}
        <br />
        {new Date(day?.dt_txt).toLocaleTimeString().split(':')[0] +
          ':' +
          new Date(day?.dt_txt).toLocaleTimeString().split(':')[2]}
      </div>
      <div>
        {day?.weather[0]?.main === 'Clear' && <TiWeatherSunny size={45} />}
        {day?.weather[0]?.main === 'Clouds' && <TiWeatherCloudy size={45} />}
        {day?.weather[0]?.main === 'Rain' && <TiWeatherShower size={45} />}
        {day?.weather[0]?.main === 'Snow' && <TiWeatherSnow size={45} />}
      </div>
      <div>{day?.main?.temp.toFixed()} °C</div>
    </div>
  );
};

export default ForecastCard;
