import React, { useState, useMemo } from 'react';
import { 
  FolderArchive, 
  ShieldCheck, 
  FileCheck2
} from 'lucide-react';
import { PACK_FOLDERS_DATA } from '../data/packFolders';

// Curated high-resolution thumbnails related to each folder's musical content
const FOLDER_THUMBNAILS: Record<string, string> = {
  '01': 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=200&h=200&fit=crop&auto=format&q=80', // Lançamentos & Virais
  '02': 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=200&h=200&fit=crop&auto=format&q=80', // Sertanejo Universitário
  '03': 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&h=200&fit=crop&auto=format&q=80', // Arrocha / Sofrência
  '04': 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=200&h=200&fit=crop&auto=format&q=80', // Forró Novo
  '05': 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&h=200&fit=crop&auto=format&q=80', // Funk & Pancadão
  '06': 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=200&h=200&fit=crop&auto=format&q=80', // Piseiro & Pisadinha
  '07': 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=200&h=200&fit=crop&auto=format&q=80', // Flashback Remaster / Vinil
  '08': 'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=200&h=200&fit=crop&auto=format&q=80', // Sertanejo Raiz / Viola
  '09': 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=200&h=200&fit=crop&auto=format&q=80', // Forró das Antigas
  '10': 'https://images.unsplash.com/photo-1520523839898-507124cd537a?w=200&h=200&fit=crop&auto=format&q=80', // Samba & Pagode
  '11': 'https://images.unsplash.com/photo-1571266028243-3716f02d2d2e?w=200&h=200&fit=crop&auto=format&q=80', // Eletrônica / CDJ Mixer
  '12': 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=200&h=200&fit=crop&auto=format&q=80', // Trap Nacional & Internacional
  '13': 'https://images.unsplash.com/photo-1445985543469-433ecba627a0?w=200&h=200&fit=crop&auto=format&q=80', // Gospel & Adoração
  '14': 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=200&h=200&fit=crop&auto=format&q=80', // Axé & Carnaval
  '15': 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=200&h=200&fit=crop&auto=format&q=80', // Forró Romântico
  '16': 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=200&h=200&fit=crop&auto=format&q=80', // Hiphop Trap e Rap
  '17': 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=200&h=200&fit=crop&auto=format&q=80', // MPB & Rock
  '18': 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=200&h=200&fit=crop&auto=format&q=80', // Pé de Serra e Xote / Sanfona
  '19': 'https://images.unsplash.com/photo-1516873240891-4bf014598ab4?w=200&h=200&fit=crop&auto=format&q=80', // Forró de Favela
  '20': 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=200&h=200&fit=crop&auto=format&q=80', // Flashback Fita Retrô
  '21': 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=200&h=200&fit=crop&auto=format&q=80', // Forró de Médios / Corneta Som
  '22': 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=200&h=200&fit=crop&auto=format&q=80', // Forró Teclados
  '23': 'https://images.unsplash.com/photo-1547153760-18fc86324498?w=200&h=200&fit=crop&auto=format&q=80', // Lambada & Lambadão
  '24': 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=200&h=200&fit=crop&auto=format&q=80', // Forró Mineiro / Bailão
  '25': 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=200&h=200&fit=crop&auto=format&q=80', // Vaquejadas
  '26': 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=200&h=200&fit=crop&auto=format&q=80', // Eletrônicas & Dance Festival
  '27': 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=200&h=200&fit=crop&auto=format&q=80', // Bregadeira Arrochad & Axé
  '28': 'https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=200&h=200&fit=crop&auto=format&q=80', // Eletrofunk
  '29': 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=200&h=200&fit=crop&auto=format&q=80', // Reggae Remix
  '30': 'https://images.unsplash.com/photo-1541689592655-f5f52825a3b8?w=200&h=200&fit=crop&auto=format&q=80', // Bregafunk
  '31': 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=200&h=200&fit=crop&auto=format&q=80', // Megafunk
  '32': 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&auto=format&q=80', // Pancadão Antigo
  '33': 'https://images.unsplash.com/photo-1543083477-4f785aeafaa9?w=200&h=200&fit=crop&auto=format&q=80', // Passagens de Som & Subgrave
  '34': 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=200&h=200&fit=crop&auto=format&q=80', // Repiques Alterados & Efeitos
  '35': 'https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?w=200&h=200&fit=crop&auto=format&q=80', // Bregas Antigo / Seresta
  '36': 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=200&h=200&fit=crop&auto=format&q=80', // Rock Anos 80, 90 e 2000
  '37': 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=200&h=200&fit=crop&auto=format&q=80', // Gaúchas e Bandinhas / Gaita
  '38': 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=200&h=200&fit=crop&auto=format&q=80'  // Avulsas / Festa
};

const DEFAULT_THUMBNAIL = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&h=200&fit=crop&auto=format&q=80';

const CATEGORIES = [
  'Todas as 38 Pastas',
  'Lançamentos & Virais',
  'Sertanejo & Raiz',
  'Forró & Piseiro',
  'Funk & Pancadão',
  'Automotivo & Racha',
  'Samba & Axé',
  'Flashback, Rock & MPB',
  'Eletrônica & Dance',
  'Gospel, Reggae & Variados'
];

export const GenreShowcase: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Todas as 38 Pastas');

  // Filtered folders solely by category
  const filteredFolders = useMemo(() => {
    if (activeCategory === 'Todas as 38 Pastas') {
      return PACK_FOLDERS_DATA;
    }
    return PACK_FOLDERS_DATA.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <section className="py-10 sm:py-12 px-4 bg-[#080808] relative border-y border-white/5" id="repertorio">
      {/* Background glow effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-cyan-500/5 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/10 via-cyan-500/20 to-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-3 shadow-lg shadow-cyan-950/30">
            <FolderArchive className="w-3.5 h-3.5 text-cyan-400" />
            <span>ACERVO OFICIAL COMPLETO COM 38 PASTAS</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mt-2 mb-4 tracking-tight leading-tight">
            Repertório Infalível para Qualquer Tipo de Evento ou Público
          </h2>

          <p className="text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed">
            Confira abaixo a lista resumida das <strong className="text-white">38 pastas organizadas por gênero</strong> do nosso acervo. 
            Todas as faixas em <strong className="text-cyan-300">estúdio 320kbps</strong> prontas para baixar no Google Drive VIP.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-7 pt-6 border-t border-white/5 text-left">
            <div className="bg-[#0D0D0D] border border-white/10 rounded-xl p-3.5 hover:border-cyan-500/30 transition-all shadow-md">
              <span className="text-cyan-400 font-black text-xl block">38 Pastas VIP</span>
              <span className="text-[11px] text-gray-400">Do número 01 ao 38 completas</span>
            </div>
            <div className="bg-[#0D0D0D] border border-white/10 rounded-xl p-3.5 hover:border-cyan-500/30 transition-all shadow-md">
              <span className="text-emerald-400 font-black text-xl block">+150.000 Faixas</span>
              <span className="text-[11px] text-gray-400">Sem vinhetas chatas no meio</span>
            </div>
            <div className="bg-[#0D0D0D] border border-white/10 rounded-xl p-3.5 hover:border-cyan-500/30 transition-all shadow-md">
              <span className="text-amber-400 font-black text-xl block">320 kbps Real</span>
              <span className="text-[11px] text-gray-400">Masterização de estúdio nítida</span>
            </div>
            <div className="bg-[#0D0D0D] border border-white/10 rounded-xl p-3.5 hover:border-cyan-500/30 transition-all shadow-md">
              <span className="text-purple-400 font-black text-xl block">Google Drive VIP</span>
              <span className="text-[11px] text-gray-400">Baixe no celular ou computador</span>
            </div>
          </div>
        </div>

        {/* Simplified Category Filter Pills */}
        <div className="mb-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border ${
                    isActive
                      ? 'bg-cyan-500 text-black border-cyan-400 shadow-md shadow-cyan-500/20 font-black'
                      : 'bg-[#0D0D0D] hover:bg-white/[0.08] text-gray-400 hover:text-white border-white/10'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Counter Summary */}
        <div className="flex items-center justify-between gap-2 text-xs text-gray-400 mb-5 px-1">
          <div className="flex items-center gap-2 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              Exibindo <strong className="text-cyan-400 font-bold">{filteredFolders.length}</strong> de <strong className="text-white">38 pastas</strong>
            </span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" /> 100% Organizadas & Tagueadas
          </div>
        </div>

        {/* Clean, Minimalist VIP Cards: Miniature Photo related to content + Name + Description */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {filteredFolders.map((folder) => {
            const cleanTitle = folder.title.replace(/_/g, ' ');
            const thumbUrl = FOLDER_THUMBNAILS[folder.number] || DEFAULT_THUMBNAIL;

            return (
              <div
                key={folder.id}
                className="bg-[#0C0C0C] hover:bg-[#121212] border border-white/10 hover:border-cyan-500/40 rounded-xl p-4 sm:p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl group flex flex-col justify-start"
              >
                {/* Header: Photo Thumbnail + Folder Name */}
                <div className="flex items-start gap-3.5 mb-2.5">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden shrink-0 border border-white/10 group-hover:border-cyan-500/50 shadow-md relative bg-[#161616]">
                    <img
                      src={thumbUrl}
                      alt={cleanTitle}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = DEFAULT_THUMBNAIL;
                      }}
                    />
                    <span className="absolute bottom-1 right-1 bg-black/80 backdrop-blur-xs text-[9px] font-black text-cyan-400 px-1 py-0.2 rounded border border-white/10">
                      #{folder.number}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-black uppercase text-cyan-400 tracking-wider block mb-0.5">
                      PASTA {folder.number}
                    </span>
                    <h3 className="text-sm font-extrabold text-white group-hover:text-cyan-300 transition-colors tracking-tight leading-snug line-clamp-2">
                      {cleanTitle}
                    </h3>
                  </div>
                </div>

                {/* Description Only */}
                <p className="text-xs text-gray-400 leading-relaxed mt-1">
                  {folder.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout Banner */}
        <div className="mt-10 bg-gradient-to-r from-cyan-950/40 via-[#0A0A0A] to-cyan-950/40 border border-cyan-500/30 rounded-2xl p-6 sm:p-7 text-center shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-5">
            <div className="text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 mb-1">
                <FileCheck2 className="w-4 h-4" />
                <span>DOWNLOAD FLEXÍVEL DIRETO NO GOOGLE DRIVE</span>
              </div>
              <h4 className="text-base sm:text-lg md:text-xl font-black text-white">
                Todas as 38 Pastas Prontas para Baixar Individualmente ou de Uma Vez
              </h4>
              <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-2xl leading-relaxed">
                Você escolhe exatamente o que quer baixar no Google Drive VIP, direto para seu celular, computador ou pendrive.
              </p>
            </div>
            <a
              href="#precos"
              className="shrink-0 bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xs sm:text-sm uppercase tracking-tight py-3.5 px-7 rounded-xl shadow-lg shadow-cyan-500/30 transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              LIBERAR AS 38 PASTAS AGORA
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
