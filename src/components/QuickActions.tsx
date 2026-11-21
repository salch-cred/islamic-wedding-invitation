import React, { useState } from 'react';
import { WeddingInfo } from '../data/weddingDetails';
import { MessageCircle, Share2, Check, Send } from 'lucide-react';

interface QuickActionsProps {
  wedding: WeddingInfo;
  initialGuestName?: string;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  wedding,
  initialGuestName = '',
}) => {
  const [guestName, setGuestName] = useState<string>(initialGuestName);
  const [attendance, setAttendance] = useState<string>('yes');
  const [guestCount, setGuestCount] = useState<number>(2);
  const [copied, setCopied] = useState<boolean>(false);

  const handleSendWhatsAppRSVP = (e: React.FormEvent) => {
    e.preventDefault();
    const nameStr = guestName.trim() || 'A guest';
    let statusText = '';
    if (attendance === 'yes') {
      statusText = `will be attending the wedding with joy Insha Allah (Count: ${guestCount} person${guestCount > 1 ? 's' : ''}).`;
    } else if (attendance === 'family') {
      statusText = `will be attending with the entire family with joy Insha Allah (Count: ${guestCount} persons).`;
    } else {
      statusText = `send my heartfelt prayers & congratulations for Mohammed Sinan & Aysha Zohara, though regretfully unable to attend in person.`;
    }

    const message = `Assalamu Alaikum!\n\nI am *${nameStr}* and I ${statusText}\n\nMay Allah shower His blessings upon Mohammed Sinan & Aysha Zohara and grant them eternal happiness. Ameen!`;

    // If a phone number is provided, use it; else open WhatsApp share prompt
    const waUrl = wedding.contact.whatsappDefaultNumber
      ? `https://wa.me/${wedding.contact.whatsappDefaultNumber}?text=${encodeURIComponent(message)}`
      : `https://wa.me/?text=${encodeURIComponent(message)}`;

    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleShareLink = async () => {
    const url = window.location.href;
    const shareData = {
      title: `Wedding Ceremony - ${wedding.groom.name} & ${wedding.bride.name}`,
      text: `In the Name of Allah, you are cordially invited to the wedding ceremony of Mohammed Sinan & Aysha Zohara on 31st Dec 2026.`,
      url: url,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.warn("Share cancelled or failed:", err);
      }
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <section className="py-14 px-4 relative z-10" id="rsvp">
      <div className="max-w-xl mx-auto">
        {/* RSVP Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/85 backdrop-blur-xl border border-champagne-gold/30 shadow-2xl">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200/60 flex items-center justify-center mx-auto mb-3">
              <MessageCircle className="w-6 h-6 text-emerald-600" />
            </div>
            <p className="font-arabic text-xl text-champagne-gold mb-0.5">
              تَأْكِيدُ الحُضُور
            </p>
            <h3 className="font-elegant text-2xl sm:text-3xl font-bold text-maroon-900">
              Confirm Your Attendance (RSVP)
            </h3>
            <p className="font-body text-xs text-soft-black/60 mt-1">
              Please let us know your presence via WhatsApp
            </p>
          </div>

          <form onSubmit={handleSendWhatsAppRSVP} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-widest font-elegant font-semibold text-soft-black/70 mb-1">
                Your Full Name
              </label>
              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="e.g. Brother Farooq & Family"
                className="w-full px-4 py-3 rounded-2xl bg-ivory/80 border border-champagne-gold/30 text-sm font-body text-soft-black focus:outline-none focus:ring-2 focus:ring-champagne-gold/50"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest font-elegant font-semibold text-soft-black/70 mb-1">
                Will You Attend?
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs font-body">
                <button
                  type="button"
                  onClick={() => setAttendance('yes')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    attendance === 'yes'
                      ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                      : 'bg-white text-soft-black/80 border-champagne-gold/25 hover:bg-emerald-50'
                  }`}
                >
                  ✓ Attending Insha Allah
                </button>
                <button
                  type="button"
                  onClick={() => setAttendance('family')}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    attendance === 'family'
                      ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                      : 'bg-white text-soft-black/80 border-champagne-gold/25 hover:bg-emerald-50'
                  }`}
                >
                  👨‍👩‍👧‍👦 Attending with Family
                </button>
              </div>
            </div>

            {attendance !== 'no' && (
              <div>
                <label className="block text-xs uppercase tracking-widest font-elegant font-semibold text-soft-black/70 mb-1">
                  Total Attendees
                </label>
                <select
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-2xl bg-ivory/80 border border-champagne-gold/30 text-sm font-body text-soft-black focus:outline-none"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 10].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Person' : 'Persons'}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-emerald-600 text-white font-elegant text-sm uppercase tracking-widest font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-900/15 transition-all mt-6"
            >
              <Send className="w-4 h-4 text-emerald-200" />
              <span>Send RSVP via WhatsApp</span>
            </button>
          </form>

          {/* Share Invitation Link */}
          <div className="mt-8 pt-6 border-t border-champagne-gold/20 flex items-center justify-between gap-4">
            <span className="font-elegant text-xs text-soft-black/60">
              Share this digital invitation with family:
            </span>
            <button
              onClick={handleShareLink}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-champagne-gold/15 text-maroon-900 border border-champagne-gold/30 text-xs font-elegant font-semibold hover:bg-champagne-gold/25 transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? "Link Copied!" : "Share Link"}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
