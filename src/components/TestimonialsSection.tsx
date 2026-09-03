import React from 'react';
import { Star, CheckCircle, MessageSquare, ThumbsUp, ShieldCheck } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../data/mockData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-10 sm:py-12 px-4 bg-[#0A0A0A] border-b border-white/5 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-9">
          <div className="inline-flex items-center gap-1.5 bg-cyan-500/5 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-widest px-3.5 py-1 rounded-full mb-3">
            <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
            Depoimentos Reais & Verificados
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
            Veja o Que Quem Já Baixou e Usou Está Falando
          </h2>
          <div className="flex items-center justify-center gap-2 text-cyan-400 text-sm font-bold">
            <div className="flex text-cyan-400">
              {'★★★★★'.split('').map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-cyan-400 text-cyan-400" />
              ))}
            </div>
            <span className="text-white">4.9 de 5 estrelas</span>
            <span className="text-gray-400">• Mais de 14.850 clientes satisfeitos</span>
          </div>
        </div>

        {/* Testimonials Cards Grid - Pure Written Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {TESTIMONIALS_DATA.map((item) => (
            <div
              key={item.id}
              className="bg-[#080808] border border-white/10 hover:border-cyan-500/30 transition-all rounded-2xl p-6 sm:p-7 shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Header with Avatar & Name */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.avatar}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-cyan-500/40"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                        {item.name}
                        {item.verified && (
                          <CheckCircle className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400/20" />
                        )}
                      </h4>
                      <p className="text-xs text-gray-400">{item.role}</p>
                      <p className="text-[10px] text-gray-500">📍 {item.city}</p>
                    </div>
                  </div>

                  {item.highlightTag && (
                    <span className="text-[10px] font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded-full shrink-0">
                      {item.highlightTag}
                    </span>
                  )}
                </div>

                {/* Stars */}
                <div className="flex text-cyan-400 mb-3 text-xs">
                  {'★'.repeat(item.rating)}
                </div>

                {/* Pure Written Comment */}
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed italic">
                  "{item.comment}"
                </p>
              </div>

              {/* Card Footer with Verified Stamp */}
              <div className="mt-5 pt-3.5 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-500">
                <span className="flex items-center gap-1 text-cyan-400 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" /> Compra Verificada
                </span>
                <span>{item.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp Chat Simulation Banner */}
        <div className="bg-cyan-950/20 border border-cyan-500/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/20">
              <ThumbsUp className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-white">
                Mais de 98.4% de Avaliações Positivas no Reclame Aqui e Google
              </p>
              <p className="text-xs text-gray-400">
                Qualidade de estúdio comprovada por quem vive de música no dia a dia.
              </p>
            </div>
          </div>

          <div className="text-xs font-bold text-cyan-300 bg-cyan-950/40 px-3 py-1.5 rounded-lg border border-cyan-500/30 shrink-0">
            ✅ Índice de Satisfação: 99.8%
          </div>
        </div>
      </div>
    </section>
  );
};
