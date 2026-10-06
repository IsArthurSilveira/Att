export interface Product {
  id: string;
  name: string;
  category: 'sopro' | 'medicinas' | 'velas' | string;
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  origin: string;
  artisan: string;
  description: string;
  ritualUse: string;
  elements: string[];
  imageUrl: string;
  inStock: boolean;
  featured?: boolean;
  rating: number;
  reviewsCount: number;
  consecrationNote: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface SacredEvent {
  id: string;
  title: string;
  category: 'vivencia' | 'cerimonia' | 'roda' | 'curso' | string;
  categoryLabel?: string;
  date: string;
  time: string;
  location: string;
  facilitator: string;
  description: string;
  intention?: string;
  spotsInfo?: string;
  imageUrl: string;
  highlight?: boolean;
}
