// Hardware IPC Handlers - Moved from electron.js
const { ipcMain } = require('electron');
const si = require('systeminformation');

// Hardware Monitor IPC Handlers
const setupHardwareIPC = () => {
  // Handle hardware monitoring
  ipcMain.handle('get-system-info', async () => {
    try {
      const [cpu, memory, graphics, temperature, cpuUsage, osInfo] = await Promise.all([
        si.cpu(),
        si.mem(),
        si.graphics(),
        si.cpuTemperature(),
        si.currentLoad(),
        si.osInfo()
      ]);
      
      return {
        cpu: {
          manufacturer: cpu.manufacturer,
          brand: cpu.brand,
          speed: cpu.speed,
          cores: cpu.cores,
          physicalCores: cpu.physicalCores,
          usage: Math.round(cpuUsage.currentLoad || 0)
        },
        memory: {
          total: memory.total,
          free: memory.free,
          used: memory.used,
          percentage: (memory.used / memory.total) * 100
        },
        graphics: graphics.controllers,
        temperature: temperature.main || null,
        os: {
          platform: osInfo.platform,
          release: osInfo.release,
          arch: osInfo.arch,
          hostname: osInfo.hostname
        }
      };
    } catch (error) {
      console.error('Error getting system info:', error);
      return null;
    }
  });

  // Handle CPU usage specifically for real-time updates
  ipcMain.handle('get-cpu-usage', async () => {
    try {
      const cpuUsage = await si.currentLoad();
      return Math.round(cpuUsage.currentLoad || 0);
    } catch (error) {
      console.error('Error getting CPU usage:', error);
      return 0;
    }
  });
};

module.exports = { setupHardwareIPC };