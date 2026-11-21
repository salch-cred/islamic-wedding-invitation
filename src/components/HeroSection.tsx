import React from 'react';
import { WeddingInfo } from '../data/weddingDetails';
import { Sparkles, Calendar, MapPin, Heart } from 'lucide-react';

interface HeroSectionProps {
  wedding: WeddingInfo;
  onOpenVideoModal: () => void;
  onOpenCardModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  wedding,
  onOpenVideoModal,
  onOpenCardModal,
}) => {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-24 pb-16 px-4 overflow-hidden">
      {/* Royal Palace Courtyard Arch Backdrop */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/palace-background.png"
          alt="Royal Wedding Palace Background"
          className="w-full h-full object-cover object-center opacity-25 filter blur-[1px] transform scale-105"
        />
        {/* Soft Royal Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-ivory via-ivory/80 to-ivory" />
      </div>

      {/* Hero Content Box */}
      <div className="relative z-10 max-w-2xl mx-auto text-center px-4">
        {/* Bismillah Header */}
        <div className="mb-6 animate-[fadeIn_1s_ease-out]">
          <p className="font-arabic text-3xl sm:text-4xl lg:text-5xl text-champagne-gold drop-shadow-sm mb-3">
            {wedding.duaText.bismillah}
          </p>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 sm:w-16 h-px bg-champagne-gold/30" />
            <p className="font-elegant text-[11px] sm:text-xs tracking-[0.2em] uppercase text-maroon-800 font-semibold">
              {wedding.duaText.bismillahEnglish}
            </p>
            <div className="w-10 sm:w-16 h-px bg-champagne-gold/30" />
          </div>
        </div>

        {/* Parents' Prayer from Physical Card */}
        <div className="max-w-lg mx-auto mb-8 p-3 rounded-2xl bg-white/40 backdrop-blur-md border border-champagne-gold/20 shadow-sm">
          <p className="font-elegant text-sm sm:text-base text-maroon-900/90 italic leading-relaxed">
            "{wedding.duaText.parentsPrayer}"
          </p>
        </div>

        {/* Hosts / Parents */}
        <div className="mb-6">
          <p className="font-elegant text-sm uppercase tracking-widest text-soft-black/50 mb-1">
            Cordially Invited By
          </p>
          <h2 className="font-elegant text-2xl sm:text-3xl text-maroon-800 font-bold">
            {wedding.groom.parents}
          </h2>
          <p className="font-body text-xs sm:text-sm text-soft-black/70 max-w-md mx-auto mt-2 leading-relaxed">
            solicit your blessing & request the pleasure of your family on the occasion of the wedding ceremony of their beloved son
          </p>
        </div>

        {/* The Couple Showcase */}
        <div className="my-8 py-6 px-4 rounded-3xl bg-white/60 backdrop-blur-xl border border-champagne-gold/30 shadow-xl relative overflow-hidden">
          {/* Subtle Islamic Arch Corner Highlights */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-champagne-gold to-transparent" />

          {/* Groom */}
          <div className="mb-4">
            <h1 className="font-calligraphy text-4xl sm:text-5xl lg:text-6xl text-maroon-900 leading-tight">
              {wedding.groom.name}
            </h1>
            <p className="font-elegant text-xs sm:text-sm text-soft-black/70 italic mt-1">
              ({wedding.groom.grandparents})
            </p>
          </div>

          {/* Divider WITH */}
          <div className="flex items-center justify-center gap-4 my-4">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-champagne-gold/50" />
            <span className="font-elegant text-sm uppercase tracking-widest text-champagne-gold font-bold px-3 py-0.5 rounded-full bg-champagne-gold/10 border border-champagne-gold/30">
              WITH
            </span>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-champagne-gold/50" />
          </div>

          {/* Bride */}
          <div>
            <h1 className="font-calligraphy text-4xl sm:text-5xl lg:text-6xl text-maroon-900 leading-tight">
              {wedding.bride.name}
            </h1>
            <p className="font-elegant text-xs sm:text-sm text-soft-black/70 italic mt-1">
              ({wedding.bride.father})
            </p>
          </div>

          {/* Insha Allah */}
          <div className="mt-6 pt-4 border-t border-champagne-gold/20">
            <span className="font-calligraphy text-2xl text-champagne-gold block">
              Insha Allah
            </span>
          </div>
        </div>

        {/* Quick Date and Venue Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-champagne-gold/30 shadow-sm text-xs sm:text-sm font-elegant text-soft-black">
            <Calendar className="w-4 h-4 text-champagne-gold" />
            <span className="font-semibold">{wedding.event.dateFormatted}</span>
            <span className="text-soft-black/50">({wedding.event.hijriDate})</span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-champagne-gold/30 shadow-sm text-xs sm:text-sm font-elegant text-soft-black">
            <MapPin className="w-4 h-4 text-maroon-700" />
            <span>{wedding.event.venueName}, {wedding.event.venueAddress}</span>
          </div>
        </div>

        {/* Quick Action Video & Card Modals */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onOpenVideoModal}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-maroon-800 text-cream font-elegant text-xs uppercase tracking-widest font-semibold hover:bg-maroon-900 shadow-md hover:shadow-lg transition-all border border-champagne-gold/40"
          >
            <Sparkles className="w-4 h-4 text-champagne-gold" />
            <span>Watch Invitation Reel</span>
          </button>

          <button
            onClick={onOpenCardModal}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 text-maroon-800 font-elegant text-xs uppercase tracking-widest font-semibold hover:bg-white shadow-md hover:shadow-lg transition-all border border-champagne-gold/40"
          >
            <Heart className="w-4 h-4 text-maroon-700" />
            <span>View Original Card</span>
          </button>
        </div>
      </div>
    </section>
  );
};
