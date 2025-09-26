# 🎯 Dashboard Layout System

## Overview
Το Surface Dashboard χρησιμοποιεί τώρα ένα **Bootstrap-style grid system** με 12 columns για την οργάνωση των widgets. Αυτό επιτρέπει ευελιξία και scalability για μελλοντικές προσθήκες widgets.

## 🏗️ Grid System

### Column System (1-12)
- **1 column** = 8.33% width
- **2 columns** = 16.67% width  
- **3 columns** = 25% width
- **4 columns** = 33.33% width
- **6 columns** = 50% width
- **8 columns** = 66.67% width
- **12 columns** = 100% width

### Widget Size Presets
```javascript
const WIDGET_SIZE_PRESETS = {
  small: { cols: 3 },      // 25% width
  medium: { cols: 4 },     // 33.33% width  
  large: { cols: 6 },      // 50% width
  xlarge: { cols: 8 },     // 66.67% width
  full: { cols: 12 }       // 100% width
};
```

## 📊 Current Widget Layouts

### Work Dashboard
- **Hardware Monitor**: 6 cols (50%)
- **System Stats**: 6 cols (50%)
- **App Shortcuts**: 12 cols (100%)

### Gaming Dashboard  
- **Hardware Monitor**: 6 cols (50%)
- **System Stats**: 6 cols (50%)
- **App Shortcuts**: 4 cols (33.33%)
- **Spotify**: 4 cols (33.33%)

### Personal Dashboard
- **Hardware Monitor**: 6 cols (50%)
- **System Stats**: 6 cols (50%)
- **App Shortcuts**: 4 cols (33.33%)
- **Weather**: 4 cols (33.33%)
- **Spotify**: 4 cols (33.33%)

## 🔧 Technical Implementation

### Files Structure
```
src/
├── components/
│   ├── Dashboard.js          # Main dashboard component
│   └── Dashboard.css         # Dashboard styles
├── contexts/
│   └── DashboardContext.js   # Widget size management
└── utils/
    └── widgetSizes.js        # Size calculation utilities
```

### Key Functions

#### `getOptimalWidgetSize(widgetType)`
Επιστρέφει το βέλτιστο μέγεθος για κάθε τύπο widget.

#### `getColumnClass(cols)`
Επιστρέφει το CSS class για το column size (π.χ. `col-6`).

#### `isValidWidgetSize(size)`
Επικυρώνει αν το μέγεθος είναι έγκυρο (1-12 columns).

## 📱 Responsive Behavior

### Desktop (>1200px)
- Widgets χρησιμοποιούν τα configured sizes
- Bootstrap-style grid system

### Tablet (768px-1200px)
- Widgets με 6+ columns γίνονται full width
- Μικρότερα widgets παραμένουν στο configured size

### Mobile (<768px)
- Όλα τα widgets γίνονται full width (12 columns)
- Vertical stacking

### Surface-Specific (1201px-1366px)
- Optimized για Surface Pro landscape
- Adjusted column percentages για καλύτερο fit

## 🎨 CSS Classes

### Column Classes
```css
.col-1 { flex: 0 0 8.333333%; max-width: 8.333333%; }
.col-2 { flex: 0 0 16.666667%; max-width: 16.666667%; }
.col-3 { flex: 0 0 25%; max-width: 25%; }
.col-4 { flex: 0 0 33.333333%; max-width: 33.333333%; }
.col-6 { flex: 0 0 50%; max-width: 50%; }
.col-12 { flex: 0 0 100%; max-width: 100%; }
```

### Layout Classes
```css
.dashboard-row {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.widget-container {
  flex: 1;
  min-width: 0;
}
```

## 🚀 Adding New Widgets

### 1. Define Widget Size
```javascript
// Στο widgetSizes.js
const sizeMap = {
  newWidget: WIDGET_SIZE_PRESETS.medium, // 4 cols
  // ...
};
```

### 2. Add to Dashboard Context
```javascript
// Στο DashboardContext.js
widgetSizes: {
  // existing widgets...
  newWidget: getOptimalWidgetSize('newWidget')
}
```

### 3. Render in Dashboard
```javascript
// Στο Dashboard.js
{renderWidget('newWidget', NewWidgetComponent)}
```

## 🔍 Debug Mode

Το dashboard έχει built-in debug info που δείχνει:
- Current dashboard profile
- Enabled widgets count  
- Widget sizes (cols/percentage)

## 📈 Future Enhancements

1. **Drag & Drop**: Widget repositioning
2. **Custom Sizes**: User-defined widget sizes
3. **Auto-layout**: Intelligent widget arrangement
4. **Nested Grids**: Sub-widgets within widgets
5. **Dynamic Sizing**: Context-aware widget resizing

## 🎯 Benefits

- **Scalable**: Easy to add new widgets
- **Responsive**: Works on all screen sizes
- **Consistent**: Bootstrap-style grid system
- **Flexible**: Configurable per dashboard profile
- **Maintainable**: Clean separation of concerns
