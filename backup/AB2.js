import React, { useState } from "react";
import "./App.css";

function App() {
  const [cityOrZip, setCityOrZip] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [inputType, setInputType] = useState("city");

  const fetchWeather = async () => {
    setError("");
    try {
      const API_KEY = "332c4686ab002f5da5cb8374bb5479f5";
      let queryParam = "";

      if (inputType === "zip") {
        queryParam = `zip=${cityOrZip},au`;
      } else {
        queryParam = `q=${cityOrZip}`;
      }

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?${queryParam}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (
        data.cod === 200 &&
        data.weather &&
        Array.isArray(data.weather) &&
        data.weather.length > 0
      ) {
        setWeather(data);
      } else {
        setError(data.message || "Invalid data format or location not found.");
        setWeather(null);
      }
    } catch (error) {
      console.error("Error fetching the weather data", error);
      setError("Unable to fetch weather data. Please try again later.");
      setWeather(null);
    }
  };

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

      <div className="filter">
        <label htmlFor="inputType">Choose input type: </label>
        <select
          id="inputType"
          value={inputType}
          onChange={(e) => {
            setInputType(e.target.value);
            setCityOrZip("");
            setError("");
          }}
        >
          <option value="city">City Name</option>
          <option value="zip">Zip Code</option>
        </select>
      </div>

      <input
        type="text"
        placeholder={
          inputType === "city"
            ? "Enter city name"
            : "Enter zip code (e.g., 5000)"
        }
        value={cityOrZip}
        onChange={(e) => setCityOrZip(e.target.value)}
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
