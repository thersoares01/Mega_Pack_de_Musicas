import React from 'react';
import { XCircle, CheckCircle, AlertTriangle, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface PsychologicalComparisonProps {
  onCtaClick: () => void;
}

export const PsychologicalComparison: React.FC<PsychologicalComparisonProps> = ({ onCtaClick }) => {
  return (
    <section className="py-10 sm:py-12 px-4 bg-[#0A0A0A] relative border-b border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-9">
          <span className="text-xs font-bold text-rose-400 uppercase tracking-widest bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-full">
            Chega de Passar Vergonha em Eventos
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mt-3 mb-4 tracking-tight">
            Compare: O Jeito Antigo e Amador vs. O Jeito Profissional VIP
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Veja por que milhares de DJs, donos de bares e amantes de som automotivo abandonaram o método manual e escolheram o Mega Pack 2026:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* THE OLD PAINFUL WAY */}
          <div className="bg-[#080808] border border-rose-500/20 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between border-b border-rose-500/10 pb-4 mb-6">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded">
                    Jeito Antigo / Gratuito da Internet
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-rose-500" />
                    Baixar no YouTube & Sites Aleatórios
                  </h3>
                </div>
              </div>

              <ul className="space-y-4 text-xs sm:text-sm text-gray-400">
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-rose-300">Áudio horrível e abafado:</strong> Músicas ripadas em 96kbps/128kbps que racham o som da caixa JBL ou do carro.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-rose-300">Risco real de vírus e malwares:</strong> Links cheios de propagandas abusivas, vírus de sequestro de dados e travamentos.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-rose-300">Nomes desorganizados e tags erradas:</strong> Arquivos salvos como "track_01_convert.mp3" que ninguém acha na hora da festa.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-rose-300">Propagandas e vinhetas de terceiros:</strong> Locuções chatas de outros sites gravadas bem no meio do refrão.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-rose-300">Horas e noites inteiras perdidas:</strong> Passar 5 horas para baixar 30 músicas e metade estar com defeito.
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-rose-500/10 text-center">
              <span className="text-xs text-rose-400 font-semibold">
                ❌ Resultado: Estresse, tempo jogado fora e vergonha na hora de tocar.
              </span>
            </div>
          </div>

          {/* THE NEW VIP WAY */}
          <div className="bg-[#080808] border-2 border-cyan-500/40 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative">
            <div className="absolute -top-3.5 right-6 bg-cyan-500 text-black text-[11px] font-black uppercase tracking-wider px-3.5 py-1 rounded-full shadow-lg shadow-cyan-500/20">
              ✨ 100% RECOMENDADO
            </div>

            <div>
              <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4 mb-6">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                    Jeito Inteligente & Prático
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-cyan-400" />
                    Mega Pack de Músicas VIP 2026
                  </h3>
                </div>
              </div>

              <ul className="space-y-4 text-xs sm:text-sm text-gray-300">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-cyan-300">Áudio Master HD 320kbps:</strong> Som cristalino, graves profundos e frequências equalizadas de estúdio.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-cyan-300">100% Seguro e sem vírus:</strong> Download direto em alta velocidade dos servidores dedicados na nuvem.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-cyan-300">Organização impecável por pastas:</strong> Separado por estilo, BPM, energia, versão estendida e ano de lançamento.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-cyan-300">Zero propagandas e Clean Tags:</strong> Músicas limpas e prontas para tocar no som do carro, eventos e bares.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-cyan-300">Acesso Completo + Atualizações:</strong> Pague apenas uma vez e tenha um acervo sempre com os hits mais recentes.
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-4 border-t border-cyan-500/20">
              <button
                onClick={onCtaClick}
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-black py-3.5 px-4 rounded-xl text-sm transition-all transform hover:scale-[1.02] shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer uppercase tracking-tight"
              >
                QUERO O JEITO INTELIGENTE POR R$ 37
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
