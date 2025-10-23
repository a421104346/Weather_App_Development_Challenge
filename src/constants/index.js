// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_WEATHER_API_URL || 'https://api.openweathermap.org/data/2.5',
  API_KEY: process.env.REACT_APP_WEATHER_API_KEY,
  ICON_BASE_URL: 'http://openweathermap.org/img/wn'
};

// Weather Type Mapping
export const WEATHER_BACKGROUNDS = {
  Clear: 'sunny',
  Clouds: 'cloudy',
  Rain: 'rainy',
  Snow: 'snowy',
  Thunderstorm: 'stormy',
  Drizzle: 'drizzle',
  Mist: 'foggy',
  Haze: 'foggy',
  Fog: 'foggy'
};

// Input Types
export const INPUT_TYPES = {
  CITY: 'city',
  ZIP: 'zip'
};

// Default Country Code
export const DEFAULT_COUNTRY = 'AU';