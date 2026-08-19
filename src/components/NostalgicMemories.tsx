import React, { useState } from 'react';
import { MEMORIES } from '../data/miladData';
import { MemoryItem } from '../types';
import { Radio, Sparkles, Flower2, Utensils, HeartHandshake, X, Volume2 } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

interface NostalgicMemoriesProps {
  onMemoryTrigger?: (type: string) => void;
}

export const NostalgicMemories: React.FC<NostalgicMemoriesProps> = ({ onMemoryTrigger }) => {
  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Radio': return <Radio className="w-5 h-5 text-amber-400" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-amber-400" />;
      case 'Flower2': return <Flower2 className="w-5 h-5 text-rose-400" />;
      case 'Utensils': return <Utensils className="w-5 h-5 text-emerald-400" />;
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5 text-amber-300" />;
      default: return <Sparkles className="w-5 h-5 text-amber-400" />;
    }
  };

  const handleCardClick = (item: MemoryItem) => {
    setSelectedMemory(item);

    // Trigger associated sound effect
    if (item.audioTone === 'spritz') {
      soundManager.playSpritzSound();
    } else if (item.audioTone === 'cassette') {
      soundManager.playCassetteClick();
    } else if (item.audioTone === 'tasbeeh') {
      soundManager.playTasbeehClick();
    } else {
      soundManager.playSalawatChime();
    }

    if (onMemoryTrigger) {
      onMemoryTrigger(item.audioTone || 'chime');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-8 px-4 z-10">
      <div className="text-center mb-6">
        <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-3 py-1 rounded-full">
          Sacred Nostalgia & Cultural Treasures
        </span>
        <h2 className="font-title text-2xl md:text-3xl text-amber-300 text-glow-gold mt-2">
          Memories of 12 Rabi-ul-Awwal
        </h2>
        <p className="text-xs md:text-sm text-emerald-200/80 max-w-lg mx-auto mt-1">
          Click any memory below to evoke its unique sights, sounds, and fragrances.
        </p>
      </div>

      {/* Memory Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {MEMORIES.map((item) => (
          <div
            key={item.id}
            onClick={() => handleCardClick(item)}
            className="group relative bg-emerald-950/60 border border-emerald-500/30 rounded-xl p-5 hover:border-amber-400/80 hover:bg-emerald-900/40 transition-all cursor-pointer backdrop-blur-md shadow-xl flex flex-col justify-between hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-lg bg-emerald-900/60 border border-emerald-500/30 group-hover:border-amber-400/50 transition-colors">
                  {getIcon(item.iconName)}
                </div>
                <span className="text-[10px] font-mono text-emerald-300/80 bg-emerald-900/40 px-2 py-0.5 rounded border border-emerald-600/30">
                  {item.period}
                </span>
              </div>

              <h3 className="font-semibold text-emerald-100 group-hover:text-amber-300 transition-colors text-base mb-1">
                {item.title}
              </h3>

              <p className="text-xs text-emerald-200/70 line-clamp-2 leading-relaxed">
                {item.summary}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-emerald-500/20 flex items-center justify-between text-[11px] text-amber-300 font-medium">
              <span>{item.sensoryDetail}</span>
              <Volume2 className="w-3.5 h-3.5 text-emerald-400 group-hover:text-amber-300 animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Memory Modal */}
      {selectedMemory && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-emerald-950 border-2 border-amber-400/80 rounded-2xl p-6 md:p-8 shadow-2xl box-glow-gold animate-float">
            <button
              onClick={() => setSelectedMemory(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-emerald-900/60 text-emerald-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-400/50">
                {getIcon(selectedMemory.iconName)}
              </div>
              <div>
                <span className="text-xs font-mono text-amber-400 uppercase tracking-wider">{selectedMemory.period}</span>
                <h3 className="font-title text-xl text-amber-300">{selectedMemory.title}</h3>
              </div>
            </div>

            <p className="text-sm text-emerald-100 leading-relaxed font-sans my-4">
              {selectedMemory.detailedMemory}
            </p>

            <div className="p-3 rounded-lg bg-emerald-900/50 border border-emerald-500/30 text-xs text-amber-300 font-medium flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Sensory Note: {selectedMemory.sensoryDetail}</span>
            </div>

            <button
              onClick={() => {
                if (selectedMemory.audioTone === 'spritz') soundManager.playSpritzSound();
                else if (selectedMemory.audioTone === 'tasbeeh') soundManager.playTasbeehClick();
                else soundManager.playSalawatChime();
              }}
              className="w-full mt-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-amber-200 font-medium text-xs tracking-wide transition-colors flex items-center justify-center gap-2"
            >
              <Volume2 className="w-4 h-4" />
              <span>Replay Sensory Memory Sound</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
