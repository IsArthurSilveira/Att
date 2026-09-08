import React, { useState } from 'react';
import { Volume2, VolumeX, ShoppingBag, BookOpen, Menu, X, Sparkles, ShieldCheck, Heart } from 'lucide-react';
import { CartItem } from '../types';

interface NavbarProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  onOpenDossier: () => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItems,
  onOpenCart,
  onOpenDossier,
  isAudioPlaying,
  onToggleAudio
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
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#0E1310]/95 border-b border-[#233226]">
      {/* Top sacred announcement bar */}
      <div className="bg-[#18231B] text-[#D3C7B2] text-[10px] xs:text-[11px] sm:text-xs py-1.5 px-3 sm:px-4 text-center border-b border-[#233226]/60 flex items-center justify-center gap-1.5 sm:gap-2 leading-snug">
        <Heart className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C28C4B] shrink-0 fill-[#C28C4B]/20" />
        <span className="truncate sm:whitespace-normal">
          <strong className="text-[#F1ECE1] font-semibold">Comércio Ético & Sagrado:</strong> Renda revertida diretamente às famílias Huni Kuin e Yawanawá.
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2">
        {/* Brand Identity */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group min-w-0"
          id="brand-logo"
        >
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#18231B] border border-[#C28C4B]/40 flex items-center justify-center shadow-inner group-hover:border-[#C28C4B] transition-colors shrink-0">
            {/* Sacred seed & leaf emblem */}
            <svg viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 text-[#C28C4B] fill-none stroke-current stroke-1.5">
              <path d="M12 2C6.5 6 3 10.5 3 15a9 9 0 0 0 18 0c0-4.5-3.5-9-9-13z" />
              <path d="M12 2v20" />
              <path d="M12 9c3 1.5 5 4 5 7" />
              <path d="M12 13c-3 1.5-5 3.5-5 6" />
            </svg>
          </div>
          <div className="min-w-0">
            <div className="font-cinzel text-xs xs:text-sm sm:text-base md:text-xl font-bold tracking-wider text-[#F1ECE1] truncate">
              ARMAZÉM DA FLORESTA
            </div>
            <p className="text-[9px] sm:text-[11px] text-[#A69986] tracking-widest uppercase font-medium truncate">
              Casa de Ayahuasca & Medicinas
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-sm text-[#D8CFBF]">
          <button 
            onClick={() => scrollToSection('proposito')}
            className="hover:text-[#C28C4B] transition-colors font-medium cursor-pointer"
          >
            Origem & Casa
          </button>
          <button 
            onClick={() => scrollToSection('catalogo')}
            className="hover:text-[#C28C4B] transition-colors font-medium cursor-pointer"
          >
            Instrumentos & Medicinas
          </button>
          <button 
            onClick={() => scrollToSection('etica')}
            className="hover:text-[#C28C4B] transition-colors font-medium cursor-pointer"
          >
            Curadoria & Rezo
          </button>
          <button 
            onClick={() => scrollToSection('guia-ritual')}
            className="hover:text-[#C28C4B] transition-colors font-medium cursor-pointer"
          >
            Guia do Altar
          </button>
          <button 
            onClick={() => scrollToSection('depoimentos')}
            className="hover:text-[#C28C4B] transition-colors font-medium cursor-pointer"
          >
            Buscadores
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Ambient Soundscape Button */}
          <button
            id="ambient-sound-btn"
            onClick={onToggleAudio}
            title={isAudioPlaying ? 'Pausar som ambiente da mata' : 'Ativar som ambiente da mata (vento, riacho e sino sagrado)'}
            className={`flex items-center justify-center gap-1.5 p-2 sm:px-3 sm:py-2 rounded-full text-xs font-medium border transition-all cursor-pointer min-h-[38px] min-w-[38px] ${
              isAudioPlaying 
                ? 'bg-[#233226] text-[#E0D7C6] border-[#C28C4B]/60 shadow-[0_0_12px_rgba(194,140,75,0.2)]'
                : 'bg-[#141A15] text-[#A69986] border-[#233226] hover:text-[#F1ECE1] hover:border-[#384F3D]'
            }`}
          >
            {isAudioPlaying ? (
              <>
                <Volume2 className="w-4 h-4 text-[#C28C4B] animate-pulse" />
                <span className="hidden lg:inline">Som da Mata</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4" />
                <span className="hidden lg:inline">Ativar Som</span>
              </>
            )}
          </button>

          {/* Designer Strategy Dossier Button - compact on mobile, expanded on tablet/desktop */}
          <button
            id="dossier-modal-btn"
            onClick={onOpenDossier}
            title="Ver Dossiê Estratégico (UX/Copy)"
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold bg-[#212C23] hover:bg-[#2B3B2F] text-[#E2D6C0] border border-[#C28C4B]/50 hover:border-[#C28C4B] transition-all cursor-pointer shadow-sm min-h-[38px]"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#C28C4B]" />
            <span className="font-sans-clean hidden md:inline">Dossiê Estratégico</span>
            <span className="font-sans-clean md:hidden">Dossiê</span>
          </button>

          {/* Cart / Sacola de Reza Button */}
          <button
            id="cart-drawer-btn"
            onClick={onOpenCart}
            className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#18231B] border border-[#384F3D] hover:border-[#C28C4B] text-[#F1ECE1] transition-all cursor-pointer min-h-[38px] min-w-[38px]"
            aria-label="Abrir Sacola Ritual"
          >
            <ShoppingBag className="w-4 h-4 text-[#C28C4B]" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#C28C4B] text-[#0E1310] text-[11px] font-bold flex items-center justify-center shadow-md animate-bounce">
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
          <div className="flex flex-col space-y-1 text-sm font-medium">
            <button
              onClick={() => scrollToSection('proposito')}
              className="text-left text-[#D8CFBF] hover:text-[#C28C4B] py-2.5 px-3 rounded-xl hover:bg-[#18231B] transition-colors"
            >
              Origem & Filosofia da Casa
            </button>
            <button
              onClick={() => scrollToSection('catalogo')}
              className="text-left text-[#D8CFBF] hover:text-[#C28C4B] py-2.5 px-3 rounded-xl hover:bg-[#18231B] transition-colors"
            >
              Instrumentos & Medicinas
            </button>
            <button
              onClick={() => scrollToSection('etica')}
              className="text-left text-[#D8CFBF] hover:text-[#C28C4B] py-2.5 px-3 rounded-xl hover:bg-[#18231B] transition-colors"
            >
              Curadoria & Rezo
            </button>
            <button
              onClick={() => scrollToSection('guia-ritual')}
              className="text-left text-[#D8CFBF] hover:text-[#C28C4B] py-2.5 px-3 rounded-xl hover:bg-[#18231B] transition-colors"
            >
              Guia de Consagração do Altar
            </button>
            <button
              onClick={() => scrollToSection('depoimentos')}
              className="text-left text-[#D8CFBF] hover:text-[#C28C4B] py-2.5 px-3 rounded-xl hover:bg-[#18231B] transition-colors"
            >
              Depoimentos de Buscadores
            </button>
          </div>

          <div className="pt-2 border-t border-[#233226] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDossier();
              }}
              className="w-full py-3 px-4 rounded-xl bg-[#212C23] border border-[#C28C4B] text-[#F1ECE1] text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow"
            >
              <BookOpen className="w-4 h-4 text-[#C28C4B]" />
              <span>Abrir Dossiê Estratégico (UX/Copy)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
