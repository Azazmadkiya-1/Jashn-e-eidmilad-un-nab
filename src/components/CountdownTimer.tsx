import React, { useState, useEffect } from 'react';
import { Sparkles, Clock, Calendar, Heart } from 'lucide-react';

interface CountdownTimerProps {
  onInteract?: () => void;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ onInteract }) => {
  // Target date for 12 Rabi-ul-Awwal 1448 AH: August 25, 2026 00:00:00
  // (Approximate date according to Umm al-Qura / standard Hijri calendar)
  const targetDate = new Date('2026-08-25T00:00:00');

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isArrived: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isArrived: true });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds, isArrived: false });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto my-3 sm:my-4 z-10 px-1.5 sm:px-2">
      <div className="relative bg-gradient-to-b from-emerald-950/90 via-emerald-900/80 to-emerald-950/95 border-2 border-amber-400/50 rounded-2xl p-3.5 sm:p-5 backdrop-blur-xl shadow-2xl box-glow-gold overflow-hidden text-center">
        {/* Glow ambient background */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />

        {/* Title / Banner */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          <h2 className="text-xs sm:text-sm font-mono uppercase tracking-widest text-amber-300 font-bold">
            12 RABI-UL-AWWAL COUNTDOWN
          </h2>
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
        </div>


        {timeLeft.isArrived ? (
          <div className="py-2 bg-emerald-900/60 border border-amber-400/60 rounded-xl animate-bounce">
            <p className="text-base sm:text-lg font-bold text-amber-300 tracking-wide">
              ✨ 12 Rabi-ul-Awwal Mubarak! ✨
            </p>
            <p className="text-xs text-emerald-200 mt-1">
              May the blessings of the Holy Prophet ﷺ illuminate your heart & home.
            </p>
          </div>
        ) : (
          /* Grid of Days, Hours, Minutes, Seconds */
          <div className="grid grid-cols-4 gap-2 my-2">
            <div className="bg-[#011a12] border border-amber-500/40 rounded-xl p-2 sm:p-3 shadow-inner flex flex-col items-center">
              <span className="font-mono text-xl sm:text-3xl font-black text-amber-300 drop-shadow">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-emerald-300/80 mt-1">
                Days
              </span>
            </div>

            <div className="bg-[#011a12] border border-amber-500/40 rounded-xl p-2 sm:p-3 shadow-inner flex flex-col items-center">
              <span className="font-mono text-xl sm:text-3xl font-black text-amber-300 drop-shadow">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-emerald-300/80 mt-1">
                Hours
              </span>
            </div>

            <div className="bg-[#011a12] border border-amber-500/40 rounded-xl p-2 sm:p-3 shadow-inner flex flex-col items-center">
              <span className="font-mono text-xl sm:text-3xl font-black text-amber-300 drop-shadow">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-emerald-300/80 mt-1">
                Mins
              </span>
            </div>

            <div className="bg-[#011a12] border border-amber-500/40 rounded-xl p-2 sm:p-3 shadow-inner flex flex-col items-center">
              <span className="font-mono text-xl sm:text-3xl font-black text-amber-300 drop-shadow">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-emerald-300/80 mt-1">
                Secs
              </span>
            </div>
          </div>
        )}

        <div className="mt-3 text-[11px] font-mono text-emerald-300/90 flex items-center justify-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>Target Date: 12 Rabi-ul-Awwal 1448 AH (Approx. 25 August 2026)</span>
        </div>
      </div>
    </div>
  );
};
