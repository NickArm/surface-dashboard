// Hardware Monitor Service - Handles all hardware-related IPC calls
class HardwareService {
  constructor() {
    this.isElectron = typeof window !== 'undefined' && window.electronAPI;
  }

  async getSystemInfo() {
    if (!this.isElectron) {
      throw new Error('Electron API not available');
    }
    
    try {
      const info = await window.electronAPI.getSystemInfo();
      console.log('HardwareService: System info loaded:', info);
      return info;
    } catch (error) {
      console.error('HardwareService: Error loading system info:', error);
      throw error;
    }
  }

  async getCpuUsage() {
    if (!this.isElectron) {
      throw new Error('Electron API not available');
    }
    
    try {
      const usage = await window.electronAPI.getCpuUsage();
      return usage;
    } catch (error) {
      console.error('HardwareService: Error loading CPU usage:', error);
      return 0;
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

  // Helper function to get CPU usage color
  getCpuUsageColor(usage) {
    if (usage < 30) return '#10B981'; // Green
    if (usage < 60) return '#F59E0B'; // Yellow
    if (usage < 80) return '#EF4444'; // Red
    return '#DC2626'; // Dark red
  }

  // Helper function to get memory usage color
  getMemoryUsageColor(usage) {
    if (usage < 50) return '#10B981'; // Green
    if (usage < 75) return '#F59E0B'; // Yellow
    if (usage < 90) return '#EF4444'; // Red
    return '#DC2626'; // Dark red
  }
}

const hardwareService = new HardwareService();
export default hardwareService;
