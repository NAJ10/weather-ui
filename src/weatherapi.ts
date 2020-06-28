import * as axios from 'axios';

export interface Coord {
  lat: number;
  lon: number;
}

export interface City {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface Details {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Wind {
  speed: number;
  deg: number;
}

export interface Clouds {
  all: number;
}

export interface Forecast {
  dt: number;
  main: Details;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
}

export interface ForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: Forecast[];
  city: City;
}

export function weather(city: string): Promise<ForecastResponse> {
  const url = `http://localhost:3000/api/weather/${city}`;
  return axios.default
    .get(url)
    .then((response) => response.data)
    .catch((err) => {
      console.log(`Error during API request: ${err}`);
      return null;
    });
}
