import React from 'react';
import axios from 'axios';

const Search = ({ setData, location, setLocation, setFlag, type }) => {
  const url =
    type === 'current'
      ? `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=dfd7032e210d51c48b7c6802797db84f`
      : `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=14d353dc01d54ae709d94850cc90cb13`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      try {
        axios.get(url).then((res) => {
          setData(res.data);
          console.log(res.data);
        });
        setLocation('');
        setFlag(true);
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  return (
    <div className='search'>
      <input
        type='text'
        onChange={(event) => setLocation(event.target.value)}
        value={location}
        onKeyPress={searchLocation}
        placeholder='Enter location'
      />
    </div>
  );
};

export default Search;
