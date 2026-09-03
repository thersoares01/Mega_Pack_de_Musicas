import React, { useState, useEffect } from 'react';
import { Flame, Clock, Users, ShieldAlert } from 'lucide-react';

interface TopUrgencyBannerProps {
  onCtaClick: () => void;
}

export const TopUrgencyBanner: React.FC<TopUrgencyBannerProps> = ({ onCtaClick }) => {
  const [timeLeft, setTimeLeft] = useState({ minutes: 14, seconds: 35 });
  const [viewerCount, setViewerCount] = useState(147);
  const [remainingSlots, setRemainingSlots] = useState(4);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        } else {
          return { minutes: 15, seconds: 0 }; // Loop urgency
        }
      });
    }, 1000);

    const viewerInterval = setInterval(() => {
      setViewerCount(prev => {
        const delta = Math.floor(Math.random() * 7) - 3;
        return Math.max(120, Math.min(195, prev + delta));
      });
    }, 4000);

    return () => {
      clearInterval(timer);
      clearInterval(viewerInterval);
    };
  }, []);

  return (
    <div className="bg-[#0A0A0A] text-white text-xs py-2 px-3 border-b border-white/5 relative z-20">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="flex items-center gap-1 text-cyan-400 font-extrabold uppercase tracking-wide text-[11px] sm:text-xs">
            <Flame className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
            OFERTA RELÂMPAGO • 85% OFF:
          </span>
          <span className="text-gray-300 text-[11px] sm:text-xs">
            Mega Pack VIP + 8 Bônus Exclusivos por apenas R$ 37
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 bg-cyan-950/40 px-2.5 py-0.5 rounded-full border border-cyan-500/20 text-cyan-400 font-medium">
            <Clock className="w-3 h-3 text-cyan-400" />
            <span className="text-gray-400 text-[11px]">Expira em:</span>
            <span className="font-mono font-bold tracking-wider text-cyan-300 bg-black/50 px-1.5 py-0.5 rounded text-[11px]">
              {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>

          <button
            onClick={onCtaClick}
            className="hidden sm:inline-flex items-center gap-1 bg-cyan-500 hover:bg-cyan-400 text-black font-black px-3 py-1 rounded text-[11px] uppercase tracking-tight transition-all cursor-pointer"
          >
            QUERO O DESCONTO
          </button>
        </div>
      </div>
    </div>
  );
};
