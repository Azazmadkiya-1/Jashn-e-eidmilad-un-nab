import React, { useState } from 'react';
import { Sparkles, Radio } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

interface CentralDomeVisualProps {
  salawatCount: number;
  onSendSalawat: () => void;
}

export const CentralDomeVisual: React.FC<CentralDomeVisualProps> = ({
  salawatCount,
  onSendSalawat
}) => {
  const [activeTab, setActiveTab] = useState<'dome' | 'cassette'>('dome');
  const [glowEffect, setGlowEffect] = useState(false);

  const handleDomeClick = () => {
    setGlowEffect(true);
    soundManager.playSalawatChime();
    onSendSalawat();
    setTimeout(() => setGlowEffect(false), 600);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto flex flex-col items-center justify-center my-4 md:my-6 z-10 px-2 sm:px-4">
      {/* Mode Switcher Buttons */}
      <div className="flex flex-wrap justify-center items-center gap-1.5 p-1 bg-emerald-950/80 border border-emerald-500/30 rounded-full backdrop-blur-md shadow-xl mb-4 sm:mb-6">
        <button
          onClick={() => { setActiveTab('dome'); soundManager.playCassetteClick(); }}
          className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 rounded-full text-xs font-medium transition-all ${
            activeTab === 'dome'
              ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-900/50'
              : 'text-emerald-300 hover:text-white hover:bg-emerald-900/40'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Green Dome</span>
        </button>

        <button
          onClick={() => { setActiveTab('cassette'); soundManager.playCassetteClick(); }}
          className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 rounded-full text-xs font-medium transition-all ${
            activeTab === 'cassette'
              ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-900/50'
              : 'text-emerald-300 hover:text-white hover:bg-emerald-900/40'
          }`}
        >
          <Radio className="w-3.5 h-3.5 text-amber-300" />
          <span>90s Cassette Deck</span>
        </button>
      </div>

      {/* VIEW 1: Sacred Green Dome Artwork */}
      {activeTab === 'dome' && (
        <div 
          onClick={handleDomeClick}
          className="relative group cursor-pointer w-full flex flex-col items-center transition-all"
          title="Click the Sacred Dome to send Darood Shareef & shower rose petals!"
        >
          {/* Glowing Aura ring */}
          <div className={`absolute inset-0 rounded-full bg-emerald-500/20 blur-2xl sm:blur-3xl transition-all duration-500 ${
            glowEffect ? 'scale-125 bg-emerald-400/40' : 'group-hover:scale-110 group-hover:bg-emerald-500/30'
          }`} />

          {/* SVG Vector Green Dome Illustration */}
          <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 transition-transform duration-300 group-hover:scale-105">
            <svg className="w-full h-full drop-shadow-[0_0_25px_rgba(16,185,129,0.5)]" viewBox="0 0 300 300" fill="none">
              {/* Stars & Crescent Background Halo */}
              <circle cx="150" cy="150" r="130" stroke="#059669" strokeWidth="1" strokeDasharray="6 4" opacity="0.4" className="animate-spin-slow" />
              
              {/* Crescent Gold Pinnacle */}
              <path d="M 150 25 C 146 25 142 29 142 34 C 142 39 146 43 150 43 C 148 41 147 38 147 34 C 147 30 148 27 150 25 Z" fill="#fbbf24" className="text-glow-gold" />
              <line x1="150" y1="42" x2="150" y2="65" stroke="#f59e0b" strokeWidth="3" />
              <circle cx="150" cy="50" r="4" fill="#fef08a" />
              <circle cx="150" cy="58" r="5" fill="#fbbf24" />

              {/* Main Emerald Green Dome (Rauza-e-Rasool) */}
              <path
                d="M 80 180 C 80 100, 220 100, 220 180 Z"
                fill="url(#greenDomeGradient)"
                stroke="#34d399"
                strokeWidth="2"
              />

              {/* Ribbing highlights on Dome */}
              <path d="M 150 65 Q 150 120 150 180" stroke="#6ee7b7" strokeWidth="2" opacity="0.8" />
              <path d="M 150 65 Q 125 120 110 180" stroke="#34d399" strokeWidth="1.5" opacity="0.6" />
              <path d="M 150 65 Q 175 120 190 180" stroke="#34d399" strokeWidth="1.5" opacity="0.6" />
              <path d="M 150 65 Q 100 130 90 180" stroke="#059669" strokeWidth="1.5" opacity="0.5" />
              <path d="M 150 65 Q 200 130 210 180" stroke="#059669" strokeWidth="1.5" opacity="0.5" />

              {/* Left Minaret */}
              <rect x="40" y="100" width="16" height="100" fill="#047857" stroke="#10b981" strokeWidth="1" />
              <path d="M 36 100 L 60 100 L 48 80 Z" fill="#f59e0b" />
              <rect x="42" y="120" width="12" height="18" rx="6" fill="#022c22" stroke="#34d399" strokeWidth="1" />

              {/* Right Minaret */}
              <rect x="244" y="100" width="16" height="100" fill="#047857" stroke="#10b981" strokeWidth="1" />
              <path d="M 240 100 L 264 100 L 252 80 Z" fill="#f59e0b" />
              <rect x="246" y="120" width="12" height="18" rx="6" fill="#022c22" stroke="#34d399" strokeWidth="1" />

              {/* Base Structure & Arabesque Windows */}
              <rect x="70" y="180" width="160" height="50" fill="#022c22" stroke="#059669" strokeWidth="2" />
              
              {/* Arched Windows */}
              {Array.from({ length: 5 }).map((_, i) => (
                <path
                  key={i}
                  d={`M ${90 + i * 26} 220 L ${90 + i * 26} 200 Q ${100 + i * 26} 190 ${110 + i * 26} 200 L ${110 + i * 26} 220 Z`}
                  fill="#fef08a"
                  opacity="0.85"
                  className="animate-pulse"
                />
              ))}

              {/* Base Gold Trim */}
              <line x1="60" y1="230" x2="240" y2="230" stroke="#fbbf24" strokeWidth="4" />

              <defs>
                <radialGradient id="greenDomeGradient" cx="50%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="40%" stopColor="#059669" />
                  <stop offset="85%" stopColor="#024e35" />
                  <stop offset="100%" stopColor="#012b1d" />
                </radialGradient>
              </defs>
            </svg>
          </div>

        </div>
      )}

      {/* VIEW 2: 90s Vintage Cassette Deck & Loudspeaker */}
      {activeTab === 'cassette' && (
        <div className="w-full bg-emerald-950/90 border border-emerald-500/30 rounded-2xl p-6 backdrop-blur-xl shadow-2xl box-glow-emerald flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-widest mb-4">
            <Radio className="w-4 h-4" />
            <span>Nostalgic 2-Band Stereo Cassette Deck • 1998 Edition</span>
          </div>

          {/* Cassette Tape Deck Illustration */}
          <div className="w-full max-w-sm bg-[#062419] border-2 border-emerald-600/50 rounded-xl p-4 shadow-inner relative">
            {/* Cassette Window */}
            <div className="bg-[#02130c] border border-emerald-500/40 rounded-lg p-3 flex justify-between items-center relative overflow-hidden">
              {/* Left Tape Reel */}
              <div className="w-12 h-12 rounded-full border-4 border-amber-500/60 flex items-center justify-center animate-spin-slow">
                <div className="w-4 h-4 rounded-full bg-amber-400/80 border-2 border-emerald-950" />
              </div>

              {/* Tape Label in Center */}
              <div className="flex-1 px-3 text-center">
                <p className="text-[10px] text-amber-300 font-serif uppercase tracking-wider">MARHABA NAAT COLLECTION</p>
                <div className="w-full h-1 bg-gradient-to-r from-amber-500 via-emerald-400 to-amber-500 my-1 rounded" />
                <p className="text-[9px] text-emerald-400 font-mono">SIDE A • HIGH BIAS TAPE</p>
              </div>

              {/* Right Tape Reel */}
              <div className="w-12 h-12 rounded-full border-4 border-amber-500/60 flex items-center justify-center animate-spin-slow">
                <div className="w-4 h-4 rounded-full bg-amber-400/80 border-2 border-emerald-950" />
              </div>
            </div>

            {/* Loudspeaker Horn Memory Note */}
            <p className="text-xs text-emerald-200/90 mt-4 italic font-serif">
              "Remember listening to this from neighborhood loudspeakers on crisp Rabi-ul-Awwal nights?"
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
