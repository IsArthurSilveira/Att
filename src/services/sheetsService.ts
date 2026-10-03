import { Product } from '../types';
import { PRODUCTS } from '../data/products';

/**
 * Converts any Google Drive shareable link into a direct, high-performance CDN image URL.
 * Supported formats:
 * - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 * - https://drive.google.com/open?id=FILE_ID
 * - https://drive.google.com/uc?id=FILE_ID&export=download
 * - FILE_ID directly
 */
export function formatDriveImageUrl(rawUrl: string): string {
  if (!rawUrl) return '';
  const trimmed = rawUrl.trim();

  // If it's already an external HTTP image that isn't Google Drive
  if (!trimmed.includes('drive.google.com') && !trimmed.includes('googleusercontent.com')) {
    return trimmed;
  }

  // Extract Google Drive ID
  const match = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
                trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/) ||
                trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/);

  if (match && match[1]) {
    // lh3.googleusercontent.com/d/ID is Google's ultra-fast CDN for public Drive photos
    return `https://lh3.googleusercontent.com/d/${match[1]}`;
  }

  return trimmed;
}

/**
 * Simple, robust RFC 4180 CSV parser handling multiline text, commas in quotes, and escaping.
 */
export function parseCSV(csvText: string): string[][] {
  const lines: string[][] = [];
  let row: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        current += '"';
        i++; // skip escaped quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      row.push(current.trim());
      current = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') i++;
      row.push(current.trim());
      if (row.some(cell => cell.length > 0)) {
        lines.push(row);
      }
      row = [];
      current = '';
    } else {
      current += char;
    }
  }

  if (current || row.length > 0) {
    row.push(current.trim());
    if (row.some(cell => cell.length > 0)) {
      lines.push(row);
    }
  }

  return lines;
}

/**
 * Normalizes category keys matching Religare categories
 */
function normalizeCategory(rawCategory: string): { id: string; label: string } {
  const lower = (rawCategory || '').toLowerCase();

  if (lower.includes('sopro') || lower.includes('tepi') || lower.includes('kuripe')) {
    return { id: 'sopro', label: 'Tepis & Kuripes' };
  }
  if (lower.includes('rape') || lower.includes('rapé') || lower.includes('sananga') || lower.includes('medicina')) {
    return { id: 'medicinas', label: 'Rapés & Sananga' };
  }
  if (lower.includes('vela') || lower.includes('lumiar')) {
    return { id: 'velas', label: 'Velas Rituais' };
  }
  if (lower.includes('erva') || lower.includes('defuma') || lower.includes('breu') || lower.includes('tuana')) {
    return { id: 'ervas', label: 'Ervas & Defumações' };
  }
  if (lower.includes('marac') || lower.includes('arte') || lower.includes('guia')) {
    return { id: 'artes', label: 'Artes dos Guias & Maracás' };
  }
  if (lower.includes('terapia') || lower.includes('vivencia') || lower.includes('vivência') || lower.includes('roda')) {
    return { id: 'terapias', label: 'Vivências & Terapias' };
  }

  return { id: 'medicinas', label: 'Rapés & Sananga' };
}

/**
 * Converts a Google Sheet URL or ID into the public CSV fetch endpoint
 */
export function getSheetCsvUrl(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return '';

  // If already a pub?output=csv link
  if (trimmed.includes('pub?output=csv') || trimmed.includes('export?format=csv') || trimmed.includes('gviz/tq?tqx=out:csv')) {
    return trimmed;
  }

  // If it's a standard Google Sheet sharing URL:
  // e.g. https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit?usp=sharing
  const match = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `https://docs.google.com/spreadsheets/d/${match[1]}/gviz/tq?tqx=out:csv`;
  }

  // If it's just the ID
  if (/^[a-zA-Z0-9_-]{20,}$/.test(trimmed)) {
    return `https://docs.google.com/spreadsheets/d/${trimmed}/gviz/tq?tqx=out:csv`;
  }

  return trimmed;
}

/**
 * Fetches products from a published Google Sheet CSV and transforms into Religare Product[]
 */
export async function fetchProductsFromSheet(sheetUrlOrId: string): Promise<Product[]> {
  const csvUrl = getSheetCsvUrl(sheetUrlOrId);
  if (!csvUrl) {
    throw new Error('URL ou ID da planilha inválido.');
  }

  const response = await fetch(csvUrl);
  if (!response.ok) {
    throw new Error(`Erro ao acessar planilha Google (Status ${response.status}). Verifique se a planilha está compartilhada como pública.`);
  }

  const csvText = await response.text();
  const rows = parseCSV(csvText);

  if (rows.length < 2) {
    throw new Error('A planilha está vazia ou contém apenas o cabeçalho.');
  }

  // Header row
  const headers = rows[0].map(h => h.toLowerCase());

  // Find column indices dynamically
  const findCol = (keywords: string[]) => {
    return headers.findIndex(h => keywords.some(k => h.includes(k)));
  };

  const nameIdx = findCol(['nome', 'produto', 'título', 'item']);
  const categoryIdx = findCol(['categoria', 'tipo', 'seção']);
  const priceIdx = findCol(['preço', 'preco', 'valor', 'r$']);
  const originalPriceIdx = findCol(['original', 'de', 'antigo']);
  const originIdx = findCol(['origem', 'artesão', 'artesao', 'parceiro', 'aldeia']);
  const descIdx = findCol(['descrição', 'descricao', 'sobre']);
  const ritualIdx = findCol(['ritual', 'uso', 'intenção', 'intencao', 'propósito']);
  const imageIdx = findCol(['imagem', 'link', 'drive', 'foto', 'url']);
  const inStockIdx = findCol(['estoque', 'disponível', 'disponivel']);
  const featuredIdx = findCol(['destaque', 'estrela', 'vitrine']);

  const parsedProducts: Product[] = [];

  // Parse data rows (start from row index 1)
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const name = nameIdx !== -1 ? row[nameIdx] : row[1];
    
    // Ignore empty rows
    if (!name || name.trim().length === 0) continue;

    const rawCategory = categoryIdx !== -1 ? row[categoryIdx] : 'medicinas';
    const { id: catId, label: catLabel } = normalizeCategory(rawCategory);

    // Price handling (e.g., "R$ 145,00" or "145.00" or "145")
    const rawPrice = priceIdx !== -1 ? row[priceIdx] : '0';
    const cleanPrice = parseFloat(rawPrice.replace(/[^\d.,]/g, '').replace(',', '.')) || 0;

    const rawOriginalPrice = originalPriceIdx !== -1 ? row[originalPriceIdx] : '';
    const cleanOriginalPrice = rawOriginalPrice 
      ? parseFloat(rawOriginalPrice.replace(/[^\d.,]/g, '').replace(',', '.')) || undefined 
      : undefined;

    const origin = originIdx !== -1 ? row[originIdx] : 'Feitio Sagrado • Religare';
    const description = descIdx !== -1 ? row[descIdx] : 'Instrumento de cura e conexão consagrado na Casa.';
    const ritualUse = ritualIdx !== -1 ? row[ritualIdx] : 'Alinhamento energético, meditação e presença no altar sagrado.';
    
    // Format Google Drive image
    const rawImage = imageIdx !== -1 ? row[imageIdx] : '';
    const imageUrl = formatDriveImageUrl(rawImage) || 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=800&q=80';

    const rawInStock = inStockIdx !== -1 ? row[inStockIdx]?.toLowerCase() : 'sim';
    const inStock = !rawInStock.includes('não') && !rawInStock.includes('nao') && !rawInStock.includes('false') && !rawInStock.includes('0');

    const rawFeatured = featuredIdx !== -1 ? row[featuredIdx]?.toLowerCase() : 'não';
    const featured = rawFeatured.includes('sim') || rawFeatured.includes('true') || rawFeatured.includes('1');

    parsedProducts.push({
      id: `sheet-prod-${i}-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
      name: name.trim(),
      category: catId as any,
      categoryLabel: catLabel,
      price: cleanPrice,
      originalPrice: cleanOriginalPrice,
      origin: origin.trim(),
      artisan: origin.trim(),
      description: description.trim(),
      ritualUse: ritualUse.trim(),
      elements: ['Feitio Sagrado', 'Origem Confiável', 'Consagrado no Fogo'],
      imageUrl: imageUrl.trim(),
      inStock,
      featured,
      rating: 5.0,
      reviewsCount: 12 + (i % 25),
      consecrationNote: 'Defumado com Breu e consagrado na 1ª Casa com direção 100% feminina.'
    });
  }

  if (parsedProducts.length === 0) {
    throw new Error('Nenhum produto com nome preenchido foi encontrado na planilha.');
  }

  return parsedProducts;
}
