import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary';
import ResponsiveDashboard from './components/ResponsiveDashboard';
import { ThemeProvider } from './contexts/ThemeContext';
import { DashboardProvider } from './contexts/DashboardContext';

// Use the exposed electronAPI from preload script

function AppContent() {
  const [systemInfo, setSystemInfo] = useState(null);
  const [weather, setWeather] = useState(null);
  const [appShortcuts, setAppShortcuts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadSystemInfo = useCallback(async () => {
    try {
      if (!window.electronAPI) {
        throw new Error('Electron API not available');
      }
      const info = await window.electronAPI.getSystemInfo();
      setSystemInfo(info);
    } catch (error) {
      console.error('Error loading system info:', error);
      if (!systemInfo) {
        setError('Failed to load system information - Make sure Electron is running');
      }
    }
  }, [systemInfo]);

  const loadWeather = useCallback(async (forceRefresh = false) => {
    try {
      if (!window.electronAPI) {
        throw new Error('Electron API not available');
      }
      
      // Only fetch if we don't have weather data, it's older than 10 minutes, or force refresh
      if (!weather || (Date.now() - weather.lastUpdated) > 600000 || forceRefresh) {
        const weatherData = await window.electronAPI.getWeather(); // No city parameter - will use default from config
        setWeather({ ...weatherData, lastUpdated: Date.now() });
      }
    } catch (error) {
      console.error('Error loading weather:', error);
      if (!weather) {
        setError('Failed to load weather data - Make sure Electron is running');
      }
    }
  }, [weather]);

  const loadAppShortcuts = useCallback(async () => {
    try {
      if (!window.electronAPI) {
        throw new Error('Electron API not available');
      }
      
      // Only fetch if we don't have shortcuts or it's older than 30 minutes
      if (appShortcuts.length === 0 || (Date.now() - (appShortcuts.lastUpdated || 0)) > 1800000) {
        const shortcuts = await window.electronAPI.getAppShortcuts();
        setAppShortcuts([...shortcuts, { lastUpdated: Date.now() }]);
      }
    } catch (error) {
      console.error('Error loading app shortcuts:', error);
      if (appShortcuts.length === 0) {
        setError('Failed to load app shortcuts - Make sure Electron is running');
      }
    }
  }, [appShortcuts]);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Load system info first (most important)
        await loadSystemInfo();
        
        // Hide loading screen after system info is loaded
        setLoading(false);
        
        // Load other data in background (only once)
        setTimeout(async () => {
          try {
            await loadWeather();
            await loadAppShortcuts();
          } catch (error) {
            console.error('Error loading background data:', error);
          }
        }, 100);
        
      } catch (err) {
        setError('Failed to load initial data');
        console.error('Error loading initial data:', err);
        setLoading(false);
      }
    };

    loadInitialData();

    // Set up real-time updates
    const interval = setInterval(() => {
      loadSystemInfo();
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array - only run once on mount


  if (loading) {
    return (
      <div className="App">
        <div className="loading-screen">
          <div className="loading-content">
            <div className="loading-spinner"></div>
            <h2>Loading Surface Dashboard...</h2>
            <p>Initializing system monitoring</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="App">
        <div className="error-screen">
          <div className="error-content">
            <h2>Error Loading Dashboard</h2>
            <p>{error}</p>
            <button 
              className="touch-button"
              onClick={() => window.location.reload()}
            >
              Reload Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App" style={{ margin: 0, padding: 0, overflow: 'hidden' }}>
      <ErrorBoundary>
        <ResponsiveDashboard 
          systemInfo={systemInfo}
          weather={weather}
          appShortcuts={appShortcuts}
          onRefreshWeather={loadWeather}
        />
      </ErrorBoundary>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <DashboardProvider>
        <AppContent />
      </DashboardProvider>
    </ThemeProvider>
  );
}

export default App;
