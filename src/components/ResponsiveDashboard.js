import React from 'react';
import { useDashboard } from '../contexts/DashboardContext';
import Header from './Header';
import { 
  WeatherWidget, 
  AppShortcutsWidget, 
  SystemStatsWidget, 
  HardwareMonitorWidget,
  SpotifyWidget,
  ClockWidget
} from '../widgets';
import './ResponsiveDashboard.css';

const ResponsiveDashboard = ({ systemInfo, weather, appShortcuts, onRefreshWeather }) => {
  const { widgetSettings, currentDashboard, dashboards } = useDashboard();

  // Get widget sizes from current dashboard configuration
  const getWidgetSizes = () => {
    const currentDashboardConfig = dashboards[currentDashboard];
    const configSizes = currentDashboardConfig?.widgetSizes;
    
    if (!configSizes) {
      // Use default sizes
      return {
        hardwareMonitor: { cols: 4 },
        systemStats: { cols: 3 },
        appShortcuts: { cols: 4 },
        weather: { cols: 4 },
        spotify: { cols: 4 }
      };
    }
    
    return configSizes;
  };

  const widgetSizes = getWidgetSizes();

  // Get enabled widgets with their sizes
  const getEnabledWidgets = () => {
    const enabledWidgets = [];
    
    Object.entries(widgetSettings).forEach(([widgetId, isEnabled]) => {
      if (isEnabled) {
        const size = widgetSizes[widgetId];
        enabledWidgets.push({
          id: widgetId,
          size: size,
          cols: size.cols
        });
      }
    });
    
    return enabledWidgets;
  };

  const enabledWidgets = getEnabledWidgets();

  // Organize widgets into rows (max 12 columns per row)
  const organizeWidgetsIntoRows = () => {
    const rows = [];
    let currentRow = [];
    let currentRowCols = 0;

    enabledWidgets.forEach(widget => {
      // If adding this widget would exceed 12 columns, start a new row
      if (currentRowCols + widget.cols > 12) {
        if (currentRow.length > 0) {
          rows.push([...currentRow]);
          currentRow = [];
          currentRowCols = 0;
        }
      }
      
      currentRow.push(widget);
      currentRowCols += widget.cols;
    });

    // Add the last row if it has widgets
    if (currentRow.length > 0) {
      rows.push(currentRow);
    }

    return rows;
  };

  const widgetRows = organizeWidgetsIntoRows();

  const renderWidget = (widgetId, WidgetComponent) => {
    const size = widgetSizes[widgetId];
    const colClass = `col-${size.cols}`;

    return (
      <div key={widgetId} className={`widget-container ${colClass}`}>
        {widgetId === 'hardwareMonitor' && <WidgetComponent systemInfo={systemInfo} />}
        {widgetId === 'systemStats' && <WidgetComponent />}
        {widgetId === 'appShortcuts' && <WidgetComponent appShortcuts={appShortcuts} />}
        {widgetId === 'weather' && <WidgetComponent weather={weather} onRefresh={() => onRefreshWeather(true)} />}
        {widgetId === 'spotify' && <WidgetComponent />}
        {widgetId === 'clock' && <WidgetComponent />}
      </div>
    );
  };

  return (
    <div className="responsive-dashboard">
      <Header />
      
      <div className="dashboard-content">
        <div className="dashboard-grid">
          {widgetRows.map((row, rowIndex) => (
            <div key={rowIndex} className="dashboard-row">
              {row.map(widget => {
                const WidgetComponent = {
                  hardwareMonitor: HardwareMonitorWidget,
                  systemStats: SystemStatsWidget,
                  appShortcuts: AppShortcutsWidget,
                  weather: WeatherWidget,
                  spotify: SpotifyWidget,
                  clock: ClockWidget
                }[widget.id];
                
                return renderWidget(widget.id, WidgetComponent);
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResponsiveDashboard;
