// Weather IPC Handlers - Moved from electron.js
const { ipcMain } = require('electron');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Function to load weather configuration
const loadWeatherConfig = () => {
  try {
    const configPath = path.join(__dirname, '../../../weather.config');
    if (fs.existsSync(configPath)) {
      const configContent = fs.readFileSync(configPath, 'utf8');
      const config = {};
      
      configContent.split('\n').forEach(line => {
        const trimmedLine = line.trim();
        if (trimmedLine && !trimmedLine.startsWith('#')) {
          const [key, ...valueParts] = trimmedLine.split('=');
          if (key && valueParts.length > 0) {
            config[key.trim()] = valueParts.join('=').trim();
          }
        }
      });
      
      return config;
    }
  } catch (error) {
    console.error('Error loading weather config:', error);
  }
  
  // Return default config if file doesn't exist or error
  return {
    WEATHER_API_KEY: 'ac70fc3d9270e236f9b118eec7c11688',
    WEATHER_CITY: 'Athens',
    WEATHER_UNITS: 'metric',
    WEATHER_LANGUAGE: 'el'
  };
};

// Weather Widget IPC Handlers
const setupWeatherIPC = () => {
  // Handle weather data
  ipcMain.handle('get-weather', async (event, city) => {
    const config = loadWeatherConfig();
    const API_KEY = config.WEATHER_API_KEY;
    const DEFAULT_CITY = config.WEATHER_CITY;
    const UNITS = config.WEATHER_UNITS;
    const LANGUAGE = config.WEATHER_LANGUAGE;
    
    // Use provided city or default from config
    const targetCity = city || DEFAULT_CITY;
    
    console.log(`Weather config loaded: City=${DEFAULT_CITY}, Units=${UNITS}, Language=${LANGUAGE}`);
    
    // Fallback weather data
    const fallbackWeather = {
      coord: { lon: 23.7283, lat: 37.9838 },
      weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
      base: 'stations',
      main: { temp: 25, feels_like: 25, temp_min: 20, temp_max: 30, pressure: 1013, humidity: 60 },
      visibility: 10000,
      wind: { speed: 3.5, deg: 180 },
      clouds: { all: 0 },
      dt: Math.floor(Date.now() / 1000),
      sys: { type: 1, id: 5782, country: 'GR', sunrise: 1635735600, sunset: 1635775200 },
      timezone: 7200,
      id: 264371,
      name: targetCity,
      cod: 200,
      hourly: [
        { dt: Date.now() / 1000 + 3600, temp: 26, weather: [{ main: 'Clear', description: 'clear sky' }] },
        { dt: Date.now() / 1000 + 7200, temp: 24, weather: [{ main: 'Clear', description: 'clear sky' }] },
        { dt: Date.now() / 1000 + 10800, temp: 27, weather: [{ main: 'Clear', description: 'clear sky' }] },
        { dt: Date.now() / 1000 + 14400, temp: 25, weather: [{ main: 'Clear', description: 'clear sky' }] }
      ],
      daily: [
        { dt: Date.now() / 1000 + 86400, temp: { min: 20, max: 30 }, weather: [{ main: 'Clear', description: 'clear sky' }], humidity: 60, wind_speed: 3.5 },
        { dt: Date.now() / 1000 + 172800, temp: { min: 18, max: 32 }, weather: [{ main: 'Clear', description: 'clear sky' }], humidity: 60, wind_speed: 3.5 },
        { dt: Date.now() / 1000 + 259200, temp: { min: 21, max: 29 }, weather: [{ main: 'Clear', description: 'clear sky' }], humidity: 60, wind_speed: 3.5 }
      ]
    };

    try {
      // Get coordinates for the city using Geocoding API
      console.log(`Getting coordinates for ${targetCity}...`);
      const geoResponse = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${targetCity}&limit=1&appid=${API_KEY}`,
        { timeout: 10000 }
      );

      if (!geoResponse.data || geoResponse.data.length === 0) {
        console.log('No coordinates found, using fallback weather data');
        return fallbackWeather;
      }

      const { lat, lon } = geoResponse.data[0];
      console.log(`Coordinates for ${targetCity}: ${lat}, ${lon}`);

      // Get weather data using Basic Weather API (v2.5)
      console.log(`Fetching weather data for ${targetCity} using Basic Weather API...`);
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${UNITS}&lang=${LANGUAGE}`,
        { timeout: 10000 }
      );
      
      console.log('Weather data fetched successfully');
      
      // Return the basic weather data with proper structure
      const weatherData = weatherResponse.data;
      return {
        // Return the weather data as an object, not spread
        coord: weatherData.coord,
        weather: weatherData.weather || [{ main: 'Unknown', description: 'No data' }],
        base: weatherData.base,
        main: weatherData.main,
        visibility: weatherData.visibility,
        wind: weatherData.wind,
        clouds: weatherData.clouds,
        dt: weatherData.dt,
        sys: weatherData.sys,
        timezone: weatherData.timezone,
        id: weatherData.id,
        name: weatherData.name,
        cod: weatherData.cod,
        // Add some mock forecast data for UI compatibility
        hourly: [
          { dt: Date.now() / 1000 + 3600, temp: weatherData.main.temp + 1, weather: weatherData.weather },
          { dt: Date.now() / 1000 + 7200, temp: weatherData.main.temp - 1, weather: weatherData.weather },
          { dt: Date.now() / 1000 + 10800, temp: weatherData.main.temp + 2, weather: weatherData.weather },
          { dt: Date.now() / 1000 + 14400, temp: weatherData.main.temp, weather: weatherData.weather }
        ],
        daily: [
          { dt: Date.now() / 1000 + 86400, temp: { min: weatherData.main.temp_min, max: weatherData.main.temp_max }, weather: weatherData.weather, humidity: weatherData.main.humidity, wind_speed: weatherData.wind.speed },
          { dt: Date.now() / 1000 + 172800, temp: { min: weatherData.main.temp_min - 2, max: weatherData.main.temp_max + 2 }, weather: weatherData.weather, humidity: weatherData.main.humidity, wind_speed: weatherData.wind.speed },
          { dt: Date.now() / 1000 + 259200, temp: { min: weatherData.main.temp_min + 1, max: weatherData.main.temp_max - 1 }, weather: weatherData.weather, humidity: weatherData.main.humidity, wind_speed: weatherData.wind.speed }
        ]
      };
      
    } catch (error) {
      console.error('Error fetching weather:', error.message);
      if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
        console.log('Network error - using fallback weather data');
      } else if (error.response?.status === 401) {
        console.log('API key invalid - using fallback weather data');
      } else if (error.response?.status === 404) {
        console.log('City not found - using fallback weather data');
      } else {
        console.log('Unknown error - using fallback weather data');
      }
      return fallbackWeather;
    }
  });
};

module.exports = { setupWeatherIPC };