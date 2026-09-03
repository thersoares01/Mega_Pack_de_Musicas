import React, { useState } from 'react';
import { Gift, X, Sparkles, Trophy, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LuckyWheelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyBonus: () => void;
}

export const LuckyWheelModal: React.FC<LuckyWheelModalProps> = ({
  isOpen,
  onClose,
  onApplyBonus
}) => {
  const [spinning, setSpinning] = useState(false);
  const [won, setWon] = useState(false);
  const [rotation, setRotation] = useState(0);

  if (!isOpen) return null;

  const handleSpin = () => {
    if (spinning || won) return;
    setSpinning(true);

    // Guaranteed to land on the best prize: "+10.000 Clássicos Flashback + Desconto VIP"
    const newRotation = 1440 + 45; 
    setRotation(newRotation);

    setTimeout(() => {
      setSpinning(false);
      setWon(true);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });
    }, 3500);
  };

  const handleClaim = () => {
    onApplyBonus();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-[#0A0A0A] border border-cyan-500/40 rounded-2xl p-6 text-center text-white shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors cursor-pointer border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="inline-flex items-center gap-1.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-black px-3 py-1 rounded-full mb-3 uppercase tracking-widest">
          <Gift className="w-3.5 h-3.5 text-cyan-400" />
          Roleta da Sorte Exclusiva
        </div>

        <h3 className="text-xl font-black text-white mb-1 tracking-tight">
          Gire a Roleta e Ganhe um Super Bônus Extra!
        </h3>
        <p className="text-xs text-gray-400 mb-6">
          Uma chance única por visitante para desbloquear vantagens secretas.
        </p>

        {/* Wheel Graphic */}
        <div className="relative w-56 h-56 mx-auto mb-6 flex items-center justify-center">
          {/* Arrow Pointer */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-cyan-400 drop-shadow-md" />

          {/* Wheel Disc */}
          <div
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: spinning ? 'transform 3.5s cubic-bezier(0.15, 0.9, 0.25, 1)' : 'none'
            }}
            className="w-full h-full rounded-full border-4 border-cyan-400 shadow-2xl relative overflow-hidden bg-gradient-to-tr from-cyan-900 via-blue-900 to-indigo-950"
          >
            {/* Slices representation */}
            <div className="absolute inset-0 flex items-center justify-center font-bold text-[10px] text-white">
              <span className="absolute top-4 font-black text-cyan-300">🎁 SUPER VIP</span>
              <span className="absolute bottom-4 font-black">⚡ 85% OFF</span>
              <span className="absolute right-4 font-black">🔥 +10k FX</span>
              <span className="absolute left-4 font-black">⭐ DRIVE TURBO</span>
            </div>
          </div>

          {/* Center Pin */}
          <div className="absolute w-12 h-12 rounded-full bg-[#080808] border-2 border-cyan-400 flex items-center justify-center z-10 shadow-lg text-cyan-400 font-black text-xs">
            VIP
          </div>
        </div>

        {!won ? (
          <button
            onClick={handleSpin}
            disabled={spinning}
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-black text-sm sm:text-base py-3.5 rounded-xl shadow-xl shadow-cyan-500/20 transform hover:scale-105 transition-all disabled:opacity-50 cursor-pointer uppercase tracking-tight"
          >
            {spinning ? 'GIRANDO A ROLETA...' : '👉 GIRAR ROLETA AGORA (GRÁTIS)'}
          </button>
        ) : (
          <div className="animate-scale-up space-y-3">
            <div className="bg-cyan-950/40 border border-cyan-500/40 rounded-xl p-4">
              <div className="flex items-center justify-center gap-2 text-cyan-300 font-extrabold text-sm mb-1">
                <Trophy className="w-5 h-5 text-cyan-400" />
                VOCÊ GANHOU O PRÊMIO MÁXIMO!
              </div>
              <p className="text-xs text-gray-200">
                Parabéns! Você liberou o <strong>Pack VIP + 8 Bônus com 85% de Desconto (De R$ 297 por apenas R$ 37,90)</strong>.
              </p>
            </div>

            <button
              onClick={handleClaim}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-black text-sm py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer uppercase tracking-tight"
            >
              <Sparkles className="w-4 h-4" />
              RESGATAR MEU PRÊMIO AGORA
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
