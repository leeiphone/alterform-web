import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FadingVideo } from './FadingVideo';
import { ScrollScrubVideo } from './ScrollScrubVideo';
import { BlurText } from './BlurText';
import {
  ArrowUpRight,
  Play,
  ImageIcon,
  MovieIcon,
  LightbulbIcon,
} from './LiquidGlassIcons';
import { LiquidGlassStore } from './LiquidGlassStore';
import { LiquidGlassCase } from './LiquidGlassCase';
import { LiquidGlassFooter } from './LiquidGlassFooter';
import { LiquidGlassCartDrawer } from './LiquidGlassCartDrawer';
import { LiquidGlassProductModal } from './LiquidGlassProductModal';
import { LiquidGlassCheckoutModal } from './LiquidGlassCheckoutModal';
import { LiquidGlassFilmModal } from './LiquidGlassFilmModal';
import { useStore } from '../../store/useStore';
import { ShoppingBag } from 'lucide-react';
import { BorderGlow } from './BorderGlow';

const NAV_ITEMS = [
  { id: 'axes', label: '5 Axes', href: '#axes' },
  { id: 'collection', label: 'Collection', href: '#store' },
  { id: 'case-r2', label: 'Case R2', href: '#case-r2' },
  { id: 'store', label: 'Store', href: '#store', hasArrow: true },
];

const motionProps = (delay: number) => ({
  initial: { filter: 'blur(10px)', opacity: 0, y: 20 },
  animate: { filter: 'blur(0px)', opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: 'easeOut' as const },
});

export const LiquidGlassView: React.FC = () => {
  const { cart, setIsCartOpen } = useStore();
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [isFilmOpen, setIsFilmOpen] = useState(false);
  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Support #film URL hash or external triggers
  React.useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#film') {
      setIsFilmOpen(true);
    }
    const handleHash = () => {
      if (window.location.hash === '#film') {
        setIsFilmOpen(true);
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);
  return (
    <div className="bg-black text-white font-body selection:bg-white selection:text-black">
      
      {/* ======================================================== */}
      {/* SECTION 1: HERO                                          */}
      {/* ======================================================== */}
      <section id="hero" className="relative h-screen min-h-[720px] overflow-hidden bg-black flex flex-col">
        {/* Background Atmospheric Video with Scroll Scrubbing (Down: Forward, Up: Reverse) */}
        <ScrollScrubVideo
          src="/assets/videos/ALTERFORM_CUT1-2_rise_A_scrub.mp4"
          className="absolute left-1/2 top-0 -translate-x-1/2 object-cover object-top z-0 pointer-events-none"
          style={{ width: '120%', height: '120%' }}
          enableScrollScrub={true}
        />

        {/* Ambient Dark Gradient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none z-[1]" />

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col h-full justify-between">
          
          {/* Navbar (Fixed style on top) */}
          <header className="fixed top-4 left-0 right-0 z-50 px-8 lg:px-16 flex items-center justify-between pointer-events-auto">
            {/* Left: Official ALTERFORM Logo (2번 사진, 글래스 효과 없음, 대형 배치) */}
            <a 
              href="#hero" 
              className="flex items-center group transition-transform hover:scale-105 pointer-events-auto"
              aria-label="ALTERFORM Home"
            >
              <img 
                src="/assets/logo/alterform-hero-logo.png" 
                alt="ALTERFORM Logo" 
                className="h-16 md:h-20 lg:h-24 w-auto object-contain mix-blend-screen filter drop-shadow-[0_4px_16px_rgba(255,255,255,0.25)]" 
              />
            </a>

            {/* Center Pill: Dynamic Moving Hover Highlight */}
            <nav 
              onMouseLeave={() => setHoveredNav(null)}
              className="hidden md:flex liquid-glass rounded-full p-1.5 items-center gap-1 shadow-lg relative"
            >
              {NAV_ITEMS.map((item) => {
                const isHovered = hoveredNav === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onMouseEnter={() => setHoveredNav(item.id)}
                    className={`relative px-4 py-2 text-sm font-medium font-body transition-colors duration-200 rounded-full flex items-center gap-1.5 cursor-pointer ${
                      isHovered ? 'text-black font-semibold' : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {isHovered && (
                      <motion.div
                        layoutId="navHoverPill"
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                        className="absolute inset-0 bg-white rounded-full z-0 shadow-sm"
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                    {item.hasArrow && (
                      <ArrowUpRight 
                        className={`relative z-10 w-3.5 h-3.5 transition-transform duration-200 ${
                          isHovered ? 'translate-x-0.5 -translate-y-0.5 text-black' : 'text-white/80'
                        }`} 
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Right: Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="장바구니 열기"
              className="liquid-glass h-12 px-4 rounded-full flex items-center gap-2 cursor-pointer shadow-lg hover:border-white/40 transition-all pointer-events-auto"
            >
              <ShoppingBag className="w-4 h-4 text-white" />
              <span className="text-sm font-medium hidden sm:inline">Cart</span>
              {totalCartCount > 0 && (
                <span className="bg-white text-black text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">
                  {totalCartCount}
                </span>
              )}
            </button>
          </header>

          {/* Main Hero Body */}
          <div className="flex-1 flex flex-col items-center justify-center pt-28 px-4 text-center max-w-5xl mx-auto">
            {/* Headline with Staggered BlurText */}
            <div className="max-w-5xl">
              <BlurText
                text="FAMILIAR, ALTERED. WEARABLE SCULPTURES"
                className="text-5xl md:text-7xl lg:text-[5.5rem] font-heading font-bold text-white leading-[0.9] tracking-tight"
              />
            </div>

            {/* Subtext */}
            <motion.p
              {...motionProps(0.8)}
              className="text-sm md:text-base text-white/90 max-w-2xl font-body font-light leading-relaxed mt-6"
            >
              익숙한 장신구의 형태를 관찰하고, 분해하고, 비틀어 다시 결합합니다. 고밀도 파인 지르코니아 세라믹과 정밀 3D 적층 제조 기술이 빚어낸 신체라는 지형 위의 작은 조각이자 미세 건축.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              {...motionProps(1.1)}
              className="mt-7 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
            >
              <a
                href="#axes"
                className="liquid-glass-strong rounded-full px-6 py-3 flex items-center gap-2 text-sm font-body text-white hover:bg-white hover:text-black transition-all cursor-pointer shadow-lg group"
              >
                <span className="group-hover:text-black transition-colors">Explore 5 Axes</span>
                <ArrowUpRight className="w-4 h-4 group-hover:text-black transition-colors" />
              </a>

              <a
                href="#shop"
                className="liquid-glass-strong rounded-full px-6 py-3 flex items-center gap-2 text-sm font-body text-white hover:bg-white hover:text-black transition-all cursor-pointer shadow-lg group"
              >
                <span className="group-hover:text-black transition-colors">Zirconia Ceramic</span>
                <ArrowUpRight className="w-4 h-4 group-hover:text-black transition-colors" />
              </a>
            </motion.div>

            {/* Brand Film Cinematic Player Card (Unified Large Card) */}
            <motion.div
              {...motionProps(1.3)}
              className="mt-8 flex justify-center w-full px-4"
            >
              <BorderGlow
                onClick={() => setIsFilmOpen(true)}
                className="w-full max-w-[460px] rounded-[1.5rem] text-left shadow-2xl cursor-pointer hover:scale-[1.015] transition-all duration-300 group"
                borderRadius={24}
                glowRadius={45}
                glowColor="210 50 90"
                backgroundColor="#0a0a0a"
                colors={['#ffffff', '#38bdf8', '#c084fc']}
              >
                <div className="p-5 sm:p-6 flex items-center justify-between gap-4 h-full relative overflow-hidden">
                  {/* Subtle Ambient Glow */}
                  <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-sky-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-sky-500/20 transition-colors" />

                  {/* Left: Film Details */}
                  <div className="flex-1 min-w-0 z-10">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-mono tracking-widest text-white/60 uppercase">
                        // OFFICIAL BRAND FILM
                      </span>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/15">
                        01:18
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-heading font-bold tracking-tight text-white leading-tight group-hover:text-neutral-200 transition-colors">
                      THE ALTERATION
                    </h3>

                    <p className="text-xs text-white/70 font-body font-light mt-1.5 truncate">
                      Watch Cinematic Film · 1080p FHD
                    </p>
                  </div>

                  {/* Right: Large Glowing Play Button */}
                  <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full liquid-glass border border-white/30 flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:bg-white group-hover:text-black group-hover:border-white shadow-xl transition-all duration-300 z-10">
                    <Play className="w-5 h-5 fill-current ml-0.5 transition-transform group-hover:scale-110" />
                  </div>
                </div>
              </BorderGlow>
            </motion.div>

          </div>

          {/* Bottom 5-Axis Bar */}
          <motion.div
            {...motionProps(1.4)}
            className="flex flex-col items-center gap-4 pb-8 px-4"
          >
            <div className="liquid-glass rounded-full px-4 py-1.5 text-xs font-body text-white/80 shadow-md">
              THE WORLD WAS NEVER FIXED // 5 CORE DESIGN AXES
            </div>

            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 pt-1">
              {['STRUCTURE', 'DISTORTION', 'FLUID', 'GROWTH', 'VOID'].map((axis) => (
                <span
                  key={axis}
                  className="font-heading font-semibold text-lg md:text-xl tracking-wider text-white/90 hover:text-white transition-opacity opacity-80 hover:opacity-100 cursor-default"
                >
                  {axis}
                </span>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 2: CAPABILITIES / 5 AXES                          */}
      {/* ======================================================== */}
      <section id="axes" className="relative min-h-screen overflow-hidden bg-black flex flex-col justify-between">
        {/* Background Atmospheric Video: ALTERFORM Brand Film Cut 6d (Seamless Ping-Pong Loop) */}
        <FadingVideo
          src="/assets/videos/ALTERFORM_CUT6d_loop.mp4?v=pingpong"
          seamlessLoop={true}
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-85"
        />

        {/* Ambient Dark Gradient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60 pointer-events-none z-[1]" />

        {/* Section Content */}
        <div className="relative z-10 px-8 md:px-16 lg:px-20 pt-24 pb-16 flex flex-col justify-between min-h-screen max-w-7xl mx-auto w-full">
          
          {/* Header */}
          <div className="mb-auto text-left">
            <span className="text-sm font-body text-white/80 mb-6 block tracking-widest font-mono">
              // CORE RESEARCH
            </span>
            <h2 className="font-heading font-bold text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.95] tracking-tight text-white whitespace-pre-line">
              Body, Material,{"\n"}and Form
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Form & Geometry */}
            <BorderGlow
              className="rounded-[1.25rem] min-h-[360px] text-left shadow-2xl hover:scale-[1.01] transition-transform duration-300"
              borderRadius={20}
              glowRadius={40}
              glowColor="220 20 90"
              backgroundColor="#0a0a0a"
              colors={['#ffffff', '#cbd5e1', '#94a3b8']}
            >
              <div className="p-6 flex flex-col justify-between h-full">
                <div className="flex items-start justify-between gap-4">
                  <div className="liquid-glass h-11 w-11 rounded-[0.75rem] flex items-center justify-center flex-shrink-0 text-white">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-wrap gap-1.5 justify-end">
                    {['Structure', 'Distortion', 'Cantilever', 'Surge Crest'].map((tag) => (
                      <span
                        key={tag}
                        className="liquid-glass rounded-full px-3 py-1 text-[11px] text-white/90 font-body whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex-1 min-h-[48px]" />

                <div>
                  <h3 className="font-heading font-bold text-2xl md:text-3xl tracking-tight leading-none mb-3 text-white">
                    Form & Distortion
                  </h3>
                  <p className="text-sm text-white/90 font-body font-light leading-snug max-w-[32ch]">
                    익숙한 장신구의 기하학에서 출발하여 압축과 휨, 비틀림의 외력을 가해 예측 불가능한 조형적 긴장감을 부여합니다.
                  </p>
                </div>
              </div>
            </BorderGlow>

            {/* Card 2: Fluid & Ceramic */}
            <BorderGlow
              className="rounded-[1.25rem] min-h-[360px] text-left shadow-2xl hover:scale-[1.01] transition-transform duration-300"
              borderRadius={20}
              glowRadius={40}
              glowColor="195 80 85"
              backgroundColor="#0a0a0a"
              colors={['#ffffff', '#38bdf8', '#c084fc']}
            >
              <div className="p-6 flex flex-col justify-between h-full">
                <div className="flex items-start justify-between gap-4">
                  <div className="liquid-glass h-11 w-11 rounded-[0.75rem] flex items-center justify-center flex-shrink-0 text-white">
                    <MovieIcon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-wrap gap-1.5 justify-end">
                    {['Zirconia', 'Additive 3D', 'High Polish', 'Sintered'].map((tag) => (
                      <span
                        key={tag}
                        className="liquid-glass rounded-full px-3 py-1 text-[11px] text-white/90 font-body whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex-1 min-h-[48px]" />

                <div>
                  <h3 className="font-heading font-bold text-2xl md:text-3xl tracking-tight leading-none mb-3 text-white">
                    Fluid & Ceramic
                  </h3>
                  <p className="text-sm text-white/90 font-body font-light leading-snug max-w-[32ch]">
                    HARD MATERIAL. SOFT FORM. 단단한 세라믹이 액체처럼 흐르다 굳은 형태. 고밀도 지르코니아 연마 마감으로 빛을 유려하게 반사합니다.
                  </p>
                </div>
              </div>
            </BorderGlow>

            {/* Card 3: Growth & Void */}
            <BorderGlow
              className="rounded-[1.25rem] min-h-[360px] text-left shadow-2xl hover:scale-[1.01] transition-transform duration-300"
              borderRadius={20}
              glowRadius={40}
              glowColor="280 60 85"
              backgroundColor="#0a0a0a"
              colors={['#ffffff', '#f472b6', '#38bdf8']}
            >
              <div className="p-6 flex flex-col justify-between h-full">
                <div className="flex items-start justify-between gap-4">
                  <div className="liquid-glass h-11 w-11 rounded-[0.75rem] flex items-center justify-center flex-shrink-0 text-white">
                    <LightbulbIcon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-wrap gap-1.5 justify-end">
                    {['Cellular Bloom', 'Subtractive', 'Aperture', 'Negative Space'].map((tag) => (
                      <span
                        key={tag}
                        className="liquid-glass rounded-full px-3 py-1 text-[11px] text-white/90 font-body whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex-1 min-h-[48px]" />

                <div>
                  <h3 className="font-heading font-bold text-2xl md:text-3xl tracking-tight leading-none mb-3 text-white">
                    Growth & Void
                  </h3>
                  <p className="text-sm text-white/90 font-body font-light leading-snug max-w-[32ch]">
                    자라나는 유기적 오픈워크 격자와 비워냄으로써 완성되는 감산 조형. 신체라는 지형 위에 놓이는 미세 건축.
                  </p>
                </div>
              </div>
            </BorderGlow>

          </div>

        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 3: STORE & COLLECTION                            */}
      {/* ======================================================== */}
      <LiquidGlassStore />

      {/* ======================================================== */}
      {/* SECTION 4: CASE R2 PACKAGING SIMULATOR                   */}
      {/* ======================================================== */}
      <LiquidGlassCase />

      {/* ======================================================== */}
      {/* SECTION 5: FOOTER & CREDITS                              */}
      {/* ======================================================== */}
      <LiquidGlassFooter />

      {/* ======================================================== */}
      {/* INTERACTIVE MODALS & DRAWERS                             */}
      {/* ======================================================== */}
      <LiquidGlassProductModal />
      <LiquidGlassCartDrawer />
      <LiquidGlassCheckoutModal />
      <LiquidGlassFilmModal isOpen={isFilmOpen} onClose={() => setIsFilmOpen(false)} />

    </div>
  );
};
