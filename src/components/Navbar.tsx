import React, { useState } from 'react';
import { ShoppingBag, Menu, X, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface NavbarProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItems,
  onOpenCart
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#0D130E]/95 border-b border-[#233226]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2">
        {/* Brand Identity with Religare Logo */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2.5 sm:gap-3.5 cursor-pointer group min-w-0"
          id="brand-logo"
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
              <span>1ª Casa do Brasil 100% Dirigida por Mulheres</span>
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-sm text-[#D8CFBF]">
          <button 
            onClick={() => scrollToSection('catalogo')}
            className="hover:text-[#DFB168] transition-colors font-medium cursor-pointer"
          >
            Todos os Produtos
          </button>
          <button 
            onClick={() => scrollToSection('catalogo')}
            className="hover:text-[#DFB168] transition-colors font-medium cursor-pointer"
          >
            Tepis & Kuripes
          </button>
          <button 
            onClick={() => scrollToSection('catalogo')}
            className="hover:text-[#DFB168] transition-colors font-medium cursor-pointer"
          >
            Rapés & Sananga
          </button>
          <button 
            onClick={() => scrollToSection('catalogo')}
            className="hover:text-[#DFB168] transition-colors font-medium cursor-pointer"
          >
            Velas & Defumações
          </button>
          <button 
            onClick={() => scrollToSection('catalogo')}
            className="hover:text-[#DFB168] transition-colors font-medium cursor-pointer"
          >
            Vivências & Terapias
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Female leadership desktop pill */}
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#18231B] border border-[#DFB168]/40 text-[#DFB168] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#DFB168]" />
            <span>Liderança 100% Feminina</span>
          </div>

          {/* Cart Button */}
          <button
            id="cart-drawer-btn"
            onClick={onOpenCart}
            className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#18231B] border border-[#384F3D] hover:border-[#DFB168] text-[#F1ECE1] transition-all cursor-pointer min-h-[38px] min-w-[38px]"
            aria-label="Abrir Carrinho"
          >
            <ShoppingBag className="w-4 h-4 text-[#DFB168]" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#DFB168] text-[#0E1310] text-[11px] font-bold flex items-center justify-center shadow-md animate-bounce">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile menu hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#D3C7B2] hover:text-white rounded-lg hover:bg-[#18231B] min-h-[40px] min-w-[40px] flex items-center justify-center"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#111713] border-b border-[#233226] px-5 py-4 space-y-3 animate-in slide-in-from-top-3 duration-200">
          <div className="p-2.5 rounded-xl bg-[#18231B] border border-[#DFB168]/40 text-xs text-[#DFB168] font-semibold flex items-center gap-2">
            <Sparkles className="w-4 h-4 shrink-0 text-[#DFB168]" />
            <span>1ª Casa do Brasil 100% Dirigida por Mulheres</span>
          </div>
          <div className="flex flex-col space-y-1 text-sm font-medium">
            <button
              onClick={() => scrollToSection('catalogo')}
              className="text-left text-[#D8CFBF] hover:text-[#DFB168] py-2.5 px-3 rounded-xl hover:bg-[#18231B] transition-colors"
            >
              Todos os Produtos
            </button>
            <button
              onClick={() => scrollToSection('catalogo')}
              className="text-left text-[#D8CFBF] hover:text-[#DFB168] py-2.5 px-3 rounded-xl hover:bg-[#18231B] transition-colors"
            >
              Tepis & Kuripes (Sopro Imperial)
            </button>
            <button
              onClick={() => scrollToSection('catalogo')}
              className="text-left text-[#D8CFBF] hover:text-[#DFB168] py-2.5 px-3 rounded-xl hover:bg-[#18231B] transition-colors"
            >
              Rapés Tradicionais & Sananga
            </button>
            <button
              onClick={() => scrollToSection('catalogo')}
              className="text-left text-[#D8CFBF] hover:text-[#DFB168] py-2.5 px-3 rounded-xl hover:bg-[#18231B] transition-colors"
            >
              Velas Artesanais (Lumiar) & Flores (Tuana)
            </button>
            <button
              onClick={() => scrollToSection('catalogo')}
              className="text-left text-[#D8CFBF] hover:text-[#DFB168] py-2.5 px-3 rounded-xl hover:bg-[#18231B] transition-colors"
            >
              Vivências & Terapias Integrativas
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
