import React, { useState } from 'react';
import { Box, Eye } from 'lucide-react';

const CASE_VARIANTS = [
  {
    axis: 'STRUCTURE',
    exterior: '5mm 복셀 계단 & 상면 3단 테라스',
    opticalEffect: '벽 두께가 5mm 단위로 변화하여 계단형 띠 그라데이션 형성',
    blurAmount: 'blur-sm',
    gradient: 'from-black/80 via-black/40 to-transparent',
    desc: 'VOXEL STACK 문법을 외피에 적용. 서포트 없이 자체 자립하는 계단 구조가 빛을 층층이 굴절시킵니다.'
  },
  {
    axis: 'DISTORTION',
    exterior: '34mm 절단면에서 상부 12mm 전단 이동 & 8° 비틀림',
    opticalEffect: '수납 공동은 중앙에 고정되어 있으나 외피 기준 어긋나 보임',
    blurAmount: 'blur-md',
    gradient: 'from-black/90 via-black/50 to-transparent',
    desc: '평면으로 절단하여 어긋난 채 고정된 매스. 전단 변위가 내부 블랙 코어의 투과 위치를 극적으로 왜곡합니다.'
  },
  {
    axis: 'FLUID',
    exterior: '모서리만 남기고 면 전체가 한쪽 코너로 흘러내림',
    opticalEffect: '벽 두께의 연속적 변화로 가장 넓고 부드러운 앰비언트 번짐',
    blurAmount: 'blur-lg',
    gradient: 'from-black/95 via-black/30 to-transparent',
    desc: '가장 유려한 시그니처 케이스. 반투명 프로스트 벽 뒤로 블랙 벨벳 코어가 은은한 수묵화처럼 번져 나옵니다.'
  },
  {
    axis: 'GROWTH',
    exterior: '다양한 직경의 돔 5개가 곡선 배열로 융기',
    opticalEffect: '융기된 돔이 광학 렌즈가 되어 하나의 공동이 크기별로 반복 투영',
    blurAmount: 'blur-sm',
    gradient: 'from-black/70 via-black/30 to-transparent',
    desc: '피부 위에서 자라나는 세포 돔들이 빛을 집광하여 내부의 블랙 섀도우를 리드미컬하게 분할합니다.'
  },
  {
    axis: 'VOID',
    exterior: '16mm 관통 보어 3개 (공동에 인접하되 벨벳 미노출)',
    opticalEffect: '측면 보어로 빛이 유입되어 내부 검은 그림자를 갉아먹는 효과',
    blurAmount: 'blur-md',
    gradient: 'from-black/60 via-black/20 to-transparent',
    desc: '비워냄으로써 완성되는 조형. 관통된 구멍으로 빛이 직접 쏟아져 들어가 내부 블랙 매스를 시각적으로 소거합니다.'
  }
];

export const CaseSection: React.FC = () => {
  const [activeCaseIdx, setActiveCaseIdx] = useState(2); // Default to FLUID
  const currentCase = CASE_VARIANTS[activeCaseIdx];

  return (
    <section id="case" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-brand-border/60">
      
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <div className="flex items-center space-x-2 text-xs font-mono text-brand-plum tracking-widest uppercase mb-2">
          <Box className="w-3.5 h-3.5" />
          <span>02 / PACKAGING ARCHITECTURE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display">
          CASE R2 — FROSTED OPTICS
        </h2>
        <p className="text-brand-gray text-sm sm:text-base mt-2 font-light">
          프로스트 레진 외피의 두께 분포에 따라 내부 블랙 벨벳 공동(Bowl)이 서로 다르게 투과되는 광학 패키징 시스템.
        </p>
      </div>

      {/* Interactive Case Visualizer Box */}
      <div className="rounded-2xl border border-brand-border bg-brand-card overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10">
          
          {/* Left: Optical Diffusion Simulator */}
          <div className="lg:col-span-6 relative aspect-square max-h-[460px] mx-auto w-full bg-[#161A22] rounded-xl border border-brand-border flex items-center justify-center p-8 overflow-hidden group">
            
            {/* Frosted Resin Outer Cube Effect */}
            <div className="w-64 sm:w-72 h-64 sm:h-72 rounded-3xl border border-white/20 bg-white/5 backdrop-blur-xl relative shadow-[inset_0_0_30px_rgba(255,255,255,0.15)] flex items-center justify-center transition-all duration-700">
              
              {/* Highlight Refraction Rim */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-transparent via-white/10 to-white/30 pointer-events-none" />

              {/* Internal Fixed 46mm Oblate Velvet Cavity with Optical Blur Gradient */}
              <div 
                className={`w-36 h-36 rounded-full bg-black shadow-2xl transition-all duration-700 ${currentCase.blurAmount} opacity-85`}
              />

              {/* Surface Reflection Line */}
              <div className="absolute top-4 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />

              {/* Center Ring Indicator preview */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase">
                  {currentCase.axis} CORE
                </span>
              </div>
            </div>

            {/* Micro Spec Label */}
            <div className="absolute bottom-4 left-4 font-mono text-[10px] text-brand-muted tracking-widest">
              <span>MATERIAL: FROSTED 3D RESIN + BLACK VELVET</span>
            </div>

            <div className="absolute top-4 right-4 flex items-center gap-1.5 font-mono text-[10px] text-brand-gray tracking-wider">
              <Eye className="w-3.5 h-3.5 text-brand-plum" />
              <span>OPTICAL TRANSMISSION SIMULATION</span>
            </div>
          </div>

          {/* Right: Variant Selectors & Analysis */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div>
              <span className="text-xs font-mono text-brand-plum tracking-widest uppercase">
                5-AXIS CASE VARIATION
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                {currentCase.axis} EDITION
              </h3>
            </div>

            {/* Axis Selector Pills */}
            <div className="grid grid-cols-5 gap-2 font-mono text-xs">
              {CASE_VARIANTS.map((c, idx) => (
                <button
                  key={c.axis}
                  onClick={() => setActiveCaseIdx(idx)}
                  className={`py-2 rounded border text-center transition-all ${
                    idx === activeCaseIdx
                      ? 'border-brand-plum bg-brand-plum/20 text-brand-white font-bold'
                      : 'border-brand-border bg-brand-steel/40 text-brand-gray hover:text-white'
                  }`}
                >
                  <span className="text-[10px] block opacity-70">0{idx + 1}</span>
                  <span className="text-[11px] truncate block">{c.axis}</span>
                </button>
              ))}
            </div>

            {/* Spec Details */}
            <div className="space-y-4 pt-2 font-mono text-xs">
              <div className="p-3.5 rounded-lg bg-brand-steel/60 border border-brand-border/80">
                <span className="text-brand-muted text-[10px] block mb-1">외피 구조 (EXTERIOR SHELL)</span>
                <span className="text-brand-white font-medium">{currentCase.exterior}</span>
              </div>

              <div className="p-3.5 rounded-lg bg-brand-steel/60 border border-brand-border/80">
                <span className="text-brand-muted text-[10px] block mb-1">광학 투과 효과 (OPTICAL DIFFUSION)</span>
                <span className="text-brand-white font-medium">{currentCase.opticalEffect}</span>
              </div>
            </div>

            <p className="text-sm text-brand-gray leading-relaxed font-light">
              {currentCase.desc}
            </p>

            <div className="pt-2 flex items-center justify-between text-xs font-mono text-brand-muted border-t border-brand-border/60">
              <span>공동 규격: 46mm Oblate Cavity (고정)</span>
              <span className="text-brand-plum">기본 패키지 포함</span>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
