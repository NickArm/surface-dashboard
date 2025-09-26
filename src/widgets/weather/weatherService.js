// Weather Service - Handles all weather-related IPC calls
class WeatherService {
  constructor() {
    this.isElectron = typeof window !== 'undefined' && window.electronAPI;
  }

  async getWeather(city = 'Athens') {
    if (!this.isElectron) {
      throw new Error('Electron API not available');
    }
    
    try {
      console.log('WeatherService: Fetching weather for:', city);
      const weatherData = await window.electronAPI.getWeather(city);
      console.log('WeatherService: Weather data received:', weatherData);
      return weatherData;
    } catch (error) {
      console.error('WeatherService: Error loading weather:', error);
      throw error;
    }
  }

  // Helper function to get weather icon
  getWeatherIcon(condition) {
    const iconMap = {
      'Clear': '☀️',
      'Clouds': '☁️',
      'Rain': '🌧️',
      'Drizzle': '🌦️',
      'Thunderstorm': '⛈️',
      'Snow': '❄️',
      'Mist': '🌫️',
      'Fog': '🌫️',
      'Haze': '🌫️',
      'Dust': '🌪️',
      'Sand': '🌪️',
      'Ash': '🌋',
      'Squall': '💨',
      'Tornado': '🌪️'
    };
    return iconMap[condition] || '🌤️';
  }

  // Helper function to format time
  formatTime(timestamp) {
    if (!timestamp) return 'N/A';
    return new Date(timestamp * 1000).toLocaleTimeString('el-GR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // Helper function to format date
  formatDate(timestamp) {
    if (!timestamp) return 'N/A';
    return new Date(timestamp * 1000).toLocaleDateString('el-GR', {
      weekday: 'short',
      day: 'numeric',
      month: 'short'
    });
  }

  // Helper function to get wind direction
  getWindDirection(degrees) {
    if (!degrees) return '';
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  }

  // Helper function to format temperature
  formatTemperature(temp) {
    if (!temp) return 'N/A';
    return `${Math.round(temp)}°C`;
  }

  // Helper function to format pressure
  formatPressure(pressure) {
    if (!pressure) return 'N/A';
    return `${pressure} hPa`;
  }

  // Helper function to format humidity
  formatHumidity(humidity) {
    if (!humidity) return 'N/A';
    return `${humidity}%`;
  }

  // Helper function to format wind speed
  formatWindSpeed(speed) {
    if (!speed) return 'N/A';
    return `${speed} m/s`;
  }

  // Helper function to format visibility
  formatVisibility(visibility) {
    if (!visibility) return 'N/A';
    return `${(visibility / 1000).toFixed(1)} km`;
  }
}

const weatherService = new WeatherService();
export default weatherService;
