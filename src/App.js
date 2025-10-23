import React, { useState } from "react";
import "./App.css";
import CountrySelector from "./component/CountrySelector";
import InputFilter from "./component/InputFilter";
import InputField from "./component/InputField";
import WeatherInfo from "./component/WeatherInfo";
import { useWeatherAPI } from "./hooks/useWeatherAPI";
import { useWeatherBackground } from "./hooks/useWeatherBackground";
import { INPUT_TYPES, DEFAULT_COUNTRY } from "./constants";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBBtn,
  MDBSpinner,
} from "mdb-react-ui-kit";

function App() {
  // State management
  const [cityOrZip, setCityOrZip] = useState("");
  const [inputType, setInputType] = useState(INPUT_TYPES.CITY);
  const [country, setCountry] = useState(DEFAULT_COUNTRY);

  // Custom hooks
  const { weather, loading, error, fetchWeather, clearWeather } = useWeatherAPI();
  const { getWeatherType } = useWeatherBackground(weather);

  // Handle input type change
  const handleInputTypeChange = () => {
    setCityOrZip("");
    clearWeather();
  };

  // Handle input value change
  const handleInputChange = (value) => {
    setCityOrZip(value);
  };

  // Handle search
  const handleSearch = () => {
    if (cityOrZip.trim()) {
      fetchWeather(cityOrZip, inputType, country);
    }
  };

  return (
    <MDBContainer 
      className="d-flex justify-content-center align-items-center" 
      style={{ minHeight: "100vh", padding: "20px" }}
    >
      <MDBRow className="justify-content-center w-100">
        <MDBCol lg="6" md="8" sm="10" xs="12">
          <MDBCard className="shadow-lg">
            <MDBCardBody>
              <MDBCardTitle className="text-center mb-4 h3">
                🌤️ Weather Query
              </MDBCardTitle>

              {/* Input type selector */}
              <InputFilter
                inputType={inputType}
                setInputType={setInputType}
                onInputTypeChange={handleInputTypeChange}
              />

              {/* Country selector (only shown in postal code mode) */}
              {inputType === INPUT_TYPES.ZIP && (
                <CountrySelector
                  selectedCountry={country}
                  setSelectedCountry={setCountry}
                />
              )}

              {/* Input field */}
              <InputField
                inputType={inputType}
                value={cityOrZip}
                onChange={handleInputChange}
                onSubmit={handleSearch}
                disabled={loading}
              />

              {/* Search button */}
              <div className="text-center">
                <MDBBtn 
                  onClick={handleSearch} 
                  className="mt-3" 
                  color="primary"
                  disabled={loading || !cityOrZip.trim()}
                  style={{ minWidth: "120px" }}
                >
                  {loading ? (
                    <>
                      <MDBSpinner size="sm" className="me-2" />
                      Searching...
                    </>
                  ) : (
                    "🔍 Search"
                  )}
                </MDBBtn>
              </div>

              {/* Error message */}
              {error && (
                <div className="alert alert-danger mt-3 text-center" role="alert">
                  {error}
                </div>
              )}
            </MDBCardBody>
          </MDBCard>

          {/* Weather information display */}
          {weather && (
            <MDBCard className="shadow-lg mt-4">
              <WeatherInfo 
                weather={weather} 
                weatherType={getWeatherType()} 
              />
            </MDBCard>
          )}
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default App;
