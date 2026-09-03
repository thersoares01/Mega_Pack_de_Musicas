import React from 'react';
import { 
  Check, 
  Flame, 
  Zap, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  Star,
  Lock,
  ArrowRight,
  Gift
} from 'lucide-react';
import { PLANS_DATA } from '../data/mockData';
import { PlanItem } from '../types';

interface PricingSectionProps {
  onSelectPlan: (plan: PlanItem) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  return (
    <section id="pricing-section" className="py-10 sm:py-12 px-4 bg-[#080808] relative overflow-hidden border-b border-white/5">
      {/* Background glow behind VIP card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-cyan-500/10 blur-[150px] -z-10 pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-9">
          <div className="inline-flex items-center gap-1.5 bg-cyan-500/5 border border-cyan-500/30 text-cyan-400 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-3 shadow-lg shadow-cyan-500/5">
            <Flame className="w-4 h-4 fill-cyan-400 text-cyan-400" />
            Oferta Especial com 85% de Desconto
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Escolha Seu Plano e Tenha Acesso Imediato
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Pagamento único, sem mensalidades. Acesso liberado no seu e-mail e WhatsApp em menos de 10 segundos após a confirmação.
          </p>
        </div>

        {/* 2 Pricing Cards: Pack Essencial and Mega Pack VIP Completo */}
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-8 items-stretch mb-12">
          {PLANS_DATA.map((plan) => {
            const isVip = plan.popular;

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl flex flex-col justify-between transition-all duration-300 ${
                  isVip
                    ? 'bg-[#0A0A0A] border-2 border-cyan-500 shadow-[0_0_45px_rgba(6,182,212,0.25)] md:-translate-y-2 md:scale-[1.03] z-10'
                    : 'bg-[#0A0A0A] border border-white/10 hover:border-white/20 shadow-xl'
                } p-6 sm:p-8`}
              >
                {/* Popular Pill */}
                {isVip && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-cyan-500 text-black text-xs font-black uppercase tracking-wider py-1.5 px-4 rounded-full shadow-lg flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-black" />
                    ESCOLHA DE 94% DOS CLIENTES
                  </div>
                )}

                <div>
                  {/* Card Header */}
                  <div className="border-b border-white/10 pb-5 mb-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        isVip ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20' : 'bg-white/5 text-gray-400 border border-white/10'
                      }`}>
                        {plan.badge}
                      </span>
                      <span className="text-xs font-bold text-gray-400">
                        {plan.storageSize}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-white">{plan.name}</h3>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">{plan.description}</p>
                  </div>

                  {/* Price Box */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-gray-500 line-through">De R$ {plan.originalPrice.toFixed(2).replace('.', ',')}</span>
                      <span className="text-[11px] font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded">
                        Economize R$ {(plan.originalPrice - plan.promoPrice).toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-semibold text-gray-400">Por apenas</span>
                      <span className="text-3xl sm:text-4xl font-black text-white">R$</span>
                      <span className={`text-4xl sm:text-5xl font-black ${isVip ? 'text-cyan-400' : 'text-white'}`}>
                        {Math.floor(plan.promoPrice)}
                      </span>
                      <span className="text-xl font-bold text-gray-300">
                        ,{(plan.promoPrice % 1).toFixed(2).slice(2)}
                      </span>
                      <span className="text-xs text-gray-400 font-bold uppercase ml-1">à vista</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      ou em <strong className="text-white">{plan.installments}</strong> no cartão
                    </p>
                    <p className="text-[11px] text-cyan-400 font-bold mt-0.5 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Pagamento único • Sem mensalidade
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">O que você recebe:</p>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-gray-300">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <Check className={`w-4 h-4 shrink-0 mt-0.5 ${isVip ? 'text-cyan-400 font-bold' : 'text-cyan-400'}`} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bonus List Preview */}
                  {plan.bonuses && plan.bonuses.length > 0 && (
                    <div className="pt-4 border-t border-white/10 mb-6">
                      <p className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5 mb-2">
                        <Gift className="w-3.5 h-3.5 text-cyan-400" />
                        Bônus Inclusos:
                      </p>
                      <ul className="space-y-1.5 text-[11px] text-gray-300">
                        {plan.bonuses.map((b, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="text-cyan-400 font-bold">★</span>
                            <span className="truncate">{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Card CTA Button */}
                <div className="pt-4 border-t border-white/10">
                  <button
                    onClick={() => onSelectPlan(plan)}
                    className={`w-full py-4 px-4 rounded-xl font-black text-sm transition-all transform hover:scale-[1.02] shadow-xl flex items-center justify-center gap-2 cursor-pointer uppercase tracking-tight ${
                      isVip
                        ? 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-cyan-500/30'
                        : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                    }`}
                  >
                    <Zap className="w-4 h-4 fill-current" />
                    GARANTIR ACESSO AGORA
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center gap-3 text-[10px] text-gray-400 mt-3">
                    <span className="flex items-center gap-1">
                      <Lock className="w-3 h-3 text-cyan-400" /> PIX & Cartão
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-cyan-400" /> Acesso Imediato
                    </span>
                    <span>•</span>
                    <span>Pagamento Único</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Security & Payment Badges Footer */}
        <div className="max-w-4xl mx-auto bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 text-center">
          <p className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-4">
            🔒 Ambiente 100% Criptografado & Pagamento Seguro
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-300">
            <span className="bg-black/60 px-3 py-1.5 rounded-lg border border-white/5 font-semibold flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-cyan-400" /> PIX Automático (Acesso em 10s)
            </span>
            <span className="bg-black/60 px-3 py-1.5 rounded-lg border border-white/5 font-semibold">
              💳 Cartão de Crédito em até 12x
            </span>
            <span className="bg-black/60 px-3 py-1.5 rounded-lg border border-white/5 font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> Certificado SSL 256-Bit
            </span>
            <span className="bg-black/60 px-3 py-1.5 rounded-lg border border-white/5 font-semibold">
              📄 Boleto Bancário
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
