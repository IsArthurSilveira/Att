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
      {/* Background ambient lighting with warm rose, honey amber, and soft emerald glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[480px] pointer-events-none opacity-40">
        <div className="absolute top-8 left-1/4 w-80 sm:w-[420px] h-80 sm:h-[420px] rounded-full bg-[#E07563]/22 blur-[100px] sm:blur-[130px]" />
        <div className="absolute top-16 right-1/4 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-[#DFB168]/22 blur-[110px] sm:blur-[130px]" />
        <div className="absolute top-36 left-1/2 -translate-x-1/2 w-64 sm:w-80 h-64 sm:h-80 rounded-full bg-[#2E6343]/18 blur-[90px] sm:blur-[110px]" />
      </div>

      {/* Subtle sacred Kenê & flower mandala watermarks in SVG */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] flex items-center justify-center">
        <svg viewBox="0 0 1000 1000" className="w-[900px] h-[900px] stroke-[#F5AEA1] fill-none stroke-[1.5]">
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

          {/* Main Headline with luminous feminine rose-gold gradient accent */}
          <h1 className="font-cinzel text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-bold text-[#FAF4EB] tracking-tight leading-[1.2] sm:leading-[1.15]">
            A sacralidade da floresta e a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5AEA1] via-[#E8BD77] to-[#F7C2B4] italic font-cormorant font-normal">
              reconexão
            </span>{' '}
            guiadas pela força feminina.
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-[#D8CCC1] font-normal leading-relaxed max-w-2xl mx-auto font-sans-clean">
            Pioneira no país como a primeira casa cerimonial com liderança 100% feminina. Unimos acolhimento humanizado, respeito, escuta e amor à força dos instrumentos sagrados (Sopro Imperial), rapés tradicionais, sananga viva e velas rituais da Lumiar.
          </p>

          {/* Direct e-commerce CTA */}
          <div className="pt-1 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              id="hero-primary-cta"
              onClick={onExploreCatalog}
              className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-[#D96B58] via-[#E07A65] to-[#DFB168] hover:from-[#E57662] hover:to-[#E8BD77] text-[#140D10] font-bold text-xs sm:text-sm tracking-wide transition-all shadow-[0_4px_24px_rgba(217,107,88,0.35)] hover:shadow-[0_6px_30px_rgba(217,107,88,0.5)] flex items-center justify-center gap-2.5 cursor-pointer group min-h-[48px]"
            >
              <span>Ver Catálogo Religare</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Trust Micro-Badges */}
          <div className="pt-4 sm:pt-6 border-t border-[#2C1D24] grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-left">
            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#20151A]/85 border border-[#E07563]/40 shadow-sm">
              <Heart className="w-4 h-4 text-[#F2A494] shrink-0 mt-0.5 fill-[#E07563]/30" />
              <div>
                <h4 className="text-xs font-semibold text-[#FAF4EB]">Direção 100% Feminina</h4>
                <p className="text-[11px] text-[#C2B4A8] leading-tight mt-0.5">Primeira casa cerimonial do Brasil com liderança exclusivamente feminina.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#1B1418]/70 border border-[#33212A]/60">
              <Flame className="w-4 h-4 text-[#E07563] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-semibold text-[#FAF4EB]">Consagração no Fogo</h4>
                <p className="text-[11px] text-[#C2B4A8] leading-tight mt-0.5">Defumados com resina de breu, rosas e benzidos com amor.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#1B1418]/70 border border-[#33212A]/60">
              <Feather className="w-4 h-4 text-[#DFB168] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-semibold text-[#FAF4EB]">Comércio Ético & Direto</h4>
                <p className="text-[11px] text-[#C2B4A8] leading-tight mt-0.5">Parcerias justas com povos originários e artesãs parceiras.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
