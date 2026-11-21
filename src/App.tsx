import React, { useState } from 'react';
import { PhysicalCardReplica } from './components/PhysicalCardReplica';
import { OriginalCardModal } from './components/OriginalCardModal';

export const App: React.FC = () => {
  const [isCardPhotoOpen, setIsCardPhotoOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-[#EFE9DF] text-[#7E1B31] font-elegant antialiased selection:bg-[#C5A059]/30 selection:text-[#7E1B31]">
      {/* Handcrafted Physical Card Replica (100% Zero AI Slop, Exact Card Names & Details, Mobile & Desktop Optimized) */}
      <PhysicalCardReplica onOpenCardPhoto={() => setIsCardPhotoOpen(true)} />

      {/* Real Printed Card Photo Lightbox */}
      <OriginalCardModal
        isOpen={isCardPhotoOpen}
        onClose={() => setIsCardPhotoOpen(false)}
      />
    </div>
  );
};

export default App;
