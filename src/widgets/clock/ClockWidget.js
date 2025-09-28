import React from 'react';

const ClockWidget = () => {
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  
  const dateString = now.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  const hour = now.getHours();
  let greeting = 'Good Evening';
  if (hour < 12) greeting = 'Good Morning';
  else if (hour < 17) greeting = 'Good Afternoon';

  // Check if we're in light mode
  const isLightMode = document.documentElement.getAttribute('data-theme') === 'light';

  return (
    <div className="dashboard-card" style={{
      gridColumn: 'span 1',
      gridRow: 'span 1',
      minHeight: '150px',
      padding: '12px',
      backgroundColor: isLightMode ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)',
      borderRadius: '12px',
      border: isLightMode ? '1px solid rgba(0, 0, 0, 0.1)' : '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <h2 style={{ 
        margin: '0 0 8px 0', 
        fontSize: '16px', 
        fontWeight: '600',
        color: isLightMode ? '#1a1a1a' : 'white'
      }}>🕐 Clock</h2>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px'
      }}>
        <div style={{
          fontSize: '22px',
          fontWeight: '700',
          color: isLightMode ? '#2563eb' : '#64b5f6',
          fontFamily: 'Courier New, monospace',
          textAlign: 'center'
        }}>
          {timeString}
        </div>
        
        <div style={{
          fontSize: '11px',
          color: isLightMode ? 'rgba(26, 26, 26, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          textAlign: 'center',
          fontWeight: '500'
        }}>
          {dateString}
        </div>
        
        <div style={{
          fontSize: '9px',
          color: isLightMode ? 'rgba(26, 26, 26, 0.6)' : 'rgba(255, 255, 255, 0.6)',
          textAlign: 'center',
          fontWeight: '400',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          {greeting}
        </div>
      </div>
    </div>
  );
};

export default ClockWidget;
