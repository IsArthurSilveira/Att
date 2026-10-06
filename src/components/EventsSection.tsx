import React, { useState, useMemo, useEffect } from 'react';
import { SacredEvent } from '../types';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  MessageCircle, 
  Sparkles, 
  FileSpreadsheet, 
  Eye, 
  X,
  Ticket,
  Users,
  Heart
} from 'lucide-react';

interface EventsSectionProps {
  events: SacredEvent[];
}

const WHATSAPP_NUMBER = '5581979149067';

// Formatadores inteligentes para padronizar horário, local, vagas e facilitadora
const formatEventTime = (time?: string): string => {
  if (!time || !time.trim()) return '19:00 às 22:00';
  const t = time.trim();
  if (/^\d{1,2}$/.test(t)) return `${t}:00h`;
  if (/^\d{1,2}h$/i.test(t)) return `${t.replace(/h/i, '')}:00h`;
  return t;
};

const formatEventLocation = (loc?: string): string => {
  if (!loc || !loc.trim()) return 'Casa Religare • Recife - PE (Bairro das Graças)';
  const l = loc.trim();
  if (l.toLowerCase() === 'recife' || l.toLowerCase() === 'casa religare') {
    return 'Casa Religare • Recife - PE (Bairro das Graças)';
  }
  return l;
};

const formatEventSpots = (spots?: string): string => {
  if (!spots || !spots.trim()) return 'Vagas limitadas • Inscrições abertas';
  const s = spots.trim();
  if (/^\d+$/.test(s)) return `${s} vagas disponíveis • Inscrições abertas`;
  if (/^\d+\s*vagas?$/i.test(s)) return `${s} disponíveis • Inscrições abertas`;
  return s;
};

const formatEventFacilitator = (fac?: string): string => {
  if (!fac || !fac.trim()) return 'Direção Feminina & Guardiãs Religare';
  return fac.trim();
};

export const EventsSection: React.FC<EventsSectionProps> = ({
  events
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalEvent, setActiveModalEvent] = useState<SacredEvent | null>(null);

  // As 3 categorias padrão solicitadas:
  // 1. (Cerimônia de Ayahuasca, Rapé e Sananga)
  // 2. (Roda de Rapé)
  // 3. (Roda de Mulheres)
  const defaultCategoryTemplates = useMemo(() => [
    { id: 'cerimonia-ayahuasca-rape-sananga', label: 'Cerimônia de Ayahuasca, Rapé e Sananga' },
    { id: 'roda-de-rape', label: 'Roda de Rapé' },
    { id: 'roda-de-mulheres', label: 'Roda de Mulheres' },
  ], []);

  // Categorias calculadas dinamicamente de acordo com o que vem do formulário/planilha ou dos eventos padrão
  const categories = useMemo(() => {
    const categoryMap = new Map<string, { id: string; label: string; count: number }>();

    events.forEach((ev) => {
      const rawLabel = (ev.categoryLabel || ev.category || '').trim();
      if (!rawLabel) return;
      const key = (ev.category || rawLabel).toLowerCase();

      if (categoryMap.has(key)) {
        categoryMap.get(key)!.count += 1;
      } else {
        categoryMap.set(key, {
          id: key,
          label: rawLabel,
          count: 1,
        });
      }
    });

    // Garante que as 3 categorias padrão sempre existam como base (mesmo com contagem 0 se não houver evento no mês)
    defaultCategoryTemplates.forEach((def) => {
      const key = def.id.toLowerCase();
      const existing = Array.from(categoryMap.values()).find(
        (c) => c.id === key || c.label.toLowerCase() === def.label.toLowerCase()
      );
      if (!existing) {
        categoryMap.set(key, {
          id: key,
          label: def.label,
          count: 0,
        });
      }
    });

    const categoryList = Array.from(categoryMap.values());

    // Ordenação: as 3 categorias padrão primeiro, seguidas de quaisquer novas categorias vindas do Forms
    categoryList.sort((a, b) => {
      const idxA = defaultCategoryTemplates.findIndex(
        (d) => d.id === a.id || d.label.toLowerCase() === a.label.toLowerCase()
      );
      const idxB = defaultCategoryTemplates.findIndex(
        (d) => d.id === b.id || d.label.toLowerCase() === b.label.toLowerCase()
      );
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.label.localeCompare(b.label, 'pt-BR');
    });

    return [
      { id: 'all', label: 'Todas as Vivências', count: events.length },
      ...categoryList,
    ];
  }, [events, defaultCategoryTemplates]);

  // Se a categoria selecionada deixar de existir após sincronização, volta para 'all'
  useEffect(() => {
    if (selectedCategory !== 'all' && !categories.some((c) => c.id === selectedCategory)) {
      setSelectedCategory('all');
    }
  }, [categories, selectedCategory]);

  const filteredEvents = useMemo(() => {
    if (selectedCategory === 'all') return events;
    return events.filter((ev) => {
      const catId = (ev.category || '').toLowerCase();
      const catLabel = (ev.categoryLabel || '').toLowerCase();
      const target = selectedCategory.toLowerCase();
      return (
        catId === target ||
        catLabel === target ||
        catLabel.includes(target) ||
        target.includes(catId)
      );
    });
  }, [events, selectedCategory]);

  const getWhatsAppMessage = (event: SacredEvent) => {
    const timeFormatted = formatEventTime(event.time);
    const locFormatted = formatEventLocation(event.location);
    const text = `Olá, equipe Religare! 🌸\n\nQuero saber mais sobre a experiência: *${event.title}*\n📅 Data: ${event.date} (${timeFormatted})\n📍 Local: ${locFormatted}\n\nPoderiam me enviar os detalhes, valores de contribuição e como garantir minha vaga? Gratidão! 🙏🌿`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="eventos" className="py-6 sm:py-8 md:py-10 bg-gradient-to-b from-[#0A0F0B] via-[#0E140F] to-[#0A0F0B] border-t border-[#1C261E] relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-10 w-72 h-72 rounded-full bg-[#183923]/15 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-72 h-72 rounded-full bg-[#DFB168]/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Compact Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#233226] pb-3.5 mb-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#18231B] border border-[#DFB168]/50 text-[#DFB168] text-[10px] font-semibold uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-[#DFB168]" />
                <span>Calendário do Mês</span>
              </span>
            </div>

            <h2 className="font-cinzel text-lg xs:text-xl sm:text-2xl font-bold text-[#F1ECE1] leading-tight">
              Vivências & Experiências
            </h2>
            <p className="text-[#A69986] text-xs max-w-xl">
              Encontros presenciais de cura e acolhimento dirigidos por mulheres em Recife.
            </p>
          </div>

          {/* Quick WhatsApp contact */}
          <div className="shrink-0">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Olá, equipe Religare! Gostaria de informações sobre o calendário de vivências e experiências deste mês. Gratidão! 🙏🌸')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#141B16] hover:bg-[#1C261E] border border-[#2B3B2F] hover:border-[#DFB168] text-[#DFB168] font-semibold text-xs transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>Dúvidas: (81) 97914-9067</span>
            </a>
          </div>
        </div>

        {/* Compact Category Pills */}
        <div className="mb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none touch-pan-x">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer min-h-[32px] flex items-center gap-1.5 shrink-0 shadow-sm ${
                    isSelected
                      ? 'bg-[#DFB168] text-[#0E1310] font-bold shadow-md scale-[1.02]'
                      : 'bg-[#141B16] text-[#A69986] hover:text-[#F1ECE1] border border-[#233226] hover:border-[#384F3D]'
                  }`}
                >
                  <span>{cat.label}</span>
                  {cat.count !== undefined && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                        isSelected
                          ? 'bg-[#0E1310]/20 text-[#0E1310]'
                          : 'bg-[#1C261E] text-[#DFB168] border border-[#2A3B2E]'
                      }`}
                    >
                      {cat.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Compact Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-8 bg-[#141B16] rounded-xl border border-[#233226] p-4 space-y-2.5">
            <Calendar className="w-7 h-7 text-[#DFB168] mx-auto opacity-70" />
            <p className="font-cinzel text-sm text-[#F1ECE1]">
              Nenhuma vivência cadastrada nesta categoria no momento.
            </p>
            <p className="text-xs text-[#A69986] max-w-md mx-auto">
              Ao cadastrar novos eventos e datas no seu Google Forms nesta categoria, eles aparecerão aqui automaticamente.
            </p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="px-3.5 py-1.5 rounded-lg bg-[#233226] hover:bg-[#2F4434] text-[#E0D7C6] text-xs font-semibold transition-colors cursor-pointer"
            >
              Ver todas as vivências
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {filteredEvents.map((event) => {
              const waUrl = getWhatsAppMessage(event);
              const formattedTime = formatEventTime(event.time);
              const formattedLocation = formatEventLocation(event.location);
              const formattedSpots = formatEventSpots(event.spotsInfo);

              return (
                <div
                  key={event.id}
                  className="group relative flex flex-col rounded-xl bg-[#141B16] border border-[#233226] hover:border-[#DFB168]/50 transition-all duration-300 overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-0.5"
                >
                  {/* Compact Image Banner */}
                  <div 
                    onClick={() => setActiveModalEvent(event)}
                    className="relative aspect-[16/9] overflow-hidden bg-[#0E1310] cursor-pointer shrink-0"
                  >
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141B16] via-transparent to-black/25" />

                    {/* Category Tag */}
                    <div className="absolute top-2 left-2">
                      <span className="backdrop-blur-md bg-[#0E1310]/85 text-[#DFB168] text-[9px] font-bold px-2 py-0.5 rounded-full border border-[#DFB168]/40 shadow-sm">
                        {event.categoryLabel || 'Vivência'}
                      </span>
                    </div>

                    {/* Quick View Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveModalEvent(event);
                      }}
                      aria-label="Ver detalhes da experiência"
                      className="absolute bottom-2 right-2 p-1.5 rounded-full bg-[#0E1310]/80 border border-[#384F3D] text-[#D8CFBF] hover:text-[#DFB168] transition-colors shadow-md backdrop-blur-sm cursor-pointer"
                      title="Ver detalhes completos"
                    >
                      <Eye className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Compact Body with Standardized Labels */}
                  <div className="p-3 flex-1 flex flex-col justify-between space-y-2.5">
                    
                    <div className="space-y-1.5">
                      {/* Date */}
                      <div className="flex items-center gap-1.5 text-[11px] text-[#DFB168] font-bold">
                        <Calendar className="w-3.5 h-3.5 shrink-0 text-[#DFB168]" />
                        <span className="truncate">{event.date}</span>
                      </div>

                      {/* Title */}
                      <h3 
                        onClick={() => setActiveModalEvent(event)}
                        className="font-cinzel text-xs sm:text-[13px] font-bold text-[#F1ECE1] group-hover:text-[#DFB168] transition-colors cursor-pointer line-clamp-1 leading-snug"
                        title={event.title}
                      >
                        {event.title}
                      </h3>

                      {/* Standardized Metadata details (Horário, Local, Vagas) */}
                      <div className="space-y-1 text-[11px] text-[#A69986] pt-0.5">
                        <div className="flex items-center gap-1.5 truncate">
                          <Clock className="w-3 h-3 text-[#DFB168]/80 shrink-0" />
                          <span className="truncate">
                            <strong className="text-[#C7BCAB] font-medium">Horário:</strong> {formattedTime}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 truncate">
                          <MapPin className="w-3 h-3 text-[#DFB168]/80 shrink-0" />
                          <span className="truncate">
                            <strong className="text-[#C7BCAB] font-medium">Local:</strong> {formattedLocation.split('•')[0]}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 text-amber-300 font-medium truncate pt-0.5">
                          <Ticket className="w-3 h-3 text-amber-400 shrink-0" />
                          <span className="truncate">
                            <strong className="text-amber-200 font-medium">Vagas:</strong> {formattedSpots.split('•')[0]}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* WhatsApp Action Button */}
                    <div className="pt-2 border-t border-[#233226]">
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2 px-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-[11px] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm min-h-[34px]"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-200" />
                        <span>Saber Mais no WhatsApp</span>
                      </a>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Modal with Complete Experience Details - Matching ProductDetailModal structure */}
      {activeModalEvent && (
        <div 
          onClick={() => setActiveModalEvent(null)}
          className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl rounded-2xl sm:rounded-3xl bg-[#141B16] border border-[#2B3B2F] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-auto max-h-[92vh] flex flex-col md:grid md:grid-cols-2"
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModalEvent(null)}
              aria-label="Fechar modal de vivência"
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-9 h-9 rounded-full bg-[#0E1310]/85 hover:bg-[#233226] text-[#D8CFBF] hover:text-[#F1ECE1] border border-[#2B3B2F] transition-colors cursor-pointer flex items-center justify-center"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Left Column: Full Event Image & Location Pill (Reference: Product Modal) */}
            <div className="relative h-56 sm:h-72 md:h-full shrink-0 bg-[#0E1310] overflow-hidden">
              <img
                src={activeModalEvent.imageUrl}
                alt={activeModalEvent.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141B16] via-transparent to-black/30" />

              {/* Floating Pill with Location & Facilitator */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 p-2.5 sm:p-3 rounded-xl bg-[#0E1310]/85 backdrop-blur-md border border-[#2B3B2F] space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-[#DFB168] font-semibold">
                  <MapPin className="w-3.5 h-3.5 shrink-0 text-[#DFB168]" />
                  <span className="truncate">{formatEventLocation(activeModalEvent.location)}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10.5px] text-[#C7BCAB]">
                  <Users className="w-3 h-3 shrink-0 text-emerald-400" />
                  <span className="truncate">{formatEventFacilitator(activeModalEvent.facilitator)}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Detailed Experience Info & Actions */}
            <div className="p-4 sm:p-6 md:p-8 flex-1 flex flex-col justify-between space-y-4 sm:space-y-6 overflow-y-auto">
              
              <div className="space-y-3 sm:space-y-4">
                
                {/* Header Category and Status */}
                <div className="flex items-center justify-between text-[11px] sm:text-xs text-[#DFB168] font-semibold uppercase tracking-wider">
                  <span className="truncate pr-2">{activeModalEvent.categoryLabel || 'Vivência Religare'}</span>
                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Inscrições Abertas</span>
                  </div>
                </div>

                {/* Event Title */}
                <h2 className="font-cinzel text-lg xs:text-xl sm:text-2xl font-bold text-[#F1ECE1] leading-snug">
                  {activeModalEvent.title}
                </h2>

                {/* Standardized Information Grid */}
                <div className="grid grid-cols-2 gap-2 p-3 sm:p-3.5 rounded-xl bg-[#0E1310] border border-[#233226] text-xs">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1 text-[10px] text-[#A69986] uppercase font-bold tracking-wider">
                      <Calendar className="w-3 h-3 text-[#DFB168]" />
                      <span>Data</span>
                    </div>
                    <span className="font-semibold text-[#F1ECE1] block text-xs">{activeModalEvent.date}</span>
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1 text-[10px] text-[#A69986] uppercase font-bold tracking-wider">
                      <Clock className="w-3 h-3 text-[#DFB168]" />
                      <span>Horário</span>
                    </div>
                    <span className="font-semibold text-[#F1ECE1] block text-xs">{formatEventTime(activeModalEvent.time)}</span>
                  </div>

                  <div className="col-span-2 pt-1.5 border-t border-[#1C261E] space-y-0.5">
                    <div className="flex items-center gap-1 text-[10px] text-[#A69986] uppercase font-bold tracking-wider">
                      <MapPin className="w-3 h-3 text-[#DFB168]" />
                      <span>Localização</span>
                    </div>
                    <span className="font-medium text-[#F1ECE1] block text-xs">{formatEventLocation(activeModalEvent.location)}</span>
                  </div>

                  <div className="col-span-2 pt-1.5 border-t border-[#1C261E] space-y-0.5">
                    <div className="flex items-center gap-1 text-[10px] text-amber-300 uppercase font-bold tracking-wider">
                      <Ticket className="w-3 h-3 text-amber-400" />
                      <span>Vagas & Participação</span>
                    </div>
                    <span className="font-semibold text-amber-200 block text-xs">{formatEventSpots(activeModalEvent.spotsInfo)}</span>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-[#DFB168] uppercase tracking-wider block">
                    Sobre a Vivência:
                  </span>
                  <p className="text-xs sm:text-sm text-[#D3C7B2] leading-relaxed">
                    {activeModalEvent.description}
                  </p>
                </div>

                {/* Sacred Intention Card */}
                {activeModalEvent.intention && (
                  <div className="p-3 sm:p-4 rounded-xl bg-[#0E1310] border border-[#233226] space-y-1">
                    <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-[#DFB168]">
                      <Sparkles className="w-3.5 h-3.5 text-[#DFB168]" />
                      <span>Intenção Sagrada & Rezo:</span>
                    </div>
                    <p className="text-xs text-[#A69986] leading-relaxed italic">
                      "{activeModalEvent.intention}"
                    </p>
                  </div>
                )}

                {/* Female Direction Micro-badge */}
                <div className="flex items-center gap-2 text-xs text-[#A69986] p-2.5 rounded-xl bg-[#18231B] border border-[#2B3B2F]">
                  <Heart className="w-3.5 h-3.5 text-[#DFB168] shrink-0" />
                  <span className="text-[11px] leading-tight">
                    Círculo de cura e acolhimento na 1ª Casa de Recife dirigida por mulheres.
                  </span>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-3 sm:pt-4 border-t border-[#233226] space-y-2.5">
                <a
                  href={getWhatsAppMessage(activeModalEvent)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[46px] py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:brightness-110 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Quero Garantir Minha Vaga no WhatsApp</span>
                </a>

                <div className="flex items-center justify-between text-[11px] text-[#8C8070] pt-0.5">
                  <span className="truncate">Casa Religare • Recife - PE</span>
                  <span className="text-emerald-400 font-medium">WhatsApp: (81) 97914-9067</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
