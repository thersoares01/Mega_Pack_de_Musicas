import React, { useState } from 'react';
import { Calculator, DollarSign, Clock, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';

interface SavingsCalculatorProps {
  onCtaClick: () => void;
}

export const SavingsCalculator: React.FC<SavingsCalculatorProps> = ({ onCtaClick }) => {
  const [hoursPerWeek, setHoursPerWeek] = useState(4);
  const [streamingMonthly, setStreamingMonthly] = useState(35);

  const yearlyHoursWasted = hoursPerWeek * 52;
  const yearlyStreamingCost = streamingMonthly * 12;
  // Valuation of 1 hour of life / work at modest R$ 25/hour
  const timeValueMoney = yearlyHoursWasted * 25;
  const totalWastedAnnual = yearlyStreamingCost + timeValueMoney;

  return (
    <section className="py-16 px-4 bg-[#0A0A0A] relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 bg-cyan-500/5 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-widest px-3.5 py-1 rounded-full mb-3">
            <Calculator className="w-3.5 h-3.5 text-cyan-400" />
            Calculadora Interativa de Economia
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3 tracking-tight">
            Quanto Você Realmente Perde Todo Ano Sem Este Pack?
          </h2>
          <p className="text-gray-400 text-sm">
            Mova os controles abaixo para calcular o tempo e o dinheiro que você está desperdiçando:
          </p>
        </div>

        <div className="bg-[#080808] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Slider 1: Hours per week */}
            <div className="space-y-3 bg-white/[0.02] p-5 rounded-xl border border-white/5">
              <div className="flex justify-between items-center text-sm font-bold text-white">
                <span className="flex items-center gap-2 text-gray-300">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  Horas buscando músicas por semana:
                </span>
                <span className="text-cyan-400 text-base font-black bg-cyan-500/10 px-2.5 py-0.5 rounded-md border border-cyan-500/20">
                  {hoursPerWeek} horas/sem
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                step="1"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                className="w-full h-2 bg-black rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[11px] text-gray-500">
                <span>1 hora</span>
                <span>8 horas</span>
                <span>15 horas</span>
              </div>
            </div>

            {/* Slider 2: Streaming monthly cost */}
            <div className="space-y-3 bg-white/[0.02] p-5 rounded-xl border border-white/5">
              <div className="flex justify-between items-center text-sm font-bold text-white">
                <span className="flex items-center gap-2 text-gray-300">
                  <DollarSign className="w-4 h-4 text-cyan-400" />
                  Gasto mensal com streamings / pendrives:
                </span>
                <span className="text-cyan-400 text-base font-black bg-cyan-500/10 px-2.5 py-0.5 rounded-md border border-cyan-500/20">
                  R$ {streamingMonthly}/mês
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="120"
                step="5"
                value={streamingMonthly}
                onChange={(e) => setStreamingMonthly(Number(e.target.value))}
                className="w-full h-2 bg-black rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[11px] text-gray-500">
                <span>R$ 0</span>
                <span>R$ 60</span>
                <span>R$ 120</span>
              </div>
            </div>
          </div>

          {/* Results Comparison Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/5 text-center mb-8">
            <div className="bg-rose-500/5 border border-rose-500/20 p-4 rounded-xl">
              <p className="text-[11px] font-bold text-rose-400 uppercase tracking-wider">Tempo Perdido por Ano</p>
              <p className="text-2xl sm:text-3xl font-black text-white mt-1">{yearlyHoursWasted} Horas</p>
              <p className="text-[10px] text-gray-400 mt-1">Equivalente a {(yearlyHoursWasted / 24).toFixed(1)} dias inteiros</p>
            </div>

            <div className="bg-rose-500/5 border border-rose-500/20 p-4 rounded-xl">
              <p className="text-[11px] font-bold text-rose-400 uppercase tracking-wider">Desperdício Financeiro</p>
              <p className="text-2xl sm:text-3xl font-black text-rose-400 mt-1">R$ {totalWastedAnnual.toLocaleString('pt-BR')},00</p>
              <p className="text-[10px] text-gray-400 mt-1">Em mensalidades + tempo de vida</p>
            </div>

            <div className="bg-cyan-500/10 border-2 border-cyan-500/40 p-4 rounded-xl relative">
              <div className="absolute -top-2.5 right-3 bg-cyan-500 text-black text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                Apenas Hoje
              </div>
              <p className="text-[11px] font-bold text-cyan-300 uppercase tracking-wider">Investimento no Mega Pack</p>
              <p className="text-2xl sm:text-3xl font-black text-cyan-400 mt-1">R$ 37,90</p>
              <p className="text-[10px] text-cyan-200/80 mt-1 font-semibold">Pagamento Único • Acesso Imediato</p>
            </div>
          </div>

          {/* Psychology conclusion & CTA */}
          <div className="bg-cyan-950/20 border border-cyan-500/30 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5 justify-center sm:justify-start">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                Economia Real Estimada: <span className="text-cyan-400 font-black text-base">R$ {(totalWastedAnnual - 37).toLocaleString('pt-BR')},00 no primeiro ano</span>
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                Você nunca mais precisará comprar pendrives caros no mercado ou passar noites garimpando faixas.
              </p>
            </div>
            <button
              onClick={onCtaClick}
              className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs sm:text-sm px-6 py-3 rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 shrink-0 cursor-pointer uppercase tracking-tight"
            >
              <Sparkles className="w-4 h-4" />
              ECONOMIZAR TEMPO E DINHEIRO AGORA
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
