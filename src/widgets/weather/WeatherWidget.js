import React from 'react';
import './WeatherWidget.css';

const WeatherWidget = ({ weather, onRefresh }) => {
  if (!weather) {
    return (
      <div className="dashboard-card weather-widget">
        <h2>Weather</h2>
        <div className="loading">Loading weather data...</div>
      </div>
    );
  }

  // Check if weather data is valid
  if (!weather.weather || !weather.main) {
    return (
      <div className="dashboard-card weather-widget">
        <h2>Weather</h2>
        <div className="loading">Unable to load weather data</div>
      </div>
    );
  }

  // Safe access to weather data
  const currentWeather = weather.weather && weather.weather[0] ? weather.weather[0] : { main: 'Unknown', description: 'No data' };
  const mainData = weather.main || { temp: 0, feels_like: 0, temp_min: 0, temp_max: 0, humidity: 0, pressure: 0 };
  const windData = weather.wind || { speed: 0, deg: 0 };
  const sysData = weather.sys || { country: 'Unknown' };

  // Simple weather icon
  const getWeatherIcon = (condition) => {
    const iconMap = {
      'Clear': '☀️',
      'Clouds': '☁️',
      'Rain': '🌧️',
      'Drizzle': '🌦️',
      'Thunderstorm': '⛈️',
      'Snow': '❄️',
      'Mist': '🌫️',
      'Fog': '🌫️',
      'Haze': '🌫️'
    };
    return iconMap[condition] || '🌤️';
  };

  return (
    <div className="dashboard-card weather-widget">
      <h2>Weather</h2>
      
      <div className="weather-main">
        <div className="weather-icon-container">
          {getWeatherIcon(currentWeather.main)}
        </div>
        
        <div className="weather-info">
          <div className="weather-temp">
            {Math.round(mainData.temp)}°C
          </div>
          <div className="weather-description">
            {currentWeather.description}
          </div>
          <div className="weather-location">
            {weather.name || 'Unknown'}, {sysData.country}
          </div>
        </div>
      </div>

      <div className="weather-details">
        <div className="weather-detail">
          <span>Wind: {windData.speed} m/s</span>
        </div>
        
        <div className="weather-detail">
          <span>Humidity: {mainData.humidity}%</span>
        </div>
        
        <div className="weather-detail">
          <span>Pressure: {mainData.pressure} hPa</span>
        </div>
      </div>

      <div className="weather-feels-like">
        Feels like {Math.round(mainData.feels_like)}°C
      </div>

      <div className="weather-min-max">
        <div className="temp-min">
          <span className="temp-label">Min:</span>
          <span className="temp-value">{Math.round(mainData.temp_min)}°C</span>
        </div>
        <div className="temp-max">
          <span className="temp-label">Max:</span>
          <span className="temp-value">{Math.round(mainData.temp_max)}°C</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
