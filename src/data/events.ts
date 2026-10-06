import { SacredEvent } from '../types';

export const EVENT_CATEGORIES = [
  { id: 'all', label: 'Todas as Vivências' },
  { id: 'cerimonia-ayahuasca-rape-sananga', label: 'Cerimônia de Ayahuasca, Rapé e Sananga' },
  { id: 'roda-de-rape', label: 'Roda de Rapé' },
  { id: 'roda-de-mulheres', label: 'Roda de Mulheres' },
] as const;

export const DEFAULT_EVENTS: SacredEvent[] = [
  // --- 1. CERIMÔNIA DE AYAHUASCA, RAPÉ E SANANGA ---
  {
    id: 'evento-cerimonia-de-ayahuasca-rape-sananga',
    title: 'Cerimônia de Ayahuasca, Rapé e Sananga: Renascimento & Cura Espiritual',
    category: 'cerimonia-ayahuasca-rape-sananga',
    categoryLabel: 'Cerimônia de Ayahuasca, Rapé e Sananga',
    date: '14 de Novembro (Sábado)',
    time: '20:30 até o amanhecer',
    location: 'Templo Cerimonial Religare • Recife - PE',
    facilitator: 'Corpo Guardião Feminino da Casa Religare (Anamnese prévia obrigatória)',
    description: 'Trabalho ritualístico noturno com a Santa Medicina da Ayahuasca, consagração de rapé de firmeza e aplicação de sananga para clareza da alma. Conduzido com seriedade ancestral e dirigida por mulheres.',
    intention: 'Autoconhecimento profundo, expansão da consciência, reconexão com o divino e alinhamento da missão de alma.',
    spotsInfo: 'Vagas estritas • Sujeito à entrevista prévia de saúde e anamnese',
    imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    highlight: true
  },

  // --- 2. RODA DE RAPÉ ---
  {
    id: 'evento-roda-de-rape',
    title: 'Roda de Rapé Sagrado: Sopro Firme, Presença & Aterramento',
    category: 'roda-de-rape',
    categoryLabel: 'Roda de Rapé',
    date: '24 de Outubro (Sábado)',
    time: '16:00 às 20:00',
    location: 'Espaço Cerimonial Religare • Recife - PE',
    facilitator: 'Feitio e Condução por Guardiãs da Casa & Sopro Imperial',
    description: 'Encontro cerimonial dedicado à medicina sagrada do rapé. Aplicação guiada com kuripes e tepis, instruções sobre a respiração e postura, defumações no carvão e silêncio meditativo.',
    intention: 'Alinhamento dos chacras superiores, calmaria mental, presença no agora e limpeza energética.',
    spotsInfo: '12 vagas • Inscrições abertas',
    imageUrl: 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=800&q=80',
    highlight: true
  },

  // --- 3. RODA DE MULHERES ---
  {
    id: 'evento-roda-de-mulheres',
    title: 'Roda de Mulheres: O Despertar da Força Ancestral & Rezo Feminino',
    category: 'roda-de-mulheres',
    categoryLabel: 'Roda de Mulheres',
    date: '17 de Outubro (Sexta-feira)',
    time: '19:00 às 22:30',
    location: 'Casa Religare • Recife - PE (Bairro das Graças)',
    facilitator: 'Guardiãs e Direção Feminina da Casa Religare',
    description: 'Círculo sagrado exclusivo para mulheres. Partilhas de cura, acolhimento sem julgamentos, cantos de firmeza no maracá, limpeza energética com defumação de rosas e ervas de acalanto.',
    intention: 'Cura da linhagem ancestral feminina, libertação de dores emocionais e fortalecimento da irmandade.',
    spotsInfo: 'Vagas limitadas para 14 mulheres (ambiente intimista e protegido)',
    imageUrl: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80',
    highlight: true
  },

  // --- 4. CERIMÔNIA DE AYAHUASCA, RAPÉ E SANANGA (Vivência de Alinhamento) ---
  {
    id: 'evento-rape-e-sananga',
    title: 'Vivência de Rapé & Sananga: Clareza Mental & Visão da Alma',
    category: 'cerimonia-ayahuasca-rape-sananga',
    categoryLabel: 'Cerimônia de Ayahuasca, Rapé e Sananga',
    date: '29 de Outubro (Quinta-feira)',
    time: '19:30 às 22:00',
    location: 'Casa Religare • Recife - PE',
    facilitator: 'Guardiã das Medicinas da Floresta',
    description: 'Trabalho profundo combinando a aplicação de Sananga viva legítima para abertura do terceiro olho e limpeza ocular/mental, seguido de consagração de rapé de purificação e cantos de cura.',
    intention: 'Clareza interior, dissipação de névoas mentais, alívio de tensões nos olhos e foco espiritual.',
    spotsInfo: 'Apenas 10 vagas presenciais',
    imageUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80',
    highlight: false
  },

  // --- 5. RODA DE MULHERES (Círculo de Feitio e Breu) ---
  {
    id: 'evento-consagracoes-no-fogo',
    title: 'Roda de Mulheres no Fogo: Benzimento de Instrumentos & Breu',
    category: 'roda-de-mulheres',
    categoryLabel: 'Roda de Mulheres',
    date: '07 de Novembro (Sábado)',
    time: '18:00 às 21:30',
    location: 'Jardim Sagrado da Casa Religare • Recife - PE',
    facilitator: 'Direção Feminina da Casa & Mestras Benzedeiras',
    description: 'Cerimônia ao redor da fogueira sagrada para consagração e imantação de instrumentos de rezo (kuripes, maracás, cachimbos, velas e guias). Traga seus instrumentos pessoais para serem benzidos e cruzados no fogo.',
    intention: 'Imantação de luz, proteção contra energias densas e selamento de propósitos espirituais.',
    spotsInfo: 'Roda aberta com inscrição prévia',
    imageUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80',
    highlight: false
  }
];
