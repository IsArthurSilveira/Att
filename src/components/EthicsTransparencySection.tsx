import React, { useState } from 'react';
import { Moon, ShieldCheck, HeartHandshake, Sparkles, ChevronDown, ChevronUp, Leaf, Flame } from 'lucide-react';

export const EthicsTransparencySection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const steps = [
    {
      step: '01',
      icon: Moon,
      title: 'Coleta em Harmonia Lunar',
      description: 'As ervas, cascas medicinais e madeiras não são retiradas em escala industrial. A colheita respeita as luas certas de seiva e a permissão espiritual pedida aos guardiões da mata.'
    },
    {
      step: '02',
      icon: HeartHandshake,
      title: 'Feitio Tradicional nas Aldeias',
      description: 'Cada kuripe, maracá e rapé é feito pelas mãos dos povos Huni Kuin, Yawanawá e ribeirinhos. Remuneração digna, direta e sem atravessadores comerciais.'
    },
    {
      step: '03',
      icon: Flame,
      title: 'Consagração no Fogo Cerimonial',
      description: 'Ao chegarem à nossa Casa de Ayahuasca, os instrumentos passam por uma noite de fogueira, recebendo defumação pura de Breu Branco e rezo de firmeza e purificação.'
    },
    {
      step: '04',
      icon: Leaf,
      title: 'Embalagem Ecológica & Rezo',
      description: 'Zero plástico de bolha. Embalamos em caixas de papel kraft reciclado com folhas aromáticas protetoras e um cartão com a intenção e oração de uso da peça.'
    }
  ];

  const faqs = [
    {
      question: 'Como a Casa assegura a autenticidade e pureza dos rapés?',
      answer: 'Nossos rapés vêm exclusivamente de mestres de feitio conhecidos de nossas caminhadas e cerimônias no Acre. Não utilizamos cinzas industriais nem tabaco com aditivos químicos. O tabaco é do tipo Moi e as cinzas são de madeiras nativas como Tsunu, Cumaru e Murici, preparadas em fogo sagrado.'
    },
    {
      question: 'De onde vêm as penas utilizadas nos maracás e vestimentas?',
      answer: 'Temos política rigorosa de respeito total à fauna. Nenhuma ave é caçada ou ferida. Todas as penas utilizadas em nossos artesanatos são colhidas de mudas naturais caídas no chão da floresta ou criadouros comunitários tradicionais.'
    },
    {
      question: 'O envio de rapé e itens de fumaça é legal no Brasil?',
      answer: 'Sim. O rapé de tabaco e cinzas tradicionais é uma medicina de uso cultural e ritual reconhecida e resguardada pelos costumes ancestrais dos povos originários e pela Constituição Brasileira. Não comercializamos qualquer substância proscrita pela Anvisa.'
    },
    {
      question: 'Posso pedir aconselhamento sobre qual medicina escolher?',
      answer: 'Sim, com todo amor e fraternidade. Nossa equipe de apoio espiritual da Casa está disponível pelo canal direto do WhatsApp para escutar o seu momento e recomendar o instrumento com o aterramento mais adequado.'
    }
  ];

  return (
    <section id="etica" className="py-14 sm:py-20 md:py-28 bg-[#111713] border-y border-[#233226] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18231B] border border-[#C28C4B]/40 text-[#C28C4B] text-[11px] sm:text-xs font-semibold tracking-wider uppercase">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Transparência, Ética & O Rezo da Preparação</span>
          </div>

          <h2 className="font-cinzel text-2xl xs:text-3xl sm:text-4xl font-bold text-[#F1ECE1]">
            O caminho sagrado de cada instrumento até o seu lar
          </h2>

          <p className="text-[#A69986] text-xs sm:text-sm md:text-base leading-relaxed font-sans-clean">
            Para nós, o preparo de um kuripe ou a moagem de um rapé não é uma linha de produção: é um ato litúrgico. Honramos a vida das árvores, o tempo das pessoas e a sacralidade do altar.
          </p>
        </div>

        {/* 4 Process Pillars Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-20">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#141B16] border border-[#233226] hover:border-[#C28C4B]/40 transition-all flex flex-col justify-between space-y-3 sm:space-y-4"
              >
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 sm:p-3 rounded-xl bg-[#18231B] border border-[#2B3B2F] text-[#C28C4B]">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span className="font-mono text-xs font-bold text-[#7A7061] tracking-widest">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="font-cinzel text-sm sm:text-base font-bold text-[#F1ECE1]">
                    {item.title}
                  </h3>

                  <p className="text-xs text-[#A69986] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#233226]/60 text-[10px] sm:text-[11px] text-[#C28C4B] font-medium flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  <span>Feito com Rezo & Presença</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQ of Integrity */}
        <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="font-cinzel text-lg xs:text-xl sm:text-2xl font-bold text-[#F1ECE1]">
              Perguntas Frequentes sobre Origem e Consagração
            </h3>
            <p className="text-xs sm:text-sm text-[#A69986] mt-1">
              Dúvidas comuns sobre o respeito às medicinas e à tradição das aldeias.
            </p>
          </div>

          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="rounded-xl bg-[#141B16] border border-[#233226] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 sm:gap-4 cursor-pointer hover:bg-[#18231B]/50 min-h-[48px]"
                >
                  <span className="font-serif text-xs sm:text-sm md:text-base font-semibold text-[#F1ECE1]">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#C28C4B] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#7A7061] shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-xs sm:text-sm text-[#A69986] leading-relaxed border-t border-[#233226]/50 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
