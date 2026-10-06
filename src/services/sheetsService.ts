import { Product } from '../types';
import { PRODUCTS } from '../data/products';

/**
 * Returns a high-quality default sacred image for a given category
 */
function getDefaultCategoryImage(categoryId: string): string {
  switch (categoryId) {
    case 'sopro':
      return 'https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=800&q=80';
    case 'medicinas':
      return 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80';
    case 'velas':
      return 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80';
    default:
      return 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80';
  }
}

/**
 * Converts any Google Drive shareable link into a direct, high-performance CDN image URL.
 * Supported formats:
 * - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 * - https://drive.google.com/open?id=FILE_ID
 * - https://drive.google.com/uc?id=FILE_ID&export=download
 * - FILE_ID directly
 * If a folder link (/drive/folders/...) or empty string is passed, safely returns a thematic fallback image.
 */
export function formatDriveImageUrl(rawUrl: string, categoryId = 'medicinas'): string {
  if (!rawUrl || !rawUrl.trim()) {
    return getDefaultCategoryImage(categoryId);
  }
  const trimmed = rawUrl.trim();

  // If user pasted a folder link instead of an image file link:
  if (trimmed.includes('/drive/folders/')) {
    return getDefaultCategoryImage(categoryId);
  }

  // If it's already an external HTTP image (like unsplash or direct cdn)
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
  const lower = (rawCategory || '').toLowerCase().trim();

  if (lower.includes('sopro') || lower.includes('tepi') || lower.includes('kuripe')) {
    return { id: 'sopro', label: 'Tepis & Kuripes' };
  }
  if (lower.includes('rape') || lower.includes('rapé') || lower.includes('sananga') || lower.includes('medicina')) {
    return { id: 'medicinas', label: 'Rapés & Sananga' };
  }
  if (lower.includes('vela') || lower.includes('lumiar')) {
    return { id: 'velas', label: 'Velas Rituais' };
  }

  // If user entered a custom name (e.g. "teste" or custom section)
  if (lower && lower !== 'teste') {
    return { id: 'medicinas', label: rawCategory.trim() };
  }

  return { id: 'medicinas', label: 'Medicinas & Feitios' };
}

/**
 * Converts a Google Sheet URL or ID into the public CSV fetch endpoint with gid support
 */
export function getSheetCsvUrl(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return '';

  // If already a pub?output=csv or export?format=csv link
  if (trimmed.includes('pub?output=csv') || trimmed.includes('export?format=csv')) {
    return trimmed;
  }

  // Extract sheet ID
  const idMatch = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/);
  const sheetId = idMatch ? idMatch[1] : (/^[a-zA-Z0-9_-]{20,}$/.test(trimmed) ? trimmed : null);

  // Extract gid if provided (e.g., gid=728455759 or #gid=728455759)
  const gidMatch = trimmed.match(/[?&#]gid=([0-9]+)/);
  const gidParam = gidMatch ? `&gid=${gidMatch[1]}` : '';

  if (sheetId) {
    return `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv${gidParam}`;
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
  
  // If Google returned an HTML login page instead of CSV, it's not public
  if (csvText.includes('<!DOCTYPE html>') || csvText.includes('google-signin') || csvText.includes('Sign in to your Google Account')) {
    throw new Error('Acesso negado: a planilha precisa estar com acesso definido como "Qualquer pessoa com o link pode ler" no Google Sheets.');
  }

  const rows = parseCSV(csvText);

  if (rows.length < 2) {
    throw new Error('A planilha está vazia ou contém apenas o cabeçalho.');
  }

  // Header row (normalize lowercase)
  const headers = rows[0].map(h => h.toLowerCase());

  // Helper to check if a value looks like a date or time string
  const isDateOrTime = (val: string) => /\d{1,2}\/\d{1,2}\/\d{2,4}/.test(val) || /\d{1,2}:\d{1,2}/.test(val);

  // Helper to find column index matching keywords excluding specific indices
  const findCol = (keywords: string[], excludeIndices: number[] = []) => {
    return headers.findIndex((h, idx) => {
      if (excludeIndices.includes(idx)) return false;
      return keywords.some(k => h.includes(k));
    });
  };

  // Timestamp column (must NEVER be used for names or prices)
  const timestampIdx = findCol(['carimbo', 'data/hora', 'timestamp', 'horário']);

  const nameIdx = findCol(['nome do produto', 'nome', 'produto', 'título', 'item'], [timestampIdx]);
  const categoryIdx = findCol(['categoria do produto', 'categoria', 'tipo', 'seção'], [timestampIdx]);
  
  // Specifically distinguish between discount/sale price and original price
  const discountPriceIdx = findCol(['preço com desconto', 'preco com desconto', 'desconto', 'preço final', 'preco final'], [timestampIdx]);
  const priceIdx = discountPriceIdx !== -1 
    ? discountPriceIdx 
    : headers.findIndex((h, idx) => {
        if (idx === timestampIdx) return false;
        if (h.includes('original') || h.includes('antigo') || h.includes('cheio')) return false;
        return h.includes('preço') || h.includes('preco') || h.includes('valor');
      });
  
  // Strictly detect Original Price - NEVER loose 'de' which matched 'carimbo de data/hora'
  const originalPriceIdx = headers.findIndex((h, idx) => {
    if (idx === timestampIdx || idx === priceIdx) return false;
    return (
      h.includes('preço original') ||
      h.includes('preco original') ||
      h.includes('valor original') ||
      h.includes('preço anterior') ||
      h.includes('preco anterior') ||
      h.includes('preço de') ||
      h.includes('preco de') ||
      h.includes('preço cheio') ||
      h.trim() === 'original'
    );
  });

  const originIdx = findCol(['origem / artesão', 'origem / artesao', 'origem', 'artesão', 'artesao', 'parceiro', 'aldeia'], [timestampIdx]);
  const descIdx = findCol(['descrição', 'descricao', 'sobre'], [timestampIdx]);
  const ritualIdx = findCol(['uso ritual e intenção', 'uso ritual e intencao', 'uso ritual', 'ritual', 'intenção', 'intencao', 'propósito'], [timestampIdx]);
  const imageIdx = findCol(['link imagem do drive', 'link imagem', 'imagem', 'link', 'drive', 'foto', 'url'], [timestampIdx]);
  const inStockIdx = findCol(['em estoque', 'estoque', 'disponível', 'disponivel'], [timestampIdx]);
  const featuredIdx = findCol(['vitrine', 'destaque', 'estrela'], [timestampIdx]);
  const consecrationIdx = findCol([
    'consagração', 'consagracao', 'consagrado', 'consagrada',
    'bênção', 'bencao', 'rezo de consagração', 'rezo de consagracao',
    'nota de consagração', 'nota de consagracao', 'consagrado no fogo'
  ], [timestampIdx]);

  const elementsIdx = findCol([
    'matérias-primas', 'materias-primas', 'matéria prima', 'materia prima',
    'matérias primas', 'materias primas', 'matéria-prima', 'materia-prima',
    'matérias', 'materias', 'elementos', 'composição', 'composicao',
    'ingredientes', 'materiais', 'feitio sagrado', 'origem confiável', 'origem confiavel'
  ], [timestampIdx]);

  const parsedProducts: Product[] = [];

  // Parse data rows (start from row index 1)
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const name = nameIdx !== -1 ? row[nameIdx] : row[1];
    
    // Ignore empty rows
    if (!name || name.trim().length === 0) continue;

    const rawCategory = categoryIdx !== -1 ? row[categoryIdx] : 'medicinas';
    const { id: catId, label: catLabel } = normalizeCategory(rawCategory);

    // Price handling (e.g., "1111", "R$ 145,00", "145.00" or "145")
    const rawPrice = (priceIdx !== -1 && priceIdx !== timestampIdx) ? row[priceIdx] : '0';
    const cleanPrice = !isDateOrTime(rawPrice)
      ? (parseFloat(rawPrice.replace(/[^\d.,]/g, '').replace(',', '.')) || 0)
      : 0;

    const rawOriginalPrice = (originalPriceIdx !== -1 && originalPriceIdx !== timestampIdx) ? row[originalPriceIdx] : '';
    const cleanOriginalPrice = (
      rawOriginalPrice && 
      rawOriginalPrice.trim() !== '' && 
      !isDateOrTime(rawOriginalPrice)
    ) ? parseFloat(rawOriginalPrice.replace(/[^\d.,]/g, '').replace(',', '.')) || undefined 
      : undefined;

    const origin = originIdx !== -1 && row[originIdx] ? row[originIdx] : 'Feitio Sagrado • Religare';
    const description = descIdx !== -1 && row[descIdx] ? row[descIdx] : 'Instrumento de cura e conexão consagrado na Casa.';
    const ritualUse = ritualIdx !== -1 && row[ritualIdx] ? row[ritualIdx] : 'Alinhamento energético, meditação e presença no altar sagrado.';
    
    // Format Google Drive image (with automatic category fallback if blank or folder link)
    const rawImage = imageIdx !== -1 ? row[imageIdx] : '';
    const imageUrl = formatDriveImageUrl(rawImage, catId);

    const rawInStock = inStockIdx !== -1 ? row[inStockIdx]?.toLowerCase() : 'sim';
    const inStock = !rawInStock.includes('não') && !rawInStock.includes('nao') && !rawInStock.includes('false') && !rawInStock.includes('0');

    const rawFeatured = featuredIdx !== -1 ? row[featuredIdx]?.toLowerCase() : 'não';
    const featured = rawFeatured.includes('sim') || rawFeatured.includes('true') || rawFeatured.includes('1');

    // Consagração customizada pelo formulário
    const rawConsecration = (consecrationIdx !== -1 && row[consecrationIdx]) ? row[consecrationIdx].trim() : '';
    const consecrationNote = rawConsecration || 'Defumado com Breu e consagrado na 1ª Casa de Recife dirigida por mulheres.';

    // Matérias-Primas customizadas pelo formulário (separadas por vírgula ou ponto e vírgula)
    const rawElements = (elementsIdx !== -1 && row[elementsIdx]) ? row[elementsIdx].trim() : '';
    let elements = ['Feitio Sagrado', 'Origem Confiável', 'Consagrado no Fogo'];
    if (rawElements) {
      const parsedElements = rawElements.split(/[,;\n|]/).map(s => s.trim()).filter(Boolean);
      if (parsedElements.length > 0) {
        elements = parsedElements;
      }
    }

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
      elements,
      imageUrl: imageUrl.trim(),
      inStock,
      featured,
      rating: 5.0,
      reviewsCount: 12 + (i % 25),
      consecrationNote
    });
  }

  if (parsedProducts.length === 0) {
    throw new Error('Nenhum produto com nome preenchido foi encontrado na planilha.');
  }

  return parsedProducts;
}
