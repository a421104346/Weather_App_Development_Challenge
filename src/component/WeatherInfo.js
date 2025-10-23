import React from "react";
import { 
  MDBCardBody, 
  MDBCardTitle, 
  MDBCardText,
  MDBRow,
  MDBCol,
  MDBIcon
} from "mdb-react-ui-kit";

/**
 * Weather information display component
 * Displays retrieved weather data
 */
const WeatherInfo = ({ weather, weatherType }) => {
  if (!weather || !weather.main || !weather.weather || weather.weather.length === 0) {
    return null;
  }

  const { name, main, wind, weather: weatherData, sys } = weather;
  const currentWeather = weatherData[0];
  
  // Format temperature
  const formatTemp = (temp) => Math.round(temp);
  
  // Format wind speed
  const formatWindSpeed = (speed) => Math.round(speed * 10) / 10;

  // Get weather description (capitalize first letter)
  const getWeatherDescription = (description) => {
    return description.charAt(0).toUpperCase() + description.slice(1);
  };

  return (
    <MDBCardBody className="text-center">
      <MDBCardTitle className="mb-4">
        <MDBIcon fas icon="map-marker-alt" className="me-2" />
        {name}, {sys?.country}
      </MDBCardTitle>
      
      {/* Weather icon and temperature */}
      <div className="mb-4">
        <img 
          src={weather.iconUrl} 
          alt={currentWeather.description}
          style={{ width: "80px", height: "80px" }}
          className="mb-2"
        />
        <div className="display-4 fw-bold text-primary">
          {formatTemp(main.temp)}°C
        </div>
        <MDBCardText className="text-muted fs-5">
          {getWeatherDescription(currentWeather.description)}
        </MDBCardText>
      </div>

      {/* Weather details */}
      <MDBRow className="text-center">
        <MDBCol md="3" sm="6" className="mb-3">
          <div className="d-flex flex-column align-items-center">
            <MDBIcon fas icon="thermometer-half" size="lg" className="text-info mb-2" />
            <small className="text-muted">Feels Like</small>
            <span className="fw-bold">{formatTemp(main.feels_like)}°C</span>
          </div>
        </MDBCol>
        
        <MDBCol md="3" sm="6" className="mb-3">
          <div className="d-flex flex-column align-items-center">
            <MDBIcon fas icon="tint" size="lg" className="text-primary mb-2" />
            <small className="text-muted">Humidity</small>
            <span className="fw-bold">{main.humidity}%</span>
          </div>
        </MDBCol>
        
        <MDBCol md="3" sm="6" className="mb-3">
          <div className="d-flex flex-column align-items-center">
            <MDBIcon fas icon="wind" size="lg" className="text-success mb-2" />
            <small className="text-muted">Wind Speed</small>
            <span className="fw-bold">{formatWindSpeed(wind.speed)} m/s</span>
          </div>
        </MDBCol>
        
        <MDBCol md="3" sm="6" className="mb-3">
          <div className="d-flex flex-column align-items-center">
            <MDBIcon fas icon="compress-arrows-alt" size="lg" className="text-warning mb-2" />
            <small className="text-muted">Pressure</small>
            <span className="fw-bold">{main.pressure} hPa</span>
          </div>
        </MDBCol>
      </MDBRow>

      {/* Temperature range */}
      {(main.temp_max !== main.temp_min) && (
        <div className="mt-3">
          <MDBCardText className="text-muted">
            High: {formatTemp(main.temp_max)}°C | Low: {formatTemp(main.temp_min)}°C
          </MDBCardText>
        </div>
      )}
    </MDBCardBody>
  );
};

export default WeatherInfo;
