import React from 'react';

/**
 * Handcrafted Luxury Islamic & Royal Victorian Ornaments
 * Pure SVG vectors: crisp, infinite resolution, zero AI artifacts.
 */

// Elegant Bismillah Calligraphy in shimmering gold vector
export const BismillahGold: React.FC<{ className?: string }> = ({ className = "w-64 sm:w-80 h-auto" }) => (
  <div className={`mx-auto flex flex-col items-center justify-center ${className}`}>
    <p className="font-arabic text-3xl sm:text-4xl lg:text-5xl text-champagne-gold font-bold tracking-wide drop-shadow-[0_2px_10px_rgba(212,175,55,0.4)] text-center leading-normal">
      بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
    </p>
    <div className="flex items-center justify-center gap-3 mt-2 w-full max-w-xs">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-champagne-gold/60 to-transparent" />
      <span className="w-1.5 h-1.5 rounded-full bg-champagne-gold rotate-45 shadow-[0_0_8px_#D4AF37]" />
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-champagne-gold/60 to-transparent" />
    </div>
  </div>
);

// Luxury Gold Filigree Corner Ornament
export const GoldCorner: React.FC<{ position: 'tl' | 'tr' | 'bl' | 'br'; className?: string }> = ({
  position,
  className = "w-20 h-20 sm:w-28 sm:h-28",
}) => {
  const rotationClass = {
    tl: "top-0 left-0 rotate-0",
    tr: "top-0 right-0 rotate-90",
    br: "bottom-0 right-0 rotate-180",
    bl: "bottom-0 left-0 -rotate-90",
  }[position];

  return (
    <div className={`absolute pointer-events-none ${rotationClass} ${className} z-20`}>
      <svg viewBox="0 0 120 120" fill="none" className="w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]">
        <defs>
          <linearGradient id={`goldGrad-${position}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2B2" />
            <stop offset="35%" stopColor="#D4AF37" />
            <stop offset="70%" stopColor="#AA820A" />
            <stop offset="100%" stopColor="#E5CD78" />
          </linearGradient>
        </defs>
        {/* Outer border lines */}
        <path d="M 6 114 L 6 36 C 6 18 18 6 36 6 L 114 6" stroke={`url(#goldGrad-${position})`} strokeWidth="1.5" />
        <path d="M 14 114 L 14 42 C 14 26 26 14 42 14 L 114 14" stroke={`url(#goldGrad-${position})`} strokeWidth="0.75" strokeDasharray="3 2" />
        
        {/* Corner arabesque flourish */}
        <path d="M 14 14 C 28 28 35 48 24 64 C 18 48 32 32 48 32 C 64 32 74 20 84 14" stroke={`url(#goldGrad-${position})`} strokeWidth="1.2" fill="none" />
        <path d="M 28 28 C 42 42 62 42 70 30" stroke={`url(#goldGrad-${position})`} strokeWidth="0.8" fill="none" />
        <path d="M 14 48 C 30 52 42 68 38 84" stroke={`url(#goldGrad-${position})`} strokeWidth="0.8" fill="none" />
        
        {/* Rosette accents */}
        <circle cx="28" cy="28" r="3.5" fill={`url(#goldGrad-${position})`} />
        <circle cx="50" cy="20" r="2.2" fill={`url(#goldGrad-${position})`} />
        <circle cx="20" cy="50" r="2.2" fill={`url(#goldGrad-${position})`} />
        <circle cx="70" cy="14" r="1.8" fill={`url(#goldGrad-${position})`} />
        <circle cx="14" cy="70" r="1.8" fill={`url(#goldGrad-${position})`} />
        <circle cx="95" cy="10" r="2" fill={`url(#goldGrad-${position})`} />
        <circle cx="10" cy="95" r="2" fill={`url(#goldGrad-${position})`} />
      </svg>
    </div>
  );
};

// Royal Hanging Lanterns with glowing candle flame
export const HangingLantern: React.FC<{ style?: React.CSSProperties; delay?: string }> = ({
  style,
  delay = "0s",
}) => (
  <div
    className="pointer-events-none drop-shadow-lg"
    style={{
      animation: `swingLantern 5s ease-in-out infinite`,
      animationDelay: delay,
      transformOrigin: "top center",
      ...style,
    }}
  >
    <svg width="42" height="110" viewBox="0 0 50 130" fill="none">
      <defs>
        <linearGradient id="lanternGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2B2" />
          <stop offset="40%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#8A6704" />
        </linearGradient>
        <radialGradient id="candleGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF6D1" stopOpacity="1" />
          <stop offset="40%" stopColor="#FFC83B" stopOpacity="0.8" />
          <stop offset="80%" stopColor="#FF9100" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#FF9100" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Hanging Chain */}
      <line x1="25" y1="0" x2="25" y2="40" stroke="url(#lanternGold)" strokeWidth="1.2" strokeDasharray="3 2" />
      {/* Lantern Top Cap & Finial */}
      <circle cx="25" cy="40" r="3" fill="url(#lanternGold)" />
      <path d="M 12 52 L 25 43 L 38 52 Z" fill="url(#lanternGold)" />
      {/* Lantern Dome */}
      <path d="M 10 54 Q 25 47 40 54 L 38 58 L 12 58 Z" fill="url(#lanternGold)" />
      {/* Glass Body with Filigree Grill */}
      <rect x="14" y="58" width="22" height="34" rx="2" fill="none" stroke="url(#lanternGold)" strokeWidth="1.5" />
      {/* Candle Light Glow */}
      <circle cx="25" cy="75" r="10" fill="url(#candleGlow)" className="animate-pulse" />
      {/* Flame */}
      <path d="M 25 70 C 23 74 24 78 25 79 C 26 78 27 74 25 70 Z" fill="#FFF" />
      {/* Grill Arches */}
      <path d="M 18 58 L 18 92 M 25 58 L 25 92 M 32 58 L 32 92" stroke="url(#lanternGold)" strokeWidth="0.75" opacity="0.7" />
      {/* Bottom Base & Tassel */}
      <path d="M 12 92 L 38 92 L 34 97 L 16 97 Z" fill="url(#lanternGold)" />
      <line x1="25" y1="97" x2="25" y2="112" stroke="url(#lanternGold)" strokeWidth="1" />
      <circle cx="25" cy="112" r="2.5" fill="url(#lanternGold)" />
    </svg>
  </div>
);

// Royal Floral Divider with Heart/Lotus Finial
export const FloralDivider: React.FC<{ className?: string }> = ({ className = "my-4" }) => (
  <div className={`flex items-center justify-center gap-3 ${className}`}>
    <div className="h-px w-16 sm:w-28 bg-gradient-to-r from-transparent via-champagne-gold to-champagne-gold/60" />
    <svg width="34" height="20" viewBox="0 0 50 30" fill="none">
      <defs>
        <linearGradient id="divGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2B2" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#967406" />
        </linearGradient>
      </defs>
      <circle cx="25" cy="15" r="3.5" fill="url(#divGold)" />
      <path d="M 25 4 C 20 10 14 12 8 15 C 14 18 20 20 25 26 C 30 20 36 18 42 15 C 36 12 30 10 25 4 Z" stroke="url(#divGold)" strokeWidth="1.2" fill="none" />
      <circle cx="10" cy="15" r="1.8" fill="url(#divGold)" />
      <circle cx="40" cy="15" r="1.8" fill="url(#divGold)" />
    </svg>
    <div className="h-px w-16 sm:w-28 bg-gradient-to-l from-transparent via-champagne-gold to-champagne-gold/60" />
  </div>
);

// Grand Moorish Mihrab Arch Frame (Surrounds the card content like a Royal Palace gate)
export const MihrabArch: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => (
  <div className={`relative w-full rounded-t-[140px] sm:rounded-t-[200px] border-2 border-champagne-gold/50 bg-[#FAF8F3] shadow-[0_15px_60px_rgba(0,0,0,0.18)] overflow-hidden ${className}`}>
    {/* Inner Ornate Gold Border Line */}
    <div className="absolute inset-2 sm:inset-3 rounded-t-[130px] sm:rounded-t-[188px] border border-champagne-gold/40 pointer-events-none" />
    <div className="absolute inset-3.5 sm:inset-5 rounded-t-[120px] sm:rounded-t-[178px] border border-dashed border-champagne-gold/30 pointer-events-none" />

    {/* Top Arch Crown Keystones */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
      <svg width="70" height="36" viewBox="0 0 100 50" fill="none">
        <path d="M 50 4 Q 58 18 64 24 Q 78 30 96 36 L 4 36 Q 22 30 36 24 Q 42 18 50 4 Z" fill="#D4AF37" opacity="0.3" />
        <circle cx="50" cy="8" r="4" fill="#D4AF37" />
        <circle cx="50" cy="20" r="2.5" fill="#D4AF37" />
      </svg>
    </div>

    {/* Corner Ornaments */}
    <GoldCorner position="tl" className="w-16 h-16 sm:w-24 sm:h-24" />
    <GoldCorner position="tr" className="w-16 h-16 sm:w-24 sm:h-24" />
    <GoldCorner position="bl" className="w-16 h-16 sm:w-24 sm:h-24" />
    <GoldCorner position="br" className="w-16 h-16 sm:w-24 sm:h-24" />

    {/* Content Container */}
    <div className="relative z-10 p-6 sm:p-10 pt-14 sm:pt-16">
      {children}
    </div>
  </div>
);

// Intricate Geometric Islamic Tessellation / Girih Watermark
export const GirihWatermark: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`absolute inset-0 pointer-events-none overflow-hidden opacity-[0.035] ${className}`}>
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="girihPat" width="80" height="80" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 80 40 L 40 80 L 0 40 Z" fill="none" stroke="#D4AF37" strokeWidth="1" />
          <path d="M 40 10 L 70 40 L 40 70 L 10 40 Z" fill="none" stroke="#801B2E" strokeWidth="0.8" />
          <circle cx="40" cy="40" r="16" fill="none" stroke="#D4AF37" strokeWidth="1" />
          <polygon points="40,24 44,36 56,40 44,44 40,56 36,44 24,40 36,36" fill="none" stroke="#D4AF37" strokeWidth="1" />
          <circle cx="0" cy="0" r="12" fill="none" stroke="#D4AF37" strokeWidth="0.8" />
          <circle cx="80" cy="0" r="12" fill="none" stroke="#D4AF37" strokeWidth="0.8" />
          <circle cx="0" cy="80" r="12" fill="none" stroke="#D4AF37" strokeWidth="0.8" />
          <circle cx="80" cy="80" r="12" fill="none" stroke="#D4AF37" strokeWidth="0.8" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#girihPat)" />
    </svg>
  </div>
);
