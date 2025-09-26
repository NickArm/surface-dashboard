# 🖥️ Surface Dashboard

A modern, customizable desktop dashboard built with Electron and React. Monitor your system, control applications, and stay informed with real-time widgets.

![Dashboard Preview](https://via.placeholder.com/800x400/1a1a2e/ffffff?text=Surface+Dashboard+Preview)

## ✨ Features

### 🎯 Multi-Dashboard System
- **Multiple Dashboard Profiles**: Switch between Work, Gaming, and Personal dashboards
- **Customizable Widget Layout**: Each dashboard has its own widget configuration
- **Persistent Settings**: All configurations saved automatically

### 📊 System Monitoring
- **Hardware Monitor**: Real-time CPU, Memory, and Graphics monitoring
- **System Stats**: Disk usage, Network activity, and System uptime
- **Performance Metrics**: Visual progress bars and detailed statistics

### 🌤️ Weather Integration
- **Current Weather**: Real-time weather conditions
- **Detailed Information**: Temperature, humidity, wind speed, and more
- **Location-Based**: Automatic location detection and weather data

### 🎵 Media Control
- **Spotify Widget**: Music playback control and track information
- **Media Controls**: Play, Pause, Skip, Volume control
- **Album Artwork**: Beautiful track display with album covers

### 🚀 Application Management
- **App Shortcuts**: Quick access to Windows applications
- **Smart Icons**: Automatic icon detection for common apps
- **One-Click Launch**: Instant application launching

### 🎨 Modern Design
- **Dark/Light Themes**: Automatic theme switching with CSS variables
- **Responsive Layout**: Bootstrap-style grid system (1/12 to 12/12 columns)
- **Auto-flowing Widgets**: Smart layout that adapts to screen size
- **Smooth Animations**: Modern UI with smooth transitions
- **Touch-Friendly**: Optimized for touch interfaces

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Windows 10/11 (primary support)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/NickArm/surface-dashboard.git
   cd surface-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the application**
   ```bash
   npm run electron
   ```

4. **For development**
   ```bash
   npm start          # Start React development server
   npm run electron   # Start Electron app
   ```

## 📁 Project Structure

```
surface-dashboard/
├── src/
│   ├── components/              # React components
│   │   ├── ResponsiveDashboard.js # Main dashboard component
│   │   ├── Header.js            # Main header component
│   │   ├── SettingsModal.js     # Settings and dashboard selection
│   │   ├── ErrorBoundary.js     # Error handling
│   │   └── ResponsiveDashboard.css # Dashboard styling
│   ├── contexts/                # React contexts
│   │   ├── ThemeContext.js      # Theme management
│   │   ├── DashboardContext.js  # Dashboard management
│   │   └── SettingsContext.js   # Settings management
│   ├── widgets/                 # Widget implementations
│   │   ├── hardware/            # Hardware monitoring
│   │   │   ├── HardwareMonitorWidget.js
│   │   │   ├── HardwareMonitorWidget.css
│   │   │   ├── hardwareService.js
│   │   │   └── hardwareIPC.js
│   │   ├── system/              # System statistics
│   │   │   ├── SystemStatsWidget.js
│   │   │   ├── SystemStatsWidget.css
│   │   │   ├── systemService.js
│   │   │   └── systemIPC.js
│   │   ├── weather/             # Weather information
│   │   │   ├── WeatherWidget.js
│   │   │   ├── WeatherWidget.css
│   │   │   ├── weatherService.js
│   │   │   └── weatherIPC.js
│   │   ├── apps/                # Application shortcuts
│   │   │   ├── AppShortcutsWidget.js
│   │   │   ├── AppShortcutsWidget.css
│   │   │   └── appsIPC.js
│   │   ├── spotify/             # Spotify integration
│   │   │   ├── SpotifyWidget.js
│   │   │   ├── SpotifyWidget.css
│   │   │   ├── spotifyService.js
│   │   │   └── spotifyIPC.js
│   │   └── index.js             # Widget exports
│   ├── utils/                   # Utility functions
│   │   └── widgetSizes.js       # Widget size management
│   ├── App.js                   # Main application component
│   ├── App.css                  # Application styling
│   └── index.css                # Global styles with CSS variables
├── public/
│   ├── electron.js              # Electron main process
│   ├── preload.js               # Electron preload script
│   ├── index.html               # HTML template
│   └── manifest.json            # App manifest
├── build/                       # Production build
├── package.json                 # Project configuration
├── CHANGELOG.md                 # Project changelog
└── README.md                    # Project documentation
```

## 🎛️ Dashboard Profiles

### 💼 Work Dashboard
Perfect for productivity and professional use:
- **Hardware Monitor**: System performance tracking
- **System Stats**: Resource usage monitoring
- **App Shortcuts**: Quick access to work applications

### 🎮 Gaming Dashboard
Optimized for gaming and entertainment:
- **Hardware Monitor**: GPU and CPU monitoring
- **System Stats**: Performance metrics
- **App Shortcuts**: Gaming applications
- **Spotify Widget**: Music control while gaming

### 🏠 Personal Dashboard
Complete dashboard with all features:
- **All Widgets**: Full feature set enabled
- **Weather**: Daily weather information
- **Spotify**: Music and entertainment
- **System Monitoring**: Complete system overview

## 🔧 Configuration

### Widget Management
1. Click the **Settings** button (⚙️) in the header
2. Select your desired **Dashboard Profile**
3. Toggle widgets on/off as needed
4. Settings are automatically saved

### Theme Switching
- **Automatic**: Theme switches based on system preferences
- **Manual**: Use the theme toggle in the header
- **Persistent**: Theme preference saved across sessions

### Weather Configuration
- **Location**: Automatically detected
- **API Key**: Configured for Athens, Greece
- **Units**: Metric system (Celsius, km/h)

## 🛠️ Development

### Adding New Widgets

1. **Create widget folder** in `src/widgets/`
2. **Implement widget component** with React
3. **Add service file** for data handling
4. **Create IPC handlers** for Electron communication
5. **Add to DashboardContext** for configuration
6. **Update SettingsModal** for widget management

### Widget Structure
```javascript
// Widget Component
const MyWidget = () => {
  // Widget implementation
};

// Service File
class MyWidgetService {
  // Data handling and API calls
}

// IPC Handlers
const setupMyWidgetIPC = () => {
  // Electron IPC communication
};
```

### Building for Production
```bash
npm run build        # Build React app
npm run electron     # Start Electron with production build
```

## 📊 System Requirements

### Minimum Requirements
- **OS**: Windows 10 (Build 1903 or higher)
- **RAM**: 4GB
- **Storage**: 500MB free space
- **Network**: Internet connection for weather and Spotify

### Recommended Requirements
- **OS**: Windows 11
- **RAM**: 8GB or higher
- **Storage**: 1GB free space
- **GPU**: Dedicated graphics card for optimal performance

## 🔌 API Integrations

### OpenWeatherMap API
- **Purpose**: Weather data and forecasts
- **Rate Limit**: 1000 calls/day (free tier)
- **Data**: Current weather, temperature, humidity, wind

### Spotify Web API
- **Purpose**: Music playback control
- **Authentication**: OAuth 2.0 (simplified implementation)
- **Features**: Track info, playback control, volume

### System Information
- **Library**: `systeminformation` npm package
- **Data**: CPU, Memory, Disk, Network, Graphics
- **Updates**: Real-time monitoring with configurable intervals

## 🐛 Troubleshooting

### Common Issues

**Widget not loading**
- Check if the widget is enabled in Settings
- Verify Electron IPC communication
- Check browser console for errors

**Weather data not showing**
- Verify internet connection
- Check OpenWeatherMap API key
- Ensure location permissions

**Spotify widget not working**
- Verify Spotify Premium account
- Check authentication status
- Review Spotify Web API configuration

**Performance issues**
- Reduce widget update intervals
- Disable unnecessary widgets
- Check system resource usage

### Debug Mode
Enable debug mode for detailed logging:
```bash
npm run electron -- --debug
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow React best practices
- Use functional components with hooks
- Implement proper error handling
- Add comments for complex logic
- Test on multiple screen resolutions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Electron**: Desktop application framework
- **React**: Frontend library
- **Lucide React**: Beautiful icons
- **OpenWeatherMap**: Weather data API
- **Spotify**: Music streaming platform
- **SystemInformation**: System monitoring library

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/NickArm/surface-dashboard/issues)
- **Discussions**: [GitHub Discussions](https://github.com/NickArm/surface-dashboard/discussions)
- **Email**: armenisnick@gmail.com
- **Website**: [armenisnick.com](https://armenisnick.com)

---

**Made with ❤️ by Nick Armenis for Windows users who want a beautiful, functional dashboard**