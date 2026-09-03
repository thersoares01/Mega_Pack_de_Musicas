import { PlanItem, BonusItem, Testimonial, GenrePreview, SertanejoTestTrack, FaqItem, RecentBuyer } from '../types';

export const PLANS_DATA: PlanItem[] = [
  {
    id: 'basic',
    name: 'PACK ESSENCIAL',
    badge: 'Iniciante',
    popular: false,
    tracksCount: '+100.000 Músicas',
    storageSize: '65 GB em Nuvem',
    originalPrice: 97.00,
    promoPrice: 27.90,
    installments: '3x de R$ 9,80',
    description: 'Ideal para quem quer um repertório básico atualizado sem pagar mensalidades.',
    features: [
      'Mais de 100.000 Músicas em MP3 320kbps',
      'Pastas organizadas por Gênero',
      'Download rápido direto do Google Drive',
      'Acesso garantido por 1 Ano',
      'Compatível com Pendrive, Som Automotivo e JBL',
      '3 Bônus Essenciais inclusos',
      'Acesso Imediato e Suporte Dedicado'
    ],
    bonuses: [
      'Bônus: Top 100 Mais Tocadas no Brasil 2026',
      'Bônus: Pack Churrasco & Resenha',
      'Bônus: Gerador de Tags e Capas'
    ],
    checkoutUrl: 'https://pay.kiwify.com.br/checkout-essencial'
  },
  {
    id: 'vip',
    name: 'MEGA PACK VIP COMPLETO',
    badge: '🏆 MAIS VENDIDO • 85% OFF',
    popular: true,
    tracksCount: '+150.000 Músicas',
    storageSize: '240 GB em Nuvem',
    originalPrice: 297.00,
    promoPrice: 37.90,
    installments: '4x de R$ 10,20',
    description: 'A escolha de mais de 14.800 DJs, bares, baladas e apaixonados por música. Acesso Completo + Todos os Bônus.',
    features: [
      'Mais de 150.000 Músicas Selecionadas em 320kbps HD',
      'Organização Perfeita por BPM, Gênero, Ano e Energia',
      'Pastas Separadas: Versões Originais, Extended, Remix & Acapella',
      'ACESSO COMPLETO com Atualizações Semanais Grátis',
      'Canal VIP no Telegram com Lançamentos em Tempo Real',
      'Compatível com TODOS os Softwares de DJ (VirtualDJ, Serato, Rekordbox)',
      'Funciona 100% Offline em Pendrives, Celular, Carro e Caixas de Som',
      'Suporte VIP via WhatsApp com resposta em minutos',
      'SUPER BÔNUS: +2.000 Vídeos Clipes em Full HD / 4K',
      'TODOS OS 8 SUPER BÔNUS EXCLUSIVOS INCLUSOS',
      'Compra 100% Segura com Liberação Instantânea'
    ],
    bonuses: [
      '🔥 Bônus 1: Pack 5.000 Vinhetas e Efeitos de DJ (Valor R$ 97)',
      '🔥 Bônus 2: Acervo Flashback 70s, 80s, 90s e 2000s Remasterizado (Valor R$ 67)',
      '🔥 Bônus 3: Pack Sertanejo & Piseiro Paredão Edition (Valor R$ 47)',
      '🔥 Bônus 4: Super Pack 2.000 Vídeos Clipes em Full HD / 4K (Valor R$ 87)',
      '🔥 Bônus 5: Pack Transições Criativas & Intro Beats (Valor R$ 57)',
      '🔥 Bônus 6: Curso Express: Como Organizar Repertório Imbatível (Valor R$ 97)',
      '🔥 Bônus 7: Pastas Prontas de Playlist Temáticas (Churrasco, Academia, Barzinho)',
      '🔥 Bônus 8: Grupo Secreto de DJs VIP com Troca de Remixes Exclusivos'
    ],
    checkoutUrl: 'https://pay.kiwify.com.br/checkout-vip'
  }
];

export const BONUSES_DATA: BonusItem[] = [
  {
    id: 'b1',
    title: 'Pack 5.000 Vinhetas, Efeitos & FX Profissionais de DJ',
    category: 'Efeitos & Transições',
    estimatedValue: 97.00,
    description: 'Subidas eletrizantes, impactos de grave (808 drops), contagens regressivas e efeitos sonoros usados nos maiores festivais e rádios do país.',
    iconName: 'Sparkles',
    badge: 'GRÁTIS HOJE'
  },
  {
    id: 'b2',
    title: 'Acervo Flashback Ouro (Anos 70, 80, 90 e 2000) 100% Remasterizado',
    category: 'Flashback & Clássicos',
    estimatedValue: 67.00,
    description: 'Os maiores hinos mundiais e nacionais com frequências corrigidas e volume equalizado para não deixar sua pista esvaziar em festas temáticas.',
    iconName: 'Disc',
    badge: 'GRÁTIS HOJE'
  },
  {
    id: 'b3',
    title: 'Mega Pack Paredão & Som Automotivo Equalizado',
    category: 'Grave & Alta Potência',
    estimatedValue: 47.00,
    description: 'Músicas masterizadas com foco em médios definidos e subgraves sem distorção. Perfeito para caixas JBL, som de carro e caixas trio.',
    iconName: 'Volume2',
    badge: 'GRÁTIS HOJE'
  },
  {
    id: 'b4',
    title: 'Super Pack 2.000 Vídeos Clipes em Full HD & 4K',
    category: 'Vídeos Clipes & Telão',
    estimatedValue: 87.00,
    description: 'Mais de 2.000 vídeos clipes selecionados dos maiores sucessos nacionais e internacionais em altíssima resolução. Prontos para rodar em TVs, telões, bares, baladas, academias e paredões com áudio equalizado.',
    iconName: 'Video',
    badge: 'GRÁTIS HOJE'
  },
  {
    id: 'b5',
    title: 'Transições Rápidas de BPM (100 para 130 BPM, 128 para 150 BPM)',
    category: 'Mixagem Dinâmica',
    estimatedValue: 57.00,
    description: 'Faça a transição de Sertanejo para Funk ou de Eletrônica para Pagode com naturalidade absoluta sem quebrar o ritmo da galera.',
    iconName: 'Zap',
    badge: 'GRÁTIS HOJE'
  },
  {
    id: 'b6',
    title: 'Curso Rápido: Como Montar um Repertório Infalível em 15 Minutos',
    category: 'Treinamento Prático',
    estimatedValue: 97.00,
    description: 'Aprenda o segredo psicológico da leitura de pista para saber a hora exata de trocar o gênero e manter a energia no teto a noite toda.',
    iconName: 'BookOpen',
    badge: 'GRÁTIS HOJE'
  },
  {
    id: 'b7',
    title: '30 Playlists Pré-Configuradas Prontas para Tocar',
    category: 'Praticidade Imediata',
    estimatedValue: 49.00,
    description: 'Churrasco no Domingo, Academia Treino Pesado, Barzinho & MPB, Balada Eletrônica, Resenha Sunset, Sunset Lounge e muito mais.',
    iconName: 'Music',
    badge: 'GRÁTIS HOJE'
  },
  {
    id: 'b8',
    title: 'Acesso ao Grupo VIP Secreto no Telegram com Atualizações Semanais',
    category: 'Comunidade & Updates',
    estimatedValue: 97.00,
    description: 'Receba os hits que estouraram no TikTok e no Spotify antes de todo mundo diretamente no seu celular em links diretos.',
    iconName: 'Send',
    badge: 'GRÁTIS HOJE'
  }
];

export const SERTANEJO_TEST_TRACKS: SertanejoTestTrack[] = [
  {
    id: 'canudinho',
    title: 'Canudinho (Remix Club 2026)',
    artist: 'Gusttavo Lima feat. Lucas MPC',
    subgenre: 'Sertanejo Eletro-Club',
    bpm: 130,
    key: 'Fá Menor',
    audioUrl: '/audio/canudinho-remix.mp3',
    durationFormatted: '1:00 (Amostra Limitada)',
    badge: 'HIT DO MOMENTO',
    description: 'Batida club 4x4 pesada, subgrave rolante e vocais equalizados para estourar nas pistas.'
  },
  {
    id: 'foguete',
    title: 'Barulho do Foguete (Ao Vivo)',
    artist: 'Zé Neto & Cristiano',
    subgenre: 'Sertanejo Vanera & Ao Vivo',
    bpm: 118,
    key: 'Sol Maior',
    audioUrl: '/audio/barulho-foguete.mp3',
    durationFormatted: '1:00 (Amostra Limitada)',
    badge: 'ESTOURADO NO BRASIL',
    description: 'Ambiente de arena ao vivo, arranjo de violão e sanfona, e o efeito épico dos foguetes.'
  },
  {
    id: 'alo-inveja',
    title: 'Alô Inveja (Bebe Mais e Fala Menos)',
    artist: 'Zé Neto & Cristiano',
    subgenre: 'Modão Bruto & Paredão',
    bpm: 122,
    key: 'Ré Maior',
    audioUrl: '/audio/alo-inveja.mp3',
    durationFormatted: '1:00 (Amostra Limitada)',
    badge: 'MODÃO DE PAREDÃO',
    description: 'Riff marcante de viola caipira, sanfona estridente e resposta para quem cuida da vida alheia.'
  },
  {
    id: 'boiadeiras',
    title: 'As Boiadeiras / Galopada (Piseiro Remix)',
    artist: 'Ana Castela feat. DJ Gabinho',
    subgenre: 'Piseiro & Vaquejada',
    bpm: 138,
    key: 'Si Menor',
    audioUrl: '/audio/as-boiadeiras-piseiro.mp3',
    durationFormatted: '1:00 (Amostra Limitada)',
    badge: 'PISEIRO VIRAL',
    description: 'Baixo de teclado piseiro pulsante, sanfona galopada veloz e batida contagiante.'
  }
];

export const GENRES_PREVIEW: GenrePreview[] = [
  {
    id: 'sertanejo',
    name: 'Sertanejo & Piseiro',
    tracks: '48.500+ faixas',
    bpmRange: '115 - 145 BPM',
    icon: 'Flame',
    tag: 'Mais Tocado',
    color: 'from-amber-500/20 to-orange-500/20 border-amber-500/40 text-amber-400',
    sampleTracks: [
      'Gusttavo Lima - Canudinho (Remix Club)',
      'Zé Neto & Cristiano - Barulho do Foguete (Ao Vivo)',
      'Zé Neto & Cristiano - Alô Inveja (Bebe Mais e Fala Menos)',
      'Ana Castela - As Boiadeiras / Galopada (Piseiro Remix)'
    ],
    tempo: 130,
    style: 'sertanejo'
  },
  {
    id: 'funk',
    name: 'Funk Brasil & Mandelão',
    tracks: '36.200+ faixas',
    bpmRange: '130 - 160 BPM',
    icon: 'Radio',
    tag: 'Paredão & Pista',
    color: 'from-rose-500/20 to-purple-500/20 border-rose-500/40 text-rose-400',
    sampleTracks: ['MC Ryan SP - Tubarão Te Amo (DJ Bass Boost)', 'MC Hariel - Maçã Verde (Extended)', 'Dennis DJ - Tá OK (Festival Rework)', 'Funk 150BPM Rave Megamix 2026'],
    tempo: 140,
    style: 'funk'
  },
  {
    id: 'electro',
    name: 'House, Tech House & EDM',
    tracks: '42.800+ faixas',
    bpmRange: '124 - 132 BPM',
    icon: 'Headphones',
    tag: 'Balada & Sunset',
    color: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/40 text-cyan-400',
    sampleTracks: ['Vintage Culture - In The Dark (VIP Mix)', 'Alok - Hear Me Now 2026 Club Rework', 'Mochakk - Tech House Groove (Original)', 'Fisher - Losing It (Festival Intro Edit)'],
    tempo: 126,
    style: 'electro'
  },
  {
    id: 'pagode',
    name: 'Pagode & Samba Retrô',
    tracks: '29.400+ faixas',
    bpmRange: '85 - 110 BPM',
    icon: 'PartyPopper',
    tag: 'Churrasco & Resenha',
    color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/40 text-emerald-400',
    sampleTracks: ['Menos É Mais - Lapada Dela (Live Edit)', 'Sorriso Maroto - Assim Você Mata o Papai', 'Thiaguinho - Falando Segredo (HD Audio)', 'Turma do Pagode - Lancinho (Remaster 2026)'],
    tempo: 96,
    style: 'pagode'
  },
  {
    id: 'flashback',
    name: 'Flashback 70s, 80s & 90s',
    tracks: '38.000+ faixas',
    bpmRange: '100 - 135 BPM',
    icon: 'Disc',
    tag: 'Nostalgia Pura',
    color: 'from-violet-500/20 to-fuchsia-500/20 border-violet-500/40 text-violet-400',
    sampleTracks: ['Michael Jackson - Billie Jean (Mastered HD)', 'Queen - Don\'t Stop Me Now', 'Corona - The Rhythm of the Night (Original Club)', 'Lulu Santos - Tempos Modernos (Dance Rework)'],
    tempo: 118,
    style: 'flashback'
  },
  {
    id: 'gospel',
    name: 'Gospel & Louvor',
    tracks: '18.700+ faixas',
    bpmRange: '70 - 128 BPM',
    icon: 'Heart',
    tag: 'Eventos & Cultos',
    color: 'from-amber-200/20 to-yellow-500/20 border-amber-300/40 text-amber-200',
    sampleTracks: ['Gabriela Rocha - Me Atraiu (Playback & Voz)', 'Isaias Saad - Bondade de Deus', 'Fernandinho - Todas as Coisas', 'Morada - É Tudo Sobre Você (Live HD)'],
    tempo: 76,
    style: 'sertanejo'
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't1',
    name: 'Rodrigo Medeiros (DJ Rodrigão)',
    role: 'DJ de Casamentos e Formaturas',
    city: 'São Paulo - SP',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    comment: 'Trabalho com eventos há 8 anos e esse pack me economizou pelo menos 4 horas por semana que eu perdia garimpando músicas. O áudio é 100% limpo, sem vinhetas chatas de terceiros e com grave encorpado. Já se pagou no primeiro evento!',
    audioDuration: '0:34',
    date: 'Ontem às 18:42',
    verified: true,
    highlightTag: 'Cliente VIP desde 2024'
  },
  {
    id: 't2',
    name: 'Cleber Alencar',
    role: 'Proprietário de Bar & Espetaria',
    city: 'Goiânia - GO',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    comment: 'Eu dependia do Spotify no bar, mas a internet vivia caindo e os clientes reclamavam do silêncio. Joguei as pastas de Sertanejo e Pagode num pendrive e agora o som rola liso o dia inteiro sem falhar nada. Recomendo demais!',
    audioDuration: '0:28',
    date: 'Há 2 dias',
    verified: true,
    highlightTag: 'Comprador Verificado'
  },
  {
    id: 't3',
    name: 'Lucas P. (DJ Lukinhas)',
    role: 'DJ de Baile & Som Automotivo',
    city: 'Rio de Janeiro - RJ',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    comment: 'O pack de Funk e Eletrônica com versões Extended e Intro Beats é surreal de bom! Bater a mixagem ficou 10 vezes mais rápido. O suporte no WhatsApp me atendeu em 3 minutos quando tive dúvida de como baixar pelo Google Drive.',
    audioDuration: '0:45',
    date: 'Há 3 dias',
    verified: true,
    highlightTag: 'Pack VIP'
  },
  {
    id: 't4',
    name: 'Fernanda Martins',
    role: 'Professora de Spinning & Funcional',
    city: 'Curitiba - PR',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    comment: 'Minhas aulas de spinning mudaram completamente! As pastas já vêm separadas por BPM e energia, então monto minhas aulas em 5 minutos. Meus alunos elogiaram a batida das músicas.',
    audioDuration: '0:22',
    date: 'Há 5 dias',
    verified: true,
    highlightTag: 'Compradora Verificada'
  }
];

export const RECENT_BUYERS: RecentBuyer[] = [
  { name: 'Gabriel Santana', city: 'Campinas - SP', plan: 'MEGA PACK VIP COMPLETO', timeAgo: 'há 1 minuto', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80' },
  { name: 'Mateus Oliveira', city: 'Salvador - BA', plan: 'MEGA PACK VIP COMPLETO', timeAgo: 'há 3 minutos', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80' },
  { name: 'Bruno DJ Som', city: 'Belo Horizonte - MG', plan: 'MEGA PACK VIP COMPLETO', timeAgo: 'há 6 minutos', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&auto=format&fit=crop&q=80' },
  { name: 'Larissa Costa', city: 'Fortaleza - CE', plan: 'PACK ESSENCIAL', timeAgo: 'há 9 minutos', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80' },
  { name: 'Anderson Paredão', city: 'Recife - PE', plan: 'MEGA PACK VIP COMPLETO', timeAgo: 'há 12 minutos', avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=100&auto=format&fit=crop&q=80' }
];

export const FAQS_DATA: FaqItem[] = [
  {
    id: 'f1',
    category: 'entrega',
    question: 'Como e quando eu recebo o acesso ao Pack?',
    answer: 'A entrega é 100% AUTOMÁTICA e IMEDIATA! Assim que seu pagamento for confirmado (no PIX cai em menos de 10 segundos e no cartão em 1 minuto), você recebe os dados de acesso no seu e-mail e também pelo WhatsApp com todos os links diretos.'
  },
  {
    id: 'f2',
    category: 'dispositivos',
    question: 'Preciso baixar todas as 150.000 músicas de uma vez no meu computador?',
    answer: 'Não! O acervo fica hospedado em servidores na nuvem (Google Drive de alta velocidade). Você tem acesso liberado para baixar apenas os gêneros e pastas que quiser, quando quiser, ou salvar no seu computador/pendrive conforme sua necessidade.'
  },
  {
    id: 'f3',
    category: 'qualidade',
    question: 'As músicas funcionam em Pendrive, Caixa JBL, Som Automotivo e Celular?',
    answer: 'Sim, 100%! Todas as músicas estão no formato universal MP3 com taxa de bits máxima em 320kbps HD (áudio de estúdio sem perdas audíveis). Elas rodam perfeitamente em qualquer aparelho de som, mesa de DJ, celular Android/iPhone, caixas Bluetooth e centrais multimídia automotivas.'
  },
  {
    id: 'f4',
    category: 'qualidade',
    question: 'As músicas possuem propagandas ou vinhetas de outros sites gravadas nelas?',
    answer: 'NÃO! Todas as músicas do nosso acervo são limpas (Clean Tagged), sem propagandas intrusivas, sem vinhetas chatas gravadas no meio da música e sem cortes abruptos. Você pode tocar em público com segurança profissional total.'
  },
  {
    id: 'f5',
    category: 'entrega',
    question: 'Como funcionam as atualizações de novos lançamentos?',
    answer: 'No plano VIP Completo e Master, você tem acesso ao nosso canal VIP e pasta de atualizações semanais. Toda semana adicionamos as músicas que acabaram de estourar no Spotify, TikTok e nas paradas de sucesso sem você precisar pagar nada a mais por isso.'
  },
  {
    id: 'f6',
    category: 'pagamento',
    question: 'Como tenho certeza da qualidade e segurança da compra?',
    answer: 'Nosso site conta com criptografia bancária SSL e entrega 100% automática via Google Drive VIP. Todas as faixas passam por rigoroso controle de estúdio em 320kbps real, sem vírus e sem propagandas. Você conta também com nossa equipe de suporte VIP via WhatsApp pronta para te ajudar a qualquer momento.'
  },
  {
    id: 'f7',
    category: 'pagamento',
    question: 'É um pagamento único ou é mensalidade?',
    answer: 'É PAGAMENTO ÚNICO! Você paga apenas uma vez o valor promocional de hoje e tem acesso livre, sem nenhuma cobrança mensal recorrente ou taxas escondidas.'
  }
];

export const SEARCHABLE_ARTISTS_SAMPLE = [
  { artist: 'Gusttavo Lima', genre: 'Sertanejo Universitário', count: 184, folder: '02 SERTANEJO.rar / Gusttavo Lima Discografia 320k' },
  { artist: 'Alok', genre: 'Eletrônica & Remixes', count: 142, folder: '26 ELETRONICAS & DANCE.rar / Alok Extended Club Mixes' },
  { artist: 'Henrique & Juliano', genre: 'Sertanejo Modão & Ao Vivo', count: 160, folder: '02 SERTANEJO.rar / Henrique e Juliano Manifesto Musical' },
  { artist: 'MC Ryan SP', genre: 'Funk SP / Mandelão', count: 98, folder: '05 FUNK.rar / MC Ryan SP Hits e Feats' },
  { artist: 'Menos É Mais', genre: 'Pagode & Samba', count: 112, folder: '12 PAGODE & SAMBA.rar / Menos e Mais Completo Ao Vivo' },
  { artist: 'Vintage Culture', genre: 'Tech House / Deep', count: 130, folder: '26 ELETRONICAS & DANCE.rar / Vintage Culture Festival Edits' },
  { artist: 'Jorge & Mateus', genre: 'Sertanejo', count: 210, folder: '02 SERTANEJO.rar / Jorge e Mateus Todas As Eras' },
  { artist: 'Michael Jackson', genre: 'Flashback Internacional', count: 95, folder: '20 FLASHBACK.rar / Michael Jackson Remastered 320k' },
  { artist: 'Dennis DJ', genre: 'Funk & Eletrofunk', count: 88, folder: '28 ELETROFUNK.rar / Dennis DJ Paredao Sessions' },
  { artist: 'Ana Castela', genre: 'Agroplay / Sertanejo', count: 76, folder: '02 SERTANEJO.rar / Ana Castela Repertorio 2026' },
  { artist: 'Matuê & 30PRAUM', genre: 'Trap Nacional', count: 85, folder: '16 HIPHOP TRAP E RAP.rar / 30PRAUM Matue Teto Wiu' },
  { artist: 'Queen', genre: 'Rock Clássico / Flashback', count: 64, folder: '36 ROCK ANOS 80, 90 E 2000.rar / Queen Greatest Hits 320k' },
  { artist: 'João Gomes & Nattan', genre: 'Piseiro & Pisadinha', count: 124, folder: '06 PISEIRO & PISADINHA.rar / Joao Gomes Nattan Verão' },
  { artist: 'Sorriso Maroto', genre: 'Pagode Romântico', count: 145, folder: '12 PAGODE & SAMBA.rar / Sorriso Maroto Antigas e Novas' },
  { artist: 'David Guetta', genre: 'Dance / EDM', count: 175, folder: '26 ELETRONICAS & DANCE.rar / David Guetta Extended Remixes' },
  { artist: 'Gabriela Rocha', genre: 'Gospel / Adoração', count: 68, folder: '11 GOSPEL.rar / Gabriela Rocha Playback e Original' },
  { artist: 'Passagens & Racha Automotivo', genre: 'Som Automotivo', count: 120, folder: '33 PASSAGENS DE SOM & RACHA.rar / Testes Frequencias Graves' },
  { artist: 'Megafunk SC', genre: 'Megafunk Automotivo', count: 92, folder: '31 MEGAFUNK.rar / Megafunk Sets Automotivo SC' },
  { artist: 'Calcinha Preta & Mastruz', genre: 'Forró das Antigas', count: 135, folder: '15 BAU FORRÓ ANTIGO.rar / Forro Antigo Nostalgia' },
  { artist: 'Reginaldo Rossi & Amado', genre: 'Brega Raiz', count: 82, folder: '35 BREGAS ANTIGO.rar / Amado Batista Reginaldo Rossi' }
];
