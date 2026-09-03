import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldCheck, 
  Zap, 
  Copy, 
  Check, 
  Clock, 
  QrCode, 
  CreditCard, 
  Sparkles, 
  ExternalLink,
  Lock,
  Download,
  AlertCircle,
  Tag,
  Gift
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PlanItem } from '../types';
import { RECOVERY_COUPONS, CouponData } from './ExitIntentRoulette';

interface CheckoutModalProps {
  plan: PlanItem | null;
  isOpen: boolean;
  onClose: () => void;
  customCheckoutUrl?: string;
  appliedCoupon?: CouponData | null;
  onApplyCoupon?: (coupon: CouponData | null) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ 
  plan, 
  isOpen, 
  onClose,
  customCheckoutUrl,
  appliedCoupon = null,
  onApplyCoupon
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card'>('pix');
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [includeOrderBump, setIncludeOrderBump] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [pixTimeLeft, setPixTimeLeft] = useState(600); // 10 minutes
  const [errorMessage, setErrorMessage] = useState('');
  const [driveOpened, setDriveOpened] = useState(false);

  // Cupom de desconto
  const [inputCouponCode, setInputCouponCode] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ text: string; isError: boolean } | null>(null);
  const [currentCoupon, setCurrentCoupon] = useState<CouponData | null>(appliedCoupon);

  useEffect(() => {
    setCurrentCoupon(appliedCoupon);
  }, [appliedCoupon]);

  useEffect(() => {
    let interval: number;
    if (isOpen && !isSuccess) {
      interval = window.setInterval(() => {
        setPixTimeLeft(prev => (prev > 0 ? prev - 1 : 600));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOpen, isSuccess]);

  if (!isOpen || !plan) return null;

  const orderBumpPrice = 9.90;
  const basePrice = plan.promoPrice;
  const discountAmount = currentCoupon ? (basePrice * currentCoupon.percentage) / 100 : 0;
  const discountedBasePrice = Math.max(0, basePrice - discountAmount);
  const totalPrice = discountedBasePrice + (includeOrderBump ? orderBumpPrice : 0);

  const mockPixCode = `00020101021226840014br.gov.bcb.pix2562pix.packdemusicas.com.br/qr/${plan.id}520400005303986540${totalPrice.toFixed(2)}5802BR5925PACK DE MUSICAS VIP BRASIL6009SAO PAULO62070503***6304E8A2`;

  const handleApplyInputCoupon = () => {
    const cleanCode = inputCouponCode.trim().toUpperCase();
    if (!cleanCode) return;

    // Busca nos cupons da roleta
    const foundCoupon = Object.values(RECOVERY_COUPONS).find(c => c.code === cleanCode);
    if (foundCoupon) {
      setCurrentCoupon(foundCoupon);
      if (onApplyCoupon) onApplyCoupon(foundCoupon);
      setCouponFeedback({ text: `Cupom ${foundCoupon.code} aplicado com sucesso! (${foundCoupon.percentage}% OFF)`, isError: false });
      setInputCouponCode('');
    } else {
      setCouponFeedback({ text: 'Cupom inválido. Tente RECUPERA5, RECUPERA10, RECUPERA15 ou RECUPERA20.', isError: true });
    }
  };

  const handleRemoveCoupon = () => {
    setCurrentCoupon(null);
    if (onApplyCoupon) onApplyCoupon(null);
    setCouponFeedback(null);
  };

  const handleCopyPix = () => {
    navigator.clipboard.writeText(mockPixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSimulatePayment = () => {
    if (!name.trim() || !email.trim()) {
      setErrorMessage('Por favor, informe seu Nome Completo e E-mail para receber os dados de acesso.');
      return;
    }
    setErrorMessage('');
    setIsSuccess(true);
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleDirectExternalCheckout = () => {
    if (customCheckoutUrl) {
      window.open(customCheckoutUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleOpenDrive = () => {
    setDriveOpened(true);
    setTimeout(() => {
      setDriveOpened(false);
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#0A0A0A] border border-cyan-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl text-white my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-colors cursor-pointer border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            {/* Modal Header */}
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full">
                🔒 Checkout Seguro 256-Bit
              </span>
              <span className="text-[10px] text-cyan-400 font-bold flex items-center gap-1">
                <Zap className="w-3 h-3" /> Liberação Automática
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white mb-1 tracking-tight">
              Você está garantindo o: <span className="text-cyan-400">{plan.name}</span>
            </h3>
            <p className="text-xs text-gray-400 mb-5">
              Preencha seus dados abaixo para receber o link do acervo no seu e-mail e WhatsApp:
            </p>

            {/* Error message banner */}
            {errorMessage && (
              <div className="mb-4 bg-rose-500/10 border border-rose-500/30 rounded-xl p-3 flex items-center gap-2 text-rose-300 text-xs animate-scale-up">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Custom URL Redirect Hook if present */}
            {customCheckoutUrl && (
              <div className="mb-4 bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-3 flex items-center justify-between">
                <span className="text-xs text-cyan-200">Gateway Oficial Vinculado:</span>
                <button
                  onClick={handleDirectExternalCheckout}
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 shadow cursor-pointer uppercase tracking-tight"
                >
                  Abrir Hotmart/Kiwify <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* Customer Inputs */}
            <div className="space-y-3 mb-5">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Seu Nome Completo:</label>
                <input
                  type="text"
                  placeholder="Ex: Carlos Eduardo Silveira"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-xl py-2.5 px-3 text-xs sm:text-sm text-white focus:border-cyan-400 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">Seu Melhor E-mail (Para Acesso):</label>
                  <input
                    type="email"
                    placeholder="seuemail@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-xl py-2.5 px-3 text-xs sm:text-sm text-white focus:border-cyan-400 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">WhatsApp com DDD:</label>
                  <input
                    type="tel"
                    placeholder="(11) 99999-9999"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-xl py-2.5 px-3 text-xs sm:text-sm text-white focus:border-cyan-400 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Order Bump (Gatilho da Oferta Irrecusável de 1 Clique) */}
            <div className="bg-[#080808] border border-cyan-500/30 rounded-xl p-3.5 mb-4 hover:border-cyan-400 transition-colors">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeOrderBump}
                  onChange={(e) => setIncludeOrderBump(e.target.checked)}
                  className="w-5 h-5 rounded mt-0.5 accent-cyan-400 cursor-pointer"
                />
                <div className="text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-cyan-400">🔥 OFERTA ÚNICA VIP:</span>
                    <span className="bg-rose-500/20 text-rose-300 px-1.5 py-0.2 rounded text-[10px] font-bold">80% OFF</span>
                  </div>
                  <p className="text-gray-200 font-bold mt-0.5">
                    Adicionar Pack 2.000 Acapellas Isoladas & Stems de Estúdio por apenas +R$ 9,90
                  </p>
                  <p className="text-gray-400 text-[11px] mt-0.5">
                    Vocais limpos para criar remixes ao vivo e mashups exclusivos na hora da mixagem.
                  </p>
                </div>
              </label>
            </div>

            {/* Cupom de Desconto da Roleta de Recuperação */}
            <div className="bg-[#0b0f14] border border-cyan-500/30 rounded-xl p-3 mb-4">
              {currentCoupon ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center">
                      <Gift className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        Cupom <strong className="text-cyan-400 font-mono">{currentCoupon.code}</strong> Ativo!
                      </span>
                      <span className="text-[11px] text-emerald-400 font-semibold block">
                        -{currentCoupon.percentage}% de Desconto Extra (-R$ {discountAmount.toFixed(2).replace('.', ',')})
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleRemoveCoupon}
                    className="text-[11px] text-gray-400 hover:text-rose-400 underline cursor-pointer"
                  >
                    Remover
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-300 font-bold mb-1.5">
                    <Tag className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Possui um cupom da Roleta da Sorte?</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Ex: RECUPERA20"
                      value={inputCouponCode}
                      onChange={(e) => setInputCouponCode(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleApplyInputCoupon();
                        }
                      }}
                      className="flex-1 bg-black border border-white/15 rounded-lg py-1.5 px-3 text-xs text-white uppercase font-mono tracking-wider focus:border-cyan-400 outline-none"
                    />
                    <button
                      onClick={handleApplyInputCoupon}
                      className="bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-black px-3 py-1.5 rounded-lg transition-all cursor-pointer uppercase tracking-tight"
                    >
                      Aplicar
                    </button>
                  </div>
                  {couponFeedback && (
                    <p className={`text-[11px] mt-1.5 font-medium ${couponFeedback.isError ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {couponFeedback.text}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Payment Method Switcher */}
            <div className="mb-4">
              <div className="flex rounded-xl bg-black p-1 border border-white/10">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('pix')}
                  className={`flex-1 py-2 rounded-lg text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-tight ${
                    paymentMethod === 'pix'
                      ? 'bg-cyan-500 text-black shadow-md'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Zap className="w-4 h-4 fill-current" />
                  PIX (Liberação em 10 Segundos)
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`flex-1 py-2 rounded-lg text-xs font-black transition-all flex items-center justify-center gap-1.5 cursor-pointer uppercase tracking-tight ${
                    paymentMethod === 'card'
                      ? 'bg-cyan-500 text-black shadow-md'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  Cartão de Crédito
                </button>
              </div>
            </div>

            {/* PIX Flow */}
            {paymentMethod === 'pix' ? (
              <div className="bg-black/60 border border-white/10 rounded-xl p-4 text-center mb-5">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                  <span className="font-bold text-white flex items-center gap-1">
                    <QrCode className="w-4 h-4 text-cyan-400" />
                    Pague com PIX Copia e Cola
                  </span>
                  <span className="text-cyan-400 flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    {Math.floor(pixTimeLeft / 60)}:{String(pixTimeLeft % 60).padStart(2, '0')}
                  </span>
                </div>

                {/* Simulated QR Code Graphic */}
                <div className="inline-block p-2 bg-white rounded-xl shadow-lg mb-3">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=packdemusicas_pix_simulation_2026"
                    alt="PIX QR Code"
                    className="w-32 h-32 mx-auto"
                  />
                </div>

                {/* Copy Paste Input */}
                <div className="relative mb-3">
                  <input
                    type="text"
                    readOnly
                    value={mockPixCode}
                    className="w-full bg-[#080808] border border-white/10 rounded-xl py-2 px-3 text-[10px] text-gray-400 font-mono pr-24 outline-none truncate"
                  />
                  <button
                    onClick={handleCopyPix}
                    className="absolute right-1 top-1 bottom-1 bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold px-3 rounded-lg flex items-center gap-1 cursor-pointer uppercase tracking-tight"
                  >
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copied ? 'Copiado!' : 'Copiar Código'}
                  </button>
                </div>

                <div className="space-y-1 pt-2 border-t border-white/10 text-xs text-left">
                  <div className="flex items-center justify-between text-gray-400 text-[11px]">
                    <span>Plano:</span>
                    <span>R$ {plan.promoPrice.toFixed(2).replace('.', ',')}</span>
                  </div>
                  {currentCoupon && (
                    <div className="flex items-center justify-between text-emerald-400 font-bold text-[11px]">
                      <span>Desconto Roleta ({currentCoupon.percentage}% OFF):</span>
                      <span>- R$ {discountAmount.toFixed(2).replace('.', ',')}</span>
                    </div>
                  )}
                  {includeOrderBump && (
                    <div className="flex items-center justify-between text-cyan-300 text-[11px]">
                      <span>Order Bump Acapellas:</span>
                      <span>+ R$ 9,90</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-1.5 border-t border-white/5">
                    <span className="text-gray-200 font-bold">Total a pagar no PIX:</span>
                    <span className="text-lg font-black text-cyan-400">
                      R$ {totalPrice.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              /* Card Flow Mock */
              <div className="space-y-3 bg-black/60 border border-white/10 rounded-xl p-4 mb-5">
                <div>
                  <label className="block text-[11px] font-bold text-gray-400 mb-1">Número do Cartão:</label>
                  <input
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    className="w-full bg-[#080808] border border-white/10 rounded-xl py-2 px-3 text-xs text-white outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 mb-1">Validade:</label>
                    <input
                      type="text"
                      placeholder="MM/AA"
                      className="w-full bg-[#080808] border border-white/10 rounded-xl py-2 px-3 text-xs text-white outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-400 mb-1">CVV:</label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full bg-[#080808] border border-white/10 rounded-xl py-2 px-3 text-xs text-white outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-1 pt-2 border-t border-white/10 text-xs text-left">
                  {currentCoupon && (
                    <div className="flex items-center justify-between text-emerald-400 font-bold text-[11px]">
                      <span>Desconto Roleta ({currentCoupon.percentage}% OFF):</span>
                      <span>- R$ {discountAmount.toFixed(2).replace('.', ',')}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-1 border-t border-white/5">
                    <span className="text-gray-200 font-bold">Total em até 12x:</span>
                    <span className="text-lg font-black text-cyan-400">
                      R$ {totalPrice.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Confirm Simulated Checkout Button */}
            <button
              onClick={handleSimulatePayment}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-black text-base py-4 rounded-xl shadow-xl shadow-cyan-500/20 transform hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-tight"
            >
              <Lock className="w-5 h-5" />
              CONFIRMAR E LIBERAR ACESSO IMEDIATO
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 mt-3">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Compra 100% Segura • Acesso Imediato</span>
            </div>
          </div>
        ) : (
          /* SUCCESSFUL PAYMENT UNLOCKED STATE */
          <div className="text-center py-4 animate-scale-up">
            <div className="w-16 h-16 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center mx-auto mb-4 border border-cyan-500/30">
              <Check className="w-10 h-10" />
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full">
              PAGAMENTO APROVADO COM SUCESSO!
            </span>

            <h3 className="text-2xl font-black text-white mt-2 mb-1">
              Parabéns, {name.split(' ')[0]}!
            </h3>
            <p className="text-xs text-gray-300 mb-6">
              Seu acesso ao <strong className="text-cyan-400">{plan.name}</strong> foi liberado e também enviado para <span className="text-white underline">{email}</span>.
            </p>

            {/* Simulated Google Drive Link Box */}
            <div className="bg-[#080808] border border-cyan-500/40 rounded-xl p-5 mb-6 text-left space-y-3">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-cyan-400" /> Seus Dados de Acesso VIP
                </span>
                <span className="text-[10px] bg-cyan-500/10 text-cyan-300 font-bold px-2 py-0.5 rounded border border-cyan-500/20">
                  Status: Acesso Ativo
                </span>
              </div>

              <p className="text-xs text-gray-300">
                <strong>Servidor Google Drive:</strong> drive.google.com/drive/folders/mega_pack_2026_vip
              </p>
              <p className="text-xs text-gray-300">
                <strong>Chave de Acesso:</strong> <span className="font-mono bg-black px-2 py-1 rounded text-cyan-400 border border-white/5">VIP-2026-{Math.floor(Math.random()*89999 + 10000)}</span>
              </p>
              <p className="text-xs text-gray-300">
                <strong>Canal Telegram de Atualizações:</strong> t.me/pack_musicas_vip_oficial
              </p>

              <button
                onClick={handleOpenDrive}
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs py-3 rounded-lg flex items-center justify-center gap-2 mt-3 shadow-lg cursor-pointer uppercase tracking-tight transition-all"
              >
                <Download className="w-4 h-4" />
                {driveOpened ? 'Abrindo Acesso na Nuvem...' : 'ACESSAR PASTAS DE MÚSICAS AGORA'}
              </button>

              {driveOpened && (
                <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-center text-xs text-cyan-300 animate-scale-up">
                  ✨ Redirecionando para as pastas do Google Drive com mais de 150.000 faixas...
                </div>
              )}
            </div>

            <button
              onClick={onClose}
              className="text-xs text-gray-400 hover:text-white underline font-semibold cursor-pointer"
            >
              Fechar Janela
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
