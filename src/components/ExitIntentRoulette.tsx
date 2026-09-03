import React, { useState, useEffect, useRef } from 'react';
import { X, Sparkles, Trophy, Copy, Check, Clock, ArrowRight, Gift, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';

export type CouponPercentage = 5 | 10 | 15 | 20;

export interface CouponData {
  percentage: CouponPercentage;
  code: string;
  label: string;
}

// Códigos únicos e imutáveis por porcentagem
export const RECOVERY_COUPONS: Record<CouponPercentage, CouponData> = {
  5: { percentage: 5, code: 'RECUPERA5', label: '5% DE DESCONTO' },
  10: { percentage: 10, code: 'RECUPERA10', label: '10% DE DESCONTO' },
  15: { percentage: 15, code: 'RECUPERA15', label: '15% DE DESCONTO' },
  20: { percentage: 20, code: 'RECUPERA20', label: '20% DE DESCONTO' },
};

// 8 Fatias da roleta com as 4 porcentagens distribuídas
interface Slice {
  percentage: CouponPercentage;
  label: string;
  color: string;
  textColor: string;
  borderColor: string;
}

const SLICES: Slice[] = [
  { percentage: 20, label: '20% OFF', color: '#0891b2', textColor: '#ffffff', borderColor: '#06b6d4' }, // 0
  { percentage: 5, label: '5% OFF', color: '#1e293b', textColor: '#94a3b8', borderColor: '#334155' },  // 1
  { percentage: 15, label: '15% OFF', color: '#0d9488', textColor: '#ffffff', borderColor: '#14b8a6' }, // 2
  { percentage: 10, label: '10% OFF', color: '#334155', textColor: '#cbd5e1', borderColor: '#475569' }, // 3
  { percentage: 20, label: '20% OFF', color: '#06b6d4', textColor: '#000000', borderColor: '#22d3ee' }, // 4
  { percentage: 5, label: '5% OFF', color: '#1e293b', textColor: '#94a3b8', borderColor: '#334155' },  // 5
  { percentage: 15, label: '15% OFF', color: '#0f766e', textColor: '#ffffff', borderColor: '#14b8a6' }, // 6
  { percentage: 10, label: '10% OFF', color: '#334155', textColor: '#cbd5e1', borderColor: '#475569' }, // 7
];

interface ExitIntentRouletteProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyCoupon: (coupon: CouponData) => void;
}

export const ExitIntentRoulette: React.FC<ExitIntentRouletteProps> = ({
  isOpen,
  onClose,
  onApplyCoupon,
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [wonCoupon, setWonCoupon] = useState<CouponData | null>(null);
  const [copied, setCopied] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutos para usar
  const currentRotationRef = useRef(0);

  // Timer de contagem regressiva após ganhar o cupom
  useEffect(() => {
    let timer: number;
    if (hasWon && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [hasWon, timeLeft]);

  if (!isOpen) return null;

  const handleSpin = () => {
    if (isSpinning || hasWon) return;

    setIsSpinning(true);

    // Seleciona uma fatia (para recuperação agressiva, favorece 15% ou 20%, mas todas são possíveis)
    // Slices 0 e 4 são 20%, Slices 2 e 6 são 15%, Slices 3 e 7 são 10%, Slices 1 e 5 são 5%
    const possibleWinningIndices = [0, 4, 2, 4, 0, 6, 2, 3]; // Alta probabilidade de 15% ou 20%
    const chosenSliceIndex = possibleWinningIndices[Math.floor(Math.random() * possibleWinningIndices.length)];
    const chosenSlice = SLICES[chosenSliceIndex];

    // Cálculo exato para que o centro da fatia escolhida pare no topo (ponteiro em 0 graus/12h)
    // Ângulo central da fatia = chosenSliceIndex * 45 + 22.5
    const sliceCenterAngle = chosenSliceIndex * 45 + 22.5;
    const targetOffset = (360 - sliceCenterAngle) % 360;

    // Número de voltas completas para gerar suspense (entre 5 e 7 voltas)
    const fullTurns = 360 * 6; 
    const baseRotation = Math.floor(currentRotationRef.current / 360) * 360;
    const finalAngle = baseRotation + fullTurns + targetOffset;

    currentRotationRef.current = finalAngle;
    setRotationAngle(finalAngle);

    // Após 4.5 segundos da rotação, a roleta para e revela o código único correspondente
    setTimeout(() => {
      setIsSpinning(false);
      setHasWon(true);
      const coupon = RECOVERY_COUPONS[chosenSlice.percentage];
      setWonCoupon(coupon);

      // Efeito de confetes festivos
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 300);
    }, 4500);
  };

  const handleCopyCode = () => {
    if (wonCoupon) {
      navigator.clipboard.writeText(wonCoupon.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleApplyAndCheckout = () => {
    if (wonCoupon) {
      onApplyCoupon(wonCoupon);
      onClose();
    }
  };

  // Helper para desenhar fatias da roleta com SVG (Raio = 140, Centro = 150, 150)
  const renderSvgWheel = () => {
    const cx = 150;
    const cy = 150;
    const r = 140;

    return (
      <svg
        viewBox="0 0 300 300"
        className="w-full h-full drop-shadow-[0_0_25px_rgba(6,182,212,0.35)] select-none pointer-events-none"
      >
        {/* Borda externa com luzes decorativas */}
        <circle cx={cx} cy={cy} r={r + 6} fill="#0d1117" stroke="#0891b2" strokeWidth="4" />
        
        {SLICES.map((slice, index) => {
          const startAngle = index * 45;
          const endAngle = (index + 1) * 45;
          const startRad = ((startAngle - 90) * Math.PI) / 180;
          const endRad = ((endAngle - 90) * Math.PI) / 180;

          const x1 = cx + r * Math.cos(startRad);
          const y1 = cy + r * Math.sin(startRad);
          const x2 = cx + r * Math.cos(endRad);
          const y2 = cy + r * Math.sin(endRad);

          // Posição do texto no meio do arco
          const midRad = ((startAngle + 22.5 - 90) * Math.PI) / 180;
          const textR = r * 0.65;
          const tx = cx + textR * Math.cos(midRad);
          const ty = cy + textR * Math.sin(midRad);
          const textRotation = startAngle + 22.5;

          const pathData = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`;

          return (
            <g key={index}>
              <path
                d={pathData}
                fill={slice.color}
                stroke={slice.borderColor}
                strokeWidth="1.5"
              />
              <text
                x={tx}
                y={ty}
                fill={slice.textColor}
                fontSize="15"
                fontWeight="900"
                textAnchor="middle"
                dominantBaseline="central"
                transform={`rotate(${textRotation}, ${tx}, ${ty})`}
                letterSpacing="0.05em"
              >
                {slice.label}
              </text>
            </g>
          );
        })}

        {/* Pino central com logo estético */}
        <circle cx={cx} cy={cy} r="28" fill="#09090b" stroke="#22d3ee" strokeWidth="3" />
        <circle cx={cx} cy={cy} r="18" fill="#06b6d4" />
        <circle cx={cx} cy={cy} r="6" fill="#ffffff" />
      </svg>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#0A0A0A] border-2 border-cyan-500/50 rounded-2xl p-6 sm:p-7 shadow-[0_0_50px_rgba(6,182,212,0.25)] text-white my-6">
        {/* Botão Fechar */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors cursor-pointer border border-white/10 z-20"
          title="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Topo do Modal de Recuperação */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-1.5 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-[11px] font-black uppercase tracking-widest px-3.5 py-1 rounded-full mb-2">
            <Flame className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            ESPERE! NÃO VÁ EMBORA DE MÃOS VAZIAS
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Gire a Roleta da Sorte e Ganhe até{' '}
            <span className="text-cyan-400">20% de Desconto Extra!</span>
          </h3>
          <p className="text-xs text-gray-300 mt-1 max-w-md mx-auto">
            Antes de sair, você tem direito a <strong>1 giro exclusivo</strong>. Os códigos de desconto oficiais são revelados assim que a roleta parar!
          </p>
        </div>

        {/* Área da Roleta */}
        <div className="relative flex flex-col items-center justify-center my-2">
          {/* Ponteiro / Marcador Fixo no Topo (12 horas) */}
          <div className="absolute -top-3 z-30 flex flex-col items-center pointer-events-none drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)]">
            <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-t-[24px] border-t-rose-500 filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] animate-pulse" />
            <div className="w-3 h-3 rounded-full bg-white -mt-5 shadow-sm" />
          </div>

          {/* Disco Giratório */}
          <div className="w-[280px] h-[280px] sm:w-[310px] sm:h-[310px] relative flex items-center justify-center p-2">
            <div
              className="w-full h-full transition-transform duration-[4500ms]"
              style={{
                transform: `rotate(${rotationAngle}deg)`,
                transitionTimingFunction: 'cubic-bezier(0.12, 0.8, 0.2, 1)',
              }}
            >
              {renderSvgWheel()}
            </div>
          </div>
        </div>

        {/* Estado 1: Antes de Girar ou Girando */}
        {!hasWon ? (
          <div className="text-center mt-3">
            <button
              onClick={handleSpin}
              disabled={isSpinning}
              className={`w-full py-3.5 px-6 rounded-xl font-black text-sm sm:text-base uppercase tracking-tight flex items-center justify-center gap-2 shadow-xl transition-all ${
                isSpinning
                  ? 'bg-gray-700 text-gray-300 cursor-not-allowed opacity-80'
                  : 'bg-gradient-to-r from-cyan-400 via-cyan-500 to-teal-400 text-black hover:brightness-110 active:scale-98 shadow-cyan-500/25 cursor-pointer animate-pulse'
              }`}
            >
              {isSpinning ? (
                <>
                  <Sparkles className="w-5 h-5 animate-spin" />
                  GIRANDO A ROLETA DA SORTE...
                </>
              ) : (
                <>
                  <Gift className="w-5 h-5 fill-black" />
                  GIRAR ROLETA E DESCOBRIR MEU CUPOM
                </>
              )}
            </button>
            <p className="text-[11px] text-gray-400 mt-2">
              🔒 O código único de desconto será liberado automaticamente após o giro.
            </p>
          </div>
        ) : (
          /* Estado 2: Roleta Parou -> REVELA O CÓDIGO ÚNICO */
          <div className="mt-4 bg-gradient-to-b from-cyan-950/40 to-[#0c1319] border border-cyan-500/50 rounded-xl p-4 sm:p-5 text-center animate-scale-up">
            <div className="inline-flex items-center gap-1.5 bg-cyan-500/20 text-cyan-300 text-xs font-black uppercase px-3 py-1 rounded-full mb-2 border border-cyan-500/30">
              <Trophy className="w-4 h-4 text-cyan-400" />
              PARABÉNS! VOCÊ GANHOU {wonCoupon?.percentage}% DE DESCONTO!
            </div>

            <p className="text-xs text-gray-300 mb-3">
              Seu cupom de desconto único e imutável para esta porcentagem foi desbloqueado com sucesso:
            </p>

            {/* Código Único Revelado */}
            <div className="bg-black/90 border-2 border-dashed border-cyan-400 rounded-xl p-3 mb-3 flex items-center justify-between gap-2 max-w-xs mx-auto">
              <div className="text-left pl-2">
                <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-wider">
                  CÓDIGO EXCLUSIVO
                </span>
                <span className="text-lg sm:text-xl font-black text-cyan-300 tracking-wider font-mono">
                  {wonCoupon?.code}
                </span>
              </div>
              <button
                onClick={handleCopyCode}
                className="bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold py-2 px-3 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer uppercase tracking-tight shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-black" /> COPIADO!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-black" /> COPIAR
                  </>
                )}
              </button>
            </div>

            {/* Timer de urgência */}
            <div className="flex items-center justify-center gap-1.5 text-xs text-rose-400 font-bold mb-4">
              <Clock className="w-3.5 h-3.5" />
              <span>
                Cupom válido pelos próximos {Math.floor(timeLeft / 60)}:
                {String(timeLeft % 60).padStart(2, '0')} minutos!
              </span>
            </div>

            {/* Botão de Ação Imediata: Aplicar Desconto e ir para o Checkout */}
            <button
              onClick={handleApplyAndCheckout}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 hover:brightness-110 text-black font-black text-sm sm:text-base uppercase tracking-tight flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer transform hover:scale-[1.01]"
            >
              <span>APLICAR {wonCoupon?.percentage}% OFF E IR AO CHECKOUT</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="text-[11px] text-gray-400 hover:text-gray-300 mt-2.5 underline cursor-pointer"
            >
              Prefiro recusar meu desconto e continuar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
