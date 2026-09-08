import React, { useState } from 'react';
import { Sparkles, MapPin, Mail, MessageCircle, Heart, ShieldCheck, Check, Send } from 'lucide-react';

export const FooterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#0A0E0B] border-t border-[#1C261E] text-[#A69986] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Brand & Mission (Col 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#18231B] border border-[#C28C4B]/40 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#C28C4B] fill-none stroke-current stroke-1.5">
                  <path d="M12 2C6.5 6 3 10.5 3 15a9 9 0 0 0 18 0c0-4.5-3.5-9-9-13z" />
                  <path d="M12 2v20" />
                </svg>
              </div>
              <span className="font-cinzel text-lg font-bold text-[#F1ECE1]">
                Armazém da Floresta
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#8C8070] leading-relaxed">
              Braço de sustentabilidade e difusão das tradições ancestrais da nossa Casa de Ayahuasca. Uma ponte viva e ética entre os povos originários da Amazônia e os altares de todo o Brasil.
            </p>

            <div className="flex items-center gap-3 pt-2 text-xs text-[#C28C4B]">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Comércio ético certificado diretamente nas aldeias.</span>
            </div>
          </div>

          {/* Quick Links & Categories (Col 5-7) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-cinzel text-xs font-bold text-[#F1ECE1] uppercase tracking-wider">
              Navegação Ritual
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#proposito" className="hover:text-[#C28C4B] transition-colors">
                  Filosofia da Casa & Aldeias
                </a>
              </li>
              <li>
                <a href="#catalogo" className="hover:text-[#C28C4B] transition-colors">
                  Rapés Tradicionais & Kuripes
                </a>
              </li>
              <li>
                <a href="#catalogo" className="hover:text-[#C28C4B] transition-colors">
                  Breu Branco & Defumações
                </a>
              </li>
              <li>
                <a href="#catalogo" className="hover:text-[#C28C4B] transition-colors">
                  Cerâmicas, Maracás & Roupas
                </a>
              </li>
              <li>
                <a href="#etica" className="hover:text-[#C28C4B] transition-colors">
                  Curadoria & Bênção dos Itens
                </a>
              </li>
              <li>
                <a href="#guia-ritual" className="hover:text-[#C28C4B] transition-colors">
                  Guia do Altar Consciente
                </a>
              </li>
            </ul>
          </div>

          {/* Physical Temple & Contact (Col 8-9) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-cinzel text-xs font-bold text-[#F1ECE1] uppercase tracking-wider">
              Casa & Cerimônias
            </h4>
            <div className="space-y-2.5 text-xs text-[#8C8070]">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C28C4B] shrink-0 mt-0.5" />
                <span>Sede Campestre: Serra da Cantareira / SP</span>
              </div>
              <div className="flex items-start gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-[#C28C4B] shrink-0 mt-0.5" />
                <span>WhatsApp: (11) 99887-1432</span>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C28C4B] shrink-0 mt-0.5" />
                <span>contato@armazemdafloresta.org</span>
              </div>
              <p className="text-[11px] text-[#6D6354] pt-1">
                * Visitas e vivências cerimoniais mediante agendamento prévio com a secretaria da Casa.
              </p>
            </div>
          </div>

          {/* Ceremonial Newsletter (Col 10-12) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-cinzel text-xs font-bold text-[#F1ECE1] uppercase tracking-wider">
              Avisos Lunares & Feitios
            </h4>
            <p className="text-xs text-[#8C8070]">
              Cadastre-se para ser avisado sobre novos lotes consagrados de rapés, calendários de rituais e artigos de aprofundamento.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-[#18231B] border border-emerald-800/60 text-xs text-emerald-300 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Gratidão. Você receberá nossas cartas lunares com respeito.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Seu e-mail fraterno..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-3 pr-11 py-2.5 rounded-xl bg-[#141B16] border border-[#233226] focus:border-[#C28C4B] text-xs text-[#F1ECE1] placeholder-[#6D6354] focus:outline-none min-h-[44px]"
                  />
                  <button
                    type="submit"
                    aria-label="Inscrever-se na newsletter"
                    className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-[#C28C4B] text-[#0E1310] hover:bg-[#D49E5D] transition-colors cursor-pointer flex items-center justify-center"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-[10px] text-[#6D6354] block">
                  Sem spam. Apenas mensagens de verdade e intenção pura.
                </span>
              </form>
            )}
          </div>

        </div>

        {/* Legal & Ritual Responsibility Statement (Crucial in Holistic Strategy) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#111713] border border-[#1D2920] space-y-2 text-[10px] sm:text-[11px] text-[#7A7061] leading-relaxed">
          <div className="flex items-center gap-2 text-[#C28C4B] font-bold text-xs">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>Aviso de Responsabilidade Ritual & Legal:</span>
          </div>
          <p>
            O rapé de tabaco sagrado e as cinzas tradicionais são elementos de cultura originária e sacramentos de cura reconhecidos pelo patrimônio imaterial brasileiro. Este armazém <strong>não comercializa Ayahuasca (Daime/Vegetal)</strong> nem substâncias de uso restrito via internet, em obediência estrita às resoluções do CONAD (Conselho Nacional de Políticas sobre Drogas) e à legislação brasileira vigente, que resguardam o sacramento exclusivamente ao contexto religioso cerimonial presencial em sedes devidamente constituídas. Os instrumentos aqui oferecidos destinam-se ao fortalecimento do altar pessoal, à meditação, ao equilíbrio energético e ao sustento digno das famílias indígenas parceiras.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-[#1C261E] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6D6354] text-center sm:text-left">
          <p className="text-[11px] sm:text-xs">
            © {new Date().getFullYear()} Armazém da Floresta Sagrada • Todos os direitos consagrados com respeito.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-[10px] sm:text-[11px]">
            <span>Embalagem Biodegradável</span>
            <span>•</span>
            <span>Comércio Justo Indígena</span>
            <span>•</span>
            <span>Rastreabilidade de Feitio</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
