export interface Product {
  id: string;
  name: string;
  category: 'sopro' | 'medicinas' | 'velas' | 'ervas' | 'artes' | 'terapias' | string;
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
