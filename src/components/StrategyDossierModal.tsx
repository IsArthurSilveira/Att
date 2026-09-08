import React, { useState } from 'react';
import { STRATEGY_DOSSIER } from '../data/strategyDossier';
import { X, Palette, Layout, Feather, TrendingUp, Check, Copy, Sparkles, AlertTriangle, ShieldCheck } from 'lucide-react';

interface StrategyDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StrategyDossierModal: React.FC<StrategyDossierModalProps> = ({
  isOpen,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'visual' | 'architecture' | 'copy' | 'conversion'>('visual');
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-2.5 sm:p-6"
    >
      <div 
        className="relative w-full max-w-5xl rounded-2xl sm:rounded-3xl bg-[#121814] border border-[#2B3B2F] shadow-2xl flex flex-col max-h-[92vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-8 border-b border-[#233226] bg-[#162018] flex items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#1F2E22] border border-[#C28C4B]/40 text-[#C28C4B] text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Dossiê do Designer & Estrategista</span>
            </div>
            <h2 className="font-cinzel text-base sm:text-2xl font-bold text-[#F1ECE1] leading-tight">
              Estrutura Estratégica da Loja Ritual
            </h2>
            <p className="text-[11px] sm:text-sm text-[#A69986] line-clamp-1">
              {STRATEGY_DOSSIER.role}
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Fechar dossiê"
            className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-full bg-[#0E1310] text-[#A69986] hover:text-[#F1ECE1] hover:bg-[#233226] border border-[#2B3B2F] transition-colors cursor-pointer flex items-center justify-center"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#233226] bg-[#0E1310] px-3 sm:px-6 overflow-x-auto scrollbar-none touch-pan-x">
          <button
            onClick={() => setActiveTab('visual')}
            className={`py-3 sm:py-4 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer transition-all min-h-[44px] ${
              activeTab === 'visual'
                ? 'border-[#C28C4B] text-[#C28C4B]'
                : 'border-transparent text-[#8C8070] hover:text-[#F1ECE1]'
            }`}
          >
            <Palette className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>1. Conceito Visual & Identidade</span>
          </button>

          <button
            onClick={() => setActiveTab('architecture')}
            className={`py-3 sm:py-4 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer transition-all min-h-[44px] ${
              activeTab === 'architecture'
                ? 'border-[#C28C4B] text-[#C28C4B]'
                : 'border-transparent text-[#8C8070] hover:text-[#F1ECE1]'
            }`}
          >
            <Layout className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>2. Arquitetura Seção por Seção</span>
          </button>

          <button
            onClick={() => setActiveTab('copy')}
            className={`py-3 sm:py-4 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer transition-all min-h-[44px] ${
              activeTab === 'copy'
                ? 'border-[#C28C4B] text-[#C28C4B]'
                : 'border-transparent text-[#8C8070] hover:text-[#F1ECE1]'
            }`}
          >
            <Feather className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>3. Copywriting & Tom de Voz</span>
          </button>

          <button
            onClick={() => setActiveTab('conversion')}
            className={`py-3 sm:py-4 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer transition-all min-h-[44px] ${
              activeTab === 'conversion'
                ? 'border-[#C28C4B] text-[#C28C4B]'
                : 'border-transparent text-[#8C8070] hover:text-[#F1ECE1]'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>4. Estratégia de Conversão</span>
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-8 bg-[#121814]">
          
          {/* TAB 1: VISUAL CONCEPT & IDENTITY */}
          {activeTab === 'visual' && (
            <div className="space-y-8">
              
              {/* Premise */}
              <div className="p-5 rounded-2xl bg-[#18231B] border border-[#2B3B2F] space-y-2">
                <h3 className="font-cinzel text-base font-bold text-[#C28C4B]">
                  Premissa Estética: O Santuário Silencioso
                </h3>
                <p className="text-xs sm:text-sm text-[#D8CFBF] leading-relaxed">
                  {STRATEGY_DOSSIER.premise}
                </p>
              </div>

              {/* Color Palette Matrix */}
              <div className="space-y-4">
                <h3 className="font-cinzel text-base sm:text-lg font-bold text-[#F1ECE1] flex items-center gap-2">
                  <Palette className="w-4 h-4 text-[#C28C4B]" />
                  <span>Paleta Cromática & Racional de Conversão</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {STRATEGY_DOSSIER.palette.map((color, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-[#162018] border border-[#233226] flex flex-col justify-between space-y-3"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-lg border border-white/10 shadow-inner shrink-0"
                          style={{ backgroundColor: color.hex }}
                        />
                        <div>
                          <h4 className="font-serif text-sm font-bold text-[#F1ECE1]">
                            {color.name}
                          </h4>
                          <span className="text-xs font-mono text-[#A69986]">
                            {color.hex}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1 text-xs">
                        <p className="text-[#C28C4B] font-semibold">{color.role}</p>
                        <p className="text-[#8C8070]">{color.description}</p>
                        <p className="text-[11px] text-[#A69986] pt-1 border-t border-[#233226]">
                          <strong>Contraste & UX:</strong> {color.contrastRationale}
                        </p>
                      </div>

                      <button
                        onClick={() => handleCopyHex(color.hex)}
                        className="w-full py-1.5 rounded-lg bg-[#0E1310] hover:bg-[#202C22] text-[11px] font-mono text-[#D8CFBF] flex items-center justify-center gap-1.5 border border-[#2B3B2F] cursor-pointer"
                      >
                        {copiedHex === color.hex ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span>Copiado!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copiar HEX</span>
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Typography System */}
              <div className="space-y-4">
                <h3 className="font-cinzel text-base sm:text-lg font-bold text-[#F1ECE1] flex items-center gap-2">
                  <Feather className="w-4 h-4 text-[#C28C4B]" />
                  <span>Tipografia Recomendada: Solenidade e Fluidez</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {STRATEGY_DOSSIER.typography.map((typo, i) => (
                    <div
                      key={i}
                      className="p-5 rounded-xl bg-[#162018] border border-[#233226] space-y-2"
                    >
                      <span className="text-xs font-mono text-[#C28C4B] uppercase tracking-wider font-semibold">
                        {typo.usage}
                      </span>
                      <h4 className="font-cinzel text-lg font-bold text-[#F1ECE1]">
                        {typo.family}
                      </h4>
                      <p className="text-xs text-[#A69986]">
                        <strong>Pesos:</strong> {typo.weight}
                      </p>
                      <p className="text-xs text-[#D3C7B2] leading-relaxed pt-2 border-t border-[#233226]">
                        {typo.rationale}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Aesthetic Pillars */}
              <div className="space-y-4">
                <h3 className="font-cinzel text-base sm:text-lg font-bold text-[#F1ECE1]">
                  Atmosfera: Minimalismo Xamânico
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {STRATEGY_DOSSIER.aestheticAtmosphere.pillars.map((pillar, i) => (
                    <div key={i} className="p-4 rounded-xl bg-[#141B16] border border-[#233226] space-y-1">
                      <h4 className="font-cinzel text-xs font-bold text-[#C28C4B]">
                        {pillar.title}
                      </h4>
                      <p className="text-xs text-[#A69986] leading-relaxed">
                        {pillar.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: SECTION-BY-SECTION UX ARCHITECTURE */}
          {activeTab === 'architecture' && (
            <div className="space-y-6">
              <p className="text-xs sm:text-sm text-[#A69986]">
                Análise detalhada de cada bloco da landing page, revelando como a psicologia do buscador é conduzida da curiosidade à oração e à compra consciente:
              </p>

              <div className="space-y-5">
                {STRATEGY_DOSSIER.architecture.map((sec, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-[#162018] border border-[#233226] space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#233226] pb-3">
                      <h3 className="font-cinzel text-base font-bold text-[#F1ECE1]">
                        {sec.section}
                      </h3>
                      <span className="text-[11px] px-2.5 py-1 rounded-full bg-[#1F2E22] text-[#C28C4B] font-mono border border-[#C28C4B]/30 self-start sm:self-auto">
                        Objetivo Estratégico
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#D3C7B2]">
                      <strong>Objetivo de UX:</strong> {sec.objective}
                    </p>

                    <div className="p-4 rounded-xl bg-[#0E1310] border border-[#233226] space-y-2">
                      <span className="text-[10px] font-mono text-[#C28C4B] uppercase tracking-wider font-bold">
                        Exemplo Real de Copy Sugerida:
                      </span>
                      {sec.suggestedCopy.tagline && (
                        <p className="text-[11px] text-[#A69986] uppercase tracking-widest font-semibold">
                          {sec.suggestedCopy.tagline}
                        </p>
                      )}
                      <p className="font-cinzel text-sm sm:text-base font-bold text-[#F1ECE1]">
                        "{sec.suggestedCopy.headline}"
                      </p>
                      <p className="text-xs text-[#A69986] leading-relaxed">
                        {sec.suggestedCopy.subheadline}
                      </p>
                      {sec.suggestedCopy.ctaLabel && (
                        <div className="pt-2">
                          <span className="inline-block px-3 py-1 rounded bg-[#C28C4B] text-[#0E1310] font-bold text-[11px]">
                            CTA: {sec.suggestedCopy.ctaLabel}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="text-xs text-[#A69986] flex items-start gap-2 bg-[#1B261E]/50 p-3 rounded-lg">
                      <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>
                        <strong>Mecanismo de Conversão:</strong> {sec.conversionMechanism}
                      </span>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: COPYWRITING PLAYBOOK & TONE OF VOICE */}
          {activeTab === 'copy' && (
            <div className="space-y-8">
              
              {/* Tone Persona */}
              <div className="p-6 rounded-2xl bg-[#18231B] border border-[#2B3B2F] space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-[#C28C4B]">
                  <Feather className="w-4 h-4" />
                  <span>{STRATEGY_DOSSIER.copywritingDirectives.toneTitle}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {STRATEGY_DOSSIER.copywritingDirectives.attributes.map((attr, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-[#121814] border border-[#233226] space-y-1">
                      <h4 className="font-cinzel text-xs font-bold text-[#F1ECE1]">
                        {attr.attribute}
                      </h4>
                      <p className="text-xs text-[#A69986]">
                        {attr.meaning}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Anti-Cliches: Avoid vs Prefer Matrix */}
              <div className="space-y-4">
                <h3 className="font-cinzel text-base sm:text-lg font-bold text-[#F1ECE1] flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span>Matriz Anti-Clichê: Banir o Sensacionalismo vs. Afirmar a Verdade</span>
                </h3>

                <div className="space-y-4">
                  {STRATEGY_DOSSIER.copywritingDirectives.antiClicheList.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-[#162018] border border-[#233226] space-y-3"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3.5 rounded-xl bg-red-950/30 border border-red-900/40 text-xs space-y-1">
                          <span className="text-red-400 font-bold uppercase tracking-wider text-[10px] block">
                            ✕ O que JAMAIS escrever:
                          </span>
                          <p className="text-red-200 line-through">
                            {item.avoid}
                          </p>
                        </div>

                        <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-900/40 text-xs space-y-1">
                          <span className="text-emerald-400 font-bold uppercase tracking-wider text-[10px] block">
                            ✓ Como escrever com firmeza sagrada:
                          </span>
                          <p className="text-emerald-100 font-medium">
                            {item.prefer}
                          </p>
                        </div>
                      </div>

                      <p className="text-[11px] text-[#A69986] italic pl-2 border-l-2 border-[#C28C4B]">
                        <strong>Por quê:</strong> {item.why}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: CONVERSION STRATEGY IN SPIRITUAL NICHES */}
          {activeTab === 'conversion' && (
            <div className="space-y-6">
              
              <div className="p-5 rounded-2xl bg-[#18231B] border border-[#2B3B2F] space-y-2">
                <h3 className="font-cinzel text-base font-bold text-[#C28C4B]">
                  Por que gatilhos mentais agressivos destroem lojas espirituais?
                </h3>
                <p className="text-xs sm:text-sm text-[#D3C7B2] leading-relaxed">
                  Em nichos holísticos, os buscadores possuem um "detector de hipocrisia" extremamente aguçado. Se um site usa cronômetros falsos piscando em vermelho ou banners gritantes de "Últimas 2 vagas", ele ativa repulsa imediata. A conversão no sagrado é impulsionada pela <strong>reverência, transparência de origem e utilidade ritual real</strong>.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {STRATEGY_DOSSIER.conversionPlaybook.map((play, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl bg-[#162018] border border-[#233226] space-y-2"
                  >
                    <h4 className="font-cinzel text-sm font-bold text-[#F1ECE1]">
                      {play.title}
                    </h4>
                    <p className="text-xs text-[#A69986] leading-relaxed">
                      {play.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Conversion Checklist */}
              <div className="p-6 rounded-2xl bg-[#0E1310] border border-[#C28C4B]/30 space-y-3">
                <h4 className="font-cinzel text-sm font-bold text-[#C28C4B] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Checklist de Lançamento de Alta Conversão</span>
                </h4>
                <ul className="space-y-2 text-xs text-[#D8CFBF]">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Nome da aldeia e do artesão visíveis em cada card de produto</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Botão de canal de suporte fraterno pelo WhatsApp no checkout</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Guia passo a passo de consagração de altar para reduzir o medo de uso</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Depoimentos reais com identificação de item consagrado e cidade</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Kit de Iniciação completo como âncora de ticket médio alto</span>
                  </li>
                </ul>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 border-t border-[#233226] bg-[#162018] flex items-center justify-between">
          <span className="text-xs text-[#A69986]">
            Estrutura 100% responsiva e pronta para ativação comercial.
          </span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#C28C4B] hover:bg-[#D49E5D] text-[#0E1310] font-bold text-xs cursor-pointer shadow"
          >
            Fechar Dossiê e Navegar na Loja
          </button>
        </div>

      </div>
    </div>
  );
};
