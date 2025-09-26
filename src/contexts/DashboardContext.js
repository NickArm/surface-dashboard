import React, { createContext, useContext, useState, useEffect } from 'react';
import { getOptimalWidgetSize } from '../utils/widgetSizes';

const DashboardContext = createContext();

// Predefined dashboard profiles with Bootstrap-style widget sizes
const DEFAULT_DASHBOARDS = {
  work: {
    id: 'work',
    name: 'Work Dashboard',
    description: 'Professional productivity dashboard',
    icon: '💼',
    widgets: {
      hardwareMonitor: true,
      systemStats: true,
      appShortcuts: true,
      weather: false,
      spotify: false
    },
    widgetSizes: {
      hardwareMonitor: { cols: 4 }, // 4/12 = 33.33% width (μισό από 8/12)
      systemStats: { cols: 3 },      // 3/12 = 25% width
      appShortcuts: { cols: 12 },   // 100% width for work dashboard
      weather: getOptimalWidgetSize('weather'),
      spotify: getOptimalWidgetSize('spotify')
    }
  },
  gaming: {
    id: 'gaming',
    name: 'Gaming Dashboard',
    description: 'Gaming-focused dashboard',
    icon: '🎮',
    widgets: {
      hardwareMonitor: true,
      systemStats: true,
      appShortcuts: true,
      weather: false,
      spotify: false
    },
    widgetSizes: {
      hardwareMonitor: { cols: 4 }, // 4/12 = 33.33% width
      systemStats: { cols: 3 },      // 3/12 = 25% width
      appShortcuts: getOptimalWidgetSize('appShortcuts'),
      weather: getOptimalWidgetSize('weather'),
      spotify: getOptimalWidgetSize('spotify')
    }
  },
  personal: {
    id: 'personal',
    name: 'Personal Dashboard',
    description: 'Personal use dashboard',
    icon: '🏠',
    widgets: {
      hardwareMonitor: true,
      systemStats: true,
      appShortcuts: true,
      weather: true,
      spotify: false
    },
    widgetSizes: {
      hardwareMonitor: { cols: 4 }, // 4/12 = 33.33% width
      systemStats: { cols: 3 },      // 3/12 = 25% width
      appShortcuts: getOptimalWidgetSize('appShortcuts'),
      weather: getOptimalWidgetSize('weather'),
      spotify: getOptimalWidgetSize('spotify')
    }
  }
};

export const DashboardProvider = ({ children }) => {
  const [currentDashboard, setCurrentDashboard] = useState(() => {
    const saved = localStorage.getItem('currentDashboard');
    return saved || 'work';
  });

  const [dashboards, setDashboards] = useState(() => {
    const saved = localStorage.getItem('dashboards');
    return saved ? JSON.parse(saved) : DEFAULT_DASHBOARDS;
  });

  const [widgetSettings, setWidgetSettings] = useState(() => {
    const saved = localStorage.getItem('widgetSettings');
    return saved ? JSON.parse(saved) : dashboards[currentDashboard]?.widgets || DEFAULT_DASHBOARDS.work.widgets;
  });

  // Update widget settings when dashboard changes
  useEffect(() => {
    const currentDashboardConfig = dashboards[currentDashboard];
    if (currentDashboardConfig) {
      setWidgetSettings(currentDashboardConfig.widgets);
    }
  }, [currentDashboard, dashboards]);

  // Save to localStorage whenever settings change
  useEffect(() => {
    localStorage.setItem('currentDashboard', currentDashboard);
    localStorage.setItem('dashboards', JSON.stringify(dashboards));
    localStorage.setItem('widgetSettings', JSON.stringify(widgetSettings));
  }, [currentDashboard, dashboards, widgetSettings]);

  const switchDashboard = (dashboardId) => {
    if (dashboards[dashboardId]) {
      setCurrentDashboard(dashboardId);
    }
  };

  const updateDashboardWidgets = (dashboardId, newWidgetSettings) => {
    setDashboards(prev => ({
      ...prev,
      [dashboardId]: {
        ...prev[dashboardId],
        widgets: newWidgetSettings
      }
    }));
  };

  const createCustomDashboard = (name, description, icon, widgets) => {
    const id = name.toLowerCase().replace(/\s+/g, '-');
    const newDashboard = {
      id,
      name,
      description,
      icon,
      widgets: widgets || DEFAULT_DASHBOARDS.work.widgets
    };
    
    setDashboards(prev => ({
      ...prev,
      [id]: newDashboard
    }));
    
    return id;
  };

  const deleteDashboard = (dashboardId) => {
    if (Object.keys(dashboards).length <= 1) {
      alert('Cannot delete the last dashboard!');
      return;
    }
    
    setDashboards(prev => {
      const newDashboards = { ...prev };
      delete newDashboards[dashboardId];
      return newDashboards;
    });
    
    // Switch to first available dashboard if current one was deleted
    if (currentDashboard === dashboardId) {
      const remainingDashboards = Object.keys(dashboards).filter(id => id !== dashboardId);
      if (remainingDashboards.length > 0) {
        setCurrentDashboard(remainingDashboards[0]);
      }
    }
  };

  const toggleWidget = (widgetName) => {
    const newWidgetSettings = {
      ...widgetSettings,
      [widgetName]: !widgetSettings[widgetName]
    };
    
    setWidgetSettings(newWidgetSettings);
    
    // Update current dashboard's widget configuration
    updateDashboardWidgets(currentDashboard, newWidgetSettings);
  };

  const resetToDefaults = () => {
    const defaultWidgets = DEFAULT_DASHBOARDS[currentDashboard]?.widgets || DEFAULT_DASHBOARDS.work.widgets;
    setWidgetSettings(defaultWidgets);
    updateDashboardWidgets(currentDashboard, defaultWidgets);
  };

  const getCurrentDashboardInfo = () => {
    return dashboards[currentDashboard] || DEFAULT_DASHBOARDS.work;
  };

  const updateWidgetSize = (widgetId, size) => {
    setDashboards(prev => ({
      ...prev,
      [currentDashboard]: {
        ...prev[currentDashboard],
        widgetSizes: {
          ...prev[currentDashboard].widgetSizes,
          [widgetId]: size
        }
      }
    }));
  };

  const getWidgetSizes = () => {
    const sizes = dashboards[currentDashboard]?.widgetSizes;
    if (!sizes) {
      // If no sizes exist, initialize with defaults
      const defaultSizes = DEFAULT_DASHBOARDS[currentDashboard]?.widgetSizes || {
        hardwareMonitor: { cols: 4 }, // 4/12 = 33.33% width
        systemStats: { cols: 3 },      // 3/12 = 25% width
        appShortcuts: getOptimalWidgetSize('appShortcuts'),
        weather: getOptimalWidgetSize('weather'),
        spotify: getOptimalWidgetSize('spotify')
      };
      setDashboards(prev => ({
        ...prev,
        [currentDashboard]: {
          ...prev[currentDashboard],
          widgetSizes: defaultSizes
        }
      }));
      return defaultSizes;
    }
    return sizes;
  };

  const resetWidgetSizes = () => {
    const defaultSizes = DEFAULT_DASHBOARDS[currentDashboard]?.widgetSizes || {
      hardwareMonitor: { cols: 4 }, // 4/12 = 33.33% width
      systemStats: { cols: 3 },      // 3/12 = 25% width
      appShortcuts: getOptimalWidgetSize('appShortcuts'),
      weather: getOptimalWidgetSize('weather'),
      spotify: getOptimalWidgetSize('spotify')
    };
    setDashboards(prev => ({
      ...prev,
      [currentDashboard]: {
        ...prev[currentDashboard],
        widgetSizes: defaultSizes
      }
    }));
  };

  return (
    <DashboardContext.Provider value={{
      currentDashboard,
      dashboards,
      widgetSettings,
      switchDashboard,
      updateDashboardWidgets,
      createCustomDashboard,
      deleteDashboard,
      toggleWidget,
      resetToDefaults,
      getCurrentDashboardInfo,
      updateWidgetSize,
      getWidgetSizes,
      resetWidgetSizes
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);
