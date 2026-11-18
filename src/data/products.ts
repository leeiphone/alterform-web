import { AxisInfo, Product } from '../types';

export const AXES_DATA: AxisInfo[] = [
  {
    key: 'STRUCTURE',
    id: '01',
    nameKr: '질서 · 건축',
    concept: 'ORDER & GEOMETRY',
    keywords: ['LOUVER', 'CANTILEVER', 'COLUMN', 'FRAME'],
    description: '손가락을 구조를 지탱하는 기둥이자 통과점으로 해석하는 가장 기하학적인 단계. 정밀한 평행 루버 슬릿과 캔틸레버 슬래브가 손 위에 미세 건축을 형성합니다.',
    image: '/assets/rings/structure-radial-frame.png?v=2',
    heroQuote: 'ARCHITECTURE FOR THE BODY.',
    material: 'Zirconia Ceramic / High Precision SLS'
  },
  {
    key: 'DISTORTION',
    id: '02',
    nameKr: '변형 · 비대칭',
    concept: 'FORCE & TENSION',
    keywords: ['SURGE', 'RIDGE', 'CREST', 'ASYMMETRY'],
    description: '안정된 원형에 외력이 가해져 솟구치고 팽창하는 긴장의 단계. 허공으로 솟아오른 에어로 크레스트와 비대칭 팽창 리지가 예측 불가능한 조형적 긴장감을 만들어냅니다.',
    image: '/assets/rings/distortion-compression-fault.png?v=2',
    heroQuote: 'THE WORLD WAS NEVER FIXED.',
    material: 'Fine Sintered Pure White Zirconia'
  },
  {
    key: 'FLUID',
    id: '03',
    nameKr: '흐름 · 용해 (시그니처)',
    concept: 'MELT & FLOW',
    keywords: ['TIDAL FOLD', 'DRAPE', 'LIQUID SILK', 'WAVE'],
    description: '단단한 세라믹이 액체처럼 흘러내려 굳은 형태. 유려한 패브릭 로브 주름(Drape)이 대각선 파동을 그리며 손가락을 감싸는 ALTERFORM의 핵심 시그니처 조형입니다.',
    image: '/assets/rings/fluid-tidal-fold.png?v=2',
    heroQuote: 'HARD MATERIAL. SOFT FORM.',
    material: 'Polished High-Density White Zirconia'
  },
  {
    key: 'GROWTH',
    id: '04',
    nameKr: '성장 · 증식',
    concept: 'ORGANIC ACCRETION',
    keywords: ['CORAL', 'BRANCH', 'LATTICE', 'BLOOM'],
    description: '적층 제조 특유의 유기적 분기형 오픈워크. 산호와 식물 줄기가 피부 위에서 자라나듯 손가락을 따라 생명력 넘치는 유기적 네트워크를 이룹니다.',
    image: '/assets/rings/growth-cellular-bloom.png?v=2',
    heroQuote: 'IT DOESN’T STOP. IT GROWS.',
    material: 'Additive Fine Lattice Ceramic'
  },
  {
    key: 'VOID',
    id: '05',
    nameKr: '비움 · 관통',
    concept: 'SUBTRACTIVE SPACE',
    keywords: ['APERTURE', 'SLOT', 'BORE', 'NEGATIVE SPACE'],
    description: '더하는 방식을 벗어난 순수 감산(Subtractive) 축. 형태를 덜어낸 네거티브 스페이스와 정밀하게 관통된 애퍼처 및 슬롯이 비워냄으로써 비로소 완성되는 미니멀한 긴장감을 부여합니다.',
    image: '/assets/rings/void-triple-bore.png?v=2',
    heroQuote: 'WHAT IS MISSING IS THE FORM.',
    material: 'Precision Sintered Ceramic Monolith'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'fluid-tidal-fold',
    axis: 'FLUID',
    code: 'AF-R03-FL',
    name: 'FLUID 01 / TIDAL FOLD',
    nameKr: '타이달 폴드 시그니처 링',
    price: 380000,
    description: '단단한 고밀도 지르코니아가 마치 액체나 유려한 실크 패브릭처럼 주름지며 흘러내리는 유기적 볼륨의 시그니처 링. 유려한 곡선의 파동(Fold)이 대각선으로 겹쳐지며 손가락을 감싸고, 은은하고 부드러운 새틴 매트 광택이 빛의 음영을 극대화합니다.',
    image: '/assets/rings/fluid-tidal-fold.png?v=2',
    modelUrl: '/assets/models/fluid-ring.glb',
    isSignature: true,
    details: {
      material: '고밀도 파인 지르코니아 (Pure White Zirconia)',
      process: '정밀 3D 적층 제조 & 고온 소결 & 다이아몬드 버프 폴리싱',
      finish: 'Soft Satin Specular Ceramic Polish',
      leadTime: '주문 제작 (7~10 영업일 소요)',
      weight: '약 8.4g (15호 기준)'
    },
    availableSizes: [9, 11, 13, 15, 17, 19, 21, 23, 25],
    materials: [
      { name: 'Pure White Zirconia', code: 'PWZ', colorHex: '#F8FAFC' }
    ]
  },
  {
    id: 'structure-radial-frame',
    axis: 'STRUCTURE',
    code: 'AF-R01-ST',
    name: 'STRUCTURE 01 / RADIAL LOUVER',
    nameKr: '라디얼 루버 아키텍처 링',
    price: 340000,
    description: '연속적인 평행 건축 루버(Louver)와 아치형 리브 프레임이 손가락 위로 미세 건축을 세우는 구조적 링. 빛이 슬릿 사이를 통과하며 빚어내는 리듬감 있는 그림자와 구조적 견고함을 동시에 선사합니다.',
    image: '/assets/rings/structure-radial-frame.png?v=2',
    modelUrl: '/assets/models/structure-ring.glb',
    details: {
      material: '고밀도 파인 화이트 지르코니아 (Pure White Zirconia)',
      process: '정밀 3D 적층 제조 & 고온 소결 & 다이아몬드 버프 폴리싱',
      finish: 'Parallel Louver Slit High Polish',
      leadTime: '주문 제작 (7~10 영업일 소요)',
      weight: '약 6.8g (15호 기준)'
    },
    availableSizes: [9, 11, 13, 15, 17, 19, 21, 23, 25],
    materials: [
      { name: 'Pure White Zirconia', code: 'PWZ', colorHex: '#F8FAFC' }
    ]
  },
  {
    id: 'structure-brutalist-stack',
    axis: 'STRUCTURE',
    code: 'AF-R02-BS',
    name: 'STRUCTURE 02 / CANTILEVER SLAB',
    nameKr: '캔틸레버 슬래브 브루탈리스트 링',
    price: 350000,
    description: '모더니즘 건축의 캔틸레버(돌출보)와 계단식 기하학적 평면 슬래브에서 영감을 얻은 브루탈리즘 조형. 직사각형 블록이 층을 이루며 공중에 떠 있는 듯한 캔틸레버 오버행과 정밀한 수평·수직 비움의 틈새가 손가락 위에 압도적인 건축적 긴장감을 구현합니다.',
    image: '/assets/rings/structure-brutalist-stack.png?v=2',
    modelUrl: '/assets/models/structure-ring.glb',
    details: {
      material: '고밀도 파인 화이트 지르코니아 (Pure White Zirconia)',
      process: 'Sub-micron 3D Printing & High Temperature Sintering',
      finish: 'Architectural Planar Matte Polish',
      leadTime: '주문 제작 (7~10 영업일 소요)',
      weight: '약 7.9g (15호 기준)'
    },
    availableSizes: [11, 13, 15, 17, 19, 21, 23],
    materials: [
      { name: 'Pure White Zirconia', code: 'PWZ', colorHex: '#F8FAFC' }
    ]
  },
  {
    id: 'distortion-compression-fault',
    axis: 'DISTORTION',
    code: 'AF-R04-DT',
    name: 'DISTORTION 01 / SURGE CREST',
    nameKr: '서지 크레스트 왜곡 링',
    price: 360000,
    description: '원형의 반지 형태를 깨고 한쪽으로 팽팽하게 솟구쳐 오르는 비대칭 에어로 크레스트(Surge Crest) 실루엣. 공기역학적 날개처럼 솟아오른 뾰족한 첨점과 안쪽으로 유려하게 파여진 오목 곡면이 강한 외력에 의해 조형이 위로 늘어난 듯한 극적인 왜곡의 순간을 포착했습니다.',
    image: '/assets/rings/distortion-compression-fault.png?v=2',
    modelUrl: '/assets/models/distortion-ring.glb',
    details: {
      material: '고밀도 파인 화이트 지르코니아 (Pure White Zirconia)',
      process: 'Additive Ceramic Multi-axis Precision Sintering',
      finish: 'Sculptural Aerodynamic Arc Polish',
      leadTime: '주문 제작 (7~10 영업일 소요)',
      weight: '약 9.1g (15호 기준)'
    },
    availableSizes: [9, 11, 13, 15, 17, 19, 21, 23, 25],
    materials: [
      { name: 'Pure White Zirconia', code: 'PWZ', colorHex: '#F8FAFC' }
    ]
  },
  {
    id: 'distortion-crumple',
    axis: 'DISTORTION',
    code: 'AF-R05-CR',
    name: 'DISTORTION 02 / ASYMMETRIC RIDGE',
    nameKr: '어시메트릭 리지 볼륨 링',
    price: 360000,
    description: '단단한 밴드 외곽을 따라 볼륨이 팽창하며 돌출된 대각선 리지(Ridge) 라인으로 비대칭 분할되는 링. 풍성하게 부풀어 오른 유기적 곡면과 절제된 림 라인이 대비를 이루며, 손가락을 묵직하고 안락하게 감싸는 볼드한 조형감을 전달합니다.',
    image: '/assets/rings/distortion-crumple.png?v=2',
    modelUrl: '/assets/models/distortion-crumple-ring.glb',
    details: {
      material: '고밀도 파인 화이트 지르코니아 (Pure White Zirconia)',
      process: 'Micro Ceramic Stereolithography & Sintering',
      finish: 'Dual-Contour Soft Specular Polish',
      leadTime: '주문 제작 (7~10 영업일 소요)',
      weight: '약 7.4g (15호 기준)'
    },
    availableSizes: [9, 11, 13, 15, 17, 19, 21],
    materials: [
      { name: 'Pure White Zirconia', code: 'PWZ', colorHex: '#F8FAFC' }
    ]
  },
  {
    id: 'growth-cellular-bloom',
    axis: 'GROWTH',
    code: 'AF-R06-GW',
    name: 'GROWTH 01 / CELLULAR BLOOM',
    nameKr: '셀룰러 블룸 오픈워크 링',
    price: 420000,
    description: '산호 가지와 유기적 세포의 증식(Accretion) 패턴을 유연한 분기형 오픈워크 격자로 승화시킨 링. 피부 위에서 유기체가 자라나듯 손가락을 타고 뻗어 올라가며, 공간과 빛을 투과시키는 경쾌하고 생명력 넘치는 실루엣을 만듭니다.',
    image: '/assets/rings/growth-cellular-bloom.png?v=2',
    modelUrl: '/assets/models/growth-ring.glb',
    details: {
      material: '고밀도 파인 화이트 지르코니아 (Pure White Zirconia)',
      process: 'Ultra Precision Sub-micron SLA Printing',
      finish: 'Organic Micro-Branching Polish',
      leadTime: '주문 제작 (10~14 영업일 소요)',
      weight: '약 5.9g (15호 기준)'
    },
    availableSizes: [9, 11, 13, 15, 17, 19, 21, 23],
    materials: [
      { name: 'Pure White Zirconia', code: 'PWZ', colorHex: '#F8FAFC' }
    ]
  },
  {
    id: 'void-triple-bore',
    axis: 'VOID',
    code: 'AF-R07-VD',
    name: 'VOID 01 / DUAL APERTURE',
    nameKr: '듀얼 애퍼처 네거티브 링',
    price: 390000,
    description: '볼드하고 묵직한 모놀리스 돔에 가로 방향의 관통 캡슐 애퍼처(Aperture)와 상단을 깊게 가로지르는 슬롯 홈을 감산(Subtractive)하여 비워낸 링. 안과 밖이 관통되며 생겨난 음영과 비어있는 공간 자체가 형태의 중심이 되는 순수 감산 조형미를 보여줍니다.',
    image: '/assets/rings/void-triple-bore.png?v=2',
    modelUrl: '/assets/models/void-ring.glb',
    details: {
      material: '단일 블록 소결 지르코니아 모놀리스 (Pure White Zirconia)',
      process: 'CAD Boolean Subtraction & High-Temp Sintering',
      finish: 'Pure Matte Monolith Sintered Ceramic',
      leadTime: '주문 제작 (7~10 영업일 소요)',
      weight: '약 8.8g (15호 기준)'
    },
    availableSizes: [9, 11, 13, 15, 17, 19, 21, 23, 25],
    materials: [
      { name: 'Pure White Zirconia', code: 'PWZ', colorHex: '#F8FAFC' }
    ]
  }
];
