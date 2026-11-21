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
  // Animation flow phases: 'closed' (envelope) -> 'opening' (video zoom) -> 'entered' (slides in arch)
  const [phase, setPhase] = useState<'closed' | 'opening' | 'entered'>('closed');
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [slideProgress, setSlideProgress] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const totalSlides = 3;
  const slideDurationMs = 7500; // 7.5 seconds per slide

  // 1. Trigger the envelope opening video flow on user tap
  const handleOpenEnvelope = () => {
    if (phase !== 'closed') return;

    // Trigger golden rose petal confetti
    try {
      confetti({
        particleCount: 75,
        spread: 80,
        origin: { y: 0.65 },
        colors: ['#D4AF37', '#801B2E', '#F3E5AB', '#FFFFFF', '#C5A059'],
      });
    } catch (e) {
      console.warn(e);
    }

    // Start playing background wedding audio
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(console.warn);
    }

    // Switch to 'opening' phase and start the video intro
    setPhase('opening');

    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Fallback transition if autoplay video is blocked
        setTimeout(() => {
          setPhase('entered');
        }, 2800);
      });
    }
  };

  // 2. Video ended handler (glides directly into the palace archway)
  const handleVideoEnded = () => {
    setPhase('entered');
    setCurrentSlide(0);
    setSlideProgress(0);
  };

  // 3. Replay flow from beginning
  const handleReplay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setPhase('closed');
    setCurrentSlide(0);
    setSlideProgress(0);
  };

  // 4. Music toggle (Only control permitted)
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

  // 5. Auto progress timer for slides once inside the palace archway
  useEffect(() => {
    if (phase !== 'entered') return;

    const interval = 50; // update progress every 50ms
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
  }, [phase, currentSlide]);

  // Touch / click slide navigation (left = prev, right = next)
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (phase !== 'entered') return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;

    // Don't change slide if user clicked on action buttons
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
      {/* Background Wedding Audio (Playing continuously) */}
      <audio
        ref={audioRef}
        src="/audio/wedding-audio.mp3"
        loop
        preload="auto"
      />

      {/* Desktop Luxury Ambient Blur Backdrop */}
      <div
        className="hidden md:block absolute inset-0 bg-cover bg-center filter blur-3xl opacity-25 scale-110 pointer-events-none"
        style={{ backgroundImage: `url('/images/vframe_06.jpg')` }}
      />
      <div className="hidden md:block absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#0d0205_90%)] pointer-events-none" />

      {/* ======================================================== */}
      {/* TOP FLOATING MUSIC OFF / MUSIC ON TOGGLE                 */}
      {/* (The ONLY button control requested: No Pause, No Player) */}
      {/* ======================================================== */}
      <div className="fixed top-3 right-3 sm:top-5 sm:right-6 z-50">
        <button
          onClick={toggleMusic}
          title={isMuted ? 'Turn Music On' : 'Turn Music Off'}
          className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-black/60 backdrop-blur-md border border-[#D4AF37]/50 shadow-[0_4px_20px_rgba(0,0,0,0.5)] text-white text-xs uppercase tracking-wider font-cinzel hover:bg-black/80 transition-all hover:scale-105 active:scale-95"
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
        className="relative w-full h-full max-h-[100dvh] md:max-w-[430px] md:aspect-[9/16] md:h-[94vh] md:rounded-[36px] overflow-hidden shadow-[0_0_90px_rgba(212,175,55,0.35)] md:border-2 md:border-[#D4AF37]/50 bg-black flex flex-col justify-between"
      >
        {/* ======================================================== */}
        {/* 1. CLOSED ENVELOPE (Tap to Open)                         */}
        {/* ======================================================== */}
        {phase === 'closed' && (
          <div
            onClick={handleOpenEnvelope}
            className="relative w-full h-full cursor-pointer flex flex-col justify-between p-6 select-none bg-cover bg-center transition-all duration-500 animate-[fadeIn_0.5s_ease-out]"
            style={{ backgroundImage: `url('/images/vframe_01.jpg')` }}
          >
            {/* Top Callout */}
            <div className="w-full text-center pt-8 z-10">
              <p className="font-arabic text-xl sm:text-2xl text-[#801B2E] drop-shadow-sm font-bold">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
              <p className="font-cinzel text-[11px] sm:text-xs uppercase tracking-[0.28em] text-[#801B2E] font-bold mt-1">
                Royal Wedding Invitation
              </p>
            </div>

            {/* Center Pulsing Wax Seal Prompt */}
            <div className="z-20 flex flex-col items-center">
              <div className="relative group flex items-center justify-center">
                {/* Golden pulsing aura */}
                <div className="absolute -inset-3 rounded-full bg-[#D4AF37]/30 blur-md animate-ping" />
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#801B2E]/90 border-2 border-[#D4AF37] flex items-center justify-center shadow-2xl transition-transform transform group-hover:scale-110 active:scale-95">
                  <SparklesIcon size={32} className="text-[#D4AF37] animate-spin-slow" />
                </div>
              </div>

              {/* Pulsing Button Badge */}
              <div className="mt-5 px-6 py-2 rounded-full bg-[#801B2E]/95 border border-[#D4AF37]/60 shadow-[0_4px_20px_rgba(0,0,0,0.4)] text-[#FFFFF0] font-cinzel text-xs uppercase tracking-widest font-semibold flex items-center gap-2 animate-bounce">
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
        {/* 2. OPENING ANIMATION SEQUENCE (Exact Video Flow)         */}
        {/* ======================================================== */}
        {phase === 'opening' && (
          <div className="relative w-full h-full bg-black overflow-hidden flex items-center justify-center">
            <video
              ref={videoRef}
              src="/video/intro-opening.mp4"
              playsInline
              muted
              autoPlay
              onEnded={handleVideoEnded}
              className="w-full h-full object-cover object-center pointer-events-none"
            />
            {/* Fallback button if video finishes or user wants to skip immediately */}
            <button
              onClick={handleVideoEnded}
              className="absolute bottom-6 px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-[#D4AF37]/40 text-[#D4AF37] text-[11px] font-cinzel uppercase tracking-widest"
            >
              Enter Invitation
            </button>
          </div>
        )}

        {/* ======================================================== */}
        {/* 3. INSIDE THE ROYAL ARCHWAY (Clean Plate + User Details)  */}
        {/* ======================================================== */}
        {phase === 'entered' && (
          <div className="relative w-full h-full overflow-hidden flex flex-col justify-between">
            {/* The Authentic Palace Courtyard Arch Backdrop */}
            <img
              src="/images/vframe_06.jpg"
              alt="Palace Courtyard Archway"
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
            />

            {/* Top Story Progress Bars (Like Instagram Stories / WhatsApp Status) */}
            <div className="relative z-30 pt-3 px-3 flex gap-1.5 w-full">
              {Array.from({ length: totalSlides }).map((_, idx) => (
                <div
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentSlide(idx);
                    setSlideProgress(0);
                  }}
                  className="h-1 flex-1 bg-black/30 rounded-full overflow-hidden cursor-pointer"
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

            {/* Central Illuminated Parchment Arch Content Container */}
            <div className="relative z-20 flex-1 flex flex-col justify-center items-center px-4 pt-16 pb-36 text-center">
              
              {/* ================================================== */}
              {/* SLIDE 0: WEDDING CEREMONY ANNOUNCEMENT             */}
              {/* ================================================== */}
              {currentSlide === 0 && (
                <div className="w-full max-w-[340px] space-y-2 sm:space-y-2.5 animate-[fadeIn_0.5s_ease-out]">
                  {/* Bismillah Calligraphy */}
                  <div className="space-y-0.5">
                    <p className="font-arabic text-xl sm:text-2xl text-[#801B2E] font-bold">
                      بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                    </p>
                    <p className="font-cinzel text-[8.5px] sm:text-[9.5px] uppercase tracking-[0.2em] text-[#801B2E]/90 font-semibold">
                      IN THE NAME OF ALLAH THE MOST BENEFICENT &amp; MOST MERCIFUL
                    </p>
                  </div>

                  {/* Solicit Text */}
                  <div className="pt-1">
                    <p className="font-cinzel text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.16em] text-[#4A1521] font-semibold leading-relaxed">
                      WE REQUEST THE HONOUR OF YOUR PRESENCE AT THE
                    </p>
                    <p className="font-script text-3xl sm:text-4xl text-[#801B2E] my-0.5 drop-shadow-sm">
                      Wedding Ceremony
                    </p>
                    <p className="font-cinzel text-[9px] uppercase tracking-[0.18em] text-[#4A1521] font-semibold">
                      OF THEIR BELOVED SON
                    </p>
                  </div>

                  {/* Groom Name (Grand) */}
                  <div className="py-1">
                    <h1 className="font-cinzel text-xl sm:text-2xl font-black uppercase tracking-[0.08em] text-[#801B2E] drop-shadow-sm leading-tight">
                      MOHAMMED SINAN
                    </h1>
                    <p className="font-elegant text-[10px] sm:text-[11px] text-[#4A1521] font-medium italic mt-0.5 leading-snug">
                      (Grand S/o. Marhoom P. Hammabba Beary &amp; Marhoom Mohammad Abdullah Sheikh)
                    </p>
                  </div>

                  {/* WITH separator */}
                  <div className="flex items-center justify-center gap-2 py-0.5">
                    <span className="w-6 h-[1px] bg-[#D4AF37]" />
                    <span className="font-script text-2xl text-[#801B2E] font-bold">with</span>
                    <span className="w-6 h-[1px] bg-[#D4AF37]" />
                  </div>

                  {/* Bride Name (Grand) */}
                  <div className="py-1">
                    <h2 className="font-cinzel text-xl sm:text-2xl font-black uppercase tracking-[0.08em] text-[#801B2E] drop-shadow-sm leading-tight">
                      AYSHA ZOHARA
                    </h2>
                    <p className="font-elegant text-[10px] sm:text-[11px] text-[#4A1521] font-medium italic mt-0.5">
                      (D/o. Abdul Lateef Ibrahim)
                    </p>
                  </div>

                  {/* Parents Host Callout */}
                  <div className="pt-1.5 border-t border-[#D4AF37]/50 mt-1">
                    <p className="font-cinzel text-[11px] sm:text-xs font-bold text-[#801B2E] tracking-wider">
                      Mrs. &amp; Mr. Mohammed Hussain Beary
                    </p>
                    <p className="font-elegant text-[10px] text-[#4A1521] font-semibold tracking-widest uppercase mt-0.5">
                      Insha Allah
                    </p>
                  </div>
                </div>
              )}

              {/* ================================================== */}
              {/* SLIDE 1: NIKAH, DATE, TIME & VENUE                 */}
              {/* ================================================== */}
              {currentSlide === 1 && (
                <div className="w-full max-w-[340px] space-y-2.5 sm:space-y-3 animate-[fadeIn_0.5s_ease-out]">
                  {/* Year & Date Badge */}
                  <div className="inline-block px-4 py-1 rounded-full bg-[#801B2E]/10 border border-[#D4AF37]/60">
                    <p className="font-cinzel text-xs font-bold text-[#801B2E] tracking-[0.25em]">
                      2026 • INSHA ALLAH
                    </p>
                  </div>

                  {/* Nikah Title */}
                  <div>
                    <h3 className="font-cinzel text-base sm:text-lg font-bold tracking-[0.3em] text-[#801B2E]">
                      N I K A H
                    </h3>
                    <p className="font-cinzel text-sm sm:text-base font-black text-[#801B2E] uppercase tracking-wider mt-1">
                      THURSDAY, 31ST DECEMBER 2026
                    </p>
                    <p className="font-elegant text-xs text-[#4A1521] font-bold italic">
                      (21st Rajab, 1448 H.)
                    </p>
                  </div>

                  {/* Time & Dinner */}
                  <div className="py-1 px-4 rounded-xl bg-white/60 backdrop-blur-sm border border-[#D4AF37]/40">
                    <p className="font-cinzel text-xs sm:text-sm font-bold text-[#801B2E] tracking-wide">
                      AFTER NAMAZ MAGHRIB
                    </p>
                    <p className="font-elegant text-xs sm:text-sm text-[#4A1521] font-semibold mt-0.5">
                      Followed by Dinner till 10:00 p.m.
                    </p>
                  </div>

                  {/* Venue Box */}
                  <div className="space-y-1">
                    <p className="font-cinzel text-[10px] uppercase tracking-[0.25em] text-[#4A1521] font-semibold">
                      VENUE
                    </p>
                    <h4 className="font-cinzel text-base sm:text-lg font-black uppercase text-[#801B2E] tracking-wider">
                      UNITY HALL
                    </h4>
                    <p className="font-elegant text-xs sm:text-sm text-[#4A1521] font-bold">
                      Thokkottu, Mangalore
                    </p>
                  </div>

                  {/* RSVP & Plaque */}
                  <div className="pt-2 border-t border-[#D4AF37]/50">
                    <p className="font-cinzel text-[10px] font-bold text-[#801B2E] tracking-widest uppercase">
                      R.S.V.P: RELATIVES &amp; FRIENDS
                    </p>
                    <p className="font-cinzel text-[9.5px] font-extrabold text-[#4A1521] tracking-wider mt-1 px-3 py-1 rounded-md bg-[#D4AF37]/20 border border-[#D4AF37]/40 inline-block">
                      YOUR PRESENCE &amp; DUA IS OUR GREATEST GIFT
                    </p>
                  </div>
                </div>
              )}

              {/* ================================================== */}
              {/* SLIDE 2: DUA, POETRY & ACTIONS                     */}
              {/* ================================================== */}
              {currentSlide === 2 && (
                <div className="w-full max-w-[340px] space-y-2.5 sm:space-y-3 animate-[fadeIn_0.5s_ease-out]">
                  {/* Dua */}
                  <div className="p-2.5 rounded-xl bg-white/70 backdrop-blur-sm border border-[#D4AF37]/50 shadow-sm">
                    <p className="font-elegant text-xs sm:text-sm text-[#801B2E] font-semibold italic leading-relaxed">
                      "Oh Allah guide this marriage to the best of understanding, happiness, prosperity &amp; success - Ameen"
                    </p>
                  </div>

                  {/* Left Flap Poetry (From original physical card) */}
                  <div className="space-y-1">
                    <p className="font-script text-2xl text-[#801B2E] leading-tight">
                      A Day of Togetherness
                    </p>
                    <p className="font-elegant text-xs text-[#4A1521] font-semibold italic leading-relaxed">
                      A moment of joy and emotions, a dream of every parent today a reality of us.
                    </p>
                  </div>

                  {/* Residence */}
                  <div className="text-[10px] text-[#4A1521] font-medium leading-tight">
                    <p className="font-semibold text-[#801B2E]">Sugandh Palace, Nityanand Nagar,</p>
                    <p>Ghatkopar (W), Mumbai-400 086.</p>
                  </div>

                  {/* Action Buttons Hub (hugeicons-react) */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    {/* Google Maps Direction */}
                    <a
                      href={weddingDetails.event.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-[#801B2E] text-white shadow-md hover:bg-[#631526] transition-all text-[11px] font-cinzel font-semibold active:scale-95"
                    >
                      <Location01Icon size={14} className="text-[#D4AF37]" />
                      <span>Venue Map</span>
                    </a>

                    {/* WhatsApp RSVP */}
                    <a
                      href={`https://wa.me/${weddingDetails.contact.whatsappDefaultNumber}?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-[#134e3f] text-white shadow-md hover:bg-[#0b3329] transition-all text-[11px] font-cinzel font-semibold active:scale-95"
                    >
                      <WhatsappIcon size={14} className="text-emerald-300" />
                      <span>RSVP Dua</span>
                    </a>

                    {/* Add to Google Calendar */}
                    <button
                      onClick={handleGoogleCalendar}
                      className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-white/80 backdrop-blur-sm border border-[#D4AF37] text-[#801B2E] shadow-sm hover:bg-white transition-all text-[11px] font-cinzel font-semibold active:scale-95"
                    >
                      <Calendar03Icon size={14} className="text-[#801B2E]" />
                      <span>Add Date</span>
                    </button>

                    {/* Replay Flow */}
                    <button
                      onClick={handleReplay}
                      className="flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl bg-[#D4AF37] text-[#801B2E] shadow-sm hover:bg-[#B8960C] hover:text-white transition-all text-[11px] font-cinzel font-bold active:scale-95"
                    >
                      <RefreshIcon size={14} className="text-[#801B2E]" />
                      <span>Replay</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Subtle Navigation Cue */}
            <div className="relative z-30 pb-3 px-4 flex items-center justify-between text-[#801B2E]/60 text-[10px] font-cinzel">
              <span className="cursor-pointer" onClick={(e) => { e.stopPropagation(); setCurrentSlide((p) => (p > 0 ? p - 1 : totalSlides - 1)); setSlideProgress(0); }}>
                ‹ Tap Left
              </span>
              <span className="tracking-widest uppercase font-bold text-[#801B2E]/80">
                {currentSlide + 1} / {totalSlides}
              </span>
              <span className="cursor-pointer" onClick={(e) => { e.stopPropagation(); setCurrentSlide((p) => (p + 1) % totalSlides); setSlideProgress(0); }}>
                Tap Right ›
              </span>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default VideoFlowWeddingCard;
