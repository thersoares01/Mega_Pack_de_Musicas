import React, { useState } from 'react';
import { Search, FolderCheck, CheckCircle2, Music2, Sparkles, Database } from 'lucide-react';
import { SEARCHABLE_ARTISTS_SAMPLE } from '../data/mockData';

export const PackSearchPreview: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredArtists = SEARCHABLE_ARTISTS_SAMPLE.filter(item =>
    item.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="py-16 px-4 bg-[#080808] relative">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 bg-cyan-500/5 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-widest px-3.5 py-1 rounded-full mb-3">
            <Database className="w-3.5 h-3.5 text-cyan-400" />
            Consulta Direta no Acervo
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-3 tracking-tight">
            Busque Seus Artistas Favoritos no Pack
          </h2>
          <p className="text-gray-400 text-sm">
            Digite o nome de qualquer cantor, banda ou DJ para ver a pasta correspondente e a quantidade média de faixas organizadas:
          </p>
        </div>

        {/* Live Search Input */}
        <div className="max-w-xl mx-auto relative mb-8">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Ex: Gusttavo Lima, Alok, Pagode, Flashback, Matuê..."
              className="w-full bg-[#0A0A0A] border border-white/10 focus:border-cyan-400 text-white placeholder-gray-500 rounded-xl py-4 pl-12 pr-4 text-sm font-medium outline-none shadow-xl transition-all"
            />
            <Search className="w-5 h-5 text-cyan-400 absolute left-4 top-1/2 -translate-y-1/2" />
          </div>

          {/* Quick chip buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs">
            <span className="text-gray-500 text-[11px] uppercase tracking-wider">Sugestões rápidas:</span>
            {['Sertanejo', 'Funk', 'Vintage Culture', 'Flashback', 'Piseiro'].map((chip) => (
              <button
                key={chip}
                onClick={() => setSearchTerm(chip)}
                className="bg-white/[0.03] hover:bg-white/[0.08] text-gray-400 hover:text-cyan-300 px-2.5 py-1 rounded-md transition-colors text-[11px] border border-white/5 cursor-pointer"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Results Box */}
        <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-4 sm:p-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 text-xs text-gray-400">
            <span className="flex items-center gap-1.5 font-bold text-gray-300 uppercase tracking-wider">
              <FolderCheck className="w-4 h-4 text-cyan-400" />
              {filteredArtists.length} Diretórios Encontrados
            </span>
            <span className="text-cyan-400 font-semibold flex items-center gap-1 uppercase tracking-wider text-[11px]">
              <Sparkles className="w-3.5 h-3.5" /> 100% em 320kbps HD
            </span>
          </div>

          {filteredArtists.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1 scrollbar-thin">
              {filteredArtists.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3.5 bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-cyan-500/40 rounded-xl transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                      <Music2 className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-bold text-white truncate">{item.artist}</p>
                      <p className="text-[11px] text-gray-400 truncate">{item.genre}</p>
                      <p className="text-[10px] font-mono text-gray-500 truncate mt-0.5">📂 {item.folder}</p>
                    </div>
                  </div>

                  <div className="text-right shrink-0 ml-3">
                    <span className="inline-block bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[10px] font-bold px-2 py-0.5 rounded-full mb-1">
                      {item.count}+ faixas
                    </span>
                    <p className="text-[10px] text-gray-400 flex items-center justify-end gap-1">
                      <CheckCircle2 className="w-3 h-3 text-cyan-400" /> Pronto
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-400 text-sm">Nenhum artista com esse nome específico na prévia.</p>
              <p className="text-xs text-cyan-400 mt-1">
                Não se preocupe! O pack possui mais de 150.000 músicas com todos os lançamentos e clássicos nacionais e internacionais.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
