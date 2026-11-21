import React from 'react';
import { X, Heart, Eye } from 'lucide-react';

interface OriginalCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OriginalCardModal: React.FC<OriginalCardModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-[fadeIn_0.3s_ease-out]">
      <div className="relative w-full max-w-lg bg-stone-900 rounded-3xl overflow-hidden border border-champagne-gold/30 shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-stone-950 border-b border-stone-800 text-cream">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-maroon-500 fill-maroon-500/30" />
            <span className="font-elegant text-xs uppercase tracking-widest font-semibold">
              Original Printed Card
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Card Image */}
        <div className="relative p-2 overflow-y-auto bg-stone-950/70 flex items-center justify-center">
          <img
            src="/images/original-card.jpg"
            alt="Original Printed Wedding Card - Mohammed Sinan & Aysha Zohara"
            className="max-h-[70vh] w-auto object-contain rounded-xl shadow-lg"
          />
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-950 text-center border-t border-stone-800">
          <p className="font-elegant text-xs text-stone-300">
            Physical Invitation Card of Mohammed Sinan & Aysha Zohara
          </p>
          <p className="text-[10px] text-stone-500 mt-0.5">
            Thursday, 31st December 2026 • Unity Hall, Thokkottu Mangalore
          </p>
        </div>
      </div>
    </div>
  );
};
