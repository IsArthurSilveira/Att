import React, { useState, useEffect } from 'react';
import { Product, CartItem } from './types';
import { PRODUCTS } from './data/products';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CategoriesSection } from './components/CategoriesSection';
import { FooterSection } from './components/FooterSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckCircle2, X, Sparkles } from 'lucide-react';

export default function App() {
  // Cart state with localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('floresta_sacola');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    // Default initial cart item for immediate interactive onboarding
    return [
      { product: PRODUCTS[0], quantity: 1 }
    ];
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
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
    showToast(`✓ "${product.name}" adicionado ao seu carrinho.`);
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

      {/* Main Navbar */}
      <Navbar
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main E-commerce View */}
      <main className="flex-1">
        <HeroSection
          onExploreCatalog={() => {
            const el = document.getElementById('catalogo');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Featured Catalog & Interactive Categories */}
        <CategoriesSection
          onSelectProduct={(product) => setSelectedProduct(product)}
          onAddToCart={(product) => handleAddToCart(product)}
        />
      </main>

      {/* Footer Section */}
      <FooterSection />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={(product, quantity) => handleAddToCart(product, quantity)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
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
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#C28C4B] mx-auto shadow-lg bg-[#18231B]">
              <img src="/religare-logo.jpg" alt="Religare" className="w-full h-full object-cover" />
            </div>

            <div className="space-y-2">
              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#F1ECE1]">
                Pedido Recebido no Espaço Religare!
              </h3>
              <p className="text-xs sm:text-sm text-[#A69986] leading-relaxed">
                Seu pedido foi registrado. Em uma operação real com gateway integrado, o pagamento é concluído via PIX instantâneo ou cartão de crédito com envio seguro para todo o Brasil.
              </p>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#111713] border border-[#233226] text-xs space-y-2">
              <div className="flex justify-between text-[#A69986]">
                <span>Status do Pedido:</span>
                <span className="text-emerald-400 font-semibold">Aguardando Pagamento</span>
              </div>
              <div className="flex justify-between text-[#A69986]">
                <span>Total de Itens:</span>
                <span className="text-[#F1ECE1] font-mono">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)} unidade(s)
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setShowCheckoutSuccess(false);
                setCartItems([]);
              }}
              className="w-full py-3.5 rounded-xl bg-[#C28C4B] hover:bg-[#DFB168] text-[#0E1310] font-bold text-xs sm:text-sm tracking-wide transition-colors cursor-pointer min-h-[44px]"
            >
              Concluir & Voltar à Loja Religare
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
