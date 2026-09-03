export interface PlanItem {
  id: string;
  name: string;
  badge?: string;
  popular?: boolean;
  tracksCount: string;
  storageSize: string;
  originalPrice: number;
  promoPrice: number;
  installments: string;
  description: string;
  features: string[];
  bonuses: string[];
  checkoutUrl?: string;
}

export interface BonusItem {
  id: string;
  title: string;
  category: string;
  estimatedValue: number;
  description: string;
  iconName: string;
  badge: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  city: string;
  avatar: string;
  rating: number;
  comment: string;
  audioDuration?: string;
  date: string;
  verified: boolean;
  highlightTag?: string;
}

export interface GenrePreview {
  id: string;
  name: string;
  tracks: string;
  bpmRange: string;
  icon: string;
  tag: string;
  color: string;
  sampleTracks: string[];
  tempo: number;
  style: 'sertanejo' | 'funk' | 'electro' | 'pagode' | 'flashback' | 'forro';
}

export interface SertanejoTestTrack {
  id: string;
  title: string;
  artist: string;
  subgenre: string;
  bpm: number;
  key: string;
  audioUrl: string;
  durationFormatted: string;
  badge: string;
  description: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'entrega' | 'qualidade' | 'dispositivos' | 'pagamento';
}

export interface RecentBuyer {
  name: string;
  city: string;
  plan: string;
  timeAgo: string;
  avatar: string;
}

export interface PackFolderItem {
  id: string;
  number: string;
  filename: string;
  title: string;
  category: string;
  approxTracks: string;
  description: string;
  highlights: string[];
  sizeEstimate?: string;
  sampleTracks?: Array<{ title: string; artist: string; duration: string; bpm?: number }>;
  colorTheme?: {
    border: string;
    badge: string;
    bg: string;
    text: string;
  };
}
