import React from 'react';

const CurrentWeather = ({ weatherInfo }) => {
  return (
    <div className='container'>
      <div className='top'>
        <div className='location'>
          <p>{weatherInfo.name}</p>
        </div>
        <div className='temp'>
          {weatherInfo.main ? (
            <h1>{weatherInfo.main.temp.toFixed()} °C</h1>
          ) : (
            <p>No info</p>
          )}
        </div>
        <div className='description'>
          {weatherInfo.weather ? (
            <p>{weatherInfo.weather[0].main}</p>
          ) : (
            <p>No info</p>
          )}
        </div>
      </div>
      <div className='bottom'>
        <div className='feels'>
          {weatherInfo.main ? (
            <p className='bold'>{weatherInfo.main.feels_like.toFixed()} °C</p>
          ) : (
            <p>No info</p>
          )}
          <p>Feels like</p>
        </div>
        <div className='humidity'>
          {weatherInfo.main ? (
            <p className='bold'>{weatherInfo.main.humidity}%</p>
          ) : (
            <p>No info</p>
          )}
          <p>Humidity</p>
        </div>
        <div className='wind'>
          {weatherInfo.wind ? (
            <p className='bold'>{weatherInfo.wind.speed} km/h</p>
          ) : (
            <p>No info</p>
          )}
          <p>Wind Speed</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
