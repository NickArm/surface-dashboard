import React, { useState, useEffect } from 'react';
import { Monitor, Settings, Power, MonitorSpeaker, Sun, Moon } from 'lucide-react';
import './Header.css';
import { useTheme } from '../contexts/ThemeContext';
import SettingsModal from './SettingsModal';

const Header = () => {
  const [displays, setDisplays] = useState([]);
  const [showDisplayMenu, setShowDisplayMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const loadDisplays = async () => {
      try {
        if (window.electronAPI) {
          const displayList = await window.electronAPI.getDisplays();
          setDisplays(displayList);
        }
      } catch (error) {
        console.error('Error loading displays:', error);
      }
    };

    loadDisplays();
  }, []);

  const handleSettings = () => {
    setShowSettings(true);
  };

  const handleShutdown = async () => {
    try {
      if (window.electronAPI) {
        await window.electronAPI.closeApp();
      }
    } catch (error) {
      console.error('Error closing app:', error);
    }
  };

  const handleDisplaySelect = async (displayId) => {
    try {
      if (window.electronAPI) {
        const result = await window.electronAPI.setDisplay(displayId);
        if (result.success) {
          console.log('Switched to display:', result.display.label);
          setShowDisplayMenu(false);
        }
      }
    } catch (error) {
      console.error('Error switching display:', error);
    }
  };

  const handleDebug = () => {
    console.log('=== DEBUG INFO ===');
    console.log('Debug button clicked!');
    console.log('Current theme:', isDarkMode ? 'dark' : 'light');
    console.log('Displays:', displays);
    console.log('Electron API available:', !!window.electronAPI);
    console.log('========================');
    
    // Try to open DevTools programmatically
    if (window.electronAPI && window.electronAPI.openDevTools) {
      window.electronAPI.openDevTools();
    } else {
      // Fallback: show alert with instructions
      alert('Debug info logged to console!\n\nTo see console:\n1. Press F12\n2. Go to Console tab\n3. Look for "=== DEBUG INFO ==="');
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <Monitor className="header-icon" />
        <h1>Surface Dashboard</h1>
      </div>
      
      <div className="header-right">
        <div className="display-selector">
          <button 
            className="touch-button header-button"
            onClick={() => setShowDisplayMenu(!showDisplayMenu)}
            title="Select Display"
          >
            <MonitorSpeaker size={20} />
          </button>
          
          {showDisplayMenu && (
            <div className="display-menu">
              <div className="display-menu-header">Select Display</div>
              {displays.map((display, index) => (
                <button
                  key={display.id}
                  className="display-option"
                  onClick={() => handleDisplaySelect(display.id)}
                >
                  <Monitor size={16} />
                  <span>{display.label || `Display ${index + 1}`}</span>
                  <span className="display-resolution">
                    {display.bounds.width}x{display.bounds.height}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
        
        <button 
          className="touch-button header-button"
          onClick={handleDebug}
          title="Debug Info"
        >
          🐛
        </button>
        
        <button 
          className="touch-button header-button"
          onClick={toggleTheme}
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <button 
          className="touch-button header-button"
          onClick={handleSettings}
          title="Settings"
        >
          <Settings size={20} />
        </button>
        
        <button 
          className="touch-button header-button"
          onClick={handleShutdown}
          title="Close App"
        >
          <Power size={20} />
        </button>
      </div>
      
      <SettingsModal 
        isOpen={showSettings} 
        onClose={() => setShowSettings(false)} 
      />
    </header>
  );
};

export default Header;
