import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, MessageCircle } from 'lucide-react';
import { FAQS_DATA } from '../data/mockData';

interface FaqSectionProps {
  onOpenWhatsApp: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenWhatsApp }) => {
  const [openId, setOpenId] = useState<string | null>('f1');

  const toggleFaq = (id: string) => {
    setOpenId(curr => (curr === id ? null : id));
  };

  return (
    <section className="py-10 sm:py-12 px-4 bg-[#080808] relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-9">
          <div className="inline-flex items-center gap-1.5 bg-cyan-500/5 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-widest px-3.5 py-1 rounded-full mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            Tire Suas Dúvidas
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
            Perguntas Frequentes (FAQ)
          </h2>
          <p className="text-gray-400 text-sm">
            Tudo o que você precisa saber antes de garantir seu acesso com o desconto especial:
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3 mb-10">
          {FAQS_DATA.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-[#080808] border-cyan-500/50 shadow-lg'
                    : 'bg-[#080808] border-white/5 hover:border-white/15'
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <Sparkles className={`w-4 h-4 shrink-0 ${isOpen ? 'text-cyan-400' : 'text-gray-500'}`} />
                    {faq.question}
                  </span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                    isOpen ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'bg-white/5 text-gray-400 border border-white/10'
                  }`}>
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-white/5">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions WhatsApp Callout */}
        <div className="bg-[#080808] border border-cyan-500/30 rounded-2xl p-6 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="text-base font-bold text-white flex items-center gap-2 justify-center sm:justify-start">
              <MessageCircle className="w-5 h-5 text-cyan-400" />
              Ainda tem alguma dúvida específica?
            </h4>
            <p className="text-xs text-gray-400 mt-1">
              Fale agora com nosso suporte humanizado no WhatsApp e tire todas as suas dúvidas em minutos.
            </p>
          </div>

          <button
            onClick={onOpenWhatsApp}
            className="bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs sm:text-sm px-6 py-3 rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/20 flex items-center gap-2 shrink-0 cursor-pointer uppercase tracking-tight"
          >
            FALAR NO WHATSAPP &rarr;
          </button>
        </div>
      </div>
    </section>
  );
};
