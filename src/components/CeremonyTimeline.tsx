import React from 'react';
import { Moon, Sparkles, Utensils, HeartHandshake } from 'lucide-react';

export const CeremonyTimeline: React.FC = () => {
  const events = [
    {
      time: "After Namaz Maghrib",
      title: "Maghrib Prayer & Welcome",
      description: "Arrival of family, relatives and honored guests at Unity Hall.",
      icon: Moon,
    },
    {
      time: "Evening Ceremony",
      title: "Nikah Solemnization",
      description: "The sacred Islamic marriage contract between Mohammed Sinan & Aysha Zohara.",
      icon: Sparkles,
    },
    {
      time: "7:30 PM Onwards",
      title: "Duas & Congratulatory Blessings",
      description: "Offering du'a and felicitations to the newlyweds and families.",
      icon: HeartHandshake,
    },
    {
      time: "Till 10:00 PM",
      title: "Grand Wedding Dinner",
      description: "A traditional celebratory dinner banquet served for all guests.",
      icon: Utensils,
    },
  ];

  return (
    <section className="py-14 px-4 relative z-10">
      <div className="max-w-xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <p className="font-arabic text-xl text-champagne-gold mb-1">
            بَرَامِجُ الحَفْل
          </p>
          <h2 className="font-elegant text-2xl sm:text-3xl text-maroon-900 font-semibold">
            Wedding Program
          </h2>
          <p className="font-body text-xs text-soft-black/60 mt-1">
            Schedule of the blessed day's auspicious ceremonies
          </p>
        </div>

        {/* Timeline Items */}
        <div className="relative pl-6 sm:pl-8 border-l-2 border-champagne-gold/30 space-y-8 my-6 ml-2 sm:ml-4">
          {events.map((ev, idx) => {
            const Icon = ev.icon;
            return (
              <div key={idx} className="relative group">
                {/* Timeline Node Bullet */}
                <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-8 h-8 rounded-full bg-white border-2 border-champagne-gold shadow-md flex items-center justify-center group-hover:scale-110 group-hover:bg-maroon-800 transition-all">
                  <Icon className="w-4 h-4 text-maroon-800 group-hover:text-cream transition-colors" />
                </div>

                {/* Content Box */}
                <div className="p-4 sm:p-5 rounded-2xl bg-white/75 backdrop-blur-md border border-champagne-gold/25 shadow-sm group-hover:shadow-md transition-shadow">
                  <span className="font-elegant text-xs uppercase tracking-widest text-maroon-700 font-bold block mb-1">
                    {ev.time}
                  </span>
                  <h3 className="font-elegant text-lg sm:text-xl text-soft-black font-semibold">
                    {ev.title}
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-soft-black/70 mt-1 leading-relaxed">
                    {ev.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
