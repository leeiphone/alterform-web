import React, { useState } from 'react';
import { Layers, Box, ImageIcon } from 'lucide-react';
import { BorderGlow } from './BorderGlow';
import { LiquidGlassModelViewer } from './LiquidGlassModelViewer';

const CASE_PHOTOS = [
  {
    id: 'hero',
    label: 'DUO SPECIMEN',
    labelKr: '듀오 거치 뷰',
    image: '/assets/case/case-hero-duo.png',
    badge: 'SPECIMEN SET',
    desc: '상단 반투명 리드와 4구 네오디뮴 마그네틱 결합 베이스. 중앙 46mm 벨벳 코어에 반지가 안착되어 미니멀한 조형적 긴장감을 연출합니다.'
  },
  {
    id: 'diffusion',
    label: 'FROSTED DIFFUSION',
    labelKr: '상단 산란 뷰',
    image: '/assets/case/case-closed-top.png',
    badge: 'OPTICAL DIFFUSION',
    desc: '72mm 정육면체 기하학 모놀리스. 반투명 프로스트 외피가 빛을 머금어 내부 벨벳과 반지의 실루엣을 수묵화처럼 은은하게 투과시킵니다.'
  },
  {
    id: 'base',
    label: 'MAGNETIC BASE',
    labelKr: '마그네틱 베이스',
    image: '/assets/case/case-base-open.png',
    badge: 'MAGNETIC FASTENING',
    desc: '정밀 가공된 46mm Oblate Velvet Bowl과 코너 4구 네오디뮴 마그네틱 모듈. 신속하고 견고한 밀폐와 충격 흡수를 제공합니다.'
  }
];

export const LiquidGlassCase: React.FC = () => {
  const [viewMode, setViewMode] = useState<'PHOTO' | '3D'>('PHOTO');
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const currentPhoto = CASE_PHOTOS[activePhotoIdx];

  return (
    <section id="case-r2" className="relative py-28 px-8 md:px-16 lg:px-20 max-w-7xl mx-auto w-full font-body text-white">
      {/* Header */}
      <div className="mb-16 text-left">
        <span className="text-sm text-white/70 mb-4 block tracking-widest font-mono">
          // UNIFIED PACKAGING ARCHITECTURE
        </span>
        <h2 className="font-heading font-bold text-5xl md:text-6xl lg:text-[5rem] leading-[0.95] tracking-tight text-white whitespace-pre-line">
          Case R2,{"\n"}Frosted Monolith
        </h2>
        <p className="text-white/75 text-sm md:text-base mt-4 max-w-2xl font-light leading-relaxed">
          모든 조형 축의 오브제를 아우르는 ALTERFORM의 단일 통합 시그니처 케이스. 반투명 기하학 프로스트 외피와 내부 블랙 벨벳 코어가 어우러져 일상 공간 속에서 독립된 미니멀 조각품이 됩니다.
        </p>
      </div>

      {/* Visualizer Box with BorderGlow */}
      <BorderGlow
        className="rounded-[1.75rem] shadow-2xl text-left"
        borderRadius={28}
        glowRadius={50}
        glowColor="210 30 90"
        colors={['#ffffff', '#e0f2fe', '#94a3b8']}
        backgroundColor="#0a0a0a"
      >
        <div className="p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
            {/* Left: 3D / Photo Showcase */}
            <div className="lg:col-span-6 aspect-square max-h-[460px] mx-auto w-full rounded-2xl liquid-glass bg-black/60 flex flex-col justify-between p-4 sm:p-6 relative overflow-hidden border border-white/15 shadow-2xl">
              
              {/* Top Bar with Mode Switcher */}
              <div className="w-full flex items-center justify-between z-20">
                <div className="font-mono text-[10px] text-white/50 tracking-widest flex items-center gap-2">
                  <span>CASE R2 // MONOLITH</span>
                  <span className="px-2 py-0.5 rounded-full text-[9px] bg-sky-500/20 text-sky-300 border border-sky-500/40 font-mono">
                    {viewMode === '3D' ? '3D REALTIME' : currentPhoto.badge}
                  </span>
                </div>

                {/* 3D / PHOTO Switcher */}
                <div className="flex items-center liquid-glass rounded-full p-0.5 border border-white/15 shadow-md">
                  <button
                    type="button"
                    onClick={() => setViewMode('3D')}
                    className={`px-3 py-1 rounded-full text-[10px] font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                      viewMode === '3D'
                        ? 'bg-white text-black font-semibold shadow'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <Box className="w-3 h-3 text-sky-400" />
                    <span>3D</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('PHOTO')}
                    className={`px-3 py-1 rounded-full text-[10px] font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                      viewMode === 'PHOTO'
                        ? 'bg-white text-black font-semibold shadow'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <ImageIcon className="w-3 h-3" />
                    <span>PHOTO</span>
                  </button>
                </div>
              </div>

              {/* Main Visual Content */}
              <div className="relative flex-1 w-full flex items-center justify-center my-2 overflow-hidden">
                {/* Ambient Soft Glow */}
                <div className="absolute w-60 h-60 rounded-full bg-white/10 blur-[90px] pointer-events-none" />

                {viewMode === '3D' ? (
                  <div className="w-full h-full relative z-10 flex items-center justify-center rounded-xl overflow-hidden">
                    <LiquidGlassModelViewer
                      modelUrl="/assets/models/case-r2.glb"
                      fallbackImage={currentPhoto.image}
                      showCeramicToggle={false}
                    />
                  </div>
                ) : (
                  <div className="w-full h-full relative z-10 flex items-center justify-center">
                    <img
                      key={currentPhoto.id}
                      src={currentPhoto.image}
                      alt={currentPhoto.label}
                      className="max-h-[340px] w-auto max-w-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)] animate-fade-in transition-all duration-500"
                    />
                  </div>
                )}
              </div>

              {/* Bottom Spec Footer inside Card */}
              <div className="w-full flex items-center justify-between z-20 pt-2 border-t border-white/10 text-[10px] font-mono text-white/50">
                <span>72 × 72 × 72 mm CUBE</span>
                <span>46mm VELVET CORE // 4 MAG-PINS</span>
              </div>
            </div>

            {/* Right: Controls & Details */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div>
                <span className="text-xs font-mono text-white/50 tracking-widest uppercase block">
                  STANDARD ARCHIVAL PACKAGING
                </span>
                <h3 className="font-heading font-bold text-3xl md:text-4xl tracking-tight text-white mt-1">
                  Universal Frosted Monolith
                </h3>
                <p className="text-xs text-white/60 font-mono mt-1">
                  전 라인업(5 Axes) 공용 단일 시그니처 케이스 & 3D 인터랙티브
                </p>
              </div>

              {/* Display Mode / Photo Selector */}
              <div>
                <div className="flex items-center justify-between text-xs text-white/50 mb-2 font-mono">
                  <div className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>케이스 뷰 선택 (SPECIMEN VIEWS)</span>
                  </div>
                  {viewMode === '3D' && (
                    <span className="text-[11px] text-sky-300 font-mono">
                      * 3D 실시간 렌더링 활성화됨
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  {CASE_PHOTOS.map((p, idx) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setActivePhotoIdx(idx);
                        setViewMode('PHOTO');
                      }}
                      className={`py-2.5 px-3 rounded-full text-center transition-all cursor-pointer ${
                        viewMode === 'PHOTO' && idx === activePhotoIdx
                          ? 'bg-white text-black font-semibold shadow-lg'
                          : 'liquid-glass text-white/70 hover:text-white'
                      }`}
                    >
                      <span className="text-[10px] block opacity-60 font-mono">0{idx + 1}</span>
                      <span className="text-[11px] font-medium block truncate">{p.labelKr}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Spec Details Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs font-light">
                <div className="liquid-glass p-4 rounded-xl border border-white/10">
                  <span className="text-white/50 text-[10px] font-mono block mb-1">외피 구조 (EXTERIOR SHELL)</span>
                  <span className="text-white font-normal block">72mm 기하학 패싯 프로스트 수지</span>
                  <span className="text-white/60 text-[11px] block mt-0.5">실크 매트 마감 & 챔퍼 엣지</span>
                </div>

                <div className="liquid-glass p-4 rounded-xl border border-white/10">
                  <span className="text-white/50 text-[10px] font-mono block mb-1">결합 방식 (FASTENING)</span>
                  <span className="text-white font-normal block">4구 네오디뮴 마그네틱 결합</span>
                  <span className="text-white/60 text-[11px] block mt-0.5">원터치 쾌속 개폐 & 정밀 안착</span>
                </div>

                <div className="liquid-glass p-4 rounded-xl border border-white/10">
                  <span className="text-white/50 text-[10px] font-mono block mb-1">내부 코어 (INTERNAL CORE)</span>
                  <span className="text-white font-normal block">46mm Oblate Velvet Cavity</span>
                  <span className="text-white/60 text-[11px] block mt-0.5">초미세 블랙 벨벳 완충 구조</span>
                </div>

                <div className="liquid-glass p-4 rounded-xl border border-white/10">
                  <span className="text-white/50 text-[10px] font-mono block mb-1">호환성 (COMPATIBILITY)</span>
                  <span className="text-white font-normal block">전 5개 축 링 완벽 호환</span>
                  <span className="text-white/60 text-[11px] block mt-0.5">단일 표준 규격 일괄 적용</span>
                </div>
              </div>

              {/* View Description */}
              <p className="text-sm text-white/80 leading-relaxed font-light min-h-[44px]">
                {viewMode === '3D'
                  ? '마우스로 72mm 기하학 패싯 큐브를 360° 자유롭게 회전하고 확대하여 프로스트 엣지와 조형적 비례를 실시간으로 탐색할 수 있습니다.'
                  : currentPhoto.desc}
              </p>

              {/* Footer Summary */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-white/60 border-t border-white/10 font-light font-mono">
                <span>규격: 72 × 72 × 72 mm // 46mm Oblate Cavity // 4-Point Magnetic</span>
                <span className="text-white font-medium bg-white/10 px-2.5 py-1 rounded-full text-[11px]">
                  전 제품 기본 포함
                </span>
              </div>
            </div>

          </div>
        </div>
      </BorderGlow>
    </section>
  );
};
