import React, { useState } from 'react';
import { 
  Printer, 
  ExternalLink, 
  Copy, 
  Check, 
  Sparkles, 
  ArrowUpRight
} from 'lucide-react';

export const BrochurePreview: React.FC<{ onBackToWeb: () => void }> = ({ onBackToWeb }) => {
  const [activeTab, setActiveTab] = useState<'spread' | 'single'>('spread');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [copiedFigmaGuide, setCopiedFigmaGuide] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(0.9);

  const handlePrint = () => {
    window.print();
  };

  const copyFigmaTokens = () => {
    const tokens = `/* ALTERFORM Brochure Design System Tokens */
Primary Canvas: #090A0D (Rich Black / C75 M68 Y67 K90)
Surface / Card: rgba(255, 255, 255, 0.03) with 1px stroke rgba(255, 255, 255, 0.12)
Liquid Glass Badge: Background #FFFFFF08, Blur 24px, Border 1px #FFFFFF30, Corner Radius 999px
Primary Text: #FFFFFF (Pretendard Variable / Inter Bold)
Secondary Text: #A1A7B5 (Pretendard Light)
Accent Text: #727B8E (JetBrains Mono / Code font)
Highlight Specular: #E2E8F0
5 Axes: STRUCTURE(01), DISTORTION(02), FLUID(03-Signature), GROWTH(04), VOID(05)`;
    navigator.clipboard.writeText(tokens);
    setCopiedFigmaGuide(true);
    setTimeout(() => setCopiedFigmaGuide(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#07080a] text-white font-sans selection:bg-white selection:text-black">
      {/* ======================================================== */}
      {/* TOP CONTROL BAR (Screen Only, Not Printed)              */}
      {/* ======================================================== */}
      <header className="print:hidden sticky top-0 z-50 backdrop-blur-xl bg-black/80 border-b border-white/10 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBackToWeb}
            className="flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 transition-colors text-white/80 hover:text-white"
          >
            ← 알터폼 웹사이트로 돌아가기
          </button>
          <div className="h-4 w-px bg-white/20 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <h1 className="text-sm font-semibold tracking-wide text-white">
              ALTERFORM 국민일름보 도록 시안 (Web-to-Print Spec)
            </h1>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/10 text-white/70">
              A4 4-Page / 2-Spread
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-white/5 rounded-lg p-0.5 border border-white/10 text-xs font-mono">
            <button
              onClick={() => setActiveTab('spread')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                activeTab === 'spread' 
                  ? 'bg-white text-black font-medium shadow' 
                  : 'text-white/60 hover:text-white'
              }`}
            >
              2-Page Spread (좌우 펼침)
            </button>
            <button
              onClick={() => setActiveTab('single')}
              className={`px-3 py-1.5 rounded-md transition-all ${
                activeTab === 'single' 
                  ? 'bg-white text-black font-medium shadow' 
                  : 'text-white/60 hover:text-white'
              }`}
            >
              Single Page (낱단면)
            </button>
          </div>

          {/* Zoom Selector */}
          <div className="hidden lg:flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs font-mono text-white/70">
            <span>배율:</span>
            {[0.75, 0.9, 1.0].map((level) => (
              <button
                key={level}
                onClick={() => setZoomLevel(level)}
                className={`px-2 py-0.5 rounded ${zoomLevel === level ? 'bg-white/20 text-white font-bold' : 'hover:bg-white/10'}`}
              >
                {Math.round(level * 100)}%
              </button>
            ))}
          </div>

          {/* Figma Tokens Copy */}
          <button
            onClick={copyFigmaTokens}
            className="flex items-center gap-1.5 text-xs font-mono bg-white/10 hover:bg-white/20 border border-white/15 px-3 py-1.5 rounded-lg transition-all"
            title="피그마 스타일 토큰 복사"
          >
            {copiedFigmaGuide ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedFigmaGuide ? '토큰 복사됨' : 'Figma 토큰 복사'}</span>
          </button>

          {/* Print / Save PDF Button */}
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 text-xs font-medium bg-white text-black hover:bg-white/90 px-3.5 py-1.5 rounded-lg transition-all shadow-md shadow-white/10"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>PDF 저장 / 인쇄</span>
          </button>
        </div>
      </header>

      {/* ======================================================== */}
      {/* BROCHURE DISPLAY CANVAS                                 */}
      {/* ======================================================== */}
      <main className="p-6 md:p-10 flex flex-col items-center justify-center overflow-x-auto">
        
        {/* Figma Quick Action Banner */}
        <div className="print:hidden w-full max-w-6xl mb-8 p-4 rounded-2xl bg-gradient-to-r from-blue-950/40 via-purple-950/30 to-black/60 border border-white/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <Sparkles className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white flex items-center gap-2">
                <span>피그마(Figma) 캔버스 이식 가이드</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  Figma Ready
                </span>
              </div>
              <p className="text-xs text-white/70 mt-0.5">
                국민일름보 도록 링크의 프레임 규격(A4 210×297mm 또는 스프레드 420×297mm)에 맞추어 레이아웃과 텍스트, 에셋을 1:1로 피그마에 배치할 수 있도록 기획된 시안입니다.
              </p>
            </div>
          </div>
          <a
            href="https://www.figma.com/design/lB70l5bGLODonZ3eOj6mij/%EA%B5%AD%EB%AF%BC%EC%9D%BC%EB%A6%84%EB%B3%B4-%EB%8F%84%EB%A1%9D%EC%9A%A9?node-id=88-369"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-black font-semibold transition-all shadow-lg shrink-0"
          >
            <span>피그마 파일 열기</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Scale Container */}
        <div 
          className="transition-transform duration-300 origin-top flex flex-col items-center gap-12"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {activeTab === 'spread' ? (
            <>
              {/* ======================================================== */}
              {/* SPREAD 1: SPREAD A (PAGE 1 - INTRO COVER & PAGE 2 - 5 AXES) */}
              {/* ======================================================== */}
              <div className="flex flex-col items-center">
                <div className="print:hidden text-xs font-mono text-white/50 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white/40" />
                  <span>SPREAD 01 // FRONT COVER & 5 AXES SYSTEM MAP (420 × 297 mm)</span>
                </div>
                
                <div className="w-[1190px] h-[842px] bg-[#090A0D] border border-white/20 shadow-2xl rounded-sm flex overflow-hidden relative print:border-none print:shadow-none print:w-[420mm] print:h-[297mm]">
                  {/* Left: PAGE 01 - COVER & STATEMENT */}
                  <Page01Cover />

                  {/* Center Fold Line */}
                  <div className="w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent z-30 relative">
                    <div className="absolute top-4 -left-3 text-[9px] font-mono text-white/30 rotate-90 select-none">
                      FOLD LINE (중앙 접지선)
                    </div>
                  </div>

                  {/* Right: PAGE 02 - 5 AXES SYSTEM MAP */}
                  <Page02Axes />
                </div>
              </div>

              {/* ======================================================== */}
              {/* SPREAD 2: SPREAD B (PAGE 3 - SIGNATURE HERO & PAGE 4 - ARCHITECTURE) */}
              {/* ======================================================== */}
              <div className="flex flex-col items-center mt-6">
                <div className="print:hidden text-xs font-mono text-white/50 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white/40" />
                  <span>SPREAD 02 // SIGNATURE FLUID HERO & TECHNICAL CASE R2 (420 × 297 mm)</span>
                </div>

                <div className="w-[1190px] h-[842px] bg-[#090A0D] border border-white/20 shadow-2xl rounded-sm flex overflow-hidden relative print:border-none print:shadow-none print:w-[420mm] print:h-[297mm] print:break-before-page">
                  {/* Left: PAGE 03 - SIGNATURE FLUID FOCUS */}
                  <Page03Fluid />

                  {/* Center Fold Line */}
                  <div className="w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent z-30 relative">
                    <div className="absolute top-4 -left-3 text-[9px] font-mono text-white/30 rotate-90 select-none">
                      FOLD LINE (중앙 접지선)
                    </div>
                  </div>

                  {/* Right: PAGE 04 - CASE R2 & SPEC EPILOGUE */}
                  <Page04Case />
                </div>
              </div>
            </>
          ) : (
            /* Single Page View (P1, P2, P3, P4 Carousel or Stack) */
            <div className="flex flex-col gap-10">
              <div className="flex justify-center gap-2 mb-2 print:hidden font-mono text-xs">
                {[1, 2, 3, 4].map((p) => (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    className={`px-4 py-2 rounded-lg border ${
                      currentPage === p 
                        ? 'bg-white text-black font-bold border-white' 
                        : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/15'
                    }`}
                  >
                    Page {p} ({p === 1 ? 'Cover' : p === 2 ? '5 Axes' : p === 3 ? 'FLUID 01' : 'Case R2'})
                  </button>
                ))}
              </div>

              <div className="w-[595px] h-[842px] bg-[#090A0D] border border-white/20 shadow-2xl rounded-sm overflow-hidden relative print:border-none print:shadow-none">
                {currentPage === 1 && <Page01Cover isSingle />}
                {currentPage === 2 && <Page02Axes isSingle />}
                {currentPage === 3 && <Page03Fluid isSingle />}
                {currentPage === 4 && <Page04Case isSingle />}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

/* ========================================================================= */
/* PAGE 01: FRONT COVER & BRAND STATEMENT                                   */
/* ========================================================================= */
const Page01Cover: React.FC<{ isSingle?: boolean }> = () => {
  return (
    <div className="w-[595px] h-[842px] p-10 flex flex-col justify-between relative bg-radial-gradient overflow-hidden">
      {/* Background Architectural Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #fff 1px, transparent 1px),
            linear-gradient(to bottom, #fff 1px, transparent 1px)
          `,
          backgroundSize: '36px 36px'
        }}
      />

      {/* Decorative Technical Crosshairs */}
      <div className="absolute top-8 left-8 text-white/20 font-mono text-[10px]">+ [0, 0]</div>
      <div className="absolute top-8 right-8 text-white/20 font-mono text-[10px]">[210, 0] +</div>
      <div className="absolute bottom-8 left-8 text-white/20 font-mono text-[10px]">+ [0, 297]</div>
      <div className="absolute bottom-8 right-8 text-white/20 font-mono text-[10px]">[210, 297] +</div>

      {/* Top Technical Header (Web Bar Feel) */}
      <div className="relative z-10 flex items-center justify-between border-b border-white/15 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-white/80" />
          <span className="font-mono text-[11px] tracking-widest text-white/90 uppercase">
            ALTERFORM // ARCHIVAL SPEC 2026
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono text-white/50">
          <span>CATALOG NO.</span>
          <span className="px-1.5 py-0.5 rounded bg-white/10 text-white/90">AF-CAT-01</span>
        </div>
      </div>

      {/* Hero Visual Block */}
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center py-6">
        {/* Glow behind ring */}
        <div className="absolute w-72 h-72 rounded-full bg-white/5 blur-3xl pointer-events-none" />

        {/* Ring Hero Visual */}
        <div className="relative w-72 h-72 flex items-center justify-center">
          <img 
            src="/assets/rings/fluid-tidal-fold.png" 
            alt="ALTERFORM Signature Ring" 
            className="w-full h-full object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.9)]"
          />
          {/* Circular Coordinate Callout */}
          <div className="absolute -top-1 -right-2 border border-white/20 rounded-full px-2.5 py-1 backdrop-blur-md bg-white/5 text-[9px] font-mono text-white/80 flex items-center gap-1.5 shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            <span>AF-R03-FL // PURE WHITE ZIRCONIA</span>
          </div>
        </div>

        {/* Headline */}
        <div className="text-center mt-4">
          <div className="inline-block px-3 py-1 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-[10px] font-mono tracking-widest text-white/80 mb-3">
            WEARABLE SCULPTURES FOR THE HUMAN LANDSCAPE
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white leading-tight font-sans">
            FAMILIAR, ALTERED.
          </h2>
          <p className="text-sm font-light text-white/60 tracking-wider mt-1">
            익숙한 장신구를 해체하고 재구축하는 미세 건축
          </p>
        </div>
      </div>

      {/* Bottom Information Grid */}
      <div className="relative z-10 border-t border-white/15 pt-5 flex flex-col gap-4">
        {/* Brand Statement Paragraph */}
        <p className="text-[11.5px] leading-relaxed text-white/70 font-light text-justify">
          ALTERFORM은 손가락과 신체를 하나의 지형으로 파악합니다. 고온(1450℃)에서 소결된 고밀도 파인 지르코니아 세라믹과 첨단 3D 적층 제조 기술을 결합하여, 유려한 곡선과 기하학적 건축 구조가 공존하는 5가지 조형 시스템을 선보입니다.
        </p>

        {/* Web Connect QR & Metadata Bar */}
        <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-lg p-1 flex items-center justify-center shrink-0">
              {/* QR Mockup */}
              <div className="w-full h-full border border-black flex flex-col justify-between p-0.5">
                <div className="flex justify-between">
                  <div className="w-3 h-3 bg-black" />
                  <div className="w-3 h-3 bg-black" />
                </div>
                <div className="text-[6px] font-mono text-black text-center font-bold">AF-WEB</div>
                <div className="flex justify-between">
                  <div className="w-3 h-3 bg-black" />
                  <div className="w-2 h-2 bg-black" />
                </div>
              </div>
            </div>
            <div>
              <div className="text-[11px] font-semibold text-white flex items-center gap-1.5">
                <span>인터랙티브 3D 쇼룸 연결</span>
                <ArrowUpRight className="w-3 h-3 text-white/70" />
              </div>
              <div className="text-[10px] text-white/50 font-mono mt-0.5">
                QR을 스캔하여 3D 뷰어와 영상 아카이브를 감상하세요
              </div>
            </div>
          </div>

          <div className="text-right font-mono text-[9px] text-white/40">
            <div>EXHIBITION : 2026 국민일름보</div>
            <div>DESIGNER : ALTERFORM LAB</div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ========================================================================= */
/* PAGE 02: 5 AXES SYSTEM MAP (DESIGN SYSTEM OVERVIEW)                       */
/* ========================================================================= */
const Page02Axes: React.FC<{ isSingle?: boolean }> = () => {
  const axes = [
    {
      num: '01',
      key: 'STRUCTURE',
      nameKr: '질서 · 건축',
      concept: 'ORDER & GEOMETRY',
      img: '/assets/rings/structure-radial-frame.png',
      keywords: 'Louver · Cantilever · Column',
      desc: '손가락을 구조를 지탱하는 기둥이자 통과점으로 해석하는 기하학적 단계. 정밀한 평행 루버 슬릿이 손 위에 미세 건축을 형성합니다.'
    },
    {
      num: '02',
      key: 'DISTORTION',
      nameKr: '변형 · 비대칭',
      concept: 'FORCE & TENSION',
      img: '/assets/rings/distortion-compression-fault.png',
      keywords: 'Surge · Ridge · Crest',
      desc: '안정된 원형에 외력이 가해져 솟구치고 팽창하는 긴장의 단계. 예측 불가능한 조형적 파동을 유발합니다.'
    },
    {
      num: '03',
      key: 'FLUID ★',
      nameKr: '흐름 · 용해 (시그니처)',
      concept: 'MELT & FLOW',
      img: '/assets/rings/fluid-tidal-fold.png',
      keywords: 'Tidal Fold · Drape · Silk',
      isSig: true,
      desc: '단단한 세라믹이 액체처럼 흘러내려 굳은 형태. 유려한 패브릭 드레이프 주름이 손을 감싸는 핵심 시그니처.'
    },
    {
      num: '04',
      key: 'GROWTH',
      nameKr: '성장 · 증식',
      concept: 'ORGANIC ACCRETION',
      img: '/assets/rings/growth-cellular-bloom.png',
      keywords: 'Coral · Branch · Lattice',
      desc: '적층 제조 특유의 유기적 분기형 오픈워크. 산호와 식물 줄기가 피부 위에서 자라나듯 유기적 네트워크 형성.'
    },
    {
      num: '05',
      key: 'VOID',
      nameKr: '비움 · 관통',
      concept: 'SUBTRACTIVE SPACE',
      img: '/assets/rings/void-triple-bore.png',
      keywords: 'Aperture · Slot · Bore',
      desc: '형태를 덜어낸 네거티브 스페이스와 정밀하게 관통된 애퍼처가 비워냄으로써 비로소 완성되는 긴장감.'
    }
  ];

  return (
    <div className="w-[595px] h-[842px] p-10 flex flex-col justify-between relative bg-[#090A0D]">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/15 pb-4">
        <div>
          <div className="text-[10px] font-mono text-white/50 tracking-widest uppercase">
            DESIGN PHILOSOPHY & SYSTEM
          </div>
          <h3 className="text-base font-bold text-white tracking-tight mt-0.5">
            5 CORE DESIGN AXES // 조형의 5대 축
          </h3>
        </div>
        <div className="px-2.5 py-1 rounded-full bg-white/5 border border-white/15 text-[10px] font-mono text-white/70">
          AXIS 01 ~ 05
        </div>
      </div>

      {/* Axis Cards List (Interactive Web-card feel) */}
      <div className="flex flex-col gap-3 my-auto py-2">
        {axes.map((ax) => (
          <div 
            key={ax.key}
            className={`p-3.5 rounded-xl border flex items-center gap-4 transition-all ${
              ax.isSig 
                ? 'bg-gradient-to-r from-white/[0.08] to-white/[0.02] border-white/40 shadow-lg' 
                : 'bg-white/[0.02] border-white/10'
            }`}
          >
            {/* Axis Ring Thumbnail */}
            <div className="w-16 h-16 rounded-lg bg-black/60 border border-white/10 p-1 flex items-center justify-center shrink-0 overflow-hidden relative">
              <img 
                src={ax.img} 
                alt={ax.key} 
                className="w-full h-full object-contain filter drop-shadow"
              />
              {ax.isSig && (
                <span className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-white" />
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-white/90">{ax.num}</span>
                  <span className="text-xs font-bold tracking-wider text-white font-mono">{ax.key}</span>
                  <span className="text-[10px] text-white/50">{ax.nameKr}</span>
                </div>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/60 border border-white/10">
                  {ax.concept}
                </span>
              </div>

              <div className="text-[10px] font-mono text-white/50 mt-1">
                {ax.keywords}
              </div>

              <p className="text-[10.5px] leading-relaxed text-white/70 font-light mt-1">
                {ax.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Page Footer */}
      <div className="border-t border-white/15 pt-4 flex items-center justify-between font-mono text-[9px] text-white/40">
        <span>02 // THE 5-AXIS SYSTEM MAP</span>
        <span>ALTERFORM WEARABLE SCULPTURES</span>
      </div>
    </div>
  );
};

/* ========================================================================= */
/* PAGE 03: SIGNATURE FOCUS - AF-R03-FL / TIDAL FOLD                         */
/* ========================================================================= */
const Page03Fluid: React.FC<{ isSingle?: boolean }> = () => {
  return (
    <div className="w-[595px] h-[842px] p-10 flex flex-col justify-between relative bg-[#090A0D]">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/15 pb-4">
        <div>
          <div className="text-[10px] font-mono text-white/50 tracking-widest uppercase">
            SIGNATURE MASTERPIECE
          </div>
          <h3 className="text-base font-bold text-white tracking-tight mt-0.5">
            FLUID 01 // TIDAL FOLD
          </h3>
        </div>
        <div className="px-3 py-1 rounded-full bg-white text-black font-mono text-[10px] font-bold">
          AXIS 03 : SIGNATURE
        </div>
      </div>

      {/* Main Focus Visual */}
      <div className="relative my-auto flex flex-col items-center">
        {/* Large Signature Visual */}
        <div className="relative w-80 h-72 flex items-center justify-center">
          <div className="absolute inset-0 bg-radial-gradient from-white/10 to-transparent blur-2xl" />
          <img 
            src="/assets/rings/fluid-tidal-fold.png" 
            alt="FLUID 01 TIDAL FOLD" 
            className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)]"
          />
          {/* Tag Pill */}
          <div className="absolute bottom-2 left-4 px-3 py-1 rounded-full bg-white/10 border border-white/25 backdrop-blur-md text-[9px] font-mono text-white">
            HARD MATERIAL. SOFT FORM.
          </div>
        </div>

        {/* 3-View Angle Strip (Web 3D Viewer Feel) */}
        <div className="w-full mt-4 grid grid-cols-3 gap-2.5">
          <div className="p-2 rounded-lg bg-white/[0.03] border border-white/10 text-center">
            <div className="h-16 flex items-center justify-center">
              <img src="/assets/rings/coral_bore_after.png" alt="Angle 1" className="h-14 object-contain" />
            </div>
            <div className="text-[9px] font-mono text-white/60 mt-1">ANGLE 01 // TOP-VIEW</div>
          </div>
          <div className="p-2 rounded-lg bg-white/[0.03] border border-white/10 text-center">
            <div className="h-16 flex items-center justify-center">
              <img src="/assets/rings/coral_edge_after.png" alt="Angle 2" className="h-14 object-contain" />
            </div>
            <div className="text-[9px] font-mono text-white/60 mt-1">ANGLE 02 // OBLIQUE</div>
          </div>
          <div className="p-2 rounded-lg bg-white/[0.03] border border-white/10 text-center">
            <div className="h-16 flex items-center justify-center">
              <img src="/assets/rings/leaf_bore_after.png" alt="Angle 3" className="h-14 object-contain" />
            </div>
            <div className="text-[9px] font-mono text-white/60 mt-1">ANGLE 03 // BORE FIT</div>
          </div>
        </div>

        {/* Technical Specification Table */}
        <div className="w-full mt-5 rounded-xl border border-white/15 bg-white/[0.02] p-3.5">
          <div className="text-[10px] font-mono text-white/40 mb-2 border-b border-white/10 pb-1 flex justify-between">
            <span>ENGINEERING & CRAFT SPECIFICATION</span>
            <span>AF-R03-FL</span>
          </div>
          <div className="grid grid-cols-2 gap-y-2 text-[10.5px]">
            <div>
              <span className="text-white/40 font-mono text-[9.5px] block">MATERIAL</span>
              <span className="text-white font-medium">Pure White Zirconia Ceramic (高密度)</span>
            </div>
            <div>
              <span className="text-white/40 font-mono text-[9.5px] block">MANUFACTURING</span>
              <span className="text-white font-medium">High Precision SLS & 1450℃ Sintering</span>
            </div>
            <div>
              <span className="text-white/40 font-mono text-[9.5px] block">SURFACE FINISH</span>
              <span className="text-white font-medium">Hand Buffed Soft Satin Specular Polish</span>
            </div>
            <div>
              <span className="text-white/40 font-mono text-[9.5px] block">WEIGHT & SIZE</span>
              <span className="text-white font-medium">8.4g (15호 기준) / 9 ~ 25호 맞춤제작</span>
            </div>
          </div>
        </div>
      </div>

      {/* Page Footer */}
      <div className="border-t border-white/15 pt-4 flex items-center justify-between font-mono text-[9px] text-white/40">
        <span>03 // SIGNATURE OBJECT ARCHIVE</span>
        <span>ALTERFORM WEARABLE SCULPTURES</span>
      </div>
    </div>
  );
};

/* ========================================================================= */
/* PAGE 04: ARCHITECTURAL CASE R2 & SPEC EPILOGUE                           */
/* ========================================================================= */
const Page04Case: React.FC<{ isSingle?: boolean }> = () => {
  return (
    <div className="w-[595px] h-[842px] p-10 flex flex-col justify-between relative bg-[#090A0D]">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/15 pb-4">
        <div>
          <div className="text-[10px] font-mono text-white/50 tracking-widest uppercase">
            ARCHITECTURAL STORAGE
          </div>
          <h3 className="text-base font-bold text-white tracking-tight mt-0.5">
            CASE R2 // 미세 건축을 담는 모듈러 케이스
          </h3>
        </div>
        <div className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-mono text-white/70">
          AF-PKG-R2
        </div>
      </div>

      {/* Case Visual */}
      <div className="my-auto flex flex-col items-center">
        <div className="w-full h-52 flex items-center justify-center p-2 rounded-xl bg-white/[0.02] border border-white/10 relative overflow-hidden">
          <img 
            src="/assets/case/case-hero-duo.png" 
            alt="ALTERFORM CASE R2" 
            className="h-full object-contain filter drop-shadow-xl"
          />
          <div className="absolute top-2 right-2 text-[9px] font-mono text-white/40">
            MAGNETIC DUAL MODULE
          </div>
        </div>

        <p className="text-[11px] leading-relaxed text-white/70 mt-4 text-justify font-light">
          반지를 보관하는 단순한 패키지를 넘어, 신체에서 벗어났을 때에도 조각품 그 자체로서 공간에 거주할 수 있도록 설계된 전용 거치 케이스입니다. 정밀 자석 결합 힌지와 미세 공차 결합으로 완벽한 보호성과 건축적 비례감을 완성합니다.
        </p>

        {/* Brand Colophon & Exhibition Info */}
        <div className="w-full mt-6 p-4 rounded-xl border border-white/15 bg-white/[0.03] flex flex-col gap-3 font-mono text-[10px]">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-white/50">BRAND ARCHIVE</span>
            <span className="text-white font-bold">ALTERFORM (알터폼)</span>
          </div>
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-white/50">EXHIBITION VENUE</span>
            <span className="text-white">국민대학교 조형대학 졸업작품전 도록</span>
          </div>
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-white/50">TECHNOLOGY</span>
            <span className="text-white">3D Ceramic SLS · 1450℃ High Sintering</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-white/50">DIGITAL ARCHIVE</span>
            <span className="text-sky-300">https://alterform.store</span>
          </div>
        </div>
      </div>

      {/* Back Cover Stamp */}
      <div className="border-t border-white/15 pt-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img 
            src="/assets/logo/alterform-hero-logo.png" 
            alt="ALTERFORM Logo" 
            className="h-6 w-auto mix-blend-screen opacity-90"
          />
        </div>
        <div className="font-mono text-[9px] text-white/40 text-right">
          <div>© 2026 ALTERFORM ALL RIGHTS RESERVED.</div>
          <div>PRINT SPEC : 210 × 297 mm (A4 4P SPREAD)</div>
        </div>
      </div>
    </div>
  );
};
