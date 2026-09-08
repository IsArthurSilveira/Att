import React from 'react';
import { TESTIMONIALS } from '../data/products';
import { Star, Quote, MessageCircle, Heart } from 'lucide-react';

export const CommunityTestimonials: React.FC = () => {
  return (
    <section id="depoimentos" className="py-14 sm:py-20 md:py-28 bg-[#111713] border-y border-[#233226]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18231B] border border-[#C28C4B]/40 text-[#C28C4B] text-[11px] sm:text-xs font-semibold tracking-wider uppercase">
            <Heart className="w-3.5 h-3.5" />
            <span>Vozes da Nossa Roda de Rezo</span>
          </div>

          <h2 className="font-cinzel text-2xl xs:text-3xl sm:text-4xl font-bold text-[#F1ECE1]">
            A experiência de quem caminha conosco
          </h2>

          <p className="text-[#A69986] text-xs sm:text-sm md:text-base leading-relaxed font-sans-clean">
            Palavras de buscadores, terapeutas e irmãos que consagram as medicinas e sustentam a força da floresta em seus altares pessoais.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8 mb-10 sm:mb-16">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-5 sm:p-7 rounded-xl sm:rounded-2xl bg-[#141B16] border border-[#233226] hover:border-[#C28C4B]/40 transition-all flex flex-col justify-between space-y-5 sm:space-y-6 shadow-lg relative"
            >
              <Quote className="absolute top-5 right-5 sm:top-6 sm:right-6 w-7 h-7 sm:w-8 sm:h-8 text-[#253629] pointer-events-none" />

              <div className="space-y-3 sm:space-y-4">
                {/* Rating Stars */}
                <div className="flex items-center gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C28C4B] fill-[#C28C4B]" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-sm text-[#D3C7B2] leading-relaxed italic font-cormorant text-base sm:text-lg">
                  “{t.text}”
                </p>
              </div>

              {/* Author & Verified Item */}
              <div className="pt-4 border-t border-[#233226] space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatarUrl}
                    alt={t.name}
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border border-[#C28C4B]/40"
                  />
                  <div>
                    <h4 className="font-cinzel text-xs sm:text-sm font-bold text-[#F1ECE1]">
                      {t.name}
                    </h4>
                    <p className="text-[10px] sm:text-[11px] text-[#A69986]">
                      {t.role} • {t.location}
                    </p>
                  </div>
                </div>

                <div className="bg-[#0E1310] px-3 py-1.5 rounded-lg text-[10px] sm:text-[11px] text-[#C28C4B] flex items-center justify-between gap-2">
                  <span className="truncate">Consagrou: {t.purchasedItem}</span>
                  <span className="text-[#6D6354] shrink-0">{t.date}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* WhatsApp Direct Guidance Banner */}
        <div className="rounded-2xl p-5 sm:p-8 bg-[#18231B] border border-[#384F3D] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-5 sm:gap-6">
          <div className="flex items-start sm:items-center gap-3.5 sm:gap-4">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#233226] border border-[#C28C4B]/50 flex items-center justify-center text-[#C28C4B] shrink-0">
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h3 className="font-cinzel text-sm sm:text-base md:text-lg font-bold text-[#F1ECE1]">
                Deseja orientação antes de escolher seu instrumento?
              </h3>
              <p className="text-xs sm:text-sm text-[#A69986] mt-0.5">
                Converse diretamente com os facilitadores da Casa em Recife, Pernambuco. Estamos aqui para acolher sua busca com carinho e seriedade pelo WhatsApp: 81 0000-0000.
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/558100000000?text=Ol%C3%A1%2C%20gostaria%20de%20tirar%20uma%20d%C3%BAvida%20sobre%20os%20instrumentos%20e%20medicinas%20da%20Casa."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto px-6 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm whitespace-nowrap shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[48px]"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Falar no WhatsApp (81 0000-0000)</span>
          </a>
        </div>

      </div>
    </section>
  );
};
