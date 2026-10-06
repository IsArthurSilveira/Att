import React, { useState, useMemo } from 'react';
import { CATEGORIES } from '../data/products';
import { Product } from '../types';
import { 
  Sparkles, 
  Eye, 
  Plus, 
  Check, 
  Star, 
  Search, 
  ArrowRight, 
  ArrowLeft, 
  ShoppingBag, 
  Wind, 
  Flame, 
  Layers
} from 'lucide-react';

interface CategoriesSectionProps {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  isFullShopView?: boolean;
  onOpenFullShop?: () => void;
  onBackToHome?: () => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onSelectProduct,
  onAddToCart,
  isFullShopView = false,
  onOpenFullShop,
  onBackToHome
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const handleAdd = (product: Product) => {
    onAddToCart(product);
    setRecentlyAddedId(product.id);
    setTimeout(() => {
      setRecentlyAddedId(null);
    }, 1800);
  };

  // Helper icons for categories
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'sopro':
        return <Wind className="w-4 h-4 text-emerald-400" />;
      case 'medicinas':
        return <Flame className="w-4 h-4 text-[#DFB168]" />;
      case 'velas':
        return <Flame className="w-4 h-4 text-amber-300" />;
      default:
        return <Layers className="w-4 h-4 text-[#DFB168]" />;
    }
  };

  // Subtitles for categories
  const getCategorySubtitle = (id: string) => {
    switch (id) {
      case 'sopro':
        return 'Tepis & kuripes em madeira e bambu • Sopro Imperial';
      case 'medicinas':
        return 'Rapés tradicionais lunares e sananga viva da floresta';
      case 'velas':
        return 'Cera 100% vegetal consagrada da alma • Lumiar';
      default:
        return 'Acervo consagrado na Casa de Cura';
    }
  };

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = 
        !searchQuery.trim() ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.ritualUse.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.elements.some(e => e.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      case 'price-asc':
        return list.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return list.sort((a, b) => b.price - a.price);
      case 'rating':
        return list.sort((a, b) => b.rating - a.rating);
      case 'featured':
      default:
        return list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
  }, [filteredProducts, sortBy]);

  // Sacred categories without 'all'
  const sacredCategories = useMemo(() => {
    return CATEGORIES.filter(c => c.id !== 'all');
  }, []);

  // Render a standard Product Card (Compact & Smaller as requested)
  const renderProductCard = (product: Product) => {
    const isAdded = recentlyAddedId === product.id;

    return (
      <div
        key={product.id}
        className="group relative flex flex-col rounded-xl bg-[#141B16] border border-[#233226] hover:border-[#DFB168]/50 transition-all duration-300 overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-0.5"
      >
        {/* Product Image Container (Compact) */}
        <div 
          onClick={() => onSelectProduct(product)}
          className="relative aspect-[4/3] sm:aspect-square overflow-hidden bg-[#0E1310] cursor-pointer"
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141B16] via-transparent to-black/20" />

          {/* Origin Badge */}
          <div className="absolute top-2 left-2 max-w-[85%] truncate">
            <span className="backdrop-blur-md bg-[#0E1310]/85 text-[#D8CFBF] text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full border border-[#2B3B2F] font-medium flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-[#DFB168] shrink-0" />
              <span className="truncate">{product.origin.split('•')[0].split(',')[0]}</span>
            </span>
          </div>

          {/* Quick view button overlay */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectProduct(product);
            }}
            aria-label={`Ver detalhes de ${product.name}`}
            className="absolute bottom-2 right-2 p-1.5 rounded-full bg-[#0E1310]/85 border border-[#384F3D] text-[#D8CFBF] hover:text-[#DFB168] transition-colors shadow-md backdrop-blur-sm cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Product Details (Compact & Clean) */}
        <div className="p-2.5 sm:p-3 flex-1 flex flex-col justify-between space-y-2">
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[10px] text-[#DFB168] font-semibold tracking-wider uppercase">
              <span className="truncate pr-1">{product.categoryLabel}</span>
              <div className="flex items-center gap-0.5 text-[#E0D7C6] shrink-0">
                <Star className="w-2.5 h-2.5 text-[#DFB168] fill-[#DFB168]" />
                <span className="text-[10px]">{product.rating.toFixed(1)}</span>
              </div>
            </div>

            <h3 
              onClick={() => onSelectProduct(product)}
              className="font-cinzel text-xs sm:text-[13px] font-bold text-[#F1ECE1] group-hover:text-[#DFB168] transition-colors line-clamp-1 cursor-pointer leading-tight"
              title={product.name}
            >
              {product.name}
            </h3>

            <p className="text-[11px] text-[#A69986] line-clamp-1 leading-normal">
              {product.description}
            </p>

            {/* Sacred Elements / Matérias-Primas tags */}
            {product.elements && product.elements.length > 0 && (
              <div className="flex flex-wrap gap-1 pt-0.5">
                {product.elements.slice(0, 2).map((elem, i) => (
                  <span 
                    key={i} 
                    className="text-[8.5px] px-1.5 py-0.5 rounded bg-[#18231B] text-[#C7BCAB] border border-[#2B3B2F] font-medium truncate max-w-[110px]"
                  >
                    {elem}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Price & Add to Cart */}
          <div className="pt-2 border-t border-[#233226] flex items-center justify-between gap-1.5">
            <div className="min-w-0">
              <div className="flex items-baseline gap-1">
                <span className="text-xs sm:text-sm font-bold font-mono text-[#F1ECE1]">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </span>
                {product.originalPrice && (
                  <span className="text-[10px] line-through text-[#6E6457]">
                    R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                  </span>
                )}
              </div>
              <span className="text-[9px] text-[#8C8070] block truncate">Entrega em todo o Brasil</span>
            </div>

            <button
              onClick={() => handleAdd(product)}
              className={`px-2.5 py-1.5 rounded-lg text-[10px] sm:text-[11px] font-bold transition-all flex items-center gap-1 cursor-pointer shrink-0 min-h-[32px] shadow-sm ${
                isAdded
                  ? 'bg-emerald-700 text-white'
                  : 'bg-[#DFB168] hover:bg-[#F0CD86] text-[#0E1310]'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3 h-3" />
                  <span className="hidden xs:inline">Salvo</span>
                </>
              ) : (
                <>
                  <Plus className="w-3 h-3" />
                  <span>Adicionar</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    );
  };

  return (
    <section id="catalogo" className="pt-4 pb-12 sm:pt-6 sm:pb-16 md:pt-8 md:pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* 
        ========================================================================
        HEADER & CONTROLS REGION (div:nth-of-type(1) of section#catalogo)
        Contains:
        1. Title & sacred badges
        2. Prominent button indicating to go to full shop
        3. Category filter pills & search box
        ========================================================================
      */}
      {isFullShopView ? (
        <div className="mb-6 sm:mb-8 space-y-4">
          
          {/* Breadcrumb Navigation */}
          {onBackToHome && (
            <div className="flex items-center gap-2">
              <button
                onClick={onBackToHome}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#141B16] hover:bg-[#1D271F] border border-[#2B3B2F] hover:border-[#DFB168] text-xs font-semibold text-[#D8CFBF] hover:text-[#DFB168] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Voltar ao Início</span>
              </button>
              <span className="text-xs text-[#736A5D]">/</span>
              <span className="text-xs text-[#DFB168] font-semibold">Loja Oficial Religare</span>
            </div>
          )}

          {/* Full Shop Title & Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 border-b border-[#233226] pb-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#18231B] border border-[#DFB168]/50 text-[#DFB168] text-[11px] sm:text-xs font-semibold uppercase tracking-wider">
                  <StoreIcon className="w-3.5 h-3.5 text-[#DFB168]" />
                  <span>Loja Completa • Catálogo Geral ({products.length} itens)</span>
                </span>
              </div>

              <h2 className="font-cinzel text-2xl xs:text-3xl sm:text-4xl font-bold text-[#F1ECE1] leading-tight">
                Todas as Medicinas & Feitios da Floresta
              </h2>
              <p className="text-[#A69986] text-xs sm:text-sm md:text-base leading-relaxed">
                Navegue pelo acervo completo com Tepis e Kuripes da Sopro Imperial, rapés ancestrais, sananga viva e velas ecológicas da Lumiar com entrega em todo o Brasil.
              </p>
            </div>

            {/* Live Search and Sort Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A69986]" />
                <input
                  type="text"
                  placeholder="Buscar produto..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#141B16] border border-[#233226] focus:border-[#DFB168] text-xs sm:text-sm text-[#F1ECE1] placeholder-[#736A5D] focus:outline-none transition-colors min-h-[42px]"
                />
              </div>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}
                  className="w-full sm:w-auto px-3 py-2.5 rounded-xl bg-[#141B16] border border-[#233226] focus:border-[#DFB168] text-xs font-semibold text-[#D8CFBF] focus:outline-none cursor-pointer min-h-[42px]"
                >
                  <option value="featured">Destaques</option>
                  <option value="price-asc">Menor Preço</option>
                  <option value="price-desc">Maior Preço</option>
                  <option value="rating">Melhor Avaliados</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Filter Pills in Full Shop */}
          <div className="-mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none touch-pan-x">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer min-h-[38px] flex items-center shrink-0 ${
                    selectedCategory === cat.id
                      ? 'bg-[#DFB168] text-[#0E1310] font-bold shadow-md shadow-[#DFB168]/25'
                      : 'bg-[#141B16] text-[#A69986] hover:text-[#F1ECE1] border border-[#233226] hover:border-[#384F3D]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

        </div>
      ) : (
        /* 
          HOME VIEW HEADER:
          Contains Title, Prominent "Ir para a Loja Completa" Button in this same region,
          Category Filter Pills, and quick filter search
        */
        <div className="mb-6 sm:mb-8 space-y-4">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 border-b border-[#233226] pb-5">
            <div className="space-y-2 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#18231B] border border-[#DFB168]/50 text-[#DFB168] text-[11px] sm:text-xs font-semibold uppercase tracking-wider">
                  <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#DFB168]" />
                  <span>Feitios do Altar • 1ª Casa de Recife Dirigida por Mulheres</span>
                </span>
              </div>

              <h2 className="font-cinzel text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-[#F1ECE1] leading-tight">
                Medicinas, Feitios & Instrumentos Sagrados
              </h2>
              <p className="text-[#A69986] text-xs sm:text-sm md:text-base font-sans-clean leading-relaxed">
                Exibindo até <strong>5 produtos em cada categoria</strong> da Casa. Deseja ver todo o acervo? Acesse a loja completa logo ao lado.
              </p>
            </div>

            {/* BOTÃO NESSA MESMA REGIÃO INDICANDO PARA PESSOA IR NA LOJA COMPLETA */}
            {onOpenFullShop && (
              <div className="shrink-0 flex items-center">
                <button
                  onClick={onOpenFullShop}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-[#DFB168] via-[#F3D698] to-[#DFB168] hover:brightness-110 text-[#0D140F] font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-[#DFB168]/20 flex items-center justify-center gap-2.5 cursor-pointer transition-all min-h-[44px] group border border-[#F6E1B3]/60"
                  title="Conferir todos os produtos no e-commerce completo"
                >
                  <StoreIcon className="w-4 h-4 text-[#0D140F]" />
                  <span>Ir para a Loja Completa ({products.length} itens)</span>
                  <ArrowRight className="w-4 h-4 text-[#0D140F] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </div>

          {/* Category Filter Pills & Search displayed right on Home Page */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="-mx-4 px-4 sm:mx-0 sm:px-0 flex-1">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none touch-pan-x">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => onSelectCategory(cat.id)}
                    className={`px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer min-h-[38px] flex items-center shrink-0 ${
                      selectedCategory === cat.id
                        ? 'bg-[#DFB168] text-[#0E1310] font-bold shadow-md shadow-[#DFB168]/25'
                        : 'bg-[#141B16] text-[#A69986] hover:text-[#F1ECE1] border border-[#233226] hover:border-[#384F3D]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick search filter */}
            <div className="relative w-full sm:w-56 shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#A69986]" />
              <input
                type="text"
                placeholder="Filtrar por nome..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#141B16] border border-[#233226] focus:border-[#DFB168] text-xs text-[#F1ECE1] placeholder-[#736A5D] focus:outline-none transition-colors min-h-[38px]"
              />
            </div>
          </div>

        </div>
      )}

      {/* 
        ========================================================================
        PRODUCTS PRESENTATION:
        - Full Shop: Flat sorted grid with all items
        - Home View: Exactly up to 5 items in each category ("5 produtos em cada coisa")!
        ========================================================================
      */}
      {isFullShopView ? (
        /* FULL SHOP VIEW: All products matching filters */
        sortedProducts.length === 0 ? (
          <div className="text-center py-12 sm:py-16 bg-[#141B16] rounded-2xl border border-[#233226] p-6 sm:p-8 space-y-3">
            <p className="font-cinzel text-base sm:text-lg text-[#F1ECE1]">Nenhum produto encontrado para a busca.</p>
            <p className="text-xs sm:text-sm text-[#A69986]">Tente buscar por termos como "Tsunu", "Kuripe", "Breu", "Vela" ou "Sananga".</p>
            <button
              onClick={() => { onSelectCategory('all'); setSearchQuery(''); }}
              className="mt-2 px-4 py-2 rounded-lg bg-[#233226] text-[#E0D7C6] text-xs font-semibold hover:bg-[#2F4434] cursor-pointer"
            >
              Limpar filtros de busca
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3.5">
            {sortedProducts.map((product) => renderProductCard(product))}
          </div>
        )
      ) : (
        /* 
          HOME VIEW:
          If 'all': Displays each category with UP TO 5 PRODUCTS EACH!
          If specific category: Displays up to 5 products of that category!
        */
        selectedCategory === 'all' ? (
          <div className="space-y-12 sm:space-y-14">
            {sacredCategories.map((cat) => {
              // 5 produtos em cada coisa!
              const catProducts = products
                .filter(p => p.category === cat.id)
                .filter(p => !searchQuery.trim() || 
                  p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  p.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  p.elements.some(e => e.toLowerCase().includes(searchQuery.toLowerCase()))
                )
                .slice(0, 5);

              if (catProducts.length === 0) return null;

              const totalInCat = products.filter(p => p.category === cat.id).length;

              return (
                <div key={cat.id} className="space-y-4 sm:space-y-5">
                  
                  {/* Category Header with Icon and Direct Store Link */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#233226]">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-[#18231B] border border-[#2B3B2F]">
                        {getCategoryIcon(cat.id)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-cinzel text-base sm:text-lg font-bold text-[#F1ECE1]">
                            {cat.label}
                          </h3>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#18231B] border border-[#2B3B2F] text-[#DFB168] font-mono">
                            {catProducts.length} de {totalInCat} itens
                          </span>
                        </div>
                        <p className="text-xs text-[#A69986]">
                          {getCategorySubtitle(cat.id)}
                        </p>
                      </div>
                    </div>

                    {/* Button to open full shop for this category */}
                    {onOpenFullShop && (
                      <button
                        onClick={() => {
                          onSelectCategory(cat.id);
                          onOpenFullShop();
                        }}
                        className="self-start sm:self-auto text-xs text-[#DFB168] hover:text-[#F3D698] flex items-center gap-1.5 font-semibold transition-colors cursor-pointer py-1"
                      >
                        <span>Ver todos de {cat.label} na Loja Completa</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Grid of up to 5 compact products for this category */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3.5">
                    {catProducts.map((product) => renderProductCard(product))}
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          /* Single Selected Category on Home (limited to 5 products) */
          (() => {
            const catProducts = sortedProducts.slice(0, 5); // 5 produtos em cada coisa!
            const catInfo = sacredCategories.find(c => c.id === selectedCategory);

            if (catProducts.length === 0) {
              return (
                <div className="text-center py-12 sm:py-16 bg-[#141B16] rounded-2xl border border-[#233226] p-6 sm:p-8 space-y-3">
                  <p className="font-cinzel text-base sm:text-lg text-[#F1ECE1]">Nenhum produto nesta categoria no momento.</p>
                  <button
                    onClick={() => onSelectCategory('all')}
                    className="mt-2 px-4 py-2 rounded-lg bg-[#233226] text-[#E0D7C6] text-xs font-semibold hover:bg-[#2F4434] cursor-pointer"
                  >
                    Ver todas as categorias
                  </button>
                </div>
              );
            }

            return (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#233226]">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-[#18231B] border border-[#2B3B2F]">
                      {getCategoryIcon(selectedCategory)}
                    </div>
                    <div>
                      <h3 className="font-cinzel text-base sm:text-lg font-bold text-[#F1ECE1]">
                        {catInfo?.label || 'Produtos Selecionados'}
                      </h3>
                      <p className="text-xs text-[#A69986]">
                        Exibindo até 5 produtos principais desta categoria
                      </p>
                    </div>
                  </div>

                  {onOpenFullShop && (
                    <button
                      onClick={onOpenFullShop}
                      className="text-xs text-[#DFB168] hover:text-[#F3D698] flex items-center gap-1.5 font-semibold transition-colors cursor-pointer"
                    >
                      <span>Ver catálogo completo</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 sm:gap-3.5">
                  {catProducts.map((product) => renderProductCard(product))}
                </div>
              </div>
            );
          })()
        )
      )}

    </section>
  );
};

function StoreIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
      <path d="M2 7h20" />
      <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" />
    </svg>
  );
}
