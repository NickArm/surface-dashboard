import React, { useState, useEffect } from 'react';
import { HardDrive, Wifi, Clock } from 'lucide-react';
import './SystemStatsWidget.css';
import systemService from './systemService';

const SystemStatsWidget = () => {
  const [diskUsage, setDiskUsage] = useState(null);
  const [networkStats, setNetworkStats] = useState(null);
  const [uptime, setUptime] = useState(null);

  useEffect(() => {
    const loadSystemStats = async () => {
      try {
        const [disk, network, uptimeData] = await Promise.all([
          systemService.getDiskUsage(),
          systemService.getNetworkStats(),
          systemService.getUptime()
        ]);
        setDiskUsage(disk);
        setNetworkStats(network);
        setUptime(uptimeData);
      } catch (error) {
        console.error('SystemStatsWidget: Error loading system stats:', error);
      }
    };

    loadSystemStats();
    
    // Update every 30 seconds
    const interval = setInterval(loadSystemStats, 30000);
    return () => clearInterval(interval);
  }, []);


  return (
    <div className="dashboard-card system-stats-widget">
      <h2>System Stats</h2>
      
      <div className="stats-grid">
        {/* Disk Usage */}
        <div className="stat-item">
          <div className="stat-left">
            <HardDrive className="stat-icon" />
            <span className="stat-label">Disk</span>
          </div>
          <div className="stat-right">
            <div className="stat-value">{diskUsage ? `${diskUsage.percentage.toFixed(1)}%` : 'Loading...'}</div>
            {diskUsage && (
              <div className="stat-bar">
                <div 
                  className="stat-bar-fill" 
                  style={{ width: `${diskUsage.percentage}%` }}
                ></div>
              </div>
            )}
          </div>
        </div>

        {/* Network Stats */}
        <div className="stat-item">
          <div className="stat-left">
            <Wifi className="stat-icon" />
            <span className="stat-label">Network</span>
          </div>
          <div className="stat-right">
            <div className="stat-value">
              {networkStats ? `${systemService.formatBytes(networkStats.downloadSpeed)}/s` : 'Loading...'}
            </div>
          </div>
        </div>

        {/* System Uptime */}
        <div className="stat-item">
          <div className="stat-left">
            <Clock className="stat-icon" />
            <span className="stat-label">Uptime</span>
          </div>
          <div className="stat-right">
            <div className="stat-value">
              {uptime ? systemService.formatUptime(uptime.uptime) : 'Loading...'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemStatsWidget;
