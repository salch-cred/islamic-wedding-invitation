import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  VolumeHighIcon,
  VolumeMute01Icon,
  Location01Icon,
  WhatsappIcon,
  Calendar03Icon,
  SparklesIcon,
} from 'hugeicons-react';

export const FullScreenWeddingCard: React.FC = () => {
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Play audio on first user touch / click anywhere on the page
  const handleUserGesture = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
      if (audioRef.current) {
        audioRef.current.play().catch(console.warn);
      }
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#D4AF37', '#801B2E', '#F7E7CE', '#C5A059', '#FFFFFF'],
        });
      } catch (e) {
        console.warn(e);
      }
    }
  };

  useEffect(() => {
    // Attempt auto-play when component mounts
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setHasInteracted(true);
      }).catch(() => {
        // Autoplay policy waiting for click/touch
      });
    }
  }, []);

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

  const handleGoogleCalendar = (e: React.MouseEvent) => {
    e.stopPropagation();
    const title = encodeURIComponent("Wedding Ceremony - Mohammed Sinan & Aysha Zohara");
    const details = encodeURIComponent(
      "In the Name of Allah, Mrs. & Mr. Mohammed Hussain Beary solicit your blessing on the occasion of the wedding ceremony of their son Mohammed Sinan with Aysha Zohara.\n\nDate: Thursday, 31st December, 2026 (21st Rajab, 1448 H.)\nTime: After Namaz Maghrib, followed by Dinner till 10:00 PM\nVenue: Unity Hall, Thokkottu Mangalore"
    );
    const location = encodeURIComponent("Unity Hall, Thokkottu Mangalore");
    window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20261231T130000Z/20261231T170000Z&details=${details}&location=${location}`, '_blank');
  };

  const whatsappMessage = encodeURIComponent(
    "Assalamu Alaikum! I will be attending the wedding ceremony of Mohammed Sinan & Aysha Zohara on Thursday, 31st December 2026 Insha Allah."
  );

  return (
    <div
      onClick={handleUserGesture}
      className="min-h-screen w-full bg-[#E8E1D5] flex items-center justify-center p-2 sm:p-4 lg:p-6 select-none font-elegant relative overflow-x-hidden"
    >
      {/* Background Wedding Audio Track */}
      <audio
        ref={audioRef}
        src="/audio/wedding-audio.mp3"
        loop
        preload="auto"
      />

      {/* Music Off / On Toggle Button (Only Control as Requested) */}
      <div className="fixed top-3 right-3 sm:top-5 sm:right-5 z-50">
        <button
          onClick={toggleMusic}
          title={isMuted ? "Turn Music On" : "Turn Music Off"}
          className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/95 backdrop-blur-md border border-[#C5A059]/60 shadow-lg text-[#7E1B31] text-xs uppercase tracking-wider font-bold hover:bg-[#FAF5EE] transition-all"
        >
          {isMuted ? (
            <>
              <VolumeMute01Icon size={16} className="text-[#7E1B31]" />
              <span className="text-[11px]">Music Off</span>
            </>
          ) : (
            <>
              <VolumeHighIcon size={16} className="text-[#C5A059]" />
              <span className="text-[11px] text-[#C5A059]">Music On</span>
            </>
          )}
        </button>
      </div>

      {/* ======================================================== */}
      {/* FULL SCREEN PHYSICAL WEDDING CARD REPLICA                */}
      {/* (Word-for-word identical to the user's uploaded photo)   */}
      {/* ======================================================== */}
      <div className="relative w-full max-w-5xl bg-[#FAF5EE] rounded-2xl sm:rounded-3xl border-2 border-[#C5A059]/60 shadow-[0_20px_70px_rgba(126,27,49,0.2)] overflow-hidden my-auto">
        
        {/* Subtle Textured Damask Background */}
        <div className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[radial-gradient(#7E1B31_1.5px,transparent_1.5px)] [background-size:20px_20px]" />

        {/* Vintage Rose & Gold Lace Bottom Border (From the physical card) */}
        <div className="absolute bottom-0 left-0 right-0 h-8 sm:h-11 bg-gradient-to-t from-[#EED5B7]/50 via-[#F7E7CE]/30 to-transparent border-t border-[#C5A059]/40 pointer-events-none flex items-center justify-center overflow-hidden">
          <svg width="100%" height="22" viewBox="0 0 1200 22" fill="none" className="opacity-80">
            <path d="M0 11 Q 25 0 50 11 T 100 11 T 150 11 T 200 11 T 250 11 T 300 11 T 350 11 T 400 11 T 450 11 T 500 11 T 550 11 T 600 11 T 650 11 T 700 11 T 750 11 T 800 11 T 850 11 T 900 11 T 950 11 T 1000 11 T 1050 11 T 1100 11 T 1150 11 T 1200 11" stroke="#C5A059" strokeWidth="1.5" />
            <circle cx="25" cy="11" r="3.5" fill="#BC596E" />
            <circle cx="75" cy="11" r="3.5" fill="#C5A059" />
            <circle cx="125" cy="11" r="3.5" fill="#BC596E" />
            <circle cx="175" cy="11" r="3.5" fill="#C5A059" />
            <circle cx="225" cy="11" r="3.5" fill="#BC596E" />
            <circle cx="275" cy="11" r="3.5" fill="#C5A059" />
            <circle cx="325" cy="11" r="3.5" fill="#BC596E" />
            <circle cx="375" cy="11" r="3.5" fill="#C5A059" />
            <circle cx="425" cy="11" r="3.5" fill="#BC596E" />
            <circle cx="475" cy="11" r="3.5" fill="#C5A059" />
            <circle cx="525" cy="11" r="3.5" fill="#BC596E" />
            <circle cx="575" cy="11" r="3.5" fill="#C5A059" />
            <circle cx="625" cy="11" r="3.5" fill="#BC596E" />
            <circle cx="675" cy="11" r="3.5" fill="#C5A059" />
            <circle cx="725" cy="11" r="3.5" fill="#BC596E" />
            <circle cx="775" cy="11" r="3.5" fill="#C5A059" />
            <circle cx="825" cy="11" r="3.5" fill="#BC596E" />
            <circle cx="875" cy="11" r="3.5" fill="#C5A059" />
            <circle cx="925" cy="11" r="3.5" fill="#BC596E" />
            <circle cx="975" cy="11" r="3.5" fill="#C5A059" />
            <circle cx="1025" cy="11" r="3.5" fill="#BC596E" />
            <circle cx="1075" cy="11" r="3.5" fill="#C5A059" />
            <circle cx="1125" cy="11" r="3.5" fill="#BC596E" />
            <circle cx="1175" cy="11" r="3.5" fill="#C5A059" />
          </svg>
        </div>

        {/* The Open Card (Side by Side on desktop, beautifully formatted on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#C5A059]/40 relative z-10 pb-10 sm:pb-14">
          
          {/* ==================================================== */}
          {/* LEFT FLAP: POETRY, COMPLIMENTS & RESIDENCE          */}
          {/* ==================================================== */}
          <div className="p-6 sm:p-10 lg:p-12 flex flex-col justify-between text-center">
            <div className="space-y-6 my-auto pt-2">
              {/* Card Poetry (Exact Text) */}
              <div className="space-y-1">
                <p className="text-base sm:text-lg lg:text-xl text-[#7E1B31] font-semibold italic leading-relaxed">
                  A Day of togetherness, a moment of joy and emotions
                </p>
                <p className="text-base sm:text-lg lg:text-xl text-[#7E1B31] font-semibold italic leading-relaxed">
                  a dream of every parent today a reality of us
                </p>
              </div>

              <div className="w-28 h-px bg-[#C5A059]/40 mx-auto my-6" />

              {/* With Best Compliments From */}
              <div>
                <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#7E1B31] font-bold mb-2">
                  WITH BEST COMPLIMENTS FROM :
                </p>
                <p className="font-calligraphy text-3xl sm:text-4xl lg:text-5xl text-[#7E1B31] font-bold">
                  Relatives & Friends
                </p>
              </div>

              {/* Gift Plaque Box (Word-for-word from real card) */}
              <div className="my-6 inline-block px-5 py-2.5 rounded-lg border-2 border-[#7E1B31] bg-white/40 shadow-sm">
                <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#7E1B31]">
                  YOUR PRESENCE & DUA IS OUR GREATEST GIFT
                </p>
              </div>

              {/* Residence */}
              <div className="pt-6 border-t border-[#C5A059]/30">
                <p className="text-xs sm:text-sm font-bold text-[#7E1B31] mb-1">
                  Resi. :
                </p>
                <p className="text-xs sm:text-sm font-medium text-[#7E1B31]/90">
                  Sugandh Palace, Nityanand Nagar,
                </p>
                <p className="text-xs sm:text-sm font-medium text-[#7E1B31]/90">
                  Ghatkopar (W), Mumbai-400 086.
                </p>
              </div>
            </div>
          </div>

          {/* ==================================================== */}
          {/* RIGHT PAGE: THE ROYAL CEREMONY INVITATION          */}
          {/* ==================================================== */}
          <div className="p-6 sm:p-10 lg:p-12 flex flex-col justify-between text-center">
            <div className="space-y-3.5 my-auto">
              
              {/* Arabic Bismillah Calligraphy */}
              <p className="font-arabic text-3xl sm:text-4xl lg:text-5xl text-[#C5A059] mb-1 drop-shadow-sm">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>

              <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#7E1B31] font-bold">
                IN THE NAME OF ALLAH THE MOST BENEFICENT & MOST MERCIFUL
              </p>

              {/* Parents' Prayer from Physical Card */}
              <p className="text-xs sm:text-sm text-[#7E1B31]/90 italic max-w-sm mx-auto leading-relaxed">
                "Oh Allah guide this marriage to the best of understanding,<br />
                happiness, prosperity & success - Ameen"
              </p>

              {/* Hosts / Parents */}
              <div className="pt-2">
                <p className="text-xl sm:text-2xl font-bold italic text-[#7E1B31]">
                  Mrs. & Mr.
                </p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#7E1B31] tracking-wide my-1">
                  Mohammed Hussain Beary
                </h2>
                <p className="text-xs text-[#7E1B31]/80 max-w-sm mx-auto leading-relaxed mt-1">
                  solicit your blessing & request the pleasure of your family<br />
                  on the occasion of the wedding ceremony of their son
                </p>
              </div>

              {/* Groom */}
              <div className="pt-2">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#7E1B31] tracking-wide">
                  Mohammed Sinan
                </h1>
                <p className="text-[11px] sm:text-xs text-[#7E1B31]/85 italic mt-0.5">
                  (Grand S/o. Marhoom P. Hammabba Beary &<br />
                  Marhoom Mohammad Abdullah Sheikh)
                </p>
              </div>

              {/* Divider WITH */}
              <div className="flex items-center justify-center gap-3 my-1">
                <span className="text-sm font-bold uppercase tracking-widest text-[#C5A059]">
                  === WITH ===
                </span>
              </div>

              {/* Bride */}
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#7E1B31] tracking-wide">
                  Aysha Zohara
                </h1>
                <p className="text-[11px] sm:text-xs text-[#7E1B31]/85 italic mt-0.5">
                  (D/o. Abdul Lateef Ibrahim)
                </p>
              </div>

              {/* Insha Allah */}
              <p className="font-calligraphy text-2xl sm:text-3xl text-[#C5A059] font-bold pt-1">
                Insha Allah
              </p>

              {/* Nikah Time & Details */}
              <div className="py-2 text-xs sm:text-sm text-[#7E1B31] font-semibold space-y-0.5">
                <p>
                  <span className="font-bold">Nikah :</span> On Thursday, 31st December, 2026
                </p>
                <p className="italic text-xs text-[#7E1B31]/80">
                  (21st Rajab, 1448 H.) After Namaz Maghrib
                </p>
                <p>Followed by Dinner till 10-00 p.m.</p>
              </div>

              {/* Venue */}
              <div className="pt-1">
                <p className="text-xs uppercase tracking-widest font-bold text-[#C5A059]">
                  Venue :
                </p>
                <h3 className="text-lg sm:text-xl font-bold text-[#7E1B31]">
                  Unity Hall, Thokkottu Mangalore
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* ==================================================== */}
        {/* DISCREET BOTTOM ACTION BAR (Directions, RSVP, Calendar)*/}
        {/* ==================================================== */}
        <div className="relative z-20 border-t border-[#C5A059]/40 bg-white/90 backdrop-blur-md px-4 py-3 flex flex-wrap items-center justify-center gap-3 sm:gap-6">
          <a
            href="https://www.google.com/maps/search/?api=1&query=Unity+Hall+Thokkottu+Mangalore"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#7E1B31] text-[#FAF5EE] text-xs uppercase tracking-wider font-bold hover:bg-[#631526] transition-colors shadow-sm"
          >
            <Location01Icon size={14} className="text-[#C5A059]" />
            <span>Maps Direction</span>
          </a>

          <a
            href={`https://wa.me/919876543210?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-700 text-white text-xs uppercase tracking-wider font-bold hover:bg-emerald-800 transition-colors shadow-sm"
          >
            <WhatsappIcon size={14} className="text-emerald-200" />
            <span>RSVP via WhatsApp</span>
          </a>

          <button
            onClick={handleGoogleCalendar}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FAF5EE] text-[#7E1B31] border border-[#C5A059]/60 text-xs uppercase tracking-wider font-bold hover:bg-white transition-colors shadow-sm"
          >
            <Calendar03Icon size={14} className="text-[#C5A059]" />
            <span>Add to Calendar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
