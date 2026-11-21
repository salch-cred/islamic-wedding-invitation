import React from 'react';
import { WeddingInfo } from '../data/weddingDetails';
import { Heart, ArrowUp, Mail, Flower2 } from 'lucide-react';

interface FooterProps {
  wedding: WeddingInfo;
  onReopenEnvelope: () => void;
  showPetals: boolean;
  onTogglePetals: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  wedding,
  onReopenEnvelope,
  showPetals,
  onTogglePetals,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-16 px-4 relative z-10 text-center border-t border-champagne-gold/20 bg-gradient-to-b from-transparent to-champagne-gold/5">
      <div className="max-w-md mx-auto space-y-6">
        {/* Calligraphy Names */}
        <div className="space-y-1">
          <p className="font-calligraphy text-3xl sm:text-4xl text-maroon-900">
            {wedding.groom.name}
          </p>
          <span className="font-elegant text-xl text-champagne-gold italic">&</span>
          <p className="font-calligraphy text-3xl sm:text-4xl text-maroon-900">
            {wedding.bride.name}
          </p>
        </div>

        {/* Closing Blessings */}
        <p className="font-elegant text-sm text-soft-black/60 italic leading-relaxed">
          "We look forward to celebrating this blessed moment with you and receiving your valuable duas."
        </p>

        {/* Beary Family Note */}
        <div className="py-3 px-6 rounded-2xl bg-white/60 backdrop-blur-md border border-champagne-gold/30 inline-block">
          <p className="font-elegant text-xs uppercase tracking-widest text-maroon-800 font-semibold">
            {wedding.groom.parents} & Family
          </p>
          <p className="font-elegant text-[11px] text-soft-black/50 mt-0.5">
            Sugandh Palace, Ghatkopar (W), Mumbai
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3 pt-4">
          <button
            onClick={onReopenEnvelope}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-champagne-gold/30 text-xs font-elegant text-soft-black hover:bg-champagne-gold/10 transition-all shadow-sm"
          >
            <Mail className="w-3.5 h-3.5 text-maroon-700" />
            <span>Open Envelope Again</span>
          </button>

          <button
            onClick={onTogglePetals}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full border text-xs font-elegant transition-all shadow-sm ${
              showPetals
                ? 'bg-maroon-50 text-maroon-800 border-maroon-300'
                : 'bg-white text-soft-black/60 border-stone-200'
            }`}
          >
            <Flower2 className="w-3.5 h-3.5 text-maroon-600" />
            <span>{showPetals ? 'Petals: On' : 'Petals: Off'}</span>
          </button>

          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="p-2 rounded-full bg-white border border-champagne-gold/30 text-maroon-800 hover:bg-champagne-gold/10 transition-all shadow-sm"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Watermark / Bismillah Signature */}
        <div className="pt-6 text-center">
          <p className="font-arabic text-sm text-champagne-gold">
            بَارَكَ اللَّهُ لَكُمْ
          </p>
          <div className="flex items-center justify-center gap-1 text-[11px] text-soft-black/40 font-elegant mt-1">
            <span>Blessed Union</span>
            <Heart className="w-3 h-3 text-maroon-700 fill-maroon-700" />
            <span>31st December 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
