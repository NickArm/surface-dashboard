const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
// API key is now hardcoded in the weather handler

// Import widget IPC handlers
let setupSystemIPC, setupHardwareIPC, setupWeatherIPC, setupAppsIPC, setupSpotifyIPC;
try {
  const systemIPC = require(path.join(__dirname, '../src/widgets/system/systemIPC'));
  setupSystemIPC = systemIPC.setupSystemIPC;
} catch (error) {
  console.error('Error loading systemIPC:', error);
}

try {
  const hardwareIPC = require(path.join(__dirname, '../src/widgets/hardware/hardwareIPC'));
  setupHardwareIPC = hardwareIPC.setupHardwareIPC;
} catch (error) {
  console.error('Error loading hardwareIPC:', error);
}

try {
  const weatherIPC = require(path.join(__dirname, '../src/widgets/weather/weatherIPC'));
  setupWeatherIPC = weatherIPC.setupWeatherIPC;
} catch (error) {
  console.error('Error loading weatherIPC:', error);
}

try {
  const appsIPC = require(path.join(__dirname, '../src/widgets/apps/appsIPC'));
  setupAppsIPC = appsIPC.setupAppsIPC;
} catch (error) {
  console.error('Error loading appsIPC:', error);
}

try {
  const spotifyIPC = require(path.join(__dirname, '../src/widgets/spotify/spotifyIPC'));
  setupSpotifyIPC = spotifyIPC.setupSpotifyIPC;
} catch (error) {
  console.error('Error loading spotifyIPC:', error);
}

// Check if we're in development mode
const isDev = process.env.NODE_ENV === 'development' || process.env.npm_lifecycle_event === 'electron-dev';

let mainWindow;

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js')
    },
    fullscreen: true,
    frame: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: false,
    maximizable: false,
    minimizable: false,
    closable: false
  });

  // Load the app
  const startUrl = isDev 
    ? 'http://localhost:3000' 
    : `file://${path.join(__dirname, '../build/index.html')}`;
  
  mainWindow.loadURL(startUrl);

  // Open DevTools in development
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Handle custom protocol URLs (Spotify callback)
app.on('open-url', (event, url) => {
  console.log('Received URL:', url);
  
  // Extract token from URL
  const urlObj = new URL(url);
  const hash = urlObj.hash.substring(1);
  const params = new URLSearchParams(hash);
  const accessToken = params.get('access_token');
  const expiresIn = params.get('expires_in');
  
  if (accessToken && mainWindow) {
    console.log('Spotify token received:', accessToken);
    // Send token to renderer process
    mainWindow.webContents.send('spotify-token', { accessToken, expiresIn });
  }
});

// This method will be called when Electron has finished initialization
app.whenReady().then(() => {
  createWindow();
  
  // Setup all widget IPC handlers
  console.log('Setting up all widget IPC handlers...');
  
  if (setupSystemIPC) {
    try {
      setupSystemIPC();
      console.log('System IPC handlers setup complete');
    } catch (error) {
      console.error('Error setting up system IPC handlers:', error);
    }
  }
  
  if (setupHardwareIPC) {
    try {
      setupHardwareIPC();
      console.log('Hardware IPC handlers setup complete');
    } catch (error) {
      console.error('Error setting up hardware IPC handlers:', error);
    }
  }
  
  if (setupWeatherIPC) {
    try {
      setupWeatherIPC();
      console.log('Weather IPC handlers setup complete');
    } catch (error) {
      console.error('Error setting up weather IPC handlers:', error);
    }
  }
  
  if (setupAppsIPC) {
    try {
      setupAppsIPC();
      console.log('Apps IPC handlers setup complete');
    } catch (error) {
      console.error('Error setting up apps IPC handlers:', error);
    }
  }
  
  if (setupSpotifyIPC) {
    try {
      setupSpotifyIPC();
      console.log('Spotify IPC handlers setup complete');
    } catch (error) {
      console.error('Error setting up Spotify IPC handlers:', error);
    }
  }
  
  console.log('All widget IPC handlers setup complete!');
});

// Quit when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// All widget IPC handlers are now handled by individual widget IPC files
// This keeps the main electron.js clean and modular


// Handle power button click
ipcMain.handle('close-app', () => {
  app.quit();
});

// Handle DevTools opening
ipcMain.handle('open-devtools', () => {
  if (mainWindow) {
    mainWindow.webContents.openDevTools();
  }
});

// Handle display selection
ipcMain.handle('get-displays', () => {
  const { screen } = require('electron');
  return screen.getAllDisplays();
});

ipcMain.handle('set-display', (event, displayId) => {
  const { screen } = require('electron');
  const displays = screen.getAllDisplays();
  const targetDisplay = displays.find(d => d.id === displayId);
  
  if (targetDisplay && mainWindow) {
    const { x, y, width, height } = targetDisplay.bounds;
    mainWindow.setBounds({ x, y, width, height });
    return { success: true, display: targetDisplay };
  }
  
  return { success: false, error: 'Display not found' };
});

// Quit when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
