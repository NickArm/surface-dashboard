import React, { useState } from 'react';
import { Cloud, Sun, Wind, Droplets, Eye, Gauge, Calendar } from 'lucide-react';
import './WeatherWidget.css';
import weatherService from './weatherService';

const WeatherWidget = ({ weather }) => {
  const [showForecast, setShowForecast] = useState(false);

  // Debug logs removed to prevent React Error #31

  if (!weather) {
    return (
      <div className="dashboard-card weather-widget">
        <h2>Weather</h2>
        <div className="loading">Loading weather data...</div>
      </div>
    );
  }

  // Safe access to weather data
  const currentWeather = weather.weather && weather.weather[0] ? weather.weather[0] : { main: 'Unknown', description: 'No data' };
  const mainData = weather.main || { temp: 0, feels_like: 0, temp_min: 0, temp_max: 0, humidity: 0, pressure: 0 };
  const windData = weather.wind || { speed: 0, deg: 0 };
  const sysData = weather.sys || { country: 'Unknown' };

  // Debug logs removed to prevent React Error #31
  
  return (
    <div className="dashboard-card weather-widget">
      <h2>Weather</h2>
      
      <div className="weather-main">
        <div className="weather-icon-container">
          {weatherService.getWeatherIcon(currentWeather.main)}
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
          <Wind className="detail-icon" />
          <span>{windData.speed} m/s {windData.deg ? weatherService.getWindDirection(windData.deg) : ''}</span>
        </div>
        
        <div className="weather-detail">
          <Droplets className="detail-icon" />
          <span>{mainData.humidity}%</span>
        </div>
        
        <div className="weather-detail">
          <Eye className="detail-icon" />
          <span>{weather.visibility ? (weather.visibility / 1000) : 0} km</span>
        </div>

        {mainData.pressure && (
          <div className="weather-detail">
            <Gauge className="detail-icon" />
            <span>{mainData.pressure} hPa</span>
          </div>
        )}

        {weather.uvi !== undefined && (
          <div className="weather-detail">
            <Sun className="detail-icon" />
            <span>UV: {weather.uvi || 'N/A'}</span>
          </div>
        )}

        {weather.clouds !== undefined && (
          <div className="weather-detail">
            <Cloud className="detail-icon" />
            <span>{weather.clouds?.percent || weather.clouds || 0}% clouds</span>
          </div>
        )}
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

      <div className="weather-sun">
        <div className="sun-info">
          <Sun className="sun-icon" />
          <span>Sunrise: {sysData.sunrise ? weatherService.formatTime(sysData.sunrise) : 'N/A'}</span>
        </div>
        <div className="sun-info">
          <Sun className="sun-icon sunset" />
          <span>Sunset: {sysData.sunset ? weatherService.formatTime(sysData.sunset) : 'N/A'}</span>
        </div>
      </div>

      {/* Forecast Toggle Button */}
      {(weather.hourly || weather.daily) && (
        <button 
          className="forecast-toggle"
          onClick={() => setShowForecast(!showForecast)}
        >
          <Calendar size={16} />
          {showForecast ? 'Hide Forecast' : 'Show Forecast'}
        </button>
      )}

      {/* Hourly Forecast */}
      {showForecast && weather.hourly && (
        <div className="weather-forecast hourly-forecast">
          <h4>Next 8 Hours</h4>
          <div className="forecast-list">
            {weather.hourly.slice(0, 8).map((hour, index) => {
              const hourWeather = hour.weather && hour.weather[0] ? hour.weather[0] : { main: 'Unknown', description: 'No data' };
              return (
                <div key={index} className="forecast-item">
                  <div className="forecast-time">{weatherService.formatTime(hour.dt)}</div>
                  <div className="forecast-temp">{Math.round(hour.temp || 0)}°</div>
                  <div className="forecast-icon">
                    {weatherService.getWeatherIcon(hourWeather.main)}
                  </div>
                  <div className="forecast-desc">{hourWeather.description}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Daily Forecast */}
      {showForecast && weather.daily && (
        <div className="weather-forecast daily-forecast">
          <h4>5-Day Forecast</h4>
          <div className="forecast-list">
            {weather.daily.slice(0, 5).map((day, index) => {
              const dayWeather = day.weather && day.weather[0] ? day.weather[0] : { main: 'Unknown', description: 'No data' };
              const dayTemp = day.temp || { min: 0, max: 0 };
              return (
                <div key={index} className="forecast-item daily-item">
                  <div className="forecast-date">{weatherService.formatDate(day.dt)}</div>
                  <div className="forecast-temps">
                    <span className="temp-max">{Math.round(dayTemp.max)}°</span>
                    <span className="temp-min">{Math.round(dayTemp.min)}°</span>
                  </div>
                  <div className="forecast-icon">
                    {weatherService.getWeatherIcon(dayWeather.main)}
                  </div>
                  <div className="forecast-desc">{dayWeather.description}</div>
                  <div className="forecast-details">
                    <span>💧 {day.humidity || 0}%</span>
                    <span>🌬️ {day.wind_speed || 0} m/s</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;
