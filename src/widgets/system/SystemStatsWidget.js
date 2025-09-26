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
          <div className="stat-header">
            <HardDrive className="stat-icon" />
            <span className="stat-label">Disk Usage</span>
          </div>
          {diskUsage ? (
            <div className="stat-content">
              <div className="stat-value">{systemService.formatBytes(diskUsage.used)} / {systemService.formatBytes(diskUsage.total)}</div>
              <div className="stat-percentage">{diskUsage.percentage.toFixed(1)}%</div>
              <div className="stat-bar">
                <div 
                  className="stat-bar-fill" 
                  style={{ width: `${diskUsage.percentage}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <div className="stat-loading">Loading...</div>
          )}
        </div>

        {/* Network Stats */}
        <div className="stat-item">
          <div className="stat-header">
            <Wifi className="stat-icon" />
            <span className="stat-label">Network</span>
          </div>
          {networkStats ? (
            <div className="stat-content">
              <div className="stat-value">
                <div className="network-stat">
                  <span className="network-label">Down:</span>
                  <span className="network-value">{systemService.formatBytes(networkStats.downloadSpeed)}/s</span>
                </div>
                <div className="network-stat">
                  <span className="network-label">Up:</span>
                  <span className="network-value">{systemService.formatBytes(networkStats.uploadSpeed)}/s</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="stat-loading">Loading...</div>
          )}
        </div>

        {/* System Uptime */}
        <div className="stat-item">
          <div className="stat-header">
            <Clock className="stat-icon" />
            <span className="stat-label">Uptime</span>
          </div>
          {uptime ? (
            <div className="stat-content">
              <div className="stat-value">{systemService.formatUptime(uptime.uptime)}</div>
              <div className="stat-subtitle">Since {new Date(uptime.bootTime).toLocaleString()}</div>
            </div>
          ) : (
            <div className="stat-loading">Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SystemStatsWidget;
