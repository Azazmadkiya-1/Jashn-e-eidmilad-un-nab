import React, { useState, useRef } from 'react';
import { TIMELINE_EVENTS } from '../data/miladData';
import { TimelineEvent } from '../types';
import {
  ChevronLeft,
  ChevronRight,
  Sun,
  BookOpen,
  Moon,
  Compass,
  Building2,
  Scroll,
  Crown,
  Users,
  Sparkles,
  MapPin,
  Calendar,
  X,
  Info,
  CheckCircle2
} from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

interface SeerahTimelineProps {
  onEventClick?: (event: TimelineEvent) => void;
}

export const SeerahTimeline: React.FC<SeerahTimelineProps> = ({ onEventClick }) => {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const categories = [
    { id: 'all', label: 'All Milestones' },
    { id: 'birth', label: 'Blessed Birth & Early Life' },
    { id: 'prophethood', label: 'Prophethood & Call' },
    { id: 'migration', label: 'Hijrah & Madinah' },
    { id: 'legacy', label: 'Universal Legacy' }
  ];

  const filteredEvents = activeCategory === 'all'
    ? TIMELINE_EVENTS
    : TIMELINE_EVENTS.filter((e) => {
        if (activeCategory === 'birth') return e.category === 'birth';
        if (activeCategory === 'prophethood') return e.category === 'prophethood';
        if (activeCategory === 'migration') return e.category === 'migration' || e.category === 'event';
        if (activeCategory === 'legacy') return e.category === 'legacy';
        return true;
      });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sun': return <Sun className="w-5 h-5 text-amber-300" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5 text-amber-300" />;
      case 'Moon': return <Moon className="w-5 h-5 text-emerald-300" />;
      case 'Compass': return <Compass className="w-5 h-5 text-amber-400" />;
      case 'Building2': return <Building2 className="w-5 h-5 text-emerald-300" />;
      case 'Scroll': return <Scroll className="w-5 h-5 text-amber-300" />;
      case 'Crown': return <Crown className="w-5 h-5 text-amber-400" />;
      case 'Users': return <Users className="w-5 h-5 text-emerald-300" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-amber-300" />;
      default: return <Sparkles className="w-5 h-5 text-amber-300" />;
    }
  };

  const handleScroll = (direction: 'left' | 'right') => {
    soundManager.playCassetteClick();
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleNodeClick = (eventItem: TimelineEvent) => {
    soundManager.playSalawatChime();
    setSelectedEvent(eventItem);
    if (onEventClick) {
      onEventClick(eventItem);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto my-10 px-4 z-10">
      {/* Section Header */}
      <div className="text-center mb-6">
        <span className="text-xs font-mono uppercase tracking-widest text-amber-300 bg-emerald-950/80 border border-emerald-500/30 px-3 py-1 rounded-full">
          Educational Seerah Journey
        </span>
        <h2 className="font-title text-2xl md:text-3xl text-amber-300 text-glow-gold mt-2">
          Chronological Life of the Prophet Muhammad ﷺ
        </h2>
        <p className="text-xs md:text-sm text-emerald-200/80 max-w-xl mx-auto mt-1">
          Explore key milestones from the birth of Rahmatun lil-Aalameen to the universal message of peace and human dignity.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center justify-center gap-2 flex-wrap mb-6">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              soundManager.playCassetteClick();
              setActiveCategory(cat.id);
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeCategory === cat.id
                ? 'bg-gradient-to-r from-amber-500 to-emerald-600 text-emerald-950 font-bold shadow-lg shadow-amber-500/20'
                : 'bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 hover:text-white hover:bg-emerald-900/50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main Horizontal Scrollable Timeline Track Container */}
      <div className="relative bg-emerald-950/70 border border-emerald-500/30 rounded-3xl p-6 backdrop-blur-xl shadow-2xl box-glow-emerald overflow-hidden">
        
        {/* Scroll Left Button */}
        <button
          onClick={() => handleScroll('left')}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-emerald-900/90 border border-emerald-500/50 text-amber-300 hover:scale-110 hover:bg-emerald-800 transition-all shadow-xl"
          title="Scroll Left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Scroll Right Button */}
        <button
          onClick={() => handleScroll('right')}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-emerald-900/90 border border-emerald-500/50 text-amber-300 hover:scale-110 hover:bg-emerald-800 transition-all shadow-xl"
          title="Scroll Right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Horizontal Scrollable Canvas Area */}
        <div
          ref={scrollContainerRef}
          className="flex items-stretch gap-6 overflow-x-auto py-8 px-8 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Continuous Golden Connecting Line behind cards */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-600 via-amber-400 to-emerald-600 -translate-y-1/2 opacity-40 pointer-events-none" />

          {filteredEvents.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => handleNodeClick(item)}
              className="group relative shrink-0 w-72 md:w-80 bg-emerald-900/50 border border-emerald-500/30 rounded-2xl p-5 hover:border-amber-400 hover:bg-emerald-900/80 transition-all cursor-pointer shadow-xl backdrop-blur-md flex flex-col justify-between snap-center hover:-translate-y-1.5"
            >
              {/* Event Year Badge */}
              <div className="flex items-center justify-between mb-3 border-b border-emerald-500/20 pb-2">
                <div className="flex items-center gap-1.5 text-amber-300 font-mono text-xs font-bold">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>{item.yearCE}</span>
                  {item.yearHijri && (
                    <span className="text-[10px] text-emerald-400 font-normal">
                      ({item.yearHijri})
                    </span>
                  )}
                </div>

                <div className="p-1.5 rounded-lg bg-emerald-950/80 border border-emerald-500/30 group-hover:border-amber-400 transition-colors">
                  {getIcon(item.iconName)}
                </div>
              </div>

              {/* Arabic Title */}
              {item.arabicTitle && (
                <p className="font-arabic text-xl text-amber-300/90 text-right mb-1 text-glow-gold">
                  {item.arabicTitle}
                </p>
              )}

              {/* Event Title */}
              <h3 className="font-title text-base font-bold text-emerald-100 group-hover:text-amber-300 transition-colors mb-2">
                {item.title}
              </h3>

              {/* Location Tag */}
              <div className="flex items-center gap-1 text-[11px] text-emerald-300/90 font-medium mb-3">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">{item.location}</span>
              </div>

              {/* Description Snippet */}
              <p className="text-xs text-emerald-200/80 line-clamp-3 leading-relaxed mb-4">
                {item.description}
              </p>

              {/* Connector Node Button */}
              <div className="pt-3 border-t border-emerald-500/20 flex items-center justify-between text-xs text-amber-300 font-semibold group-hover:text-amber-200">
                <span>View Historical Context</span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 group-hover:scale-125 transition-transform shadow-[0_0_10px_#f59e0b]" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Helper Hint */}
        <div className="text-center mt-2 text-[11px] text-emerald-300/70 font-mono">
          ← Scroll horizontally to travel through the Seerah timeline • Click any event card for deep details →
        </div>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-xl bg-emerald-950 border-2 border-amber-400/80 rounded-2xl p-6 md:p-8 shadow-2xl box-glow-gold animate-float">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-emerald-900/60 text-emerald-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Info */}
            <div className="flex items-center gap-3 mb-3 border-b border-emerald-500/20 pb-4">
              <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-400/50">
                {getIcon(selectedEvent.iconName)}
              </div>
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                  <span>{selectedEvent.yearCE}</span>
                  {selectedEvent.yearHijri && <span>• {selectedEvent.yearHijri}</span>}
                </div>
                <h3 className="font-title text-xl text-amber-300 mt-0.5">{selectedEvent.title}</h3>
                {selectedEvent.arabicTitle && (
                  <p className="font-arabic text-lg text-emerald-300 mt-1">{selectedEvent.arabicTitle}</p>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-xs text-emerald-300 mb-4 bg-emerald-900/40 px-3 py-1.5 rounded-lg border border-emerald-600/30 w-fit">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>Location: {selectedEvent.location}</span>
            </div>

            {/* Detailed Description */}
            <div className="my-4 space-y-3">
              <p className="text-sm text-emerald-100 leading-relaxed font-sans">
                {selectedEvent.description}
              </p>

              {/* Historical Significance */}
              <div className="p-4 rounded-xl bg-emerald-900/60 border border-emerald-500/30">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300 mb-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Universal Significance & Wisdom</span>
                </div>
                <p className="text-xs text-emerald-200/90 leading-relaxed italic">
                  "{selectedEvent.significance}"
                </p>
              </div>
            </div>

            {/* Action Footer */}
            <button
              onClick={() => {
                soundManager.playSalawatChime();
                setSelectedEvent(null);
              }}
              className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-600 hover:from-amber-400 hover:to-emerald-500 text-emerald-950 font-bold text-xs tracking-wider transition-colors shadow-lg"
            >
              SEND SALAWAT & RETURN TO TIMELINE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
