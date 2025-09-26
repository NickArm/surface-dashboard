const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  getSystemInfo: () => ipcRenderer.invoke('get-system-info'),
  getWeather: (city) => ipcRenderer.invoke('get-weather', city),
  getAppShortcuts: () => ipcRenderer.invoke('get-app-shortcuts'),
  launchApp: (appPath) => ipcRenderer.invoke('launch-app', appPath),
  getCpuUsage: () => ipcRenderer.invoke('get-cpu-usage'),
  getDiskUsage: () => ipcRenderer.invoke('get-disk-usage'),
  getNetworkStats: () => ipcRenderer.invoke('get-network-stats'),
  getUptime: () => ipcRenderer.invoke('get-uptime'),
  closeApp: () => ipcRenderer.invoke('close-app'),
  getDisplays: () => ipcRenderer.invoke('get-displays'),
  setDisplay: (displayId) => ipcRenderer.invoke('set-display', displayId),
  openDevTools: () => ipcRenderer.invoke('open-devtools')
});
