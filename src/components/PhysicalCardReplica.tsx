import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Location01Icon,
  Calendar03Icon,
  WhatsappIcon,
  VolumeHighIcon,
  VolumeMute01Icon,
  PlayIcon,
  PauseIcon,
  SparklesIcon,
  FavouriteIcon,
  EyeIcon,
  Download01Icon,
  Share01Icon,
  Clock01Icon,
} from 'hugeicons-react';

interface PhysicalCardReplicaProps {
  onOpenCardPhoto: () => void;
}

export const PhysicalCardReplica: React.FC<PhysicalCardReplicaProps> = ({ onOpenCardPhoto }) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [mobileTab, setMobileTab] = useState<'right' | 'left'>('right');
  const [copied, setCopied] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleOpenInvitation = () => {
    setIsOpened(true);

    try {
      confetti({
        particleCount: 80,
        spread: 85,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#801B2E', '#F7E7CE', '#C5A059', '#FFFFFF'],
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

  const handleGoogleCalendar = () => {
    const title = encodeURIComponent("Wedding Ceremony - Mohammed Sinan & Aysha Zohara");
    const details = encodeURIComponent(
      "In the Name of Allah, Mrs. & Mr. Mohammed Hussain Beary solicit your blessing on the occasion of the wedding ceremony of their son Mohammed Sinan with Aysha Zohara.\n\nDate: Thursday, 31st December, 2026 (21st Rajab, 1448 H.)\nTime: After Namaz Maghrib, followed by Dinner till 10:00 PM\nVenue: Unity Hall, Thokkottu Mangalore"
    );
    const location = encodeURIComponent("Unity Hall, Thokkottu Mangalore");
    window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20261231T130000Z/20261231T170000Z&details=${details}&location=${location}`, '_blank');
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Wedding Ceremony - Mohammed Sinan & Aysha Zohara",
          text: "Mrs. & Mr. Mohammed Hussain Beary cordially invite you to the wedding ceremony of their son Mohammed Sinan with Aysha Zohara on 31st Dec 2026 at Unity Hall, Thokkottu Mangalore.",
          url: url,
        });
      } catch (e) {
        console.warn(e);
      }
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const whatsappMessage = encodeURIComponent(
    "Assalamu Alaikum! I will be attending the wedding ceremony of Mohammed Sinan & Aysha Zohara on Thursday, 31st December 2026 Insha Allah."
  );

  return (
    <div className="min-h-screen w-full bg-[#EFE9DF] text-[#7E1B31] flex flex-col items-center justify-center p-3 sm:p-6 lg:p-8 select-none overflow-x-hidden font-elegant">
      
      {/* Background Audio Element */}
      <audio
        ref={audioRef}
        src="/audio/wedding-audio.mp3"
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Floating Audio Controller with Hugeicons */}
      <aside aria-label="Audio controls" className="fixed top-4 right-4 z-50 flex items-center gap-2 p-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#D4AF37]/50 shadow-xl">
        <button
          onClick={togglePlayAudio}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#7E1B31] text-[#FAF5EE] text-xs uppercase tracking-wider font-semibold hover:bg-[#631526] transition-colors"
        >
          {isPlaying ? (
            <PauseIcon size={14} className="text-[#D4AF37]" />
          ) : (
            <PlayIcon size={14} className="text-[#D4AF37]" />
          )}
          <span className="text-[11px]">{isPlaying ? 'Playing Audio' : 'Play Voice'}</span>
        </button>

        <button
          onClick={toggleMuteAudio}
          className="p-1.5 rounded-full hover:bg-stone-100 text-[#7E1B31] transition-colors"
        >
          {isMuted ? <VolumeMute01Icon size={16} /> : <VolumeHighIcon size={16} />}
        </button>
      </aside>

      {/* ======================================================== */}
      {/* 1. ENVELOPE OPENING WELCOME COVER                        */}
      {/* ======================================================== */}
      {!isOpened ? (
        <div className="relative z-10 w-full max-w-lg my-auto py-10 px-4 text-center animate-[fadeIn_0.6s_ease-out]">
          <div
            onClick={handleOpenInvitation}
            className="group relative mx-auto w-full bg-[#FAF5EE] rounded-3xl p-8 sm:p-12 border-2 border-[#C5A059]/60 shadow-[0_20px_60px_rgba(126,27,49,0.18)] cursor-pointer hover:scale-[1.02] active:scale-[0.99] transition-all duration-500"
          >
            {/* Subtle Textured Damask Watermark */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none rounded-3xl bg-[radial-gradient(#7E1B31_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Inner Dashed Gold Border */}
            <div className="absolute inset-3 sm:inset-4 rounded-2xl border border-dashed border-[#C5A059]/50 pointer-events-none" />

            {/* Arabic Bismillah */}
            <p className="font-arabic text-3xl sm:text-4xl text-[#C5A059] mb-3 drop-shadow-sm">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>

            <p className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#7E1B31] font-bold mb-4">
              IN THE NAME OF ALLAH THE MOST BENEFICENT & MOST MERCIFUL
            </p>

            <p className="text-xs sm:text-sm text-[#7E1B31]/80 italic max-w-sm mx-auto mb-6">
              "Oh Allah guide this marriage to the best of understanding, happiness, prosperity & success - Ameen"
            </p>

            <p className="text-xs uppercase tracking-widest text-[#7E1B31]/60 mb-2">
              Wedding Invitation of
            </p>

            {/* Couple Names from Physical Card */}
            <h1 className="text-4xl sm:text-5xl font-bold text-[#7E1B31] tracking-wide my-1">
              Mohammed Sinan
            </h1>

            <p className="text-xl italic text-[#C5A059] my-1">=== with ===</p>

            <h1 className="text-4xl sm:text-5xl font-bold text-[#7E1B31] tracking-wide my-1">
              Aysha Zohara
            </h1>

            <p className="text-xs sm:text-sm text-[#7E1B31]/80 font-semibold tracking-wider mt-4">
              Thursday, 31st December, 2026 • Mangalore
            </p>

            {/* 3D Wax Seal Prompt */}
            <div className="mt-8 flex flex-col items-center">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full wax-seal border-2 border-[#D4AF37]/60 flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform duration-300">
                <div className="absolute inset-1.5 rounded-full border border-dashed border-[#D4AF37]/40" />
                <SparklesIcon size={28} className="text-[#D4AF37]" />
              </div>

              <div className="mt-5 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#7E1B31] text-[#FAF5EE] text-xs uppercase tracking-widest font-bold shadow-lg border border-[#D4AF37]/50 group-hover:bg-[#631526] transition-colors">
                <FavouriteIcon size={14} className="text-[#D4AF37]" />
                <span>Tap To Open Wedding Card</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ======================================================== */
        /* 2. THE EXACT REAL PHYSICAL CARD REPLICA                  */
        /* (Faithfully formatted word-for-word from user's photo!)  */
        /* ======================================================== */
        <div className="relative z-10 w-full max-w-5xl my-auto py-6 animate-[fadeIn_0.8s_ease-out]">
          
          {/* Mobile Tab Switcher: Left Flap vs Right Flap */}
          <div className="flex md:hidden items-center justify-center gap-2 mb-4">
            <button
              onClick={() => setMobileTab('right')}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-bold transition-all ${
                mobileTab === 'right'
                  ? 'bg-[#7E1B31] text-[#FAF5EE] shadow-md border border-[#D4AF37]/50'
                  : 'bg-white/80 text-[#7E1B31] border border-stone-300'
              }`}
            >
              Invitation Ceremony
            </button>
            <button
              onClick={() => setMobileTab('left')}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-bold transition-all ${
                mobileTab === 'left'
                  ? 'bg-[#7E1B31] text-[#FAF5EE] shadow-md border border-[#D4AF37]/50'
                  : 'bg-white/80 text-[#7E1B31] border border-stone-300'
              }`}
            >
              Compliments & Residence
            </button>
          </div>

          {/* The Physical Card Open Booklet (2 Pages) */}
          <div className="relative w-full bg-[#FAF5EE] rounded-3xl sm:rounded-[36px] border-2 border-[#C5A059]/50 shadow-[0_25px_80px_rgba(126,27,49,0.22)] overflow-hidden">
            
            {/* Vintage Rose Lace Bottom Border (From the real card) */}
            <div className="absolute bottom-0 left-0 right-0 h-9 sm:h-12 bg-gradient-to-t from-[#EED5B7]/40 via-[#F7E7CE]/30 to-transparent border-t border-[#C5A059]/30 pointer-events-none flex items-center justify-center overflow-hidden">
              <svg width="100%" height="24" viewBox="0 0 1200 24" fill="none" className="opacity-70">
                <path d="M0 12 Q 25 0 50 12 T 100 12 T 150 12 T 200 12 T 250 12 T 300 12 T 350 12 T 400 12 T 450 12 T 500 12 T 550 12 T 600 12 T 650 12 T 700 12 T 750 12 T 800 12 T 850 12 T 900 12 T 950 12 T 1000 12 T 1050 12 T 1100 12 T 1150 12 T 1200 12" stroke="#C5A059" strokeWidth="1.5" />
                <circle cx="25" cy="12" r="3" fill="#D08595" />
                <circle cx="75" cy="12" r="3" fill="#C5A059" />
                <circle cx="125" cy="12" r="3" fill="#D08595" />
                <circle cx="175" cy="12" r="3" fill="#C5A059" />
                <circle cx="225" cy="12" r="3" fill="#D08595" />
                <circle cx="275" cy="12" r="3" fill="#C5A059" />
                <circle cx="325" cy="12" r="3" fill="#D08595" />
                <circle cx="375" cy="12" r="3" fill="#C5A059" />
                <circle cx="425" cy="12" r="3" fill="#D08595" />
                <circle cx="475" cy="12" r="3" fill="#C5A059" />
                <circle cx="525" cy="12" r="3" fill="#D08595" />
                <circle cx="575" cy="12" r="3" fill="#C5A059" />
                <circle cx="625" cy="12" r="3" fill="#D08595" />
                <circle cx="675" cy="12" r="3" fill="#C5A059" />
                <circle cx="725" cy="12" r="3" fill="#D08595" />
                <circle cx="775" cy="12" r="3" fill="#C5A059" />
                <circle cx="825" cy="12" r="3" fill="#D08595" />
                <circle cx="875" cy="12" r="3" fill="#C5A059" />
                <circle cx="925" cy="12" r="3" fill="#D08595" />
                <circle cx="975" cy="12" r="3" fill="#C5A059" />
                <circle cx="1025" cy="12" r="3" fill="#D08595" />
                <circle cx="1075" cy="12" r="3" fill="#C5A059" />
                <circle cx="1125" cy="12" r="3" fill="#D08595" />
                <circle cx="1175" cy="12" r="3" fill="#C5A059" />
              </svg>
            </div>

            {/* Side-by-side on desktop, toggleable on mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#C5A059]/30 relative z-10 pb-10 sm:pb-14">
              
              {/* -------------------------------------------------- */}
              {/* LEFT PAGE: POETRY, COMPLIMENTS & RESIDENCE         */}
              {/* -------------------------------------------------- */}
              <div
                className={`p-6 sm:p-10 lg:p-12 flex flex-col justify-between text-center ${
                  mobileTab === 'left' ? 'block' : 'hidden md:flex'
                }`}
              >
                <div className="space-y-6 my-auto pt-4">
                  {/* Poetic Message from Card */}
                  <div className="space-y-1">
                    <p className="text-base sm:text-lg text-[#7E1B31] font-semibold italic leading-relaxed">
                      A Day of togetherness, a moment of joy and emotions
                    </p>
                    <p className="text-base sm:text-lg text-[#7E1B31] font-semibold italic leading-relaxed">
                      a dream of every parent today a reality of us
                    </p>
                  </div>

                  <div className="w-24 h-px bg-[#C5A059]/40 mx-auto my-6" />

                  {/* With Best Compliments From */}
                  <div>
                    <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#7E1B31] font-bold mb-2">
                      WITH BEST COMPLIMENTS FROM :
                    </p>
                    <p className="font-calligraphy text-3xl sm:text-4xl text-[#7E1B31] font-bold">
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

              {/* -------------------------------------------------- */}
              {/* RIGHT PAGE: THE MAIN NIKAH INVITATION              */}
              {/* -------------------------------------------------- */}
              <div
                className={`p-6 sm:p-10 lg:p-12 flex flex-col justify-between text-center ${
                  mobileTab === 'right' ? 'block' : 'hidden md:flex'
                }`}
              >
                <div className="space-y-3.5 my-auto">
                  {/* Bismillah Calligraphy */}
                  <p className="font-arabic text-3xl sm:text-4xl text-[#C5A059] mb-1 drop-shadow-sm">
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                  </p>

                  <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#7E1B31] font-bold">
                    IN THE NAME OF ALLAH THE MOST BENEFICENT & MOST MERCIFUL
                  </p>

                  <p className="text-xs sm:text-sm text-[#7E1B31]/90 italic max-w-sm mx-auto leading-relaxed">
                    "Oh Allah guide this marriage to the best of understanding,<br />
                    happiness, prosperity & success - Ameen"
                  </p>

                  {/* Parents */}
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
          </div>

          {/* ======================================================== */}
          {/* 3. INTERACTIVE HUGEICONS ACTION BAR                      */}
          {/* ======================================================== */}
          <div className="mt-6 p-4 sm:p-6 rounded-3xl bg-white/95 backdrop-blur-md border border-[#C5A059]/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Action Buttons with Hugeicons */}
            <div className="grid grid-cols-3 gap-2.5 w-full sm:w-auto flex-1">
              {/* Google Maps Directions */}
              <a
                href="https://www.google.com/maps/search/?api=1&query=Unity+Hall+Thokkottu+Mangalore"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-3 rounded-2xl bg-[#7E1B31] text-[#FAF5EE] text-xs uppercase tracking-wider font-bold hover:bg-[#631526] shadow-md transition-all"
              >
                <Location01Icon size={16} className="text-[#C5A059]" />
                <span>Maps</span>
              </a>

              {/* WhatsApp RSVP */}
              <a
                href={`https://wa.me/919876543210?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-3 rounded-2xl bg-emerald-700 text-white text-xs uppercase tracking-wider font-bold hover:bg-emerald-800 shadow-md transition-all"
              >
                <WhatsappIcon size={16} className="text-emerald-200" />
                <span>RSVP</span>
              </a>

              {/* Google Calendar */}
              <button
                onClick={handleGoogleCalendar}
                className="flex items-center justify-center gap-2 py-3 px-3 rounded-2xl bg-white text-[#7E1B31] border border-[#C5A059]/50 text-xs uppercase tracking-wider font-bold hover:bg-stone-50 shadow-sm transition-all"
              >
                <Calendar03Icon size={16} className="text-[#C5A059]" />
                <span>Calendar</span>
              </button>
            </div>

            {/* Secondary Controls with Hugeicons */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-center">
              <button
                onClick={onOpenCardPhoto}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FAF5EE] text-[#7E1B31] border border-[#C5A059]/40 text-xs font-semibold hover:bg-white transition-colors"
              >
                <EyeIcon size={16} className="text-[#C5A059]" />
                <span>Real Card Photo</span>
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FAF5EE] text-[#7E1B31] border border-[#C5A059]/40 text-xs font-semibold hover:bg-white transition-colors"
              >
                <Share01Icon size={16} className="text-[#C5A059]" />
                <span>{copied ? 'Copied!' : 'Share'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
