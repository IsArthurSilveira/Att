import React, { useState, useEffect } from 'react';
import { Product, CartItem } from './types';
import { PRODUCTS } from './data/products';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PurposeSection } from './components/PurposeSection';
import { CategoriesSection } from './components/CategoriesSection';
import { EthicsTransparencySection } from './components/EthicsTransparencySection';
import { RitualGuideSection } from './components/RitualGuideSection';
import { CommunityTestimonials } from './components/CommunityTestimonials';
import { FooterSection } from './components/FooterSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { StrategyDossierModal } from './components/StrategyDossierModal';
import { toggleAmbientSound, isAmbientPlaying } from './utils/soundSynthesizer';
import { CheckCircle2, X, Sparkles, BookOpen } from 'lucide-react';

export default function App() {
  // Cart state with localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('floresta_sacola');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    // Default initial sacred basket item for pleasant interactive onboarding
    return [
      { product: PRODUCTS[0], quantity: 1 }
    ];
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [showCheckoutSuccess, setShowCheckoutSuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('floresta_sacola', JSON.stringify(cartItems));
    } catch (e) {
      // ignore
    }
  }, [cartItems]);

  const handleToggleAudio = () => {
    toggleAmbientSound((playing) => {
      setIsAudioPlaying(playing);
      if (playing) {
        showToast('🌿 Som sagrado ativado: Brisa, riacho e sino de oração.');
      } else {
        showToast('Som da mata pausado.');
      }
    });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`✓ "${product.name}" foi acolhido na sua sacola de rezo.`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item => item.product.id === productId ? { ...item, quantity } : item)
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setShowCheckoutSuccess(true);
  };

  return (
    <div className="min-h-screen bg-[#0E1310] text-[#F1ECE1] flex flex-col selection:bg-[#C28C4B] selection:text-[#0E1310]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-4 sm:bottom-6 left-3 sm:left-auto right-3 sm:right-6 z-50 animate-in slide-in-from-bottom-5 duration-300 max-w-md ml-auto">
          <div className="bg-[#18231B] border border-[#C28C4B]/60 text-[#F1ECE1] px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-2xl shadow-2xl flex items-center justify-between gap-2.5 text-xs font-medium">
            <div className="flex items-center gap-2 min-w-0">
              <Sparkles className="w-4 h-4 text-[#C28C4B] shrink-0" />
              <span className="truncate">{toastMessage}</span>
            </div>
            <button
              onClick={() => setToastMessage(null)}
              aria-label="Fechar notificação"
              className="text-[#A69986] hover:text-white p-1 cursor-pointer shrink-0"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Fast Strategy Badge on Desktop bottom-left */}
      <aside aria-label="Acesso rápido ao dossiê" className="fixed bottom-6 left-6 z-40 hidden xl:flex">
        <button
          onClick={() => setIsDossierOpen(true)}
          className="group flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#18231B]/90 hover:bg-[#223125] backdrop-blur-md border border-[#C28C4B]/50 hover:border-[#C28C4B] text-xs text-[#F1ECE1] shadow-xl transition-all cursor-pointer"
        >
          <BookOpen className="w-4 h-4 text-[#C28C4B] group-hover:scale-110 transition-transform" />
          <span className="font-semibold">Ver Dossiê Estratégico (UX/Copy)</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </button>
      </aside>

      {/* Main Navbar */}
      <Navbar
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenDossier={() => setIsDossierOpen(true)}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={handleToggleAudio}
      />

      {/* Hero Section */}
      <main className="flex-1">
        <HeroSection
          onExploreCatalog={() => {
            const el = document.getElementById('catalogo');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onExplorePurpose={() => {
            const el = document.getElementById('proposito');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Purpose & Indigenous Alliance */}
        <PurposeSection />

        {/* Featured Catalog & Interactive Categories */}
        <CategoriesSection
          onSelectProduct={(product) => setSelectedProduct(product)}
          onAddToCart={(product) => handleAddToCart(product)}
        />

        {/* Ethics & Consecration Protocol */}
        <EthicsTransparencySection />

        {/* Altar Consecration Guide */}
        <RitualGuideSection />

        {/* Community Testimonials */}
        <CommunityTestimonials />
      </main>

      {/* Footer Section */}
      <FooterSection />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(product, quantity) => handleAddToCart(product, quantity)}
      />

      {/* Sacred Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      {/* Senior Web Designer & Conversion Strategist Dossier */}
      <StrategyDossierModal
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
      />

      {/* Checkout Simulator Modal */}
      {showCheckoutSuccess && (
        <div 
          onClick={() => setShowCheckoutSuccess(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="max-w-md w-full bg-[#141B16] border border-[#C28C4B] rounded-2xl sm:rounded-3xl p-5 sm:p-8 space-y-4 sm:space-y-5 text-center shadow-2xl"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#18231B] border border-[#C28C4B] text-[#C28C4B] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-400" />
            </div>

            <div className="space-y-2">
              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#F1ECE1]">
                Rezo Recebido no Coração da Casa!
              </h3>
              <p className="text-xs sm:text-sm text-[#A69986] leading-relaxed">
                Seu pedido foi pré-reservado. Em uma operação real, o comprador é direcionado para a chave PIX sagrada da cooperativa ou checkout seguro por cartão, com envio do comprovante pelo WhatsApp da Casa para receber a defumação personalizada antes do despacho.
              </p>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl bg-[#0E1310] border border-[#233226] text-xs text-[#D8CFBF] space-y-1 text-left">
              <p><strong>Embalagem:</strong> Kraft 100% reciclável com folhas secas de alfazema.</p>
              <p><strong>Destino da Renda:</strong> Repasse direto às aldeias parceiras.</p>
              <p><strong>Código de Rastreio:</strong> Enviado via e-mail e WhatsApp após a consagração no fogo.</p>
            </div>

            <button
              onClick={() => setShowCheckoutSuccess(false)}
              className="w-full min-h-[46px] py-3 rounded-xl bg-[#C28C4B] hover:bg-[#D49E5D] text-[#0E1310] font-bold text-xs sm:text-sm cursor-pointer shadow-md transition-all"
            >
              Retornar ao Armazém Sagrado
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
