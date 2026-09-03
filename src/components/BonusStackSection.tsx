import React from 'react';
import { 
  Sparkles, 
  Disc, 
  Volume2, 
  Tv, 
  Zap, 
  BookOpen, 
  Music, 
  Send, 
  Gift, 
  ArrowRight, 
  Flame, 
  Video 
} from 'lucide-react';
import { BONUSES_DATA } from '../data/mockData';

interface BonusStackSectionProps {
  onCtaClick: () => void;
}

const ICONS_MAP: Record<string, React.ElementType> = {
  Sparkles,
  Disc,
  Volume2,
  Tv,
  Zap,
  BookOpen,
  Music,
  Send,
  Video
};

export const BonusStackSection: React.FC<BonusStackSectionProps> = ({ onCtaClick }) => {
  const totalBonusesValue = BONUSES_DATA.reduce((acc, curr) => acc + curr.estimatedValue, 0);

  return (
    <section className="py-10 sm:py-12 px-4 bg-[#080808] relative border-b border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-9">
          <div className="inline-flex items-center gap-1.5 bg-cyan-500/5 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-widest px-3.5 py-1 rounded-full mb-3">
            <Gift className="w-3.5 h-3.5 text-cyan-400" />
            Empilhamento de Oferta Irrecusável
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
            Garanta Seu Acesso Hoje e Leve Mais de{' '}
            <span className="text-rose-400 line-through decoration-rose-500 decoration-3">R$ 297,00</span>{' '}
            em <span className="text-cyan-400 underline decoration-cyan-500/40 decoration-wavy">8 Super Bônus 100% Grátis!</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Esses materiais são vendidos separadamente para DJs e produtores, mas hoje você leva todos inclusos no seu acesso sem pagar nada a mais.
          </p>
        </div>

        {/* 8 Bonuses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {BONUSES_DATA.map((bonus, idx) => {
            const IconComponent = ICONS_MAP[bonus.iconName] || Sparkles;
            return (
              <div
                key={bonus.id}
                className="bg-[#0A0A0A] hover:bg-white/[0.04] border border-white/5 hover:border-cyan-500/40 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xl group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-black bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      BÔNUS #{idx + 1}
                    </span>
                  </div>

                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                    {bonus.category}
                  </span>
                  <h3 className="text-sm font-bold text-white mb-2 line-clamp-2">{bonus.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">{bonus.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] text-gray-500 line-through">
                    Vendido por R$ {bonus.estimatedValue.toFixed(2).replace('.', ',')}
                  </span>
                  <span className="text-xs font-black text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded">
                    GRÁTIS HOJE
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Total Anchor Box */}
        <div className="max-w-3xl mx-auto bg-[#0A0A0A] border-2 border-cyan-500/40 rounded-2xl p-6 sm:p-8 text-center shadow-2xl relative overflow-hidden">
          <div className="flex flex-col items-center">
            <span className="text-xs font-black text-cyan-400 uppercase tracking-widest bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full mb-3">
              Resumo da Sua Vantagem Hoje
            </span>
            <p className="text-sm sm:text-base text-gray-300">
              Valor Total do Pack + Todos os 8 Bônus se comprados separadamente:
            </p>
            <div className="my-2 flex items-center gap-3">
              <span className="text-2xl sm:text-3xl font-black text-gray-500 line-through decoration-rose-500 decoration-3">
                R$ 297,00
              </span>
              <span className="text-3xl sm:text-4xl font-black text-cyan-400">
                Por Apenas R$ 37,90
              </span>
            </div>
            <p className="text-xs text-cyan-400 font-semibold mb-6">
              Você está economizando mais de R$ 850,00 e garantindo atualizações inclusas!
            </p>

            <button
              onClick={onCtaClick}
              className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-400 text-black font-black text-base sm:text-lg py-4 px-8 rounded-xl shadow-xl shadow-cyan-500/30 transform hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-tight"
            >
              <Flame className="w-5 h-5 fill-black text-black" />
              QUERO RESGATAR O PACK COM TODOS OS BÔNUS
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
