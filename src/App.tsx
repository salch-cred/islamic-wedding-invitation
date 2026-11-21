import React, { useState, useEffect, useMemo } from 'react';
import { weddingDetails, WeddingInfo } from './data/weddingDetails';
import { BackgroundElements } from './components/BackgroundElements';
import { AudioPlayer } from './components/AudioPlayer';
import { EnvelopeModal } from './components/EnvelopeModal';
import { HeroSection } from './components/HeroSection';
import { CardFlapMessage } from './components/CardFlapMessage';
import { CountdownTimer } from './components/CountdownTimer';
import { CeremonyTimeline } from './components/CeremonyTimeline';
import { VenueLocation } from './components/VenueLocation';
import { QuickActions } from './components/QuickActions';
import { DuaBlessings } from './components/DuaBlessings';
import { VideoModal } from './components/VideoModal';
import { OriginalCardModal } from './components/OriginalCardModal';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState<boolean>(false);
  const [audioTrigger, setAudioTrigger] = useState<boolean>(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState<boolean>(false);
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

  // Merge custom contact phone if provided
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

  const handleOpenInvitation = () => {
    setIsEnvelopeOpen(true);
    setAudioTrigger(true);
    // Smooth scroll to top of page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReopenEnvelope = () => {
    setIsEnvelopeOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Prevent background scrolling while envelope is active
  useEffect(() => {
    if (!isEnvelopeOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isEnvelopeOpen]);

  return (
    <div className="min-h-screen bg-ivory text-soft-black relative selection:bg-champagne-gold/20 selection:text-maroon-900 font-body overflow-x-hidden">
      {/* Background Ambience & Floating Rose Petals */}
      <BackgroundElements showPetals={showPetals} />

      {/* Persistent Audio Player with WhatsApp Audio Voice / Nasheed */}
      <AudioPlayer autoPlayTrigger={audioTrigger} />

      {/* Step 1: Royal Envelope Opening Welcome Modal */}
      {!isEnvelopeOpen && (
        <EnvelopeModal
          guestName={guestName}
          groomName={wedding.groom.name}
          brideName={wedding.bride.name}
          date={wedding.event.dateFormatted}
          onOpen={handleOpenInvitation}
        />
      )}

      {/* Main Wedding Invitation Card Experience */}
      <main className={`relative z-10 transition-opacity duration-1000 ${isEnvelopeOpen ? 'opacity-100' : 'opacity-0'}`}>
        {/* Hero Section */}
        <HeroSection
          wedding={wedding}
          onOpenVideoModal={() => setIsVideoModalOpen(true)}
          onOpenCardModal={() => setIsCardModalOpen(true)}
        />

        {/* Card Left Flap Poetry & Residence */}
        <CardFlapMessage wedding={wedding} />

        {/* Live Countdown Timer */}
        <CountdownTimer targetDate={wedding.event.isoDateTime} />

        {/* Program Timeline */}
        <CeremonyTimeline />

        {/* Venue & Location Direction Hub */}
        <VenueLocation wedding={wedding} />

        {/* Quick Actions (WhatsApp RSVP & Personalizer) */}
        <QuickActions wedding={wedding} initialGuestName={guestName} />

        {/* Duas, Sunnah Blessings & Guest Wishes Wall */}
        <DuaBlessings wedding={wedding} />

        {/* Footer with Couple Signatures and Envelope Replay */}
        <Footer
          wedding={wedding}
          onReopenEnvelope={handleReopenEnvelope}
          showPetals={showPetals}
          onTogglePetals={() => setShowPetals(!showPetals)}
        />
      </main>

      {/* Video Invitation Reel Lightbox Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />

      {/* Original Printed Card Lightbox Modal */}
      <OriginalCardModal
        isOpen={isCardModalOpen}
        onClose={() => setIsCardModalOpen(false)}
      />
    </div>
  );
};
export default App;
