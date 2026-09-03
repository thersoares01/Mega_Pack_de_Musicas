import React, { useState } from 'react';
import { MessageCircle, X, Send, ShieldCheck, Clock, UserCheck } from 'lucide-react';

interface WhatsAppSupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  whatsappNumber: string;
}

export const WhatsAppSupportModal: React.FC<WhatsAppSupportModalProps> = ({
  isOpen,
  onClose,
  whatsappNumber
}) => {
  const [selectedMessage, setSelectedMessage] = useState('Olá! Gostaria de tirar uma dúvida sobre o Mega Pack de Músicas 2026.');

  if (!isOpen) return null;

  const quickQuestions = [
    'Olá! Como funciona a entrega no meu e-mail/WhatsApp?',
    'As músicas funcionam no pendrive do som do meu carro?',
    'Consigo pagar no PIX e ter acesso liberado agora?',
    'Gostaria de saber se tem a pasta do meu estilo musical favorito.'
  ];

  const handleSendMessage = () => {
    const cleanNumber = whatsappNumber.replace(/\D/g, '');
    const encoded = encodeURIComponent(selectedMessage);
    const url = `https://wa.me/${cleanNumber}?text=${encoded}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-sm bg-[#0A0A0A] border border-cyan-500/30 rounded-2xl p-5 text-white shadow-2xl relative mb-16 sm:mb-0 sm:mr-4">
        {/* Header with WhatsApp styling */}
        <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-black font-black">
                <MessageCircle className="w-6 h-6 fill-black" />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-cyan-400 border-2 border-[#0A0A0A] rounded-full"></span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Suporte VIP Oficial</h4>
              <p className="text-[10px] text-cyan-400 font-semibold flex items-center gap-1">
                <Clock className="w-3 h-3" /> Online agora • Resposta em 2 min
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 p-1.5 rounded-full transition-colors cursor-pointer border border-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message bubble from agent */}
        <div className="bg-black p-3 rounded-2xl rounded-tl-none border border-white/5 mb-3 text-xs text-gray-200">
          <p className="font-semibold text-cyan-400 mb-1">Equipe Mega Pack:</p>
          <p>Olá! Tudo bem? Como posso te ajudar a garantir seu acervo de músicas com o desconto especial de hoje?</p>
        </div>

        {/* Quick Options */}
        <div className="space-y-1.5 mb-4">
          <p className="text-[10px] uppercase font-bold text-gray-400">Escolha uma pergunta rápida:</p>
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedMessage(q)}
              className={`w-full text-left p-2 rounded-xl text-xs transition-all border cursor-pointer ${
                selectedMessage === q
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 font-bold'
                  : 'bg-black text-gray-300 border-white/5 hover:bg-white/5'
              }`}
            >
              {q}
            </button>
          ))}
        </div>

        {/* Send Action */}
        <button
          onClick={handleSendMessage}
          className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs sm:text-sm py-3 rounded-xl shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all transform hover:scale-[1.02] uppercase tracking-tight"
        >
          <Send className="w-4 h-4" />
          INICIAR CONVERSA NO WHATSAPP
        </button>
      </div>
    </div>
  );
};
