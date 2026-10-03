import React, { useState, useEffect } from 'react';
import { Product, CartItem } from './types';
import { PRODUCTS } from './data/products';
import { fetchProductsFromSheet } from './services/sheetsService';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CategoriesSection } from './components/CategoriesSection';
import { FooterSection } from './components/FooterSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { SheetsSyncModal } from './components/SheetsSyncModal';
import { CheckCircle2, X, Sparkles } from 'lucide-react';

export default function App() {
  // Live dynamic products list (default or loaded from Google Sheets)
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [sheetUrl, setSheetUrl] = useState<string>(() => {
    try {
      return localStorage.getItem('religare_sheet_url') || '';
    } catch {
      return '';
    }
  });
  const [isUsingCustomSheet, setIsUsingCustomSheet] = useState<boolean>(false);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState<boolean>(false);

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
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showCheckoutSuccess, setShowCheckoutSuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Attempt auto-sync from saved Google Sheet on startup
  useEffect(() => {
    try {
      const savedUrl = localStorage.getItem('religare_sheet_url');
      if (savedUrl) {
        fetchProductsFromSheet(savedUrl)
          .then((loadedProducts) => {
            if (loadedProducts.length > 0) {
              setProducts(loadedProducts);
              setIsUsingCustomSheet(true);
            }
          })
          .catch((err) => {
            console.warn('Could not auto-load sheet products on startup:', err);
          });
      }
    } catch (e) {
      // ignore
    }
  }, []);

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
    }, 4000);
  };

  const handleProductsLoaded = (newProducts: Product[], url: string) => {
    setProducts(newProducts);
    setSheetUrl(url);
    setIsUsingCustomSheet(true);
    try {
      localStorage.setItem('religare_sheet_url', url);
    } catch {
      // ignore
    }
    showToast(`✨ ${newProducts.length} produtos carregados da sua Planilha Google!`);
  };

  const handleResetToDefault = () => {
    setProducts(PRODUCTS);
    setSheetUrl('');
    setIsUsingCustomSheet(false);
    try {
      localStorage.removeItem('religare_sheet_url');
    } catch {
      // ignore
    }
    showToast('Catálogo padrão restaurado com sucesso.');
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
    showToast(`"${product.name}" adicionado à sacola.`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
    showToast('Item removido da sacola.');
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
          <div className="bg-[#18231B] border border-[#DFB168]/70 text-[#F1ECE1] px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-2xl shadow-2xl flex items-center justify-between gap-2.5 text-xs font-medium">
            <div className="flex items-center gap-2 min-w-0">
              <Sparkles className="w-4 h-4 text-[#DFB168] shrink-0" />
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

      {/* Main Navbar with Category Index & Live Product Count */}
      <Navbar
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        products={products}
        onOpenSyncModal={() => setIsSyncModalOpen(true)}
        isUsingCustomSheet={isUsingCustomSheet}
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
          products={products}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onSelectProduct={(product) => setSelectedProduct(product)}
          onAddToCart={(product) => handleAddToCart(product)}
          isUsingCustomSheet={isUsingCustomSheet}
          onOpenSyncModal={() => setIsSyncModalOpen(true)}
        />
      </main>

      {/* Footer Section */}
      <FooterSection onOpenSyncModal={() => setIsSyncModalOpen(true)} />

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

      {/* Google Sheets & Forms Sync Modal */}
      <SheetsSyncModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        onProductsLoaded={handleProductsLoaded}
        onResetToDefault={handleResetToDefault}
        currentSheetUrl={sheetUrl}
        isUsingCustomSheet={isUsingCustomSheet}
        productCount={products.length}
      />

      {/* Checkout WhatsApp Confirmation Modal */}
      {showCheckoutSuccess && (
        <div 
          onClick={() => setShowCheckoutSuccess(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="max-w-md w-full bg-[#141B16] border border-[#DFB168]/70 rounded-2xl sm:rounded-3xl p-5 sm:p-8 space-y-4 sm:space-y-5 text-center shadow-2xl"
          >
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#DFB168] mx-auto shadow-lg bg-[#18231B]">
              <img src="/religare-logo.jpg" alt="Religare" className="w-full h-full object-cover" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-[11px] font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Pedido Encaminhado ao WhatsApp</span>
              </div>
              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#F1ECE1]">
                Atendimento Direto no WhatsApp
              </h3>
              <p className="text-xs sm:text-sm text-[#A69986] leading-relaxed">
                Os itens da sua sacola foram formatados e abertos no WhatsApp oficial da Religare: <strong className="text-[#DFB168]">(81) 97914-9067</strong>.
              </p>
              <p className="text-[11px] text-[#8C8070] leading-relaxed">
                Basta clicar em <strong>Enviar</strong> no WhatsApp para que nossa equipe feminina combine o frete e passe a chave PIX ou link de pagamento.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#0E1310] border border-[#233226] text-xs space-y-2 text-left">
              <div className="flex justify-between text-[#A69986]">
                <span>Canal de Atendimento:</span>
                <span className="text-emerald-400 font-semibold">(81) 97914-9067</span>
              </div>
              <div className="flex justify-between text-[#A69986]">
                <span>Equipe Responsável:</span>
                <span className="text-[#DFB168] font-semibold">Guiança 100% Feminina</span>
              </div>
              <div className="flex justify-between text-[#A69986]">
                <span>Itens Reservados:</span>
                <span className="text-[#F1ECE1] font-mono">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)} unidade(s)
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <a
                href="https://wa.me/5581979149067"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:brightness-110 text-white font-bold text-xs sm:text-sm tracking-wide transition-all cursor-pointer min-h-[44px] flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40"
              >
                <span>Reabrir WhatsApp (81 97914-9067)</span>
              </a>

              <button
                onClick={() => {
                  setShowCheckoutSuccess(false);
                  setCartItems([]);
                }}
                className="w-full py-3 rounded-xl bg-[#233226] hover:bg-[#2F4434] text-[#D8CFBF] font-semibold text-xs transition-colors cursor-pointer min-h-[40px]"
              >
                Limpar Sacola & Continuar Navegando
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
