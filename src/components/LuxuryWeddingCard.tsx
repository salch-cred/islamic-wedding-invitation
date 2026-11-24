import React, { useState, useEffect, useRef, useCallback, useId } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import confetti from 'canvas-confetti';
import '../luxury-invitation.css';

/* ========================================================================= */
/* 1. WEDDING DATA SPECIFICATION                                             */
/* ========================================================================= */
export const weddingData = {
  bride: {
    fullName: "Aysha Zohara",
    lineage: "D/o. Abdul Lateef Ibrahim",
  },
  groom: {
    fullName: "Mohammed Sinan",
    lineage: "Grand S/o. Marhoom P. Hammabba Beary & Marhoom Mohammed Abdullah Sheikh",
  },
  hosts: {
    line1: "Mrs. & Mr.",
    name: "Mohammed Hussain Beary",
    invitation: "solicit your blessing & request the pleasure of your family on the occasion of the wedding ceremony of their son",
  },
  card: {
    bismillahArabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    bismillahEnglish: "In the name of Allah, the Most Beneficent, the Most Merciful",
    duaEnglish: "Oh Allah, guide this marriage to the best of understanding, happiness, prosperity & success.",
    quote: "A day of togetherness, a moment of joy and emotions — a dream of every parent, today a reality for us.",
    compliments: "With best compliments from Relatives & Friends",
    gift: "Your presence & dua is our greatest gift",
    residenceLabel: "Residence",
    residence: "Sugandh Palace, Nityanand Nagar, Ghatkopar (W), Mumbai 400 086",
    inshaAllah: "Insha Allah",
  },
  event: {
    weekday: "Thursday",
    dateLabel: "31st December 2026",
    day: "31",
    month: "December",
    year: "2026",
    hijriDate: "21st Rajab 1448 H",
    timeLabel: "After Maghrib Namaz",
    dinnerLabel: "Followed by dinner until 10:00 p.m.",
    venue: "Unity Hall",
    city: "Thokkottu, Mangalore",
    fullVenue: "Unity Hall, Thokkottu, Mangalore",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Unity%20Hall%2C%20Thokkottu%2C%20Mangalore",
    calendarStart: "2026-12-31",
    calendarEnd: "2027-01-01",
    countdownTarget: "2026-12-31T18:30:00+05:30",
  },
  quran: {
    arabic: "وَمِنْ ءَايَٰتِهِۦٓ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَٰجًۭا لِّتَسْكُنُوٓا۟ إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةًۭ وَرَحْمَةً ۚ إِنَّ فِى ذَٰلِكَ لَءَايَٰتٍۢ لِّقَوْمٍۢ يَتَفَكَّرُونَ",
    translation: "And of His signs is that He created for you from yourselves mates that you may find tranquillity in them; and He placed between you affection and mercy. Indeed in that are signs for a people who give thought.",
    reference: "Surah Ar-Rum · 30:21",
    translationSource: "Saheeh International",
  },
  cardDua: {
    arabic: "بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا",
    translation: "May Allah bless you both and shower His blessings upon you.",
  },
  audio: {
    src: "/audio/new_wedding_audio.mp3",
    title: "Wedding Nasheed",
    note: "Audio supplied by the family",
  },
  meta: {
    couple: "Aysha Zohara & Mohammed Sinan",
    shareText: "You are warmly invited to the wedding of Aysha Zohara & Mohammed Sinan — Thursday, 31st December 2026, Unity Hall, Thokkottu, Mangalore.",
    closing: "With love, the Beary and Ibrahim families",
  },
};

export const slideList = [
  { id: "cover", title: "The Invitation", shortTitle: "Cover" },
  { id: "blessing", title: "A Divine Blessing", shortTitle: "Blessing" },
  { id: "couple", title: "The Couple", shortTitle: "Couple" },
  { id: "details", title: "The Nikah Ceremony", shortTitle: "Nikah" },
  { id: "countdown", title: "The Countdown", shortTitle: "Countdown" },
];

/* ========================================================================= */
/* 2. REUSABLE SVG ICONS & PROPS                                             */
/* ========================================================================= */
const iconDefaults: React.SVGProps<SVGSVGElement> = {
  viewBox: "0 0 24 24",
  width: "24",
  height: "24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.8",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
};

const PrevArrowIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...iconDefaults} {...props}>
    <path d="M19 12H5M11 18l-6-6 6-6" />
  </svg>
);

const NextArrowIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...iconDefaults} {...props}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const MapPinIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...iconDefaults} {...props}>
    <path d="m3 6 5.5-2 7 2 5.5-2v14l-5.5 2-7-2L3 20V6Z" />
    <path d="M8.5 4v14M15.5 6v14" />
  </svg>
);

const CalendarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...iconDefaults} {...props}>
    <rect x="3" y="5" width="18" height="16" rx="2.5" />
    <path d="M8 3v4M16 3v4M3 10h18" />
    <path d="M12 14.2c-.9-1-2.5-.4-2.5.8 0 1.3 2.5 2.7 2.5 2.7s2.5-1.4 2.5-2.7c0-1.2-1.6-1.8-2.5-.8Z" />
  </svg>
);

const ShareIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...iconDefaults} {...props}>
    <circle cx="18" cy="5" r="2.4" />
    <circle cx="6" cy="12" r="2.4" />
    <circle cx="18" cy="19" r="2.4" />
    <path d="m8.2 10.8 7.6-4.4M8.2 13.2l7.6 4.4" />
  </svg>
);

const ExternalLinkIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...iconDefaults} {...props}>
    <path d="M14 4h6v6M20 4l-8.5 8.5" />
    <path d="M19 14v5.5H4.5V5H10" />
  </svg>
);

const MusicNoteIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...iconDefaults} {...props}>
    <path d="M9 18V5.5l11-2v12.3" />
    <circle cx="6.5" cy="18" r="2.5" />
    <circle cx="17.5" cy="15.8" r="2.5" />
  </svg>
);

const PlayIconSvg: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...iconDefaults} {...props}>
    <path d="M8 5.5v13l10-6.5L8 5.5Z" fill="currentColor" stroke="none" />
  </svg>
);

const PauseIconSvg: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...iconDefaults} {...props}>
    <rect x="7" y="5" width="3.5" height="14" rx="1" fill="currentColor" stroke="none" />
    <rect x="13.5" y="5" width="3.5" height="14" rx="1" fill="currentColor" stroke="none" />
  </svg>
);

const VolumeIconSvg: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...iconDefaults} {...props}>
    <path d="M11 5L6 9H2v6h4l5 4V5Z" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
  </svg>
);

const VolumeMuteIconSvg: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...iconDefaults} {...props}>
    <path d="M11 5L6 9H2v6h4l5 4V5Z" />
    <line x1="23" y1="9" x2="17" y2="15" />
    <line x1="17" y1="9" x2="23" y2="15" />
  </svg>
);

const EqualizerBars: React.FC = () => (
  <span className="equalizer" aria-hidden="true">
    <span />
    <span />
    <span />
  </span>
);

/* ========================================================================= */
/* 3. VECTOR CARD ART & BOTANICAL ORNAMENTS                                  */
/* ========================================================================= */
interface Palette {
  gold: string;
  rose: string;
  roseDeep: string;
  leaf: string;
}

const StarburstPoints: [number, number, number][] = [
  [152, 372, 0.8],
  [742, 486, 0.7],
  [118, 724, 0.6],
  [782, 892, 0.72],
  [196, 1046, 0.62],
  [704, 1188, 0.68],
  [370, 1338, 0.55],
  [566, 342, 0.55],
];

const LeafSvg: React.FC<{ x: number; y: number; angle: number; s: number; palette: Palette }> = ({
  x,
  y,
  angle,
  s,
  palette,
}) => (
  <g transform={`translate(${x} ${y}) rotate(${angle}) scale(${s})`}>
    <path d="M0 0C6-13 20-19 32-13 27 0 12 7 0 0Z" fill={`url(#${palette.leaf})`} opacity="0.92" />
    <path d="M1-1C11-7 20-10 28-10" fill="none" stroke="#f6ead3" strokeWidth="0.6" opacity="0.5" />
  </g>
);

const RoseSvg: React.FC<{ x: number; y: number; s: number; rotate?: number; palette: Palette }> = ({
  x,
  y,
  s,
  rotate = 0,
  palette,
}) => (
  <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${s})`}>
    <circle r="21" fill={`url(#${palette.rose})`} />
    {[0, 60, 120, 180, 240, 300].map((h) => (
      <ellipse
        key={h}
        cx="0"
        cy="-10.5"
        rx="9.5"
        ry="13.5"
        fill={`url(#${palette.rose})`}
        opacity="0.92"
        transform={`rotate(${h})`}
      />
    ))}
    {[30, 90, 150, 210, 270, 330].map((h) => (
      <ellipse
        key={h}
        cx="0"
        cy="-5.6"
        rx="5.6"
        ry="8"
        fill={`url(#${palette.roseDeep})`}
        opacity="0.55"
        transform={`rotate(${h})`}
      />
    ))}
    <circle r="4.6" fill="#8f4a50" />
    <circle r="1.8" fill="#f3ddd4" opacity="0.75" />
  </g>
);

const CornerBouquet: React.FC<{ palette: Palette }> = ({ palette }) => (
  <g>
    <g fill="none" stroke={`url(#${palette.gold})`} strokeLinecap="round">
      <path d="M2 232C46 214 74 184 82 140 88 104 112 74 156 52" strokeWidth="1.5" />
      <path d="M2 176C34 168 54 150 64 122" strokeWidth="0.9" opacity="0.8" />
      <path d="M2 268C40 256 66 236 84 206" strokeWidth="0.8" opacity="0.6" />
      <path d="M82 140C100 128 122 124 144 130" strokeWidth="0.8" opacity="0.7" />
    </g>
    <LeafSvg x={34} y={206} angle={-30} s={0.85} palette={palette} />
    <LeafSvg x={56} y={178} angle={-52} s={0.8} palette={palette} />
    <LeafSvg x={72} y={136} angle={-68} s={0.85} palette={palette} />
    <LeafSvg x={94} y={98} angle={-54} s={0.75} palette={palette} />
    <LeafSvg x={126} y={66} angle={-34} s={0.7} palette={palette} />
    <LeafSvg x={154} y={48} angle={-8} s={0.6} palette={palette} />
    <LeafSvg x={58} y={240} angle={-18} s={0.65} palette={palette} />
    <RoseSvg x={50} y={92} s={1.02} palette={palette} />
    <RoseSvg x={104} y={58} s={0.72} palette={palette} />
    <RoseSvg x={24} y={150} s={0.62} palette={palette} />
    <g fill={`url(#${palette.gold})`} opacity="0.9">
      <circle cx="78" cy="160" r="2.2" />
      <circle cx="118" cy="104" r="1.8" />
      <circle cx="40" cy="250" r="1.6" />
      <circle cx="150" cy="30" r="1.4" />
    </g>
  </g>
);

const TopArchOrnament: React.FC<{ palette: Palette }> = ({ palette }) => (
  <g transform="translate(450 30)" fill="none" stroke={`url(#${palette.gold})`} strokeLinecap="round">
    <path d="M-150 78c0-42 26-66 60-72M150 78c0-42-26-66-60-72" strokeWidth="1.2" opacity="0.6" />
    <path d="M-104 66c0-32 20-50 46-56M104 66c0-32-20-50-46-56" strokeWidth="1" opacity="0.8" />
    <path d="M-60 40c14-18 30-28 60-32 30 4 46 14 60 32" strokeWidth="1.4" />
    <path d="M-38 52c10-14 22-22 38-25 16 3 28 11 38 25" strokeWidth="0.9" opacity="0.7" />
    <path d="M0 8v22" strokeWidth="1.2" />
    <circle cx="0" cy="16" r="2.4" fill={`url(#${palette.gold})`} stroke="none" />
    <path d="M0 30l6 10-6 10-6-10Z" fill={`url(#${palette.gold})`} stroke="none" opacity="0.9" />
    <path d="M-60 40c-18 6-30 18-38 34M60 40c18 6 30 18 38 34" strokeWidth="0.9" opacity="0.55" />
  </g>
);

const BottomGarlandOrnament: React.FC<{ palette: Palette }> = ({ palette }) => (
  <g transform="translate(450 1508)">
    <g fill="none" stroke={`url(#${palette.gold})`} strokeLinecap="round">
      <path d="M-310 34C-250 10-196-6-136-16c34-6 70-4 104 10" strokeWidth="1.2" />
      <path d="M310 34C250 10 196-6 136-16c-34-6-70-4-104 10" strokeWidth="1.2" />
      <path d="M-180-14c14-22 36-36 64-42M180-14c-14-22-36-36-64-42" strokeWidth="0.9" opacity="0.7" />
      <path d="M-250 46c44-18 88-26 132-24M250 46c-44-18-88-26-132-24" strokeWidth="0.8" opacity="0.5" />
    </g>
    <LeafSvg x={-64} y={-30} angle={150} s={0.7} palette={palette} />
    <LeafSvg x={-104} y={10} angle={185} s={0.7} palette={palette} />
    <LeafSvg x={-162} y={-2} angle={200} s={0.65} palette={palette} />
    <LeafSvg x={-232} y={18} angle={190} s={0.6} palette={palette} />
    <LeafSvg x={64} y={-30} angle={30} s={0.7} palette={palette} />
    <LeafSvg x={104} y={10} angle={-5} s={0.7} palette={palette} />
    <LeafSvg x={162} y={-2} angle={-20} s={0.65} palette={palette} />
    <LeafSvg x={232} y={18} angle={-10} s={0.6} palette={palette} />
    <RoseSvg x={0} y={22} s={0.95} palette={palette} />
    <RoseSvg x={-118} y={-16} s={0.8} palette={palette} />
    <RoseSvg x={118} y={-16} s={0.8} palette={palette} />
    <RoseSvg x={-206} y={6} s={0.62} palette={palette} />
    <RoseSvg x={206} y={6} s={0.62} palette={palette} />
  </g>
);

const CardFrameArt: React.FC = () => {
  const uid = useId().replace(/:/g, '');
  const palette: Palette = {
    gold: `card-gold-${uid}`,
    rose: `card-rose-${uid}`,
    roseDeep: `card-rose-deep-${uid}`,
    leaf: `card-leaf-${uid}`,
  };

  return (
    <svg
      className="card-art"
      viewBox="0 0 900 1600"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={palette.gold} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e8d09c" />
          <stop offset="0.38" stopColor="#c19a54" />
          <stop offset="0.66" stopColor="#9a7231" />
          <stop offset="1" stopColor="#d9bb7c" />
        </linearGradient>
        <radialGradient id={palette.rose} cx="0.38" cy="0.32" r="0.72">
          <stop offset="0" stopColor="#e7b7ae" />
          <stop offset="0.55" stopColor="#cf948e" />
          <stop offset="1" stopColor="#a96463" />
        </radialGradient>
        <radialGradient id={palette.roseDeep} cx="0.4" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#c47f7e" />
          <stop offset="1" stopColor="#8e4a50" />
        </radialGradient>
        <linearGradient id={palette.leaf} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9aa887" />
          <stop offset="1" stopColor="#6f7f60" />
        </linearGradient>
      </defs>

      {/* Outer borders */}
      <g stroke={`url(#${palette.gold})`}>
        <rect x="24" y="24" width="852" height="1552" strokeWidth="2" opacity="0.95" />
        <rect x="36" y="36" width="828" height="1528" strokeWidth="0.8" opacity="0.8" />
        <rect x="50" y="50" width="800" height="1500" strokeWidth="0.55" strokeDasharray="1 8" opacity="0.55" />
      </g>

      {/* 4 Corner Bouquets */}
      <g transform="translate(24 24)">
        <CornerBouquet palette={palette} />
      </g>
      <g transform="translate(876 24) scale(-1 1)">
        <CornerBouquet palette={palette} />
      </g>
      <g transform="translate(24 1576) scale(1 -1)">
        <CornerBouquet palette={palette} />
      </g>
      <g transform="translate(876 1576) scale(-1 -1)">
        <CornerBouquet palette={palette} />
      </g>

      {/* Top & Bottom Garlands */}
      <TopArchOrnament palette={palette} />
      <BottomGarlandOrnament palette={palette} />

      {/* Starburst Sparkles */}
      <g fill={`url(#${palette.gold})`} opacity="0.38">
        {StarburstPoints.map(([sx, sy, ss], idx) => (
          <path
            key={idx}
            transform={`translate(${sx} ${sy}) scale(${ss})`}
            d="M0-8C1.5-3 3-1.5 8 0 3 1.5 1.5 3 0 8-1.5 3-3 1.5-8 0-3-1.5-1.5-3 0-8Z"
          />
        ))}
      </g>
    </svg>
  );
};

/* Floating Ambient Golden Dust */
const dustParticles = Array.from({ length: 22 }, (_, r) => {
  const s = (r * 47) % 97;
  return {
    left: `${(r * 61 + 7) % 96}%`,
    top: `${(r * 37 + 5) % 92}%`,
    size: 1.6 + (s % 5) * 0.7,
    drift: `${(s % 2 === 0 ? 1 : -1) * (18 + (s % 7) * 9)}px`,
    delay: `${(r * 0.73) % 9}s`,
    duration: `${9 + (s % 6) * 2.1}s`,
    opacity: 0.22 + (s % 4) * 0.11,
  };
});

const StageDust: React.FC = () => (
  <div className="stage-dust" aria-hidden="true">
    {dustParticles.map((p, idx) => (
      <span
        key={idx}
        className="gold-dust"
        style={
          {
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animationDelay: p.delay,
            animationDuration: p.duration,
            '--drift': p.drift,
          } as React.CSSProperties
        }
      />
    ))}
  </div>
);

/* Ornamental Divider Component */
const OrnamentDivider: React.FC<{ className?: string; small?: boolean }> = ({ className = '', small = false }) => (
  <div className={`ornament-divider ${small ? 'ornament-divider--small' : ''} ${className}`} aria-hidden="true">
    <span className="ornament-divider__line" />
    <svg className="ornament-divider__mark" viewBox="0 0 44 18" width="44" height="18" fill="none" focusable="false">
      <path
        d="M22 2.4c2.7 4.2 6.2 5.3 10.2 5.3-4 0-7.5 1.1-10.2 5.3-2.7-4.2-6.2-5.3-10.2-5.3 4 0 7.5-1.1 10.2-5.3Z"
        fill="currentColor"
        opacity="0.82"
      />
      <circle cx="22" cy="7.7" r="1.5" fill="#f4ecdc" />
      <circle cx="4.2" cy="7.7" r="0.9" fill="currentColor" opacity="0.5" />
      <circle cx="39.8" cy="7.7" r="0.9" fill="currentColor" opacity="0.5" />
    </svg>
    <span className="ornament-divider__line" />
  </div>
);

/* Date Lockup Component */
const DateLockup: React.FC<{ className?: string; showTime?: boolean }> = ({ className = '', showTime = true }) => {
  const { event } = weddingData;
  return (
    <div className={`date-lockup ${className}`}>
      <span className="date-lockup__year">{event.year}</span>
      <span className="date-lockup__rule" aria-hidden="true" />
      <span className="date-lockup__line">
        <span>{event.month}</span>
        <span className="date-lockup__dot" aria-hidden="true">·</span>
        <span>{event.day}</span>
        <span className="date-lockup__dot" aria-hidden="true">·</span>
        <span>{event.weekday}</span>
      </span>
      {showTime && (
        <>
          <span className="date-lockup__rule date-lockup__rule--short" aria-hidden="true" />
          <span className="date-lockup__time">{event.timeLabel}</span>
        </>
      )}
    </div>
  );
};

/* AnimateIn Component */
const easeRoyal = [0.22, 1, 0.36, 1];
interface AnimateInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  blur?: number;
  duration?: number;
  mask?: boolean;
}
const AnimateIn: React.FC<AnimateInProps> = ({
  children,
  className = '',
  delay = 0,
  y = 12,
  blur = 0,
  duration = 0.9,
  mask = false,
}) => {
  const shouldReduceMotion = useReducedMotion();
  if (mask) {
    return (
      <div className={`reveal-mask ${className}`}>
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: '108%' }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: '0%' }}
          transition={{ duration: shouldReduceMotion ? 0.3 : duration, delay: shouldReduceMotion ? 0 : delay, ease: easeRoyal }}
        >
          {children}
        </motion.div>
      </div>
    );
  }
  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y, ...(blur > 0 ? { filter: `blur(${blur}px)` } : {}) }}
      animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, ...(blur > 0 ? { filter: 'blur(0px)' } : {}) }}
      transition={{ duration: shouldReduceMotion ? 0.3 : duration, delay: shouldReduceMotion ? 0 : delay, ease: easeRoyal }}
    >
      {children}
    </motion.div>
  );
};

/* Medallion Wreath for Preloader Cover */
const MedallionWreath: React.FC<{ className?: string; label?: string }> = ({
  className = '',
  label = 'Aysha and Sinan monogram',
}) => {
  const uid = useId().replace(/:/g, '');
  const goldId = `wreath-gold-${uid}`;
  const roseId = `wreath-rose-${uid}`;
  const leafCount = 30;

  return (
    <svg className={`wreath ${className}`} viewBox="0 0 240 240" role="img" aria-label={label} focusable="false">
      <defs>
        <linearGradient id={goldId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f0d79c" />
          <stop offset="0.35" stopColor="#cfa855" />
          <stop offset="0.68" stopColor="#a97f31" />
          <stop offset="1" stopColor="#e2c27c" />
        </linearGradient>
        <radialGradient id={roseId} cx="0.38" cy="0.32" r="0.72">
          <stop offset="0" stopColor="#e7b3b0" />
          <stop offset="0.55" stopColor="#c97f82" />
          <stop offset="1" stopColor="#9d555e" />
        </radialGradient>
      </defs>

      <circle cx="120" cy="120" r="96" fill="none" stroke={`url(#${goldId})`} strokeWidth="0.7" opacity="0.45" />
      <circle cx="120" cy="120" r="89" fill="none" stroke={`url(#${goldId})`} strokeWidth="0.55" opacity="0.5" strokeDasharray="1 5" />

      {Array.from({ length: leafCount }, (_, p) => {
        const angleDeg = (p / leafCount) * 360;
        const rad = (angleDeg * Math.PI) / 180;
        const radDist = 82 + (p % 3) * 3.4;
        const lx = 120 + Math.cos(rad) * radDist;
        const ly = 120 + Math.sin(rad) * radDist;
        const lRot = angleDeg + 90 + (p % 2 === 0 ? 24 : -24);
        const lScale = p % 5 === 0 ? 0.72 : p % 2 === 0 ? 1.02 : 0.88;
        const lFill = p % 3 === 0 ? '#87996f' : '#a4b189';
        return (
          <g key={p} transform={`translate(${lx} ${ly}) rotate(${lRot}) scale(${lScale})`}>
            <path d="M0 0 C -5.2 -8 -4.2 -19.5 0 -26 C 4.2 -19.5 5.2 -8 0 0 Z" fill={lFill} opacity="0.9" />
            <path d="M0 -2.5 V -21" stroke="#6d7c59" strokeWidth="0.55" opacity="0.5" />
          </g>
        );
      })}

      {[12, 58, 104, 150, 196, 242, 288, 334].map((deg, p) => {
        const rad = (deg * Math.PI) / 180;
        const rDist = p % 2 === 0 ? 84 : 76;
        return (
          <circle
            key={deg}
            cx={120 + Math.cos(rad) * rDist}
            cy={120 + Math.sin(rad) * rDist}
            r={p % 3 === 0 ? 2.2 : 1.5}
            fill={`url(#${goldId})`}
            opacity="0.85"
          />
        );
      })}

      {/* 3 Rose Blooms on Wreath Ring */}
      {[
        { x: 120, y: 27, scale: 1.15 },
        { x: 27, y: 141, scale: 1.05 },
        { x: 213, y: 141, scale: 1.05 },
      ].map((flower, idx) => (
        <g key={idx} transform={`translate(${flower.x} ${flower.y}) scale(${flower.scale})`}>
          {[0, 72, 144, 216, 288].map((h) => (
            <ellipse
              key={h}
              cx="0"
              cy="-7.5"
              rx="6.2"
              ry="8.4"
              fill={`url(#${roseId})`}
              opacity="0.92"
              transform={`rotate(${h})`}
            />
          ))}
          {[36, 108, 180, 252, 324].map((h) => (
            <ellipse
              key={h}
              cx="0"
              cy="-4.2"
              rx="3.8"
              ry="5.2"
              fill="#c97f82"
              opacity="0.6"
              transform={`rotate(${h})`}
            />
          ))}
          <circle r="3.2" fill="#8f4652" />
        </g>
      ))}
    </svg>
  );
};

/* ========================================================================= */
/* 4. THE 5 SLIDES                                                           */
/* ========================================================================= */

/* Slide 1: The Invitation */
const SlideCover: React.FC<{ guestName?: string }> = ({ guestName }) => {
  const { bride, groom, event, card } = weddingData;
  return (
    <div className="page-cover">
      <AnimateIn y={8} duration={1} className="cover-bismillah-wrap">
        <p className="arabic cover-bismillah" lang="ar" dir="rtl">
          {card.bismillahArabic}
        </p>
        <p className="cover-bismillah-en">{card.bismillahEnglish}</p>
      </AnimateIn>

      <AnimateIn delay={0.16} y={6} className="cover-kicker-wrap">
        <span className="cover-kicker">The Wedding Celebration of</span>
      </AnimateIn>

      <div className="cover-names" role="heading" aria-level={1} aria-label={`${groom.fullName} and ${bride.fullName}`}>
        <AnimateIn mask delay={0.28}>
          <span className="cover-name">{groom.fullName}</span>
        </AnimateIn>
        <AnimateIn mask delay={0.44} className="cover-amp-wrap">
          <span className="cover-amp" aria-hidden="true">&</span>
        </AnimateIn>
        <AnimateIn mask delay={0.56}>
          <span className="cover-name">{bride.fullName}</span>
        </AnimateIn>
      </div>

      <AnimateIn delay={0.74} y={8}>
        <DateLockup className="cover-lockup" />
      </AnimateIn>

      <AnimateIn delay={0.86} y={8}>
        <p className="cover-venue">
          {event.venue}
          <span className="cover-venue-sep" aria-hidden="true">·</span>
          {event.city}
        </p>
      </AnimateIn>

      {guestName && (
        <AnimateIn delay={0.95} y={6}>
          <p className="cover-guest">
            Dear <strong>{guestName}</strong>,
          </p>
        </AnimateIn>
      )}

      <AnimateIn delay={1.04} y={6}>
        <p className="music-hint">
          <span className="music-hint__note" aria-hidden="true">♪</span>
          Music
        </p>
      </AnimateIn>
    </div>
  );
};

/* Slide 2: A Divine Blessing */
const SlideBlessing: React.FC = () => {
  const { quran, card } = weddingData;
  return (
    <div className="page-blessing">
      <AnimateIn y={6} className="page-kicker">
        <p className="kicker">A Divine Blessing</p>
      </AnimateIn>

      <AnimateIn delay={0.08} y={0}>
        <OrnamentDivider small />
      </AnimateIn>

      <AnimateIn delay={0.14} y={10}>
        <p className="arabic quran-arabic" lang="ar" dir="rtl">
          {quran.arabic}
        </p>
      </AnimateIn>

      <AnimateIn delay={0.26} y={8}>
        <p className="body body--italic">“{quran.translation}”</p>
        <p className="reference">{quran.reference} · {quran.translationSource}</p>
      </AnimateIn>

      <AnimateIn delay={0.36} y={0}>
        <OrnamentDivider small />
      </AnimateIn>

      <AnimateIn delay={0.42} y={8}>
        <p className="body body--italic card-dua">{card.duaEnglish}</p>
        <p className="ameen">Ameen</p>
      </AnimateIn>
    </div>
  );
};

/* Slide 3: The Couple & Parents */
const SlideCouple: React.FC = () => {
  const { bride, groom, hosts, card } = weddingData;
  return (
    <div className="page-couple">
      <AnimateIn y={6}>
        <p className="kicker">With the blessings of Allah</p>
      </AnimateIn>

      <AnimateIn delay={0.08} y={8}>
        <p className="hosts-line">{hosts.line1}</p>
        <p className="hosts-name">{hosts.name}</p>
      </AnimateIn>

      <AnimateIn delay={0.18} y={8}>
        <p className="hosts-invite">{hosts.invitation}</p>
      </AnimateIn>

      <AnimateIn delay={0.28} y={0}>
        <span className="couple-rule" aria-hidden="true" />
      </AnimateIn>

      <AnimateIn mask delay={0.34}>
        <p className="couple-name">{groom.fullName}</p>
      </AnimateIn>

      <AnimateIn delay={0.42} y={6}>
        <p className="lineage">{groom.lineage}</p>
      </AnimateIn>

      <AnimateIn delay={0.5} y={0}>
        <div className="with-divider" aria-hidden="true">
          <span />
          <em>with</em>
          <span />
        </div>
      </AnimateIn>

      <AnimateIn mask delay={0.56}>
        <p className="couple-name">{bride.fullName}</p>
      </AnimateIn>

      <AnimateIn delay={0.64} y={6}>
        <p className="lineage">{bride.lineage}</p>
      </AnimateIn>

      <AnimateIn delay={0.74} y={8}>
        <p className="couple-quote">{card.quote}</p>
      </AnimateIn>

      <AnimateIn delay={0.84} y={6}>
        <p className="insha-allah">{card.inshaAllah}</p>
      </AnimateIn>
    </div>
  );
};

/* Slide 4: The Nikah Ceremony */
interface SlideDetailsProps {
  onShare: () => void;
  onToast: (msg: string) => void;
}
const SlideDetails: React.FC<SlideDetailsProps> = ({ onShare, onToast }) => {
  const { event, card } = weddingData;

  const handleDownloadCalendar = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Aysha Zohara and Mohammed Sinan//Wedding Invitation//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'UID:aysha-sinan-wedding-20261231@invitation',
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTSTART;VALUE=DATE:${event.calendarStart.replace(/-/g, '')}`,
      `DTEND;VALUE=DATE:${event.calendarEnd.replace(/-/g, '')}`,
      `SUMMARY:Wedding of ${weddingData.bride.fullName} & ${weddingData.groom.fullName}`,
      `DESCRIPTION:${event.timeLabel}. ${event.dinnerLabel}\\n\\n${weddingData.meta.closing}`,
      `LOCATION:${event.fullVenue}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'aysha-sinan-wedding.ics';
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    onToast('Calendar event downloaded. Open it to add to your calendar.');
  };

  const googleCalendarUrl = () => {
    const r = new URL('https://calendar.google.com/calendar/render');
    r.searchParams.set('action', 'TEMPLATE');
    r.searchParams.set('text', `Wedding of ${weddingData.bride.fullName} & ${weddingData.groom.fullName}`);
    r.searchParams.set('dates', `${event.calendarStart.replace(/-/g, '')}/${event.calendarEnd.replace(/-/g, '')}`);
    r.searchParams.set('details', `${event.timeLabel}. ${event.dinnerLabel}\n\n${weddingData.meta.closing}`);
    r.searchParams.set('location', event.fullVenue);
    return r.toString();
  };

  return (
    <div className="page-details">
      <AnimateIn y={6}>
        <p className="kicker">The Nikah Ceremony</p>
      </AnimateIn>

      <AnimateIn delay={0.1} y={8}>
        <DateLockup showTime={false} />
        <p className="detail-hijri">{event.hijriDate}</p>
      </AnimateIn>

      <AnimateIn delay={0.2} y={0}>
        <span className="couple-rule" aria-hidden="true" />
      </AnimateIn>

      <AnimateIn delay={0.26} y={8}>
        <p className="detail-label">Venue</p>
        <p className="detail-venue">{event.venue}</p>
        <p className="detail-city">{event.city}</p>
      </AnimateIn>

      <AnimateIn delay={0.34} y={8}>
        <p className="detail-time">{event.timeLabel}</p>
        <p className="detail-dinner">{event.dinnerLabel}</p>
      </AnimateIn>

      <AnimateIn delay={0.42} y={8}>
        <div className="detail-actions">
          <a
            className="action"
            href={event.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open the venue in Google Maps"
          >
            <MapPinIcon />
            <span>Map</span>
          </a>
          <span className="action-sep" aria-hidden="true" />
          <button
            type="button"
            className="action"
            onClick={handleDownloadCalendar}
            aria-label="Download the wedding calendar event"
          >
            <CalendarIcon />
            <span>Calendar</span>
          </button>
          <span className="action-sep" aria-hidden="true" />
          <button
            type="button"
            className="action"
            onClick={onShare}
            aria-label="Share the invitation"
          >
            <ShareIcon />
            <span>Share</span>
          </button>
        </div>
      </AnimateIn>

      <AnimateIn delay={0.5} y={8}>
        <p className="detail-residence">
          <span className="detail-residence__label">{card.residenceLabel}</span>
          <span className="detail-residence__text">{card.residence}</span>
        </p>
      </AnimateIn>

      <AnimateIn delay={0.58} y={6}>
        <p className="card-gift">{card.gift}</p>
      </AnimateIn>

      <AnimateIn delay={0.64} y={6}>
        <a className="detail-link" href={googleCalendarUrl()} target="_blank" rel="noopener noreferrer">
          Add to Google Calendar
          <ExternalLinkIcon />
        </a>
      </AnimateIn>
    </div>
  );
};

/* Slide 5: The Countdown (Live Ticking Timer) */
function computeRemaining(targetTime: number) {
  const diff = targetTime - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isPast: false,
  };
}

const padZero = (n: number) => String(n).padStart(2, '0');

const SlideCountdown: React.FC = () => {
  const { event, cardDua, card, meta } = weddingData;
  const targetMs = new Date(event.countdownTarget).getTime();
  const [timeLeft, setTimeLeft] = useState(() => computeRemaining(targetMs));

  useEffect(() => {
    setTimeLeft(computeRemaining(targetMs));
    const timer = window.setInterval(() => {
      setTimeLeft(computeRemaining(targetMs));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [targetMs]);

  return (
    <div className="page-countdown">
      <AnimateIn y={6}>
        <p className="kicker">{timeLeft.isPast ? 'Today is the day' : 'Counting the days'}</p>
      </AnimateIn>

      <AnimateIn delay={0.1} y={8}>
        <div className="countdown" role="timer" aria-live="off" aria-label={`Countdown to the wedding on ${event.dateLabel}`}>
          <div className="countdown__row">
            <div className="countdown__cell">
              <span className="countdown__value">{padZero(timeLeft.days)}</span>
              <span className="countdown__unit">Days</span>
            </div>
            <span className="countdown__sep" aria-hidden="true" />
            <div className="countdown__cell">
              <span className="countdown__value">{padZero(timeLeft.hours)}</span>
              <span className="countdown__unit">Hours</span>
            </div>
            <span className="countdown__sep" aria-hidden="true" />
            <div className="countdown__cell">
              <span className="countdown__value">{padZero(timeLeft.minutes)}</span>
              <span className="countdown__unit">Minutes</span>
            </div>
            <span className="countdown__sep" aria-hidden="true" />
            <div className="countdown__cell">
              <span className="countdown__value">{padZero(timeLeft.seconds)}</span>
              <span className="countdown__unit">Seconds</span>
            </div>
          </div>
        </div>
      </AnimateIn>

      <AnimateIn delay={0.2} y={8}>
        <p className="countdown-date">{event.weekday} · {event.dateLabel}</p>
        <p className="countdown-venue">{event.fullVenue}</p>
      </AnimateIn>

      <AnimateIn delay={0.3} y={0}>
        <OrnamentDivider small />
      </AnimateIn>

      <AnimateIn delay={0.36} y={8}>
        <p className="arabic closing-dua" lang="ar" dir="rtl">{cardDua.arabic}</p>
        <p className="body body--italic body--small">“{cardDua.translation}”</p>
      </AnimateIn>

      <AnimateIn delay={0.46} y={8}>
        <p className="card-gift">{card.compliments}</p>
      </AnimateIn>

      <AnimateIn delay={0.54} y={6}>
        <p className="closing">{meta.closing}</p>
      </AnimateIn>
    </div>
  );
};

/* ========================================================================= */
/* 5. COVER PRELOADER & OPENING DOORS                                        */
/* ========================================================================= */
const PreloaderCover: React.FC<{ onOpen: () => void }> = ({ onOpen }) => {
  const shouldReduceMotion = useReducedMotion();
  const { bride, groom, event, card } = weddingData;

  return (
    <motion.div
      className="preloader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: shouldReduceMotion ? 0.2 : 0.75, ease: 'easeOut' } }}
      role="status"
      aria-live="polite"
      aria-label="Wedding invitation cover"
    >
      <div className="preloader__velvet" aria-hidden="true" />
      <div className="preloader__frame" aria-hidden="true" />
      <motion.div
        className="preloader__inner"
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: easeRoyal }}
      >
        <p className="preloader__eyebrow">{card.bismillahEnglish}</p>
        <span className="preloader__medallion">
          <MedallionWreath className="preloader__wreath" />
          <span className="preloader__monogram" aria-hidden="true">
            A<span>&</span>S
          </span>
        </span>
        <h1 className="preloader__names">
          <span>{bride.fullName}</span>
          <span className="preloader__amp" aria-hidden="true">&</span>
          <span>{groom.fullName}</span>
        </h1>
        <span className="preloader__rule" aria-hidden="true" />
        <p className="preloader__date">{event.weekday} · {event.dateLabel}</p>
        <p className="preloader__venue">{event.fullVenue}</p>
        <button type="button" className="preloader__open" onClick={onOpen}>
          <span>Open Invitation</span>
        </button>
        <p className="preloader__note">Tap to open · music will play softly</p>
      </motion.div>
    </motion.div>
  );
};

const OpeningDoorsAnimation: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const trans = shouldReduceMotion
    ? { duration: 0.3 }
    : { duration: 1.25, delay: 0.3, ease: [0.76, 0, 0.24, 1] as [number, number, number, number] };

  return (
    <motion.div
      className="opening"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: 'easeOut' } }}
      aria-hidden="true"
    >
      <motion.div
        className="opening__panel opening__panel--left"
        initial={{ x: '0%' }}
        animate={shouldReduceMotion ? { opacity: 0 } : { x: '-101%' }}
        transition={trans}
      >
        <span className="opening__grain" />
        <span className="opening__edge" />
      </motion.div>
      <motion.div
        className="opening__panel opening__panel--right"
        initial={{ x: '0%' }}
        animate={shouldReduceMotion ? { opacity: 0 } : { x: '101%' }}
        transition={trans}
      >
        <span className="opening__grain" />
        <span className="opening__edge" />
      </motion.div>
      <motion.div
        className="opening__seal"
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.9 }}
        transition={{ duration: shouldReduceMotion ? 0.2 : 0.55, delay: shouldReduceMotion ? 0 : 0.1, ease: 'easeOut' }}
      >
        <span className="opening__ring" aria-hidden="true" />
        <span className="opening__bismillah" lang="ar" dir="rtl">بِسْمِ اللَّهِ</span>
        <span className="opening__caption">Rahman · Raheem</span>
      </motion.div>
    </motion.div>
  );
};

/* ========================================================================= */
/* 6. BOTTOM NAVIGATION BAR                                                  */
/* ========================================================================= */
interface PageNavProps {
  page: number;
  labels: string[];
  canPrev: boolean;
  canNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (idx: number) => void;
}
const PageNav: React.FC<PageNavProps> = ({ page, labels, canPrev, canNext, onPrev, onNext, onSelect }) => {
  return (
    <nav className="page-nav" aria-label="Invitation pages">
      <button
        type="button"
        className="page-nav__arrow"
        onClick={onPrev}
        disabled={!canPrev}
        aria-label="Previous page"
      >
        <PrevArrowIcon />
      </button>

      <span className="page-nav__rule" aria-hidden="true" />

      <div className="page-nav__dots">
        {labels.map((title, idx) => (
          <button
            key={title}
            type="button"
            className={`page-nav__dot ${idx === page ? 'is-active' : ''}`}
            onClick={() => onSelect(idx)}
            aria-label={`Go to page ${idx + 1} of ${labels.length}: ${title}`}
            aria-current={idx === page ? 'page' : undefined}
          >
            <span />
          </button>
        ))}
      </div>

      <span className="page-nav__rule page-nav__rule--short" aria-hidden="true" />
      <span className="page-nav__count">{page + 1} / {labels.length}</span>

      <button
        type="button"
        className="page-nav__arrow"
        onClick={onNext}
        disabled={!canNext}
        aria-label="Next page"
      >
        <NextArrowIcon />
      </button>
    </nav>
  );
};

/* ========================================================================= */
/* 7. AUDIO PLAYER CONTROLLER & HOOK                                         */
/* ========================================================================= */
function useAudioController(src: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'playing' | 'paused' | 'error'>('idle');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolumeState] = useState<number>(0.7);
  const [progress, setProgress] = useState<number>(0);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const audio = new Audio();
    audio.src = src;
    audio.loop = true;
    audio.preload = 'metadata';
    audio.setAttribute('playsinline', '1');
    audio.volume = 0.7;
    audio.muted = false;
    audioRef.current = audio;

    const onPlay = () => {
      setStatus('playing');
      setMessage('');
    };
    const onPause = () => {
      setStatus((s) => (s === 'error' ? s : 'paused'));
    };
    const onWaiting = () => {
      setStatus((s) => (s === 'playing' ? s : 'loading'));
    };
    const onError = () => {
      setStatus('error');
      setMessage('The music could not be loaded.');
    };
    const onTimeUpdate = () => {
      if (Number.isFinite(audio.duration) && audio.duration > 0) {
        setProgress(audio.currentTime / audio.duration);
      }
    };

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('waiting', onWaiting);
    audio.addEventListener('error', onError);
    audio.addEventListener('timeupdate', onTimeUpdate);

    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('waiting', onWaiting);
      audio.removeEventListener('error', onError);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.pause();
      audio.src = '';
      audio.load();
      if (audioRef.current === audio) {
        audioRef.current = null;
      }
    };
  }, [src]);

  useEffect(() => {
    if (audioRef.current) {
      try {
        audioRef.current.volume = volume;
      } catch (e) {
        console.warn(e);
      }
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const play = useCallback(async () => {
    if (!audioRef.current) return false;
    setStatus('loading');
    setMessage('');
    try {
      await audioRef.current.play();
      setStatus('playing');
      return true;
    } catch (err) {
      if (err instanceof DOMException && err.name === 'NotAllowedError') {
        setStatus('paused');
        setMessage('Tap play to start the music.');
      } else {
        setStatus('error');
        setMessage('Playback could not be started.');
      }
      return false;
    }
  }, []);

  const pause = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setStatus('paused');
  }, []);

  const toggle = useCallback(() => {
    if (status === 'playing') {
      pause();
    } else {
      play();
    }
  }, [status, play, pause]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const setVolume = useCallback((v: number) => {
    const val = Math.max(0, Math.min(1, v));
    setVolumeState(val);
    if (val > 0 && isMuted) {
      setIsMuted(false);
    }
  }, [isMuted]);

  const retry = useCallback(async () => {
    if (!audioRef.current) return;
    audioRef.current.load();
    await play();
  }, [play]);

  return {
    status,
    isPlaying: status === 'playing',
    isMuted,
    volume,
    progress,
    message,
    play,
    pause,
    toggle,
    toggleMute,
    setVolume,
    retry,
  };
}

const AudioPlayerDock: React.FC<{ controller: ReturnType<typeof useAudioController> }> = ({ controller }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  const percent = Math.round(controller.volume * 100);
  const statusLabels = {
    idle: 'Music ready',
    loading: 'Loading',
    playing: 'Music on',
    paused: 'Music off',
    error: 'Unavailable',
  };

  return (
    <div className="audio-player" ref={panelRef}>
      <button
        type="button"
        className={`audio-player__toggle ${controller.isPlaying ? 'is-playing' : ''} ${controller.status === 'error' ? 'is-error' : ''}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="nasheed-controls"
        aria-label={`Music controls — ${statusLabels[controller.status]}`}
        title="Music controls"
      >
        {controller.isPlaying ? <EqualizerBars /> : <MusicNoteIcon />}
        <span className="sr-only">{controller.isPlaying ? 'Music on' : 'Music'}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="nasheed-controls"
            className="audio-player__panel"
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.985 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            role="group"
            aria-label="Audio player"
          >
            <div className="audio-player__head">
              <div>
                <p className="audio-player__title">{weddingData.audio.title}</p>
                <p className="audio-player__note">{weddingData.audio.note}</p>
              </div>
              <span className={`audio-player__badge audio-player__badge--${controller.status}`}>
                {statusLabels[controller.status]}
              </span>
            </div>

            <div
              className="audio-player__progress"
              role="progressbar"
              aria-label="Progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(controller.progress * 100)}
            >
              <span style={{ width: `${controller.progress * 100}%` }} />
            </div>

            <div className="audio-player__controls">
              <button
                type="button"
                className="audio-player__play"
                onClick={controller.toggle}
                aria-label={controller.isPlaying ? 'Pause music' : 'Play music'}
              >
                {controller.isPlaying ? <PauseIconSvg /> : <PlayIconSvg />}
              </button>

              <button
                type="button"
                className="audio-player__icon-btn"
                onClick={controller.toggleMute}
                aria-label={controller.isMuted ? 'Unmute music' : 'Mute music'}
                aria-pressed={controller.isMuted}
              >
                {controller.isMuted ? <VolumeMuteIconSvg /> : <VolumeIconSvg />}
              </button>

              <label className="audio-player__volume">
                <span className="sr-only">Music volume</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={controller.volume}
                  onChange={(e) => controller.setVolume(Number(e.target.value))}
                  aria-valuetext={`${percent} percent`}
                />
              </label>
            </div>

            {controller.message && (
              <p className="audio-player__message" role="status">
                {controller.message}
              </p>
            )}

            {controller.status === 'error' && (
              <button type="button" className="audio-player__retry" onClick={() => void controller.retry()}>
                Try again
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ========================================================================= */
/* 8. MAIN LUXURY WEDDING CARD COMPONENT                                     */
/* ========================================================================= */
function getInitialPageIndex(): number {
  if (typeof window === 'undefined') return 0;
  const match = window.location.hash.match(/^#\/(\d+)$/);
  if (!match) return 0;
  const pageNumber = Number(match[1]) - 1;
  return pageNumber >= 0 && pageNumber < slideList.length ? pageNumber : 0;
}

function parseGuestParam(): string {
  if (typeof window === 'undefined') return '';
  const searchParams = new URLSearchParams(window.location.search);
  return (searchParams.get('g') ?? searchParams.get('guest') ?? '').replace(/[<>]/g, '').trim().slice(0, 60);
}

export const LuxuryWeddingCard: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [currentPage, setCurrentPage] = useState<number>(getInitialPageIndex);
  const [guestName] = useState<string>(parseGuestParam);
  const [isPreloaderOpen, setIsPreloaderOpen] = useState<boolean>(() => getInitialPageIndex() === 0);
  const [isDoorAnimating, setIsDoorAnimating] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const isTransitioningRef = useRef<boolean>(false);
  const timersRef = useRef<number[]>([]);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const audioController = useAudioController(weddingData.audio.src);

  const setPage = useCallback((index: number) => {
    const clamped = Math.min(slideList.length - 1, Math.max(0, index));
    setCurrentPage(clamped);
    const url = new URL(window.location.href);
    url.hash = `/${clamped + 1}`;
    window.history.replaceState(null, '', url);
  }, []);

  const handleNext = useCallback(() => {
    if (currentPage < slideList.length - 1) {
      setPage(currentPage + 1);
    }
  }, [currentPage, setPage]);

  const handlePrev = useCallback(() => {
    if (currentPage > 0) {
      setPage(currentPage - 1);
    }
  }, [currentPage, setPage]);

  const startAudioIfIdle = useCallback(() => {
    if (audioController.status === 'idle') {
      audioController.play();
    }
  }, [audioController]);

  const handleNextWithAudio = useCallback(() => {
    startAudioIfIdle();
    handleNext();
  }, [startAudioIfIdle, handleNext]);

  const handleSelectPage = useCallback(
    (index: number) => {
      if (index !== currentPage) {
        startAudioIfIdle();
        setPage(index);
      }
    },
    [currentPage, startAudioIfIdle, setPage]
  );

  /* Open invitation handler from preloader */
  const handleOpenInvitation = useCallback(() => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setIsPreloaderOpen(false);

    // Play wedding nasheed audio
    audioController.play();

    // Trigger golden and crimson rose petal confetti
    try {
      confetti({
        particleCount: 95,
        spread: 90,
        origin: { y: 0.55 },
        colors: ['#e8d09c', '#c19a54', '#8a6229', '#6d2128', '#f8eeda', '#a96463'],
      });
    } catch (e) {
      console.warn(e);
    }

    const t1 = window.setTimeout(() => {
      setIsDoorAnimating(true);
    }, shouldReduceMotion ? 60 : 420);

    const t2 = window.setTimeout(() => {
      setIsDoorAnimating(false);
      isTransitioningRef.current = false;
    }, shouldReduceMotion ? 220 : 2050);

    timersRef.current.push(t1, t2);
  }, [audioController, shouldReduceMotion]);

  /* Share handler */
  const handleShare = useCallback(async () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}#/5`;
    const shareData = {
      title: `${weddingData.meta.couple} — Wedding Invitation`,
      text: weddingData.meta.shareText,
      url: shareUrl,
    };

    if (typeof navigator.share === 'function') {
      try {
        await navigator.share(shareData);
        setToastMessage('Thank you for sharing the invitation.');
        return;
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }
      }
    }

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        setToastMessage('Invitation link copied to your clipboard.');
        return;
      }
    } catch (e) {
      console.warn(e);
    }

    setToastMessage('Could not share automatically. Please copy the link from your browser.');
  }, []);

  /* Touch Swiping Handlers */
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartRef.current;
    touchStartRef.current = null;
    if (!start) return;

    const end = e.changedTouches[0];
    const dx = end.clientX - start.x;
    const dy = end.clientY - start.y;

    if (Math.abs(dx) < 54 || Math.abs(dx) < Math.abs(dy) * 1.4) return;

    if (dx < 0) {
      handleNextWithAudio();
    } else if (currentPage > 0) {
      handlePrev();
    }
  };

  /* Lock body scroll */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  /* Sync with hash changes */
  useEffect(() => {
    const onHashChange = () => setCurrentPage(getInitialPageIndex());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  /* Clear timers */
  useEffect(() => {
    return () => {
      timersRef.current.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  /* Toast auto-hide */
  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => setToastMessage(''), 3800);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  /* Keyboard Navigation */
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target;
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement
      ) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        handleNextWithAudio();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'Home') {
        e.preventDefault();
        setPage(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        setPage(slideList.length - 1);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleNextWithAudio, handlePrev, setPage]);

  /* Slide transition motion variants */
  const slideVariants = {
    enter: { opacity: 0, y: shouldReduceMotion ? 0 : 14 },
    center: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0.18 : 0.7, ease: easeRoyal },
    },
    exit: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : -10,
      transition: { duration: shouldReduceMotion ? 0.1 : 0.32, ease: 'easeIn' },
    },
  };

  return (
    <div className="app">
      <div className="app__bg" aria-hidden="true" />

      {/* Preloader Welcome Cover */}
      <AnimatePresence>
        {isPreloaderOpen && <PreloaderCover onOpen={handleOpenInvitation} />}
      </AnimatePresence>

      {/* Main 5-Slide Interactive Card */}
      {!isPreloaderOpen && (
        <>
          <main
            id="main"
            className="invite-card"
            tabIndex={-1}
            aria-label={slideList[currentPage].title}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <CardFrameArt />
            <div className="invite-card__veil" aria-hidden="true" />
            <StageDust />

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentPage}
                className="invite-card__scroll"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <div className="invite-card__inner">
                  <h2 className="sr-only">{slideList[currentPage].title}</h2>
                  {currentPage === 0 && <SlideCover guestName={guestName} />}
                  {currentPage === 1 && <SlideBlessing />}
                  {currentPage === 2 && <SlideCouple />}
                  {currentPage === 3 && <SlideDetails onShare={handleShare} onToast={setToastMessage} />}
                  {currentPage === 4 && <SlideCountdown />}
                </div>
              </motion.div>
            </AnimatePresence>
          </main>

          {/* Navigation Bar */}
          <PageNav
            page={currentPage}
            labels={slideList.map((s) => s.title)}
            canPrev={currentPage > 0}
            canNext={currentPage < slideList.length - 1}
            onPrev={handlePrev}
            onNext={handleNextWithAudio}
            onSelect={handleSelectPage}
          />

          {/* Audio Player Controller */}
          <AudioPlayerDock controller={audioController} />

          {/* Toast Notification */}
          <AnimatePresence>
            {toastMessage && (
              <motion.div
                className="toast"
                role="status"
                aria-live="polite"
                initial={{ opacity: 0, y: -10, x: '-50%' }}
                animate={{ opacity: 1, y: 0, x: '-50%' }}
                exit={{ opacity: 0, y: -8, x: '-50%' }}
                transition={{ duration: 0.25 }}
              >
                {toastMessage}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Opening Doors Animation */}
          <AnimatePresence>
            {isDoorAnimating && <OpeningDoorsAnimation />}
          </AnimatePresence>
        </>
      )}

      {/* Screen Reader Announcement */}
      <p className="sr-only" aria-live="polite">
        Page {currentPage + 1} of {slideList.length}: {slideList[currentPage].title}
      </p>
    </div>
  );
};

export default LuxuryWeddingCard;
