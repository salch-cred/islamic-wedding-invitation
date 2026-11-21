import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  targetDate: string; // ISO format
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPassed: boolean;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPassed: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isPassed: false });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <section className="py-12 px-4 relative z-10 text-center">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-2 text-champagne-gold">
          <Clock className="w-4 h-4" />
          <span className="font-elegant text-xs uppercase tracking-widest text-soft-black/60 font-semibold">
            Countdown To Blessed Union
          </span>
        </div>
        <h3 className="font-elegant text-2xl sm:text-3xl text-maroon-900 mb-8 font-semibold">
          Counting Every Moment Insha Allah
        </h3>

        {/* Timer Grid */}
        <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-lg mx-auto">
          <TimerBlock value={timeLeft.days} label="Days" />
          <TimerBlock value={timeLeft.hours} label="Hours" />
          <TimerBlock value={timeLeft.minutes} label="Minutes" />
          <TimerBlock value={timeLeft.seconds} label="Seconds" />
        </div>

        <p className="font-elegant text-xs sm:text-sm text-soft-black/50 italic mt-6">
          Thursday, 31st December 2026 • 21st Rajab, 1448 H.
        </p>
      </div>
    </section>
  );
};

const TimerBlock: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <div className="flex flex-col items-center p-3 sm:p-5 rounded-2xl bg-white/70 backdrop-blur-md border border-champagne-gold/30 shadow-lg">
    <span className="font-elegant text-2xl sm:text-4xl lg:text-5xl font-bold text-maroon-800 drop-shadow-sm tabular-nums">
      {String(value).padStart(2, '0')}
    </span>
    <span className="font-elegant text-[10px] sm:text-xs uppercase tracking-widest text-soft-black/60 mt-1">
      {label}
    </span>
  </div>
);
