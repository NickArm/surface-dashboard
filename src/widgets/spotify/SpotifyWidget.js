import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react';
import './SpotifyWidget.css';
import spotifyService from './spotifyService';

const SpotifyWidget = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(50);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeSpotify = async () => {
      try {
        setLoading(true);
        const authStatus = await spotifyService.checkAuthentication();
        setIsAuthenticated(authStatus);
        
        if (authStatus) {
          await loadCurrentTrack();
        }
      } catch (error) {
        console.error('Error initializing Spotify:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeSpotify();
  }, []);

  const loadCurrentTrack = async () => {
    try {
      const track = await spotifyService.getCurrentTrack();
      if (track) {
        setCurrentTrack(track.item);
        setIsPlaying(track.is_playing);
        setVolume(track.device ? track.device.volume_percent : 50);
        setProgress(track.progress_ms);
      } else {
        setCurrentTrack(null);
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('Error loading current track:', error);
      setIsAuthenticated(false);
    }
  };

  const handleLogin = () => {
    spotifyService.authenticate();
  };

  const handlePlayPause = async () => {
    if (!currentTrack) return;
    try {
      if (isPlaying) {
        await spotifyService.pause();
        setIsPlaying(false);
      } else {
        await spotifyService.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Error toggling playback:', error);
    }
  };

  const handleSkipNext = async () => {
    try {
      await spotifyService.skipToNext();
      setTimeout(loadCurrentTrack, 500);
    } catch (error) {
      console.error('Error skipping next:', error);
    }
  };

  const handleSkipPrevious = async () => {
    try {
      await spotifyService.skipToPrevious();
      setTimeout(loadCurrentTrack, 500);
    } catch (error) {
      console.error('Error skipping previous:', error);
    }
  };

  const handleVolumeChange = async (e) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    try {
      await spotifyService.setVolume(newVolume);
    } catch (error) {
      console.error('Error setting volume:', error);
    }
  };

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="dashboard-card spotify-widget">
        <h2>Spotify</h2>
        <p>Loading Spotify...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="dashboard-card spotify-widget">
        <h2>Spotify</h2>
        <div className="spotify-login">
          <div className="spotify-logo">🎵</div>
          <p>Connect your Spotify Premium account</p>
          <button className="spotify-login-btn" onClick={handleLogin}>
            Connect to Spotify
          </button>
        </div>
      </div>
    );
  }

  if (!currentTrack) {
    return (
      <div className="dashboard-card spotify-widget">
        <h2>Spotify</h2>
        <div className="spotify-no-track">
          <div className="spotify-logo">🎵</div>
          <p>No track currently playing</p>
          <button className="spotify-play-btn" onClick={handlePlayPause}>
            <Play size={20} />
            Start Playback
          </button>
        </div>
      </div>
    );
  }

  const albumArtwork = currentTrack.album.images[0]?.url || 'https://via.placeholder.com/150';

  return (
    <div className="dashboard-card spotify-widget">
      <h2>Spotify</h2>
      <div className="spotify-content">
        <div className="album-artwork">
          <img src={albumArtwork} alt={currentTrack.album.name} />
        </div>
        <div className="track-info">
          <div className="track-title">{currentTrack.name}</div>
          <div className="track-artist">{currentTrack.artists.map(artist => artist.name).join(', ')}</div>
          <div className="track-album">{currentTrack.album.name}</div>
        </div>

        <div className="playback-controls">
          <button className="control-button" onClick={handleSkipPrevious}>
            <SkipBack size={24} />
          </button>
          <button className="control-button play-pause-button" onClick={handlePlayPause}>
            {isPlaying ? <Pause size={32} /> : <Play size={32} />}
          </button>
          <button className="control-button" onClick={handleSkipNext}>
            <SkipForward size={24} />
          </button>
        </div>

        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${(progress / currentTrack.duration_ms) * 100}%` }}></div>
          <div className="progress-time current">{formatTime(progress)}</div>
          <div className="progress-time total">{formatTime(currentTrack.duration_ms)}</div>
        </div>

        <div className="volume-control">
          <Volume2 size={20} />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider"
          />
        </div>
      </div>
    </div>
  );
};

export default SpotifyWidget;