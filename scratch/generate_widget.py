import base64
import os

def get_b64(path):
    if not os.path.exists(path):
        return ""
    with open(path, 'rb') as f:
        return 'data:image/png;base64,' + base64.b64encode(f.read()).decode('utf-8')

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

widget_html = f'''<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <script src="https://www.gstatic.com/antigravity/web/dev/tailwindcss.min.js"></script>
  <style>
    .glass-card {{
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.12);
      backdrop-filter: blur(12px);
    }}
  </style>
</head>
<body class="bg-transparent text-[var(--foreground)] antialiased p-2">
  <div class="bg-[#090A0D] text-white border border-white/20 rounded-2xl p-5 shadow-2xl max-w-4xl mx-auto">
    
    <!-- Top Bar -->
    <div class="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4 mb-4">
      <div class="flex items-center gap-3">
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
        <div>
          <h2 class="text-white font-bold text-base tracking-tight">국민일름보 도록 알터폼(ALTERFORM) 시안 프리뷰</h2>
          <p class="text-white/60 text-xs">피그마로 바로 넣는 SVG 파일이 프로젝트 폴더에 생성되었습니다</p>
        </div>
      </div>
      
      <!-- Page Navigation Tabs -->
      <div class="flex items-center bg-white/10 rounded-xl p-1 gap-1 text-xs">
        <button onclick="setTab('p1')" id="btn-p1" class="tab-btn px-3 py-1.5 rounded-lg bg-white text-black font-semibold">1p. 표지/서문</button>
        <button onclick="setTab('p2')" id="btn-p2" class="tab-btn px-3 py-1.5 rounded-lg text-white/70 hover:text-white">2p. 5대 축 시스템</button>
        <button onclick="setTab('p3')" id="btn-p3" class="tab-btn px-3 py-1.5 rounded-lg text-white/70 hover:text-white">3p. 시그니처 링</button>
        <button onclick="setTab('p4')" id="btn-p4" class="tab-btn px-3 py-1.5 rounded-lg text-white/70 hover:text-white">4p. 케이스 & 판권</button>
      </div>
    </div>

    <!-- PAGE 1: COVER & STATEMENT -->
    <div id="view-p1" class="page-view flex flex-col md:flex-row gap-6 items-center py-2">
      <div class="w-full md:w-1/2 flex flex-col items-center justify-center p-4 rounded-xl bg-white/[0.02] border border-white/10 relative">
        <div class="absolute -top-3 left-4 px-3 py-0.5 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs font-mono">
          COVER HERO
        </div>
        <img src="{b64_fluid}" class="w-56 h-56 object-contain filter drop-shadow-2xl">
        <div class="text-xs font-mono text-white/80 px-3 py-1 rounded-full border border-white/20 bg-white/5 mt-2">
          AF-R03-FL // PURE WHITE ZIRCONIA
        </div>
      </div>
      <div class="w-full md:w-1/2 flex flex-col justify-between space-y-4">
        <div>
          <span class="text-xs font-mono text-white/50 tracking-widest uppercase">WEARABLE SCULPTURES</span>
          <h3 class="text-2xl font-bold text-white tracking-tight mt-1">FAMILIAR, ALTERED.</h3>
          <p class="text-xs text-white/60 mt-1">익숙한 장신구를 해체하고 재구축하는 미세 건축</p>
        </div>
        <p class="text-xs leading-relaxed text-white/80 font-light text-justify">
          ALTERFORM은 손가락과 신체를 하나의 지형으로 파악합니다. 고온(1450℃)에서 소결된 고밀도 파인 지르코니아 세라믹과 첨단 3D 적층 제조 기술을 결합하여, 유려한 곡선과 기하학적 건축 구조가 공존하는 5가지 조형 시스템을 선보입니다.
        </p>
        <div class="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-black font-bold text-xs">
              QR
            </div>
            <div>
              <div class="text-xs font-semibold text-white">인터랙티브 3D 쇼룸 연결</div>
              <div class="text-xs text-white/50">3D 뷰어 &amp; 비디오 아카이브 연동</div>
            </div>
          </div>
          <span class="text-xs font-mono text-white/40">2026 국민일름보</span>
        </div>
      </div>
    </div>

    <!-- PAGE 2: 5 AXES SYSTEM MAP -->
    <div id="view-p2" class="page-view hidden space-y-2.5 py-1">
      <div class="text-xs font-mono text-white/60 mb-2">5 CORE DESIGN AXES // 조형의 5대 축 시스템 맵</div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        <div class="p-2.5 rounded-xl border bg-white/[0.02] border-white/10 flex items-center gap-3">
          <img src="{b64_structure}" class="w-12 h-12 object-contain bg-black/40 rounded-lg p-1 border border-white/10">
          <div>
            <div class="text-xs font-bold text-white font-mono">01 STRUCTURE <span class="text-white/50 font-sans font-normal text-xs">질서 · 건축</span></div>
            <div class="text-xs text-white/70 mt-0.5">평행 루버 슬릿과 캔틸레버 슬래브의 기하학적 미세 건축</div>
          </div>
        </div>

        <div class="p-2.5 rounded-xl border bg-white/[0.02] border-white/10 flex items-center gap-3">
          <img src="{b64_distortion}" class="w-12 h-12 object-contain bg-black/40 rounded-lg p-1 border border-white/10">
          <div>
            <div class="text-xs font-bold text-white font-mono">02 DISTORTION <span class="text-white/50 font-sans font-normal text-xs">변형 · 비대칭</span></div>
            <div class="text-xs text-white/70 mt-0.5">안정된 원형에 외력이 가해져 솟구치는 긴장과 파동</div>
          </div>
        </div>

        <div class="p-2.5 rounded-xl border bg-white/[0.08] border-white/40 flex items-center gap-3 md:col-span-2 shadow-lg">
          <img src="{b64_fluid}" class="w-12 h-12 object-contain bg-black/40 rounded-lg p-1 border border-white/20">
          <div class="flex-1">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold text-white font-mono">03 FLUID ★ <span class="text-white/80 font-sans font-normal text-xs">흐름 · 용해 (핵심 시그니처)</span></span>
              <span class="text-xs px-2 py-0.5 rounded bg-white text-black font-bold">MELT &amp; FLOW</span>
            </div>
            <div class="text-xs text-white/90 mt-0.5">단단한 세라믹이 액체처럼 흘러내려 굳은 형태. 유려한 패브릭 드레이프 주름</div>
          </div>
        </div>

        <div class="p-2.5 rounded-xl border bg-white/[0.02] border-white/10 flex items-center gap-3">
          <img src="{b64_growth}" class="w-12 h-12 object-contain bg-black/40 rounded-lg p-1 border border-white/10">
          <div>
            <div class="text-xs font-bold text-white font-mono">04 GROWTH <span class="text-white/50 font-sans font-normal text-xs">성장 · 증식</span></div>
            <div class="text-xs text-white/70 mt-0.5">산호와 식물 줄기가 피부 위에서 자라나듯 유기적 네트워크</div>
          </div>
        </div>

        <div class="p-2.5 rounded-xl border bg-white/[0.02] border-white/10 flex items-center gap-3">
          <img src="{b64_void}" class="w-12 h-12 object-contain bg-black/40 rounded-lg p-1 border border-white/10">
          <div>
            <div class="text-xs font-bold text-white font-mono">05 VOID <span class="text-white/50 font-sans font-normal text-xs">비움 · 관통</span></div>
            <div class="text-xs text-white/70 mt-0.5">네거티브 스페이스와 정밀 애퍼처의 감산 미학</div>
          </div>
        </div>
      </div>
    </div>

    <!-- PAGE 3: SIGNATURE RING FOCUS -->
    <div id="view-p3" class="page-view hidden space-y-4 py-2">
      <div class="flex flex-col md:flex-row gap-6 items-center">
        <div class="w-full md:w-1/2 flex flex-col items-center p-3 rounded-xl bg-white/[0.02] border border-white/10">
          <img src="{b64_fluid}" class="w-52 h-52 object-contain filter drop-shadow-2xl">
          <div class="grid grid-cols-3 gap-2 w-full mt-2">
            <div class="p-1 rounded bg-white/5 border border-white/10 text-center"><img src="{b64_angle1}" class="h-10 mx-auto object-contain"><span class="text-xs text-white/50 block">TOP VIEW</span></div>
            <div class="p-1 rounded bg-white/5 border border-white/10 text-center"><img src="{b64_angle2}" class="h-10 mx-auto object-contain"><span class="text-xs text-white/50 block">OBLIQUE</span></div>
            <div class="p-1 rounded bg-white/5 border border-white/10 text-center"><img src="{b64_angle3}" class="h-10 mx-auto object-contain"><span class="text-xs text-white/50 block">BORE FIT</span></div>
          </div>
        </div>
        <div class="w-full md:w-1/2 space-y-3">
          <div>
            <span class="text-xs font-mono px-2.5 py-0.5 rounded-full bg-white text-black font-bold">AXIS 03 // SIGNATURE</span>
            <h3 class="text-xl font-bold text-white mt-2">FLUID 01 // TIDAL FOLD</h3>
            <p class="text-xs text-white/60">HARD MATERIAL. SOFT FORM.</p>
          </div>
          <div class="p-3.5 rounded-xl border border-white/15 bg-white/[0.03] space-y-2 text-xs">
            <div class="flex justify-between border-b border-white/10 pb-1 font-mono text-white/50">
              <span>ENGINEERING SPEC</span>
              <span>AF-R03-FL</span>
            </div>
            <div class="flex justify-between"><span class="text-white/50">소재(Material)</span><span class="text-white font-medium">Pure White Zirconia Ceramic</span></div>
            <div class="flex justify-between"><span class="text-white/50">제작 공정</span><span class="text-white font-medium">Precision SLS &amp; 1450℃ High Sintering</span></div>
            <div class="flex justify-between"><span class="text-white/50">표면 마감</span><span class="text-white font-medium">Hand Buffed Soft Satin Polish</span></div>
            <div class="flex justify-between"><span class="text-white/50">중량 및 사이즈</span><span class="text-white font-medium">8.4g (15호) / 9~25호 맞춤</span></div>
          </div>
        </div>
      </div>
    </div>

    <!-- PAGE 4: CASE R2 & COLOPHON -->
    <div id="view-p4" class="page-view hidden space-y-4 py-2">
      <div class="flex flex-col md:flex-row gap-6 items-center">
        <div class="w-full md:w-1/2 p-3 rounded-xl bg-white/[0.02] border border-white/10 flex flex-col items-center">
          <img src="{b64_case}" class="w-64 h-44 object-contain filter drop-shadow-xl">
          <span class="text-xs font-mono text-white/50 mt-1">CASE R2 // MAGNETIC DUAL MODULE</span>
        </div>
        <div class="w-full md:w-1/2 space-y-3">
          <h3 class="text-lg font-bold text-white">미세 건축을 담는 모듈러 케이스</h3>
          <p class="text-xs text-white/70 leading-relaxed font-light">
            반지가 신체에서 벗어났을 때에도 하나의 조각품으로서 공간에 거주할 수 있도록 설계된 전용 거치 케이스입니다.
          </p>
          <div class="p-3 rounded-xl border border-white/10 bg-white/[0.02] space-y-1.5 text-xs font-mono">
            <div class="flex justify-between"><span class="text-white/50">BRAND</span><span class="text-white font-bold">ALTERFORM (알터폼)</span></div>
            <div class="flex justify-between"><span class="text-white/50">EXHIBITION</span><span class="text-white">국민대학교 조형대학 도록 (국민일름보)</span></div>
            <div class="flex justify-between"><span class="text-white/50">WEB SHOWROOM</span><span class="text-sky-300 font-bold">https://alterform.store</span></div>
          </div>
          <div class="pt-2 flex items-center justify-between">
            <img src="{b64_logo}" class="h-6 object-contain mix-blend-screen opacity-90">
            <span class="text-xs text-white/40 font-mono">© 2026 ALTERFORM</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Notice Bar -->
    <div class="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between text-xs text-white/60">
      <div class="flex items-center gap-2">
        <span class="text-white font-semibold">📁 피그마 바로 가져가기:</span>
        <code class="px-2 py-0.5 rounded bg-white/10 text-sky-300 font-mono">국민일름보_알터폼_스프레드01_시안.svg</code>
      </div>
      <span>A4 4P / 2-Spread 규격 (420 × 297 mm)</span>
    </div>

  </div>

  <script>
    function setTab(pageId) {{
      document.querySelectorAll('.page-view').forEach(el => el.classList.add('hidden'));
      document.querySelectorAll('.tab-btn').forEach(btn => {{
        btn.classList.remove('bg-white', 'text-black', 'font-semibold');
        btn.classList.add('text-white/70');
      }});
      
      const targetView = document.getElementById('view-' + pageId);
      const targetBtn = document.getElementById('btn-' + pageId);
      if (targetView) targetView.classList.remove('hidden');
      if (targetBtn) {{
        targetBtn.classList.remove('text-white/70');
        targetBtn.classList.add('bg-white', 'text-black', 'font-semibold');
      }}
    }}
  </script>
</body>
</html>
'''

target_dir = '/Users/leemacpro/.gemini/antigravity/brain/e71e1780-d272-43c7-8589-b67eb688ea7a'
with open(os.path.join(target_dir, 'brochure_widget.html'), 'w', encoding='utf-8') as f:
    f.write(widget_html)
print("Saved brochure_widget.html in artifacts dir.")
