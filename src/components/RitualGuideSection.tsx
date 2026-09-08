import React, { useState } from 'react';
import { Sparkles, Flame, Wind, Feather, Compass, CheckCircle2 } from 'lucide-react';

export const RitualGuideSection: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const guideSteps = [
    {
      num: 'Passo 1',
      title: 'A Intenção Clara no Coração',
      subtitle: 'Antes de tocar qualquer instrumento',
      icon: Compass,
      detail: 'Sente-se em postura confortável e feche os olhos por três minutos. Desligue aparelhos sonoros e notificações. Pergunte a si mesmo: "O que venho buscar nesta oração? Preciso de aterramento, clareza, limpeza emocional ou gratidão?" A intenção é a bússola que orienta a medicina.',
      prayerText: '“Peço licença à força da floresta, aos meus guardiões espirituais e à sabedoria ancestral. Que este momento seja de luz, silêncio e cura.”'
    },
    {
      num: 'Passo 2',
      title: 'O Elemento Ar e a Fumaça Sagrada',
      subtitle: 'Purificação do espaço e do corpo sutil',
      icon: Flame,
      detail: 'Coloque uma pequena lasca de Breu Branco sobre a brasa ou carvão vegetal em seu incensário cerimonial. Conduza a fumaça com as mãos ou com uma pena suave, passando pela sua coroa, peito e pés, e depois ao redor dos cantos da sua sala.',
      prayerText: '“Fumaça sagrada que sobe aos céus, leva embora toda densidade, cansaço e distração. Deixa aqui apenas a paz e a verdade da minha alma.”'
    },
    {
      num: 'Passo 3',
      title: 'O Sopro da Medicina (Autoaplicação)',
      subtitle: 'Alinhamento e centramento',
      icon: Wind,
      detail: 'Coloque a quantidade correspondente a meio grão de arroz em seu kuripe. Inspire pelo nariz, expire pela boca. Encaixe o bocal em sua narina esquerda (passado/receptividade) e sopre com firmeza constante. Repita em seguida na narina direita (presente/ação). Feche os olhos.',
      prayerText: '“Recebo este sopro com humildade e respeito. Que a firmeza da árvore de Tsunu ancore meus pensamentos na terra viva.”'
    },
    {
      num: 'Passo 4',
      title: 'O Silêncio da Integração',
      subtitle: 'O verdadeiro aprendizado no repouso',
      icon: Feather,
      detail: 'Permaneça em silêncio por pelo menos 15 a 20 minutos. Não force pensamentos nem tente resolver problemas imediatos. Apenas acompanhe o ar entrando e saindo pelo abdômen. Tome um copo de água fresca e agradeça ao encerrar.',
      prayerText: '“Agradeço à Grande Floresta, aos mestres das aldeias e à oportunidade deste renascimento interior. Assim é, assim se cumpre.”'
    }
  ];

  return (
    <section id="guia-ritual" className="py-14 sm:py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18231B] border border-[#C28C4B]/40 text-[#C28C4B] text-[11px] sm:text-xs font-semibold tracking-wider uppercase">
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          <span>Guia de Uso Consciente & Altar em Casa</span>
        </div>

        <h2 className="font-cinzel text-2xl xs:text-3xl sm:text-4xl font-bold text-[#F1ECE1]">
          Como consagrar seu espaço com reverência
        </h2>

        <p className="text-[#A69986] text-xs sm:text-sm md:text-base leading-relaxed font-sans-clean">
          Ter um altar em casa não é sobre ostentação religiosa: é sobre criar uma âncora de serenidade e reconexão com a floresta viva em meio aos desafios do dia a dia.
        </p>
      </div>

      {/* Interactive Step Navigator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        
        {/* Left: Step Buttons */}
        <div className="lg:col-span-5 space-y-2.5 sm:space-y-3">
          {guideSteps.map((step, idx) => {
            const Icon = step.icon;
            const isCurrent = currentStep === idx;
            return (
              <button
                key={idx}
                onClick={() => setCurrentStep(idx)}
                className={`w-full text-left p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border transition-all cursor-pointer flex items-start gap-3 sm:gap-4 min-h-[48px] ${
                  isCurrent
                    ? 'bg-[#1A261D] border-[#C28C4B] shadow-lg shadow-[#C28C4B]/10'
                    : 'bg-[#141B16] border-[#233226] hover:border-[#384F3D]'
                }`}
              >
                <div className={`p-2.5 sm:p-3 rounded-xl shrink-0 ${isCurrent ? 'bg-[#C28C4B] text-[#0E1310]' : 'bg-[#1E2B21] text-[#A69986]'}`}>
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <span className="text-[10px] sm:text-[11px] font-mono text-[#C28C4B] uppercase tracking-wider font-semibold">
                    {step.num}
                  </span>
                  <h4 className="font-cinzel text-xs sm:text-sm md:text-base font-bold text-[#F1ECE1]">
                    {step.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-[#A69986] mt-0.5">
                    {step.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Step Detailed Content & Sacred Rezo */}
        <div className="lg:col-span-7">
          <div className="p-4 sm:p-8 rounded-xl sm:rounded-2xl bg-[#141B16] border border-[#2B3B2F] space-y-4 sm:space-y-6 shadow-xl relative overflow-hidden">
            
            {/* Step header */}
            <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-[#233226]">
              <span className="text-xs font-mono font-bold text-[#C28C4B] tracking-wider uppercase">
                {guideSteps[currentStep].num} de 4
              </span>
              <span className="text-xs text-[#A69986] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                Tradição Respeitada
              </span>
            </div>

            {/* Title & Instructions */}
            <div className="space-y-2 sm:space-y-3">
              <h3 className="font-cinzel text-lg xs:text-xl sm:text-2xl font-bold text-[#F1ECE1]">
                {guideSteps[currentStep].title}
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-[#D3C7B2] leading-relaxed">
                {guideSteps[currentStep].detail}
              </p>
            </div>

            {/* Prayer Box */}
            <div className="p-4 sm:p-5 rounded-xl bg-[#0E1310] border border-[#C28C4B]/40 space-y-1.5 sm:space-y-2">
              <span className="text-[10px] sm:text-[11px] font-mono text-[#C28C4B] uppercase tracking-widest font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                Rezo & Oração Recomendada
              </span>
              <p className="font-cormorant italic text-sm sm:text-base md:text-lg text-[#F1ECE1] leading-relaxed">
                {guideSteps[currentStep].prayerText}
              </p>
            </div>

            {/* Navigation buttons between steps */}
            <div className="flex items-center justify-between pt-2 gap-2">
              <button
                disabled={currentStep === 0}
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs font-semibold bg-[#1E2A20] text-[#D8CFBF] hover:text-[#F1ECE1] disabled:opacity-40 disabled:pointer-events-none cursor-pointer min-h-[42px]"
              >
                Passo Anterior
              </button>

              <button
                disabled={currentStep === guideSteps.length - 1}
                onClick={() => setCurrentStep(prev => prev + 1)}
                className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs font-bold bg-[#C28C4B] hover:bg-[#D49E5D] text-[#0E1310] disabled:opacity-40 disabled:pointer-events-none cursor-pointer min-h-[42px]"
              >
                Próximo Passo
              </button>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
};
