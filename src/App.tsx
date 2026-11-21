import React, { useState } from 'react';
import { VideoInvitationExperience } from './components/VideoInvitationExperience';
import { OriginalCardModal } from './components/OriginalCardModal';

export const App: React.FC = () => {
  const [isCardModalOpen, setIsCardModalOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-black text-cream relative selection:bg-champagne-gold/20 selection:text-maroon-900 font-body overflow-x-hidden">
      {/* 1. Main Animated Video Invitation Flow (Exact Video & Voice from WhatsApp) */}
      <VideoInvitationExperience
        onOpenCardModal={() => setIsCardModalOpen(true)}
      />

      {/* 2. Lightbox Modal for Original Printed Card Photo */}
      <OriginalCardModal
        isOpen={isCardModalOpen}
        onClose={() => setIsCardModalOpen(false)}
      />
    </div>
  );
};

export default App;
