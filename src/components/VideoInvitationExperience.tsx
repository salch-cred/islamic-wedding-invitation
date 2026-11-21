import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  MapPin,
  MessageCircle,
  Calendar as CalendarIcon,
  Download,
  Share2,
  Eye,
  Heart,
  Sparkles,
  Maximize2,
  Music,
} from 'lucide-react';

interface VideoInvitationExperienceProps {
  onOpenCardModal: () => void;
}

export const VideoInvitationExperience: React.FC<VideoInvitationExperienceProps> = ({
  onOpenCardModal,
}) => {
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [activeTrack, setActiveTrack] = useState<'voice' | 'original'>('voice');
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const videoSource = activeTrack === 'voice' 
    ? '/video/wedding-with-voice.mp4' 
    : '/video/wedding-original.mp4';

  const handleStartInvitation = () => {
    setHasStarted(true);

    try {
      confetti({
        particleCount: 85,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#801B2E', '#F3E5AB', '#FFFFF0', '#B8960C'],
      });
    } catch (e) {
      console.warn(e);
    }

    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = false;
      videoRef.current.play().then(() => {
        setIsPlaying(true);
        setIsMuted(false);
      }).catch((err) => {
        console.warn("Autoplay with sound was blocked, trying muted:", err);
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play().then(() => setIsPlaying(true));
        }
      });
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(console.warn);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleReplay = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play().then(() => setIsPlaying(true));
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(console.warn);
    } else {
      document.exitFullscreen().catch(console.warn);
    }
  };

  const handleSwitchAudio = (track: 'voice' | 'original') => {
    setActiveTrack(track);
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      videoRef.current.src = track === 'voice' ? '/video/wedding-with-voice.mp4' : '/video/wedding-original.mp4';
      videoRef.current.currentTime = currentTime;
      videoRef.current.play().then(() => setIsPlaying(true)).catch(console.warn);
    }
  };

  const handleGoogleCalendar = () => {
    const text = encodeURIComponent("Wedding Ceremony - Mohammed Sinan & Aysha Zohara");
    const details = encodeURIComponent(
      "In the Name of Allah, Mrs. & Mr. Mohammed Hussain Beary cordially invite you to the wedding ceremony of their son Mohammed Sinan with Aysha Zohara.\n\nDate: Thursday, 31st December 2026\nTime: After Namaz Maghrib, Dinner till 10 PM\nVenue: Unity Hall, Thokkottu Mangalore"
    );
    const location = encodeURIComponent("Unity Hall, Thokkottu Mangalore");
    window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=20261231T130000Z/20261231T170000Z&details=${details}&location=${location}`, '_blank');
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Wedding Ceremony - Mohammed Sinan & Aysha Zohara",
          text: "You are cordially invited to the wedding ceremony of Mohammed Sinan & Aysha Zohara on 31st December 2026 at Unity Hall, Thokkottu Mangalore.",
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

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#1E0408] via-[#120104] to-black flex flex-col items-center justify-center p-3 sm:p-6 text-cream select-none">
      
      {/* Top Header Bar */}
      <header className="w-full max-w-md flex items-center justify-between py-3 px-4 mb-2 z-20">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-champagne-gold" />
          <span className="font-elegant text-xs uppercase tracking-widest text-champagne-gold font-semibold">
            Wedding Invitation Video Flow
          </span>
        </div>

        {/* Audio Track Selector */}
        {hasStarted && (
          <div className="flex items-center gap-1 p-1 rounded-full bg-black/60 border border-champagne-gold/30 text-[10px] font-elegant">
            <button
              onClick={() => handleSwitchAudio('voice')}
              className={`px-2.5 py-1 rounded-full transition-colors ${
                activeTrack === 'voice' ? 'bg-maroon-800 text-cream font-bold' : 'text-stone-400 hover:text-white'
              }`}
            >
              Voice Audio
            </button>
            <button
              onClick={() => handleSwitchAudio('original')}
              className={`px-2.5 py-1 rounded-full transition-colors ${
                activeTrack === 'original' ? 'bg-maroon-800 text-cream font-bold' : 'text-stone-400 hover:text-white'
              }`}
            >
              Original
            </button>
          </div>
        )}
      </header>

      {/* Main 9:16 Video Container (Exact Aspect Ratio from Video) */}
      <div
        ref={containerRef}
        className="relative w-full max-w-[430px] aspect-[9/16] max-h-[82vh] rounded-[32px] overflow-hidden shadow-[0_0_60px_rgba(212,175,55,0.3)] border-2 border-champagne-gold/50 bg-black flex flex-col justify-between"
      >
        {/* The Video Element */}
        <video
          ref={videoRef}
          src={videoSource}
          playsInline
          loop
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* ======================================================== */}
        {/* PRE-PLAY COVER: The Closed Envelope with Wax Seal        */}
        {/* ======================================================== */}
        {!hasStarted && (
          <div
            onClick={handleStartInvitation}
            className="absolute inset-0 z-20 bg-cover bg-center flex flex-col items-center justify-between p-6 cursor-pointer"
            style={{ backgroundImage: `url('/images/envelope-closed.png')` }}
          >
            {/* Top Bismillah */}
            <div className="text-center pt-8">
              <p className="font-arabic text-2xl text-champagne-gold drop-shadow-md">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
              <p className="font-elegant text-[11px] uppercase tracking-[0.25em] text-maroon-900 font-bold mt-2">
                Royal Wedding Invitation
              </p>
            </div>

            {/* Center Pulsing Wax Seal */}
            <div className="flex flex-col items-center animate-[bounce_2s_infinite]">
              <div className="w-24 h-24 rounded-full wax-seal border-2 border-champagne-gold/60 flex items-center justify-center shadow-2xl">
                <Sparkles className="w-8 h-8 text-champagne-gold" />
              </div>
              <div className="mt-4 px-6 py-2.5 rounded-full bg-maroon-900/95 border border-champagne-gold/60 shadow-xl text-cream font-elegant text-xs uppercase tracking-widest font-bold flex items-center gap-2">
                <Heart className="w-3.5 h-3.5 text-champagne-gold fill-champagne-gold" />
                <span>Tap To Open Video Flow</span>
              </div>
            </div>

            {/* Bottom Couple Teaser */}
            <div className="text-center pb-8">
              <p className="font-calligraphy text-3xl text-maroon-950 font-bold drop-shadow">
                Mohammed Sinan & Aysha Zohara
              </p>
              <p className="font-elegant text-xs text-maroon-900/90 font-semibold tracking-wider mt-1">
                Thursday, 31st December 2026 • Mangalore
              </p>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* IN-VIDEO CONTROLS OVERLAY (When Video is playing)        */}
        {/* ======================================================== */}
        {hasStarted && (
          <>
            {/* Top Gradient Protection */}
            <div className="relative z-10 p-4 flex items-center justify-between bg-gradient-to-b from-black/70 via-black/30 to-transparent">
              <div className="flex items-center gap-2">
                <p className="font-calligraphy text-2xl text-champagne-gold drop-shadow">
                  Sinan & Aysha
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="p-2 rounded-full bg-black/50 backdrop-blur-md border border-champagne-gold/40 text-champagne-gold hover:bg-black/80 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <button
                  onClick={toggleFullscreen}
                  className="p-2 rounded-full bg-black/50 backdrop-blur-md border border-champagne-gold/40 text-champagne-gold hover:bg-black/80 transition-colors"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Center Tap Area to Pause/Play */}
            <div onClick={togglePlay} className="flex-1 w-full cursor-pointer flex items-center justify-center">
              {!isPlaying && (
                <div className="p-4 rounded-full bg-black/60 border border-champagne-gold/50 shadow-2xl animate-pulse">
                  <Play className="w-8 h-8 text-champagne-gold fill-champagne-gold ml-1" />
                </div>
              )}
            </div>

            {/* Bottom In-Video Control Bar */}
            <div className="relative z-10 p-4 pt-8 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex items-center justify-between">
              <button
                onClick={togglePlay}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-maroon-900/90 border border-champagne-gold/40 text-xs font-elegant uppercase tracking-wider text-cream hover:bg-maroon-800 transition-colors"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-cream" />}
                <span>{isPlaying ? 'Pause' : 'Play'}</span>
              </button>

              <button
                onClick={handleReplay}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 border border-champagne-gold/30 text-xs font-elegant text-champagne-gold hover:bg-black/70 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Replay</span>
              </button>
            </div>
          </>
        )}
      </div>

      {/* ======================================================== */}
      {/* QUICK INTERACTIVE ACTIONS DOCK (Directly Under Video)   */}
      {/* ======================================================== */}
      <div className="w-full max-w-md mt-4 space-y-3 z-20">
        <div className="grid grid-cols-3 gap-2.5">
          {/* Google Maps Directions */}
          <a
            href="https://www.google.com/maps/search/?api=1&query=Unity+Hall+Thokkottu+Mangalore"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl bg-maroon-900/80 border border-champagne-gold/40 text-cream font-elegant text-xs uppercase tracking-wider font-bold hover:bg-maroon-800 shadow-lg transition-all"
          >
            <MapPin className="w-4 h-4 text-champagne-gold" />
            <span>Directions</span>
          </a>

          {/* WhatsApp RSVP */}
          <a
            href={`https://wa.me/919876543210?text=${encodeURIComponent(
              "Assalamu Alaikum! I will be attending the wedding ceremony of Mohammed Sinan & Aysha Zohara on 31st December 2026 Insha Allah."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl bg-emerald-700/80 border border-emerald-400/40 text-white font-elegant text-xs uppercase tracking-wider font-bold hover:bg-emerald-600 shadow-lg transition-all"
          >
            <MessageCircle className="w-4 h-4 text-emerald-200" />
            <span>RSVP</span>
          </a>

          {/* Google Calendar */}
          <button
            onClick={handleGoogleCalendar}
            className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl bg-white/10 border border-champagne-gold/30 text-cream font-elegant text-xs uppercase tracking-wider font-bold hover:bg-white/20 shadow-lg transition-all"
          >
            <CalendarIcon className="w-4 h-4 text-champagne-gold" />
            <span>Calendar</span>
          </button>
        </div>

        {/* Secondary Row: Toggle Full Card Details & Download Video */}
        <div className="flex items-center justify-between gap-2 px-1">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-champagne-gold/15 border border-champagne-gold/40 text-xs font-elegant font-semibold text-champagne-gold hover:bg-champagne-gold/25 transition-all"
          >
            <Heart className="w-3.5 h-3.5" />
            <span>{showDetails ? 'Hide Card Details' : 'View Full Card Details'}</span>
          </button>

          <a
            href={videoSource}
            download="wedding-invitation-sinan-aysha.mp4"
            className="flex items-center gap-1.5 py-2.5 px-3 rounded-xl bg-black/60 border border-champagne-gold/30 text-xs font-elegant text-stone-300 hover:text-white transition-all"
          >
            <Download className="w-3.5 h-3.5 text-champagne-gold" />
            <span>Save Video</span>
          </a>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 py-2.5 px-3 rounded-xl bg-black/60 border border-champagne-gold/30 text-xs font-elegant text-stone-300 hover:text-white transition-all"
          >
            <Share2 className="w-3.5 h-3.5 text-champagne-gold" />
            <span>{copied ? 'Copied!' : 'Share'}</span>
          </button>
        </div>

        {/* Expandable Physical Card Details Drawer */}
        {showDetails && (
          <div className="p-5 rounded-3xl bg-white/95 backdrop-blur-xl border border-champagne-gold/40 shadow-2xl text-soft-black text-center space-y-4 animate-[fadeIn_0.3s_ease-out]">
            <p className="font-arabic text-2xl text-champagne-gold">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>

            <p className="font-elegant text-xs uppercase tracking-widest text-[#9A6A32] font-bold">
              IN THE NAME OF ALLAH THE MOST BENEFICENT & MOST MERCIFUL
            </p>

            <p className="font-elegant text-xs text-maroon-900 italic max-w-sm mx-auto">
              "Oh Allah guide this marriage to the best of understanding, happiness, prosperity & success — Ameen"
            </p>

            <div className="py-2">
              <p className="font-elegant text-sm text-soft-black/70">
                Mrs. & Mr. Mohammed Hussain Beary
              </p>
              <h3 className="font-calligraphy text-3xl text-maroon-900 font-bold my-1">
                Mohammed Sinan & Aysha Zohara
              </h3>
              <p className="font-elegant text-xs text-soft-black/60 italic">
                (Grand S/o. Marhoom P. Hammabba Beary & Marhoom Mohammad Abdullah Sheikh)
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-champagne-gold/15 border border-champagne-gold/30">
              <p className="font-elegant text-xs font-bold text-maroon-900 uppercase">
                Nikah: Thursday, 31st December, 2026 (21st Rajab, 1448 H.)
              </p>
              <p className="font-elegant text-xs text-soft-black/80">
                After Namaz Maghrib • Dinner till 10:00 PM
              </p>
              <p className="font-elegant text-xs font-bold text-soft-black mt-1">
                Venue: Unity Hall, Thokkottu Mangalore
              </p>
            </div>

            <div className="text-xs font-elegant text-soft-black/70 space-y-1">
              <p className="italic">
                "A Day of togetherness, a moment of joy and emotions, a dream of every parent today a reality of us."
              </p>
              <p className="font-bold text-maroon-900 uppercase">
                YOUR PRESENCE & DUA IS OUR GREATEST GIFT
              </p>
              <p className="text-[11px] text-soft-black/50">
                Resi.: Sugandh Palace, Nityanand Nagar, Ghatkopar (W), Mumbai-400 086
              </p>
            </div>

            <button
              onClick={onOpenCardModal}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-champagne-gold/20 text-maroon-950 font-elegant text-xs font-bold hover:bg-champagne-gold/30 transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-maroon-800" />
              <span>Inspect Real Printed Card Photo</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
