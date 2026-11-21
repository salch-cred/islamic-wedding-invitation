import React from 'react';
import { X, Play, Sparkles } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-[fadeIn_0.3s_ease-out]">
      <div className="relative w-full max-w-sm sm:max-w-md bg-stone-900 rounded-3xl overflow-hidden border border-champagne-gold/30 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-stone-950 border-b border-stone-800 text-cream">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-champagne-gold" />
            <span className="font-elegant text-xs uppercase tracking-widest font-semibold">
              Animated Video Reel
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-[9/16] bg-black max-h-[70vh]">
          <video
            src="/video/wedding-video.mp4"
            controls
            autoPlay
            playsInline
            className="w-full h-full object-contain"
          />
        </div>

        {/* Caption */}
        <div className="p-4 bg-stone-950 text-center">
          <p className="font-calligraphy text-2xl text-champagne-gold">
            Mohammed Sinan & Aysha Zohara
          </p>
          <p className="font-elegant text-xs text-stone-400 mt-0.5">
            Royal Islamic Wedding Invitation Video
          </p>
        </div>
      </div>
    </div>
  );
};
