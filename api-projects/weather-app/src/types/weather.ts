export type Units = 'metric' | 'imperial';

export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface WeatherMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface WeatherSys {
  country?: string;
  sunrise?: number;
  sunset?: number;
}

export interface WeatherWind {
  speed: number;
  deg: number;
}

export interface WeatherCurrentResponse {
  coord: { lon: number; lat: number };
  weather: WeatherCondition[];
  base: string;
  main: WeatherMain;
  visibility?: number;
  wind?: WeatherWind;
  dt: number;
  sys?: WeatherSys;
  timezone?: number;
  name: string;
}

export interface DailyTemp {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}

export interface DailyFeelsLike {
  day: number;
  night: number;
  eve: number;
  morn: number;
}

export interface DailyItem {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: DailyTemp;
  feels_like: DailyFeelsLike;
  pressure: number;
  humidity: number;
  wind_speed: number;
  wind_deg: number;
  weather: WeatherCondition[];
  clouds: number;
  pop?: number;
}

export interface OneCallDailyResponse {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  daily: DailyItem[];
}

export interface OneCallCurrent {
  dt: number;
  sunrise?: number;
  sunset?: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi?: number;
  clouds: number;
  visibility?: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust?: number;
  weather: WeatherCondition[];
}

export interface OneCallCurrentResponse {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: OneCallCurrent;
}

export interface HourlyItem {
  dt: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi?: number;
  clouds: number;
  visibility?: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust?: number;
  pop?: number;
  weather: WeatherCondition[];
}

export interface OneCallHourlyResponse {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  hourly: HourlyItem[];
}
