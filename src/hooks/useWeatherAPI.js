import { useState, useCallback } from 'react';
import { API_CONFIG } from '../constants';

export const useWeatherAPI = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = useCallback(async (cityOrZip, inputType, country = 'AU') => {
    if (!cityOrZip.trim()) {
      setError('Please enter city name or postal code');
      return;
    }

    setLoading(true);
    setError('');
    setWeather(null);

    try {
      let queryParam = '';
      
      if (inputType === 'zip') {
        queryParam = `zip=${cityOrZip},${country.toLowerCase()}`;
      } else {
        queryParam = `q=${cityOrZip}`;
      }

      const response = await fetch(
        `${API_CONFIG.BASE_URL}/weather?${queryParam}&appid=${API_CONFIG.API_KEY}&units=metric`
      );
      
      const data = await response.json();

      if (data.cod === 200 && data.weather && Array.isArray(data.weather) && data.weather.length > 0) {
        setWeather({
          ...data,
          iconUrl: `${API_CONFIG.ICON_BASE_URL}/${data.weather[0].icon}@2x.png`
        });
      } else {
        setError(data.message || 'Location not found or invalid data format');
      }
    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError('Unable to fetch weather data, please try again later');
    } finally {
      setLoading(false);
    }
  }, []);

  const clearWeather = useCallback(() => {
    setWeather(null);
    setError('');
  }, []);

  return {
    weather,
    loading,
    error,
    fetchWeather,
    clearWeather
  };
};