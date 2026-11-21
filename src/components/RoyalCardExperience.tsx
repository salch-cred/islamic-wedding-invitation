import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { WeddingInfo } from '../data/weddingDetails';
import {
  BismillahGold,
  GoldCorner,
  HangingLantern,
  FloralDivider,
  MihrabArch,
  GirihWatermark,
} from './OrnamentalDecorations';
import {
  Sparkles,
  MapPin,
  Calendar as CalendarIcon,
  MessageCircle,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Download,
  Share2,
  Heart,
  Eye,
  RotateCcw,
} from 'lucide-react';

interface RoyalCardExperienceProps {
  wedding: WeddingInfo;
  guestName?: string;
  onOpenCardModal: () => void;
}

export const RoyalCardExperience: React.FC<RoyalCardExperienceProps> = ({
  wedding,
  guestName = '',
  onOpenCardModal,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Open envelope and trigger celebratory gold sparks and audio
  const handleOpenInvitation = () => {
    setIsOpen(true);

    try {
      confetti({
        particleCount: 85,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#801B2E', '#F3E5AB', '#FFFFF0', '#B8960C'],
      });
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 60,
          origin: { x: 0 },
          colors: ['#D4AF37', '#801B2E', '#F3E5AB'],
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 60,
          origin: { x: 1 },
          colors: ['#D4AF37', '#801B2E', '#F3E5AB'],
        });
      }, 250);
    } catch (e) {
      console.warn("Confetti error:", e);
    }

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().then(() => {
        setIsAudioPlaying(true);
      }).catch(console.warn);
    }
  };

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isAudioPlaying) {
      audioRef.current.pause();
      setIsAudioPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsAudioPlaying(true)).catch(console.warn);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    const next = !isAudioMuted;
    audioRef.current.muted = next;
    setIsAudioMuted(next);
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

  // Download .ics Apple / Outlook
  const handleDownloadICS = () => {
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Mohammed Sinan & Aysha Zohara Wedding//EN',
      'BEGIN:VEVENT',
      'UID:wedding-sinan-aysha-20261231@dollyeo',
      'DTSTART:20261231T130000Z',
      'DTEND:20261231T170000Z',
      `SUMMARY:Wedding Ceremony - ${wedding.groom.name} & ${wedding.bride.name}`,
      `DESCRIPTION:Mrs. & Mr. Mohammed Hussain Beary solicit your blessings for the wedding ceremony of ${wedding.groom.name} with ${wedding.bride.name}. Nikah after Maghrib, dinner till 10 PM.`,
      `LOCATION:${wedding.event.venueName}, ${wedding.event.venueAddress}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'wedding-sinan-aysha.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Wedding Invitation - ${wedding.groom.name} & ${wedding.bride.name}`,
          text: `You are cordially invited to the wedding ceremony of Mohammed Sinan & Aysha Zohara on 31st December 2026.`,
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
    <div className="relative min-h-screen w-full flex flex-col items-center justify-start py-8 px-3 sm:px-6 bg-gradient-to-b from-[#2B060D] via-[#1B0307] to-[#100103] text-soft-black overflow-x-hidden">
      
      {/* Background Audio */}
      <audio
        ref={audioRef}
        src="/audio/wedding-audio.mp3"
        loop
        preload="auto"
        onPlay={() => setIsAudioPlaying(true)}
        onPause={() => setIsAudioPlaying(false)}
      />

      {/* Hanging Lanterns from the Royal Arch Roof */}
      <div className="fixed top-0 left-4 sm:left-12 z-30 pointer-events-none">
        <HangingLantern delay="0s" />
      </div>
      <div className="fixed top-0 left-16 sm:left-32 z-30 pointer-events-none hidden xs:block">
        <HangingLantern delay="1.2s" style={{ transform: 'scale(0.85)' }} />
      </div>
      <div className="fixed top-0 right-16 sm:right-32 z-30 pointer-events-none hidden xs:block">
        <HangingLantern delay="0.6s" style={{ transform: 'scale(0.85)' }} />
      </div>
      <div className="fixed top-0 right-4 sm:right-12 z-30 pointer-events-none">
        <HangingLantern delay="1.8s" />
      </div>

      {/* Floating Audio Control Pill */}
      <div className="fixed top-4 right-4 sm:right-6 z-50 flex items-center gap-2 p-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-champagne-gold/40 shadow-2xl">
        <button
          onClick={toggleAudio}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-maroon-900/80 hover:bg-maroon-800 text-cream text-xs font-elegant uppercase tracking-wider transition-all"
        >
          {isAudioPlaying ? (
            <span className="flex items-end gap-0.5 h-3">
              <span className="w-0.5 bg-champagne-gold h-2 animate-[pulse_0.6s_infinite]" />
              <span className="w-0.5 bg-champagne-gold h-3 animate-[pulse_0.8s_infinite_0.2s]" />
              <span className="w-0.5 bg-champagne-gold h-1.5 animate-[pulse_0.7s_infinite_0.4s]" />
            </span>
          ) : (
            <Play className="w-3.5 h-3.5 text-champagne-gold fill-champagne-gold" />
          )}
          <span className="text-[11px] font-semibold text-champagne-gold">
            {isAudioPlaying ? 'Music On' : 'Play Music'}
          </span>
        </button>

        <button
          onClick={toggleMute}
          className="p-1.5 rounded-full hover:bg-white/10 text-champagne-gold transition-colors"
        >
          {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {isOpen && (
          <button
            onClick={() => setIsOpen(false)}
            title="Fold Card / Replay Envelope"
            className="p-1.5 rounded-full hover:bg-white/10 text-champagne-gold/70 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* ======================================================== */}
      {/* STAGE 1: ROYAL CLOSED ENVELOPE WITH WAX SEAL */}
      {/* ======================================================== */}
      {!isOpen ? (
        <div className="relative z-20 w-full max-w-lg my-auto py-12 px-2 text-center animate-[fadeIn_0.8s_ease-out]">
          
          {/* Top Calligraphy Greeting */}
          <div className="mb-6">
            <BismillahGold />
            <p className="font-elegant text-xs uppercase tracking-[0.25em] text-champagne-gold/90 font-semibold mt-3">
              In The Name of Allah, The Most Beneficent & Merciful
            </p>
          </div>

          {/* The Luxury 3D Envelope */}
          <div
            onClick={handleOpenInvitation}
            className="group relative mx-auto w-full max-w-md bg-gradient-to-br from-[#FFFDF8] via-[#FAF6ED] to-[#F3ECE0] rounded-3xl p-8 sm:p-10 border-2 border-champagne-gold/60 shadow-[0_20px_70px_rgba(0,0,0,0.5)] cursor-pointer hover:scale-[1.02] transition-all duration-500"
          >
            {/* Girih Islamic Watermark */}
            <GirihWatermark />

            {/* Corner Filigree */}
            <GoldCorner position="tl" className="w-16 h-16 sm:w-20 sm:h-20" />
            <GoldCorner position="tr" className="w-16 h-16 sm:w-20 sm:h-20" />
            <GoldCorner position="bl" className="w-16 h-16 sm:w-20 sm:h-20" />
            <GoldCorner position="br" className="w-16 h-16 sm:w-20 sm:h-20" />

            {/* Inner Gold Inset Frame */}
            <div className="absolute inset-3 sm:inset-4 rounded-2xl border border-dashed border-champagne-gold/50 pointer-events-none" />

            {/* Envelope Header */}
            <p className="font-elegant text-[11px] uppercase tracking-[0.3em] text-maroon-800 font-bold mb-2">
              ROYAL WEDDING INVITATION
            </p>

            <p className="font-elegant text-sm text-soft-black/70 italic mb-4">
              Mrs. & Mr. Mohammed Hussain Beary
            </p>

            <p className="font-body text-xs text-soft-black/60 max-w-xs mx-auto mb-6 leading-relaxed">
              request the honor of your presence & prayers on the auspicious wedding ceremony of their son
            </p>

            {/* Couple Calligraphy */}
            <div className="my-5">
              <h2 className="font-calligraphy text-4xl sm:text-5xl text-maroon-900 leading-tight">
                {wedding.groom.name}
              </h2>

              <div className="flex items-center justify-center gap-3 my-2">
                <div className="w-12 h-px bg-champagne-gold/50" />
                <span className="font-calligraphy text-2xl text-champagne-gold">&</span>
                <div className="w-12 h-px bg-champagne-gold/50" />
              </div>

              <h2 className="font-calligraphy text-4xl sm:text-5xl text-maroon-900 leading-tight">
                {wedding.bride.name}
              </h2>
            </div>

            {/* Date Tag */}
            <div className="inline-block px-5 py-1.5 rounded-full bg-champagne-gold/15 border border-champagne-gold/40 shadow-sm my-3">
              <p className="font-elegant text-xs sm:text-sm font-semibold tracking-wider text-maroon-900">
                {wedding.event.dateFormatted} • {wedding.event.hijriDate}
              </p>
            </div>

            {/* Personalized Guest Badge */}
            {guestName && (
              <div className="my-4 p-2.5 rounded-2xl bg-maroon-100/60 border border-maroon-300/50 inline-block shadow-sm">
                <p className="font-elegant text-[10px] uppercase tracking-widest text-maroon-800 font-bold">
                  Specially Invited Honored Guest
                </p>
                <p className="font-calligraphy text-2xl text-maroon-950 mt-0.5">
                  {guestName}
                </p>
              </div>
            )}

            {/* 3D Wax Seal Button with Pulsing Shimmer */}
            <div className="mt-6 flex flex-col items-center">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full wax-seal border-2 border-champagne-gold/60 flex items-center justify-center shadow-[0_10px_30px_rgba(99,21,38,0.5)] group-hover:scale-105 group-active:scale-95 transition-transform duration-300">
                {/* Embossed inner dashed ring */}
                <div className="absolute inset-1.5 rounded-full border border-dashed border-champagne-gold/40" />
                
                {/* Gold Seal Motif */}
                <div className="text-center text-champagne-gold select-none pointer-events-none">
                  <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 mx-auto mb-0.5 text-champagne-gold group-hover:rotate-12 transition-transform" />
                  <span className="text-[10px] sm:text-xs font-elegant font-bold tracking-[0.2em] uppercase text-champagne-gold/90 block">
                    OPEN
                  </span>
                </div>
              </div>

              {/* Pulsing Text */}
              <div className="mt-5 flex items-center gap-2 px-6 py-2.5 rounded-full bg-maroon-900 text-cream text-xs uppercase tracking-widest font-elegant font-bold shadow-xl border border-champagne-gold/50 group-hover:bg-maroon-950 transition-colors">
                <Heart className="w-3.5 h-3.5 text-champagne-gold fill-champagne-gold" />
                <span>Tap To Unseal Invitation</span>
                <Sparkles className="w-3.5 h-3.5 text-champagne-gold" />
              </div>

              <p className="font-elegant text-xs text-soft-black/50 mt-2.5 italic">
                (Plays wedding nasheed & unfolds royal card)
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* ======================================================== */
        /* STAGE 2: ROYAL UNFOLDED HEIRLOOM INVITATION BOOKLET */
        /* Faithfully replicating the physical printed card with */
        /* handcrafted vector filigree, zero AI distortion!       */
        /* ======================================================== */
        <div className="relative z-20 w-full max-w-4xl my-auto py-8 animate-[fadeIn_0.7s_ease-out]">
          
          {/* Main 2-Page Heirloom Booklet Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            
            {/* ---------------------------------------------------- */}
            {/* LEFT PAGE: POETRY, COMPLIMENTS & RESIDENCE          */}
            {/* ---------------------------------------------------- */}
            <div className="relative rounded-3xl bg-gradient-to-b from-[#FFFDF8] via-[#FAF6ED] to-[#F3ECE0] p-6 sm:p-10 border-2 border-champagne-gold/60 shadow-[0_20px_60px_rgba(0,0,0,0.35)] flex flex-col justify-between text-center overflow-hidden">
              <GirihWatermark />
              <GoldCorner position="tl" className="w-16 h-16 sm:w-20 sm:h-20" />
              <GoldCorner position="tr" className="w-16 h-16 sm:w-20 sm:h-20" />
              <GoldCorner position="bl" className="w-16 h-16 sm:w-20 sm:h-20" />
              <GoldCorner position="br" className="w-16 h-16 sm:w-20 sm:h-20" />
              
              {/* Inner Border */}
              <div className="absolute inset-3 rounded-2xl border border-dashed border-champagne-gold/40 pointer-events-none" />

              <div className="relative z-10 space-y-6 my-auto py-4">
                {/* Top Floral Accent */}
                <FloralDivider className="my-2" />

                {/* Heirloom Poetry (Word-for-word from Physical Card) */}
                <div className="space-y-2">
                  <p className="font-elegant text-lg sm:text-xl text-maroon-900 font-semibold leading-relaxed">
                    A Day of togetherness,
                  </p>
                  <p className="font-elegant text-base sm:text-lg text-maroon-800/90 italic leading-relaxed px-2">
                    "A moment of joy and emotions,<br />
                    a dream of every parent today a reality of us"
                  </p>
                </div>

                <FloralDivider className="my-4" />

                {/* With Best Compliments From */}
                <div className="py-2">
                  <p className="font-elegant text-xs uppercase tracking-[0.2em] text-[#9A6A32] font-bold mb-1">
                    WITH BEST COMPLIMENTS FROM :
                  </p>
                  <p className="font-calligraphy text-3xl sm:text-4xl text-maroon-950 font-bold">
                    Relatives & Friends
                  </p>
                </div>

                {/* Gift Note Plaque */}
                <div className="my-4 p-3 rounded-2xl bg-champagne-gold/20 border-2 border-champagne-gold/50 shadow-sm inline-block">
                  <p className="font-elegant text-xs sm:text-sm font-bold uppercase tracking-wider text-maroon-950">
                    YOUR PRESENCE & DUA IS OUR GREATEST GIFT
                  </p>
                </div>

                {/* Residence */}
                <div className="pt-4 border-t border-champagne-gold/30">
                  <p className="font-elegant text-[11px] uppercase tracking-widest text-soft-black/50 font-semibold mb-1">
                    Resi. :
                  </p>
                  <p className="font-elegant text-sm font-medium text-maroon-900">
                    {wedding.residence.line1}
                  </p>
                  <p className="font-elegant text-sm text-soft-black/70">
                    {wedding.residence.line2} {wedding.residence.cityPincode}
                  </p>
                </div>
              </div>
            </div>

            {/* ---------------------------------------------------- */}
            {/* RIGHT PAGE: THE ROYAL CEREMONY INVITATION MIHRAB     */}
            {/* ---------------------------------------------------- */}
            <div className="relative rounded-3xl bg-gradient-to-b from-[#FFFDF8] via-[#FAF6ED] to-[#F3ECE0] p-6 sm:p-10 border-2 border-champagne-gold/60 shadow-[0_20px_60px_rgba(0,0,0,0.35)] flex flex-col justify-between text-center overflow-hidden">
              <GirihWatermark />
              <GoldCorner position="tl" className="w-16 h-16 sm:w-20 sm:h-20" />
              <GoldCorner position="tr" className="w-16 h-16 sm:w-20 sm:h-20" />
              <GoldCorner position="bl" className="w-16 h-16 sm:w-20 sm:h-20" />
              <GoldCorner position="br" className="w-16 h-16 sm:w-20 sm:h-20" />

              {/* Inner Border */}
              <div className="absolute inset-3 rounded-2xl border border-dashed border-champagne-gold/40 pointer-events-none" />

              <div className="relative z-10 space-y-4 my-auto py-2">
                {/* Bismillah in Gold */}
                <BismillahGold />

                <p className="font-elegant text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#9A6A32] font-bold">
                  IN THE NAME OF ALLAH THE MOST BENEFICENT & MOST MERCIFUL
                </p>

                {/* Parents' Prayer from Physical Card */}
                <p className="font-elegant text-xs sm:text-sm text-maroon-900 italic max-w-sm mx-auto leading-relaxed">
                  "Oh Allah guide this marriage to the best of understanding, happiness, prosperity & success — Ameen"
                </p>

                {/* Hosts */}
                <div className="my-2">
                  <p className="font-calligraphy text-2xl sm:text-3xl text-maroon-950 font-bold">
                    Mrs. & Mr.
                  </p>
                  <h3 className="font-calligraphy text-3xl sm:text-4xl text-maroon-900 font-bold leading-tight">
                    Mohammed Hussain Beary
                  </h3>
                  <p className="font-body text-[11px] sm:text-xs text-soft-black/70 max-w-xs mx-auto mt-1 leading-relaxed">
                    solicit your blessing & request the pleasure of your family on the occasion of the wedding ceremony of their son
                  </p>
                </div>

                {/* Groom */}
                <div className="my-2">
                  <h2 className="font-elegant text-2xl sm:text-3xl font-bold tracking-wide text-maroon-900 uppercase">
                    {wedding.groom.name}
                  </h2>
                  <p className="font-elegant text-[10px] sm:text-[11px] text-[#8C6B45] italic mt-0.5">
                    ({wedding.groom.grandparents})
                  </p>
                </div>

                {/* WITH */}
                <div className="flex items-center justify-center gap-3 my-1">
                  <div className="w-8 h-px bg-champagne-gold/50" />
                  <span className="font-elegant text-xs uppercase tracking-widest text-champagne-gold font-bold">
                    === WITH ===
                  </span>
                  <div className="w-8 h-px bg-champagne-gold/50" />
                </div>

                {/* Bride */}
                <div className="my-2">
                  <h2 className="font-elegant text-2xl sm:text-3xl font-bold tracking-wide text-maroon-900 uppercase">
                    {wedding.bride.name}
                  </h2>
                  <p className="font-elegant text-[10px] sm:text-[11px] text-[#8C6B45] italic mt-0.5">
                    ({wedding.bride.father})
                  </p>
                </div>

                {/* Insha Allah */}
                <p className="font-calligraphy text-2xl text-champagne-gold font-bold">
                  Insha Allah
                </p>

                {/* Nikah Time & Hijri Date */}
                <div className="py-2 px-3 rounded-2xl bg-champagne-gold/15 border border-champagne-gold/40">
                  <p className="font-elegant text-xs sm:text-sm font-bold text-maroon-900">
                    Nikah : On Thursday, 31st December, 2026
                  </p>
                  <p className="font-elegant text-xs text-soft-black/70 italic">
                    (21st Rajab, 1448 H.) After Namaz Maghrib
                  </p>
                  <p className="font-elegant text-xs font-semibold text-maroon-800 mt-0.5">
                    Followed by Dinner till 10-00 p.m.
                  </p>
                </div>

                {/* Venue */}
                <div className="pt-2">
                  <p className="font-elegant text-[10px] uppercase tracking-widest text-[#9A6A32] font-bold">
                    VENUE :
                  </p>
                  <h4 className="font-elegant text-lg sm:text-xl font-bold text-maroon-950">
                    Unity Hall, Thokkottu Mangalore
                  </h4>
                </div>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* INTERACTIVE ACTION DOCK & DUA BAR                        */}
          {/* ======================================================== */}
          <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-xl border-2 border-champagne-gold/50 shadow-2xl text-center">
            <h4 className="font-elegant text-xl sm:text-2xl font-bold text-maroon-900 mb-2">
              Guest Services & Directions
            </h4>
            <p className="font-body text-xs text-soft-black/60 mb-6">
              One-click actions to navigate, RSVP, and add to your calendar
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              {/* Google Maps */}
              <a
                href={wedding.event.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-maroon-900 text-cream font-elegant text-xs uppercase tracking-widest font-bold shadow-md hover:bg-maroon-950 transition-all border border-champagne-gold/40"
              >
                <MapPin className="w-4 h-4 text-champagne-gold" />
                <span>Google Maps</span>
              </a>

              {/* WhatsApp RSVP */}
              <a
                href={`https://wa.me/${wedding.contact.whatsappDefaultNumber}?text=${encodeURIComponent(
                  `Assalamu Alaikum! I am ${guestName || 'a guest'} and I will be attending the wedding ceremony of Mohammed Sinan & Aysha Zohara on 31st December 2026 Insha Allah.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-emerald-700 text-white font-elegant text-xs uppercase tracking-widest font-bold shadow-md hover:bg-emerald-800 transition-all"
              >
                <MessageCircle className="w-4 h-4 text-emerald-200" />
                <span>RSVP WhatsApp</span>
              </a>

              {/* Google Calendar */}
              <button
                onClick={handleCalendar}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-white text-maroon-950 border border-champagne-gold/50 font-elegant text-xs uppercase tracking-widest font-bold shadow-sm hover:bg-champagne-gold/10 transition-all"
              >
                <CalendarIcon className="w-4 h-4 text-champagne-gold" />
                <span>Google Calendar</span>
              </button>

              {/* Apple iCal */}
              <button
                onClick={handleDownloadICS}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-white text-maroon-950 border border-champagne-gold/50 font-elegant text-xs uppercase tracking-widest font-bold shadow-sm hover:bg-champagne-gold/10 transition-all"
              >
                <Download className="w-4 h-4 text-maroon-700" />
                <span>Apple / iCal</span>
              </button>
            </div>

            {/* Secondary Controls: Share & View Original Card Photo */}
            <div className="mt-6 pt-5 border-t border-champagne-gold/20 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={onOpenCardModal}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-champagne-gold/15 text-maroon-900 border border-champagne-gold/40 text-xs font-elegant font-semibold hover:bg-champagne-gold/25 transition-all"
              >
                <Eye className="w-4 h-4 text-maroon-700" />
                <span>View Real Printed Card Photo</span>
              </button>

              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-champagne-gold/15 text-maroon-900 border border-champagne-gold/40 text-xs font-elegant font-semibold hover:bg-champagne-gold/25 transition-all"
              >
                <Share2 className="w-4 h-4 text-maroon-700" />
                <span>{copied ? 'Link Copied!' : 'Share Invitation'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
