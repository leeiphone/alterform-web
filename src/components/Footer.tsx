import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="philosophy" className="border-t border-brand-border/80 bg-brand-bg text-brand-white pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Brand Manifesto Callout */}
        <div className="p-8 sm:p-12 rounded-2xl border border-brand-border bg-gradient-to-b from-brand-steel/40 to-brand-card/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl text-left">
            <span className="text-xs font-mono text-brand-plum tracking-widest uppercase">
              04 / BRAND MANIFESTO
            </span>
            <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
              THE WORLD WAS NEVER FIXED.
            </h3>
            <p className="text-sm sm:text-base text-brand-gray font-light leading-relaxed">
              모든 사물에는 또 다른 상태가 존재합니다. 우리는 그것을 <span className="text-white font-medium">ALTERED FORM</span>이라 부릅니다.
              기능의 흔적은 남겨두되 선과 면, 비례와 구조, 소재와 제조 방식을 바꾸어 익숙함과 낯섦의 경계를 만듭니다.
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="px-5 py-3 rounded-full border border-brand-border hover:border-brand-white bg-brand-steel/60 hover:bg-brand-white hover:text-brand-bg text-brand-gray text-xs font-mono tracking-widest transition-all flex items-center gap-2 self-start md:self-auto flex-shrink-0"
          >
            <span>TOP OF PAGE</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left font-mono text-xs text-brand-gray border-t border-brand-border/60 pt-12">
          
          {/* Col 1: Identity */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="font-display font-bold text-base tracking-widest text-white">ΛLTERFORM</span>
            </div>
            <p className="text-[11px] text-brand-muted leading-relaxed">
              Wearable Object Studio exploring Form, Material, and Body.
            </p>
            <p className="text-[10px] text-brand-muted">
              SEOUL, KOREA
            </p>
          </div>

          {/* Col 2: 5 Axes System */}
          <div className="space-y-2">
            <span className="text-white font-bold block mb-1">5-AXIS SYSTEM</span>
            <div className="space-y-1 text-brand-muted text-[11px]">
              <div>01. STRUCTURE — 질서 · 건축</div>
              <div>02. DISTORTION — 변형 · 비대칭</div>
              <div>03. FLUID — 흐름 · 용해</div>
              <div>04. GROWTH — 성장 · 증식</div>
              <div>05. VOID — 비움 · 관통</div>
            </div>
          </div>

          {/* Col 3: Research & Manufacturing */}
          <div className="space-y-2">
            <span className="text-white font-bold block mb-1">MANUFACTURING</span>
            <div className="space-y-1 text-brand-muted text-[11px]">
              <div>High-Density Zirconia Ceramic</div>
              <div>Sub-micron Additive Printing</div>
              <div>Precision Diamond Buffing</div>
              <div>Frosted Clear Resin Packaging</div>
            </div>
          </div>

          {/* Col 4: Archive Credit */}
          <div className="space-y-2">
            <span className="text-white font-bold block mb-1">ARCHIVE CREDIT</span>
            <div className="space-y-1 text-brand-muted text-[11px]">
              <div>신한대학교 시각디자인 졸업작품</div>
              <div>DESIGNER: 이찬희 (LEE CHANHEE)</div>
              <div>CONTACT: bigboy9419@o.shinhan.ac.kr</div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono text-brand-muted border-t border-brand-border/40 pt-6 gap-2">
          <span>© 2026 ALTERFORM INSTITUTE. ALL RIGHTS RESERVED.</span>
          <span>"FAMILIAR, ALTERED."</span>
        </div>

      </div>
    </footer>
  );
};
