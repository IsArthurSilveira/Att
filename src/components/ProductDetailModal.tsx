import React, { useState } from 'react';
import { Product } from '../types';
import { X, Star, ShieldCheck, Heart, Sparkles, MapPin, Feather, Check } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart
}) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
    >
      <div 
        className="relative w-full max-w-3xl rounded-2xl sm:rounded-3xl bg-[#141B16] border border-[#2B3B2F] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-auto max-h-[92vh] flex flex-col md:grid md:grid-cols-2"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Fechar modal"
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-9 h-9 rounded-full bg-[#0E1310]/85 hover:bg-[#233226] text-[#D8CFBF] hover:text-[#F1ECE1] border border-[#2B3B2F] transition-colors cursor-pointer flex items-center justify-center"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Left: Product Image & Origin Tag */}
        <div className="relative h-48 sm:h-64 md:h-full shrink-0 bg-[#0E1310] overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141B16] via-transparent to-black/30" />

          {/* Floating Origin Pill */}
          <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-2.5 sm:p-3 rounded-xl bg-[#0E1310]/85 backdrop-blur-md border border-[#2B3B2F] space-y-0.5">
            <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-[#C28C4B] font-semibold">
              <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>{product.origin}</span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-[#A69986] truncate">
              {product.artisan}
            </p>
          </div>
        </div>

        {/* Right: Detailed Sacred Info & Purchase Intent */}
        <div className="p-4 sm:p-6 md:p-8 flex-1 flex flex-col justify-between space-y-4 sm:space-y-6 overflow-y-auto">
          
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between text-[11px] sm:text-xs text-[#C28C4B] font-semibold uppercase tracking-wider">
              <span>{product.categoryLabel}</span>
              <div className="flex items-center gap-1 text-[#E0D7C6]">
                <Star className="w-3 h-3 text-[#C28C4B] fill-[#C28C4B]" />
                <span>{product.rating.toFixed(1)}</span>
                <span className="text-[#6D6354]">({product.reviewsCount})</span>
              </div>
            </div>

            <h2 className="font-cinzel text-lg xs:text-xl sm:text-2xl font-bold text-[#F1ECE1] leading-snug">
              {product.name}
            </h2>

            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-2xl font-mono font-bold text-[#F1ECE1]">
                R$ {product.price.toFixed(2).replace('.', ',')}
              </span>
              {product.originalPrice && (
                <span className="text-xs sm:text-sm line-through text-[#6E6457]">
                  R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm text-[#D3C7B2] leading-relaxed">
              {product.description}
            </p>

            {/* Ritual use instruction */}
            <div className="p-3 sm:p-4 rounded-xl bg-[#0E1310] border border-[#233226] space-y-1">
              <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-[#C28C4B]">
                <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>Rezo & Aplicação Ritualística:</span>
              </div>
              <p className="text-xs text-[#A69986] leading-relaxed italic">
                "{product.ritualUse}"
              </p>
            </div>

            {/* Consecration Note */}
            <div className="flex items-start gap-2 text-xs text-[#9B8F7D]">
              <Feather className="w-3.5 h-3.5 text-[#C28C4B] shrink-0 mt-0.5" />
              <span><strong>Consagração:</strong> {product.consecrationNote}</span>
            </div>

            {/* Elements / Composition tags */}
            <div className="space-y-1">
              <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#736A5D] font-bold block">
                Matérias-Primas:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {product.elements.map((elem, i) => (
                  <span key={i} className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-[#1B251E] text-[#D8CFBF] text-[10px] sm:text-[11px] border border-[#2B3B2F]">
                    {elem}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quantity and Action Button */}
          <div className="pt-3 sm:pt-4 border-t border-[#233226] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#A69986]">Quantidade:</span>
              <div className="flex items-center border border-[#2B3B2F] rounded-lg bg-[#0E1310]">
                <button
                  disabled={quantity <= 1}
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-8 h-8 flex items-center justify-center text-sm text-[#D8CFBF] hover:text-white disabled:opacity-40 cursor-pointer"
                >
                  -
                </button>
                <span className="px-3 text-xs font-mono text-[#F1ECE1] font-bold">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-8 h-8 flex items-center justify-center text-sm text-[#D8CFBF] hover:text-white cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAdd}
              className={`w-full min-h-[46px] py-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                added
                  ? 'bg-emerald-700 text-white shadow-lg'
                  : 'bg-[#C28C4B] hover:bg-[#D49E5D] text-[#0E1310]'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Adicionado à Sacola com Sucesso</span>
                </>
              ) : (
                <>
                  <Heart className="w-4 h-4" />
                  <span>Adicionar à Sacola • R$ {(product.price * quantity).toFixed(2).replace('.', ',')}</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
