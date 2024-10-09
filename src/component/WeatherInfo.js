import React from "react";

const WeatherInfo = ({ weather, getBackgroundClass }) => {
  if (!weather || !weather.main || !weather.weather) {
    return null;
  }

  return (
    <div className={`weather-info ${getBackgroundClass()}`}>
      <h2>{weather.name}</h2>
      <p>Weather: {getBackgroundClass()}</p>
      <p>Temperature: {weather.main.temp}°C</p>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Wind Speed: {weather.wind.speed} m/s</p>
      <p>Condition: {weather.weather[0].description}</p>
    </div>
  );
};

export default WeatherInfo;
