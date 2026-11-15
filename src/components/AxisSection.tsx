import React from 'react';
import { AXES_DATA } from '../data/products';
import { useStore } from '../store/useStore';
import { ArrowRight, Layers } from 'lucide-react';
import { AxisKey } from '../types';

export const AxisSection: React.FC = () => {
  const { selectedAxis, setSelectedAxis } = useStore();

  const currentAxisData = AXES_DATA.find((a) => a.key === selectedAxis) || AXES_DATA[0];

  const scrollToShop = () => {
    const el = document.getElementById('shop');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="axes" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-brand-border/60">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono text-brand-plum tracking-widest uppercase mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>01 / RESEARCH FRAMEWORK</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display">
            THE 5 ALTERATIONS
          </h2>
          <p className="text-brand-gray text-sm sm:text-base mt-2 max-w-xl font-light">
            질서에서 시작하여 힘으로 휘고, 액체로 흐르며, 스스로 증식하고, 마지막에 비워내는 5단계 조형적 전이.
          </p>
        </div>

        {/* 5-Axis Tab Buttons */}
        <div className="flex flex-wrap gap-2 font-mono text-xs">
          {AXES_DATA.map((axis) => {
            const isActive = axis.key === selectedAxis;
            return (
              <button
                key={axis.key}
                onClick={() => setSelectedAxis(axis.key as AxisKey)}
                className={`px-3.5 py-2 rounded border transition-all duration-200 flex items-center space-x-2 ${
                  isActive
                    ? 'border-brand-white bg-brand-white text-brand-bg font-bold shadow-lg shadow-white/10'
                    : 'border-brand-border bg-brand-steel/40 text-brand-gray hover:text-brand-white hover:border-brand-muted'
                }`}
              >
                <span className="text-[10px] opacity-70">{axis.id}</span>
                <span>{axis.key}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Axis Showcase Card */}
      <div className="rounded-2xl border border-brand-border bg-gradient-to-b from-brand-card to-brand-bg overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 lg:p-12">
          
          {/* Left / Center Image View */}
          <div className="lg:col-span-7 relative group flex items-center justify-center min-h-[380px] sm:min-h-[460px] bg-brand-steel/30 rounded-xl overflow-hidden border border-brand-border/40">
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-brand-bg/80 pointer-events-none" />
            
            {/* Ambient Backlight */}
            <div className="absolute w-72 h-72 rounded-full bg-brand-plum/15 blur-[90px] pointer-events-none" />

            {/* Render Image */}
            <img
              src={currentAxisData.image}
              alt={currentAxisData.concept}
              className="max-h-[360px] sm:max-h-[420px] w-auto object-contain transform group-hover:scale-105 transition-transform duration-700 ease-out z-10 drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)]"
            />

            {/* Specimen Index Stamp */}
            <div className="absolute top-4 left-4 z-20 font-mono text-[11px] text-brand-gray/80 tracking-widest">
              <span>AF-AXIS // {currentAxisData.id}</span>
            </div>

            <div className="absolute bottom-4 right-4 z-20 font-mono text-[11px] text-brand-muted tracking-widest">
              <span>{currentAxisData.material}</span>
            </div>
          </div>

          {/* Right Information Column */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div>
              <span className="text-xs font-mono text-brand-plum tracking-widest uppercase">
                AXIS {currentAxisData.id} : {currentAxisData.nameKr}
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white mt-1 tracking-tight font-display">
                {currentAxisData.concept}
              </h3>
            </div>

            {/* Hero Quote */}
            <blockquote className="p-4 rounded-lg bg-brand-steel/60 border-l-2 border-brand-plum font-mono text-xs sm:text-sm text-brand-lightGray italic">
              "{currentAxisData.heroQuote}"
            </blockquote>

            {/* Description */}
            <p className="text-sm sm:text-base text-brand-gray leading-relaxed font-light">
              {currentAxisData.description}
            </p>

            {/* Keywords Pills */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-widest text-brand-muted block">
                FORM LANGUAGE KEYWORDS
              </span>
              <div className="flex flex-wrap gap-2">
                {currentAxisData.keywords.map((kw) => (
                  <span
                    key={kw}
                    className="px-2.5 py-1 rounded bg-brand-steel border border-brand-border text-[11px] font-mono text-brand-lightGray"
                  >
                    #{kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-4">
              <button
                onClick={scrollToShop}
                className="w-full sm:w-auto px-6 py-3.5 rounded border border-brand-border hover:border-brand-white bg-brand-steel hover:bg-brand-white hover:text-brand-bg text-brand-white font-mono text-xs tracking-wider transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <span>{currentAxisData.key} 제품 라인업 보기</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
