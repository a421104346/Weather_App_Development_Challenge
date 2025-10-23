import { useEffect } from 'react';
import { WEATHER_BACKGROUNDS } from '../constants';

export const useWeatherBackground = (weather) => {
  useEffect(() => {
    if (!weather || !weather.weather || weather.weather.length === 0) {
      // 重置为默认背景
      document.body.style.backgroundImage = '';
      return;
    }

    const weatherType = weather.weather[0].main;
    const backgroundClass = WEATHER_BACKGROUNDS[weatherType] || '';
    
    if (backgroundClass) {
      const body = document.body;
      body.style.backgroundImage = `url('/image/${backgroundClass}.gif')`;
      body.style.backgroundSize = 'cover';
      body.style.backgroundRepeat = 'no-repeat';
      body.style.backgroundPosition = 'center';
      body.style.transition = 'background 0.5s ease-in-out';
    }
  }, [weather]);

  const getWeatherType = () => {
    if (!weather || !weather.weather || weather.weather.length === 0) {
      return '';
    }
    return WEATHER_BACKGROUNDS[weather.weather[0].main] || '';
  };

  return { getWeatherType };
};