// Spotify IPC Handlers - Handles Spotify integration
const { ipcMain, shell } = require('electron');

// Spotify Widget IPC Handlers
const setupSpotifyIPC = () => {
  console.log('Setting up Spotify IPC handlers...');

  // Handle Spotify authentication
  ipcMain.handle('spotify-auth', async () => {
    try {
      // Open Spotify authentication in browser
      const authUrl = 'https://accounts.spotify.com/authorize';
      shell.openExternal(authUrl);
      return { success: true };
    } catch (error) {
      console.error('Error opening Spotify auth:', error);
      return { success: false, error: error.message };
    }
  });

  // Handle Spotify token exchange
  ipcMain.handle('spotify-token-exchange', async (event, code) => {
    try {
      // This would typically be handled by the renderer process
      // since it requires client-side JavaScript for the API calls
      return { success: true, message: 'Token exchange handled by renderer' };
    } catch (error) {
      console.error('Error with token exchange:', error);
      return { success: false, error: error.message };
    }
  });

  // Handle opening Spotify app
  ipcMain.handle('spotify-open-app', async () => {
    try {
      // Try to open Spotify desktop app
      shell.openExternal('spotify:');
      return { success: true };
    } catch (error) {
      console.error('Error opening Spotify app:', error);
      return { success: false, error: error.message };
    }
  });

  // Handle Spotify Web Player
  ipcMain.handle('spotify-open-web', async () => {
    try {
      shell.openExternal('https://open.spotify.com');
      return { success: true };
    } catch (error) {
      console.error('Error opening Spotify web:', error);
      return { success: false, error: error.message };
    }
  });

  console.log('Spotify IPC handlers registered successfully');
};

module.exports = { setupSpotifyIPC };
