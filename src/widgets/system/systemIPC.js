// System IPC Handlers - Moved from electron.js
const { ipcMain } = require('electron');
const si = require('systeminformation');

// System Stats IPC Handlers
const setupSystemIPC = () => {
  // Handle disk usage
  ipcMain.handle('get-disk-usage', async () => {
    try {
      const disks = await si.fsSize();
      if (disks && disks.length > 0) {
        const mainDisk = disks[0]; // Get the main disk
        return {
          total: mainDisk.size,
          used: mainDisk.used,
          free: mainDisk.available,
          percentage: (mainDisk.used / mainDisk.size) * 100
        };
      }
      return { total: 0, used: 0, free: 0, percentage: 0 };
    } catch (error) {
      console.error('Error getting disk usage:', error);
      return { total: 0, used: 0, free: 0, percentage: 0 };
    }
  });

  // Handle network stats
  ipcMain.handle('get-network-stats', async () => {
    try {
      const networkStats = await si.networkStats();
      if (networkStats && networkStats.length > 0) {
        const mainInterface = networkStats[0];
        return {
          downloadSpeed: mainInterface.rx_sec || 0,
          uploadSpeed: mainInterface.tx_sec || 0,
          interface: mainInterface.iface || 'Unknown'
        };
      }
      return { downloadSpeed: 0, uploadSpeed: 0, interface: 'Unknown' };
    } catch (error) {
      console.error('Error getting network stats:', error);
      return { downloadSpeed: 0, uploadSpeed: 0, interface: 'Unknown' };
    }
  });

  // Handle uptime
  ipcMain.handle('get-uptime', async () => {
    try {
      const time = await si.time();
      return {
        uptime: time.uptime,
        bootTime: Date.now() - (time.uptime * 1000)
      };
    } catch (error) {
      console.error('Error getting uptime:', error);
      return { uptime: 0, bootTime: Date.now() };
    }
  });
};

module.exports = { setupSystemIPC };