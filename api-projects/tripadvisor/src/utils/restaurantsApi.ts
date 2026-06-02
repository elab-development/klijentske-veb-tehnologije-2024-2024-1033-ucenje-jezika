import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const searchRestaurants = async (query: string) => {
  const options: AxiosRequestConfig = {
    method: 'GET',
    url: 'https://tripadvisor-scraper.p.rapidapi.com/restaurants/list',
    params: {
      query: query,
      page: '1',
    },
    headers: {
      'x-rapidapi-key': 'dddd7275afmsh98a7a2962883206p1080a8jsn2a7f8b10c014',
      'x-rapidapi-host': 'tripadvisor-scraper.p.rapidapi.com',
    },
  };

  try {
    const response: AxiosResponse<any> = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getRestaurantsDetails = async (id: string) => {
  const options: AxiosRequestConfig = {
    method: 'GET',
    url: 'https://tripadvisor-scraper.p.rapidapi.com/restaurants/detail',
    params: { id: id },
    headers: {
      'x-rapidapi-key': 'dddd7275afmsh98a7a2962883206p1080a8jsn2a7f8b10c014',
      'x-rapidapi-host': 'tripadvisor-scraper.p.rapidapi.com',
    },
  };

  try {
    const response: AxiosResponse<any> = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
