import React, { useState } from 'react';
import { Settings, X, Save, Check, Link, Phone, ExternalLink, ShieldCheck } from 'lucide-react';

interface ConfigSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  whatsappNumber: string;
  onSaveWhatsApp: (val: string) => void;
  checkoutUrlVip: string;
  onSaveCheckoutUrlVip: (val: string) => void;
  checkoutUrlBasic: string;
  onSaveCheckoutUrlBasic: (val: string) => void;
}

export const ConfigSettingsModal: React.FC<ConfigSettingsModalProps> = ({
  isOpen,
  onClose,
  whatsappNumber,
  onSaveWhatsApp,
  checkoutUrlVip,
  onSaveCheckoutUrlVip,
  checkoutUrlBasic,
  onSaveCheckoutUrlBasic
}) => {
  const [localPhone, setLocalPhone] = useState(whatsappNumber);
  const [localUrlVip, setLocalUrlVip] = useState(checkoutUrlVip);
  const [localUrlBasic, setLocalUrlBasic] = useState(checkoutUrlBasic);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveWhatsApp(localPhone);
    onSaveCheckoutUrlVip(localUrlVip);
    onSaveCheckoutUrlBasic(localUrlBasic);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
  };

  const handleTestLink = (url: string) => {
    if (!url) return;
    let finalUrl = url.trim();
    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      finalUrl = `https://${finalUrl}`;
    }
    window.open(finalUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#0A0A0A] border border-cyan-500/40 rounded-2xl p-6 text-white shadow-2xl my-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors cursor-pointer border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <Settings className="w-5 h-5 text-cyan-400" />
          <h3 className="text-lg font-black text-white tracking-tight">Configurações de Checkout Externo</h3>
        </div>
        <p className="text-xs text-gray-400 mb-5 leading-relaxed">
          Configure os links externos da sua plataforma de pagamentos (<strong>Kiwify, Hotmart, Braip, Eduzz, Mercado Pago</strong>). Todos os botões de comprar irão redirecionar automaticamente para estes links!
        </p>

        <div className="space-y-4 mb-6">
          {/* Link VIP */}
          <div className="bg-[#0e141a] border border-cyan-500/30 rounded-xl p-3.5">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                <Link className="w-3.5 h-3.5 text-cyan-400" />
                Link de Checkout • MEGA PACK VIP (R$ 37,90):
              </label>
              {localUrlVip && (
                <button
                  type="button"
                  onClick={() => handleTestLink(localUrlVip)}
                  className="text-[10px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 underline cursor-pointer"
                >
                  <ExternalLink className="w-3 h-3" /> Testar
                </button>
              )}
            </div>
            <input
              type="text"
              value={localUrlVip}
              onChange={(e) => setLocalUrlVip(e.target.value)}
              placeholder="https://pay.kiwify.com.br/seu-link-vip..."
              className="w-full bg-black border border-white/15 rounded-lg py-2 px-3 text-xs text-white focus:border-cyan-400 outline-none font-mono"
            />
            <span className="text-[10px] text-gray-400 mt-1 block">
              Utilizado nos botões do Mega Pack VIP, barra fixa, primeira dobra e roleta com cupom.
            </span>
          </div>

          {/* Link Essencial */}
          <div className="bg-[#0e141a] border border-white/10 rounded-xl p-3.5">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
                <Link className="w-3.5 h-3.5 text-cyan-400" />
                Link de Checkout • PACK ESSENCIAL (R$ 27,90):
              </label>
              {localUrlBasic && (
                <button
                  type="button"
                  onClick={() => handleTestLink(localUrlBasic)}
                  className="text-[10px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 underline cursor-pointer"
                >
                  <ExternalLink className="w-3 h-3" /> Testar
                </button>
              )}
            </div>
            <input
              type="text"
              value={localUrlBasic}
              onChange={(e) => setLocalUrlBasic(e.target.value)}
              placeholder="https://pay.kiwify.com.br/seu-link-essencial..."
              className="w-full bg-black border border-white/15 rounded-lg py-2 px-3 text-xs text-white focus:border-cyan-400 outline-none font-mono"
            />
            <span className="text-[10px] text-gray-400 mt-1 block">
              Utilizado no botão do card Pack Essencial na tabela de preços.
            </span>
          </div>

          {/* WhatsApp */}
          <div className="bg-[#0e141a] border border-white/10 rounded-xl p-3.5">
            <label className="block text-xs font-bold text-gray-300 mb-1.5 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              Número de WhatsApp para Suporte:
            </label>
            <input
              type="text"
              value={localPhone}
              onChange={(e) => setLocalPhone(e.target.value)}
              placeholder="5511999999999"
              className="w-full bg-black border border-white/15 rounded-lg py-2 px-3 text-xs text-white focus:border-cyan-400 outline-none font-mono"
            />
            <span className="text-[10px] text-gray-400 mt-1 block">Ex: 5511987654321 (apenas números com DDD)</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4 text-[11px] text-cyan-300 bg-cyan-950/40 p-2.5 rounded-lg border border-cyan-500/20">
          <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>Os links ficam salvos permanentemente no seu navegador e podem ser alterados quando você quiser.</span>
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs sm:text-sm py-3.5 rounded-xl shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer uppercase tracking-tight transition-all"
        >
          {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? 'Links e Configurações Salvos!' : 'Salvar Links de Checkout'}
        </button>
      </div>
    </div>
  );
};
