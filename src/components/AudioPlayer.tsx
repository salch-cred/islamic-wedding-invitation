import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music, Play, Pause } from 'lucide-react';

interface AudioPlayerProps {
  autoPlayTrigger?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ autoPlayTrigger }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  // Play audio when invitation is opened
  useEffect(() => {
    if (autoPlayTrigger && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setShowTooltip(true);
        setTimeout(() => setShowTooltip(false), 4500);
      }).catch((e) => {
        console.warn("Autoplay blocked or waiting for user interaction:", e);
      });
    }
  }, [autoPlayTrigger]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(console.error);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    const nextMuted = !isMuted;
    audioRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 select-none">
      {/* Hidden Native Audio Element */}
      <audio
        ref={audioRef}
        src="/audio/wedding-audio.mp3"
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src="/audio/wedding-audio.mp3" type="audio/mpeg" />
        <source src="/audio/wedding-audio.m4a" type="audio/mp4" />
      </audio>

      {/* Playing Notification Banner / Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-16 right-0 w-64 p-3 rounded-2xl bg-white/95 backdrop-blur-xl border border-champagne-gold/30 shadow-2xl text-left animate-bounce transition-all">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <p className="text-xs font-semibold text-soft-black">Now Playing</p>
          </div>
          <p className="text-[11px] text-soft-black/70 font-elegant italic mt-0.5">
            Wedding Celebration Nasheed & Duas
          </p>
        </div>
      )}

      {/* Floating Audio Control Pill */}
      <div
        onClick={togglePlay}
        role="button"
        tabIndex={0}
        title={isPlaying ? "Pause wedding music" : "Play wedding music"}
        className={`group relative flex items-center gap-3 px-4 py-2.5 rounded-full cursor-pointer transition-all duration-300 shadow-xl backdrop-blur-xl border ${
          isPlaying
            ? "bg-maroon-800/90 border-champagne-gold/40 text-cream shadow-maroon-900/30 ring-2 ring-champagne-gold/30"
            : "bg-white/85 border-champagne-gold/25 text-soft-black hover:bg-white"
        }`}
      >
        {/* Animated Soundwave Bars or Play Icon */}
        <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-champagne-gold/20">
          {isPlaying ? (
            <div className="flex items-end justify-center gap-0.5 w-4 h-4">
              <span className="w-1 bg-champagne-gold rounded-full h-3 animate-[pulse_0.6s_ease-in-out_infinite]" />
              <span className="w-1 bg-champagne-gold rounded-full h-4 animate-[pulse_0.9s_ease-in-out_infinite_0.2s]" />
              <span className="w-1 bg-champagne-gold rounded-full h-2 animate-[pulse_0.7s_ease-in-out_infinite_0.4s]" />
            </div>
          ) : (
            <Play className="w-4 h-4 text-champagne-gold ml-0.5 fill-champagne-gold" />
          )}
        </div>

        {/* Text and Info */}
        <div className="flex flex-col text-left pr-1">
          <span className="text-[10px] uppercase tracking-widest font-elegant font-semibold text-champagne-gold">
            {isPlaying ? "Music Playing" : "Wedding Audio"}
          </span>
          <span className={`text-xs font-medium font-body truncate max-w-[100px] ${isPlaying ? "text-white" : "text-soft-black"}`}>
            {isPlaying ? "Tap to Pause" : "Play Voice"}
          </span>
        </div>

        {/* Mute/Unmute quick toggle button */}
        <button
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute" : "Mute"}
          className="p-1 rounded-full hover:bg-white/20 text-champagne-gold transition-colors"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};
