import React from 'react';
import { ArrowDown, Compass } from 'lucide-react';
import { HeroCanvas } from './HeroCanvas';

export const HeroSection: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen pt-20 flex flex-col justify-between overflow-hidden bg-grid-pattern">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-brand-plum/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-brand-inkblue/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col lg:flex-row items-center justify-between gap-8 py-10 z-10">
        
        {/* Left Column: Brand Typography & Manifesto */}
        <div className="w-full lg:w-1/2 space-y-6 text-left">
          {/* Archival Label */}
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded border border-brand-border bg-brand-steel/60 text-[11px] font-mono tracking-widest text-brand-gray">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-plum" />
            <span>ALTERFORM INSTITUTE // ARCHIVE 2026</span>
          </div>

          {/* Slogan & Title */}
          <div className="space-y-3">
            <h2 className="text-xs sm:text-sm font-mono tracking-loose-brand text-brand-gray uppercase">
              PHILOSOPHY / MANIFESTO
            </h2>
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-none font-display">
              FAMILIAR,<br />
              <span className="bg-gradient-to-r from-white via-brand-white to-brand-gray bg-clip-text text-transparent">
                ALTERED.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-brand-lightGray font-light max-w-xl pt-2">
              익숙한 장신구의 형태를 관찰하고, 분해하고, 비틀어 다시 결합합니다.
              만드는 것은 단순한 반지가 아니라, 신체라는 지형 위에 놓이는 작은 조각이자 미세 건축입니다.
            </p>
          </div>

          {/* Key Metric / Material Badges */}
          <div className="grid grid-cols-3 gap-3 py-2 border-y border-brand-border/60 max-w-md font-mono text-[11px]">
            <div>
              <span className="text-brand-muted block">MATERIAL</span>
              <span className="text-brand-white font-medium">Fine Zirconia</span>
            </div>
            <div>
              <span className="text-brand-muted block">MANUFACTURING</span>
              <span className="text-brand-white font-medium">Additive 3D</span>
            </div>
            <div>
              <span className="text-brand-muted block">COLLECTION</span>
              <span className="text-brand-white font-medium">5 Core Axes</span>
            </div>
          </div>

          {/* Call to Actions */}
          <div className="flex flex-wrap gap-4 pt-2 font-mono text-xs tracking-wider">
            <button
              onClick={() => scrollTo('axes')}
              className="px-6 py-3.5 bg-brand-white text-brand-bg hover:bg-brand-gray transition-colors rounded font-semibold flex items-center gap-2 group"
            >
              <span>EXPLORE 5 AXES</span>
              <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform" />
            </button>
            <button
              onClick={() => scrollTo('shop')}
              className="px-6 py-3.5 border border-brand-border hover:border-brand-gray bg-brand-steel/40 hover:bg-brand-steel text-brand-white transition-all rounded font-medium flex items-center gap-2"
            >
              <span>SHOP COLLECTION</span>
              <span className="text-brand-plum text-xs">→</span>
            </button>
          </div>
        </div>

        {/* Right Column: 3D Interactive Object */}
        <div className="w-full lg:w-1/2 h-[420px] sm:h-[520px] relative rounded-2xl border border-brand-border/80 bg-brand-steel/20 backdrop-blur-sm overflow-hidden flex items-center justify-center">
          <div className="absolute top-4 left-4 z-20 font-mono text-[10px] text-brand-muted tracking-widest flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>SPECIMEN: AF-R03 / FLUID KNOT 3D</span>
          </div>
          <div className="absolute top-4 right-4 z-20 font-mono text-[10px] text-brand-muted tracking-widest">
            <span>RESIN & ZIRCONIA RENDER</span>
          </div>

          <HeroCanvas />
        </div>

      </div>

      {/* Bottom Ticker Bar */}
      <div className="w-full border-t border-brand-border/60 bg-brand-steel/40 py-3 px-4 z-10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between text-[11px] font-mono tracking-widest text-brand-gray gap-4">
          <div className="flex items-center space-x-3">
            <span className="text-brand-plum font-bold">5-AXIS SYSTEM:</span>
            <span>STRUCTURE</span>
            <span className="text-brand-muted">→</span>
            <span>DISTORTION</span>
            <span className="text-brand-muted">→</span>
            <span className="text-brand-white font-bold">FLUID</span>
            <span className="text-brand-muted">→</span>
            <span>GROWTH</span>
            <span className="text-brand-muted">→</span>
            <span>VOID</span>
          </div>

          <button 
            onClick={() => scrollTo('axes')} 
            className="flex items-center gap-1.5 text-brand-white hover:text-brand-plum transition-colors cursor-pointer"
          >
            <span>SCROLL DOWN</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};
