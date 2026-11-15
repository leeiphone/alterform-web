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

# 1. Generate SVG for Spread 1 (Page 1 + Page 2)
# Dimensions: 1190 x 842 (A4 Spread @ 72/96dpi equivalent)
svg_spread1 = f'''<svg width="1190" height="842" viewBox="0 0 1190 842" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <style>
      .font-sans {{ font-family: 'Pretendard', -apple-system, sans-serif; }}
      .font-mono {{ font-family: 'JetBrains Mono', monospace; }}
    </style>
  </defs>

  <!-- Background Canvas -->
  <rect width="1190" height="842" fill="#090A0D"/>

  <!-- ================= PAGE 01 (LEFT: 0 ~ 595) ================= -->
  <!-- Header Bar -->
  <circle cx="48" cy="48" r="4" fill="#FFFFFF"/>
  <text x="62" y="52" fill="#FFFFFF" fill-opacity="0.9" font-size="11" font-weight="600" class="font-mono" letter-spacing="0.1em">ALTERFORM // ARCHIVAL SPEC 2026</text>
  <rect x="490" y="38" width="57" height="20" rx="4" fill="#FFFFFF" fill-opacity="0.1"/>
  <text x="498" y="52" fill="#FFFFFF" fill-opacity="0.8" font-size="10" font-weight="600" class="font-mono">AF-CAT-01</text>
  <line x1="48" y1="70" x2="547" y2="70" stroke="#FFFFFF" stroke-opacity="0.15" stroke-width="1"/>

  <!-- Ring Hero Image & Glow -->
  <circle cx="297" cy="270" r="140" fill="#FFFFFF" fill-opacity="0.04"/>
  <image href="{b64_fluid}" x="147" y="120" width="300" height="300" preserveAspectRatio="xMidYMid meet"/>

  <!-- Floating Capsule -->
  <rect x="330" y="130" width="190" height="26" rx="13" fill="#FFFFFF" fill-opacity="0.08" stroke="#FFFFFF" stroke-opacity="0.25"/>
  <circle cx="344" cy="143" r="3" fill="#38BDF8"/>
  <text x="354" y="147" fill="#FFFFFF" font-size="9" font-weight="600" class="font-mono">AF-R03-FL // PURE WHITE</text>

  <!-- Title & Typography -->
  <rect x="187" y="440" width="220" height="24" rx="12" fill="#FFFFFF" fill-opacity="0.05" stroke="#FFFFFF" stroke-opacity="0.2"/>
  <text x="197" y="456" fill="#FFFFFF" fill-opacity="0.8" font-size="9" font-weight="600" class="font-mono" letter-spacing="0.05em">WEARABLE SCULPTURES FOR BODY</text>
  <text x="297" y="500" text-anchor="middle" fill="#FFFFFF" font-size="32" font-weight="800" class="font-sans" letter-spacing="-0.02em">FAMILIAR, ALTERED.</text>
  <text x="297" y="525" text-anchor="middle" fill="#FFFFFF" fill-opacity="0.6" font-size="13" class="font-sans">익숙한 장신구를 해체하고 재구축하는 미세 건축</text>

  <!-- Bottom Divider & Text -->
  <line x1="48" y1="565" x2="547" y2="565" stroke="#FFFFFF" stroke-opacity="0.15" stroke-width="1"/>
  <text x="48" y="590" fill="#FFFFFF" fill-opacity="0.75" font-size="11" class="font-sans">ALTERFORM은 손가락과 신체를 하나의 지형으로 파악합니다. 고온(1450℃)에서 소결된</text>
  <text x="48" y="610" fill="#FFFFFF" fill-opacity="0.75" font-size="11" class="font-sans">고밀도 파인 지르코니아 세라믹과 첨단 3D 적층 제조 기술을 결합하여, 유려한 곡선과</text>
  <text x="48" y="630" fill="#FFFFFF" fill-opacity="0.75" font-size="11" class="font-sans">기하학적 건축 구조가 공존하는 5가지 조형 시스템을 선보입니다.</text>

  <!-- Bottom Web QR Card -->
  <rect x="48" y="660" width="499" height="64" rx="12" fill="#FFFFFF" fill-opacity="0.04" stroke="#FFFFFF" stroke-opacity="0.12"/>
  <rect x="62" y="672" width="40" height="40" rx="8" fill="#FFFFFF"/>
  <text x="82" y="696" text-anchor="middle" fill="#000000" font-size="8" font-weight="700" class="font-mono">AF-WEB</text>
  <text x="114" y="688" fill="#FFFFFF" font-size="12" font-weight="700" class="font-sans">인터랙티브 3D 쇼룸 연결 ↗</text>
  <text x="114" y="704" fill="#FFFFFF" fill-opacity="0.5" font-size="10" class="font-mono">QR을 스캔하여 3D 뷰어와 아카이브를 감상하세요</text>
  <text x="530" y="688" text-anchor="end" fill="#FFFFFF" fill-opacity="0.4" font-size="9" class="font-mono">2026 국민일름보</text>
  <text x="530" y="704" text-anchor="end" fill="#FFFFFF" fill-opacity="0.4" font-size="9" class="font-mono">DESIGNER : ALTERFORM</text>

  <!-- ================= FOLD LINE (595) ================= -->
  <line x1="595" y1="0" x2="595" y2="842" stroke="#FFFFFF" stroke-opacity="0.15" stroke-dasharray="4 4" stroke-width="1"/>

  <!-- ================= PAGE 02 (RIGHT: 595 ~ 1190) ================= -->
  <!-- Header Bar -->
  <text x="643" y="44" fill="#FFFFFF" fill-opacity="0.5" font-size="10" font-weight="600" class="font-mono" letter-spacing="0.1em">DESIGN PHILOSOPHY &amp; SYSTEM</text>
  <text x="643" y="62" fill="#FFFFFF" font-size="16" font-weight="700" class="font-sans">5 CORE DESIGN AXES // 조형의 5대 축</text>
  <rect x="1040" y="44" width="102" height="22" rx="11" fill="#FFFFFF" fill-opacity="0.08" stroke="#FFFFFF" stroke-opacity="0.15"/>
  <text x="1052" y="59" fill="#FFFFFF" fill-opacity="0.8" font-size="10" class="font-mono">AXIS 01 ~ 05</text>
  <line x1="643" y1="76" x2="1142" y2="76" stroke="#FFFFFF" stroke-opacity="0.15" stroke-width="1"/>

  <!-- Axis 1: STRUCTURE -->
  <rect x="643" y="96" width="499" height="74" rx="12" fill="#FFFFFF" fill-opacity="0.02" stroke="#FFFFFF" stroke-opacity="0.1"/>
  <rect x="653" y="104" width="58" height="58" rx="8" fill="#000000" stroke="#FFFFFF" stroke-opacity="0.1"/>
  <image href="{b64_structure}" x="654" y="105" width="56" height="56" preserveAspectRatio="xMidYMid meet"/>
  <text x="724" y="122" fill="#FFFFFF" font-size="12" font-weight="700" class="font-mono">01 STRUCTURE</text>
  <text x="825" y="122" fill="#FFFFFF" fill-opacity="0.5" font-size="11" class="font-sans">질서 · 건축</text>
  <rect x="1020" y="110" width="112" height="18" rx="4" fill="#FFFFFF" fill-opacity="0.05"/>
  <text x="1030" y="123" fill="#FFFFFF" fill-opacity="0.6" font-size="9" class="font-mono">ORDER &amp; GEOMETRY</text>
  <text x="724" y="142" fill="#FFFFFF" fill-opacity="0.7" font-size="10.5" class="font-sans">손가락을 구조를 지탱하는 기둥이자 통과점으로 해석하는 기하학적 단계. 평행 루버 슬릿 형성.</text>

  <!-- Axis 2: DISTORTION -->
  <rect x="643" y="180" width="499" height="74" rx="12" fill="#FFFFFF" fill-opacity="0.02" stroke="#FFFFFF" stroke-opacity="0.1"/>
  <rect x="653" y="188" width="58" height="58" rx="8" fill="#000000" stroke="#FFFFFF" stroke-opacity="0.1"/>
  <image href="{b64_distortion}" x="654" y="189" width="56" height="56" preserveAspectRatio="xMidYMid meet"/>
  <text x="724" y="206" fill="#FFFFFF" font-size="12" font-weight="700" class="font-mono">02 DISTORTION</text>
  <text x="830" y="206" fill="#FFFFFF" fill-opacity="0.5" font-size="11" class="font-sans">변형 · 비대칭</text>
  <rect x="1025" y="194" width="107" height="18" rx="4" fill="#FFFFFF" fill-opacity="0.05"/>
  <text x="1035" y="207" fill="#FFFFFF" fill-opacity="0.6" font-size="9" class="font-mono">FORCE &amp; TENSION</text>
  <text x="724" y="226" fill="#FFFFFF" fill-opacity="0.7" font-size="10.5" class="font-sans">원형에 외력이 가해져 솟구치고 팽창하는 긴장의 단계. 예측 불가능한 조형적 긴장감.</text>

  <!-- Axis 3: FLUID (Signature) -->
  <rect x="643" y="264" width="499" height="78" rx="12" fill="#FFFFFF" fill-opacity="0.06" stroke="#FFFFFF" stroke-opacity="0.35"/>
  <rect x="653" y="272" width="62" height="62" rx="8" fill="#000000" stroke="#FFFFFF" stroke-opacity="0.2"/>
  <circle cx="660" cy="279" r="3" fill="#FFFFFF"/>
  <image href="{b64_fluid}" x="654" y="273" width="60" height="60" preserveAspectRatio="xMidYMid meet"/>
  <text x="728" y="292" fill="#FFFFFF" font-size="12" font-weight="700" class="font-mono">03 FLUID ★</text>
  <text x="815" y="292" fill="#FFFFFF" fill-opacity="0.8" font-size="11" class="font-sans">흐름 · 용해 (핵심 시그니처)</text>
  <rect x="1035" y="280" width="97" height="20" rx="4" fill="#FFFFFF"/>
  <text x="1047" y="294" fill="#000000" font-weight="700" font-size="9" class="font-mono">MELT &amp; FLOW</text>
  <text x="728" y="312" fill="#FFFFFF" fill-opacity="0.9" font-size="10.5" class="font-sans">단단한 세라믹이 액체처럼 흘러내려 굳은 형태. 패브릭 드레이프 주름이 손을 감싸는 조형.</text>

  <!-- Axis 4: GROWTH -->
  <rect x="643" y="352" width="499" height="74" rx="12" fill="#FFFFFF" fill-opacity="0.02" stroke="#FFFFFF" stroke-opacity="0.1"/>
  <rect x="653" y="360" width="58" height="58" rx="8" fill="#000000" stroke="#FFFFFF" stroke-opacity="0.1"/>
  <image href="{b64_growth}" x="654" y="361" width="56" height="56" preserveAspectRatio="xMidYMid meet"/>
  <text x="724" y="378" fill="#FFFFFF" font-size="12" font-weight="700" class="font-mono">04 GROWTH</text>
  <text x="805" y="378" fill="#FFFFFF" fill-opacity="0.5" font-size="11" class="font-sans">성장 · 증식</text>
  <rect x="1010" y="366" width="122" height="18" rx="4" fill="#FFFFFF" fill-opacity="0.05"/>
  <text x="1020" y="379" fill="#FFFFFF" fill-opacity="0.6" font-size="9" class="font-mono">ORGANIC ACCRETION</text>
  <text x="724" y="398" fill="#FFFFFF" fill-opacity="0.7" font-size="10.5" class="font-sans">적층 제조 특유의 유기적 분기형 오픈워크. 산호와 식물 줄기가 피부 위에서 자라나듯 형성.</text>

  <!-- Axis 5: VOID -->
  <rect x="643" y="436" width="499" height="74" rx="12" fill="#FFFFFF" fill-opacity="0.02" stroke="#FFFFFF" stroke-opacity="0.1"/>
  <rect x="653" y="444" width="58" height="58" rx="8" fill="#000000" stroke="#FFFFFF" stroke-opacity="0.1"/>
  <image href="{b64_void}" x="654" y="445" width="56" height="56" preserveAspectRatio="xMidYMid meet"/>
  <text x="724" y="462" fill="#FFFFFF" font-size="12" font-weight="700" class="font-mono">05 VOID</text>
  <text x="785" y="462" fill="#FFFFFF" fill-opacity="0.5" font-size="11" class="font-sans">비움 · 관통</text>
  <rect x="1005" y="450" width="127" height="18" rx="4" fill="#FFFFFF" fill-opacity="0.05"/>
  <text x="1015" y="463" fill="#FFFFFF" fill-opacity="0.6" font-size="9" class="font-mono">SUBTRACTIVE SPACE</text>
  <text x="724" y="482" fill="#FFFFFF" fill-opacity="0.7" font-size="10.5" class="font-sans">형태를 덜어낸 네거티브 스페이스와 정밀 관통된 애퍼처가 비워냄으로써 완성되는 미니멀한 긴장감.</text>

  <!-- Page 2 Footer -->
  <line x1="643" y1="765" x2="1142" y2="765" stroke="#FFFFFF" stroke-opacity="0.15" stroke-width="1"/>
  <text x="643" y="785" fill="#FFFFFF" fill-opacity="0.4" font-size="9" class="font-mono">02 // THE 5-AXIS SYSTEM MAP</text>
  <text x="1142" y="785" text-anchor="end" fill="#FFFFFF" fill-opacity="0.4" font-size="9" class="font-mono">ALTERFORM WEARABLE SCULPTURES</text>
</svg>
'''

with open('국민일름보_알터폼_스프레드01_시안.svg', 'w', encoding='utf-8') as f:
    f.write(svg_spread1)
print("Saved 국민일름보_알터폼_스프레드01_시안.svg")

# 2. Generate SVG for Spread 2 (Page 3 + Page 4)
svg_spread2 = f'''<svg width="1190" height="842" viewBox="0 0 1190 842" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <style>
      .font-sans {{ font-family: 'Pretendard', -apple-system, sans-serif; }}
      .font-mono {{ font-family: 'JetBrains Mono', monospace; }}
    </style>
  </defs>

  <rect width="1190" height="842" fill="#090A0D"/>

  <!-- ================= PAGE 03 (LEFT: 0 ~ 595) ================= -->
  <text x="48" y="44" fill="#FFFFFF" fill-opacity="0.5" font-size="10" font-weight="600" class="font-mono" letter-spacing="0.1em">SIGNATURE MASTERPIECE</text>
  <text x="48" y="62" fill="#FFFFFF" font-size="16" font-weight="700" class="font-sans">FLUID 01 // TIDAL FOLD</text>
  <rect x="420" y="44" width="127" height="22" rx="11" fill="#FFFFFF"/>
  <text x="432" y="59" fill="#000000" font-weight="700" font-size="10" class="font-mono">AXIS 03 : SIGNATURE</text>
  <line x1="48" y1="76" x2="547" y2="76" stroke="#FFFFFF" stroke-opacity="0.15" stroke-width="1"/>

  <!-- Ring Hero Visual -->
  <circle cx="297" cy="240" r="130" fill="#FFFFFF" fill-opacity="0.04"/>
  <image href="{b64_fluid}" x="147" y="90" width="300" height="300" preserveAspectRatio="xMidYMid meet"/>
  <rect x="68" y="340" width="160" height="24" rx="12" fill="#FFFFFF" fill-opacity="0.08" stroke="#FFFFFF" stroke-opacity="0.25"/>
  <text x="78" y="356" fill="#FFFFFF" font-size="9" font-weight="600" class="font-mono">HARD MATERIAL. SOFT FORM.</text>

  <!-- 3-Angle View Strip -->
  <rect x="48" y="380" width="158" height="84" rx="8" fill="#FFFFFF" fill-opacity="0.02" stroke="#FFFFFF" stroke-opacity="0.1"/>
  <image href="{b64_angle1}" x="58" y="388" width="138" height="56" preserveAspectRatio="xMidYMid meet"/>
  <text x="127" y="456" text-anchor="middle" fill="#FFFFFF" fill-opacity="0.6" font-size="8" class="font-mono">ANGLE 01 // TOP-VIEW</text>

  <rect x="218" y="380" width="158" height="84" rx="8" fill="#FFFFFF" fill-opacity="0.02" stroke="#FFFFFF" stroke-opacity="0.1"/>
  <image href="{b64_angle2}" x="228" y="388" width="138" height="56" preserveAspectRatio="xMidYMid meet"/>
  <text x="297" y="456" text-anchor="middle" fill="#FFFFFF" fill-opacity="0.6" font-size="8" class="font-mono">ANGLE 02 // OBLIQUE</text>

  <rect x="388" y="380" width="159" height="84" rx="8" fill="#FFFFFF" fill-opacity="0.02" stroke="#FFFFFF" stroke-opacity="0.1"/>
  <image href="{b64_angle3}" x="398" y="388" width="139" height="56" preserveAspectRatio="xMidYMid meet"/>
  <text x="467" y="456" text-anchor="middle" fill="#FFFFFF" fill-opacity="0.6" font-size="8" class="font-mono">ANGLE 03 // BORE FIT</text>

  <!-- Spec Table -->
  <rect x="48" y="480" width="499" height="110" rx="10" fill="#FFFFFF" fill-opacity="0.02" stroke="#FFFFFF" stroke-opacity="0.12"/>
  <text x="62" y="500" fill="#FFFFFF" fill-opacity="0.4" font-size="9" class="font-mono">ENGINEERING SPECIFICATION</text>
  <text x="532" y="500" text-anchor="end" fill="#FFFFFF" fill-opacity="0.4" font-size="9" class="font-mono">AF-R03-FL</text>
  <line x1="62" y1="508" x2="532" y2="508" stroke="#FFFFFF" stroke-opacity="0.1"/>

  <text x="62" y="526" fill="#FFFFFF" fill-opacity="0.4" font-size="9" class="font-mono">MATERIAL</text>
  <text x="62" y="542" fill="#FFFFFF" font-size="11" class="font-sans">Pure White Zirconia Ceramic</text>
  <text x="310" y="526" fill="#FFFFFF" fill-opacity="0.4" font-size="9" class="font-mono">MANUFACTURING</text>
  <text x="310" y="542" fill="#FFFFFF" font-size="11" class="font-sans">Precision SLS &amp; 1450℃ Sintering</text>

  <text x="62" y="562" fill="#FFFFFF" fill-opacity="0.4" font-size="9" class="font-mono">SURFACE FINISH</text>
  <text x="62" y="578" fill="#FFFFFF" font-size="11" class="font-sans">Hand Buffed Soft Satin Polish</text>
  <text x="310" y="562" fill="#FFFFFF" fill-opacity="0.4" font-size="9" class="font-mono">WEIGHT &amp; SIZE</text>
  <text x="310" y="578" fill="#FFFFFF" font-size="11" class="font-sans">8.4g (15호) / 9~25호 맞춤제작</text>

  <line x1="48" y1="765" x2="547" y2="765" stroke="#FFFFFF" stroke-opacity="0.15" stroke-width="1"/>
  <text x="48" y="785" fill="#FFFFFF" fill-opacity="0.4" font-size="9" class="font-mono">03 // SIGNATURE OBJECT ARCHIVE</text>
  <text x="547" y="785" text-anchor="end" fill="#FFFFFF" fill-opacity="0.4" font-size="9" class="font-mono">ALTERFORM WEARABLE SCULPTURES</text>

  <!-- ================= FOLD LINE (595) ================= -->
  <line x1="595" y1="0" x2="595" y2="842" stroke="#FFFFFF" stroke-opacity="0.15" stroke-dasharray="4 4" stroke-width="1"/>

  <!-- ================= PAGE 04 (RIGHT: 595 ~ 1190) ================= -->
  <text x="643" y="44" fill="#FFFFFF" fill-opacity="0.5" font-size="10" font-weight="600" class="font-mono" letter-spacing="0.1em">ARCHITECTURAL STORAGE</text>
  <text x="643" y="62" fill="#FFFFFF" font-size="16" font-weight="700" class="font-sans">CASE R2 // 미세 건축을 담는 모듈러 케이스</text>
  <rect x="1055" y="44" width="87" height="22" rx="4" fill="#FFFFFF" fill-opacity="0.1"/>
  <text x="1067" y="59" fill="#FFFFFF" fill-opacity="0.8" font-size="10" class="font-mono">AF-PKG-R2</text>
  <line x1="643" y1="76" x2="1142" y2="76" stroke="#FFFFFF" stroke-opacity="0.15" stroke-width="1"/>

  <!-- Case Visual -->
  <rect x="643" y="96" width="499" height="240" rx="12" fill="#FFFFFF" fill-opacity="0.02" stroke="#FFFFFF" stroke-opacity="0.1"/>
  <image href="{b64_case}" x="663" y="106" width="459" height="220" preserveAspectRatio="xMidYMid meet"/>
  <text x="1130" y="116" text-anchor="end" fill="#FFFFFF" fill-opacity="0.4" font-size="8" class="font-mono">MAGNETIC DUAL MODULE</text>

  <text x="643" y="365" fill="#FFFFFF" fill-opacity="0.75" font-size="11" class="font-sans">반지를 보관하는 단순한 패키지를 넘어, 신체에서 벗어났을 때에도 조각품 그 자체로서</text>
  <text x="643" y="385" fill="#FFFFFF" fill-opacity="0.75" font-size="11" class="font-sans">공간에 거주할 수 있도록 설계된 전용 거치 케이스입니다. 정밀 자석 결합 힌지와</text>
  <text x="643" y="405" fill="#FFFFFF" fill-opacity="0.75" font-size="11" class="font-sans">미세 공차 결합으로 완벽한 보호성과 건축적 비례감을 완성합니다.</text>

  <!-- Archive Box -->
  <rect x="643" y="440" width="499" height="130" rx="10" fill="#FFFFFF" fill-opacity="0.03" stroke="#FFFFFF" stroke-opacity="0.12"/>
  <text x="660" y="468" fill="#FFFFFF" fill-opacity="0.5" font-size="10" class="font-mono">BRAND ARCHIVE</text>
  <text x="1125" y="468" text-anchor="end" fill="#FFFFFF" font-weight="700" font-size="10" class="font-mono">ALTERFORM (알터폼)</text>
  <line x1="660" y1="478" x2="1125" y2="478" stroke="#FFFFFF" stroke-opacity="0.08"/>

  <text x="660" y="498" fill="#FFFFFF" fill-opacity="0.5" font-size="10" class="font-mono">EXHIBITION</text>
  <text x="1125" y="498" text-anchor="end" fill="#FFFFFF" font-size="10" class="font-mono">국민대학교 조형대학 졸업작품전 도록</text>
  <line x1="660" y1="508" x2="1125" y2="508" stroke="#FFFFFF" stroke-opacity="0.08"/>

  <text x="660" y="528" fill="#FFFFFF" fill-opacity="0.5" font-size="10" class="font-mono">MATERIAL &amp; TECH</text>
  <text x="1125" y="528" text-anchor="end" fill="#FFFFFF" font-size="10" class="font-mono">3D Ceramic SLS · 1450℃ High Sintering</text>
  <line x1="660" y1="538" x2="1125" y2="538" stroke="#FFFFFF" stroke-opacity="0.08"/>

  <text x="660" y="556" fill="#FFFFFF" fill-opacity="0.5" font-size="10" class="font-mono">DIGITAL ARCHIVE</text>
  <text x="1125" y="556" text-anchor="end" fill="#38BDF8" font-weight="700" font-size="10" class="font-mono">https://alterform.store</text>

  <!-- Logo and Colophon -->
  <image href="{b64_logo}" x="643" y="740" width="140" height="40" preserveAspectRatio="xMidYMid meet"/>
  <text x="1142" y="756" text-anchor="end" fill="#FFFFFF" fill-opacity="0.4" font-size="9" class="font-mono">© 2026 ALTERFORM ALL RIGHTS RESERVED.</text>
  <text x="1142" y="772" text-anchor="end" fill="#FFFFFF" fill-opacity="0.4" font-size="9" class="font-mono">PRINT SPEC : 210 × 297 mm (A4 4P SPREAD)</text>
</svg>
'''

with open('국민일름보_알터폼_스프레드02_시안.svg', 'w', encoding='utf-8') as f:
    f.write(svg_spread2)
print("Saved 국민일름보_알터폼_스프레드02_시안.svg")
