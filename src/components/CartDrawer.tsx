import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, ShieldCheck, MessageCircle, Sparkles } from 'lucide-react';

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
  const [customerName, setCustomerName] = useState('');
  const [customerLocation, setCustomerLocation] = useState('');

  if (!isOpen) return null;

  const total = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const giftThreshold = 250;
  const progressToGift = Math.min(100, (total / giftThreshold) * 100);
  const remainingForGift = Math.max(0, giftThreshold - total);

  // Generate structured, pre-filled WhatsApp message for number 81979149067
  const generateWhatsAppMessage = () => {
    let msg = `🌿 *NOVO PEDIDO • RELIGARE* 🌿\n`;
    msg += `_1ª Casa de Ayahuasca de Recife Dirigida por Mulheres_\n\n`;

    if (customerName.trim()) {
      msg += `👤 *Nome do Cliente:* ${customerName.trim()}\n`;
    }
    if (customerLocation.trim()) {
      msg += `📍 *Cidade / CEP:* ${customerLocation.trim()}\n`;
    }
    if (customerName.trim() || customerLocation.trim()) {
      msg += `\n`;
    }

    msg += `📦 *ITENS DA SACOLA:*\n`;
    items.forEach((item, index) => {
      const subtotal = (item.product.price * item.quantity).toFixed(2).replace('.', ',');
      msg += `${index + 1}. *${item.product.name}*\n   ↳ Quantidade: ${item.quantity}x • Subtotal: R$ ${subtotal}\n`;
    });

    msg += `\n💰 *VALOR TOTAL DOS ITENS:* R$ ${total.toFixed(2).replace('.', ',')}\n`;
    msg += `📦 *Envio:* A calcular (Entrega em todo o Brasil via Sedex / Correios / Transportadora)\n\n`;
    msg += `Olá, equipe Religare! Acabei de montar minha sacola no site e gostaria de concluir meu pedido. Poderiam me passar os dados para pagamento (PIX / Cartão) e o valor do frete? Gratidão! 🙏🌸`;

    return encodeURIComponent(msg);
  };

  const whatsappUrl = `https://wa.me/5581979149067?text=${generateWhatsAppMessage()}`;

  const handleCheckoutClick = () => {
    onCheckout();
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
              <div className="w-9 h-9 rounded-full overflow-hidden border border-[#DFB168]/70 shadow-sm shrink-0">
                <img src="/religare-logo.jpg" alt="Religare" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-cinzel text-sm sm:text-base font-bold text-[#F1ECE1]">
                  Sacola Religare
                </h3>
                <p className="text-[10px] sm:text-[11px] text-[#A69986]">
                  {items.length} {items.length === 1 ? 'item selecionado' : 'itens selecionados'}
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
              <span className="text-[#DFB168] font-semibold flex items-center gap-1 text-[11px] sm:text-xs">
                <Sparkles className="w-3.5 h-3.5" />
                Mimo da Floresta
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#A69986]">
                {total >= giftThreshold ? (
                  <span className="text-emerald-400 font-bold">Resina de Breu Branco garantida!</span>
                ) : (
                  <span>Faltam R$ {remainingForGift.toFixed(2).replace('.', ',')}</span>
                )}
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#0E1310] overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#8C5A3E] to-[#DFB168] transition-all duration-300"
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
              <>
                {items.map(({ product, quantity }) => (
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
                      <p className="text-[10px] text-[#DFB168] truncate">
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
                ))}

                {/* Optional Customer Details for WhatsApp Message */}
                <div className="mt-4 p-3 rounded-xl bg-[#0E1310] border border-[#233226] space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-[#DFB168] font-semibold">
                    <span>Agilizar Envio no WhatsApp</span>
                    <span className="text-[10px] text-[#7A7061] font-normal">opcional</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Seu nome"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-[#141B16] border border-[#2B3B2F] text-xs text-[#F1ECE1] placeholder-[#6D6354] focus:outline-none focus:border-[#DFB168]"
                    />
                    <input
                      type="text"
                      placeholder="Cidade / Estado ou CEP"
                      value={customerLocation}
                      onChange={(e) => setCustomerLocation(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-[#141B16] border border-[#2B3B2F] text-xs text-[#F1ECE1] placeholder-[#6D6354] focus:outline-none focus:border-[#DFB168]"
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer Checkout via WhatsApp */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#233226] bg-[#0E1310] space-y-3">
              
              <div className="space-y-1 text-xs text-[#A69986]">
                <div className="flex items-center justify-between">
                  <span>Subtotal:</span>
                  <span className="font-mono text-[#F1ECE1] font-semibold">
                    R$ {total.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Entrega em todo Brasil:</span>
                  <span className="text-emerald-400 font-semibold text-[11px]">Calculado via WhatsApp</span>
                </div>
                <div className="pt-1.5 border-t border-[#233226] flex items-center justify-between text-xs sm:text-sm font-bold text-[#F1ECE1]">
                  <span>Total dos Produtos:</span>
                  <span className="font-mono text-sm sm:text-base text-[#DFB168]">
                    R$ {total.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>

              {/* Direct WhatsApp Checkout Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleCheckoutClick}
                className="w-full min-h-[48px] py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-[#DFB168] hover:brightness-110 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-950/40 text-center"
              >
                <MessageCircle className="w-4 h-4 fill-white shrink-0" />
                <span>Concluir Pedido no WhatsApp</span>
              </a>

              {/* Number and direct support reassurance */}
              <div className="text-[11px] text-[#A69986] text-center space-y-1 pt-0.5">
                <p>
                  Atendimento direto: <strong className="text-[#DFB168]">(81) 97914-9067</strong>
                </p>
                <div className="flex items-center justify-center gap-1 text-[10px] text-[#7A7061]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#DFB168] shrink-0" />
                  <span>Seu pedido abre no WhatsApp pronto para envio.</span>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
