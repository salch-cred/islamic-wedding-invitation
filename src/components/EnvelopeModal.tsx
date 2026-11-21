import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart } from 'lucide-react';

interface EnvelopeModalProps {
  guestName: string;
  groomName: string;
  brideName: string;
  date: string;
  onOpen: () => void;
}

export const EnvelopeModal: React.FC<EnvelopeModalProps> = ({
  guestName,
  groomName,
  brideName,
  date,
  onOpen,
}) => {
  const [isOpening, setIsOpening] = useState<boolean>(false);

  const handleOpenInvitation = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Trigger golden and crimson celebration confetti
    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#801B2E', '#F3E5AB', '#FFFFF0', '#B8960C'],
        disableForReducedMotion: true,
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#D4AF37', '#801B2E', '#F3E5AB'],
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#D4AF37', '#801B2E', '#F3E5AB'],
        });
      }, 250);
    } catch (e) {
      console.warn("Confetti error:", e);
    }

    // Allow animation to unfold before hiding modal
    setTimeout(() => {
      onOpen();
    }, 1100);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-gradient-to-br from-[#FAF8F5] via-[#FFFDF7] to-[#F5EFE6] transition-all duration-1000 ${
        isOpening ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Decorative Corner Ornaments */}
      <CornerOrnament className="top-2 left-2 rotate-0" />
      <CornerOrnament className="top-2 right-2 rotate-90" />
      <CornerOrnament className="bottom-2 left-2 -rotate-90" />
      <CornerOrnament className="bottom-2 right-2 rotate-180" />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-lg my-auto py-8 px-4 text-center">
        {/* Bismillah Calligraphy */}
        <p className="font-arabic text-2xl sm:text-3xl text-champagne-gold tracking-wide mb-3 drop-shadow-sm">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
        <p className="font-elegant text-xs uppercase tracking-[0.25em] text-maroon-700/70 font-semibold mb-6">
          In The Name of Allah, The Most Beneficent & Merciful
        </p>

        {/* Envelope Mockup Card */}
        <div className="relative mx-auto max-w-md bg-white/70 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border-2 border-champagne-gold/30 shadow-2xl transition-all duration-700">
          {/* Inner Golden Border */}
          <div className="absolute inset-2 sm:inset-3 rounded-2xl border border-dashed border-champagne-gold/40 pointer-events-none" />

          {/* Invitation Intro */}
          <p className="font-elegant text-xs uppercase tracking-widest text-soft-black/50 mb-2">
            Wedding Invitation
          </p>
          <p className="font-elegant text-sm text-maroon-800 italic font-medium mb-4">
            Mrs. & Mr. Mohammed Hussain Beary
          </p>

          <p className="font-body text-xs text-soft-black/60 max-w-xs mx-auto mb-6">
            solicit your gracious presence & prayers on the auspicious wedding ceremony of their son
          </p>

          {/* Groom & Bride Names */}
          <div className="my-5">
            <h1 className="font-calligraphy text-4xl sm:text-5xl text-maroon-800 drop-shadow-sm leading-tight">
              {groomName}
            </h1>
            
            <div className="flex items-center justify-center gap-3 my-2">
              <div className="w-12 h-px bg-champagne-gold/40" />
              <span className="font-elegant text-xl text-champagne-gold italic">&</span>
              <div className="w-12 h-px bg-champagne-gold/40" />
            </div>

            <h1 className="font-calligraphy text-4xl sm:text-5xl text-maroon-800 drop-shadow-sm leading-tight">
              {brideName}
            </h1>
          </div>

          {/* Event Date */}
          <div className="inline-block px-4 py-1.5 rounded-full bg-champagne-gold/10 border border-champagne-gold/30 mb-6">
            <p className="font-elegant text-xs sm:text-sm text-soft-black font-semibold tracking-wide">
              {date}
            </p>
          </div>

          {/* Personalized Guest Badge */}
          {guestName && (
            <div className="mb-6 p-2 rounded-xl bg-maroon-50/70 border border-maroon-200/50 inline-block">
              <p className="font-elegant text-xs uppercase tracking-widest text-maroon-700">
                Honored Guest
              </p>
              <p className="font-calligraphy text-2xl text-maroon-900">
                {guestName}
              </p>
            </div>
          )}

          {/* 3D Wax Seal Button */}
          <div className="mt-4 flex flex-col items-center">
            <button
              onClick={handleOpenInvitation}
              disabled={isOpening}
              className={`group relative flex flex-col items-center justify-center focus:outline-none transition-transform duration-300 ${
                isOpening ? 'scale-110 rotate-3' : 'hover:scale-105 active:scale-95'
              }`}
            >
              {/* Wax Seal Disk */}
              <div className="relative w-24 h-24 rounded-full wax-seal flex items-center justify-center border border-champagne-gold/40 cursor-pointer">
                {/* Gold Embossed Ring */}
                <div className="absolute inset-1.5 rounded-full border border-champagne-gold/30 border-dashed" />
                
                {/* Seal Motif / Arabic Floral Emblem */}
                <div className="text-center text-champagne-gold select-none pointer-events-none">
                  <Sparkles className="w-6 h-6 mx-auto mb-0.5 text-champagne-gold group-hover:rotate-12 transition-transform" />
                  <span className="text-[10px] font-elegant font-semibold tracking-widest block uppercase text-champagne-gold/90">
                    Open
                  </span>
                </div>
              </div>

              {/* Shimmering Action Text */}
              <div className="mt-4 flex items-center gap-2 px-6 py-2.5 rounded-full bg-maroon-800 text-cream text-xs uppercase tracking-widest font-elegant font-semibold shadow-lg group-hover:bg-maroon-900 border border-champagne-gold/40 transition-colors">
                <Heart className="w-3.5 h-3.5 text-champagne-gold fill-champagne-gold" />
                <span>Tap To Open Invitation</span>
                <Sparkles className="w-3.5 h-3.5 text-champagne-gold" />
              </div>
            </button>
            <p className="font-elegant text-[11px] text-soft-black/40 mt-3 italic">
              Includes ambient wedding audio & event details
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* SVG Floral Corner Accent */
const CornerOrnament: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`absolute w-24 h-24 sm:w-32 sm:h-32 opacity-40 pointer-events-none ${className}`}>
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <linearGradient id="cornerGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#801B2E" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <path d="M0,50 Q25,25 50,0" fill="none" stroke="url(#cornerGoldGrad)" strokeWidth="1.2" />
      <path d="M0,70 Q35,35 70,0" fill="none" stroke="url(#cornerGoldGrad)" strokeWidth="0.8" />
      <path d="M0,30 Q15,15 30,0" fill="none" stroke="url(#cornerGoldGrad)" strokeWidth="0.6" />
      <circle cx="8" cy="8" r="8" fill="none" stroke="url(#cornerGoldGrad)" strokeWidth="0.8" />
      <circle cx="20" cy="12" r="2.5" fill="url(#cornerGoldGrad)" />
      <circle cx="12" cy="20" r="2.5" fill="url(#cornerGoldGrad)" />
      <circle cx="30" cy="18" r="2" fill="url(#cornerGoldGrad)" />
    </svg>
  </div>
);
