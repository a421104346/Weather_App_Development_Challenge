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
//reset states when user finish input
  useEffect(() => {
    setWeather(null);
    setCityOrZip("");
    setError("");
  }, [inputType]);
//I tried to coding dynamic background in CSS but I fail somehow, so I put it in here.
  useEffect(() => {
    console.log("useEffect triggered. Weather state:", weather);
    if (!weather || !weather.weather || weather.weather.length === 0) {
      console.log("Weather data is invalid or not available.");
      return;
    }
  
    console.log("Valid weather data:", weather.weather[0].main);
    const weatherType = weather.weather[0].main; 
    const body = document.body;
  
   
    switch (weatherType) {
      case "Clear":
        body.style.backgroundImage = "url('/image/sunny.gif')";
        console.log("Setting background to sunny");
        break;
      case "Clouds":
        body.style.backgroundImage = "url('/image/cloudy.gif')";
        console.log("Setting background to cloudy");
        break;
      case "Rain":
        body.style.backgroundImage = "url('/image/rain.gif')";
        console.log("Setting background to rainy");
        break;
      case "Snow":
        body.style.backgroundImage = "url('/image/snow.gif')";
        console.log("Setting background to snowy");
        break;
      case "Thunderstorm":
        body.style.backgroundImage = "url('/image/thunderstorm.gif')";
        console.log("Setting background to stormy");
        break;
      case "Drizzle":
        body.style.backgroundImage = "url('/image/rain.gif')";
        console.log("Setting background to drizzle");
        break;
      case "Mist":
      case "Haze":
      case "Fog":
        body.style.backgroundImage = "url('/image/fog.gif')";
        console.log("Setting background to foggy");
        break;
    }
  
   
    body.style.backgroundSize = "cover";
    body.style.backgroundRepeat = "no-repeat";
    body.style.backgroundPosition = "center";
    body.style.transition = "background 0.5s ease-in-out"; 
  }, [weather]); 
//This part is to implement openWeatherMap api and receive the data from them.
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
          iconUrl: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`, 
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

  // I was using this function to do both changhing background and get the name of weather.
  // now it only can get name since I done dynamic background in another place.
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
    //Here I am using MDB to manage the user interface and responsive design and wrap all the components.
    <MDBContainer className="d-flex justify-content-center align-items-center " style={{ height: "100vh",width: "100vw" }}>
    <MDBRow className="justify-content-center" style={{ width: "90vw", height: "80vh" }}>
      <MDBCol lg="6" md="8" sm="8" xs="4">
        <MDBCard className="fixed-card">
          <MDBCardBody>
            <MDBCardTitle className="text-center mb-4">
              Enter City Name or Zip Code
            </MDBCardTitle>
  
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
  
            <div className="text-center">
              <MDBBtn onClick={fetchWeather} className="mt-3" color="primary">
                SEARCH
              </MDBBtn>
            </div>
            {/* using showError to hide the error message before user click search*/}
            {showError && error && (
              <p className="error-message text-danger text-center mt-3">
                {error}
              </p>
            )}
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    </MDBRow>
    {/*show when weather not null*/}
    {weather && (
      <MDBRow className="justify-content-center mt-4">
        <MDBCol lg="12" md="12" sm="12" xs="12">
          <MDBCard className="fixed-card">
            <WeatherInfo weather={weather} getBackgroundClass={getBackgroundClass} />
          </MDBCard>
        </MDBCol>
      </MDBRow>
    )}
  </MDBContainer>
  
  );
}

export default App;
