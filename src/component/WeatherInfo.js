import React from "react";
//This is the disbord to display the information of weather.
const WeatherInfo = ({ weather, getBackgroundClass }) => {
  if (!weather || !weather.main || !weather.weather || weather.weather.length === 0) {
    return null;
  }

 //And I've differentiated the information in Jason here.
  const { name, main, wind, weather: weatherData } = weather;
  const weatherType = weatherData[0].main;
  const iconCode = weatherData[0].icon;
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`; 

  return (
    <div className={`weather-info ${getBackgroundClass()}`}>
      <h2>{name}</h2>
      {/* Icon*/}
      <img src={iconUrl} alt={weatherType} style={{ width: "50px", height: "50px" }} />
      <p>Weather: {getBackgroundClass()}</p>
      <p>Temperature: {main.temp}°C</p>
      <p>Humidity: {main.humidity}%</p>
      <p>Wind Speed: {wind.speed} m/s</p>
      <p>Condition: {weatherData[0].description}</p>
    </div>
  );
};

export default WeatherInfo;
