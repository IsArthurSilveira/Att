import React, { useState } from 'react';
import { X, FileSpreadsheet, RefreshCw, CheckCircle2, AlertCircle, HelpCircle, ExternalLink, Sparkles, Image, Check, Copy } from 'lucide-react';
import { fetchProductsFromSheet } from '../services/sheetsService';
import { Product } from '../types';

interface SheetsSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProductsLoaded: (products: Product[], sheetUrl: string) => void;
  onResetToDefault: () => void;
  currentSheetUrl: string;
  isUsingCustomSheet: boolean;
  productCount: number;
}

export const SheetsSyncModal: React.FC<SheetsSyncModalProps> = ({
  isOpen,
  onClose,
  onProductsLoaded,
  onResetToDefault,
  currentSheetUrl,
  isUsingCustomSheet,
  productCount
}) => {
  const [sheetUrl, setSheetUrl] = useState(currentSheetUrl);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [activeTab, setActiveTab] = useState<'sync' | 'guide'>('sync');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleSync = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!sheetUrl.trim()) {
      setStatusMessage({ type: 'error', text: 'Por favor, insira o link ou ID da sua Planilha Google.' });
      return;
    }

    setLoading(true);
    setStatusMessage(null);

    try {
      const products = await fetchProductsFromSheet(sheetUrl.trim());
      onProductsLoaded(products, sheetUrl.trim());
      setStatusMessage({
        type: 'success',
        text: `Conexão bem-sucedida! ${products.length} produtos carregados diretamente da sua planilha.`
      });
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: err?.message || 'Falha ao sincronizar. Verifique se o compartilhamento da planilha está definido como público.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopyField = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const formFields = [
    { name: 'Nome do Produto', type: 'Resposta curta (Obrigatório)', example: 'Kuripe Sagrado em Madeira Nativa' },
    { name: 'Categoria', type: 'Múltipla escolha', example: 'sopro, medicinas, velas, ervas, artes ou terapias' },
    { name: 'Preço', type: 'Resposta curta', example: '145,00 (apenas o valor numérico)' },
    { name: 'Preço Original', type: 'Resposta curta (Opcional)', example: '175,00 (aparece riscado na promoção)' },
    { name: 'Origem ou Artesão', type: 'Resposta curta', example: 'Sopro Imperial / Aldeia Yawanawá / Lumiar' },
    { name: 'Descrição', type: 'Parágrafo', example: 'Detalhes da madeira, feitio, geometria e história do item.' },
    { name: 'Uso Ritual e Intenção', type: 'Parágrafo', example: 'Presença, cura do centro cardíaco, silêncio mental.' },
    { name: 'Link da Imagem no Google Drive', type: 'Resposta curta', example: 'https://drive.google.com/file/d/.../view?usp=sharing' },
    { name: 'Em Estoque?', type: 'Múltipla escolha (Sim / Não)', example: 'Sim' },
    { name: 'Destaque na Vitrine?', type: 'Múltipla escolha (Sim / Não)', example: 'Sim' }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
      />

      <div className="relative w-full max-w-2xl bg-[#141B16] border border-[#DFB168]/70 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden text-[#F1ECE1]">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-[#233226] bg-[#0E1310] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shrink-0">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-cinzel text-base sm:text-lg font-bold text-[#F1ECE1]">
                  Integração Google Planilhas & Forms
                </h3>
                {isUsingCustomSheet ? (
                  <span className="text-[10px] bg-emerald-950 border border-emerald-500/50 text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                    Conectado ({productCount} itens)
                  </span>
                ) : (
                  <span className="text-[10px] bg-[#1E2B21] text-[#A69986] px-2 py-0.5 rounded-full">
                    Catálogo Padrão
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#A69986]">
                Autonomia 100%: cadastre pelo Forms e atualize a loja em tempo real
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Fechar"
            className="p-2 w-9 h-9 flex items-center justify-center rounded-lg text-[#A69986] hover:text-[#F1ECE1] hover:bg-[#1E2B21] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#233226] bg-[#111713] text-xs font-semibold">
          <button
            onClick={() => setActiveTab('sync')}
            className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'sync'
                ? 'border-[#DFB168] text-[#DFB168] bg-[#18231B]'
                : 'border-transparent text-[#A69986] hover:text-[#F1ECE1]'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Conectar & Sincronizar</span>
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 border-b-2 transition-colors cursor-pointer ${
              activeTab === 'guide'
                ? 'border-[#DFB168] text-[#DFB168] bg-[#18231B]'
                : 'border-transparent text-[#A69986] hover:text-[#F1ECE1]'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Guia Passo a Passo (Forms + Drive)</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          
          {activeTab === 'sync' ? (
            <div className="space-y-4">
              
              <div className="p-3.5 rounded-xl bg-[#0E1310] border border-[#233226] text-xs space-y-2">
                <p className="text-[#C7BCAB] leading-relaxed">
                  Insira o link de compartilhamento da sua <strong>Planilha Google</strong> (onde caem as respostas do Forms). O site lê a planilha automaticamente e converte os links do Google Drive em fotos de alta velocidade!
                </p>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Importante: A planilha deve estar com acesso "Qualquer pessoa com o link pode ler".</span>
                </div>
              </div>

              {/* Form Input */}
              <form onSubmit={handleSync} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-[#E6DCB8] mb-1">
                    Link da Planilha Google (ou ID):
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="https://docs.google.com/spreadsheets/d/1BxiMVs.../edit?usp=sharing"
                    value={sheetUrl}
                    onChange={(e) => setSheetUrl(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0E1310] border border-[#2B3B2F] focus:border-[#DFB168] text-xs text-[#F1ECE1] placeholder-[#6D6354] focus:outline-none min-h-[44px]"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-[#C28C4B] hover:brightness-110 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-950/40 disabled:opacity-50 min-h-[44px]"
                  >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    <span>{loading ? 'Sincronizando...' : 'Sincronizar Produtos Agora'}</span>
                  </button>

                  {isUsingCustomSheet && (
                    <button
                      type="button"
                      onClick={() => {
                        onResetToDefault();
                        setSheetUrl('');
                        setStatusMessage({ type: 'success', text: 'Catálogo restaurado para os produtos padrão da loja.' });
                      }}
                      className="py-3 px-4 rounded-xl bg-[#233226] hover:bg-[#2F4434] text-xs font-semibold text-[#D8CFBF] transition-colors cursor-pointer min-h-[44px]"
                    >
                      Voltar ao Catálogo Padrão
                    </button>
                  )}
                </div>
              </form>

              {/* Feedback Alert */}
              {statusMessage && (
                <div className={`p-3.5 rounded-xl text-xs flex items-start gap-2.5 border ${
                  statusMessage.type === 'success'
                    ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-300'
                    : 'bg-red-950/70 border-red-500/50 text-red-300'
                }`}>
                  {statusMessage.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  )}
                  <div className="leading-relaxed">
                    {statusMessage.text}
                  </div>
                </div>
              )}

              {/* Quick instructions pill */}
              <div className="p-3 rounded-xl bg-[#111713] border border-[#233226] space-y-1.5 text-[11px] text-[#A69986]">
                <div className="font-semibold text-[#DFB168] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#DFB168]" />
                  <span>Como funciona a atualização automática?</span>
                </div>
                <p>
                  Quando você ou sua equipe envia um novo formulário no Google Forms, a resposta cai na planilha instantaneamente. Ao abrir a página da Religare, o site lê a planilha atualizada e exibe o novo produto automaticamente!
                </p>
              </div>

            </div>
          ) : (
            <div className="space-y-4">
              
              <div className="p-3.5 rounded-xl bg-[#0E1310] border border-[#233226] text-xs space-y-2">
                <h4 className="font-semibold text-[#DFB168] text-sm">
                  1. Crie seu Google Forms com estas perguntas exatas:
                </h4>
                <p className="text-[#A69986]">
                  No seu Google Forms (formulário), crie as seguintes perguntas nesta ordem para que a planilha fique perfeitamente alinhada com o site:
                </p>
              </div>

              {/* Fields Table */}
              <div className="space-y-2">
                {formFields.map((field, idx) => (
                  <div 
                    key={field.name}
                    className="p-2.5 rounded-xl bg-[#0E1310] border border-[#233226] flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="min-w-0">
                      <div className="font-semibold text-[#F1ECE1] flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-[#18231B] text-[#DFB168] text-[10px] font-bold flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <span>{field.name}</span>
                      </div>
                      <div className="text-[11px] text-[#A69986] mt-0.5 pl-6 truncate">
                        {field.type} • Ex: <span className="text-[#DFB168]">{field.example}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleCopyField(field.name, idx)}
                      className="px-2 py-1 rounded bg-[#18231B] border border-[#2B3B2F] hover:border-[#DFB168] text-[10px] text-[#D8CFBF] hover:text-[#DFB168] shrink-0 transition-colors flex items-center gap-1 cursor-pointer"
                      title="Copiar nome do campo"
                    >
                      {copiedIndex === idx ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copiar</span>
                        </>
                      )}
                    </button>
                  </div>
                ))}
              </div>

              {/* Step 2: Google Drive Images */}
              <div className="p-3.5 rounded-xl bg-[#0E1310] border border-[#233226] space-y-2 text-xs">
                <h4 className="font-semibold text-[#DFB168] flex items-center gap-1.5 text-sm">
                  <Image className="w-4 h-4 text-[#DFB168]" />
                  <span>2. Como colocar as fotos no Google Drive:</span>
                </h4>
                <ol className="list-decimal pl-5 space-y-1.5 text-[#A69986] text-[11px] leading-relaxed">
                  <li>Faça upload da foto do produto em uma pasta no seu Google Drive.</li>
                  <li>Clique com o botão direito na imagem &gt; <strong>Compartilhar</strong>.</li>
                  <li>Mude o acesso de <em>Restrito</em> para <strong>"Qualquer pessoa com o link"</strong> (Leitor).</li>
                  <li>Clique em <strong>Copiar link</strong> e cole no formulário.</li>
                  <li>O código da Religare transforma automaticamente o link em imagem web de alta velocidade!</li>
                </ol>
              </div>

              {/* Step 3: Google Sheets Sharing */}
              <div className="p-3.5 rounded-xl bg-[#0E1310] border border-[#233226] space-y-2 text-xs">
                <h4 className="font-semibold text-[#DFB168] flex items-center gap-1.5 text-sm">
                  <FileSpreadsheet className="w-4 h-4 text-[#DFB168]" />
                  <span>3. Como vincular a Planilha ao Formulário:</span>
                </h4>
                <ol className="list-decimal pl-5 space-y-1.5 text-[#A69986] text-[11px] leading-relaxed">
                  <li>No seu Google Forms, clique na aba <strong>Respostas</strong>.</li>
                  <li>Clique no ícone verde <strong>"Vincular às Planilhas"</strong> para criar a planilha.</li>
                  <li>Na planilha aberta, clique no botão verde <strong>Compartilhar</strong> (canto superior direito).</li>
                  <li>Em <em>Acesso geral</em>, altere para <strong>"Qualquer pessoa com o link"</strong>.</li>
                  <li>Copie o link da planilha e cole na aba <strong>"Conectar & Sincronizar"</strong> deste painel!</li>
                </ol>
              </div>

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-3.5 sm:p-4 border-t border-[#233226] bg-[#0E1310] flex items-center justify-between text-xs">
          <span className="text-[11px] text-[#8C8070]">
            Espaço Religare • 100% de Autonomia
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#18231B] hover:bg-[#202D23] border border-[#2B3B2F] text-xs font-semibold text-[#D8CFBF] cursor-pointer"
          >
            Fechar Janela
          </button>
        </div>

      </div>
    </div>
  );
};
