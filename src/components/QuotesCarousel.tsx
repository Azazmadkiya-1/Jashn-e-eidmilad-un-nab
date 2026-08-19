import React, { useState, useEffect } from 'react';
import { QUOTES } from '../data/miladData';
import { Quote, ChevronLeft, ChevronRight, Pause, Play, BookOpen } from 'lucide-react';
import { soundManager } from '../utils/soundEffects';

export const QuotesCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % QUOTES.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleNext = () => {
    soundManager.playCassetteClick();
    setCurrentIndex((prev) => (prev + 1) % QUOTES.length);
  };

  const handlePrev = () => {
    soundManager.playCassetteClick();
    setCurrentIndex((prev) => (prev - 1 + QUOTES.length) % QUOTES.length);
  };

  const currentQuote = QUOTES[currentIndex];

  return (
    <div className="w-full max-w-2xl mx-auto my-6 px-4 z-10">
      <div className="relative bg-emerald-950/70 border border-emerald-500/30 rounded-2xl p-6 md:p-8 backdrop-blur-md shadow-2xl box-glow-emerald overflow-hidden">
        {/* Subtle Background Pattern Accent */}
        <div className="absolute top-0 right-0 p-6 opacity-10 text-emerald-300 pointer-events-none">
          <Quote className="w-32 h-32" />
        </div>

        {/* Tag Header */}
        <div className="flex items-center justify-between mb-4 border-b border-emerald-500/20 pb-3">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-medium uppercase tracking-widest">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>{currentQuote.tag || 'Nostalgic Verse'}</span>
          </div>
          <span className="text-xs text-emerald-400 font-mono">
            {currentIndex + 1} / {QUOTES.length}
          </span>
        </div>

        {/* Content Stack */}
        <div className="min-h-[140px] flex flex-col justify-center transition-all duration-500">
          {currentQuote.arabic && (
            <p className="font-arabic text-2xl md:text-3xl text-amber-300 text-center mb-3 text-glow-gold leading-relaxed">
              {currentQuote.arabic}
            </p>
          )}

          <p className="font-serif text-lg md:text-xl text-emerald-100 text-center leading-relaxed whitespace-pre-line mb-3">
            "{currentQuote.urdu}"
          </p>

          <p className="text-xs md:text-sm text-emerald-300/90 text-center italic font-sans max-w-lg mx-auto">
            {currentQuote.english}
          </p>
        </div>

        {/* Poet / Source Attribution */}
        <div className="mt-4 pt-3 border-t border-emerald-500/20 text-right">
          <span className="text-xs font-semibold text-amber-400 font-serif">
            — {currentQuote.poetOrSource}
          </span>
        </div>

        {/* Automatic Progress Line */}
        {isPlaying && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-900/50">
            <div 
              key={currentIndex}
              className="h-full bg-gradient-to-r from-emerald-500 to-amber-400 transition-all duration-[6000ms] ease-linear w-full origin-left animate-progress" 
              style={{
                animation: 'progress 6s linear infinite'
              }}
            />
          </div>
        )}

        {/* Carousel Navigation Controls */}
        <div className="flex items-center justify-between mt-4 pt-2">
          <div className="flex items-center gap-1.5">
            {QUOTES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  soundManager.playCassetteClick();
                  setCurrentIndex(idx);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentIndex ? 'w-6 bg-amber-400' : 'w-1.5 bg-emerald-800 hover:bg-emerald-600'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-1.5 rounded-lg bg-emerald-900/50 hover:bg-emerald-800 text-emerald-200 transition-colors"
              title="Previous quote"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1.5 rounded-lg bg-emerald-900/50 hover:bg-emerald-800 text-amber-300 transition-colors"
              title={isPlaying ? "Pause auto-rotate" : "Play auto-rotate"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={handleNext}
              className="p-1.5 rounded-lg bg-emerald-900/50 hover:bg-emerald-800 text-emerald-200 transition-colors"
              title="Next quote"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
