import React, { Suspense, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Center, useGLTF, Float } from '@react-three/drei';
import * as THREE from 'three';
import { RotateCcw, Play, Pause, Sparkles, Box } from 'lucide-react';

interface ModelProps {
  url: string;
  ceramicMode: boolean;
}

function Model({ url, ceramicMode }: ModelProps) {
  const { scene } = useGLTF(url);
  const modelRef = useRef<THREE.Group>(null);

  // Clone scene so R3F doesn't dispose or mutate the globally cached GLTF instance
  const { clonedScene, originalMaterials } = React.useMemo(() => {
    const clone = scene.clone(true);
    const materialsMap = new Map<string, THREE.Material | THREE.Material[]>();

    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        if (Array.isArray(mesh.material)) {
          const clonedMats = mesh.material.map((m) => m.clone());
          materialsMap.set(mesh.uuid, clonedMats);
          mesh.material = clonedMats;
        } else if (mesh.material) {
          const clonedMat = mesh.material.clone();
          materialsMap.set(mesh.uuid, clonedMat);
          mesh.material = clonedMat;
        }
      }
    });

    return { clonedScene: clone, originalMaterials: materialsMap };
  }, [scene]);

  // Apply zirconia ceramic finish if ceramicMode is active, otherwise restore original texture
  React.useEffect(() => {
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (ceramicMode) {
          mesh.material = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color('#F6F7F9'),
            roughness: 0.12,
            metalness: 0.04,
            clearcoat: 1.0,
            clearcoatRoughness: 0.06,
            reflectivity: 0.95,
            sheen: 0.3,
            sheenColor: new THREE.Color('#FFFFFF'),
          });
        } else {
          const original = originalMaterials.get(mesh.uuid);
          if (original) {
            mesh.material = original;
          }
        }
      }
    });
  }, [clonedScene, ceramicMode, originalMaterials]);

  return (
    <primitive
      ref={modelRef}
      object={clonedScene}
      scale={1.5}
      position={[0, 0, 0]}
      dispose={null}
    />
  );
}

// Preload 3D models for instant loading on modal open
useGLTF.preload('/assets/models/fluid-ring.glb');
useGLTF.preload('/assets/models/void-ring.glb?v=2');
useGLTF.preload('/assets/models/growth-ring.glb');
useGLTF.preload('/assets/models/structure-ring.glb');
useGLTF.preload('/assets/models/distortion-ring.glb');
useGLTF.preload('/assets/models/distortion-crumple-ring.glb');
useGLTF.preload('/assets/models/case-r2.glb');

export class WebGLErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.warn('WebGL Error caught by boundary:', error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-white/60">
          <Box className="w-8 h-8 mb-2 text-white/30" />
          <span className="text-xs font-mono">3D PREVIEW UNAVAILABLE</span>
        </div>
      );
    }
    return this.props.children;
  }
}

// Clean loading state with spinning loader
function Loader() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm z-10 text-white select-none">
      <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin mb-3" />
      <span className="text-xs font-mono tracking-widest text-white/70">
        3D SPECIMEN LOADING...
      </span>
    </div>
  );
}

interface LiquidGlassModelViewerProps {
  modelUrl: string;
  fallbackImage?: string;
  className?: string;
  showCeramicToggle?: boolean;
}

export const LiquidGlassModelViewer: React.FC<LiquidGlassModelViewerProps> = ({
  modelUrl,
  fallbackImage,
  className = '',
  showCeramicToggle = true,
}) => {
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [ceramicMode, setCeramicMode] = useState<boolean>(false);
  const [controlsKey, setControlsKey] = useState<number>(0);

  const handleResetCamera = (e: React.MouseEvent) => {
    e.stopPropagation();
    setControlsKey((prev) => prev + 1);
  };

  const fallback = fallbackImage ? (
    <img
      src={fallbackImage}
      alt="Product preview"
      className="max-h-72 w-auto object-contain drop-shadow-[0_25px_40px_rgba(0,0,0,0.9)]"
    />
  ) : undefined;

  return (
    <div className={`relative w-full h-full min-h-[300px] flex items-center justify-center select-none overflow-hidden ${className}`}>
      <WebGLErrorBoundary fallback={fallback}>
        <Suspense fallback={<Loader />}>
          <Canvas
          camera={{ position: [0, 0.15, 2.8], fov: 42 }}
          gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          {/* Studio Lights for High-Gloss Ceramic Jewellery */}
          <ambientLight intensity={1.2} />
          
          {/* Key Light */}
          <directionalLight
            position={[4, 6, 4]}
            intensity={2.4}
            color="#FFFFFF"
          />

          {/* Cool Rim Light */}
          <directionalLight
            position={[-4, -2, -3]}
            intensity={1.2}
            color="#D0E0FF"
          />

          {/* Warm Rim Light */}
          <directionalLight
            position={[3, -4, 2]}
            intensity={0.8}
            color="#FFF4E6"
          />

          {/* Glint Highlight */}
          <pointLight
            position={[0, 3, 2]}
            intensity={2.0}
            color="#FFFFFF"
          />

          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
            <Center top={false}>
              <Model url={modelUrl} ceramicMode={ceramicMode} />
            </Center>
          </Float>

          <OrbitControls
            key={controlsKey}
            enablePan={false}
            minDistance={1.2}
            maxDistance={4.5}
            autoRotate={autoRotate}
            autoRotateSpeed={1.8}
            makeDefault
          />
        </Canvas>
      </Suspense>
    </WebGLErrorBoundary>

      {/* Floating Control Toolbar */}
      <div className="absolute bottom-3 inset-x-3 flex items-center justify-between pointer-events-none z-20">
        <div className="pointer-events-auto flex items-center gap-1.5 liquid-glass rounded-full px-3 py-1.5 text-[11px] font-mono text-white/80 shadow-lg border border-white/10">
          <Box className="w-3.5 h-3.5 text-sky-400" />
          <span>360° DRAG & ZOOM</span>
        </div>

        <div className="pointer-events-auto flex items-center gap-1.5">
          {/* Ceramic Shader Toggle (only for jewellery, hidden for monolithic packaging) */}
          {showCeramicToggle && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setCeramicMode(!ceramicMode);
              }}
              title={ceramicMode ? "원본 텍스처로 보기" : "퓨어 화이트 지르코니아 셰이더 적용"}
              className={`liquid-glass h-8 px-2.5 rounded-full flex items-center gap-1 text-[11px] transition-all cursor-pointer shadow-md ${
                ceramicMode ? 'bg-white text-black font-semibold' : 'text-white/80 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{ceramicMode ? "Pure Zirconia" : "Texture"}</span>
            </button>
          )}

          {/* Auto Rotate Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setAutoRotate(!autoRotate);
            }}
            title={autoRotate ? "회전 멈춤" : "자동 회전"}
            className="liquid-glass w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer shadow-md"
          >
            {autoRotate ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>

          {/* Reset Camera */}
          <button
            onClick={handleResetCamera}
            title="초기 앵글로 리셋"
            className="liquid-glass w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white transition-all cursor-pointer shadow-md"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
