import React from 'react';
import { Monitor, Calculator, FileText, Folder, Settings, Terminal, Palette, Clipboard } from 'lucide-react';
import './AppShortcutsWidget.css';

const AppShortcutsWidget = ({ appShortcuts }) => {
  if (!appShortcuts) {
    return (
      <div className="dashboard-card app-shortcuts-widget">
        <h2>App Shortcuts</h2>
        <div className="loading">Loading app shortcuts...</div>
      </div>
    );
  }

  const getAppIcon = (appName) => {
    if (!appName) return <Monitor className="app-icon" />;
    const name = appName.toLowerCase();
    if (name.includes('calculator')) return <Calculator className="app-icon" />;
    if (name.includes('notepad')) return <FileText className="app-icon" />;
    if (name.includes('explorer') || name.includes('file')) return <Folder className="app-icon" />;
    if (name.includes('task manager')) return <Monitor className="app-icon" />;
    if (name.includes('cmd') || name.includes('command')) return <Terminal className="app-icon" />;
    if (name.includes('control panel')) return <Settings className="app-icon" />;
    if (name.includes('settings')) return <Settings className="app-icon" />;
    if (name.includes('paint')) return <Palette className="app-icon" />;
    if (name.includes('wordpad')) return <FileText className="app-icon" />;
    if (name.includes('snipping')) return <Clipboard className="app-icon" />;
    return <Monitor className="app-icon" />;
  };

  const handleAppLaunch = async (appPath) => {
    try {
      if (window.electronAPI && window.electronAPI.launchApp) {
        await window.electronAPI.launchApp(appPath);
      } else {
        console.error('Electron API not available');
      }
    } catch (error) {
      console.error('Error launching app:', error);
    }
  };

  return (
    <div className="dashboard-card app-shortcuts-widget">
      <h2>App Shortcuts</h2>
      
      <div className="app-shortcuts-grid">
        {appShortcuts.slice(0, 6).map((app, index) => (
          <div 
            key={index} 
            className="app-shortcut"
            onClick={() => handleAppLaunch(app.path)}
            title={`Launch ${app.name || 'Unknown App'}`}
          >
            <div className="app-icon-container">
              {getAppIcon(app.name)}
            </div>
            <div className="app-name">{app.name || 'Unknown App'}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppShortcutsWidget;
