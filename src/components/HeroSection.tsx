import React from 'react';
import { ArrowRight, Sparkles, Feather, Flame, Shield, Heart } from 'lucide-react';

interface HeroSectionProps {
  onExploreCatalog: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCatalog
}) => {
  return (
    <section className="relative overflow-hidden pt-6 pb-4 sm:pt-10 sm:pb-6 md:pt-12 md:pb-8">
      {/* Background ambient lighting with warm golden and forest tones */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] sm:h-[600px] pointer-events-none opacity-40">
        <div className="absolute top-10 left-1/4 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-[#1E3A25] blur-[100px] sm:blur-[120px]" />
        <div className="absolute top-20 right-1/4 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-[#965A2E]/25 blur-[110px] sm:blur-[130px]" />
        <div className="absolute top-36 left-1/2 -translate-x-1/2 w-64 sm:w-80 h-64 sm:h-80 rounded-full bg-[#DFB168]/20 blur-[90px] sm:blur-[100px]" />
      </div>

      {/* Subtle sacred geometry Kenê watermarks in SVG */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] flex items-center justify-center">
        <svg viewBox="0 0 1000 1000" className="w-[900px] h-[900px] stroke-[#F1ECE1] fill-none stroke-[1.5]">
          <polygon points="500,50 950,500 500,950 50,500" />
          <polygon points="500,150 850,500 500,850 150,500" />
          <circle cx="500" cy="500" r="300" />
          <circle cx="500" cy="500" r="180" />
          <line x1="50" y1="500" x2="950" y2="500" />
          <line x1="500" y1="50" x2="500" y2="950" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Column: Text & Intent Architecture */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left">
            {/* Tagline with Religare Seal & Prominent 100% Female Leadership Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18231B] border border-[#DFB168]/60 text-[#D9CDBB] text-[11px] sm:text-xs font-medium tracking-wide shadow-md">
              <img 
                src="/religare-logo.jpg" 
                alt="Religare" 
                className="w-4 h-4 sm:w-5 sm:h-5 rounded-full object-cover border border-[#DFB168]"
              />
              <span className="font-bold text-[#DFB168]">RELIGARE</span>
              <span className="text-[#8C8070]">•</span>
              <span className="text-[#F1ECE1] font-semibold">1ª Casa do Brasil 100% Dirigida por Mulheres</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-cinzel text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold text-[#F1ECE1] tracking-tight leading-[1.2] sm:leading-[1.15]">
              A sacralidade da floresta e a <span className="text-[#DFB168] italic font-cormorant font-normal">reconexão</span> guiadas pela força feminina.
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base md:text-lg text-[#C7BCAB] font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0 font-sans-clean">
              Pioneira no país como a primeira casa cerimonial com liderança 100% feminina. Unimos acolhimento humanizado, respeito, escuta e amor à força dos instrumentos sagrados (Sopro Imperial), rapés tradicionais, sananga viva e velas rituais da Lumiar.
            </p>

            {/* Direct e-commerce CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <button
                id="hero-primary-cta"
                onClick={onExploreCatalog}
                className="w-full sm:w-auto px-7 sm:px-9 py-3.5 sm:py-4 rounded-xl bg-[#C28C4B] hover:bg-[#DFB168] text-[#0E1310] font-bold text-xs sm:text-sm tracking-wide transition-all shadow-lg hover:shadow-[0_0_24px_rgba(223,177,104,0.4)] flex items-center justify-center gap-2.5 cursor-pointer group min-h-[48px]"
              >
                <span>Ver Catálogo Religare</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Trust Micro-Badges */}
            <div className="pt-4 sm:pt-6 border-t border-[#233226] grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-left">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#141B15]/80 border border-[#DFB168]/40 shadow-sm">
                <Heart className="w-4 h-4 text-[#DFB168] shrink-0 mt-0.5 fill-[#DFB168]/20" />
                <div>
                  <h4 className="text-xs font-semibold text-[#F1ECE1]">Direção 100% Feminina</h4>
                  <p className="text-[11px] text-[#A69986] leading-tight mt-0.5">Primeira casa cerimonial do Brasil com liderança exclusivamente feminina.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#141B15]/60 border border-[#233226]/50">
                <Flame className="w-4 h-4 text-[#C28C4B] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-[#F1ECE1]">Consagração no Fogo</h4>
                  <p className="text-[11px] text-[#A69986] leading-tight mt-0.5">Defumados com breu e benzidos antes do envio.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#141B15]/60 border border-[#233226]/50">
                <Feather className="w-4 h-4 text-[#C28C4B] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-[#F1ECE1]">Comércio Ético & Direto</h4>
                  <p className="text-[11px] text-[#A69986] leading-tight mt-0.5">Parcerias justas com povos originários e mestres artesãos.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Sanctuary & Product Hero Card */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
              {/* Outer decorative border */}
              <div className="relative rounded-2xl p-2 bg-gradient-to-b from-[#283C2D] via-[#1A261D] to-[#121914] shadow-2xl border border-[#C28C4B]/40">
                <div className="relative rounded-xl overflow-hidden aspect-[4/3] xs:aspect-[1/1] sm:aspect-[4/5] bg-[#0E1310]">
                  <img
                    src="https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=1000&q=85"
                    alt="Kuripe sagrado entalhado à mão em madeira nobre com grafismos kenê"
                    className="w-full h-full object-cover object-center filter brightness-90 hover:scale-105 transition-transform duration-700"
                  />

                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E1310] via-transparent to-black/30" />

                  {/* Floating sacred seal with Religare identity */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 backdrop-blur-md bg-[#0E1310]/85 border border-[#DFB168]/50 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs text-[#E6DCB8] flex items-center gap-2 shadow-md">
                    <img 
                      src="/religare-logo.jpg" 
                      alt="Religare" 
                      className="w-3.5 h-3.5 rounded-full object-cover"
                    />
                    <span>Guiança 100% Feminina</span>
                  </div>

                  {/* Bottom showcase pill inside image */}
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 backdrop-blur-md bg-[#111713]/90 border border-[#2B3B2F] p-3 sm:p-4 rounded-xl">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] sm:text-xs font-cinzel text-[#DFB168] uppercase tracking-wider font-semibold">
                        Destaque Religare
                      </span>
                      <span className="text-[10px] sm:text-xs bg-[#223125] text-[#D8CFBF] px-2 py-0.5 rounded font-medium">
                        Sopro Imperial
                      </span>
                    </div>
                    <h3 className="font-serif text-xs sm:text-sm font-semibold text-[#F1ECE1] line-clamp-1">
                      Kuripe Sagrado em Madeira Nobre com Kenê
                    </h3>
                    <div className="mt-1.5 sm:mt-2 flex items-center justify-between text-[11px] sm:text-xs">
                      <span className="text-[#A69986]">Encaixe Anatômico</span>
                      <span className="text-[#F1ECE1] font-bold font-mono">R$ 145,00</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative accent orb */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-[#DFB168]/20 blur-2xl pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
