import base64
import os

def get_b64(path):
    if not os.path.exists(path):
        return ""
    with open(path, 'rb') as f:
        return 'data:image/png;base64,' + base64.b64encode(f.read()).decode('utf-8')

# Assets
b64_fluid = get_b64('public/assets/rings/fluid-tidal-fold.png')
b64_structure = get_b64('public/assets/rings/structure-radial-frame.png')
b64_distortion = get_b64('public/assets/rings/distortion-compression-fault.png')
b64_growth = get_b64('public/assets/rings/growth-cellular-bloom.png')
b64_void = get_b64('public/assets/rings/void-triple-bore.png')
b64_case = get_b64('public/assets/case/case-hero-duo.png')
b64_logo = get_b64('public/assets/logo/alterform-hero-logo.png')
b64_angle1 = get_b64('public/assets/rings/coral_bore_after.png')
b64_angle2 = get_b64('public/assets/rings/coral_edge_after.png')
b64_angle3 = get_b64('public/assets/rings/leaf_bore_after.png')

print("Assets encoded successfully.")

# 1. Generate standalone preview HTML that can be double clicked in Finder
html_content = f'''<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>ALTERFORM 국민일름보 도록 시안 (A4 4-Page / 2-Spread)</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap');
    body {{
      font-family: 'Pretendard', sans-serif;
      background-color: #07080a;
      color: #f8fafc;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }}
    .font-mono {{ font-family: 'JetBrains Mono', monospace; }}
    @media print {{
      @page {{ size: A4 landscape; margin: 0; }}
      body {{ background-color: #090A0D !important; }}
      .no-print {{ display: none !important; }}
      .page-spread {{
        width: 420mm !important;
        height: 297mm !important;
        page-break-after: always;
        break-after: page;
        border: none !important;
        box-shadow: none !important;
        margin: 0 !important;
      }}
    }}
  </style>
</head>
<body class="p-6 md:p-10 flex flex-col items-center">

  <!-- Header Banner -->
  <header class="no-print w-full max-w-[1190px] mb-8 p-6 rounded-2xl bg-[#12151b] border border-white/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xl">
    <div>
      <div class="flex items-center gap-2 mb-1">
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
        <span class="text-xs font-mono uppercase tracking-widest text-sky-400 font-bold">ALTERFORM × 국민일름보 도록 시안</span>
      </div>
      <h1 class="text-xl font-bold text-white tracking-tight">웹의 감각을 살린 지르코니아 세라믹 4-Page / 2-Spread 도록 시안</h1>
      <p class="text-xs text-white/60 mt-1">인쇄용 판형: A4 210×297mm (펼침면 420×297mm) · 리치블랙 & 액체 유리 캡슐 & 테크니컬 스펙 그리드</p>
    </div>
    <div class="flex items-center gap-3">
      <button onclick="window.print()" class="px-4 py-2.5 rounded-xl bg-white text-black font-semibold text-xs flex items-center gap-2 hover:bg-white/90 shadow-lg cursor-pointer">
        <span>🖨️ PDF 저장 / 인쇄하기</span>
      </button>
      <a href="https://www.figma.com/design/lB70l5bGLODonZ3eOj6mij/%EA%B5%AD%EB%AF%BC%EC%9D%BC%EB%A6%84%EB%B3%B4-%EB%8F%84%EB%A1%9D%EC%9A%A9?node-id=88-369" target="_blank" class="px-4 py-2.5 rounded-xl bg-[#0ea5e9] text-black font-bold text-xs flex items-center gap-1.5 hover:bg-[#38bdf8] shadow-lg">
        <span>피그마 링크 열기 ↗</span>
      </a>
    </div>
  </header>

  <!-- Notice: Figma Direct Drop -->
  <div class="no-print w-full max-w-[1190px] mb-8 p-4 rounded-xl bg-sky-950/40 border border-sky-500/30 text-xs text-sky-200 flex items-center justify-between">
    <div class="flex items-center gap-3">
      <span class="text-base">💡</span>
      <span><strong>피그마(Figma)에 바로 넣는 방법:</strong> 같은 폴더에 생성된 <code>국민일름보_알터폼_스프레드01_시안.svg</code> 파일을 피그마 화면으로 드래그 앤 드롭하시면 캔버스에 시안 프레임이 즉시 생성됩니다!</span>
    </div>
  </div>

  <!-- SPREAD 1 (Page 1 + Page 2) -->
  <div class="mb-12 flex flex-col items-center">
    <div class="no-print text-xs font-mono text-white/50 mb-2 flex items-center gap-2">
      <span class="w-2 h-2 rounded-full bg-white/40"></span>
      <span>SPREAD 01 // FRONT COVER & 5 AXES SYSTEM MAP (420 × 297 mm)</span>
    </div>

    <div class="page-spread w-[1190px] h-[842px] bg-[#090A0D] border border-white/20 shadow-2xl rounded-sm flex overflow-hidden relative">
      
      <!-- PAGE 01 (Left: Cover & Statement) -->
      <div class="w-[595px] h-[842px] p-10 flex flex-col justify-between relative bg-[#090A0D]">
        <div class="flex items-center justify-between border-b border-white/15 pb-4">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-white"></span>
            <span class="font-mono text-[11px] tracking-widest text-white/90">ALTERFORM // ARCHIVAL SPEC 2026</span>
          </div>
          <span class="font-mono text-[10px] px-2 py-0.5 rounded bg-white/10 text-white/70">AF-CAT-01</span>
        </div>

        <!-- Center Ring Hero -->
        <div class="flex-1 flex flex-col items-center justify-center py-4 relative">
          <div class="w-72 h-72 relative flex items-center justify-center">
            <div class="absolute inset-0 bg-white/5 blur-3xl rounded-full"></div>
            <img src="{b64_fluid}" class="w-full h-full object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.9)]" alt="ALTERFORM Ring">
            <div class="absolute -top-1 -right-2 border border-white/20 rounded-full px-2.5 py-1 backdrop-blur-md bg-white/5 text-[9px] font-mono text-white/90 flex items-center gap-1.5 shadow-lg">
              <span class="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              <span>AF-R03-FL // PURE WHITE ZIRCONIA</span>
            </div>
          </div>
          <div class="text-center mt-3">
            <div class="inline-block px-3 py-1 rounded-full border border-white/20 bg-white/5 text-[10px] font-mono tracking-widest text-white/80 mb-2">
              WEARABLE SCULPTURES FOR THE HUMAN LANDSCAPE
            </div>
            <h2 class="text-3xl font-bold tracking-tight text-white leading-tight">FAMILIAR, ALTERED.</h2>
            <p class="text-xs font-light text-white/60 tracking-wider mt-1">익숙한 장신구를 해체하고 재구축하는 미세 건축</p>
          </div>
        </div>

        <!-- Bottom Statement -->
        <div class="border-t border-white/15 pt-4 flex flex-col gap-3">
          <p class="text-[11.5px] leading-relaxed text-white/70 font-light text-justify">
            ALTERFORM은 손가락과 신체를 하나의 지형으로 파악합니다. 고온(1450℃)에서 소결된 고밀도 파인 지르코니아 세라믹과 첨단 3D 적층 제조 기술을 결합하여, 유려한 곡선과 기하학적 건축 구조가 공존하는 5가지 조형 시스템을 선보입니다.
          </p>
          <div class="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-white rounded-lg p-1 flex items-center justify-center text-black font-mono font-bold text-[8px] text-center shrink-0">
                AF 3D WEB
              </div>
              <div>
                <div class="text-xs font-semibold text-white">인터랙티브 3D 쇼룸 연결</div>
                <div class="text-[10px] text-white/50 font-mono">QR 스캔으로 3D 뷰어와 영상 아카이브 감상</div>
              </div>
            </div>
            <div class="font-mono text-[9px] text-white/40 text-right">
              <div>국민대학교 조형대학</div>
              <div>2026 국민일름보</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Center Fold Line -->
      <div class="w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>

      <!-- PAGE 02 (Right: 5 Axes System Map) -->
      <div class="w-[595px] h-[842px] p-10 flex flex-col justify-between relative bg-[#090A0D]">
        <div class="flex items-center justify-between border-b border-white/15 pb-4">
          <div>
            <div class="text-[10px] font-mono text-white/50 tracking-widest uppercase">DESIGN PHILOSOPHY & SYSTEM</div>
            <h3 class="text-base font-bold text-white tracking-tight mt-0.5">5 CORE DESIGN AXES // 조형의 5대 축</h3>
          </div>
          <span class="px-2.5 py-1 rounded-full bg-white/5 border border-white/15 text-[10px] font-mono text-white/70">AXIS 01 ~ 05</span>
        </div>

        <!-- 5 Cards List -->
        <div class="flex flex-col gap-2.5 my-auto py-2">
          
          <!-- Card 1 -->
          <div class="p-3 rounded-xl border bg-white/[0.02] border-white/10 flex items-center gap-3.5">
            <div class="w-14 h-14 rounded-lg bg-black/60 border border-white/10 p-1 flex items-center justify-center shrink-0">
              <img src="{b64_structure}" class="w-full h-full object-contain">
            </div>
            <div class="flex-1">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="font-mono text-xs font-bold text-white">01</span>
                  <span class="text-xs font-bold font-mono text-white">STRUCTURE</span>
                  <span class="text-[10px] text-white/50">질서 · 건축</span>
                </div>
                <span class="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/60">ORDER & GEOMETRY</span>
              </div>
              <p class="text-[10px] leading-relaxed text-white/70 font-light mt-1">손가락을 구조를 지탱하는 기둥이자 통과점으로 해석하는 기하학적 단계. 정밀한 루버 슬릿 형성.</p>
            </div>
          </div>

          <!-- Card 2 -->
          <div class="p-3 rounded-xl border bg-white/[0.02] border-white/10 flex items-center gap-3.5">
            <div class="w-14 h-14 rounded-lg bg-black/60 border border-white/10 p-1 flex items-center justify-center shrink-0">
              <img src="{b64_distortion}" class="w-full h-full object-contain">
            </div>
            <div class="flex-1">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="font-mono text-xs font-bold text-white">02</span>
                  <span class="text-xs font-bold font-mono text-white">DISTORTION</span>
                  <span class="text-[10px] text-white/50">변형 · 비대칭</span>
                </div>
                <span class="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/60">FORCE & TENSION</span>
              </div>
              <p class="text-[10px] leading-relaxed text-white/70 font-light mt-1">안정된 원형에 외력이 가해져 솟구치고 팽창하는 긴장의 단계. 비대칭 팽창 리지의 파동.</p>
            </div>
          </div>

          <!-- Card 3 (Signature) -->
          <div class="p-3.5 rounded-xl border bg-white/[0.06] border-white/40 shadow-lg flex items-center gap-3.5">
            <div class="w-14 h-14 rounded-lg bg-black/60 border border-white/20 p-1 flex items-center justify-center shrink-0 relative">
              <span class="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-white"></span>
              <img src="{b64_fluid}" class="w-full h-full object-contain">
            </div>
            <div class="flex-1">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="font-mono text-xs font-bold text-white">03</span>
                  <span class="text-xs font-bold font-mono text-white">FLUID ★</span>
                  <span class="text-[10px] text-white/70">흐름 · 용해 (시그니처)</span>
                </div>
                <span class="text-[9px] font-mono px-2 py-0.5 rounded bg-white text-black font-bold">MELT & FLOW</span>
              </div>
              <p class="text-[10px] leading-relaxed text-white/90 font-light mt-1">단단한 세라믹이 액체처럼 흘러내려 굳은 형태. 유려한 패브릭 드레이프 주름이 손을 감싸는 핵심 시그니처.</p>
            </div>
          </div>

          <!-- Card 4 -->
          <div class="p-3 rounded-xl border bg-white/[0.02] border-white/10 flex items-center gap-3.5">
            <div class="w-14 h-14 rounded-lg bg-black/60 border border-white/10 p-1 flex items-center justify-center shrink-0">
              <img src="{b64_growth}" class="w-full h-full object-contain">
            </div>
            <div class="flex-1">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="font-mono text-xs font-bold text-white">04</span>
                  <span class="text-xs font-bold font-mono text-white">GROWTH</span>
                  <span class="text-[10px] text-white/50">성장 · 증식</span>
                </div>
                <span class="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/60">ORGANIC ACCRETION</span>
              </div>
              <p class="text-[10px] leading-relaxed text-white/70 font-light mt-1">산호와 식물 줄기가 피부 위에서 자라나듯 손가락을 따라 생명력 넘치는 유기적 네트워크 형성.</p>
            </div>
          </div>

          <!-- Card 5 -->
          <div class="p-3 rounded-xl border bg-white/[0.02] border-white/10 flex items-center gap-3.5">
            <div class="w-14 h-14 rounded-lg bg-black/60 border border-white/10 p-1 flex items-center justify-center shrink-0">
              <img src="{b64_void}" class="w-full h-full object-contain">
            </div>
            <div class="flex-1">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="font-mono text-xs font-bold text-white">05</span>
                  <span class="text-xs font-bold font-mono text-white">VOID</span>
                  <span class="text-[10px] text-white/50">비움 · 관통</span>
                </div>
                <span class="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/60">SUBTRACTIVE SPACE</span>
              </div>
              <p class="text-[10px] leading-relaxed text-white/70 font-light mt-1">형태를 덜어낸 네거티브 스페이스와 정밀하게 관통된 애퍼처가 비워냄으로써 완성되는 긴장감.</p>
            </div>
          </div>

        </div>

        <div class="border-t border-white/15 pt-4 flex items-center justify-between font-mono text-[9px] text-white/40">
          <span>02 // THE 5-AXIS SYSTEM MAP</span>
          <span>ALTERFORM WEARABLE SCULPTURES</span>
        </div>
      </div>

    </div>
  </div>

  <!-- SPREAD 2 (Page 3 + Page 4) -->
  <div class="mb-12 flex flex-col items-center">
    <div class="no-print text-xs font-mono text-white/50 mb-2 flex items-center gap-2">
      <span class="w-2 h-2 rounded-full bg-white/40"></span>
      <span>SPREAD 02 // SIGNATURE FLUID HERO & TECHNICAL CASE R2 (420 × 297 mm)</span>
    </div>

    <div class="page-spread w-[1190px] h-[842px] bg-[#090A0D] border border-white/20 shadow-2xl rounded-sm flex overflow-hidden relative">
      
      <!-- PAGE 03 (Left: Signature Hero) -->
      <div class="w-[595px] h-[842px] p-10 flex flex-col justify-between relative bg-[#090A0D]">
        <div class="flex items-center justify-between border-b border-white/15 pb-4">
          <div>
            <div class="text-[10px] font-mono text-white/50 tracking-widest uppercase">SIGNATURE MASTERPIECE</div>
            <h3 class="text-base font-bold text-white tracking-tight mt-0.5">FLUID 01 // TIDAL FOLD</h3>
          </div>
          <span class="px-3 py-1 rounded-full bg-white text-black font-mono text-[10px] font-bold">AXIS 03 : SIGNATURE</span>
        </div>

        <!-- Ring Big Visual -->
        <div class="flex flex-col items-center my-auto">
          <div class="relative w-80 h-64 flex items-center justify-center">
            <div class="absolute inset-0 bg-white/5 blur-3xl rounded-full"></div>
            <img src="{b64_fluid}" class="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.95)]" alt="FLUID 01">
            <div class="absolute bottom-1 left-4 px-3 py-1 rounded-full bg-white/10 border border-white/25 backdrop-blur-md text-[9px] font-mono text-white">
              HARD MATERIAL. SOFT FORM.
            </div>
          </div>

          <!-- 3-Angle View Strip -->
          <div class="w-full mt-3 grid grid-cols-3 gap-2">
            <div class="p-2 rounded-lg bg-white/[0.03] border border-white/10 text-center">
              <div class="h-14 flex items-center justify-center"><img src="{b64_angle1}" class="h-12 object-contain"></div>
              <div class="text-[8px] font-mono text-white/60 mt-1">ANGLE 01 // TOP-VIEW</div>
            </div>
            <div class="p-2 rounded-lg bg-white/[0.03] border border-white/10 text-center">
              <div class="h-14 flex items-center justify-center"><img src="{b64_angle2}" class="h-12 object-contain"></div>
              <div class="text-[8px] font-mono text-white/60 mt-1">ANGLE 02 // OBLIQUE</div>
            </div>
            <div class="p-2 rounded-lg bg-white/[0.03] border border-white/10 text-center">
              <div class="h-14 flex items-center justify-center"><img src="{b64_angle3}" class="h-12 object-contain"></div>
              <div class="text-[8px] font-mono text-white/60 mt-1">ANGLE 03 // BORE FIT</div>
            </div>
          </div>

          <!-- Specs Table -->
          <div class="w-full mt-4 rounded-xl border border-white/15 bg-white/[0.02] p-3 text-[10px]">
            <div class="text-[9px] font-mono text-white/40 mb-1.5 border-b border-white/10 pb-1 flex justify-between">
              <span>ENGINEERING SPECIFICATION</span>
              <span>AF-R03-FL</span>
            </div>
            <div class="grid grid-cols-2 gap-y-1.5">
              <div><span class="text-white/40 font-mono text-[9px] block">MATERIAL</span><span class="text-white">Pure White Zirconia Ceramic</span></div>
              <div><span class="text-white/40 font-mono text-[9px] block">MANUFACTURING</span><span class="text-white">Precision SLS & 1450℃ Sintering</span></div>
              <div><span class="text-white/40 font-mono text-[9px] block">SURFACE FINISH</span><span class="text-white">Hand Buffed Soft Satin Polish</span></div>
              <div><span class="text-white/40 font-mono text-[9px] block">WEIGHT & SIZE</span><span class="text-white">8.4g (15호) / 9~25호 맞춤제작</span></div>
            </div>
          </div>
        </div>

        <div class="border-t border-white/15 pt-4 flex items-center justify-between font-mono text-[9px] text-white/40">
          <span>03 // SIGNATURE OBJECT ARCHIVE</span>
          <span>ALTERFORM WEARABLE SCULPTURES</span>
        </div>
      </div>

      <!-- Center Fold Line -->
      <div class="w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>

      <!-- PAGE 04 (Right: Case R2 & Colophon) -->
      <div class="w-[595px] h-[842px] p-10 flex flex-col justify-between relative bg-[#090A0D]">
        <div class="flex items-center justify-between border-b border-white/15 pb-4">
          <div>
            <div class="text-[10px] font-mono text-white/50 tracking-widest uppercase">ARCHITECTURAL STORAGE</div>
            <h3 class="text-base font-bold text-white tracking-tight mt-0.5">CASE R2 // 미세 건축을 담는 모듈러 케이스</h3>
          </div>
          <span class="px-2 py-0.5 rounded bg-white/10 text-[10px] font-mono text-white/70">AF-PKG-R2</span>
        </div>

        <!-- Case Visual -->
        <div class="flex flex-col items-center my-auto">
          <div class="w-full h-48 flex items-center justify-center p-2 rounded-xl bg-white/[0.02] border border-white/10 relative">
            <img src="{b64_case}" class="h-full object-contain filter drop-shadow-xl" alt="CASE R2">
            <span class="absolute top-2 right-2 text-[8px] font-mono text-white/40">MAGNETIC DUAL MODULE</span>
          </div>

          <p class="text-[11px] leading-relaxed text-white/70 mt-3 text-justify font-light">
            반지를 보관하는 단순한 패키지를 넘어, 신체에서 벗어났을 때에도 조각품 그 자체로서 공간에 거주할 수 있도록 설계된 전용 거치 케이스입니다. 정밀 자석 결합 힌지와 미세 공차 결합으로 완벽한 보호성과 건축적 비례감을 완성합니다.
          </p>

          <div class="w-full mt-4 p-3.5 rounded-xl border border-white/15 bg-white/[0.03] flex flex-col gap-2 font-mono text-[9.5px]">
            <div class="flex items-center justify-between border-b border-white/10 pb-1.5">
              <span class="text-white/50">BRAND ARCHIVE</span>
              <span class="text-white font-bold">ALTERFORM (알터폼)</span>
            </div>
            <div class="flex items-center justify-between border-b border-white/10 pb-1.5">
              <span class="text-white/50">EXHIBITION</span>
              <span class="text-white">국민대학교 조형대학 졸업작품전 도록</span>
            </div>
            <div class="flex items-center justify-between border-b border-white/10 pb-1.5">
              <span class="text-white/50">MATERIAL & TECH</span>
              <span class="text-white">3D Ceramic SLS · 1450℃ High Sintering</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-white/50">DIGITAL ARCHIVE</span>
              <span class="text-sky-300 font-bold">https://alterform.store</span>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="border-t border-white/15 pt-4 flex items-center justify-between">
          <img src="{b64_logo}" class="h-6 w-auto mix-blend-screen opacity-90" alt="ALTERFORM">
          <div class="font-mono text-[9px] text-white/40 text-right">
            <div>© 2026 ALTERFORM ALL RIGHTS RESERVED.</div>
            <div>PRINT SPEC : 210 × 297 mm (A4 4P SPREAD)</div>
          </div>
        </div>
      </div>

    </div>
  </div>

</body>
</html>
'''

with open('국민일름보_알터폼_도록_프리뷰.html', 'w', encoding='utf-8') as f:
    f.write(html_content)
print("Saved 국민일름보_알터폼_도록_프리뷰.html")
