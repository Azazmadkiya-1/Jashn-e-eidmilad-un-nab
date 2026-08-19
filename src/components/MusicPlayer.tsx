import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Disc,
  ListMusic,
  ChevronUp,
  ChevronDown,
  Radio,
  ExternalLink,
  Music,
  Smartphone,
  Sparkles
} from 'lucide-react';
import { TRACKS } from '../data/miladData';
import { Track } from '../types';
import { soundManager } from '../utils/soundEffects';

export const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack: Track = TRACKS[currentTrackIndex] || TRACKS[0];

  // Configure MediaSession for native background play & lockscreen notification
  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.volume = isMuted ? 0 : volume;

    if (typeof window !== 'undefined' && 'mediaSession' in navigator) {
      try {
        if (typeof MediaMetadata !== 'undefined') {
          navigator.mediaSession.metadata = new MediaMetadata({
            title: currentTrack.title,
            artist: currentTrack.reciter,
            album: 'Jashn-E-Eid Milad-Un-Nabi 1448 AH',
            artwork: [
              {
                src: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&q=80&w=512',
                sizes: '512x512',
                type: 'image/jpeg'
              }
            ]
          });
        }

        const trySetHandler = (action: MediaSessionAction, handler: MediaSessionActionHandler) => {
          try {
            navigator.mediaSession.setActionHandler(action, handler);
          } catch {
            // Action may not be supported by browser
          }
        };

        trySetHandler('play', () => {
          if (audioRef.current) {
            audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
          }
        });

        trySetHandler('pause', () => {
          if (audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false);
          }
        });

        trySetHandler('previoustrack', () => {
          handlePrev();
        });

        trySetHandler('nexttrack', () => {
          handleNext();
        });

        trySetHandler('seekto', (details) => {
          if (details.seekTime !== undefined && audioRef.current) {
            audioRef.current.currentTime = details.seekTime;
            setCurrentTime(details.seekTime);
          }
        });
      } catch {
        // MediaSession fallback
      }
    }
  }, [currentTrackIndex, currentTrack, volume, isMuted]);

  // Sync MediaSession playback state
  useEffect(() => {
    if ('mediaSession' in navigator) {
      try {
        navigator.mediaSession.playbackState = isPlaying ? 'playing' : 'paused';
      } catch {}
    }
  }, [isPlaying]);

  // Sync background progress with OS lockscreen controls
  const updatePositionState = () => {
    if ('mediaSession' in navigator && 'setPositionState' in navigator.mediaSession && audioRef.current) {
      try {
        if (duration > 0 && !isNaN(duration) && isFinite(duration)) {
          navigator.mediaSession.setPositionState({
            duration: duration,
            playbackRate: audioRef.current.playbackRate || 1,
            position: Math.min(audioRef.current.currentTime || 0, duration)
          });
        }
      } catch {}
    }
  };

  const togglePlay = () => {
    soundManager.playCassetteClick();
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      setAudioError(false);
      setIsLoading(true);
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setIsLoading(false);
        })
        .catch(() => {
          setAudioError(true);
          setIsPlaying(false);
          setIsLoading(false);
        });
    }
  };

  const handleNext = () => {
    soundManager.playCassetteClick();
    const nextIdx = (currentTrackIndex + 1) % TRACKS.length;
    setCurrentTrackIndex(nextIdx);
    setAudioError(false);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    soundManager.playCassetteClick();
    const prevIdx = (currentTrackIndex - 1 + TRACKS.length) % TRACKS.length;
    setCurrentTrackIndex(prevIdx);
    setAudioError(false);
    setIsPlaying(true);
  };

  const handleTrackSelect = (index: number) => {
    soundManager.playCassetteClick();
    setCurrentTrackIndex(index);
    setShowPlaylist(false);
    setAudioError(false);
    setIsPlaying(true);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      updatePositionState();
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    setIsMuted(vol === 0);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
  };

  const toggleMute = () => {
    const newMute = !isMuted;
    setIsMuted(newMute);
    if (audioRef.current) {
      audioRef.current.volume = newMute ? 0 : volume;
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds <= 0 || !isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Switch audio source cleanly when track changes
  useEffect(() => {
    if (audioRef.current) {
      const src = currentTrack.audioUrl || `https://archive.org/download/100MashoorNaat/${encodeURIComponent(currentTrack.title)}.mp3`;
      audioRef.current.src = src;
      audioRef.current.load();
      if (isPlaying) {
        setIsLoading(true);
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            setIsLoading(false);
          })
          .catch(() => {
            setAudioError(true);
            setIsPlaying(false);
            setIsLoading(false);
          });
      }
    }
  }, [currentTrackIndex]);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-2 md:p-4 pointer-events-none">
      {/* HTML5 Native Audio Engine for true continuous background playback */}
      <audio
        ref={audioRef}
        src={currentTrack.audioUrl || `https://archive.org/download/100MashoorNaat/${encodeURIComponent(currentTrack.title)}.mp3`}
        preload="auto"
        playsInline={true}
        onTimeUpdate={() => {
          if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
            updatePositionState();
          }
        }}
        onLoadedMetadata={() => {
          if (audioRef.current) {
            setDuration(audioRef.current.duration || 0);
            updatePositionState();
          }
        }}
        onEnded={() => {
          handleNext();
        }}
        onError={() => {
          setAudioError(true);
          setIsPlaying(false);
          setIsLoading(false);
        }}
      />

      <div className="max-w-4xl mx-auto pointer-events-auto">
        {/* Playlist Drawer */}
        {showPlaylist && (
          <div className="mb-2 bg-[#021810]/98 border border-amber-500/40 rounded-2xl p-4 shadow-2xl backdrop-blur-xl max-h-64 overflow-y-auto animate-fade-in">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-emerald-800/50">
              <span className="font-mono text-xs uppercase tracking-wider text-amber-300 font-bold flex items-center gap-2">
                <ListMusic className="w-4 h-4 text-amber-400" />
                Continuous Audio Deck • Select Track
              </span>
              <button
                onClick={() => setShowPlaylist(false)}
                className="text-emerald-300/60 hover:text-amber-300 text-xs font-mono px-2 py-0.5 rounded-lg bg-emerald-950 border border-emerald-500/20"
              >
                Close ✕
              </button>
            </div>

            <div className="space-y-1.5">
              {TRACKS.map((track, idx) => {
                const isSelected = idx === currentTrackIndex;
                return (
                  <button
                    key={track.id}
                    onClick={() => handleTrackSelect(idx)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all ${
                      isSelected
                        ? 'bg-amber-500/20 border border-amber-400/50 text-amber-200'
                        : 'hover:bg-emerald-900/40 text-emerald-200/80'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold ${isSelected ? 'bg-amber-400 text-emerald-950' : 'bg-emerald-900 text-emerald-300'}`}>
                        {idx + 1}
                      </div>
                      <div>
                        <p className="text-xs font-bold font-title leading-tight text-amber-200">
                          {track.title}
                        </p>
                        <p className="text-[11px] text-emerald-300/70 font-serif">
                          {track.reciter} ({track.year})
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400/80">
                      {track.duration}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Cassette Deck Floating Player Bar */}
        <div className="bg-gradient-to-r from-emerald-950 via-[#022116] to-emerald-950 border-2 border-amber-500/50 rounded-2xl p-3 sm:p-4 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-10 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Player Compact Bar */}
          <div className="flex items-center justify-between gap-3">
            
            {/* Track Info & Spinning Reel */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-amber-400/80 bg-emerald-950 flex items-center justify-center shrink-0 shadow-md relative ${isPlaying ? 'animate-spin' : ''}`}>
                <Disc className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300" />
                <div className="absolute w-2.5 h-2.5 bg-[#021810] rounded-full border border-amber-400" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-amber-300 font-semibold flex items-center gap-1">
                    <Radio className="w-3 h-3 animate-pulse text-amber-400" />
                    <span>Background Play Audio</span>
                  </span>
                </div>
                <h4 className="font-title text-xs sm:text-sm font-bold text-amber-200 truncate">
                  {currentTrack.title}
                </h4>
                <p className="text-[11px] text-emerald-300/70 font-serif truncate">
                  {currentTrack.reciter} ({currentTrack.year})
                </p>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handlePrev}
                className="p-2 rounded-xl bg-emerald-900/60 border border-emerald-500/30 text-emerald-300 hover:text-amber-300 transition-all active:scale-95"
                title="Previous Track"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                onClick={togglePlay}
                disabled={isLoading}
                className="p-3 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-emerald-950 shadow-lg shadow-amber-500/20 hover:brightness-110 active:scale-95 transition-all font-bold disabled:opacity-75"
                title={isPlaying ? 'Pause' : 'Play Audio in Background'}
              >
                {isLoading ? (
                  <Sparkles className="w-5 h-5 animate-spin text-emerald-950" />
                ) : isPlaying ? (
                  <Pause className="w-5 h-5 fill-current" />
                ) : (
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                )}
              </button>

              <button
                onClick={handleNext}
                className="p-2 rounded-xl bg-emerald-900/60 border border-emerald-500/30 text-emerald-300 hover:text-amber-300 transition-all active:scale-95"
                title="Next Track"
              >
                <SkipForward className="w-4 h-4" />
              </button>

              <button
                onClick={() => setShowPlaylist(!showPlaylist)}
                className={`p-2 rounded-xl border transition-all ${
                  showPlaylist
                    ? 'bg-amber-500/30 border-amber-400 text-amber-200'
                    : 'bg-emerald-900/60 border-emerald-500/30 text-emerald-300 hover:text-amber-300'
                }`}
                title="Toggle Playlist"
              >
                <ListMusic className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-2 rounded-xl bg-emerald-900/40 border border-emerald-500/20 text-emerald-300 hover:text-amber-300 transition-all"
                title={isExpanded ? 'Collapse Deck' : 'Expand Deck Controls'}
              >
                {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Fallback Notice if browser network issue */}
          {audioError && (
            <div className="mt-2 text-center text-[11px] font-mono text-amber-300/90 bg-amber-950/60 border border-amber-500/40 p-1.5 rounded-xl flex items-center justify-center gap-2">
              <span>Notice: Click play to restart or listen on YouTube:</span>
              <a
                href={`https://www.youtube.com/watch?v=${currentTrack.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-amber-200 hover:text-amber-100 flex items-center gap-1 font-bold"
              >
                <span>Watch on YouTube</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}

          {/* Expanded Seek Bar, Volume Bar & Background Play Instructions */}
          {isExpanded && (
            <div className="mt-3 pt-3 border-t border-emerald-800/60 space-y-3 animate-fade-in">
              {/* Mobile / Browser Background Tip */}
              <div className="flex items-center gap-2 text-[11px] font-mono text-amber-300/90 bg-emerald-900/40 p-2.5 rounded-xl border border-emerald-500/30">
                <Smartphone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  <strong>Background & Minimize Support:</strong> Tap Play once. You can now minimize your browser, switch tabs, or lock your phone screen. Audio keeps playing with full controls in your lock screen notification bar!
                </span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] font-mono text-emerald-300/80">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration || 0)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={currentTime}
                  onChange={handleSeek}
                  className="w-full accent-amber-400 h-1.5 bg-emerald-900/80 rounded-lg cursor-pointer"
                />
              </div>

              {/* Volume Bar & YouTube Link */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleMute}
                    className="text-emerald-300 hover:text-amber-300 transition-colors"
                  >
                    {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-amber-400" /> : <Volume2 className="w-4 h-4 text-emerald-300" />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-20 sm:w-28 accent-amber-400 h-1.5 bg-emerald-900/80 rounded-lg cursor-pointer"
                  />
                </div>

                <a
                  href={`https://www.youtube.com/watch?v=${currentTrack.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-300/90 hover:text-amber-200 transition-colors bg-emerald-900/50 px-2.5 py-1 rounded-lg border border-emerald-500/20"
                >
                  <Music className="w-3.5 h-3.5 text-amber-400" />
                  <span>Open in YouTube</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
