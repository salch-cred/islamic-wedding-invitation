import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  VolumeHighIcon,
  VolumeMute01Icon,
  Location01Icon,
  WhatsappIcon,
  Calendar03Icon,
  RefreshIcon,
  SparklesIcon,
} from 'hugeicons-react';
import { weddingDetails } from '../data/weddingDetails';

export const VideoFlowWeddingCard: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // 1. Natural opening trigger: user taps the closed card to break wax seal & open doors
  const handleOpenInvitation = () => {
    if (isOpen) return;

    // Trigger golden and crimson rose petal confetti
    try {
      confetti({
        particleCount: 85,
        spread: 90,
        origin: { y: 0.52 },
        colors: ['#D4AF37', '#801B2E', '#F3E5AB', '#FFFFFF', '#C5A059'],
      });
    } catch (e) {
      console.warn(e);
    }

    setIsOpen(true);

    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = false;
      videoRef.current.play().catch((err) => {
        console.warn('Playback error:', err);
        // If unmuted autoplay is blocked by browser policy, play muted and update UI
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play().catch(console.warn);
        }
      });
    }
  };

  // 2. Replay the entire video invitation from the opening gate
  const handleReplay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(console.warn);
    }
  };

  // 3. Audio toggle (Music On / Music Off)
  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (isMuted) {
      videoRef.current.muted = false;
      setIsMuted(false);
    } else {
      videoRef.current.muted = true;
      setIsMuted(true);
    }
  };

  // 4. Google Calendar event
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
    <main className="fixed inset-0 w-screen h-screen min-h-[100dvh] max-h-[100dvh] overflow-hidden bg-[radial-gradient(ellipse_at_center,_#200810_0%,_#100206_60%,_#050002_100%)] flex flex-col items-center justify-center select-none font-body p-2 sm:p-4">
      {/* Desktop Ambient Blurred Backdrop */}
      <div
        className="hidden md:block absolute inset-0 bg-cover bg-center filter blur-3xl opacity-20 scale-110 pointer-events-none"
        style={{ backgroundImage: `url('/images/MASTER_TWIN_PILLARS_PERFECT.jpg')` }}
      />
      <div className="hidden md:block absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#080103_90%)] pointer-events-none" />

      {/* ======================================================== */}
      {/* MAIN CARD WRAPPER (Includes Card + External Desktop Dock) */}
      {/* ======================================================== */}
      <div className="relative flex flex-col items-center justify-center w-full max-w-[430px] md:max-w-[450px]">
        {/* ======================================================== */}
        {/* 9:16 FULL WEDDING CARD CONTAINER                         */}
        {/* ======================================================== */}
        <div className="relative w-full h-[100dvh] md:h-[86vh] md:aspect-[9/16] md:rounded-[32px] overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.95),0_0_50px_rgba(212,175,55,0.35)] md:border-2 md:border-[#D4AF37]/75 bg-black flex flex-col justify-between">
          
          {/* ======================================================== */}
          {/* MUSIC ON / OFF TOGGLE                                    */}
          {/* (Anchored neatly INSIDE the card container at top right)  */}
          {/* ======================================================== */}
          {isOpen && (
            <div className="absolute top-3.5 right-3.5 z-40 animate-[fadeIn_0.5s_ease-out]">
              <button
                onClick={toggleMusic}
                title={isMuted ? 'Turn Music On' : 'Turn Music Off'}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/65 backdrop-blur-md border border-[#D4AF37]/70 shadow-[0_4px_20px_rgba(0,0,0,0.6)] text-white text-xs uppercase tracking-wider font-cinzel hover:bg-black/85 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                {isMuted ? (
                  <>
                    <VolumeMute01Icon size={15} className="text-red-400" />
                    <span className="text-[10px] text-red-300 font-medium">Music Off</span>
                  </>
                ) : (
                  <>
                    <VolumeHighIcon size={15} className="text-[#D4AF37] animate-pulse" />
                    <span className="text-[10px] text-[#D4AF37] font-medium">Music On</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* ======================================================== */}
          {/* 1. CLOSED LUXURY ENVELOPE (Pure Handcrafted Elegance)    */}
          {/* ======================================================== */}
          {!isOpen && (
            <div
              onClick={handleOpenInvitation}
              className="relative w-full h-full cursor-pointer flex flex-col items-center justify-center select-none bg-cover bg-center transition-all duration-500 animate-[fadeIn_0.5s_ease-out] group"
              style={{ backgroundImage: `url('/images/scene_closed_gate.jpg')` }}
            >
              {/* Center Natural Wax Seal Prompt */}
              <div className="relative flex flex-col items-center pointer-events-none">
                {/* Subtle royal golden shimmer halo around the wax seal heart */}
                <div className="w-24 h-24 rounded-full border-2 border-[#D4AF37]/70 animate-ping opacity-35" />
                
                {/* Elegant Royal Hint positioned gently below the satin bow */}
                <div className="mt-24 px-4 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-[#D4AF37]/70 shadow-[0_4px_20px_rgba(0,0,0,0.5)] text-[#FFFFF0] font-cinzel text-[11px] uppercase tracking-[0.22em] font-medium flex items-center gap-2 group-hover:scale-105 transition-transform">
                  <SparklesIcon size={13} className="text-[#D4AF37] animate-pulse" />
                  <span>Tap Wax Seal to Open</span>
                  <SparklesIcon size={13} className="text-[#D4AF37] animate-pulse" />
                </div>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* 2. THE MASTER ANIMATED WEDDING VIDEO (48.5s)             */}
          {/* ======================================================== */}
          <div className={`relative w-full h-full bg-black ${isOpen ? 'block' : 'hidden'}`}>
            <video
              ref={videoRef}
              src="/video/wedding-luxe-final.mp4"
              playsInline
              loop
              className="w-full h-full object-cover object-center pointer-events-none"
            />

            {/* Mobile Only Floating Quick Action Bar (Hidden on Desktop) */}
            <div className="md:hidden absolute bottom-2.5 left-3 right-3 z-30">
              <div className="grid grid-cols-4 gap-1.5 bg-black/65 backdrop-blur-md p-1.5 rounded-2xl border border-[#D4AF37]/50 shadow-[0_4px_25px_rgba(0,0,0,0.7)]">
                {/* 1. Venue Directions */}
                <a
                  href={weddingDetails.event.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-black/40 border border-[#D4AF37]/30 text-white hover:border-[#D4AF37] transition-all text-[9.5px] font-cinzel font-semibold active:scale-95"
                >
                  <Location01Icon size={14} className="text-[#D4AF37]" />
                  <span className="mt-0.5 text-[#F5E6C8]">Venue</span>
                </a>

                {/* 2. WhatsApp RSVP */}
                <a
                  href={`https://wa.me/${weddingDetails.contact.whatsappDefaultNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-black/40 border border-[#D4AF37]/30 text-white hover:border-[#D4AF37] transition-all text-[9.5px] font-cinzel font-semibold active:scale-95"
                >
                  <WhatsappIcon size={14} className="text-[#D4AF37]" />
                  <span className="mt-0.5 text-[#F5E6C8]">RSVP</span>
                </a>

                {/* 3. Add to Calendar */}
                <button
                  onClick={handleGoogleCalendar}
                  className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-black/40 border border-[#D4AF37]/30 text-white hover:border-[#D4AF37] transition-all text-[9.5px] font-cinzel font-semibold active:scale-95 cursor-pointer"
                >
                  <Calendar03Icon size={14} className="text-[#D4AF37]" />
                  <span className="mt-0.5 text-[#F5E6C8]">Calendar</span>
                </button>

                {/* 4. Replay Video */}
                <button
                  onClick={handleReplay}
                  className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-black/40 border border-[#D4AF37]/30 text-white hover:border-[#D4AF37] transition-all text-[9.5px] font-cinzel font-bold active:scale-95 cursor-pointer"
                >
                  <RefreshIcon size={14} className="text-[#D4AF37]" />
                  <span className="mt-0.5 text-[#F5E6C8]">Replay</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* ======================================================== */}
        {/* DESKTOP EXTERNAL ACTION DOCK                             */}
        {/* (Rendered OUTSIDE and BELOW the card so bottom roses     */}
        {/*  and plaque are 100% UNOBSTRUCTED on desktop!)           */}
        {/* ======================================================== */}
        {isOpen && (
          <div className="hidden md:flex items-center justify-center gap-3 mt-4 z-30 animate-[fadeIn_0.5s_ease-out]">
            {/* 1. Venue */}
            <a
              href={weddingDetails.event.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/75 backdrop-blur-md border border-[#D4AF37]/60 text-[#F5E6C8] hover:border-[#D4AF37] hover:bg-black/90 hover:scale-105 active:scale-95 transition-all text-xs font-cinzel tracking-wider shadow-[0_6px_25px_rgba(0,0,0,0.6)] cursor-pointer"
            >
              <Location01Icon size={15} className="text-[#D4AF37]" />
              <span>Venue</span>
            </a>

            {/* 2. RSVP */}
            <a
              href={`https://wa.me/${weddingDetails.contact.whatsappDefaultNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/75 backdrop-blur-md border border-[#D4AF37]/60 text-[#F5E6C8] hover:border-[#D4AF37] hover:bg-black/90 hover:scale-105 active:scale-95 transition-all text-xs font-cinzel tracking-wider shadow-[0_6px_25px_rgba(0,0,0,0.6)] cursor-pointer"
            >
              <WhatsappIcon size={15} className="text-[#D4AF37]" />
              <span>RSVP</span>
            </a>

            {/* 3. Calendar */}
            <button
              onClick={handleGoogleCalendar}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/75 backdrop-blur-md border border-[#D4AF37]/60 text-[#F5E6C8] hover:border-[#D4AF37] hover:bg-black/90 hover:scale-105 active:scale-95 transition-all text-xs font-cinzel tracking-wider shadow-[0_6px_25px_rgba(0,0,0,0.6)] cursor-pointer"
            >
              <Calendar03Icon size={15} className="text-[#D4AF37]" />
              <span>Calendar</span>
            </button>

            {/* 4. Replay */}
            <button
              onClick={handleReplay}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/75 backdrop-blur-md border border-[#D4AF37]/60 text-[#F5E6C8] hover:border-[#D4AF37] hover:bg-black/90 hover:scale-105 active:scale-95 transition-all text-xs font-cinzel tracking-wider shadow-[0_6px_25px_rgba(0,0,0,0.6)] cursor-pointer"
            >
              <RefreshIcon size={15} className="text-[#D4AF37]" />
              <span>Replay</span>
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default VideoFlowWeddingCard;
