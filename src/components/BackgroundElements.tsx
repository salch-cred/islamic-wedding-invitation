import React from 'react';

interface BackgroundElementsProps {
  showPetals?: boolean;
}

export const BackgroundElements: React.FC<BackgroundElementsProps> = ({ showPetals = true }) => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Ambient Radial Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-champagne-gold/10 via-maroon-100/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-[40%] right-[-100px] w-[500px] h-[500px] bg-champagne-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-100px] w-[500px] h-[500px] bg-maroon-700/5 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Islamic Geometric Ornaments */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="absolute opacity-[0.04] transition-transform"
          style={{
            left: `${8 + i * 12}%`,
            top: `${(i * 15) % 95}%`,
            animation: `float ${7 + (i % 4) * 2}s ease-in-out infinite`,
            animationDelay: `${i * 0.7}s`,
          }}
        >
          {/* Islamic Star / Motif SVG */}
          <svg width="60" height="60" viewBox="0 0 100 100" fill="#D4AF37">
            <g transform="translate(50,50)">
              {[0, 45, 90, 135].map((angle, j) => (
                <rect
                  key={j}
                  x="-35"
                  y="-35"
                  width="70"
                  height="70"
                  fill="none"
                  stroke="#D4AF37"
                  strokeWidth="2"
                  transform={`rotate(${angle})`}
                />
              ))}
              <circle cx="0" cy="0" r="16" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
              <circle cx="0" cy="0" r="5" fill="#D4AF37" />
            </g>
          </svg>
        </div>
      ))}

      {/* Falling Velvet Rose Petals */}
      {showPetals && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 18 }).map((_, i) => {
            const left = (i * 5.8 + 2) % 96;
            const delay = (i * 0.9) % 7;
            const duration = 9 + (i % 6) * 1.8;
            const size = 16 + (i % 4) * 6;
            const rotation = (i * 47) % 360;

            return (
              <div
                key={`petal-${i}`}
                className="falling-petal"
                style={{
                  left: `${left}%`,
                  animationDuration: `${duration}s`,
                  animationDelay: `${delay}s`,
                  width: `${size}px`,
                  height: `${size * 1.3}px`,
                }}
              >
                {/* SVG Rose Petal */}
                <svg
                  viewBox="0 0 40 50"
                  fill="none"
                  className="w-full h-full drop-shadow-sm opacity-60 hover:opacity-90"
                  style={{ transform: `rotate(${rotation}deg)` }}
                >
                  <path
                    d="M20 2 C 5 15, 0 35, 20 48 C 40 35, 35 15, 20 2 Z"
                    fill="url(#petalGrad)"
                  />
                  <defs>
                    <linearGradient id="petalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#C93B57" stopOpacity="0.85" />
                      <stop offset="60%" stopColor="#801B2E" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#480C17" stopOpacity="0.95" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
