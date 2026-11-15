import React from 'react';
import { ArrowUp } from 'lucide-react';
import { BorderGlow } from './BorderGlow';

export const LiquidGlassFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="philosophy" className="relative border-t border-white/10 bg-black text-white pt-24 pb-12 font-body">
      <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-20 space-y-16">
        
        {/* Brand Manifesto Callout with BorderGlow */}
        <BorderGlow
          className="rounded-[1.75rem] shadow-2xl text-left"
          borderRadius={28}
          glowRadius={50}
          glowColor="220 20 90"
          colors={['#ffffff', '#cbd5e1', '#94a3b8']}
          backgroundColor="#0a0a0a"
        >
          <div className="p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl text-left">
              <span className="text-xs font-mono text-white/60 tracking-widest uppercase block">
                // BRAND PHILOSOPHY
              </span>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold tracking-tight text-white leading-tight">
                THE WORLD WAS NEVER FIXED.
              </h3>
              <p className="text-sm sm:text-base text-white/80 font-light leading-relaxed">
                모든 사물에는 또 다른 상태가 존재합니다. 우리는 그것을 <span className="text-white font-medium">ALTERED FORM</span>이라 부릅니다.
                기능의 흔적은 남겨두되 선과 면, 비례와 구조, 소재와 제조 방식을 바꾸어 익숙함과 낯섦의 경계를 만듭니다.
              </p>
            </div>

            <button
              onClick={scrollToTop}
              className="liquid-glass-strong px-5 py-3 rounded-full text-white/80 hover:text-white text-xs tracking-widest transition-all flex items-center gap-2 self-start md:self-auto flex-shrink-0 cursor-pointer shadow-lg hover:bg-white/10"
            >
              <span>TOP OF PAGE</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </BorderGlow>

        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left text-xs text-white/70 border-t border-white/10 pt-12 font-light">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <a href="#hero" className="inline-block group" aria-label="ALTERFORM Home">
              <img 
                src="/assets/logo/alterform-hero-logo.png" 
                alt="ALTERFORM Logo" 
                className="h-12 md:h-14 w-auto object-contain mix-blend-screen filter drop-shadow-[0_2px_8px_rgba(255,255,255,0.2)] opacity-95 group-hover:opacity-100 transition-opacity" 
              />
            </a>
            <p className="text-[11px] text-white/50 leading-relaxed">
              Wearable Object Studio exploring Form, Material, and Body.
            </p>
            <p className="text-[10px] text-white/40 font-mono">
              SEOUL, KOREA
            </p>
          </div>

          {/* Col 2 */}
          <div className="space-y-2">
            <span className="text-white font-medium block mb-1">5-AXIS SYSTEM</span>
            <div className="space-y-1 text-white/50 text-[11px]">
              <div>01. STRUCTURE — 질서 · 건축</div>
              <div>02. DISTORTION — 변형 · 비대칭</div>
              <div>03. FLUID — 흐름 · 용해</div>
              <div>04. GROWTH — 성장 · 증식</div>
              <div>05. VOID — 비움 · 관통</div>
            </div>
          </div>

          {/* Col 3 */}
          <div className="space-y-2">
            <span className="text-white font-medium block mb-1">MANUFACTURING</span>
            <div className="space-y-1 text-white/50 text-[11px]">
              <div>High-Density Zirconia Ceramic</div>
              <div>Sub-micron Additive Printing</div>
              <div>Precision Diamond Buffing</div>
              <div>Frosted Clear Resin Packaging</div>
            </div>
          </div>

          {/* Col 4 */}
          <div className="space-y-2">
            <span className="text-white font-medium block mb-1">ARCHIVE CREDIT</span>
            <div className="space-y-1 text-white/50 text-[11px]">
              <div>신한대학교 시각디자인 졸업전시</div>
              <div>DESIGNER: 이찬희 (LEE CHANHEE)</div>
              <div>bigboy9419@o.shinhan.ac.kr</div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/40 border-t border-white/10 pt-6 gap-2 font-light">
          <span>© 2026 ALTERFORM INSTITUTE. ALL RIGHTS RESERVED.</span>
          <span className="font-heading font-medium tracking-wider text-xs sm:text-sm text-white/70">"FAMILIAR, ALTERED."</span>
        </div>

      </div>
    </footer>
  );
};
