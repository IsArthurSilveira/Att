import React from 'react';
import { ArrowRight, Compass, Shield, Flame, Sparkles, Feather } from 'lucide-react';

interface HeroSectionProps {
  onExploreCatalog: () => void;
  onExplorePurpose: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCatalog,
  onExplorePurpose
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-24 md:pt-20 md:pb-32">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] sm:h-[600px] pointer-events-none opacity-40">
        <div className="absolute top-10 left-1/4 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-[#23432B] blur-[100px] sm:blur-[120px]" />
        <div className="absolute top-20 right-1/4 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-[#8C5A3E]/30 blur-[110px] sm:blur-[130px]" />
        <div className="absolute top-36 left-1/2 -translate-x-1/2 w-64 sm:w-80 h-64 sm:h-80 rounded-full bg-[#C28C4B]/20 blur-[90px] sm:blur-[100px]" />
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Text & Intent Architecture */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-7 text-center lg:text-left">
            {/* Sacred Tagline */}
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#18231B] border border-[#C28C4B]/40 text-[#D9CDBB] text-[11px] sm:text-xs font-medium tracking-wider uppercase">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C28C4B]" />
              <span>Espaço Ritual da Casa de Ayahuasca</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-cinzel text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold text-[#F1ECE1] tracking-tight leading-[1.2] sm:leading-[1.15]">
              A sacralidade da floresta no <span className="text-[#C28C4B] italic font-cormorant font-normal">silêncio</span> do seu altar.
            </h1>

            {/* Subtitle with deep conversion copy */}
            <p className="text-sm sm:text-base md:text-lg text-[#C7BCAB] font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0 font-sans-clean">
              Instrumentos de oração, rapés tradicionais colhidos em fases lunares e artesanatos originários consagrados no fogo da nossa Casa. Uma ponte viva entre a sabedoria ancestral das aldeias e o fortalecimento da sua busca espiritual diária.
            </p>

            {/* Dual CTAs (High Intent & Ethical Consideration) */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <button
                id="hero-primary-cta"
                onClick={onExploreCatalog}
                className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-[#C28C4B] hover:bg-[#D49E5D] text-[#0E1310] font-bold text-xs sm:text-sm tracking-wide transition-all shadow-lg hover:shadow-[0_0_24px_rgba(194,140,75,0.4)] flex items-center justify-center gap-2.5 cursor-pointer group min-h-[48px]"
              >
                <span>Explorar Instrumentos Sagrados</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-secondary-cta"
                onClick={onExplorePurpose}
                className="w-full sm:w-auto px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl bg-[#172019] hover:bg-[#202D23] text-[#E0D7C6] border border-[#2F4233] hover:border-[#C28C4B]/60 font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[48px]"
              >
                <Compass className="w-4 h-4 text-[#C28C4B]" />
                <span>Nossa Origem & Aliança Indígena</span>
              </button>
            </div>

            {/* Trust Micro-Badges */}
            <div className="pt-4 sm:pt-6 border-t border-[#233226] grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-left">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-[#141B15]/60 border border-[#233226]/50">
                <Feather className="w-4 h-4 text-[#C28C4B] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-[#F1ECE1]">Comércio Ético & Direto</h4>
                  <p className="text-[11px] text-[#A69986] leading-tight mt-0.5">Famílias Huni Kuin e Yawanawá remuneradas com justiça.</p>
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
                <Shield className="w-4 h-4 text-[#C28C4B] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-semibold text-[#F1ECE1]">Embalagem Sagrada</h4>
                  <p className="text-[11px] text-[#A69986] leading-tight mt-0.5">Sem plástico, com ervas aromáticas e rezo de cuidado.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Sanctuary & Product Hero Card */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
              {/* Outer decorative border */}
              <div className="relative rounded-2xl p-2 bg-gradient-to-b from-[#283C2D] via-[#1A261D] to-[#121914] shadow-2xl border border-[#C28C4B]/30">
                <div className="relative rounded-xl overflow-hidden aspect-[4/3] xs:aspect-[1/1] sm:aspect-[4/5] bg-[#0E1310]">
                  <img
                    src="https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=1000&q=85"
                    alt="Kuripe sagrado entalhado à mão em madeira nobre com grafismos kenê"
                    className="w-full h-full object-cover object-center filter brightness-90 hover:scale-105 transition-transform duration-700"
                  />

                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E1310] via-transparent to-black/30" />

                  {/* Floating sacred seal */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 backdrop-blur-md bg-[#0E1310]/80 border border-[#C28C4B]/40 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs text-[#E6DCB8] flex items-center gap-1.5 shadow-md">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Feitio Ancestral do Acre</span>
                  </div>

                  {/* Bottom showcase pill inside image */}
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 backdrop-blur-md bg-[#111713]/90 border border-[#2B3B2F] p-3 sm:p-4 rounded-xl">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] sm:text-xs font-cinzel text-[#C28C4B] uppercase tracking-wider font-semibold">
                        Destaque Cerimonial
                      </span>
                      <span className="text-[10px] sm:text-xs bg-[#223125] text-[#D8CFBF] px-2 py-0.5 rounded font-medium">
                        Edição Lunar
                      </span>
                    </div>
                    <h3 className="font-serif text-xs sm:text-sm font-semibold text-[#F1ECE1] line-clamp-1">
                      Kuripe em Madeira Nativa com Kenê de Proteção
                    </h3>
                    <div className="mt-1.5 sm:mt-2 flex items-center justify-between text-[11px] sm:text-xs">
                      <span className="text-[#A69986]">Mestre Tashka Yawa</span>
                      <span className="text-[#F1ECE1] font-bold font-mono">R$ 145,00</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative accent orb */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-[#C28C4B]/15 blur-2xl pointer-events-none" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
