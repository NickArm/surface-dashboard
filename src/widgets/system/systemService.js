// System Stats Service - Handles all system-related IPC calls
class SystemService {
  constructor() {
    this.isElectron = typeof window !== 'undefined' && window.electronAPI;
  }

  async getDiskUsage() {
    if (!this.isElectron) {
      throw new Error('Electron API not available');
    }
    
    try {
      const diskData = await window.electronAPI.getDiskUsage();
      return diskData;
    } catch (error) {
      console.error('SystemService: Error loading disk usage:', error);
      throw error;
    }
  }

  async getNetworkStats() {
    if (!this.isElectron) {
      throw new Error('Electron API not available');
    }
    
    try {
      const networkData = await window.electronAPI.getNetworkStats();
      return networkData;
    } catch (error) {
      console.error('SystemService: Error loading network stats:', error);
      throw error;
    }
  }

  async getUptime() {
    if (!this.isElectron) {
      throw new Error('Electron API not available');
    }
    
    try {
      const uptimeData = await window.electronAPI.getUptime();
      return uptimeData;
    } catch (error) {
      console.error('SystemService: Error loading uptime:', error);
      throw error;
    }
  }

  // Helper function to format bytes
  formatBytes(bytes) {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Helper function to format uptime
  formatUptime(seconds) {
    if (!seconds || seconds === 0) return '0m';
    
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m`;
    } else if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  }

  // Helper function to format date
  formatDate(timestamp) {
    if (!timestamp) return 'Invalid Date';
    return new Date(timestamp * 1000).toLocaleString('el-GR');
  }
}

const systemService = new SystemService();
export default systemService;
