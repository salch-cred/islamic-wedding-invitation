import React from 'react';
import { WeddingInfo } from '../data/weddingDetails';
import { Heart, Home, Gift, Users } from 'lucide-react';

interface CardFlapMessageProps {
  wedding: WeddingInfo;
}

export const CardFlapMessage: React.FC<CardFlapMessageProps> = ({ wedding }) => {
  return (
    <section className="py-12 px-4 relative z-10">
      <div className="max-w-xl mx-auto">
        {/* Parchment Box with Elegant Floral Borders */}
        <div className="relative p-8 sm:p-10 rounded-3xl bg-gradient-to-b from-white/80 via-white/70 to-cream/80 backdrop-blur-xl border border-champagne-gold/30 shadow-xl text-center">
          {/* Subtle Decorative Floral Header */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-px bg-champagne-gold/40" />
            <Heart className="w-4 h-4 text-maroon-700 fill-maroon-700/20" />
            <div className="w-12 h-px bg-champagne-gold/40" />
          </div>

          {/* Poetic Message */}
          <p className="font-calligraphy text-2xl sm:text-3xl text-maroon-800 leading-relaxed mb-4">
            A Day of Togetherness,
          </p>
          <p className="font-elegant text-base sm:text-lg text-soft-black/80 italic leading-relaxed mb-6">
            "A moment of joy and emotions, a dream of every parent today a reality of us."
          </p>

          {/* Divider */}
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-champagne-gold/50 to-transparent mx-auto my-6" />

          {/* Best Compliments From */}
          <div className="mb-6">
            <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-soft-black/50 font-elegant font-semibold mb-1">
              <Users className="w-3.5 h-3.5 text-champagne-gold" />
              <span>With Best Compliments From</span>
            </div>
            <p className="font-calligraphy text-2xl sm:text-3xl text-maroon-900">
              {wedding.poetry.compliments}
            </p>
          </div>

          {/* Greatest Gift Badge */}
          <div className="my-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-champagne-gold/15 border border-champagne-gold/40 shadow-sm">
            <Gift className="w-4 h-4 text-maroon-800" />
            <span className="font-elegant text-xs sm:text-sm font-bold tracking-widest uppercase text-maroon-900">
              {wedding.poetry.giftNote}
            </span>
          </div>

          {/* Residence Details */}
          <div className="mt-8 pt-6 border-t border-champagne-gold/20 flex flex-col items-center text-center">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-soft-black/40 font-elegant font-semibold mb-1">
              <Home className="w-3.5 h-3.5 text-champagne-gold" />
              <span>Residence</span>
            </div>
            <p className="font-elegant text-sm text-soft-black/80 font-medium">
              {wedding.residence.line1}
            </p>
            <p className="font-elegant text-sm text-soft-black/70">
              {wedding.residence.line2} {wedding.residence.cityPincode}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
