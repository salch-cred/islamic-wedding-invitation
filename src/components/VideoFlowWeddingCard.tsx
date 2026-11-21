import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  VolumeHighIcon,
  VolumeMute01Icon,
  Location01Icon,
  WhatsappIcon,
  Calendar03Icon,
  SparklesIcon,
  RefreshIcon,
} from 'hugeicons-react';
import { weddingDetails } from '../data/weddingDetails';

export const VideoFlowWeddingCard: React.FC = () => {
  // Flow states: 'closed' (envelope with wax seal) -> 'opening' (gate opening video) -> 'entered' (5 master slides)
  const [phase, setPhase] = useState<'closed' | 'opening' | 'entered'>('closed');
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [slideProgress, setSlideProgress] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // The 5 pristine master slides (100% watermark-free, accurate details, zero missing glyphs)
  const slides = [
    {
      id: 0,
      title: 'Bismillah & Dua',
      image: '/images/final_slide1_bismillah.jpg',
    },
    {
      id: 1,
      title: 'Host Parents',
      image: '/images/final_slide2_parents.jpg',
    },
    {
      id: 2,
      title: 'The Couple',
      image: '/images/final_slide3_couple.jpg',
    },
    {
      id: 3,
      title: 'Nikah & Venue',
      image: '/images/final_slide4_fountain.jpg',
    },
    {
      id: 4,
      title: 'Compliments & RSVP',
      image: '/images/final_slide5_rsvp.jpg',
    },
  ];

  const totalSlides = slides.length;
  const slideDurationMs = 6500; // 6.5s auto progress per slide

  // 1. Open the royal invitation on user tap
  const handleOpenEnvelope = () => {
    if (phase !== 'closed') return;

    // Trigger golden and crimson rose petal confetti
    try {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#801B2E', '#F3E5AB', '#FFFFFF', '#C5A059'],
      });
    } catch (e) {
      console.warn(e);
    }

    // Play royal background audio
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(console.warn);
    }

    // Switch to gate opening video
    setPhase('opening');

    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Fallback transition if autoplay is blocked
        setTimeout(() => {
          setPhase('entered');
        }, 3000);
      });
    }
  };

  // 2. Video ended handler (moves straight into the master slides)
  const handleVideoEnded = () => {
    setPhase('entered');
    setCurrentSlide(0);
    setSlideProgress(0);
  };

  // 3. Replay invitation from the closed gate
  const handleReplay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setPhase('closed');
    setCurrentSlide(0);
    setSlideProgress(0);
  };

  // 4. Music toggle (ONLY control permitted)
  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.muted = false;
      audioRef.current.play().catch(console.warn);
      setIsMuted(false);
    } else {
      audioRef.current.muted = true;
      setIsMuted(true);
    }
  };

  // 5. Auto progress timer for slides
  useEffect(() => {
    if (phase !== 'entered') return;

    const interval = 50;
    const step = (interval / slideDurationMs) * 100;

    const timer = setInterval(() => {
      setSlideProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((curr) => (curr + 1) % totalSlides);
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [phase, currentSlide, totalSlides]);

  // Touch / click slide navigation
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (phase !== 'entered') return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;

    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a')) return;

    if (clickX < width * 0.35) {
      // Previous slide
      setCurrentSlide((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
      setSlideProgress(0);
    } else {
      // Next slide
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
      setSlideProgress(0);
    }
  };

  // Google Calendar handler
  const handleGoogleCalendar = (e: React.MouseEvent) => {
    e.stopPropagation();
    const title = encodeURIComponent(
      `Wedding Ceremony - ${weddingDetails.groom.name} & ${weddingDetails.bride.name}`
    );
    const details = encodeURIComponent(
      `In the Name of Allah, Mrs. & Mr. Mohammed Hussain Beary solicit your blessing on the occasion of the wedding ceremony of their son Mohammed Sinan with Aysha Zohara.\n\nDate: Thursday, 31st December, 2026 (21st Rajab, 1448 H.)\nTime: After Namaz Maghrib, followed by Dinner till 10:00 PM\nVenue: Unity Hall, Thokkottu Mangalore`
    );
    const location = encodeURIComponent('Unity Hall, Thokkottu Mangalore');
    window.open(
      `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20261231T130000Z/20261231T170000Z&details=${details}&location=${location}`,
      '_blank'
    );
  };

  const whatsappMessage = encodeURIComponent(
    'Assalamu Alaikum! I will be attending the wedding ceremony of Mohammed Sinan & Aysha Zohara on Thursday, 31st December 2026 Insha Allah.'
  );

  return (
    <main className="fixed inset-0 w-screen h-screen min-h-[100dvh] max-h-[100dvh] overflow-hidden bg-[#0d0205] flex items-center justify-center select-none font-body">
      {/* Background Wedding Audio Track */}
      <audio
        ref={audioRef}
        src="/audio/luxe-video-audio.mp3"
        loop
        preload="auto"
      />

      {/* Desktop Ambient Blurred Backdrop */}
      <div
        className="hidden md:block absolute inset-0 bg-cover bg-center filter blur-3xl opacity-25 scale-110 pointer-events-none"
        style={{ backgroundImage: `url('/images/final_slide1_bismillah.jpg')` }}
      />
      <div className="hidden md:block absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#0d0205_90%)] pointer-events-none" />

      {/* ======================================================== */}
      {/* TOP FLOATING MUSIC OFF / MUSIC ON TOGGLE                 */}
      {/* (ONLY permitted control: No Pause, No Video Scrubbers)   */}
      {/* ======================================================== */}
      <div className="fixed top-3 right-3 sm:top-5 sm:right-6 z-50">
        <button
          onClick={toggleMusic}
          title={isMuted ? 'Turn Music On' : 'Turn Music Off'}
          className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-black/60 backdrop-blur-md border border-[#D4AF37]/60 shadow-[0_4px_20px_rgba(0,0,0,0.5)] text-white text-xs uppercase tracking-wider font-cinzel hover:bg-black/80 transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          {isMuted ? (
            <>
              <VolumeMute01Icon size={16} className="text-red-400" />
              <span className="text-[10px] sm:text-xs text-red-300 font-medium">Music Off</span>
            </>
          ) : (
            <>
              <VolumeHighIcon size={16} className="text-[#D4AF37] animate-pulse" />
              <span className="text-[10px] sm:text-xs text-[#D4AF37] font-medium">Music On</span>
            </>
          )}
        </button>
      </div>

      {/* ======================================================== */}
      {/* MAIN 9:16 FULL SCREEN WEDDING CARD CONTAINER             */}
      {/* ======================================================== */}
      <div
        onClick={handleCardClick}
        className="relative w-full h-full max-h-[100dvh] md:max-w-[430px] md:aspect-[9/16] md:h-[94vh] md:rounded-[36px] overflow-hidden shadow-[0_0_90px_rgba(212,175,55,0.4)] md:border-2 md:border-[#D4AF37]/60 bg-black flex flex-col justify-between"
      >
        {/* ======================================================== */}
        {/* PHASE 1: CLOSED ENVELOPE / GATE (Tap to Open)            */}
        {/* ======================================================== */}
        {phase === 'closed' && (
          <div
            onClick={handleOpenEnvelope}
            className="relative w-full h-full cursor-pointer flex flex-col justify-between p-6 select-none bg-cover bg-center transition-all duration-500 animate-[fadeIn_0.5s_ease-out]"
            style={{ backgroundImage: `url('/images/scene_closed_gate.jpg')` }}
          >
            {/* Top Invocation */}
            <div className="w-full text-center pt-8 z-10">
              <p className="font-arabic text-xl sm:text-2xl text-[#801B2E] drop-shadow-sm font-bold">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
              <p className="font-cinzel text-[11px] sm:text-xs uppercase tracking-[0.28em] text-[#801B2E] font-bold mt-1">
                Royal Wedding Invitation
              </p>
            </div>

            {/* Center Pulsing Golden Wax Seal */}
            <div className="z-20 flex flex-col items-center">
              <div className="relative group flex items-center justify-center">
                <div className="absolute -inset-4 rounded-full bg-[#D4AF37]/35 blur-md animate-ping" />
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#801B2E]/95 border-2 border-[#D4AF37] flex items-center justify-center shadow-2xl transition-transform transform group-hover:scale-110 active:scale-95">
                  <SparklesIcon size={34} className="text-[#D4AF37] animate-spin-slow" />
                </div>
              </div>

              {/* Pulsing Action Callout */}
              <div className="mt-5 px-6 py-2 rounded-full bg-[#801B2E]/95 border border-[#D4AF37]/80 shadow-[0_4px_20px_rgba(0,0,0,0.5)] text-[#FFFFF0] font-cinzel text-xs uppercase tracking-widest font-bold flex items-center gap-2 animate-bounce">
                <SparklesIcon size={14} className="text-[#D4AF37]" />
                <span>Tap To Open</span>
                <SparklesIcon size={14} className="text-[#D4AF37]" />
              </div>
            </div>

            {/* Bottom Couple Teaser */}
            <div className="w-full text-center pb-8 z-10">
              <p className="font-cinzel text-lg sm:text-xl font-bold tracking-wider text-[#801B2E] drop-shadow-sm">
                MOHAMMED SINAN
              </p>
              <p className="font-script text-2xl text-[#801B2E] -my-1 font-semibold">
                &amp;
              </p>
              <p className="font-cinzel text-lg sm:text-xl font-bold tracking-wider text-[#801B2E] drop-shadow-sm">
                AYSHA ZOHARA
              </p>
              <p className="font-elegant text-xs text-[#801B2E]/90 font-medium tracking-widest uppercase mt-2">
                Thursday, 31st December 2026 • Mangalore
              </p>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* PHASE 2: GATE OPENING ANIMATION (Clean Video Flow)       */}
        {/* ======================================================== */}
        {phase === 'opening' && (
          <div className="relative w-full h-full bg-black overflow-hidden flex items-center justify-center">
            <video
              ref={videoRef}
              src="/video/gate-opening.mp4"
              playsInline
              muted
              autoPlay
              onEnded={handleVideoEnded}
              className="w-full h-full object-cover object-center pointer-events-none"
            />
            {/* Quick entry button */}
            <button
              onClick={handleVideoEnded}
              className="absolute bottom-6 px-5 py-2 rounded-full bg-black/60 backdrop-blur-md border border-[#D4AF37]/60 text-[#D4AF37] text-xs font-cinzel uppercase tracking-widest hover:bg-black/80 transition-all cursor-pointer"
            >
              Enter Invitation
            </button>
          </div>
        )}

        {/* ======================================================== */}
        {/* PHASE 3: THE 5 MASTER SLIDES (100% Watermark Free)       */}
        {/* ======================================================== */}
        {phase === 'entered' && (
          <div className="relative w-full h-full overflow-hidden flex flex-col justify-between">
            {/* Master Slide Image Viewport */}
            <div className="absolute inset-0 w-full h-full">
              {slides.map((s, idx) => (
                <img
                  key={s.id}
                  src={s.image}
                  alt={s.title}
                  className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 pointer-events-none ${
                    idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                />
              ))}
            </div>

            {/* Top Story Progress Bars (5 segments with direct tap support) */}
            <div className="relative z-30 pt-3 px-3 flex gap-1.5 w-full">
              {slides.map((s, idx) => (
                <div
                  key={s.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentSlide(idx);
                    setSlideProgress(0);
                  }}
                  className="h-1 flex-1 bg-black/35 rounded-full overflow-hidden cursor-pointer"
                >
                  <div
                    className="h-full bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] transition-all duration-75"
                    style={{
                      width:
                        idx < currentSlide
                          ? '100%'
                          : idx === currentSlide
                          ? `${slideProgress}%`
                          : '0%',
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Bottom Floating Luxury Action Bar */}
            <div className="relative z-30 pb-3 px-3 space-y-2">
              {/* Luxury Action Pills Hub */}
              <div className="grid grid-cols-4 gap-1.5 bg-black/45 backdrop-blur-md p-1.5 rounded-2xl border border-[#D4AF37]/40 shadow-[0_4px_25px_rgba(0,0,0,0.6)]">
                {/* 1. Venue Directions */}
                <a
                  href={weddingDetails.event.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-[#801B2E] text-white hover:bg-[#631526] transition-all text-[9.5px] font-cinzel font-semibold active:scale-95"
                >
                  <Location01Icon size={14} className="text-[#D4AF37]" />
                  <span className="mt-0.5">Venue</span>
                </a>

                {/* 2. WhatsApp RSVP */}
                <a
                  href={`https://wa.me/${weddingDetails.contact.whatsappDefaultNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-[#134e3f] text-white hover:bg-[#0b3329] transition-all text-[9.5px] font-cinzel font-semibold active:scale-95"
                >
                  <WhatsappIcon size={14} className="text-emerald-300" />
                  <span className="mt-0.5">RSVP</span>
                </a>

                {/* 3. Add to Calendar */}
                <button
                  onClick={handleGoogleCalendar}
                  className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-white/90 text-[#801B2E] hover:bg-white transition-all text-[9.5px] font-cinzel font-semibold active:scale-95 cursor-pointer"
                >
                  <Calendar03Icon size={14} className="text-[#801B2E]" />
                  <span className="mt-0.5">Calendar</span>
                </button>

                {/* 4. Replay Invitation */}
                <button
                  onClick={handleReplay}
                  className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-[#D4AF37] text-[#801B2E] hover:bg-[#B8960C] hover:text-white transition-all text-[9.5px] font-cinzel font-bold active:scale-95 cursor-pointer"
                >
                  <RefreshIcon size={14} className="text-[#801B2E]" />
                  <span className="mt-0.5">Replay</span>
                </button>
              </div>

              {/* Bottom Subtle Navigation Indicators */}
              <div className="px-2 flex items-center justify-between text-[#801B2E]/80 text-[10px] font-cinzel font-semibold">
                <span
                  className="cursor-pointer hover:underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentSlide((p) => (p > 0 ? p - 1 : totalSlides - 1));
                    setSlideProgress(0);
                  }}
                >
                  ‹ Prev
                </span>
                <span className="tracking-widest uppercase text-[#801B2E] font-bold">
                  {currentSlide + 1} / {totalSlides}
                </span>
                <span
                  className="cursor-pointer hover:underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentSlide((p) => (p + 1) % totalSlides);
                    setSlideProgress(0);
                  }}
                >
                  Next ›
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default VideoFlowWeddingCard;
