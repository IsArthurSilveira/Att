import React, { useState } from 'react';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { Product } from '../types';
import { Sparkles, Eye, Plus, Check, Star, Search, ShieldCheck } from 'lucide-react';

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
    <section id="catalogo" className="py-14 sm:py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6 mb-8 sm:mb-12">
        <div className="space-y-2 sm:space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18231B] border border-[#C28C4B]/40 text-[#C28C4B] text-[11px] sm:text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Curadoria Sagrada da Casa</span>
          </div>
          <h2 className="font-cinzel text-2xl xs:text-3xl sm:text-4xl font-bold text-[#F1ECE1]">
            Medicinas, Artes e Ferramentas de Reza
          </h2>
          <p className="text-[#A69986] text-xs sm:text-sm md:text-base font-sans-clean">
            Instrumentos preparados com intenção pura, respeito aos ciclos lunares e matérias-primas botânicas 100% autênticas da Amazônia e cerrados sagrados.
          </p>
        </div>

        {/* Live Search Input */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A69986]" />
          <input
            type="text"
            placeholder="Buscar medicina, planta ou aldeia..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#141B16] border border-[#233226] focus:border-[#C28C4B] text-sm text-[#F1ECE1] placeholder-[#736A5D] focus:outline-none transition-colors min-h-[44px]"
          />
        </div>
      </div>

      {/* Category Pills (Horizontal scrolling for mobile fluidity) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 sm:mb-8 scrollbar-none touch-pan-x">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer min-h-[38px] flex items-center ${
              selectedCategory === cat.id
                ? 'bg-[#C28C4B] text-[#0E1310] shadow-md shadow-[#C28C4B]/20'
                : 'bg-[#141B16] text-[#A69986] hover:text-[#F1ECE1] border border-[#233226] hover:border-[#384F3D]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 sm:py-16 bg-[#141B16] rounded-2xl border border-[#233226] p-6 sm:p-8 space-y-3">
          <p className="font-cinzel text-base sm:text-lg text-[#F1ECE1]">Nenhum instrumento encontrado para a busca.</p>
          <p className="text-xs sm:text-sm text-[#A69986]">Tente buscar por termos como "Tsunu", "Kuripe", "Breu" ou "Altar".</p>
          <button
            onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
            className="mt-2 px-4 py-2 rounded-lg bg-[#233226] text-[#E0D7C6] text-xs font-semibold hover:bg-[#2F4434] cursor-pointer"
          >
            Limpar filtros de busca
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141B16] via-transparent to-black/30" />

                  {/* Origin Badge */}
                  <div className="absolute top-3 left-3 max-w-[80%] truncate">
                    <span className="backdrop-blur-md bg-[#0E1310]/85 text-[#D8CFBF] text-[10px] px-2.5 py-1 rounded-full border border-[#2B3B2F] font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C28C4B] shrink-0" />
                      <span className="truncate">{product.origin.split(',')[0]}</span>
                    </span>
                  </div>

                  {/* Featured ribbon */}
                  {product.featured && (
                    <div className="absolute top-3 right-3">
                      <span className="bg-[#C28C4B] text-[#0E1310] text-[10px] font-bold px-2 py-0.5 rounded shadow">
                        Consagrado
                      </span>
                    </div>
                  )}

                  {/* Quick View Button on Image - accessible on mobile & hover on desktop */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectProduct(product);
                    }}
                    title="Ver rezo e detalhes"
                    className="absolute bottom-3 right-3 p-2 rounded-xl bg-[#0E1310]/85 hover:bg-[#C28C4B] text-[#F1ECE1] hover:text-[#0E1310] border border-[#233226] transition-all opacity-90 sm:opacity-0 group-hover:opacity-100 shadow-md cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* Content */}
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
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-base sm:text-lg font-bold font-mono text-[#F1ECE1]">
                          R$ {product.price.toFixed(2).replace('.', ',')}
                        </span>
                        {product.originalPrice && (
                          <span className="text-[11px] sm:text-xs line-through text-[#6E6457]">
                            R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-[#8C8070] block">À vista ou em até 3x</span>
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
                          <span>Consagrar</span>
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

      {/* Altar kit promotional banner card (High conversion bundle) */}
      <div className="mt-10 sm:mt-14 rounded-2xl p-5 sm:p-8 bg-gradient-to-r from-[#1A261D] via-[#141C16] to-[#241B14] border border-[#C28C4B]/40 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-5 sm:gap-6">
        <div className="space-y-1.5 sm:space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs text-[#C28C4B] font-semibold tracking-wider uppercase">
            <ShieldCheck className="w-4 h-4" />
            <span>Kit Iniciação do Buscador</span>
          </div>
          <h3 className="font-cinzel text-lg xs:text-xl sm:text-2xl font-bold text-[#F1ECE1]">
            Monte seu Altar Sagrado Completo com 15% de Benefício
          </h3>
          <p className="text-xs sm:text-sm text-[#A69986] max-w-xl">
            Receba o conjunto consagrado com Kuripe de madeira nativa, Rapé Tsunu autêntico, Incensário de barro cozido, Resina de Breu Branco e o Guia de Orações da Casa.
          </p>
        </div>

        <button
          onClick={() => {
            const kit = PRODUCTS.find(p => p.id === 'kit-altar-guardiao');
            if (kit) onSelectProduct(kit);
          }}
          className="w-full md:w-auto px-6 py-3.5 rounded-xl bg-[#C28C4B] hover:bg-[#D49E5D] text-[#0E1310] font-bold text-xs sm:text-sm whitespace-nowrap shadow-lg transition-all cursor-pointer shrink-0 min-h-[46px] flex items-center justify-center text-center"
        >
          Conhecer o Kit do Altar
        </button>
      </div>

    </section>
  );
};
