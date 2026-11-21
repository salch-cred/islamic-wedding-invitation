import React, { useState, useEffect } from 'react';
import { WeddingInfo } from '../data/weddingDetails';
import { Heart, Sparkles, Send } from 'lucide-react';

interface DuaWish {
  id: string;
  name: string;
  message: string;
  date: string;
}

const DEFAULT_WISHES: DuaWish[] = [
  {
    id: '1',
    name: 'Beary & Sheikh Family',
    message: 'May Allah bless Mohammed Sinan & Aysha Zohara with infinite happiness, mutual love, and piety. Ameen!',
    date: 'Family Blessing',
  },
  {
    id: '2',
    name: 'Relatives from Mumbai & Mangalore',
    message: 'Barakallahu lakuma! May your journey together be guided with barakah, health, and endless blessings.',
    date: 'Family Blessing',
  },
];

interface DuaBlessingsProps {
  wedding: WeddingInfo;
}

export const DuaBlessings: React.FC<DuaBlessingsProps> = ({ wedding }) => {
  const [wishes, setWishes] = useState<DuaWish[]>(() => {
    try {
      const saved = localStorage.getItem('wedding_duas_sinan_aysha');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("Could not load stored duas:", e);
    }
    return DEFAULT_WISHES;
  });

  const [authorName, setAuthorName] = useState<string>('');
  const [duaText, setDuaText] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem('wedding_duas_sinan_aysha', JSON.stringify(wishes));
    } catch (e) {
      console.warn("Could not save duas:", e);
    }
  }, [wishes]);

  const handleAddDua = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !duaText.trim()) return;

    const newWish: DuaWish = {
      id: Date.now().toString(),
      name: authorName.trim(),
      message: duaText.trim(),
      date: 'Just now',
    };

    setWishes([newWish, ...wishes]);
    setAuthorName('');
    setDuaText('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="py-16 px-4 relative z-10">
      <div className="max-w-2xl mx-auto space-y-12">
        {/* Sunnah Wedding Dua Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-white/80 backdrop-blur-xl border border-champagne-gold/30 shadow-xl text-center">
          <p className="font-arabic text-2xl text-champagne-gold mb-2">
            دُعَاءُ الزَّوَاج
          </p>
          <h3 className="font-elegant text-2xl sm:text-3xl text-maroon-900 font-bold mb-6">
            Sunnah Wedding Dua
          </h3>

          <p className="font-arabic text-2xl sm:text-3xl text-maroon-900 leading-loose mb-6" dir="rtl">
            {wedding.duaText.sunnahDuaArabic}
          </p>

          <div className="flex items-center justify-center gap-3 my-5">
            <div className="w-10 h-px bg-champagne-gold/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-champagne-gold" />
            <div className="w-10 h-px bg-champagne-gold/30" />
          </div>

          <p className="font-elegant text-base sm:text-lg text-soft-black/70 italic mb-3">
            "{wedding.duaText.sunnahDuaTransliteration}"
          </p>
          <p className="font-body text-xs sm:text-sm text-soft-black/60 max-w-md mx-auto leading-relaxed">
            "{wedding.duaText.sunnahDuaTranslation}"
          </p>
        </div>

        {/* Quranic Verse Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-maroon-900 via-maroon-800 to-maroon-900 text-cream text-center shadow-xl border border-champagne-gold/40">
          <p className="font-arabic text-xl sm:text-2xl text-champagne-gold-light leading-relaxed mb-4" dir="rtl">
            {wedding.duaText.quranicVerseArabic}
          </p>
          <p className="font-elegant text-sm sm:text-base text-cream/90 italic max-w-lg mx-auto leading-relaxed">
            "{wedding.duaText.quranicVerseTranslation}"
          </p>
          <span className="font-elegant text-xs text-champagne-gold uppercase tracking-widest mt-3 block font-semibold">
            {wedding.duaText.quranicVerseRef}
          </span>
        </div>

        {/* Interactive Dua & Guest Wishes Board */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-xl border border-champagne-gold/30 shadow-xl">
          <div className="text-center mb-6">
            <p className="font-arabic text-xl text-champagne-gold mb-1">
              دَعَوَاتٌ وَ تَهَانِي
            </p>
            <h3 className="font-elegant text-2xl sm:text-3xl font-bold text-maroon-900">
              Leave Your Dua & Warm Wishes
            </h3>
            <p className="font-body text-xs text-soft-black/60 mt-1">
              Your heartfelt prayers are the greatest gift for Mohammed Sinan & Aysha Zohara
            </p>
          </div>

          <form onSubmit={handleAddDua} className="space-y-4 mb-8">
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Your Name (e.g. Uncle Farooq, Mumbai)"
              required
              className="w-full px-4 py-3 rounded-2xl bg-ivory/80 border border-champagne-gold/30 text-sm font-body text-soft-black focus:outline-none focus:ring-2 focus:ring-champagne-gold/50"
            />
            <textarea
              rows={3}
              value={duaText}
              onChange={(e) => setDuaText(e.target.value)}
              placeholder="Write your dua, blessing or congratulations here..."
              required
              className="w-full px-4 py-3 rounded-2xl bg-ivory/80 border border-champagne-gold/30 text-sm font-body text-soft-black focus:outline-none focus:ring-2 focus:ring-champagne-gold/50"
            />
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-maroon-800 text-cream font-elegant text-xs uppercase tracking-widest font-semibold hover:bg-maroon-900 transition-all shadow-md"
            >
              <Send className="w-3.5 h-3.5 text-champagne-gold" />
              <span>Send My Dua</span>
            </button>
          </form>

          {submitted && (
            <div className="p-3 mb-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center text-xs text-emerald-800 font-medium">
              JazakAllah Khair! Your blessed dua has been recorded on the wall.
            </div>
          )}

          {/* Wishes List */}
          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {wishes.map((w) => (
              <div
                key={w.id}
                className="p-4 rounded-2xl bg-ivory/60 border border-champagne-gold/20 shadow-sm text-left"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 text-maroon-700 fill-maroon-700/20" />
                    <span className="font-elegant text-sm font-bold text-maroon-900">
                      {w.name}
                    </span>
                  </div>
                  <span className="text-[10px] text-soft-black/40 font-body">
                    {w.date}
                  </span>
                </div>
                <p className="font-body text-xs sm:text-sm text-soft-black/80 leading-relaxed italic">
                  "{w.message}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
