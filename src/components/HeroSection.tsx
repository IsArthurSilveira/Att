import React from 'react';
import { ArrowRight, Feather, Flame, Heart } from 'lucide-react';

interface HeroSectionProps {
  onExploreCatalog: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCatalog
}) => {
  return (
    <section className="relative overflow-hidden pt-6 pb-4 sm:pt-8 sm:pb-6 md:pt-10 md:pb-6">
      {/* Background ambient lighting with noble forest and warm golden tones (No muddy/salmon reds) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] pointer-events-none opacity-30">
        <div className="absolute top-10 left-1/4 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-[#183923] blur-[110px]" />
        <div className="absolute top-20 right-1/4 w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-[#1A3324] blur-[120px]" />
        <div className="absolute top-28 left-1/2 -translate-x-1/2 w-72 sm:w-80 h-72 sm:h-80 rounded-full bg-[#DFB168]/15 blur-[95px]" />
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

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-4 sm:space-y-6">

          {/* Main Headline */}
          <h1 className="font-cinzel text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-bold text-[#F1ECE1] tracking-tight leading-[1.2] sm:leading-[1.15]">
            A sacralidade da floresta e a <span className="text-[#EBCB85] italic font-cormorant font-normal drop-shadow-[0_2px_12px_rgba(223,177,104,0.3)]">reconexão</span> guiadas pela força feminina.
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-[#C7BCAB] font-normal leading-relaxed max-w-2xl mx-auto font-sans-clean">
            Pioneira em Recife como a primeira casa cerimonial dirigida por mulheres. Unimos acolhimento humanizado, respeito, escuta e amor à força dos instrumentos sagrados (Sopro Imperial), rapés tradicionais, sananga viva e velas rituais da Lumiar.
          </p>

          {/* Direct e-commerce CTA with radiant golden button (Matching the sacred gold palette) */}
          <div className="pt-1 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              id="hero-primary-cta"
              onClick={onExploreCatalog}
              className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-[#DFB168] via-[#F3D698] to-[#DFB168] hover:brightness-110 text-[#0D140F] font-bold text-xs sm:text-sm tracking-wide transition-all shadow-[0_0_28px_rgba(223,177,104,0.4)] hover:shadow-[0_0_36px_rgba(223,177,104,0.6)] border border-[#F6E1B3]/60 flex items-center justify-center gap-2.5 cursor-pointer group min-h-[48px]"
            >
              <span>Ver Catálogo Religare</span>
              <ArrowRight className="w-4 h-4 text-[#0D140F] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Trust Micro-Badges: Unified harmonic emerald & gold borders */}
          <div className="pt-4 sm:pt-6 border-t border-[#233226] grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-left">
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#121A14]/90 border border-[#233226] hover:border-[#DFB168]/40 transition-colors shadow-sm">
              <Heart className="w-4 h-4 text-[#DFB168] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-semibold text-[#F1ECE1]">Direção Feminina</h4>
                <p className="text-[11px] text-[#A69986] leading-tight mt-0.5">Primeira casa cerimonial de Recife dirigida por mulheres.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#121A14]/90 border border-[#233226] hover:border-[#DFB168]/40 transition-colors shadow-sm">
              <Flame className="w-4 h-4 text-[#DFB168] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-semibold text-[#F1ECE1]">Consagração no Fogo</h4>
                <p className="text-[11px] text-[#A69986] leading-tight mt-0.5">Defumados com breu, rosas e benzidos com amor.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#121A14]/90 border border-[#233226] hover:border-[#DFB168]/40 transition-colors shadow-sm">
              <Feather className="w-4 h-4 text-[#DFB168] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-semibold text-[#F1ECE1]">Comércio Ético & Direto</h4>
                <p className="text-[11px] text-[#A69986] leading-tight mt-0.5">Parcerias justas com povos originários e artesãs parceiras.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
