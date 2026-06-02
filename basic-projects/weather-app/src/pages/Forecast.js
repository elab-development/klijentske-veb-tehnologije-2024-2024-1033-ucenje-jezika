import React, { useState } from 'react';

import Search from '../components/Search';
import ForecastWeather from '../components/ForecastWeather';

const Forecast = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [flag, setFlag] = useState(false);

  return (
    <div>
      <Search
        location={location}
        setLocation={setLocation}
        setData={setData}
        setFlag={setFlag}
        type='forecast'
      />
      {flag && <ForecastWeather forecastInfo={data} />}
    </div>
  );
};

export default Forecast;
