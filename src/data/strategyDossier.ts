export interface ColorPaletteItem {
  name: string;
  hex: string;
  role: string;
  description: string;
  contrastRationale: string;
}

export interface TypoItem {
  family: string;
  usage: string;
  weight: string;
  rationale: string;
}

export interface SectionArchitectureItem {
  section: string;
  objective: string;
  wireframeElement: string;
  suggestedCopy: {
    tagline?: string;
    headline: string;
    subheadline: string;
    ctaLabel?: string;
    visualAsset: string;
  };
  conversionMechanism: string;
}

export const STRATEGY_DOSSIER = {
  title: 'Dossiê Estratégico de Design & Conversão: Loja Ritualística da Casa de Ayahuasca',
  role: 'Diretor de Criação & Estrategista de Conversão no Nicho Sagrado e Holístico',
  premise: 'A venda de medicinas e artesanatos sagrados exige uma alquimia precisa entre respeito ancestral, seriedade ritual e eficácia comercial. O público espiritualizado possui alta sensibilidade para detectar oportunismo ou estética kitsch. Portanto, o design deve operar como um santuário silencioso e acolhedor, onde a conversão é percebida como um ato de apoio à floresta e compromisso com o próprio caminho.',

  palette: [
    {
      name: 'Verde Floresta Noturna',
      hex: '#0E1310',
      role: 'Fundo Primário (Deep Forest Canvas)',
      description: 'Preto enriquecido com matizes de musgo profundo. Cria o ambiente de aconchego de uma maloca à meia-luz.',
      contrastRationale: 'Oferece contraste de 12.8:1 com o texto marfim, descansando a visão do buscador e evocando mistério sem peso gótico.'
    },
    {
      name: 'Verde Musgo Sagrado',
      hex: '#233226',
      role: 'Superfícies de Cartões e Painéis',
      description: 'Tom vegetal denso que delimita cartões e blocos sem criar linhas duras artificiais.',
      contrastRationale: 'Proporciona profundidade suave (Z-axis elevation natural de 4% a 8% em relação ao fundo).'
    },
    {
      name: 'Dourado Âmbar Envelhecido',
      hex: '#C28C4B',
      role: 'Acentos, Botões de Ação e Símbolos Sagrados',
      description: 'Inspirado na luz da fogueira ritual e no reflexo do mel de abelhas nativas tiúba.',
      contrastRationale: 'Garante o ponto de maior atenção óptica (CTA focal) mantendo nobreza sóbria sem parecer amarelo comercial estridente.'
    },
    {
      name: 'Argila & Terracota Suave',
      hex: '#8C5A3E',
      role: 'Tons de Apoio, Selos de Origem e Tags',
      description: 'Evoca a terra molhada, o barro queimado das panelas cerimoniais e a firmeza dos solos amazônicos.',
      contrastRationale: 'Conecta emocionalmente com a matéria-prima dos kuripes e incensários tradicionais.'
    },
    {
      name: 'Marfim & Linho Cru',
      hex: '#F1ECE1',
      role: 'Tipografia Principal e Elementos de Alta Legibilidade',
      description: 'Branco aquecido orgânico que simula algodão cru e papel artesanal prensado.',
      contrastRationale: 'Passa nas diretrizes WCAG AAA de contraste sobre verde florestal, eliminando o cansaço ocular gerado pelo branco puro #FFFFFF.'
    }
  ] as ColorPaletteItem[],

  typography: [
    {
      family: 'Cinzel & Cormorant Garamond (Display & Títulos)',
      usage: 'Headlines, Títulos de Seção, Nomes de Medicinas e Frases de Rezo',
      weight: 'Medium / SemiBold (500, 600)',
      rationale: 'Herança clássica e arquetípica. O desenho serifado e as proporções epigráficas transmitem solenidade, respeito hierárquico e eternidade, afastando a sensação de "produto da moda".'
    },
    {
      family: 'Plus Jakarta Sans (Corpo & Textos Funcionais)',
      usage: 'Parágrafos descritivos, especificações dos itens, carrinho e microcopy de checkout',
      weight: 'Regular (400) e Medium (500)',
      rationale: 'Sans-serif moderna com geometria humanista e abertura ótica generosa. Assegura leitura rápida e sem atritos mesmo em telas menores de celulares.'
    }
  ] as TypoItem[],

  aestheticAtmosphere: {
    concept: 'Minimalismo Xamânico & Iluminação Etérea',
    pillars: [
      {
        title: 'Geometria Sagrada Sutil (Kenê)',
        detail: 'Uso de traços e padronagens indígenas Huni Kuin e Yawanawá como linhas de sutileza e divisórias elegantes, sem poluição visual ou apropriação descontextualizada.'
      },
      {
        title: 'Luz Focal da Fogueira',
        detail: 'Gradientes radiais suaves e quentes simulando a penumbra da maloca iluminada pela chama central, direcionando os olhos do visitante aos pontos de conversão.'
      },
      {
        title: 'Textura Tátil e Fotografia Real',
        detail: 'Imagens em close-up valorizando a fibra da madeira, a fumaça limpa do breu e o trabalho manual das miçangas, eliminando qualquer aspecto de estoque genérico.'
      },
      {
        title: 'Repulsa ao Sensacionalismo Psicodélico',
        detail: 'Ausência estrita de arco-íris neon, espirais alucinógenas ou tipografias caricatas dos anos 60. A comunicação reflete a sobriedade de uma casa cerimonial autêntica.'
      }
    ]
  },

  architecture: [
    {
      section: '1. Hero Section (Acolhimento & Firmeza)',
      objective: 'Gerar reverência instantânea, ancorar a identidade da casa e canalizar o visitante para os instrumentos ou para a história.',
      wireframeElement: 'Vídeo/fotografia lenta em loop de fumaça ritual ao crepúsculo na floresta, selo de apoio indígena, headline visceral e duplo CTA.',
      suggestedCopy: {
        tagline: 'ARMAZÉM SAGRADO DA CASA DE AYAHUASCA',
        headline: 'A sacralidade da floresta no silêncio do seu altar.',
        subheadline: 'Instrumentos de oração, rapés tradicionais e artesanatos originários consagrados no fogo da nossa Casa. Uma ponte viva entre a sabedoria das aldeias e a sua jornada interior.',
        ctaLabel: 'Explorar Instrumentos Sagrados',
        visualAsset: 'Fotografia em plano fechado de um Kuripe em madeira nobre sobre folhas verdes orvalhadas com fumaça de resina natural subindo ao fundo.'
      },
      conversionMechanism: 'Alinha intenção espiritual com oferta tangível; o duplo CTA atende tanto quem já busca uma medicina específica quanto quem deseja conhecer a idoneidade da casa antes de comprar.'
    },
    {
      section: '2. Propósito & Origem (A Aliança da Floresta)',
      objective: 'Desarmar o ceticismo comercial explicando por que os produtos existem e como a renda sustenta as famílias guardiãs.',
      wireframeElement: 'Bloco assimétrico com retrato de artesãos, depoimento dos condutores da Casa e 3 pilares éticos em destaque.',
      suggestedCopy: {
        tagline: 'NOSSA ALIANÇA COM OS POVOS ORIGINÁRIOS',
        headline: 'Não vendemos apenas objetos. Sustentamos uma memória viva.',
        subheadline: 'Cada peça disponível neste armazém nasce nas mãos de famílias artesãs Huni Kuin e Yawanawá, e recebe bênçãos na fogueira cerimonial da nossa Casa antes de viajar até você.',
        visualAsset: 'Artesão indígena esculpindo kuripe na aldeia à beira do rio amazônico.'
      },
      conversionMechanism: 'Justificativa moral e emocional de compra: o cliente sente que sua aquisição é um ato de reciprocidade e sustento florestal, não de consumo vazio.'
    },
    {
      section: '3. Categorias em Destaque (Curadoria Intencional)',
      objective: 'Permitir navegação fluida por estados de intenção (Aterramento, Purificação, Música & Rezo, Vestimenta Sagrada).',
      wireframeElement: 'Filtro horizontal deslizável com tags visuais, cartões de produtos com selo de aldeia de origem, preço transparente e botão de pré-visualização de rezo.',
      suggestedCopy: {
        headline: 'Medicinas, Artes e Ferramentas de Reza',
        subheadline: 'Itens preparados em respeito às fases da lua, sem pressa industrial e com ingredientes puramente botânicos.',
        visualAsset: 'Grades visuais com zoom tátil e especificação clara de materiais e rezo de consagração.'
      },
      conversionMechanism: 'Categorização orientada pelo propósito ritual (ex: Rapés para Aterramento, Breu para Purificação), o que facilita a decisão de compra de buscadores iniciantes e veteranos.'
    },
    {
      section: '4. Curadoria, Ética & Bênção Ritual (Garantia Sagrada)',
      objective: 'Eliminar qualquer dúvida sobre pureza, legalidade, sustentabilidade e respeito às tradições.',
      wireframeElement: 'Linha do tempo interativa de 4 etapas: Coleta Lunar -> Feitio Indígena -> Consagração na Casa -> Envio Biodegradável.',
      suggestedCopy: {
        tagline: 'TRANSPARÊNCIA E CONSAGRAÇÃO',
        headline: 'O caminho que cada instrumento percorre até suas mãos.',
        subheadline: 'Para nós, o preparo de um kuripe ou a moagem de um rapé é um ato litúrgico. Conheça as etapas que asseguram a integridade de cada item.',
        visualAsset: 'Fogo ritual crepitando e mãos cuidando das plantas com carinho.'
      },
      conversionMechanism: 'Gera autoridade inabalável e eleva o valor percebido, justificando preços justos que remuneram dignamente os povos originários.'
    },
    {
      section: '5. Depoimentos da Comunidade de Buscadores',
      objective: 'Prova social acolhedora vinda de participantes reais de rituais e terapeutas holísticos.',
      wireframeElement: 'Carrossel / grid de cartões com fotos autênticas, localização, item adquirido e texto comovente.',
      suggestedCopy: {
        headline: 'Vozes da nossa roda de rezo.',
        subheadline: 'Relatos de quem já ancora a energia da floresta em seus altares e práticas de silêncio.',
        visualAsset: 'Retratos naturais com iluminação suave e depoimentos focados na sensação de presença e integridade das peças.'
      },
      conversionMechanism: 'Validação por pares: dissolve o receio de comprar itens espirituais pela internet ao ver relatos de profunda conexão e satisfação com a embalagem e energia.'
    },
    {
      section: '6. Rodapé Informativo & Responsabilidade Ritual',
      objective: 'Transparência jurídica, responsabilidade ética com medicinas tradicionais e canais diretos de suporte fraterno.',
      wireframeElement: 'Bloco institucional sério com aviso legal sobre o uso de rapé/ervas, endereço da sede física da Casa, links de rastreamento e botão de conversa direta por WhatsApp.',
      suggestedCopy: {
        headline: 'A Floresta Fala no Silêncio.',
        subheadline: 'Dúvidas sobre o uso sagrado ou sobre como escolher seu instrumento? Fale com nossa equipe de apoio ritual.',
        visualAsset: 'Emblema da Casa com grafismos geométricos e certificação de embalagem ecológica.'
      },
      conversionMechanism: 'Canal humano direto via WhatsApp para tirar dúvidas sobre medicinas reduz o abandono de carrinho em até 40% em lojas espirituais.'
    }
  ] as SectionArchitectureItem[],

  copywritingDirectives: {
    toneTitle: 'Tom de Voz: O Guardião Sereno',
    attributes: [
      {
        attribute: 'Acolhedor & Materno',
        meaning: 'Recebe o buscador sem arrogância iniciática; explica com paciência e clareza a finalidade de cada ferramenta.'
      },
      {
        attribute: 'Sóbrio & Reverente',
        meaning: 'Trata as plantas e objetos como seres vivos e memórias ancestrais, nunca como meros "produtos de bem-estar descartáveis".'
      },
      {
        attribute: 'Misterioso com Firmeza',
        meaning: 'Mantém a poesia e a profundidade da mata, sem cair em hermetismo confuso ou termos vazios de autoajuda.'
      },
      {
        attribute: 'Seguro & Ético',
        meaning: 'Deixa explícito que as medicinas não substituem cuidados médicos e incentiva o uso sóbrio e consciente.'
      }
    ],
    antiClicheList: [
      {
        avoid: '"Compre agora e viaje para outra dimensão!" / "Efeito psicodélico garantido"',
        prefer: '"Um instrumento sagrado para firmeza de pensamentos e aterramento diário."',
        why: 'Evita a vulgarização das medicinas da floresta e protege a integridade jurídica e moral da Casa.'
      },
      {
        avoid: '"Super promoção imperdível, leve 3 e pague 2!"',
        prefer: '"Kits de Altar pensados para harmonizar os cinco elementos da natureza."',
        why: 'Promoções apelativas transmitem desespero financeiro e profanam o valor das peças feitas à mão.'
      },
      {
        avoid: '"O poder quântico de cura ancestral cósmica"',
        prefer: '"A força das cinzas vegetais e o trabalho paciente das mãos da floresta."',
        why: 'Linguagem pretensiosa gera desconfiança; termos concretos e conectados à terra geram verdade.'
      }
    ]
  },

  conversionPlaybook: [
    {
      title: '1. O Gatilho do Comércio Justo Real',
      desc: 'Mostrar exatamente quem esculpiu e qual aldeia recebe o benefício financeiro. O público deste nicho tem prazer em pagar mais quando sabe que o valor sustenta os povos indígenas.'
    },
    {
      title: '2. Curadoria por Intenção (Ritual Bundling)',
      desc: 'Em vez de vender apenas o rapé solto, oferecer o "Kit Iniciação do Buscador" (Kuripe + Rapé + Pote de Cerâmica + Guia de Uso). Isso aumenta o ticket médio em mais de 60% e resolve a dor do cliente que não sabe o que precisa para começar.'
    },
    {
      title: '3. Atendimento Humanizado via WhatsApp',
      desc: 'No nicho espiritual, muitas pessoas têm dúvidas íntimas sobre dosagem, preparo e consagração. O botão de WhatsApp direto para a equipe de apoio da Casa converte mais de 50% dos indecisos.'
    },
    {
      title: '4. Embalagem como Parte do Sacramento',
      desc: 'Comunicar que o pacote não usa plástico bolha poluente, e sim fita kraft, folhas aromáticas secas e um bilhete consagrado. Essa expectativa de unboxing sagrado multiplica o boca a boca orgânico.'
    }
  ]
};
