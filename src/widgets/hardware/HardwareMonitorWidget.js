import React, { useState, useEffect } from 'react';
import { Cpu, MemoryStick, Activity, Monitor } from 'lucide-react';
import './HardwareMonitorWidget.css';
import hardwareService from './hardwareService';

const HardwareMonitorWidget = ({ systemInfo }) => {
  const [cpuUsage, setCpuUsage] = useState(0);

  useEffect(() => {
    const loadCpuUsage = async () => {
      try {
        const usage = await hardwareService.getCpuUsage();
        setCpuUsage(usage);
      } catch (error) {
        console.error('Error loading CPU usage:', error);
      }
    };

    loadCpuUsage();
    
    // Update every 2 seconds
    const interval = setInterval(loadCpuUsage, 2000);
    return () => clearInterval(interval);
  }, []);

  // Remove early return to ensure useEffect always runs


  return (
    <div className="dashboard-card hardware-monitor-widget">
      <h2>Hardware Monitor</h2>
      
      <div className="hardware-grid">
        {/* CPU Usage */}
        <div className="hardware-item">
          <div className="hardware-left">
            <Cpu className="hardware-icon" />
            <span className="hardware-label">CPU</span>
          </div>
          <div className="hardware-right">
            <div className="hardware-value">
              {cpuUsage !== null ? `${cpuUsage.toFixed(1)}%` : 'Loading...'}
            </div>
            {cpuUsage !== null && (
              <div className="hardware-bar">
                <div 
                  className="hardware-bar-fill" 
                  style={{ 
                    width: `${cpuUsage}%`,
                    backgroundColor: hardwareService.getCpuUsageColor(cpuUsage)
                  }}
                ></div>
              </div>
            )}
          </div>
        </div>

        {/* Memory Usage */}
        <div className="hardware-item">
          <div className="hardware-left">
            <MemoryStick className="hardware-icon" />
            <span className="hardware-label">Memory</span>
          </div>
          <div className="hardware-right">
            <div className="hardware-value">
              {systemInfo && systemInfo.memory ? `${((systemInfo.memory.used / systemInfo.memory.total) * 100).toFixed(1)}%` : 'Loading...'}
            </div>
            {systemInfo && systemInfo.memory && (
              <div className="hardware-bar">
                <div 
                  className="hardware-bar-fill" 
                  style={{ 
                    width: `${(systemInfo.memory.used / systemInfo.memory.total) * 100}%`,
                    backgroundColor: hardwareService.getMemoryUsageColor((systemInfo.memory.used / systemInfo.memory.total) * 100)
                  }}
                ></div>
              </div>
            )}
          </div>
        </div>

        {/* Graphics */}
        <div className="hardware-item">
          <div className="hardware-left">
            <Activity className="hardware-icon" />
            <span className="hardware-label">Graphics</span>
          </div>
          <div className="hardware-right">
            <div className="hardware-value">
              {systemInfo && systemInfo.graphics && systemInfo.graphics.length > 0 ? 
                systemInfo.graphics[0].model.split(' ')[0] : 'Loading...'}
            </div>
          </div>
        </div>

        {/* System Info */}
        <div className="hardware-item">
          <div className="hardware-left">
            <Monitor className="hardware-icon" />
            <span className="hardware-label">System</span>
          </div>
          <div className="hardware-right">
            <div className="hardware-value">
              {systemInfo && systemInfo.os ? `${systemInfo.os.platform} ${systemInfo.os.release}` : 'Loading...'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HardwareMonitorWidget;
