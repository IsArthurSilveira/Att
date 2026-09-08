import React from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, ShieldCheck, Heart, MessageCircle, ArrowRight, Sparkles } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  if (!isOpen) return null;

  const total = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const giftThreshold = 250;
  const progressToGift = Math.min(100, (total / giftThreshold) * 100);
  const remainingForGift = Math.max(0, giftThreshold - total);

  // Generate pre-filled WhatsApp message
  const generateWhatsAppMessage = () => {
    let msg = 'Olá, equipe da Casa! Gostaria de encomendar os seguintes itens sagrados do Armazém:\n\n';
    items.forEach(i => {
      msg += `• ${i.quantity}x ${i.product.name} (R$ ${(i.product.price * i.quantity).toFixed(2)})\n`;
    });
    msg += `\nTotal: R$ ${total.toFixed(2)}\nComo posso concluir o pagamento e envio?`;
    return encodeURIComponent(msg);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-8">
        <div className="w-screen max-w-md bg-[#141B16] border-l border-[#2B3B2F] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-[#233226] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-[#18231B] border border-[#C28C4B]/40 text-[#C28C4B]">
                <Heart className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-cinzel text-sm sm:text-base font-bold text-[#F1ECE1]">
                  Sua Sacola Ritual
                </h3>
                <p className="text-[10px] sm:text-[11px] text-[#A69986]">
                  {items.length} {items.length === 1 ? 'item sagrado' : 'itens sagrados'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Fechar sacola"
              className="p-2 w-9 h-9 flex items-center justify-center rounded-lg text-[#A69986] hover:text-[#F1ECE1] hover:bg-[#1E2B21] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Gift Progress Bar */}
          <div className="px-4 sm:px-6 py-2.5 sm:py-3 bg-[#18231B] border-b border-[#233226]">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-[#C28C4B] font-semibold flex items-center gap-1 text-[11px] sm:text-xs">
                <Sparkles className="w-3.5 h-3.5" />
                Presente Sagrado
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#A69986]">
                {total >= giftThreshold ? (
                  <span className="text-emerald-400 font-bold">Amostra de Breu garantida!</span>
                ) : (
                  <span>Faltam R$ {remainingForGift.toFixed(2).replace('.', ',')}</span>
                )}
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#0E1310] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#8C5A3E] to-[#C28C4B] transition-all duration-300"
                style={{ width: `${progressToGift}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3 sm:space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-12 sm:py-16 space-y-3">
                <p className="font-cinzel text-sm sm:text-base text-[#F1ECE1]">Sua sacola ainda está vazia.</p>
                <p className="text-xs text-[#A69986] max-w-xs mx-auto">Escolha os instrumentos que ancorarão suas preces no altar sagrado.</p>
                <button
                  onClick={onClose}
                  className="mt-3 px-5 py-2.5 rounded-xl bg-[#233226] hover:bg-[#2F4434] text-xs font-bold text-[#F1ECE1] cursor-pointer min-h-[42px]"
                >
                  Explorar Medicinas da Floresta
                </button>
              </div>
            ) : (
              items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="p-3 sm:p-3.5 rounded-xl bg-[#0E1310] border border-[#233226] flex gap-3 items-center"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover border border-[#233226] shrink-0"
                  />

                  <div className="flex-1 min-w-0 space-y-0.5 sm:space-y-1">
                    <h4 className="font-cinzel text-xs font-bold text-[#F1ECE1] truncate">
                      {product.name}
                    </h4>
                    <p className="text-[10px] text-[#C28C4B] truncate">
                      {product.origin.split(',')[0]}
                    </p>
                    <div className="font-mono text-xs font-bold text-[#F1ECE1]">
                      R$ {(product.price * quantity).toFixed(2).replace('.', ',')}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <button
                      onClick={() => onRemoveItem(product.id)}
                      className="text-[#6D6354] hover:text-red-400 transition-colors p-1 cursor-pointer"
                      title="Remover da sacola"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center border border-[#233226] rounded-md bg-[#141B16]">
                      <button
                        onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center text-xs text-[#A69986] hover:text-[#F1ECE1] cursor-pointer"
                        aria-label="Diminuir quantidade"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-1.5 text-xs font-mono font-bold text-[#F1ECE1]">
                        {quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center text-xs text-[#A69986] hover:text-[#F1ECE1] cursor-pointer"
                        aria-label="Aumentar quantidade"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with totals & Actions */}
          {items.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-[#233226] bg-[#0E1310] space-y-3 sm:space-y-4">
              
              <div className="space-y-1 text-xs text-[#A69986]">
                <div className="flex items-center justify-between">
                  <span>Subtotal:</span>
                  <span className="font-mono text-[#F1ECE1] font-semibold">
                    R$ {total.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Envio Sagrado:</span>
                  <span className="text-emerald-400 font-semibold text-[11px] sm:text-xs">Calculado na próxima etapa</span>
                </div>
                <div className="pt-1.5 border-t border-[#233226] flex items-center justify-between text-xs sm:text-sm font-bold text-[#F1ECE1]">
                  <span>Total Previsto:</span>
                  <span className="font-mono text-sm sm:text-base text-[#C28C4B]">
                    R$ {total.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>

              {/* Checkout Primary */}
              <button
                onClick={onCheckout}
                className="w-full min-h-[46px] py-3 rounded-xl bg-[#C28C4B] hover:bg-[#D49E5D] text-[#0E1310] font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Seguir para Pagamento Seguro</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Direct WhatsApp Ordering */}
              <a
                href={`https://wa.me/5511999999999?text=${generateWhatsAppMessage()}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[44px] py-2.5 rounded-xl bg-[#172019] hover:bg-[#202D23] text-[#D8CFBF] hover:text-[#F1ECE1] border border-[#2B3B2F] font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="truncate">Finalizar ou Pedir Apoio no WhatsApp</span>
              </a>

              {/* Micro-trust guarantee */}
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#7A7061] text-center pt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C28C4B] shrink-0" />
                <span>Embalagem 100% sem plástico e consagrada com defumação.</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
