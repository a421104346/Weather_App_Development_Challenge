import React, { useState, useEffect } from "react";
import "./App.css";
import CountrySelector from "./component/CountrySelector";
import InputFilter from "./component/InputFilter";
import InputField from "./component/InputField";
import WeatherInfo from "./component/WeatherInfo";

function App() {
  const [cityOrZip, setCityOrZip] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [inputType, setInputType] = useState("city");
  const [country, setCountry] = useState("AU");
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    setWeather(null);
    setCityOrZip("");
    setError("");
  }, [inputType]);

  const fetchWeather = async () => {
    if (error) {
      setShowError(true);
      setWeather(null);
      return;
    }

    setShowError(false);
    setError("");
    setWeather(null);

    try {
      const API_KEY = "332c4686ab002f5da5cb8374bb5479f5";
      let queryParam = "";

      if (inputType === "zip") {
        queryParam = `zip=${cityOrZip},${country.toLowerCase()}`;
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
        setShowError(false);
      } else {
        setError(data.message || "Invalid data format or location not found.");
        setWeather(null);
        setShowError(true);
      }
    } catch (error) {
      console.error("Error fetching the weather data", error);
      setError("Unable to fetch weather data. Please try again later.");
      setWeather(null);
      setShowError(true);
    }
  };

  const getBackgroundClass = () => {
    if (!weather || !weather.weather || weather.weather.length === 0) return "";
    const weatherType = weather.weather[0].main;

    switch (weatherType) {
      case "Clear":
        return "sunny";
      case "Clouds":
        return "cloudy";
      case "Rain":
        return "rainy";
      case "Snow":
        return "snowy";
      case "Thunderstorm":
        return "stormy";
      case "Drizzle":
        return "drizzle";
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

      <InputFilter
        inputType={inputType}
        setInputType={setInputType}
        setCityOrZip={setCityOrZip}
        setError={setError}
      />

      {inputType === "zip" && (
        <CountrySelector
          selectedCountry={country}
          setSelectedCountry={setCountry}
        />
      )}

      <InputField
        inputType={inputType}
        value={cityOrZip}
        setValue={setCityOrZip}
        setError={setError}
        fetchWeather={fetchWeather}
      />

      <button onClick={fetchWeather}>Search</button>

      {showError && error && <p className="error-message">{error}</p>}

      <WeatherInfo weather={weather} getBackgroundClass={getBackgroundClass} />
    </div>
  );
}

export default App;
