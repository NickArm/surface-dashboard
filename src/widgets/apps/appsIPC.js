// Apps IPC Handlers - To be moved to electron main process
const { ipcMain, shell } = require('electron');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');

// Apps Widget IPC Handlers
const setupAppsIPC = () => {
  // Handle getting app shortcuts
  ipcMain.handle('get-app-shortcuts', async () => {
    const shortcuts = [];
    
    // Common Windows applications
    const commonApps = [
      { name: 'Calculator', path: 'calc.exe' },
      { name: 'Notepad', path: 'notepad.exe' },
      { name: 'File Explorer', path: 'explorer.exe' },
      { name: 'Task Manager', path: 'taskmgr.exe' },
      { name: 'Command Prompt', path: 'cmd.exe' },
      { name: 'Control Panel', path: 'control.exe' },
      { name: 'Settings', path: 'ms-settings:' },
      { name: 'Paint', path: 'mspaint.exe' },
      { name: 'WordPad', path: 'wordpad.exe' },
      { name: 'Snipping Tool', path: 'snippingtool.exe' },
      { name: 'Unknown App', path: 'unknown.exe' }
    ];
    
    // Add common apps
    shortcuts.push(...commonApps);
    
    // Try to scan Start Menu for more apps
    try {
      const startMenuPaths = [
        path.join(process.env.APPDATA, 'Microsoft', 'Windows', 'Start Menu', 'Programs'),
        path.join(process.env.ALLUSERSPROFILE, 'Microsoft', 'Windows', 'Start Menu', 'Programs')
      ];
      
      for (const menuPath of startMenuPaths) {
        if (fs.existsSync(menuPath)) {
          const files = fs.readdirSync(menuPath);
          files.forEach(file => {
            if (file.endsWith('.lnk')) {
              const appName = path.basename(file, '.lnk');
              shortcuts.push({
                name: appName,
                path: path.join(menuPath, file)
              });
            }
          });
        }
      }
    } catch (error) {
      console.error('Error scanning Start Menu:', error);
    }
    
    return shortcuts.slice(0, 9); // Return first 9 apps
  });

  // Handle launching apps
  ipcMain.handle('launch-app', async (event, appPath) => {
    try {
      if (appPath.startsWith('ms-settings:')) {
        shell.openExternal(appPath);
      } else {
        exec(`start "" "${appPath}"`);
      }
      return { success: true };
    } catch (error) {
      console.error('Error launching app:', error);
      return { success: false, error: error.message };
    }
  });
};

module.exports = { setupAppsIPC };
