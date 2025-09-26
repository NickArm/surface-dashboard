// Spotify Service - Simplified version
class SpotifyService {
  constructor() {
    this.clientId = '04b855946f074503982c69d96a04fde5';
    this.accessToken = localStorage.getItem('spotify_access_token');
    this.tokenExpiry = localStorage.getItem('spotify_token_expiry');
  }

  // Simple authentication - just show a message
  authenticate() {
    alert('Spotify authentication will be implemented later! 🎵');
  }

  // Check if user is authenticated
  async checkAuthentication() {
    return !!this.accessToken;
  }

  // Set access token
  setAccessToken(token, expiresIn) {
    this.accessToken = token;
    this.tokenExpiry = Date.now() + (expiresIn * 1000);
    localStorage.setItem('spotify_access_token', token);
    localStorage.setItem('spotify_token_expiry', this.tokenExpiry.toString());
  }

  // Make API request
  async makeRequest(endpoint, options = {}) {
    if (!this.accessToken) {
      throw new Error('No access token available');
    }

    const response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
        ...options.headers
      }
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    return response.json();
  }

  // Get current playing track
  async getCurrentTrack() {
    try {
      const data = await this.makeRequest('/me/player/currently-playing');
      return data;
    } catch (error) {
      console.error('Error getting current track:', error);
      return null;
    }
  }

  // Get playback state
  async getPlaybackState() {
    try {
      const data = await this.makeRequest('/me/player');
      return data;
    } catch (error) {
      console.error('Error getting playback state:', error);
      return null;
    }
  }

  // Play/pause
  async play() {
    try {
      await this.makeRequest('/me/player/play', { method: 'PUT' });
      return true;
    } catch (error) {
      console.error('Error playing:', error);
      return false;
    }
  }

  async pause() {
    try {
      await this.makeRequest('/me/player/pause', { method: 'PUT' });
      return true;
    } catch (error) {
      console.error('Error pausing:', error);
      return false;
    }
  }

  // Skip to next/previous
  async skipToNext() {
    try {
      await this.makeRequest('/me/player/next', { method: 'POST' });
      return true;
    } catch (error) {
      console.error('Error skipping next:', error);
      return false;
    }
  }

  async skipToPrevious() {
    try {
      await this.makeRequest('/me/player/previous', { method: 'POST' });
      return true;
    } catch (error) {
      console.error('Error skipping previous:', error);
      return false;
    }
  }

  // Set volume
  async setVolume(volume) {
    try {
      await this.makeRequest(`/me/player/volume?volume_percent=${volume}`, { method: 'PUT' });
      return true;
    } catch (error) {
      console.error('Error setting volume:', error);
      return false;
    }
  }

  // Seek to position
  async seekToPosition(positionMs) {
    try {
      await this.makeRequest(`/me/player/seek?position_ms=${positionMs}`, { method: 'PUT' });
      return true;
    } catch (error) {
      console.error('Error seeking to position:', error);
      return false;
    }
  }
}

const spotifyService = new SpotifyService();
export default spotifyService;