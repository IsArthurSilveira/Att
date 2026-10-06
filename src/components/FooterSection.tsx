import React, { useState } from 'react';
import { MapPin, Mail, MessageCircle, Instagram, ShieldCheck, Check, Send, ShoppingBag, FileSpreadsheet, Calendar } from 'lucide-react';

interface FooterSectionProps {
  onNavigate?: (view: 'home' | 'shop') => void;
  onSelectCategory?: (category: string) => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ 
  onNavigate,
  onSelectCategory
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  const handleCategoryClick = (catId: string) => {
    if (onSelectCategory) {
      onSelectCategory(catId);
    }
    if (onNavigate) {
      onNavigate('shop');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEventsClick = () => {
    if (onNavigate) {
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

  return (
    <footer className="bg-[#0A0F0B] border-t border-[#1C261E] text-[#A69986] pt-14 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand & Mission with Religare Logo (Col 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#DFB168]/70 shadow-[0_0_12px_rgba(223,177,104,0.25)] shrink-0 bg-[#162119]">
                <img 
                  src="/religare-logo.jpg" 
                  alt="Logo Religare" 
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div>
                <span className="font-cinzel text-xl font-bold tracking-wider text-[#F1ECE1] block">
                  RELIGARE
                </span>
                <span className="text-[10px] text-[#DFB168] tracking-[0.14em] uppercase font-semibold block">
                  1ª Casa de Recife Dirigida por Mulheres
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#8C8070] leading-relaxed">
              Primeira casa cerimonial de Recife dirigida por mulheres. Um espaço sagrado de cura, acolhimento, medicinas da floresta, velas ecológicas e instrumentos de oração com comércio ético e transparente.
            </p>

            <div className="flex items-center gap-2.5 pt-1 text-xs text-[#DFB168]">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Comércio ético e curadoria de rezo consagrado.</span>
            </div>
          </div>

          {/* Quick Links & Categories (Col 5-7) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-cinzel text-xs font-bold text-[#F1ECE1] uppercase tracking-wider">
              Categorias Religare
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => handleCategoryClick('all')} 
                  className="hover:text-[#DFB168] transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[#DFB168]" />
                  <span>Todos os Produtos</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleCategoryClick('sopro')} 
                  className="hover:text-[#DFB168] transition-colors cursor-pointer text-left block"
                >
                  Tepis & Kuripes (Sopro Imperial)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleCategoryClick('medicinas')} 
                  className="hover:text-[#DFB168] transition-colors cursor-pointer text-left block"
                >
                  Rapés Tradicionais & Sananga
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleCategoryClick('velas')} 
                  className="hover:text-[#DFB168] transition-colors cursor-pointer text-left block"
                >
                  Velas Rituais (Lumiar)
                </button>
              </li>
              <li className="pt-1.5 pb-1">
                <button 
                  onClick={handleEventsClick} 
                  className="hover:text-[#DFB168] transition-colors flex items-center gap-1.5 cursor-pointer text-left text-emerald-400 font-semibold"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#DFB168]" />
                  <span>Vivências & Experiências do Mês</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact (Col 8-9) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-cinzel text-xs font-bold text-[#F1ECE1] uppercase tracking-wider">
              Atendimento & Casa
            </h4>
            <div className="space-y-2.5 text-xs text-[#8C8070]">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#DFB168] shrink-0 mt-0.5" />
                <span>Envios para Recife e Região • Casa de Cura</span>
              </div>
              <div className="flex items-start gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <a
                  href="https://wa.me/5581979149067"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F1ECE1] transition-colors"
                >
                  WhatsApp da Casa: (81) 97914-9067
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Instagram className="w-3.5 h-3.5 text-[#DFB168] shrink-0 mt-0.5" />
                <a
                  href="https://www.instagram.com/3religare?stkn=MTExcml3cHh0cGJkdg=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F1ECE1] transition-colors"
                >
                  Instagram: @3religare
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-[#DFB168] shrink-0 mt-0.5" />
                <span>contato@religare.org</span>
              </div>
            </div>
          </div>

          {/* Newsletter (Col 10-12) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-cinzel text-xs font-bold text-[#F1ECE1] uppercase tracking-wider">
              Cartas Lunares & Lotes
            </h4>
            <p className="text-xs text-[#8C8070]">
              Receba avisos de novos feitios de rapé, reposição de instrumentos e círculos de vivência.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-[#18231B] border border-emerald-800/60 text-xs text-emerald-300 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>E-mail cadastrado com sucesso!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Seu melhor e-mail..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-3 pr-11 py-2.5 rounded-xl bg-[#141B16] border border-[#233226] focus:border-[#DFB168] text-xs text-[#F1ECE1] placeholder-[#6D6354] focus:outline-none min-h-[44px]"
                  />
                  <button
                    type="submit"
                    aria-label="Inscrever-se na newsletter"
                    className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-[#DFB168] text-[#0E1310] hover:bg-[#F0CD86] transition-colors cursor-pointer flex items-center justify-center font-bold"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* Legal Statement */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#111713] border border-[#1D2920] space-y-2 text-[10px] sm:text-[11px] text-[#7A7061] leading-relaxed">
          <p>
            O rapé de tabaco sagrado e as cinzas tradicionais são elementos de cultura originária e sacramentos de cura reconhecidos pelo patrimônio imaterial brasileiro. O espaço <strong>Religare não comercializa Ayahuasca (Daime/Vegetal)</strong> nem substâncias de uso restrito via internet, em obediência estrita às resoluções do CONAD e à legislação brasileira vigente. Os instrumentos aqui oferecidos destinam-se à meditação, ao equilíbrio energético e ao sustento digno dos povos e artesãos parceiros.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#1C261E] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6D6354] text-center sm:text-left">
          <p className="text-[11px] sm:text-xs">
            © {new Date().getFullYear()} Religare • Todos os direitos reservados.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[10px] sm:text-[11px]">
            <span>Embalagem Biodegradável</span>
            <span>•</span>
            <span>Comércio Justo</span>
            <span>•</span>
            <span>Pagamento Seguro via PIX e Cartão</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
