import React, { useState, useEffect, useMemo, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  MessageCircle,
  Plus,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Heart,
  Eye,
  X,
  Sparkles,
} from 'lucide-react';

// Wedding Data faithfully transcribed from physical invitation card
const WEDDING_DATA = {
  groomName: "Mohammed Sinan",
  groomGrandparents: "Grand S/o. Marhoom P. Hammabba Beary & Marhoom Mohammad Abdullah Sheikh",
  brideName: "Aysha Zohara",
  brideFather: "D/o. Abdul Lateef Ibrahim",
  parents: "Mrs. & Mr. Mohammed Hussain Beary",
  date: "Thursday, 31st December, 2026",
  hijriDate: "21st Rajab, 1448 H.",
  time: "After Namaz Maghrib (Dinner till 10:00 PM)",
  venue: "Unity Hall",
  address: "Thokkottu, Mangalore",
  mapsLink: "https://www.google.com/maps/search/?api=1&query=Unity+Hall+Thokkottu+Mangalore",
  whatsappNumber: "919876543210",
  residence: "Sugandh Palace, Nityanand Nagar, Ghatkopar (W), Mumbai-400 086",
  poetry: "A Day of togetherness, a moment of joy and emotions\na dream of every parent today a reality of us",
  compliments: "Relatives & Friends",
  giftNote: "YOUR PRESENCE & DUA IS OUR GREATEST GIFT",
  parentsPrayer: "Oh Allah guide this marriage to the best of understanding, happiness, prosperity & success - Ameen",
};

// Corner Gold Floral Ornament (from bolt.host)
const CornerFloral: React.FC<{ position: 'tl' | 'tr' | 'bl' | 'br' }> = ({ position }) => {
  const rotation = {
    tl: "top-0 left-0 rotate-0",
    tr: "top-0 right-0 rotate-90",
    bl: "bottom-0 left-0 -rotate-90",
    br: "bottom-0 right-0 rotate-180",
  }[position];

  return (
    <div className={`absolute w-24 h-24 md:w-32 md:h-32 ${rotation} opacity-40 pointer-events-none select-none`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <linearGradient id="floral-gold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#B8960C" stopOpacity="0.65" />
          </linearGradient>
        </defs>
        <path d="M0,50 Q25,25 50,0" fill="none" stroke="url(#floral-gold)" strokeWidth="1" />
        <path d="M0,70 Q35,35 70,0" fill="none" stroke="url(#floral-gold)" strokeWidth="0.7" />
        <path d="M0,30 Q15,15 30,0" fill="none" stroke="url(#floral-gold)" strokeWidth="0.5" />
        <circle cx="6" cy="6" r="10" fill="none" stroke="url(#floral-gold)" strokeWidth="0.6" />
        {[12, 22, 32].map((n, r) => (
          <circle key={r} cx={n} cy={n * 0.6} r="2.5" fill="url(#floral-gold)" opacity="0.6" />
        ))}
      </svg>
    </div>
  );
};

// Subtle Floating Gold Flowers Background (from bolt.host)
const FloatingBackground: React.FC = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
    {Array.from({ length: 6 }).map((_, t) => (
      <div
        key={t}
        className="absolute opacity-[0.035]"
        style={{
          left: `${10 + t * 15}%`,
          top: `${(t * 18) % 100}%`,
          animation: `float ${6 + t * 0.5}s ease-in-out infinite`,
          animationDelay: `${t * 0.6}s`,
        }}
      >
        <svg width="50" height="50" viewBox="0 0 50 50">
          <circle cx="25" cy="25" r="5" fill="#D4AF37" />
          <path d="M25,8 Q32,18 25,25 Q18,18 25,8" fill="#D4AF37" opacity="0.5" />
          <path d="M25,42 Q32,32 25,25 Q18,32 25,42" fill="#D4AF37" opacity="0.5" />
          <path d="M8,25 Q18,18 25,25 Q18,32 8,25" fill="#D4AF37" opacity="0.5" />
          <path d="M42,25 Q32,18 25,25 Q32,32 42,25" fill="#D4AF37" opacity="0.5" />
        </svg>
      </div>
    ))}
  </div>
);

// Countdown Timer Block
const CountdownBlock: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl bg-white/60 backdrop-blur-lg border border-champagne-gold/25 shadow-lg flex items-center justify-center">
      <span className="font-elegant text-2xl sm:text-3xl md:text-4xl text-soft-black font-semibold tabular-nums">
        {String(value).padStart(2, '0')}
      </span>
    </div>
    <span className="font-elegant text-[10px] md:text-xs uppercase tracking-widest text-soft-black/40 mt-2.5">
      {label}
    </span>
  </div>
);

export const App: React.FC = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // URL search params for personalizing invitation (?guest=Name or ?g=Name)
  const searchParams = useMemo(() => {
    if (typeof window !== 'undefined') {
      return new URLSearchParams(window.location.search);
    }
    return new URLSearchParams();
  }, []);

  const guestName = searchParams.get('guest') || searchParams.get('g') || '';
  const customPhone = searchParams.get('phone') || WEDDING_DATA.whatsappNumber;

  // Countdown target: 31st December 2026, approx 6:30 PM (Maghrib)
  const targetDate = useMemo(() => new Date('2026-12-31T18:30:00+05:30'), []);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const updateCountdown = () => {
      const diff = targetDate.getTime() - new Date().getTime();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  // Open Invitation Handler with confetti and audio
  const handleOpenInvitation = () => {
    setIsOpened(true);

    try {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#B8960C', '#801B2E', '#F7E7CE', '#FFFFFF'],
      });
    } catch (e) {
      console.warn(e);
    }

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.warn("Autoplay blocked or waiting user gesture:", e);
      });
    }

    document.body.style.overflow = "auto";
  };

  const togglePlayAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(console.warn);
    }
  };

  const toggleMuteAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    const nextMuted = !isMuted;
    audioRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  // Google Calendar handler
  const handleGoogleCalendar = () => {
    const startDate = "20261231T130000Z";
    const endDate = "20261231T170000Z";
    const text = encodeURIComponent(`Wedding Reception - ${WEDDING_DATA.groomName} & ${WEDDING_DATA.brideName}`);
    const details = encodeURIComponent(
      `Wedding Ceremony & Reception\nVenue: ${WEDDING_DATA.venue}\nAddress: ${WEDDING_DATA.address}\nTime: After Namaz Maghrib, dinner till 10 PM`
    );
    const location = encodeURIComponent(`${WEDDING_DATA.venue}, ${WEDDING_DATA.address}`);
    window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${startDate}/${endDate}&details=${details}&location=${location}`, '_blank');
  };

  const whatsappMessage = `Assalamu Alaikum! I am ${guestName || "a guest"}, and I will be attending the Wedding Ceremony of ${WEDDING_DATA.groomName} & ${WEDDING_DATA.brideName} on 31st December 2026 Insha Allah.`;

  return (
    <div className="min-h-screen bg-ivory text-soft-black overflow-x-hidden selection:bg-champagne-gold/20 selection:text-soft-black font-body">
      {/* Background Ambience */}
      <FloatingBackground />

      {/* Hidden Native Audio Element with WhatsApp voice/audio */}
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

      {/* ======================================================== */}
      {/* 1. ENVELOPE OPENING WELCOME SCREEN (The bolt.host flow)  */}
      {/* ======================================================== */}
      {!isOpened ? (
        <div className="fixed inset-0 z-50 bg-gradient-to-br from-ivory via-white to-cream flex items-center justify-center overflow-hidden p-6 select-none animate-[fadeIn_0.6s_ease-out]">
          {/* Corner Floral Ornaments */}
          <CornerFloral position="tl" />
          <CornerFloral position="tr" />
          <CornerFloral position="bl" />
          <CornerFloral position="br" />

          {/* Envelope Center Content */}
          <div className="relative z-10 text-center px-4 max-w-lg mx-auto">
            {/* Arabic Bismillah */}
            <p className="font-arabic text-3xl md:text-4xl text-champagne-gold mb-6 tracking-wide drop-shadow-sm">
              بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
            </p>

            {/* Subtitle */}
            <p className="font-elegant text-xs sm:text-sm md:text-base text-soft-black/50 mb-6 tracking-widest uppercase">
              Together with our families
            </p>

            {/* Couple Names */}
            <div className="mb-6">
              <h1 className="font-calligraphy text-4xl sm:text-5xl lg:text-6xl text-soft-black mb-2">
                {WEDDING_DATA.groomName}
              </h1>

              <div className="flex items-center justify-center gap-4 my-3">
                <div className="w-12 h-px bg-champagne-gold/40" />
                <span className="font-elegant text-xl text-champagne-gold italic">&</span>
                <div className="w-12 h-px bg-champagne-gold/40" />
              </div>

              <h1 className="font-calligraphy text-4xl sm:text-5xl lg:text-6xl text-soft-black">
                {WEDDING_DATA.brideName}
              </h1>
            </div>

            {/* Invitation Request Line */}
            <div className="my-8">
              <p className="font-elegant text-sm md:text-base text-soft-black/60 leading-relaxed max-w-sm mx-auto">
                Request the pleasure of your gracious presence<br />
                at our Wedding Reception
              </p>
            </div>

            {/* Date */}
            <p className="font-elegant text-base md:text-lg text-soft-black/70 mb-8 font-medium">
              {WEDDING_DATA.date}
            </p>

            {/* Guest Personalization */}
            {guestName && (
              <p className="font-elegant text-lg text-soft-black/70 mb-8 italic">
                Dear {guestName}
              </p>
            )}

            {/* The Pulsing "Open Invitation" Button */}
            <button
              onClick={handleOpenInvitation}
              className="relative px-10 py-4 bg-champagne-gold/10 border border-champagne-gold/40 rounded-full font-elegant text-sm uppercase tracking-widest text-soft-black backdrop-blur-sm overflow-hidden group hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(212,175,55,0.2),0_0_40px_rgba(212,175,55,0.1)]"
            >
              <div className="absolute inset-0 bg-champagne-gold/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10 font-semibold tracking-widest">
                Open Invitation
              </span>
            </button>
          </div>
        </div>
      ) : (
        /* ======================================================== */
        /* 2. MAIN UNROLLED INVITATION PAGE (The bolt.host flow)    */
        /* ======================================================== */
        <main className="relative z-10 animate-[fadeIn_0.8s_ease-out]">
          
          {/* Floating Audio Control Pill */}
          <div className="fixed bottom-6 right-6 z-40 select-none">
            <div
              onClick={togglePlayAudio}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-full cursor-pointer transition-all duration-300 shadow-xl backdrop-blur-xl border ${
                isPlaying
                  ? "bg-white/95 border-champagne-gold/40 text-soft-black ring-2 ring-champagne-gold/30"
                  : "bg-white/80 border-champagne-gold/20 text-soft-black/70 hover:bg-white"
              }`}
            >
              <div className="flex items-center justify-center w-7 h-7 rounded-full bg-champagne-gold/15">
                {isPlaying ? (
                  <div className="flex items-end justify-center gap-0.5 w-3.5 h-3.5">
                    <span className="w-0.5 bg-champagne-gold rounded-full h-2.5 animate-[pulse_0.6s_infinite]" />
                    <span className="w-0.5 bg-champagne-gold rounded-full h-3.5 animate-[pulse_0.8s_infinite_0.2s]" />
                    <span className="w-0.5 bg-champagne-gold rounded-full h-2 animate-[pulse_0.7s_infinite_0.4s]" />
                  </div>
                ) : (
                  <Play className="w-3.5 h-3.5 text-champagne-gold ml-0.5 fill-champagne-gold" />
                )}
              </div>

              <div className="flex flex-col text-left pr-1">
                <span className="text-[10px] uppercase tracking-widest font-elegant font-semibold text-champagne-gold">
                  {isPlaying ? "Music Playing" : "Wedding Voice"}
                </span>
                <span className="text-xs font-medium font-body text-soft-black">
                  {isPlaying ? "Tap to Pause" : "Play Nasheed"}
                </span>
              </div>

              <button
                onClick={toggleMuteAudio}
                className="p-1 rounded-full hover:bg-champagne-gold/10 text-champagne-gold"
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* ---------------------------------------------------- */}
          {/* SECTION 1: HERO SECTION                              */}
          {/* ---------------------------------------------------- */}
          <section className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-20 relative text-center">
            <div className="mb-6">
              <p className="font-elegant text-xs uppercase tracking-widest text-soft-black/40 mb-6">
                Wedding Ceremony & Reception
              </p>
            </div>

            <div className="mb-6">
              <h1 className="font-calligraphy text-4xl sm:text-5xl lg:text-6xl text-soft-black mb-2">
                {WEDDING_DATA.groomName}
              </h1>
              <p className="font-elegant text-xs sm:text-sm text-soft-black/60 italic mb-2">
                ({WEDDING_DATA.groomGrandparents})
              </p>

              <div className="flex items-center justify-center gap-4 my-4">
                <div className="w-12 h-px bg-champagne-gold/40" />
                <span className="font-elegant text-xl text-champagne-gold italic">&</span>
                <div className="w-12 h-px bg-champagne-gold/40" />
              </div>

              <h1 className="font-calligraphy text-4xl sm:text-5xl lg:text-6xl text-soft-black mb-2">
                {WEDDING_DATA.brideName}
              </h1>
              <p className="font-elegant text-xs sm:text-sm text-soft-black/60 italic">
                ({WEDDING_DATA.brideFather})
              </p>
            </div>

            <div className="w-20 h-px bg-champagne-gold/30 mx-auto my-6" />

            {/* Parents Solicit Message */}
            <div className="max-w-md mx-auto mb-4">
              <p className="font-elegant text-sm sm:text-base text-soft-black/70 italic font-medium">
                {WEDDING_DATA.parents}
              </p>
              <p className="font-body text-xs text-soft-black/50 mt-1">
                solicit your blessing & request the pleasure of your family on the occasion of the wedding ceremony of their son
              </p>
            </div>

            <p className="font-elegant text-sm md:text-base text-soft-black/50 italic leading-relaxed max-w-md mx-auto">
              Two souls, one heart, united in love and faith.<br />
              We joyfully invite you to share in our happiness.
            </p>

            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-champagne-gold/30 to-transparent" />
          </section>

          {/* ---------------------------------------------------- */}
          {/* SECTION 2: LIVE COUNTDOWN TIMER                      */}
          {/* ---------------------------------------------------- */}
          <section className="py-16 px-4">
            <div className="text-center mb-12">
              <p className="font-elegant text-xs uppercase tracking-widest text-soft-black/40">
                Counting down to our special day
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6">
              <CountdownBlock value={timeLeft.days} label="Days" />
              <span className="font-elegant text-2xl text-champagne-gold/30 mt-[-20px]">:</span>
              <CountdownBlock value={timeLeft.hours} label="Hours" />
              <span className="font-elegant text-2xl text-champagne-gold/30 mt-[-20px]">:</span>
              <CountdownBlock value={timeLeft.minutes} label="Minutes" />
              <span className="font-elegant text-2xl text-champagne-gold/30 mt-[-20px]">:</span>
              <CountdownBlock value={timeLeft.seconds} label="Seconds" />
            </div>

            <div className="w-px h-16 bg-gradient-to-b from-transparent via-champagne-gold/20 to-transparent mx-auto mt-12" />
          </section>

          {/* ---------------------------------------------------- */}
          {/* SECTION 3: WEDDING DETAILS (Exact bolt.host card)    */}
          {/* ---------------------------------------------------- */}
          <section className="py-16 px-4">
            <div className="text-center mb-10">
              <p className="font-arabic text-2xl text-champagne-gold mb-2">
                حَفْلُ الْزَّوَاج
              </p>
              <h2 className="font-elegant text-2xl md:text-3xl text-soft-black font-semibold">
                Wedding Details
              </h2>
            </div>

            <div className="max-w-lg mx-auto p-6 md:p-8 rounded-3xl bg-white/60 backdrop-blur-xl border border-champagne-gold/20 shadow-xl">
              <div className="space-y-5">
                {/* Date */}
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-full bg-champagne-gold/10 border border-champagne-gold/15">
                    <CalendarIcon className="w-4 h-4 text-champagne-gold" />
                  </div>
                  <div>
                    <p className="font-elegant text-[10px] uppercase tracking-widest text-soft-black/40">
                      Date
                    </p>
                    <p className="font-elegant text-base text-soft-black font-medium">
                      {WEDDING_DATA.date}
                    </p>
                    <p className="font-elegant text-xs text-soft-black/50 italic">
                      ({WEDDING_DATA.hijriDate})
                    </p>
                  </div>
                </div>

                {/* Time */}
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-full bg-champagne-gold/10 border border-champagne-gold/15">
                    <Clock className="w-4 h-4 text-champagne-gold" />
                  </div>
                  <div>
                    <p className="font-elegant text-[10px] uppercase tracking-widest text-soft-black/40">
                      Time
                    </p>
                    <p className="font-elegant text-base text-soft-black font-medium">
                      {WEDDING_DATA.time}
                    </p>
                  </div>
                </div>

                {/* Venue */}
                <div className="flex items-center gap-4">
                  <div className="p-2.5 rounded-full bg-champagne-gold/10 border border-champagne-gold/15">
                    <MapPin className="w-4 h-4 text-champagne-gold" />
                  </div>
                  <div>
                    <p className="font-elegant text-[10px] uppercase tracking-widest text-soft-black/40">
                      Venue
                    </p>
                    <p className="font-elegant text-base text-soft-black font-medium">
                      {WEDDING_DATA.venue}
                    </p>
                    <p className="font-elegant text-sm text-soft-black/50">
                      {WEDDING_DATA.address}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Maps, RSVP, Calendar */}
              <div className="grid grid-cols-3 gap-3 mt-8">
                <a
                  href={WEDDING_DATA.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 px-4 py-4 rounded-xl bg-champagne-gold/8 border border-champagne-gold/15 text-soft-black font-elegant text-xs hover:bg-champagne-gold/15 transition-colors"
                >
                  <MapPin className="w-4 h-4 text-champagne-gold" />
                  <span>Maps</span>
                </a>

                <a
                  href={`https://wa.me/${customPhone}?text=${encodeURIComponent(whatsappMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 px-4 py-4 rounded-xl bg-green-50 border border-green-200/40 text-soft-black font-elegant text-xs hover:bg-green-100 transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-green-600" />
                  <span>RSVP</span>
                </a>

                <button
                  onClick={handleGoogleCalendar}
                  className="flex flex-col items-center gap-2 px-4 py-4 rounded-xl bg-champagne-gold/8 border border-champagne-gold/15 text-soft-black font-elegant text-xs hover:bg-champagne-gold/15 transition-colors"
                >
                  <Plus className="w-4 h-4 text-champagne-gold" />
                  <span>Calendar</span>
                </button>
              </div>
            </div>

            <div className="w-px h-16 bg-gradient-to-b from-transparent via-champagne-gold/20 to-transparent mx-auto mt-12" />
          </section>

          {/* ---------------------------------------------------- */}
          {/* SECTION 4: PHYSICAL CARD LEFT FLAP HEIRLOOM POETRY   */}
          {/* ---------------------------------------------------- */}
          <section className="py-12 px-4">
            <div className="max-w-lg mx-auto p-6 md:p-8 rounded-3xl bg-white/40 backdrop-blur-xl border border-champagne-gold/20 shadow-md text-center">
              <p className="font-calligraphy text-2xl sm:text-3xl text-soft-black mb-3">
                A Day of Togetherness
              </p>
              <p className="font-elegant text-sm sm:text-base text-soft-black/70 italic leading-relaxed mb-6">
                "A moment of joy and emotions,<br />
                a dream of every parent today a reality of us."
              </p>

              <div className="w-16 h-px bg-champagne-gold/30 mx-auto my-4" />

              <p className="font-elegant text-[11px] uppercase tracking-widest text-soft-black/40 font-semibold mb-1">
                With Best Compliments From
              </p>
              <p className="font-calligraphy text-2xl text-soft-black font-bold mb-4">
                {WEDDING_DATA.compliments}
              </p>

              <div className="inline-block px-4 py-1.5 rounded-full bg-champagne-gold/10 border border-champagne-gold/30 my-2">
                <p className="font-elegant text-xs uppercase tracking-wider text-soft-black font-bold">
                  {WEDDING_DATA.giftNote}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-champagne-gold/15 text-xs font-elegant text-soft-black/60">
                <p className="font-semibold text-soft-black/80">Resi. :</p>
                <p>{WEDDING_DATA.residence}</p>
              </div>
            </div>

            <div className="w-px h-16 bg-gradient-to-b from-transparent via-champagne-gold/20 to-transparent mx-auto mt-12" />
          </section>

          {/* ---------------------------------------------------- */}
          {/* SECTION 5: WEDDING DUA                               */}
          {/* ---------------------------------------------------- */}
          <section className="py-16 px-4">
            <div className="text-center mb-8">
              <p className="font-arabic text-2xl text-champagne-gold mb-2">
                دُعَاء
              </p>
              <h2 className="font-elegant text-2xl md:text-3xl text-soft-black font-semibold">
                Wedding Dua
              </h2>
            </div>

            <div className="max-w-lg mx-auto p-6 md:p-8 rounded-3xl bg-white/60 backdrop-blur-xl border border-champagne-gold/20 shadow-xl text-center">
              <p className="font-arabic text-xl md:text-2xl text-soft-black leading-loose mb-6" dir="rtl">
                بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا<br />
                وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
              </p>

              <div className="flex items-center justify-center gap-3 my-5">
                <div className="w-8 h-px bg-champagne-gold/25" />
                <div className="w-1.5 h-1.5 rounded-full bg-champagne-gold/35" />
                <div className="w-8 h-px bg-champagne-gold/25" />
              </div>

              <p className="font-elegant text-base text-soft-black/60 italic mb-4">
                Allahumma barik lahuma wa barik 'alayhima<br />
                wa ajma' baynahuma fi khayr.
              </p>

              <p className="font-elegant text-sm text-soft-black/50 leading-relaxed">
                "May Allah bless both of you, shower His blessings<br />
                upon you, and unite you in goodness."
              </p>
            </div>

            <div className="w-px h-16 bg-gradient-to-b from-transparent via-champagne-gold/20 to-transparent mx-auto mt-12" />
          </section>

          {/* ---------------------------------------------------- */}
          {/* SECTION 6: COUPLE SIGNATURES                         */}
          {/* ---------------------------------------------------- */}
          <section className="py-12 px-4">
            <div className="text-center max-w-md mx-auto">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-10 h-px bg-champagne-gold/25" />
                <div className="w-2 h-2 rounded-full bg-champagne-gold/35" />
                <div className="w-10 h-px bg-champagne-gold/25" />
              </div>

              <p className="font-calligraphy text-3xl md:text-4xl text-soft-black mb-2">
                {WEDDING_DATA.groomName}
              </p>
              <span className="font-elegant text-lg text-champagne-gold">&</span>
              <p className="font-calligraphy text-3xl md:text-4xl text-soft-black mt-2">
                {WEDDING_DATA.brideName}
              </p>

              <div className="flex items-center justify-center gap-3 mt-6">
                <div className="w-10 h-px bg-champagne-gold/25" />
                <div className="w-2 h-2 rounded-full bg-champagne-gold/35" />
                <div className="w-10 h-px bg-champagne-gold/25" />
              </div>

              {/* View Original Printed Card Button */}
              <div className="mt-8">
                <button
                  onClick={() => setIsCardModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-champagne-gold/30 text-xs font-elegant text-soft-black/70 hover:bg-champagne-gold/10 hover:text-soft-black transition-all shadow-sm"
                >
                  <Eye className="w-3.5 h-3.5 text-champagne-gold" />
                  <span>View Original Printed Card</span>
                </button>
              </div>
            </div>
          </section>

          {/* ---------------------------------------------------- */}
          {/* SECTION 7: FOOTER                                    */}
          {/* ---------------------------------------------------- */}
          <section className="py-16 px-4 text-center">
            <div className="max-w-md mx-auto">
              <p className="font-elegant text-sm text-soft-black/40 tracking-wider leading-relaxed">
                We look forward to celebrating this joyful occasion with you.
              </p>
              <div className="mt-6 flex items-center justify-center gap-1">
                <span className="font-elegant text-xs text-soft-black/30">Made with</span>
                <span className="text-champagne-gold">❤</span>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* Lightbox Modal for Physical Card Photo */}
      {isCardModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-[fadeIn_0.3s_ease-out]">
          <div className="relative w-full max-w-lg bg-stone-900 rounded-3xl overflow-hidden border border-champagne-gold/30 shadow-2xl flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between px-5 py-3.5 bg-stone-950 border-b border-stone-800 text-cream">
              <span className="font-elegant text-xs uppercase tracking-widest font-semibold">
                Original Printed Invitation Card
              </span>
              <button
                onClick={() => setIsCardModalOpen(false)}
                className="p-1 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-3 overflow-y-auto flex items-center justify-center">
              <img
                src="/images/original-card.jpg"
                alt="Original Printed Wedding Card"
                className="max-h-[70vh] w-auto object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
