import React, { useState, useEffect } from 'react';
import { Flame, ArrowRight, Zap, ShieldCheck } from 'lucide-react';

interface StickyBottomBarProps {
  onCtaClick: () => void;
}

export const StickyBottomBar: React.FC<StickyBottomBarProps> = ({ onCtaClick }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar after scrolling down 350px
      if (window.scrollY > 350) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#080808]/95 border-t border-cyan-500/40 backdrop-blur-xl px-4 py-3 shadow-[0_-10px_30px_rgba(0,0,0,0.8)] animate-slide-up">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Left price info */}
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="hidden md:flex w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 items-center justify-center font-black">
            <Flame className="w-5 h-5 fill-cyan-400 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <span className="text-[10px] bg-rose-500/20 text-rose-300 font-extrabold px-1.5 py-0.5 rounded">
                85% OFF
              </span>
              <span className="text-xs text-gray-400 line-through">De R$ 297,00</span>
              <span className="text-sm sm:text-base font-black text-cyan-400">
                Por R$ 37,90
              </span>
            </div>
            <p className="text-[10px] text-gray-400 hidden sm:block">
              ⚡ Acesso Completo + 8 Super Bônus Inclusos • Download Imediato
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="w-full sm:w-auto flex items-center gap-2">
          <button
            onClick={onCtaClick}
            className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs sm:text-sm px-6 py-3 rounded-lg shadow-lg shadow-cyan-500/30 transform hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 uppercase tracking-tight"
          >
            <Zap className="w-4 h-4 fill-current" />
            GARANTIR MEU PACK AGORA
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
