import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { WeddingInfo } from '../data/weddingDetails';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Sparkles,
  MapPin,
  Calendar as CalendarIcon,
  MessageCircle,
  Share2,
  Heart,
  Eye,
  Video,
} from 'lucide-react';

interface RoyalVideoFlowCardProps {
  wedding: WeddingInfo;
  guestName?: string;
  onOpenVideoModal: () => void;
  onOpenCardModal: () => void;
}

export const RoyalVideoFlowCard: React.FC<RoyalVideoFlowCardProps> = ({
  wedding,
  guestName = '',
  onOpenVideoModal,
  onOpenCardModal,
}) => {
  // Envelope states: 'closed' | 'opening' | 'open' | 'entered'
  const [envelopeState, setEnvelopeState] = useState<'closed' | 'opening' | 'open' | 'entered'>('closed');
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isPlayingAuto, setIsPlayingAuto] = useState<boolean>(true);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);
  const [slideProgress, setSlideProgress] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const totalSlides = 4;
  const slideDurationMs = 7500; // 7.5 seconds per slide

  // Handle opening the envelope with animation sequence
  const handleOpenEnvelope = () => {
    if (envelopeState !== 'closed') return;

    // Trigger confetti
    try {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#801B2E', '#F3E5AB', '#FFFFF0'],
      });
    } catch (e) {
      console.warn(e);
    }

    // Step 1: Flap opening
    setEnvelopeState('opening');

    // Start audio
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().then(() => {
        setIsAudioPlaying(true);
      }).catch(console.warn);
    }

    // Step 2: Flap fully open
    setTimeout(() => {
      setEnvelopeState('open');
    }, 450);

    // Step 3: Zoom into the palace archway
    setTimeout(() => {
      setEnvelopeState('entered');
      setCurrentSlide(0);
      setSlideProgress(0);
    }, 1200);
  };

  const handleRestart = () => {
    setEnvelopeState('closed');
    setCurrentSlide(0);
    setSlideProgress(0);
  };

  // Toggle Audio
  const toggleAudio = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!audioRef.current) return;
    if (isAudioPlaying) {
      audioRef.current.pause();
      setIsAudioPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsAudioPlaying(true)).catch(console.warn);
    }
  };

  const toggleMute = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!audioRef.current) return;
    const nextMuted = !isAudioMuted;
    audioRef.current.muted = nextMuted;
    setIsAudioMuted(nextMuted);
  };

  // Story Auto-progress Timer
  useEffect(() => {
    if (envelopeState !== 'entered' || !isPlayingAuto) return;

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
  }, [envelopeState, isPlayingAuto, currentSlide]);

  const goToPrevSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
    setSlideProgress(0);
  };

  const goToNextSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setSlideProgress(0);
  };

  // Google Calendar handler
  const handleCalendar = () => {
    const startDate = "20261231T130000Z";
    const endDate = "20261231T170000Z";
    const title = encodeURIComponent(`Wedding Ceremony - ${wedding.groom.name} & ${wedding.bride.name}`);
    const details = encodeURIComponent(
      `In the Name of Allah, Mrs. & Mr. Mohammed Hussain Beary cordially invite you to the wedding ceremony of their son ${wedding.groom.name} with ${wedding.bride.name}.\n\nNikah: After Namaz Maghrib\nDinner: Followed by Dinner till 10:00 PM\nVenue: ${wedding.event.venueName}, ${wedding.event.venueAddress}`
    );
    const location = encodeURIComponent(`${wedding.event.venueName}, ${wedding.event.venueAddress}`);
    window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&location=${location}`, '_blank');
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center p-2 sm:p-4 bg-gradient-to-b from-[#2B060D] via-[#1A0307] to-[#120104] text-cream select-none overflow-x-hidden">
      {/* Background Audio */}
      <audio
        ref={audioRef}
        src="/audio/wedding-audio.mp3"
        loop
        preload="auto"
        onPlay={() => setIsAudioPlaying(true)}
        onPause={() => setIsAudioPlaying(false)}
      />

      {/* Top Floating Control Bar */}
      <header className="fixed top-3 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-xl border border-champagne-gold/30 shadow-2xl max-w-sm w-[92%] sm:w-auto">
        <div className="flex items-center gap-2">
          <button
            onClick={toggleAudio}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-champagne-gold/20 hover:bg-champagne-gold/30 text-champagne-gold text-xs transition-colors"
          >
            {isAudioPlaying ? (
              <span className="flex items-end gap-0.5 h-3">
                <span className="w-0.5 bg-champagne-gold h-2 animate-[pulse_0.6s_infinite]" />
                <span className="w-0.5 bg-champagne-gold h-3 animate-[pulse_0.8s_infinite_0.2s]" />
                <span className="w-0.5 bg-champagne-gold h-1.5 animate-[pulse_0.7s_infinite_0.4s]" />
              </span>
            ) : (
              <Play className="w-3 h-3 fill-champagne-gold" />
            )}
            <span className="text-[11px] font-elegant uppercase tracking-wider">
              {isAudioPlaying ? 'Playing' : 'Audio'}
            </span>
          </button>

          <button
            onClick={toggleMute}
            className="p-1.5 rounded-full hover:bg-white/10 text-champagne-gold/80 transition-colors"
          >
            {isAudioMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>

        <div className="flex items-center gap-2">
          {envelopeState === 'entered' && (
            <button
              onClick={() => setIsPlayingAuto(!isPlayingAuto)}
              title={isPlayingAuto ? 'Pause Auto-slide' : 'Play Auto-slide'}
              className="p-1.5 rounded-full hover:bg-white/10 text-champagne-gold/80 transition-colors"
            >
              {isPlayingAuto ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
          )}

          <button
            onClick={handleRestart}
            title="Replay Envelope"
            className="p-1.5 rounded-full hover:bg-white/10 text-champagne-gold/80 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Main 9:16 Royal Story Card Viewport */}
      <div className="relative w-full max-w-[430px] aspect-[9/16] max-h-[92vh] sm:rounded-[36px] overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.25)] border sm:border-2 border-champagne-gold/40 my-auto bg-black transition-all">
        
        {/* ======================================================== */}
        {/* PHASE 1: ENVELOPE OPENING ANIMATION SEQUENCE */}
        {/* ======================================================== */}
        {envelopeState !== 'entered' ? (
          <div
            onClick={handleOpenEnvelope}
            className="relative w-full h-full cursor-pointer flex flex-col items-center justify-between p-6 select-none bg-cover bg-center transition-all duration-700"
            style={{
              backgroundImage:
                envelopeState === 'closed'
                  ? `url('/images/envelope-closed.png')`
                  : envelopeState === 'opening'
                  ? `url('/images/envelope-opening.png')`
                  : `url('/images/envelope-open.png')`,
            }}
          >
            {/* Top Prompt / Guest Name */}
            <div className="w-full text-center pt-8 z-10 animate-[fadeIn_1s_ease-out]">
              <p className="font-arabic text-xl sm:text-2xl text-champagne-gold drop-shadow-md">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
              {guestName ? (
                <div className="mt-3 inline-block px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-champagne-gold/40">
                  <p className="font-elegant text-xs uppercase tracking-widest text-champagne-gold">
                    Honored Guest: {guestName}
                  </p>
                </div>
              ) : (
                <p className="font-elegant text-xs uppercase tracking-[0.25em] text-maroon-900 font-bold mt-2">
                  Royal Wedding Invitation
                </p>
              )}
            </div>

            {/* Center Pulsing Wax Seal Prompt */}
            {envelopeState === 'closed' && (
              <div className="z-10 flex flex-col items-center animate-[bounce_2s_infinite]">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full wax-seal border-2 border-champagne-gold/60 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                  <Sparkles className="w-7 h-7 text-champagne-gold animate-spin-slow" />
                </div>
                <div className="mt-4 px-6 py-2 rounded-full bg-maroon-900/90 border border-champagne-gold/50 shadow-lg text-cream font-elegant text-xs uppercase tracking-widest font-semibold flex items-center gap-2">
                  <Heart className="w-3.5 h-3.5 text-champagne-gold fill-champagne-gold" />
                  <span>Tap To Open Invitation</span>
                </div>
              </div>
            )}

            {/* Bottom Details Teaser */}
            <div className="w-full text-center pb-8 z-10">
              <p className="font-calligraphy text-2xl sm:text-3xl text-maroon-950 font-bold drop-shadow">
                {wedding.groom.name} & {wedding.bride.name}
              </p>
              <p className="font-elegant text-xs text-maroon-900/80 font-semibold tracking-wider mt-1">
                {wedding.event.dateFormatted} • Mangalore
              </p>
            </div>
          </div>
        ) : (
          /* ======================================================== */
          /* PHASE 2: ROYAL PALACE ARCHWAY STORY FLOW */
          /* ======================================================== */
          <div className="relative w-full h-full flex flex-col justify-between overflow-hidden">
            {/* The Royal Arch Clean Plate Backdrop */}
            <img
              src="/images/arch-clean.png"
              alt="Royal Palace Courtyard Arch"
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
            />

            {/* Story Progress Indicators */}
            <div className="relative z-30 pt-3 px-3 flex gap-1.5 w-full">
              {Array.from({ length: totalSlides }).map((_, idx) => (
                <div
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentSlide(idx);
                    setSlideProgress(0);
                  }}
                  className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden cursor-pointer"
                >
                  <div
                    className="h-full bg-champagne-gold transition-all duration-75"
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

            {/* Left and Right Tap Targets for Navigation */}
            <div
              onClick={goToPrevSlide}
              className="absolute left-0 top-16 bottom-24 w-1/4 z-20 cursor-pointer"
              title="Previous Slide"
            />
            <div
              onClick={goToNextSlide}
              className="absolute right-0 top-16 bottom-24 w-1/4 z-20 cursor-pointer"
              title="Next Slide"
            />

            {/* Center Archway Content Area */}
            <div className="relative z-10 flex-1 flex flex-col justify-center items-center text-center px-6 pt-10 pb-36">
              
              {/* ---------------------------------------------------- */}
              {/* SLIDE 0: INVITATION ANNOUNCEMENT & COUPLE */}
              {/* ---------------------------------------------------- */}
              {currentSlide === 0 && (
                <div className="w-full max-w-[340px] animate-[fadeIn_0.5s_ease-out] flex flex-col items-center">
                  {/* Bismillah Calligraphy */}
                  <p className="font-arabic text-2xl sm:text-3xl text-champagne-gold drop-shadow-sm mb-2">
                    {wedding.duaText.bismillah}
                  </p>

                  <p className="font-elegant text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#9A6A32] font-semibold mb-1">
                    WE REQUEST THE HONOUR OF YOUR PRESENCE AT THE
                  </p>

                  <p className="font-calligraphy text-3xl sm:text-4xl text-[#9E2A43] my-1 leading-tight drop-shadow-sm">
                    Wedding Ceremony
                  </p>

                  <p className="font-elegant text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#9A6A32] font-semibold mb-3">
                    OF THEIR BELOVED SON
                  </p>

                  {/* Groom */}
                  <div className="my-1">
                    <h2 className="font-elegant text-2xl sm:text-3xl font-bold tracking-wide text-[#BC3248] uppercase drop-shadow-sm">
                      {wedding.groom.name}
                    </h2>
                    <p className="font-elegant text-[10px] sm:text-[11px] text-[#8C6B45] italic mt-0.5 max-w-[280px]">
                      ({wedding.groom.grandparents})
                    </p>
                  </div>

                  {/* Flourish & WITH */}
                  <div className="flex items-center justify-center gap-3 my-1.5">
                    <div className="w-10 h-px bg-[#D4AF37]/50" />
                    <span className="font-calligraphy text-2xl text-[#9A6A32]">&</span>
                    <div className="w-10 h-px bg-[#D4AF37]/50" />
                  </div>

                  {/* Bride */}
                  <div className="my-1">
                    <h2 className="font-elegant text-2xl sm:text-3xl font-bold tracking-wide text-[#BC3248] uppercase drop-shadow-sm">
                      {wedding.bride.name}
                    </h2>
                    <p className="font-elegant text-[10px] sm:text-[11px] text-[#8C6B45] italic mt-0.5">
                      ({wedding.bride.father})
                    </p>
                  </div>

                  {/* Host Parents */}
                  <div className="mt-3 pt-2 border-t border-[#D4AF37]/30">
                    <p className="font-elegant text-xs text-[#521721] font-semibold">
                      {wedding.groom.parents}
                    </p>
                  </div>
                </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* SLIDE 1: DATE, VENUE & PROGRAM */}
              {/* ---------------------------------------------------- */}
              {currentSlide === 1 && (
                <div className="w-full max-w-[340px] animate-[fadeIn_0.5s_ease-out] flex flex-col items-center">
                  <p className="font-elegant text-xs tracking-widest uppercase text-[#9A6A32] font-bold">
                    INSHA ALLAH
                  </p>

                  {/* Year & Date Box (Stylized like the video) */}
                  <div className="my-3 flex flex-col items-center">
                    <span className="font-elegant text-sm text-[#9A6A32] font-semibold">
                      2026
                    </span>
                    
                    <div className="flex items-center justify-center gap-3 my-1">
                      <span className="font-elegant text-xs sm:text-sm font-semibold tracking-widest text-[#521721] uppercase border-b border-[#D4AF37]/40 pb-0.5">
                        DECEMBER
                      </span>
                      <span className="font-elegant text-4xl sm:text-5xl font-bold text-[#BC3248] px-2">
                        31
                      </span>
                      <span className="font-elegant text-xs sm:text-sm font-semibold tracking-widest text-[#521721] uppercase border-b border-[#D4AF37]/40 pb-0.5">
                        THURSDAY
                      </span>
                    </div>

                    <p className="font-elegant text-xs text-[#9A6A32] italic mt-0.5">
                      (21st Rajab, 1448 H.)
                    </p>
                  </div>

                  {/* Ceremony Time */}
                  <div className="my-2 py-1 px-4 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30">
                    <p className="font-elegant text-xs font-bold uppercase tracking-wider text-[#521721]">
                      AFTER NAMAZ MAGHRIB
                    </p>
                    <p className="font-elegant text-[10px] text-[#8C6B45]">
                      Followed by Dinner till 10:00 PM
                    </p>
                  </div>

                  {/* Venue Details */}
                  <div className="mt-3">
                    <p className="font-elegant text-[10px] uppercase tracking-widest text-[#9A6A32] font-bold">
                      VENUE:
                    </p>
                    <h3 className="font-elegant text-xl sm:text-2xl font-bold text-[#521721] uppercase">
                      {wedding.event.venueName}
                    </h3>
                    <p className="font-elegant text-xs text-[#8C6B45] font-medium">
                      {wedding.event.venueAddress}
                    </p>
                  </div>

                  {/* RSVP compliments note */}
                  <div className="mt-4 pt-2 border-t border-[#D4AF37]/30">
                    <p className="font-elegant text-[10px] uppercase tracking-wider text-[#9A6A32] font-bold">
                      R.S.V.P: RELATIVES & FRIENDS
                    </p>
                  </div>
                </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* SLIDE 2: SACRED DUA & PHYSICAL CARD VERSES */}
              {/* ---------------------------------------------------- */}
              {currentSlide === 2 && (
                <div className="w-full max-w-[340px] animate-[fadeIn_0.5s_ease-out] flex flex-col items-center">
                  <p className="font-arabic text-xl text-champagne-gold mb-1">
                    دُعَاءُ وَ تَبْرِيكَات
                  </p>

                  <p className="font-arabic text-lg sm:text-xl text-[#521721] leading-relaxed mb-3" dir="rtl">
                    {wedding.duaText.sunnahDuaArabic}
                  </p>

                  <p className="font-elegant text-xs text-[#8C6B45] italic mb-4 max-w-[280px]">
                    "{wedding.duaText.sunnahDuaTranslation}"
                  </p>

                  <div className="w-20 h-px bg-[#D4AF37]/40 my-2" />

                  {/* Poetic verse from card */}
                  <p className="font-calligraphy text-2xl text-[#9E2A43] mb-1">
                    A Day of Togetherness,
                  </p>
                  <p className="font-elegant text-xs text-[#521721] italic leading-relaxed max-w-[280px] mb-3">
                    "A moment of joy and emotions, a dream of every parent today a reality of us."
                  </p>

                  {/* Gift Note */}
                  <div className="p-2 rounded-xl bg-[#D4AF37]/20 border border-[#D4AF37]/40 mb-2">
                    <p className="font-elegant text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#521721]">
                      YOUR PRESENCE & DUA IS OUR GREATEST GIFT
                    </p>
                  </div>

                  <p className="font-elegant text-[10px] text-[#8C6B45]">
                    Resi: {wedding.residence.line1} {wedding.residence.cityPincode}
                  </p>
                </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* SLIDE 3: INTERACTIVE ACTION HUB (MAPS, RSVP, CALENDAR) */}
              {/* ---------------------------------------------------- */}
              {currentSlide === 3 && (
                <div className="w-full max-w-[340px] animate-[fadeIn_0.5s_ease-out] flex flex-col items-center">
                  <p className="font-elegant text-xs uppercase tracking-widest text-[#9A6A32] font-bold mb-1">
                    CELEBRATE WITH US
                  </p>
                  <h3 className="font-calligraphy text-3xl text-[#521721] mb-4">
                    Join The Celebration
                  </h3>

                  {/* Action Buttons Grid */}
                  <div className="w-full space-y-2.5">
                    {/* Google Maps Directions */}
                    <a
                      href={wedding.event.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#801B2E] text-cream font-elegant text-xs uppercase tracking-widest font-bold shadow-md hover:bg-[#631526] transition-colors"
                    >
                      <MapPin className="w-4 h-4 text-champagne-gold" />
                      <span>Directions (Google Maps)</span>
                    </a>

                    {/* WhatsApp RSVP */}
                    <a
                      href={`https://wa.me/${wedding.contact.whatsappDefaultNumber}?text=${encodeURIComponent(
                        `Assalamu Alaikum! I will be attending the wedding of Mohammed Sinan & Aysha Zohara on 31st Dec 2026 Insha Allah.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-700 text-white font-elegant text-xs uppercase tracking-widest font-bold shadow-md hover:bg-emerald-800 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-200" />
                      <span>Confirm RSVP via WhatsApp</span>
                    </a>

                    {/* Google Calendar Add */}
                    <button
                      onClick={handleCalendar}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/90 text-[#521721] border border-[#D4AF37]/50 font-elegant text-xs uppercase tracking-widest font-bold shadow-sm hover:bg-white transition-colors"
                    >
                      <CalendarIcon className="w-4 h-4 text-champagne-gold" />
                      <span>Add to Google Calendar</span>
                    </button>
                  </div>

                  {/* Modals trigger */}
                  <div className="flex items-center gap-2 mt-4">
                    <button
                      onClick={onOpenVideoModal}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-[#D4AF37]/40 text-[11px] font-elegant text-champagne-gold hover:bg-black/60 transition-colors"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Watch Reel</span>
                    </button>
                    <button
                      onClick={onOpenCardModal}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-[#D4AF37]/40 text-[11px] font-elegant text-champagne-gold hover:bg-black/60 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Printed Card</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Controls / Slide Navigation Arrows */}
            <div className="relative z-30 pb-4 px-6 flex items-center justify-between text-champagne-gold">
              <button
                onClick={goToPrevSlide}
                className="p-2 rounded-full bg-black/50 backdrop-blur-md border border-champagne-gold/30 hover:bg-black/70 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-1.5 text-xs font-elegant uppercase tracking-widest bg-black/50 px-3 py-1 rounded-full border border-champagne-gold/30">
                <span>{currentSlide + 1}</span>
                <span className="text-white/40">/</span>
                <span className="text-white/70">{totalSlides}</span>
              </div>

              <button
                onClick={goToNextSlide}
                className="p-2 rounded-full bg-black/50 backdrop-blur-md border border-champagne-gold/30 hover:bg-black/70 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
