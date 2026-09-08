export interface Product {
  id: string;
  name: string;
  category: 'rapes' | 'defumacoes' | 'instrumentos' | 'tecidos' | 'arte' | 'kits';
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

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  text: string;
  purchasedItem: string;
  avatarUrl: string;
  rating: number;
  date: string;
}

export interface StrategySection {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  keyTakeaway: string;
}
