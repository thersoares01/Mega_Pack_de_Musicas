import React, { useState } from 'react';
import { 
  Play, 
  ShieldCheck, 
  Zap, 
  CheckCircle, 
  Flame, 
  DownloadCloud, 
  HardDrive, 
  Volume2, 
  FolderCheck,
  FolderArchive,
  Disc3,
  Award,
  ArrowRight,
  Sparkles,
  ExternalLink,
  Music,
  Check
} from 'lucide-react';

interface HeroSectionProps {
  onCtaClick: () => void;
  onExploreRepertoire?: () => void;
}

// Authentic 3D WinRAR Archive Icon
const WinRarIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6 shrink-0" }) => (
  <svg viewBox="0 0 28 28" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <filter id="hero-winrar-shadow" x="0" y="0" width="28" height="28" filterUnits="userSpaceOnUse">
      <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#000" floodOpacity="0.5" />
    </filter>
    <g filter="url(#hero-winrar-shadow)">
      {/* Book 1 (Top - Crimson/Red) */}
      <path d="M4 4C4 3.44772 4.44772 3 5 3H23C23.5523 3 24 3.44772 24 4V8C24 8.55228 23.5523 9 23 9H5C4.44772 9 4 8.55228 4 8V4Z" fill="#DC2626" />
      <line x1="6" y1="5.5" x2="11" y2="5.5" stroke="#FCA5A5" strokeWidth="1" strokeLinecap="round" />
      <line x1="6" y1="7" x2="9" y2="7" stroke="#FCA5A5" strokeWidth="0.8" strokeLinecap="round" />
      
      {/* Book 2 (Middle - Royal Blue) */}
      <path d="M4 9.5C4 8.94772 4.44772 8.5 5 8.5H23C23.5523 8.5 24 8.94772 24 9.5V13.5C24 14.0523 23.5523 14.5 23 14.5H5C4.44772 14.5 4 14.0523 4 13.5V9.5Z" fill="#2563EB" />
      <line x1="6" y1="11" x2="11" y2="11" stroke="#93C5FD" strokeWidth="1" strokeLinecap="round" />
      <line x1="6" y1="12.5" x2="9" y2="12.5" stroke="#93C5FD" strokeWidth="0.8" strokeLinecap="round" />
      
      {/* Book 3 (Bottom - Emerald Green) */}
      <path d="M4 15C4 14.4477 4.44772 14 5 14H23C23.5523 14 24 14.4477 24 15V19C24 19.5523 23.5523 20 23 20H5C4.44772 20 4 19.5523 4 19V15Z" fill="#059669" />
      <line x1="6" y1="16.5" x2="11" y2="16.5" stroke="#6EE7B7" strokeWidth="1" strokeLinecap="round" />
      <line x1="6" y1="18" x2="9" y2="18" stroke="#6EE7B7" strokeWidth="0.8" strokeLinecap="round" />
      
      {/* Golden Leather Belt Strap with Buckle */}
      <rect x="18" y="2" width="3.5" height="19.5" rx="0.8" fill="#D97706" stroke="#92400E" strokeWidth="0.6" />
      {/* Buckle metal */}
      <rect x="17.2" y="10" width="5.1" height="3.2" rx="0.6" fill="#FDE68A" stroke="#78350F" strokeWidth="0.8" />
      <rect x="18.5" y="10.8" width="2.5" height="1.6" rx="0.3" fill="#B45309" />
    </g>
  </svg>
);

// Flagship Folders to display in Hero Showcase
const HERO_FOLDERS = [
  {
    number: '01',
    name: 'As Mais Tocadas 2026',
    rarFile: '01 AS MAIS TOCADAS 2026.rar',
    tag: 'Hits do Momento',
    tagColor: 'from-amber-500/20 to-amber-500/10 text-amber-300 border-amber-500/30',
    tracks: '18.400 faixas',
    bpm: '120-138 BPM',
    size: '6.2 GB'
  },
  {
    number: '02',
    name: 'Sertanejo & Modão Raiz',
    rarFile: '02 SERTANEJO UNIVERSITARIO & MODAO.rar',
    tag: '320kbps HD',
    tagColor: 'from-cyan-500/20 to-cyan-500/10 text-cyan-300 border-cyan-500/30',
    tracks: '32.100 faixas',
    bpm: '115-145 BPM',
    size: '8.4 GB'
  },
  {
    number: '03',
    name: 'Funk & Mandelão Rave',
    rarFile: '03 FUNK SP & MANDELAO 2026.rar',
    tag: 'Bass Boost',
    tagColor: 'from-fuchsia-500/20 to-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/30',
    tracks: '24.800 faixas',
    bpm: '130-160 BPM',
    size: '5.8 GB'
  },
  {
    number: '04',
    name: 'Piseiro & Forró Paredão',
    rarFile: '04 PISEIRO & FORRO DE VAQUEJADA.rar',
    tag: 'Paredão Forte',
    tagColor: 'from-emerald-500/20 to-emerald-500/10 text-emerald-300 border-emerald-500/30',
    tracks: '19.600 faixas',
    bpm: '135-155 BPM',
    size: '5.2 GB'
  },
  {
    number: '05',
    name: 'Eletrônica & Tech House',
    rarFile: '05 HOUSE EDM & TECHNO CLUB.rar',
    tag: 'Extended Club',
    tagColor: 'from-blue-500/20 to-blue-500/10 text-blue-300 border-blue-500/30',
    tracks: '21.500 faixas',
    bpm: '124-130 BPM',
    size: '6.9 GB'
  },
  {
    number: '06',
    name: 'Pagode & Samba Retrô',
    rarFile: '06 PAGODE & SAMBA RETRO.rar',
    tag: 'Clean Tag',
    tagColor: 'from-orange-500/20 to-orange-500/10 text-orange-300 border-orange-500/30',
    tracks: '16.900 faixas',
    bpm: '85-115 BPM',
    size: '4.7 GB'
  },
  {
    number: '07',
    name: 'Flashback Anos 70 80 90',
    rarFile: '07 FLASHBACK REMASTERIZADO.rar',
    tag: 'Remaster Ouro',
    tagColor: 'from-yellow-500/20 to-yellow-500/10 text-yellow-300 border-yellow-500/30',
    tracks: '22.300 faixas',
    bpm: 'Nacional & Int.',
    size: '7.1 GB'
  },
  {
    number: '08',
    name: 'DJ Tools & Efeitos Sonoros',
    rarFile: '08 DJ TOOLS VINHETAS & FX.rar',
    tag: 'Acapellas & FX',
    tagColor: 'from-purple-500/20 to-purple-500/10 text-purple-300 border-purple-500/30',
    tracks: '5.000 efeitos',
    bpm: 'Efeitos DJ',
    size: '2.5 GB'
  }
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onCtaClick, onExploreRepertoire }) => {
  const [activeHoveredFolder, setActiveHoveredFolder] = useState<number | null>(null);

  const scrollToRepertorio = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('repertorio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-5 sm:pt-7 pb-10 sm:pb-12 px-4 overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[750px] h-[360px] bg-cyan-500/10 blur-[140px] -z-10 pointer-events-none rounded-full" />
      <div className="absolute top-48 right-10 w-72 h-72 bg-cyan-500/5 rounded-full blur-[110px] -z-10" />

      <div className="max-w-6xl mx-auto text-center">
        {/* Authority & Updated Pill */}
        <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-1.5 mb-5 shadow-lg shadow-cyan-500/10 animate-fade-in">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-cyan-400" />
            Edição Oficial 2026 • Atualizado Esta Semana
          </span>
          <span className="text-white/20 text-xs">|</span>
          <div className="flex items-center gap-1 text-xs text-gray-300">
            <div className="flex text-cyan-400 text-[10px]">
              {'★'.repeat(5)}
            </div>
            <span className="font-bold text-white">4.9/5</span>
            <span className="text-gray-400 hidden sm:inline">(+14.850 DJs e Clientes)</span>
          </div>
        </div>

        {/* Main Headline with 150.000 Musicas */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.15] mb-5">
          Nunca Mais Perca Tempo Baixando Músicas com Vírus:{' '}
          <span className="text-cyan-400 underline decoration-cyan-500/50 decoration-wavy decoration-2">
            Tenha +150.000 Músicas
          </span>{' '}
          em 320kbps HD Organizadas por Pastas!
        </h1>

        {/* Sub-headline */}
        <p className="max-w-3xl mx-auto text-gray-300 text-sm sm:text-base md:text-lg mb-8 leading-relaxed font-normal">
          O maior e mais completo acervo do Brasil distribuído em <strong className="text-white font-semibold">38 Pastas RAR</strong> prontas. 
          Sertanejo, Funk, Eletrônica, Flashback, Pagode, Piseiro, Gospel e Som Automotivo. 
          Organizado por BPM, versões estendidas e originais. Compatível com <span className="text-cyan-400 font-bold">Pendrive, JBL, Som Automotivo e Softwares de DJ</span>.
        </p>

        {/* ========================================================================= */}
        {/* PRIMEIRA DOBRA: PRIMEIRO BOTÃO DE AÇÃO DIRETO (ALTA VISIBILIDADE E CONVERSÃO) */}
        {/* ========================================================================= */}
        <div className="max-w-xl mx-auto mb-10">
          <button
            onClick={onCtaClick}
            className="w-full relative group overflow-hidden bg-cyan-500 hover:bg-cyan-400 text-black font-black text-lg sm:text-xl py-4 sm:py-5 px-6 rounded-2xl shadow-[0_0_40px_rgba(6,182,212,0.45)] transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer uppercase tracking-tight"
          >
            <div className="flex flex-col items-center justify-center">
              <span className="flex items-center gap-2 uppercase tracking-tight text-base sm:text-xl font-black">
                <Flame className="w-5 h-5 sm:w-6 sm:h-6 fill-black text-black" />
                QUERO O MEGA PACK VIP POR APENAS R$ 37
              </span>
              <span className="text-xs sm:text-sm font-bold text-black/85 mt-0.5 tracking-normal">
                ⚡ Acesso Imediato • 85% de Desconto Liberado
              </span>
            </div>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-1000" />
          </button>

          {/* Micro Trust Indicators below First Button */}
          <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-5 text-xs text-gray-400 mt-3.5">
            <div className="flex items-center gap-1.5 text-gray-300">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Compra 100% Segura & Criptografada</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-300">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>Download Imediato no Google Drive</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-300">
              <CheckCircle className="w-4 h-4 text-cyan-400" />
              <span>Acesso Completo sem Mensalidades</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PARTE DO SITE REFEITA & ULTRA CHAMATIVA: EXPLORADOR VIP GOOGLE DRIVE & PASTAS RAR */}
        {/* ========================================================================= */}
        <div className="relative max-w-5xl mx-auto mb-12 group">
          {/* Pulsing Neon Cyan Border Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/40 via-cyan-400/20 to-cyan-500/40 rounded-3xl blur-lg opacity-60 group-hover:opacity-100 transition duration-700 pointer-events-none"></div>

          <div className="relative bg-[#090909] border border-cyan-500/40 rounded-2xl p-4 sm:p-6 sm:pb-7 shadow-2xl overflow-hidden backdrop-blur-xl">
            
            {/* Top Bar: macOS/Google Drive VIP Directory Breadcrumbs */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-white/10 pb-3.5 mb-5 gap-3">
              {/* Window buttons & path */}
              <div className="flex items-center gap-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500 shadow-sm shadow-rose-500/50 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50 inline-block"></span>
                </div>
                <div className="h-4 w-[1px] bg-white/10 mx-1 hidden sm:block" />
                <div className="flex items-center gap-1.5 text-xs text-gray-300 font-mono">
                  <span className="text-cyan-400 font-bold">Google Drive VIP</span>
                  <span className="text-gray-600">/</span>
                  <span className="text-white font-semibold">MEGA PACK 2026</span>
                  <span className="text-gray-600">/</span>
                  <span className="text-emerald-400 font-black bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 text-[10px]">
                    38 PASTAS RAR
                  </span>
                </div>
              </div>

              {/* Status Badge right */}
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 text-[11px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-full font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Sincronizado & Liberado (240 GB)
                </span>
                <span className="hidden md:inline-flex items-center gap-1 text-[11px] text-cyan-400 font-semibold bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
                  <Zap className="w-3 h-3" /> Download Ilimitado
                </span>
              </div>
            </div>

            {/* Sub-header inside showcase */}
            <div className="flex items-center justify-between mb-4 text-left px-1">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-cyan-400 block">
                  Visão Geral do Acervo Oficial
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Pastas compactadas com masterização 320kbps real e tags organizadas
                </h3>
              </div>
              <a
                href="#repertorio"
                onClick={scrollToRepertorio}
                className="text-xs font-bold text-cyan-400 hover:text-cyan-300 underline underline-offset-4 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>Ver todas as 38 pastas</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* 8 Flagship Folders Grid - Visually Rich and Ultra Clean (No Underscores) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5 text-left">
              {HERO_FOLDERS.map((folder, index) => {
                const isHovered = activeHoveredFolder === index;

                return (
                  <div
                    key={folder.number}
                    onMouseEnter={() => setActiveHoveredFolder(index)}
                    onMouseLeave={() => setActiveHoveredFolder(null)}
                    onClick={scrollToRepertorio}
                    className="bg-[#111111] hover:bg-[#161616] border border-white/10 hover:border-cyan-400/50 p-3.5 rounded-xl transition-all duration-200 cursor-pointer group/card relative overflow-hidden shadow-md hover:shadow-cyan-500/10 hover:-translate-y-0.5"
                  >
                    {/* Corner cyan highlight on hover */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-cyan-500/10 via-transparent to-transparent pointer-events-none group-hover/card:from-cyan-500/20 transition-all" />

                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <WinRarIcon className="w-5 h-5 shrink-0" />
                        <span className="text-[10px] font-black font-mono text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded border border-cyan-500/20">
                          PASTA {folder.number}
                        </span>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border bg-gradient-to-r ${folder.tagColor}`}>
                        {folder.tag}
                      </span>
                    </div>

                    {/* Folder Name (Clean typography, no raw symbols) */}
                    <p className="text-xs font-extrabold text-white group-hover/card:text-cyan-300 transition-colors truncate">
                      {folder.name}
                    </p>

                    {/* Rar filename pill */}
                    <div className="text-[10px] text-gray-400 font-mono truncate mt-0.5 bg-black/40 px-1.5 py-0.5 rounded border border-white/5 inline-block max-w-full">
                      {folder.rarFile}
                    </div>

                    {/* Footer stats with live equalizing indicator */}
                    <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-white/5 text-[10px] text-gray-400">
                      <span>{folder.tracks}</span>
                      <div className="flex items-center gap-1 font-mono text-cyan-400 font-semibold">
                        <HardDrive className="w-3 h-3 text-cyan-400" />
                        <span>{folder.size}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Direct Google Drive Access & Repertoire Explorer Hook */}
            <div className="bg-gradient-to-r from-cyan-950/30 via-[#101010] to-cyan-950/30 border border-cyan-500/30 rounded-xl p-3.5 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-left shadow-lg">
              <div className="flex items-center gap-3.5 w-full sm:w-auto">
                <div className="relative w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shrink-0 shadow-md shadow-cyan-500/20">
                  <FolderCheck className="w-6 h-6 text-cyan-400" />
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-black flex items-center justify-center text-[9px] font-black text-black">
                    VIP
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="text-xs sm:text-sm font-black text-white uppercase tracking-wide flex items-center gap-1.5">
                      <FolderArchive className="w-4 h-4 text-cyan-400" />
                      Acervo 100% Organizado em Pastas por Gênero & BPM
                    </h4>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                      Pronto para Tocar
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-gray-400 mt-0.5">
                    Todas as faixas tagueadas em 320kbps Master HD, prontas para pen drive, som automotivo e mesas de DJ.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0">
                <a
                  href="#repertorio"
                  onClick={(e) => {
                    scrollToRepertorio(e);
                    if (onExploreRepertoire) onExploreRepertoire();
                  }}
                  className="w-1/2 sm:w-auto px-4 py-2.5 rounded-xl border border-white/10 hover:border-cyan-500/30 text-xs font-bold text-gray-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.06] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Music className="w-3.5 h-3.5 text-cyan-400" />
                  Ver 38 Pastas
                </a>
                <button
                  onClick={onCtaClick}
                  className="w-1/2 sm:w-auto bg-cyan-500 hover:bg-cyan-400 text-black font-black px-5 py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-md shadow-cyan-500/20 uppercase tracking-wider cursor-pointer"
                >
                  <DownloadCloud className="w-4 h-4 text-black" />
                  ACESSAR DRIVE
                </button>
              </div>
            </div>

            {/* Bottom notification in showcase */}
            <div className="mt-3 text-center">
              <span className="text-[11px] text-gray-400 inline-flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Todas as 38 Pastas RAR disponíveis no Google Drive com download individual ou em lote</span>
              </span>
            </div>

          </div>
        </div>

        {/* Compatibility Logos Marquee */}
        <div className="mt-8 pt-8 border-t border-white/10">
          <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-4">
            Compatível com todos os dispositivos, mesas e programas:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-gray-400 text-sm font-semibold">
            <span className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
              <Disc3 className="w-4 h-4 text-cyan-400" /> Serato DJ
            </span>
            <span className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
              <Disc3 className="w-4 h-4 text-cyan-400" /> Virtual DJ
            </span>
            <span className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
              <Disc3 className="w-4 h-4 text-cyan-400" /> Pioneer Rekordbox
            </span>
            <span className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
              <HardDrive className="w-4 h-4 text-cyan-400" /> Pendrives & Som Automotivo
            </span>
            <span className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
              <Volume2 className="w-4 h-4 text-cyan-400" /> Caixas JBL & Bluetooth
            </span>
            <span className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
              <DownloadCloud className="w-4 h-4 text-cyan-400" /> Google Drive Nuvem
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
