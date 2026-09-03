import React, { useState, useEffect } from 'react';
import { CheckCircle2, Music, Sparkles } from 'lucide-react';
import { RECENT_BUYERS } from '../data/mockData';

export const LiveSalesNotifier: React.FC = () => {
  const [currentBuyerIndex, setCurrentBuyerIndex] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Initial delay before first popup
    const firstTimeout = setTimeout(() => {
      showNextNotification(0);
    }, 4000);

    return () => clearTimeout(firstTimeout);
  }, []);

  const showNextNotification = (index: number) => {
    setCurrentBuyerIndex(index);
    setVisible(true);

    // Auto hide after 5 seconds
    const hideTimeout = setTimeout(() => {
      setVisible(false);

      // Schedule next notification in 8 to 15 seconds
      const nextDelay = 8000 + Math.random() * 7000;
      setTimeout(() => {
        const nextIndex = (index + 1) % RECENT_BUYERS.length;
        showNextNotification(nextIndex);
      }, nextDelay);
    }, 5000);

    return () => clearTimeout(hideTimeout);
  };

  if (currentBuyerIndex === null || !visible) return null;

  const buyer = RECENT_BUYERS[currentBuyerIndex];

  return (
    <div className="fixed bottom-20 left-4 z-40 max-w-xs sm:max-w-sm bg-[#0A0A0A]/95 backdrop-blur-md border border-cyan-500/30 rounded-xl p-3 shadow-2xl shadow-cyan-950/50 transition-all duration-500 animate-slide-up">
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src={buyer.avatar}
            alt={buyer.name}
            className="w-11 h-11 rounded-full object-cover border-2 border-cyan-400"
          />
          <span className="absolute -bottom-1 -right-1 bg-cyan-500 text-black p-0.5 rounded-full">
            <CheckCircle2 className="w-3.5 h-3.5 fill-black text-cyan-400" />
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-gray-100 truncate">{buyer.name}</p>
            <span className="text-[10px] text-gray-400">{buyer.timeAgo}</span>
          </div>
          <p className="text-[11px] text-cyan-400 font-semibold flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-cyan-400" /> Adquiriu {buyer.plan}
          </p>
          <p className="text-[10px] text-gray-400 flex items-center gap-1">
            📍 {buyer.city} • <span className="text-cyan-300 flex items-center"><Music className="w-2.5 h-2.5 mr-0.5" /> Acesso liberado</span>
          </p>
        </div>
      </div>
    </div>
  );
};
