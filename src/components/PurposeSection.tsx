import React, { useState } from 'react';
import { Heart, Globe2, Sun, Sparkles, CheckCircle2 } from 'lucide-react';

export const PurposeSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'alianca' | 'consagracao' | 'integracao'>('alianca');

  return (
    <section id="proposito" className="py-14 sm:py-20 md:py-28 bg-[#111713] border-y border-[#1D2A20] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 sm:space-y-4 mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A251C] border border-[#C28C4B]/30 text-[#C28C4B] text-[11px] sm:text-xs font-semibold tracking-wider uppercase">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>A Filosofia da Nossa Casa</span>
          </div>
          
          <h2 className="font-cinzel text-2xl xs:text-3xl sm:text-4xl font-bold text-[#F1ECE1]">
            Não vendemos apenas objetos. Sustentamos uma memória viva.
          </h2>

          <p className="text-[#BDB19F] text-sm sm:text-base md:text-lg leading-relaxed font-sans-clean">
            Nascido no seio dos rituais da nossa Casa de Ayahuasca, este armazém não segue a lógica da pressa ou do consumo desenfreado. Cada medicina e artesanato é fruto de uma aliança de honra e respeito com os povos da floresta.
          </p>
        </div>

        {/* Narrative Interactive Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Interactive Tab Buttons & Explanations */}
          <div className="lg:col-span-6 space-y-3 sm:space-y-4">
            
            {/* Tab 1 */}
            <div
              onClick={() => setActiveTab('alianca')}
              className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl border transition-all cursor-pointer ${
                activeTab === 'alianca'
                  ? 'bg-[#18231B] border-[#C28C4B] shadow-lg shadow-[#C28C4B]/5'
                  : 'bg-[#131A14]/70 border-[#223124] hover:border-[#384F3B]'
              }`}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className={`p-2.5 sm:p-3 rounded-xl shrink-0 ${activeTab === 'alianca' ? 'bg-[#C28C4B] text-[#0E1310]' : 'bg-[#1D291F] text-[#C28C4B]'}`}>
                  <Globe2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                  <h3 className="font-cinzel text-base sm:text-lg font-bold text-[#F1ECE1]">
                    Aliança Direta com Povos Originários
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A69986] leading-relaxed">
                    Trabalhamos diretamente com famílias artesãs e mestres de feitio Huni Kuin e Yawanawá no Acre. Eliminamos intermediários comerciais para que o valor justo chegue integralmente às comunidades, promovendo autonomia econômica e preservação cultural.
                  </p>
                  {activeTab === 'alianca' && (
                    <div className="pt-1.5 flex items-center gap-2 text-xs text-[#C28C4B] font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                      <span>Transparência financeira e respeito às lideranças tradicionais</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tab 2 */}
            <div
              onClick={() => setActiveTab('consagracao')}
              className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl border transition-all cursor-pointer ${
                activeTab === 'consagracao'
                  ? 'bg-[#18231B] border-[#C28C4B] shadow-lg shadow-[#C28C4B]/5'
                  : 'bg-[#131A14]/70 border-[#223124] hover:border-[#384F3B]'
              }`}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className={`p-2.5 sm:p-3 rounded-xl shrink-0 ${activeTab === 'consagracao' ? 'bg-[#C28C4B] text-[#0E1310]' : 'bg-[#1D291F] text-[#C28C4B]'}`}>
                  <Sun className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                  <h3 className="font-cinzel text-base sm:text-lg font-bold text-[#F1ECE1]">
                    Feitio com Rezo e Tempo Natural
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A69986] leading-relaxed">
                    As madeiras são recolhidas sem desmatamento, as resinas colhidas no tempo de sangria da árvore e os rapés preparados nas luas adequadas. Antes de seguirem para os lares, todos os itens passam pela defumação e oração da nossa Casa.
                  </p>
                  {activeTab === 'consagracao' && (
                    <div className="pt-1.5 flex items-center gap-2 text-xs text-[#C28C4B] font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                      <span>Consagrados com Breu Branco e cantos tradicionais</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tab 3 */}
            <div
              onClick={() => setActiveTab('integracao')}
              className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl border transition-all cursor-pointer ${
                activeTab === 'integracao'
                  ? 'bg-[#18231B] border-[#C28C4B] shadow-lg shadow-[#C28C4B]/5'
                  : 'bg-[#131A14]/70 border-[#223124] hover:border-[#384F3B]'
              }`}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className={`p-2.5 sm:p-3 rounded-xl shrink-0 ${activeTab === 'integracao' ? 'bg-[#C28C4B] text-[#0E1310]' : 'bg-[#1D291F] text-[#C28C4B]'}`}>
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                  <h3 className="font-cinzel text-base sm:text-lg font-bold text-[#F1ECE1]">
                    A Integração do Sagrado no Cotidiano
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A69986] leading-relaxed">
                    A verdadeira medicina se revela nos dias seguintes ao ritual. Nossos instrumentos servem para ancorar a presença, a respiração e a prece no cotidiano caótico das cidades, mantendo o coração conectado à floresta viva.
                  </p>
                  {activeTab === 'integracao' && (
                    <div className="pt-1.5 flex items-center gap-2 text-xs text-[#C28C4B] font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                      <span>Guia de uso responsável fornecido com cada peça</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>

          {/* Right: Authentic Sourcing Photo with Sacred Quote */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-[#2B3B2F] bg-[#141B16] shadow-xl">
              <div className="aspect-[4/3] xs:aspect-[1/1] sm:aspect-[16/11] relative">
                <img
                  src="https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=900&q=80"
                  alt="Floresta nativa com raios de sol penetrando a copa das árvores sagradas"
                  className="w-full h-full object-cover filter brightness-[0.85]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1310] via-[#0E1310]/40 to-transparent" />

                {/* Overlaid Quote from the Elders */}
                <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 right-3 sm:right-6 p-3.5 sm:p-5 rounded-xl bg-[#0E1310]/90 backdrop-blur-md border border-[#C28C4B]/30 space-y-1.5 sm:space-y-2">
                  <p className="font-cormorant italic text-sm sm:text-lg md:text-xl text-[#F1ECE1] leading-relaxed">
                    “A planta só cura se for tratada com amor e respeito. O kuripe só sopra se houver verdade na intenção de quem o fez e de quem o recebe.”
                  </p>
                  <div className="flex items-center justify-between text-[11px] sm:text-xs text-[#C28C4B] pt-1.5 sm:pt-2 border-t border-[#233226]">
                    <span className="font-semibold">Txai Kaxinawá</span>
                    <span className="text-[#A69986] truncate ml-2">Mestre de Feitio</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
