import React, { useState, useEffect } from 'react';
import { ParticleBackground } from './components/ParticleBackground';
import { LanternsAndFlags } from './components/LanternsAndFlags';
import { CentralDomeVisual } from './components/CentralDomeVisual';
import { CountdownTimer } from './components/CountdownTimer';
import { QuotesCarousel } from './components/QuotesCarousel';
import { NostalgicMemories } from './components/NostalgicMemories';
import { SeerahTimeline } from './components/SeerahTimeline';
import { HijriDateWidget } from './components/HijriDateWidget';
import { MusicPlayer } from './components/MusicPlayer';
import { soundManager } from './utils/soundEffects';
import { AUTHENTIC_PHRASES } from './data/miladData';

export default function App() {
  const [salawatCount, setSalawatCount] = useState(0);
  const [showerTrigger, setShowerTrigger] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);

  // Rotating status phrase
  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % AUTHENTIC_PHRASES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSendSalawat = () => {
    setSalawatCount((prev) => prev + 1);
    setShowerTrigger((prev) => prev + 1);
  };

  // Keyboard Event Listeners for interactive nostalgia
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore typing in input fields
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.code === 'Space' || e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        soundManager.playSalawatChime();
        handleSendSalawat();
      } else if (e.key === 's' || e.key === 'S') {
        soundManager.playSpritzSound();
        setShowerTrigger((prev) => prev + 1);
      } else if (e.key === 't' || e.key === 'T') {
        soundManager.playTasbeehClick();
        handleSendSalawat();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen text-emerald-50 selection:bg-emerald-500 selection:text-emerald-950 pb-28 font-sans">
      {/* Background Starry Sky & Canvas Rose Petal Engine */}
      <ParticleBackground showerTrigger={showerTrigger} />

      {/* Swaying Lanterns & Green Pennants */}
      <LanternsAndFlags onLanternClick={handleSendSalawat} />

      {/* Main Container */}
      <main className="relative z-10 pt-4 md:pt-6 px-3 sm:px-4 max-w-5xl mx-auto flex flex-col items-center w-full">
        
        {/* Status Badge Indicator */}
        <div className="flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 backdrop-blur-md text-[11px] sm:text-xs text-amber-300 shadow-lg mb-2 max-w-[92vw] overflow-hidden">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
          <span className="font-mono uppercase tracking-wider sm:tracking-widest truncate">{AUTHENTIC_PHRASES[phraseIndex]}</span>
        </div>

        {/* Header Title Section */}
        <div className="text-center max-w-3xl mx-auto my-1 px-2">
          <h1 className="font-title text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-emerald-300 drop-shadow-lg my-1 leading-tight">
            JASHN-E-EID MILAD-UN-NABI
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-emerald-200/90 font-serif max-w-xl mx-auto leading-relaxed mt-0.5">
            Jashn-E-Eid Milad-Un-Nabi Mubarak
          </p>
        </div>

        {/* Central Sacred Dome / 90s Cassette Deck Interactive View */}
        <CentralDomeVisual salawatCount={salawatCount} onSendSalawat={handleSendSalawat} />

        {/* 12 Rabi-ul-Awwal Countdown Timer */}
        <CountdownTimer onInteract={handleSendSalawat} />

        {/* Quotes & Kalam Carousel */}
        <QuotesCarousel />

        {/* Nostalgic Mohalla Memories */}
        <NostalgicMemories onMemoryTrigger={() => handleSendSalawat()} />

        {/* Seerah Educational Timeline */}
        <SeerahTimeline onEventClick={() => handleSendSalawat()} />

        {/* Nostalgic Hijri Date Desktop Widget */}
        <HijriDateWidget onInteract={handleSendSalawat} />

        {/* Footer Credit Section */}
        <footer className="mt-8 mb-16 text-center border-t border-amber-500/20 pt-4 w-full">
          <p className="text-xs md:text-sm font-serif tracking-widest text-amber-300/80 uppercase">
            Design By <span className="font-bold text-amber-200 hover:text-amber-100 transition-colors">Azazmadkiya</span>
          </p>
        </footer>

      </main>

      {/* Glassmorphism YouTube Naat Music Player */}
      <MusicPlayer />
    </div>
  );
}
