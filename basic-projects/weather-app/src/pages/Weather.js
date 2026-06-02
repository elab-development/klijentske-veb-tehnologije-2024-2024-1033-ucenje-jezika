import React, { useState } from 'react';

import Search from '../components/Search';
import CurrentWeather from '../components/CurrentWeather';

const Weather = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [flag, setFlag] = useState(false);

  return (
    <>
      <Search
        location={location}
        setLocation={setLocation}
        setData={setData}
        setFlag={setFlag}
        type='current'
      />
      {flag && <CurrentWeather weatherInfo={data} />}
    </>
  );
};

export default Weather;
