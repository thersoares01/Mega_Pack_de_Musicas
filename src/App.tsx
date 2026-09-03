import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  MessageCircle, 
  Settings, 
  ShieldCheck, 
  FolderArchive, 
  Disc3,
  Gift
} from 'lucide-react';

import { PlanItem } from './types';
import { PLANS_DATA } from './data/mockData';
import { TopUrgencyBanner } from './components/TopUrgencyBanner';
import { HeroSection } from './components/HeroSection';
import { PsychologicalComparison } from './components/PsychologicalComparison';
import { GenreShowcase } from './components/GenreShowcase';
import { BonusStackSection } from './components/BonusStackSection';
import { PricingSection } from './components/PricingSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { StickyBottomBar } from './components/StickyBottomBar';
import { WhatsAppSupportModal } from './components/WhatsAppSupportModal';
import { ConfigSettingsModal } from './components/ConfigSettingsModal';
import { ExitIntentRoulette, CouponData } from './components/ExitIntentRoulette';

export default function App() {
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isRouletteOpen, setIsRouletteOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<CouponData | null>(null);

  // Editable settings stored in localStorage
  const [whatsappNumber, setWhatsappNumber] = useState(() => {
    return localStorage.getItem('pack_wa_number') || '5511999999999';
  });

  const [checkoutUrlVip, setCheckoutUrlVip] = useState(() => {
    return localStorage.getItem('pack_checkout_url_vip') || 
      localStorage.getItem('pack_checkout_url') || 
      'https://pay.kiwify.com.br/checkout-vip';
  });

  const [checkoutUrlBasic, setCheckoutUrlBasic] = useState(() => {
    return localStorage.getItem('pack_checkout_url_basic') || 
      'https://pay.kiwify.com.br/checkout-essencial';
  });

  // Gatilho de intenção de saída (Exit Intent)
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Quando o cursor se move para cima para fechar aba ou mudar de URL
      if (e.clientY <= 12) {
        const alreadyShown = sessionStorage.getItem('pack_roulette_exit_shown');
        if (!alreadyShown) {
          sessionStorage.setItem('pack_roulette_exit_shown', 'true');
          setIsRouletteOpen(true);
        }
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleSaveWhatsApp = (num: string) => {
    setWhatsappNumber(num);
    localStorage.setItem('pack_wa_number', num);
  };

  const handleSaveCheckoutUrlVip = (url: string) => {
    setCheckoutUrlVip(url);
    localStorage.setItem('pack_checkout_url_vip', url);
    localStorage.setItem('pack_checkout_url', url); // compatibilidade
  };

  const handleSaveCheckoutUrlBasic = (url: string) => {
    setCheckoutUrlBasic(url);
    localStorage.setItem('pack_checkout_url_basic', url);
  };

  const scrollToPricing = () => {
    const el = document.getElementById('pricing-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToRepertoire = () => {
    const el = document.getElementById('repertorio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Redirecionamento Direto para o Link de Checkout Externo (Kiwify, Hotmart, Braip, Eduzz, etc)
  const redirectToExternalCheckout = (targetUrl: string, couponCode?: string) => {
    if (!targetUrl) return;
    let url = targetUrl.trim();
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = `https://${url}`;
    }

    if (couponCode) {
      const separator = url.includes('?') ? '&' : '?';
      // Injeta cupom nos padrões suportados pelas principais plataformas
      url = `${url}${separator}cupom=${encodeURIComponent(couponCode)}&coupon=${encodeURIComponent(couponCode)}`;
    }

    // Tenta abrir em nova aba de forma limpa; fallback para a janela atual se houver bloqueio
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      window.location.href = url;
    }
  };

  // Compra de plano específico pelo botão de comprar
  const handleBuyPlan = (plan: PlanItem, couponCode?: string) => {
    const activeCoupon = couponCode || (appliedCoupon ? appliedCoupon.code : undefined);
    let targetCheckoutUrl = '';
    
    if (plan.id === 'vip') {
      targetCheckoutUrl = checkoutUrlVip || plan.checkoutUrl || 'https://pay.kiwify.com.br/checkout-vip';
    } else {
      targetCheckoutUrl = checkoutUrlBasic || plan.checkoutUrl || 'https://pay.kiwify.com.br/checkout-essencial';
    }

    redirectToExternalCheckout(targetCheckoutUrl, activeCoupon);
  };

  // Compra direta do MEGA PACK VIP (plano principal promovido nos CTAs de compra)
  const handleBuyVip = (couponCode?: string) => {
    const vipPlan = PLANS_DATA.find(p => p.popular || p.id === 'vip') || PLANS_DATA[1];
    handleBuyPlan(vipPlan, couponCode);
  };

  const handleOpenVipCheckout = () => {
    handleBuyVip();
  };

  // Ao resgatar cupom na Roleta da Sorte: copia o código e redireciona direto para o checkout com desconto
  const handleApplyCouponFromRoulette = (coupon: CouponData) => {
    setAppliedCoupon(coupon);
    setIsRouletteOpen(false);

    try {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(coupon.code);
      }
    } catch {
      // ignore
    }

    handleBuyVip(coupon.code);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-gray-100 selection:bg-cyan-500 selection:text-black font-['Plus_Jakarta_Sans',sans-serif] overflow-x-hidden relative">
      {/* Top Cyan Glow Line */}
      <div className="fixed top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-70 z-50 pointer-events-none"></div>

      {/* Top Urgency Announcement Bar */}
      <TopUrgencyBanner onCtaClick={scrollToPricing} />

      {/* Main Clean Sticky Header */}
      <header className="border-b border-white/5 bg-[#090909]/95 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-cyan-500 flex items-center justify-center text-black font-black shadow-lg shadow-cyan-500/20">
              <Disc3 className="w-5 h-5 animate-spin-slow text-black" />
            </div>
            <div>
              <span className="font-extrabold text-base sm:text-lg tracking-tight uppercase text-white flex items-center gap-1">
                MEGA PACK <span className="text-cyan-400">2026</span>
              </span>
              <span className="text-[10px] text-cyan-400 font-bold -mt-0.5 flex items-center gap-1 uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block animate-pulse"></span>
                +150.000 MÚSICAS EM 320KBPS HD
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={scrollToRepertoire}
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-cyan-400 px-3 py-2 rounded-lg border border-white/10 hover:border-cyan-500/30 transition-all bg-white/[0.02] cursor-pointer"
            >
              <FolderArchive className="w-3.5 h-3.5 text-cyan-400" />
              Ver 38 Pastas
            </button>

            <button
              onClick={handleOpenVipCheckout}
              className="bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg shadow-cyan-500/25 flex items-center gap-1.5 cursor-pointer uppercase tracking-tight"
            >
              <Flame className="w-4 h-4 fill-black" />
              GARANTIR VIP POR R$ 37
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Sections - Clean, Laser-Focused Fluid Sales Path */}
      <main className="w-full">
        {/* 1. Hero Section with 1st CTA and Google Drive Showcase */}
        <HeroSection 
          onCtaClick={handleOpenVipCheckout} 
          onExploreRepertoire={scrollToRepertoire} 
        />

        {/* 2. Repertoire Explorer - All 38 Folders with Search and Tracklist */}
        <GenreShowcase />

        {/* 3. Psychological Contrast - Old Painful Way vs VIP Solution */}
        <PsychologicalComparison onCtaClick={handleOpenVipCheckout} />

        {/* 4. 8 VIP Bonus Stack - Adding Irresistible Perceived Value */}
        <BonusStackSection onCtaClick={handleOpenVipCheckout} />

        {/* 5. Pricing Offer - Focused on the R$ 37 Plan with Direct External Checkout */}
        <PricingSection onSelectPlan={handleBuyPlan} />

        {/* 6. Real Testimonials - Verified Reviews */}
        <TestimonialsSection />

        {/* 7. FAQ - Objection Handling */}
        <FaqSection onOpenWhatsApp={() => setIsWhatsAppOpen(true)} />
      </main>

      {/* Clean Minimalist Footer */}
      <footer className="bg-black border-t border-white/5 pt-8 sm:pt-10 pb-20 sm:pb-14 px-4 text-gray-400 text-xs">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center text-black font-black">
                  <Disc3 className="w-5 h-5" />
                </div>
                <span className="font-bold text-white text-base tracking-tight uppercase">MEGA PACK DE MÚSICAS VIP 2026</span>
              </div>
              <p className="text-gray-400 leading-relaxed text-xs max-w-md">
                O maior e mais atualizado acervo musical para DJs, bares, restaurantes, promotores de eventos e amantes de som automotivo e alta fidelidade em 320kbps.
              </p>
              <div className="flex items-center gap-2 mt-4 text-cyan-400 font-semibold text-xs">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Site 100% Blindado com Criptografia SSL e Entrega Automática</span>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-xs">Links Rápidos</h4>
              <ul className="space-y-2">
                <li><button onClick={scrollToPricing} className="hover:text-cyan-400 transition-colors cursor-pointer">Tabela de Preços</button></li>
                <li><button onClick={scrollToRepertoire} className="hover:text-cyan-400 transition-colors cursor-pointer">Explorar 38 Pastas</button></li>
                <li><button onClick={() => setIsWhatsAppOpen(true)} className="hover:text-cyan-400 transition-colors cursor-pointer">Suporte WhatsApp</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-3 uppercase tracking-wider text-xs">Segurança & Entrega</h4>
              <ul className="space-y-2 text-gray-400">
                <li>• Pagamento Processado com Segurança</li>
                <li>• Liberação Instantânea via Checkout Seguro</li>
                <li>• Acesso Imediato no Google Drive</li>
                <li>• Sem Mensalidades ou Cobranças Extras</li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500 uppercase tracking-wider">
            <p>© 2026 MEGA PACK VIP • TODOS OS DIREITOS RESERVADOS.</p>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsConfigOpen(true)}
                className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1.5 transition-colors capitalize tracking-normal cursor-pointer bg-cyan-950/40 border border-cyan-500/30 px-3 py-1.5 rounded-lg"
                title="Configurar Links de Checkout Externos"
              >
                <Settings className="w-3.5 h-3.5" />
                Configurar Links de Checkout
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Clean Sticky Bottom Conversion Bar */}
      <StickyBottomBar onCtaClick={handleOpenVipCheckout} />

      {/* Floating Lucky Wheel Recovery Trigger (Acesso Rápido / Mobile / Teste) */}
      <div className="fixed bottom-20 left-4 z-40">
        <button
          onClick={() => setIsRouletteOpen(true)}
          className="bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-500 hover:brightness-110 text-black font-black text-xs py-2.5 px-3.5 rounded-full shadow-2xl shadow-cyan-500/30 flex items-center gap-2 cursor-pointer uppercase tracking-tight transform hover:scale-105 transition-all border border-white/20"
          title="Girar Roleta da Sorte"
        >
          <Gift className="w-4 h-4 fill-black" />
          <span className="hidden sm:inline">Roleta da Sorte • Ganhe até 20% OFF</span>
          <span className="sm:hidden font-black">Roleta 20% OFF</span>
        </button>
      </div>

      {/* Discrete WhatsApp Support Button */}
      <div className="fixed bottom-20 right-4 z-40">
        <button
          onClick={() => setIsWhatsAppOpen(true)}
          className="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black flex items-center justify-center shadow-2xl shadow-emerald-500/30 transform hover:scale-110 transition-all cursor-pointer group relative"
          title="Fale Conosco no WhatsApp"
        >
          <MessageCircle className="w-6 h-6 fill-black" />
          <span className="absolute right-14 bg-black/90 text-white border border-white/10 text-xs px-2.5 py-1 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
            Dúvidas? Fale no WhatsApp
          </span>
        </button>
      </div>

      {/* Exit Intent Lucky Roulette Modal (Recuperação de Saída) */}
      <ExitIntentRoulette
        isOpen={isRouletteOpen}
        onClose={() => setIsRouletteOpen(false)}
        onApplyCoupon={handleApplyCouponFromRoulette}
      />

      {/* WhatsApp Chat Support Bubble Modal */}
      <WhatsAppSupportModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
        whatsappNumber={whatsappNumber}
      />

      {/* Config Settings Modal */}
      <ConfigSettingsModal
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        whatsappNumber={whatsappNumber}
        onSaveWhatsApp={handleSaveWhatsApp}
        checkoutUrlVip={checkoutUrlVip}
        onSaveCheckoutUrlVip={handleSaveCheckoutUrlVip}
        checkoutUrlBasic={checkoutUrlBasic}
        onSaveCheckoutUrlBasic={handleSaveCheckoutUrlBasic}
      />
    </div>
  );
}
