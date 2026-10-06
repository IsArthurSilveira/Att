import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Sparkles, ChevronRight, Wind, Flame, Flower2, Music, Layers, FileSpreadsheet, Home, Store, Calendar } from 'lucide-react';
import { CartItem, Product } from '../types';
import { CATEGORIES } from '../data/products';

interface NavbarProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  products: Product[];
  currentView?: 'home' | 'shop';
  onNavigate?: (view: 'home' | 'shop') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItems,
  onOpenCart,
  selectedCategory,
  onSelectCategory,
  products,
  currentView = 'home',
  onNavigate
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleCategoryClick = (categoryId: string) => {
    onSelectCategory(categoryId);
    setSidebarOpen(false);
    if (onNavigate) {
      onNavigate('shop');
    }
    const element = document.getElementById('catalogo');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBrandClick = () => {
    if (onNavigate) {
      onNavigate('home');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEventsClick = () => {
    setSidebarOpen(false);
    if (onNavigate && currentView !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById('eventos');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById('eventos');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Helper icon for each category
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'all':
        return <Layers className="w-4 h-4 text-[#DFB168]" />;
      case 'sopro':
        return <Wind className="w-4 h-4 text-emerald-400" />;
      case 'medicinas':
        return <Flame className="w-4 h-4 text-[#DFB168]" />;
      case 'velas':
        return <Flame className="w-4 h-4 text-amber-300" />;
      case 'ervas':
        return <Flower2 className="w-4 h-4 text-emerald-300" />;
      case 'artes':
        return <Music className="w-4 h-4 text-rose-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#DFB168]" />;
    }
  };

  // Helper description for each category
  const getCategorySubtitle = (id: string) => {
    switch (id) {
      case 'all':
        return 'Catálogo completo de medicinas e instrumentos';
      case 'sopro':
        return 'Tepis & kuripes em madeira e bambu • Sopro Imperial';
      case 'medicinas':
        return 'Rapés tradicionais lunares e sananga viva';
      case 'velas':
        return 'Cera 100% vegetal da alma • Lumiar';
      case 'ervas':
        return 'Defumações e resinas puras • Tuana Flores';
      case 'artes':
        return 'Maracás cerimoniais e artes sagradas dos guias';
      default:
        return '';
    }
  };

  // Helper count of products in each category
  const getCategoryCount = (id: string) => {
    if (id === 'all') return products.length;
    return products.filter(p => p.category === id).length;
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#0D130E]/95 border-b border-[#233226]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-3">
          
          {/* Brand Identity with Religare Logo */}
          <div 
            onClick={handleBrandClick}
            className="flex items-center gap-2.5 sm:gap-3.5 cursor-pointer group min-w-0"
            id="brand-logo"
            title="Ir para o Início"
          >
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-[#DFB168]/80 shadow-[0_0_14px_rgba(223,177,104,0.3)] group-hover:border-[#DFB168] transition-all shrink-0 bg-[#162119]">
              <img 
                src="/religare-logo.jpg" 
                alt="Logo Religare" 
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="min-w-0">
              <div className="font-cinzel text-base xs:text-lg sm:text-xl md:text-2xl font-bold tracking-wider text-[#F1ECE1] group-hover:text-[#DFB168] transition-colors truncate">
                RELIGARE
              </div>
              <p className="text-[9px] sm:text-[10px] text-[#DFB168] tracking-[0.14em] uppercase font-semibold truncate flex items-center gap-1">
                <span>1ª Casa de Recife Dirigida por Mulheres</span>
              </p>
            </div>
          </div>

          {/* Action Controls in Right Corner: Store/Cart + Unified Menu Button */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Store / Cart Button (Sacola de Compras) */}
            <button
              id="cart-drawer-btn"
              onClick={onOpenCart}
              className="relative flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-xl bg-[#18231B] hover:bg-[#202E24] border border-[#384F3D] hover:border-[#DFB168] text-[#F1ECE1] transition-all cursor-pointer min-h-[40px] shadow-sm group"
              aria-label="Abrir Sacola de Compras"
              title="Sacola de Compras"
            >
              <ShoppingBag className="w-4 h-4 text-[#DFB168] group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-[#E6DCB8]">Sacola</span>
              {totalItems > 0 ? (
                <span className="w-5 h-5 rounded-full bg-[#DFB168] text-[#0E1310] text-[11px] font-bold flex items-center justify-center shadow-md animate-bounce">
                  {totalItems}
                </span>
              ) : (
                <span className="hidden sm:inline-block text-[11px] text-[#8C8070] font-mono">0</span>
              )}
            </button>

            {/* Unified Menu Button (Substitui botões redundantes e reúne Início, Loja, Vivências e Categorias) */}
            <button
              id="categories-sidebar-btn"
              onClick={() => setSidebarOpen(true)}
              className="flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[#18231B] hover:bg-[#223126] border border-[#384F3D] hover:border-[#DFB168] text-[#F1ECE1] transition-all cursor-pointer min-h-[40px] shadow-sm group"
              aria-label="Abrir Menu Principal"
              title="Abrir Menu de Navegação"
            >
              <Menu className="w-4 h-4 text-[#DFB168] group-hover:scale-110 transition-transform" />
              <span className="text-xs font-semibold text-[#E6DCB8]">Menu</span>
            </button>

          </div>
        </div>
      </header>

      {/* Sidebar / Index Drawer for All Product Categories & Navigation */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div 
            onClick={() => setSidebarOpen(false)}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
            <div className="w-screen max-w-sm sm:max-w-md bg-[#131A15] border-l border-[#2B3B2F] shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
              
              {/* Sidebar Header */}
              <div className="p-4 sm:p-5 border-b border-[#233226] bg-[#0E1310] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-[#DFB168]/70 shadow-sm shrink-0">
                    <img src="/religare-logo.jpg" alt="Religare" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-cinzel text-base font-bold text-[#F1ECE1]">
                      Menu Religare
                    </h3>
                    <p className="text-[10px] text-[#DFB168] font-semibold tracking-wider uppercase">
                      1ª Casa de Recife Dirigida por Mulheres
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSidebarOpen(false)}
                  aria-label="Fechar menu"
                  className="p-2 w-9 h-9 flex items-center justify-center rounded-lg text-[#A69986] hover:text-[#F1ECE1] hover:bg-[#1E2B21] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Sidebar Content */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-4">
                
                {/* Quick View Navigation */}
                {onNavigate && (
                  <div className="grid grid-cols-2 gap-2 pb-2 border-b border-[#233226]">
                    <button
                      onClick={() => {
                        onNavigate('home');
                        setSidebarOpen(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                        currentView === 'home'
                          ? 'bg-[#18231B] border-[#DFB168] text-[#DFB168]'
                          : 'bg-[#0E1310] border-[#233226] text-[#A69986] hover:text-[#F1ECE1]'
                      }`}
                    >
                      <Home className="w-3.5 h-3.5" />
                      <span>Início</span>
                    </button>

                    <button
                      onClick={() => {
                        onNavigate('shop');
                        onSelectCategory('all');
                        setSidebarOpen(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                        currentView === 'shop'
                          ? 'bg-[#18231B] border-[#DFB168] text-[#DFB168]'
                          : 'bg-[#0E1310] border-[#233226] text-[#A69986] hover:text-[#F1ECE1]'
                      }`}
                    >
                      <Store className="w-3.5 h-3.5" />
                      <span>Loja Completa</span>
                    </button>
                  </div>
                )}

                {/* Direct Shortcut to Sacred Events */}
                <button
                  onClick={handleEventsClick}
                  className="w-full text-left p-3 rounded-xl bg-gradient-to-r from-[#18231B] to-[#121A14] hover:from-[#213025] hover:to-[#18231B] border border-[#DFB168]/40 hover:border-[#DFB168] flex items-center justify-between transition-all cursor-pointer shadow-sm group"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-[#0E1310] border border-[#DFB168]/40 text-[#DFB168]">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-cinzel text-xs sm:text-sm font-bold text-[#F1ECE1] group-hover:text-[#DFB168] transition-colors flex items-center gap-1.5">
                        <span>Vivências & Eventos do Mês</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      </div>
                      <p className="text-[10px] text-[#A69986]">
                        Rodas de mulheres, cerimônias e círculos sagrados
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#DFB168] group-hover:translate-x-0.5 transition-transform" />
                </button>

                {/* Categories List */}
                <div className="space-y-2">
                  <div className="px-2 text-[11px] font-bold text-[#8C8070] uppercase tracking-wider">
                    Categorias da Loja
                  </div>

                  {CATEGORIES.map((cat) => {
                    const isSelected = selectedCategory === cat.id && currentView === 'shop';
                    const count = getCategoryCount(cat.id);
                    const icon = getCategoryIcon(cat.id);
                    const subtitle = getCategorySubtitle(cat.id);

                    return (
                      <button
                        key={cat.id}
                        onClick={() => handleCategoryClick(cat.id)}
                        className={`w-full text-left p-3 rounded-xl transition-all cursor-pointer flex items-center justify-between gap-3 border ${
                          isSelected
                            ? 'bg-[#1D2920] border-[#DFB168] shadow-md shadow-[#DFB168]/10'
                            : 'bg-[#0E1310]/70 hover:bg-[#18231B] border-[#233226] hover:border-[#384F3D]'
                        }`}
                      >
                        <div className="flex items-start gap-3 min-w-0">
                          <div className={`p-2 rounded-lg mt-0.5 shrink-0 ${
                            isSelected ? 'bg-[#DFB168]/20 border border-[#DFB168]/40' : 'bg-[#18231B] border border-[#2B3B2F]'
                          }`}>
                            {icon}
                          </div>
                          <div className="min-w-0">
                            <div className={`font-cinzel text-xs sm:text-sm font-bold truncate ${
                              isSelected ? 'text-[#DFB168]' : 'text-[#F1ECE1]'
                            }`}>
                              {cat.label}
                            </div>
                            {subtitle && (
                              <div className="text-[11px] text-[#A69986] truncate mt-0.5">
                                {subtitle}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold ${
                            isSelected
                              ? 'bg-[#DFB168] text-[#0E1310]'
                              : 'bg-[#1E2B21] text-[#A69986]'
                          }`}>
                            {count}
                          </span>
                          <ChevronRight className={`w-4 h-4 ${
                            isSelected ? 'text-[#DFB168]' : 'text-[#6D6354]'
                          }`} />
                        </div>
                      </button>
                    );
                  })}
                </div>

              </div>

              {/* Sidebar Footer Support & WhatsApp */}
              <div className="p-4 sm:p-5 border-t border-[#233226] bg-[#0E1310] space-y-2.5">
                <a
                  href="https://wa.me/5581979149067?text=Ol%C3%A1%2C%20equipe%20Religare!%20Gostaria%20de%20tirar%20uma%20d%C3%BAvida%20sobre%20as%20categorias%20da%20loja."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl bg-[#18231B] hover:bg-[#202D23] border border-[#2B3B2F] text-xs font-semibold text-[#D8CFBF] hover:text-[#DFB168] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Atendimento WhatsApp: (81) 97914-9067</span>
                </a>

                <div className="text-[10px] text-[#7A7061] text-center">
                  Espaço Religare • Medicinas consagradas e acolhimento feminino
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};
