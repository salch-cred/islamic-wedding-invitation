import React, { useState, useMemo } from 'react';
import { weddingDetails, WeddingInfo } from './data/weddingDetails';
import { RoyalCardExperience } from './components/RoyalCardExperience';
import { CountdownTimer } from './components/CountdownTimer';
import { CeremonyTimeline } from './components/CeremonyTimeline';
import { VenueLocation } from './components/VenueLocation';
import { QuickActions } from './components/QuickActions';
import { DuaBlessings } from './components/DuaBlessings';
import { OriginalCardModal } from './components/OriginalCardModal';
import { VideoModal } from './components/VideoModal';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [isCardModalOpen, setIsCardModalOpen] = useState<boolean>(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);
  const [showPetals, setShowPetals] = useState<boolean>(true);

  // Extract query parameters for guest personalization
  const searchParams = useMemo(() => {
    if (typeof window !== 'undefined') {
      return new URLSearchParams(window.location.search);
    }
    return new URLSearchParams();
  }, []);

  const guestName = searchParams.get('guest') || searchParams.get('g') || '';
  const customPhone = searchParams.get('phone') || '';

  const wedding: WeddingInfo = useMemo(() => {
    if (!customPhone) return weddingDetails;
    return {
      ...weddingDetails,
      contact: {
        ...weddingDetails.contact,
        whatsappDefaultNumber: customPhone,
      },
    };
  }, [customPhone]);

  return (
    <div className="min-h-screen bg-[#1A0307] text-soft-black relative selection:bg-champagne-gold/20 selection:text-maroon-900 font-body overflow-x-hidden">
      
      {/* 1. Main Royal Heirloom Wedding Card Experience (Zero AI slop, pure vector artistry) */}
      <RoyalCardExperience
        wedding={wedding}
        guestName={guestName}
        onOpenCardModal={() => setIsCardModalOpen(true)}
      />

      {/* 2. Interactive Below-the-Fold Wedding Hub */}
      <div className="relative z-10 bg-[#FAF8F5] text-soft-black border-t-2 border-champagne-gold/40">
        
        {/* Live Countdown Timer */}
        <CountdownTimer targetDate={wedding.event.isoDateTime} />

        {/* Auspicious Ceremony Timeline */}
        <CeremonyTimeline />

        {/* Venue Location & Navigation Hub */}
        <VenueLocation wedding={wedding} />

        {/* WhatsApp RSVP Form */}
        <QuickActions wedding={wedding} initialGuestName={guestName} />

        {/* Sunnah Wedding Dua & Community Dua Wishes Wall */}
        <DuaBlessings wedding={wedding} />

        {/* Royal Signature Footer */}
        <Footer
          wedding={wedding}
          onReopenEnvelope={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          showPetals={showPetals}
          onTogglePetals={() => setShowPetals(!showPetals)}
        />
      </div>

      {/* Original Printed Card Lightbox Modal */}
      <OriginalCardModal
        isOpen={isCardModalOpen}
        onClose={() => setIsCardModalOpen(false)}
      />

      {/* Video Reel Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />
    </div>
  );
};

export default App;
