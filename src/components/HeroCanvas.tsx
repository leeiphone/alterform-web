import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// 3D Procedural Sculpt representing ALTERFORM's "FLUID & STRUCTURE" wearable object
const RingObject: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating and subtle rotation
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.35;
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.25) * 0.2 + 0.4;
    }
  });

  return (
    <Float speed={1.8} rotationIntensity={0.6} floatIntensity={0.8}>
      <mesh ref={meshRef} castShadow receiveShadow scale={1.25}>
        {/* Parametric Torus Knot with organic wave lobes mimicking the FLUID Tidal Fold & Cage Structure */}
        <torusKnotGeometry args={[1.3, 0.42, 220, 36, 2, 3]} />
        
        {/* High-Gloss Fine White Zirconia Ceramic Material */}
        <meshPhysicalMaterial
          color="#F4F4F6"
          roughness={0.12}
          metalness={0.08}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          reflectivity={0.95}
          sheen={0.4}
          sheenColor={new THREE.Color('#D8DBE2')}
        />
      </mesh>
    </Float>
  );
};

export const HeroCanvas: React.FC = () => {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Studio Lighting Rig */}
        <ambientLight intensity={0.8} />
        
        {/* Key Light */}
        <directionalLight 
          position={[5, 8, 5]} 
          intensity={2.2} 
          castShadow 
          color="#FFFFFF" 
        />
        
        {/* Soft Cool Fill Light */}
        <directionalLight 
          position={[-6, -2, -3]} 
          intensity={1.0} 
          color="#8E9CB8" 
        />
        
        {/* Rim Light for Ceramic Edge Specular */}
        <pointLight 
          position={[0, 4, -4]} 
          intensity={2.5} 
          color="#FFFFFF" 
        />

        {/* 3D Model */}
        <RingObject />

        {/* Orbit Controls (constrained rotation for smooth inspection) */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={(Math.PI * 3) / 4}
        />
      </Canvas>

      {/* 3D Interaction Badge */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-brand-steel/60 border border-brand-border backdrop-blur-sm pointer-events-none flex items-center space-x-2 text-[10px] font-mono tracking-widest text-brand-gray">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-plum animate-ping" />
        <span>DRAG TO ROTATE 3D SPECIMEN</span>
      </div>
    </div>
  );
};
