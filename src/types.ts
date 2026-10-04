/** Selos de restrição alimentar exibidos no cardápio e no "Monte sua massa". */
export type DietTag = 'vegetariano' | 'vegano' | 'sem-gluten';

/** Chaves das fotos em src/assets/images (nome do arquivo sem extensão). */
export type ImageKey =
  | 'hero-talharim'
  | 'talharim-bolonhesa'
  | 'raviolis-quatro-queijos'
  | 'lasanha'
  | 'nhoque-sugo'
  | 'talharim-trufado'
  | 'farinha-e-ovos'
  | 'ninho-de-massa'
  | 'maquina-de-massa'
  | 'lamina-de-massa'
  | 'massa-secando'
  | 'ninhos-frescos'
  | 'capeletti-fresco'
  | 'nhoque-cru'
  | 'cozinha-forno-lenha'
  | 'salao-abobadado'
  | 'salao-toalhas-vermelhas'
  | 'tiramisu'
  | 'bola-de-massa';

export interface Photo {
  image: ImageKey;
  alt: string;
  /** Ponto de foco do recorte (CSS object-position), ex.: "50% 30%". Padrão: centro. */
  position?: string;
}

export interface NavLink {
  href: `#${string}`;
  label: string;
}

/** Horário no formato "HH:MM", 24 h. Um intervalo que fecha antes de abrir atravessa a meia-noite. */
export type Clock = `${number}:${number}`;

export interface TimeRange {
  open: Clock;
  close: Clock;
}

/** 0 = domingo … 6 = sábado (mesma convenção de Date#getDay). */
export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface DayHours {
  day: Weekday;
  label: string;
  ranges: TimeRange[];
}

export interface Highlight extends Photo {
  name: string;
  description: string;
  price: number;
  tags?: DietTag[];
}

export interface MenuItem {
  name: string;
  description: string;
  price: number;
  tags?: DietTag[];
}

export interface MenuCategory {
  id: string;
  label: string;
  intro?: string;
  items: MenuItem[];
}

export interface BuilderOption {
  id: string;
  name: string;
  description?: string;
  price: number;
  tags?: DietTag[];
}

export interface BuilderStep {
  id: 'massa' | 'molho' | 'adicionais';
  title: string;
  hint: string;
  /** Título do passo aberto, ex.: "Escolha a massa". */
  legend: string;
  options: BuilderOption[];
}

/** Campos do formulário de reserva. */
export type ReservationField = 'name' | 'phone' | 'date' | 'time' | 'people';

export interface Testimonial {
  quote: string;
  author: string;
  context: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface TakeawayProduct {
  name: string;
  description: string;
  price: number;
  unit: string;
  tags?: DietTag[];
}

export interface DeliveryApp {
  name: string;
  href: string;
}

export interface GalleryPhoto extends Photo {
  caption: string;
  /**
   * Controla o recorte no mosaico. `wide` (célula 2:1 a 4:1) só para fotos com proporção ≥ 1,5;
   * em fotos mais quadradas ele corta metade da imagem.
   */
  shape: 'tall' | 'wide' | 'square';
}

export interface ImageCredit {
  image: ImageKey;
  title: string;
  author: string;
  license: string;
  licenseUrl?: string;
  source: string;
  provider: 'Wikimedia Commons' | 'Unsplash' | 'Pexels';
}
