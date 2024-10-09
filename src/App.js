import React, { useState, useEffect } from "react";
import "./App.css";
import CountrySelector from "./component/CountrySelector";
import InputFilter from "./component/InputFilter";
import InputField from "./component/InputField";
import WeatherInfo from "./component/WeatherInfo";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBBtn,
  MDBTypography,
} from "mdb-react-ui-kit";

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

      if (data.cod === 200 && data.weather && Array.isArray(data.weather) && data.weather.length > 0) {
        setWeather({
          ...data,
          iconUrl: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`, // 生成图标 URL
        });
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
    <MDBContainer className="d-flex justify-content-center align-items-center" fluid style={{ height: '100vh' }}>
  <MDBCard className="fixed-card">
    <MDBCardBody>
      <MDBCardTitle className="text-center mb-4">
        Enter City Name or Zip Code
      </MDBCardTitle>
      
      {/* 下拉选择组件 */}
      <InputFilter
        inputType={inputType}
        setInputType={setInputType}
        setCityOrZip={setCityOrZip}
        setError={setError}
      />

      {/* 选择国家组件 */}
      {inputType === "zip" && (
        <CountrySelector
          selectedCountry={country}
          setSelectedCountry={setCountry}
        />
      )}

      {/* 输入字段组件 */}
      <InputField
        inputType={inputType}
        value={cityOrZip}
        setValue={setCityOrZip}
        setError={setError}
        fetchWeather={fetchWeather}
      />

      {/* 搜索按钮 */}
      <div className="text-center">
        <MDBBtn onClick={fetchWeather} className="mt-3">
          SEARCH
        </MDBBtn>
      </div>

      {/* 错误信息显示 */}
      {showError && error && (
        <p className="error-message text-danger text-center mt-3">
          {error}
        </p>
      )}
    </MDBCardBody>
  </MDBCard>

  {/* 显示天气信息的卡片 */}
  {weather && (
    <MDBCard className="mt-4 fixed-card">
      <WeatherInfo weather={weather} getBackgroundClass={getBackgroundClass} />
    </MDBCard>
  )}
</MDBContainer>

  );
}

export default App;
