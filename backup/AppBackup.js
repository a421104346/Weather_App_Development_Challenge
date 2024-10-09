import React, { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    setError("");
    try {
      const API_KEY = "332c4686ab002f5da5cb8374bb5479f5";
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      console.log("API Response:", data);

      if (
        data.cod === 200 &&
        data.weather &&
        Array.isArray(data.weather) &&
        data.weather.length > 0
      ) {
        setWeather(data);
      } else {
        setError(data.message || "Invalid data format or city not found.");
        setWeather(null);
      }
    } catch (error) {
      console.error("Error fetching the weather data", error);
      setError("Unable to fetch weather data. Please try again later.");
      setWeather(null);
    }
  };

  // 根据天气类型设置背景类名
  const weather_name = "default";
  const getBackgroundClass = () => {
    if (!weather || !weather.weather || weather.weather.length === 0) return "";
    const weatherType = weather.weather[0].main;

    switch (weatherType) {
      case "Clear":
        return "Sunny";
      case "Clouds":
        return "Cloudy";
      case "Rain":
        return "Rainy";
      case "Snow":
        return "Snowy";
      case "Thunderstorm":
        return "Stormy";
      case "Drizzle":
        return "Drizzle";
      case "Mist":
      case "Haze":
      case "Fog":
        return "foggy";
      default:
        return "";
    }
  };

  return (
    <div className={`App ${getBackgroundClass()}`}>
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Search</button>

      {error && <p className="error-message">{error}</p>}

      {weather && weather.main && weather.weather && (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <p>Weather: {getBackgroundClass()}</p>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
