import { useEffect, useState } from 'react';

export const useFetch = () => {
  const [fetchData, setFetchData] = useState({
    data: undefined,
  });

  const url = 'https://currencyapi-net.p.rapidapi.com/currencies?output=JSON';
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'fa3797adbbmsh87a0912c708974bp1ab663jsn4a8b90f8756f',
      'x-rapidapi-host': 'currencyapi-net.p.rapidapi.com',
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return [fetchData, setFetchData];
};
