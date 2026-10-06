import { SacredEvent } from '../types';
import { DEFAULT_EVENTS } from '../data/events';
import { formatDriveImageUrl, parseCSV, getSheetCsvUrl } from './sheetsService';

const DEFAULT_EVENT_IMAGE = 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80';

/**
 * Fetches events / sacred experiences from a published Google Sheet CSV
 */
export async function fetchEventsFromSheet(sheetUrlOrId: string): Promise<SacredEvent[]> {
  const csvUrl = getSheetCsvUrl(sheetUrlOrId);
  if (!csvUrl) {
    throw new Error('URL ou ID da planilha de eventos inválido.');
  }

  const response = await fetch(csvUrl);
  if (!response.ok) {
    throw new Error(`Erro ao acessar planilha Google (Status ${response.status}). Verifique se o compartilhamento está como público.`);
  }

  const csvText = await response.text();

  if (csvText.includes('<!DOCTYPE html>') || csvText.includes('google-signin') || csvText.includes('Sign in to your Google Account')) {
    throw new Error('Acesso negado: a planilha precisa estar com acesso definido como "Qualquer pessoa com o link pode ler" no Google Sheets.');
  }

  const rows = parseCSV(csvText);

  if (rows.length < 2) {
    throw new Error('A planilha de eventos está vazia ou contém apenas o cabeçalho.');
  }

  const headers = rows[0].map(h => h.toLowerCase());
  const timestampIdx = headers.findIndex(h => h.includes('carimbo') || h.includes('data/hora') || h.includes('timestamp'));

  const findCol = (keywords: string[]) => {
    return headers.findIndex((h, idx) => {
      if (idx === timestampIdx) return false;
      return keywords.some(k => h.includes(k));
    });
  };

  const titleIdx = findCol(['título', 'titulo', 'nome do evento', 'nome da vivência', 'nome da vivencia', 'experiência', 'experiencia', 'vivência', 'vivencia', 'evento', 'nome']);
  const categoryIdx = findCol(['tipo', 'categoria', 'formato']);
  const dateIdx = findCol(['data do evento', 'data da vivência', 'data da vivencia', 'quando', 'data', 'dia']);
  const timeIdx = findCol(['horário', 'horario', 'hora']);
  const locationIdx = findCol(['local', 'endereço', 'endereco', 'espaço', 'espaco', 'cidade']);
  const facilitatorIdx = findCol(['facilitador', 'facilitadora', 'quem conduz', 'condução', 'conducao', 'terapeuta', 'guardiã', 'guardia']);
  const descIdx = findCol(['descrição', 'descricao', 'sobre', 'o que é', 'detalhes']);
  const intentionIdx = findCol(['intenção', 'intencao', 'propósito', 'proposito', 'foco', 'rezo']);
  const spotsIdx = findCol(['vagas', 'inscrições', 'inscricoes', 'participação', 'participacao', 'limite', 'capacidade']);
  const imageIdx = findCol(['link imagem do drive', 'link imagem', 'imagem', 'link', 'foto', 'drive', 'banner']);
  const highlightIdx = findCol(['destaque', 'vitrine', 'estrela']);

  const parsedEvents: SacredEvent[] = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const title = titleIdx !== -1 ? row[titleIdx] : row[1];

    if (!title || title.trim().length === 0) continue;

    // Padronização inteligente para que quem preenche o formulário possa colocar apenas números ou textos simples
    const formatRawTime = (raw?: string) => {
      if (!raw || !raw.trim()) return '19:00 às 22:00';
      const t = raw.trim();
      if (/^\d{1,2}$/.test(t)) return `${t}:00h`;
      if (/^\d{1,2}h$/i.test(t)) return `${t.replace(/h/i, '')}:00h`;
      return t;
    };

    const formatRawLocation = (raw?: string) => {
      if (!raw || !raw.trim()) return 'Casa Religare • Recife - PE (Bairro das Graças)';
      const l = raw.trim();
      if (l.toLowerCase() === 'recife' || l.toLowerCase() === 'casa religare') {
        return 'Casa Religare • Recife - PE (Bairro das Graças)';
      }
      return l;
    };

    const formatRawSpots = (raw?: string) => {
      if (!raw || !raw.trim()) return 'Vagas limitadas • Inscrições abertas';
      const s = raw.trim();
      if (/^\d+$/.test(s)) return `${s} vagas disponíveis • Inscrições abertas`;
      if (/^\d+\s*vagas?$/i.test(s)) return `${s} disponíveis • Inscrições abertas`;
      return s;
    };

    const rawDate = dateIdx !== -1 && row[dateIdx] ? row[dateIdx].trim() : 'Data a confirmar';
    const rawTime = formatRawTime(timeIdx !== -1 ? row[timeIdx] : '');
    const location = formatRawLocation(locationIdx !== -1 ? row[locationIdx] : '');
    const facilitator = facilitatorIdx !== -1 && row[facilitatorIdx] ? row[facilitatorIdx].trim() : 'Direção Feminina & Guardiãs Religare';
    const description = descIdx !== -1 && row[descIdx] ? row[descIdx].trim() : 'Encontro de cura, acolhimento e conexão espiritual conduzido com amor e reverência.';
    const intention = intentionIdx !== -1 && row[intentionIdx] ? row[intentionIdx].trim() : 'Acolhimento, elevação energética e força ancestral.';
    const spotsInfo = formatRawSpots(spotsIdx !== -1 ? row[spotsIdx] : '');

    const rawCategory = categoryIdx !== -1 && row[categoryIdx] ? row[categoryIdx].trim() : '';
    let categoryLabel = 'Cerimônia de Ayahuasca, Rapé e Sananga';
    let categoryId = 'cerimonia-ayahuasca-rape-sananga';

    if (rawCategory) {
      const lower = rawCategory.toLowerCase();
      if (lower.includes('ayahuasca') || (lower.includes('rapé') && lower.includes('sananga')) || (lower.includes('rape') && lower.includes('sananga'))) {
        categoryLabel = 'Cerimônia de Ayahuasca, Rapé e Sananga';
        categoryId = 'cerimonia-ayahuasca-rape-sananga';
      } else if (lower.includes('mulher')) {
        categoryLabel = 'Roda de Mulheres';
        categoryId = 'roda-de-mulheres';
      } else if (lower.includes('roda de rap') || lower.includes('roda rap') || lower === 'rapé' || lower === 'rape') {
        categoryLabel = 'Roda de Rapé';
        categoryId = 'roda-de-rape';
      } else {
        // Custom category dynamically entered in Google Forms
        categoryLabel = rawCategory.charAt(0).toUpperCase() + rawCategory.slice(1);
        categoryId = rawCategory.toLowerCase().replace(/[^a-z0-9]/g, '-');
      }
    }

    const rawImage = imageIdx !== -1 ? row[imageIdx] : '';
    const imageUrl = rawImage ? formatDriveImageUrl(rawImage, 'artes') : DEFAULT_EVENT_IMAGE;

    const rawHighlight = highlightIdx !== -1 && row[highlightIdx] ? row[highlightIdx].toLowerCase() : '';
    const highlight = rawHighlight.includes('sim') || rawHighlight.includes('true') || rawHighlight.includes('1');

    parsedEvents.push({
      id: `sheet-event-${i}-${title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      title: title.trim(),
      category: categoryId,
      categoryLabel,
      date: rawDate,
      time: rawTime,
      location,
      facilitator,
      description,
      intention,
      spotsInfo,
      imageUrl,
      highlight
    });
  }

  if (parsedEvents.length === 0) {
    throw new Error('Nenhum evento com nome/título preenchido foi encontrado na planilha.');
  }

  return parsedEvents;
}
