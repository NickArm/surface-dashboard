// Widget Size Utility Functions
// Bootstrap-style column system (1-12 columns)

export const WIDGET_SIZE_PRESETS = {
  // Small widgets (1-3 columns)
  small: { cols: 3 },      // 25% width
  medium: { cols: 4 },     // 33.33% width
  large: { cols: 6 },      // 50% width
  xlarge: { cols: 8 },     // 66.67% width
  full: { cols: 12 }       // 100% width
};

// Calculate widget size based on content type
export const getOptimalWidgetSize = (widgetType) => {
  const sizeMap = {
    // System monitoring widgets - need more space
    hardwareMonitor: WIDGET_SIZE_PRESETS.large,    // 6 cols (50%)
    systemStats: WIDGET_SIZE_PRESETS.large,        // 6 cols (50%)
    
    // Media widgets - medium size
    weather: WIDGET_SIZE_PRESETS.medium,           // 4 cols (33.33%)
    spotify: WIDGET_SIZE_PRESETS.medium,           // 4 cols (33.33%)
    
    // App shortcuts - can vary
    appShortcuts: WIDGET_SIZE_PRESETS.medium,      // 4 cols (33.33%)
    
    // Default
    default: WIDGET_SIZE_PRESETS.medium
  };
  
  return sizeMap[widgetType] || sizeMap.default;
};

// Calculate responsive widget sizes
export const getResponsiveWidgetSize = (widgetType, screenWidth) => {
  const baseSize = getOptimalWidgetSize(widgetType);
  
  if (screenWidth < 768) {
    // Mobile: all widgets full width
    return WIDGET_SIZE_PRESETS.full;
  } else if (screenWidth < 1200) {
    // Tablet: larger widgets become full width
    if (baseSize.cols >= 6) {
      return WIDGET_SIZE_PRESETS.full;
    }
    return baseSize;
  } else {
    // Desktop: use optimal size
    return baseSize;
  }
};

// Validate widget size
export const isValidWidgetSize = (size) => {
  return size && typeof size.cols === 'number' && size.cols >= 1 && size.cols <= 12;
};

// Get column percentage
export const getColumnPercentage = (cols) => {
  return (cols / 12) * 100;
};

// Get CSS class for column size
export const getColumnClass = (cols) => {
  return `col-${cols}`;
};

// Calculate total columns used in a row
export const calculateRowColumns = (widgetSizes) => {
  return Object.values(widgetSizes).reduce((total, size) => total + size.cols, 0);
};

// Check if widgets fit in a row
export const widgetsFitInRow = (widgetSizes) => {
  return calculateRowColumns(widgetSizes) <= 12;
};

// Auto-adjust widget sizes to fit in rows
export const autoAdjustWidgetSizes = (widgetSizes) => {
  const totalCols = calculateRowColumns(widgetSizes);
  
  if (totalCols <= 12) {
    return widgetSizes; // Already fits
  }
  
  // Scale down proportionally
  const scaleFactor = 12 / totalCols;
  const adjustedSizes = {};
  
  Object.entries(widgetSizes).forEach(([widgetId, size]) => {
    const newCols = Math.max(1, Math.floor(size.cols * scaleFactor));
    adjustedSizes[widgetId] = { cols: newCols };
  });
  
  return adjustedSizes;
};
