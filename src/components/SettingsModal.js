import React from 'react';
import { X, Monitor, BarChart3, Grid, Cloud, Music, RotateCcw } from 'lucide-react';
import { useDashboard } from '../contexts/DashboardContext';
import './SettingsModal.css';

const SettingsModal = ({ isOpen, onClose }) => {
  const { 
    currentDashboard, 
    dashboards, 
    widgetSettings, 
    switchDashboard, 
    toggleWidget, 
    resetToDefaults,
    getCurrentDashboardInfo 
  } = useDashboard();

  if (!isOpen) return null;

  const currentDashboardInfo = getCurrentDashboardInfo();

  const widgetConfigs = [
    {
      key: 'hardwareMonitor',
      name: 'Hardware Monitor',
      description: 'CPU, Memory, Temperature, System Info',
      icon: Monitor,
      color: '#3B82F6'
    },
    {
      key: 'systemStats',
      name: 'System Stats',
      description: 'Disk Usage, Network, Uptime',
      icon: BarChart3,
      color: '#10B981'
    },
    {
      key: 'appShortcuts',
      name: 'App Shortcuts',
      description: 'Quick access to Windows applications',
      icon: Grid,
      color: '#8B5CF6'
    },
    {
      key: 'weather',
      name: 'Weather Widget',
      description: 'Current weather and forecast',
      icon: Cloud,
      color: '#F59E0B'
    },
    {
      key: 'spotify',
      name: 'Spotify Widget',
      description: 'Control your Spotify Premium playback',
      icon: Music,
      color: '#1DB954'
    }
  ];

  return (
    <div className="settings-modal-overlay" onClick={onClose}>
      <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
        <div className="settings-modal-header">
          <h2>Dashboard Settings</h2>
          <button className="settings-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="settings-modal-content">
          {/* Dashboard Selection */}
          <div className="settings-section">
            <h3>Dashboard Profile</h3>
            <div className="dashboard-selection">
              <div className="current-dashboard">
                <span className="dashboard-icon">{currentDashboardInfo.icon}</span>
                <div className="dashboard-info">
                  <div className="dashboard-name">{currentDashboardInfo.name}</div>
                  <div className="dashboard-description">{currentDashboardInfo.description}</div>
                </div>
              </div>
              
              <div className="dashboard-options">
                {Object.values(dashboards).map(dashboard => (
                  <button
                    key={dashboard.id}
                    className={`dashboard-option ${currentDashboard === dashboard.id ? 'active' : ''}`}
                    onClick={() => switchDashboard(dashboard.id)}
                  >
                    <span className="dashboard-icon">{dashboard.icon}</span>
                    <span className="dashboard-name">{dashboard.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="settings-section">
            <h3>Widget Visibility</h3>
            <p className="settings-description">
              Choose which widgets to display on your dashboard
            </p>
            
            <div className="widget-settings-grid">
              {widgetConfigs.map((widget) => {
                const IconComponent = widget.icon;
                const isEnabled = widgetSettings[widget.key];
                
                return (
                  <div 
                    key={widget.key}
                    className={`widget-setting-card ${isEnabled ? 'enabled' : 'disabled'}`}
                    onClick={() => toggleWidget(widget.key)}
                  >
                    <div className="widget-setting-header">
                      <div 
                        className="widget-setting-icon"
                        style={{ backgroundColor: widget.color }}
                      >
                        <IconComponent size={20} />
                      </div>
                      <div className="widget-setting-info">
                        <h4>{widget.name}</h4>
                        <p>{widget.description}</p>
                      </div>
                      <div className="widget-setting-toggle">
                        <div className={`toggle-switch ${isEnabled ? 'active' : ''}`}>
                          <div className="toggle-slider"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="settings-actions">
            <button
              className="settings-reset-btn"
              onClick={resetToDefaults}
            >
              <RotateCcw size={16} />
              Reset Widgets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
