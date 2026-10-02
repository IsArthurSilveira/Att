import React, { useState } from 'react';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { Product } from '../types';
import { Sparkles, Eye, Plus, Check, Star, Search } from 'lucide-react';

interface CategoriesSectionProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  onSelectProduct,
  onAddToCart
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.ritualUse.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.elements.some(e => e.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleAdd = (product: Product) => {
    onAddToCart(product);
    setRecentlyAddedId(product.id);
    setTimeout(() => {
      setRecentlyAddedId(null);
    }, 1800);
  };

  return (
    <section id="catalogo" className="pt-2 pb-12 sm:pt-4 sm:pb-16 md:pt-6 md:pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-[#18231B] border border-[#DFB168]/50 text-[#DFB168] text-[11px] sm:text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#DFB168]" />
            <span>Curadoria Religare • Liderança 100% Feminina</span>
          </div>
          <h2 className="font-cinzel text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-[#F1ECE1] leading-tight">
            Medicinas, Instrumentos & Cuidados da Floresta
          </h2>
          <p className="text-[#A69986] text-xs sm:text-sm md:text-base font-sans-clean leading-relaxed">
            Curadoria da 1ª casa do Brasil com direção 100% feminina: Tepis e Kuripes com a Sopro Imperial, rapés ancestrais, sananga viva, velas da Lumiar, ervas de Tuana Flores e terapias integrativas.
          </p>
        </div>

        {/* Live Search Input */}
        <div className="relative w-full md:w-80 shrink-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A69986]" />
          <input
            type="text"
            placeholder="Buscar por medicina, planta, aldeia..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#141B16] border border-[#233226] focus:border-[#C28C4B] text-xs sm:text-sm text-[#F1ECE1] placeholder-[#736A5D] focus:outline-none transition-colors min-h-[44px]"
          />
        </div>
      </div>

      {/* Category Pills (Edge-to-edge scroll on mobile for superior touch responsiveness) */}
      <div className="-mx-4 px-4 sm:mx-0 sm:px-0 mb-6 sm:mb-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none touch-pan-x">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer min-h-[38px] flex items-center shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-[#C28C4B] text-[#0E1310] shadow-md shadow-[#C28C4B]/20'
                  : 'bg-[#141B16] text-[#A69986] hover:text-[#F1ECE1] border border-[#233226] hover:border-[#384F3D]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 sm:py-16 bg-[#141B16] rounded-2xl border border-[#233226] p-6 sm:p-8 space-y-3">
          <p className="font-cinzel text-base sm:text-lg text-[#F1ECE1]">Nenhum produto encontrado para a busca.</p>
          <p className="text-xs sm:text-sm text-[#A69986]">Tente buscar por termos como "Tsunu", "Kuripe", "Breu", "Vela" ou "Sananga".</p>
          <button
            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
            className="mt-2 px-4 py-2 rounded-lg bg-[#233226] text-[#E0D7C6] text-xs font-semibold hover:bg-[#2F4434] cursor-pointer"
          >
            Limpar filtros de busca
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => {
            const isAdded = recentlyAddedId === product.id;

            return (
              <div
                key={product.id}
                className="group relative flex flex-col rounded-2xl bg-[#141B16] border border-[#233226] hover:border-[#C28C4B]/50 transition-all duration-300 overflow-hidden shadow-lg hover:shadow-2xl"
              >
                {/* Product Image Container */}
                <div 
                  onClick={() => onSelectProduct(product)}
                  className="relative aspect-square overflow-hidden bg-[#0E1310] cursor-pointer"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141B16] via-transparent to-black/30" />

                  {/* Origin Badge */}
                  <div className="absolute top-3 left-3 max-w-[80%] truncate">
                    <span className="backdrop-blur-md bg-[#0E1310]/85 text-[#D8CFBF] text-[10px] px-2.5 py-1 rounded-full border border-[#2B3B2F] font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C28C4B] shrink-0" />
                      <span className="truncate">{product.origin.split(',')[0]}</span>
                    </span>
                  </div>

                  {/* Quick view button overlay */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProduct(product);
                    }}
                    aria-label={`Ver detalhes de ${product.name}`}
                    className="absolute bottom-3 right-3 p-2 rounded-full bg-[#0E1310]/85 border border-[#384F3D] text-[#D8CFBF] hover:text-[#C28C4B] transition-colors shadow-md backdrop-blur-sm cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* Product Details */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3 sm:space-y-4">
                  <div className="space-y-1.5 sm:space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-[#C28C4B] font-semibold tracking-wider uppercase">
                      <span>{product.categoryLabel}</span>
                      <div className="flex items-center gap-1 text-[#E0D7C6]">
                        <Star className="w-3 h-3 text-[#C28C4B] fill-[#C28C4B]" />
                        <span>{product.rating.toFixed(1)}</span>
                        <span className="text-[#7D7263]">({product.reviewsCount})</span>
                      </div>
                    </div>

                    <h3 
                      onClick={() => onSelectProduct(product)}
                      className="font-cinzel text-sm sm:text-base font-bold text-[#F1ECE1] group-hover:text-[#C28C4B] transition-colors line-clamp-2 cursor-pointer leading-snug"
                    >
                      {product.name}
                    </h3>

                    <p className="text-xs text-[#A69986] line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Price & Add to Cart */}
                  <div className="pt-3 border-t border-[#233226] flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-baseline gap-1.5 flex-wrap">
                        <span className="text-base sm:text-lg font-bold font-mono text-[#F1ECE1]">
                          R$ {product.price.toFixed(2).replace('.', ',')}
                        </span>
                        {product.originalPrice && (
                          <span className="text-[11px] sm:text-xs line-through text-[#6E6457]">
                            R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-[#8C8070] block truncate">À vista ou em até 3x</span>
                    </div>

                    <button
                      onClick={() => handleAdd(product)}
                      className={`px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0 min-h-[40px] ${
                        isAdded
                          ? 'bg-emerald-700 text-white shadow-md'
                          : 'bg-[#C28C4B] hover:bg-[#D49E5D] text-[#0E1310] shadow-sm'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Na Sacola</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Adicionar</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </section>
  );
};
