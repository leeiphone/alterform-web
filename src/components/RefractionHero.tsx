import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { mergeVertices, mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { useStore } from '../store/useStore';
import { AxisKey } from '../types';

const MODEL_URL = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260929_212926_92423081-b0e4-4f5a-b650-14af6c05c058.glb';

const AXES_LIST: { key: AxisKey; id: string; name: string }[] = [
  { key: 'STRUCTURE', id: '01', name: '질서 · 건축' },
  { key: 'DISTORTION', id: '02', name: '변형 · 비대칭' },
  { key: 'FLUID', id: '03', name: '흐름 · 용해' },
  { key: 'GROWTH', id: '04', name: '성장 · 증식' },
  { key: 'VOID', id: '05', name: '비움 · 관통' },
];

export const RefractionHero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { setSelectedAxis } = useStore();
  const [currentIdx, setCurrentIdx] = useState(2); // default FLUID (idx 2, id "03")
  const [isLoaded, setIsLoaded] = useState(false);

  // Sync with global store
  const syncAxis = (idx: number) => {
    const safeIdx = ((idx % 5) + 5) % 5;
    setCurrentIdx(safeIdx);
    setSelectedAxis(AXES_LIST[safeIdx].key);
  };

  const smoothYRotRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
    });
    renderer.setClearColor(0x000000, 1);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Camera
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    camera.position.set(0, 0, 10);
    camera.lookAt(0, 0, 0);

    // Scenes
    const scene = new THREE.Scene();
    const bgScene = new THREE.Scene();
    const bgCamera = new THREE.Camera();

    const pivot = new THREE.Group();
    const spinner = new THREE.Group();
    scene.add(pivot);
    pivot.add(spinner);

    // Initial rotation
    spinner.rotation.set(-0.42, 0.62, 0.18);

    // 2D Headline Canvas & Texture
    const bgCanvas = document.createElement('canvas');
    const bgCtx = bgCanvas.getContext('2d');
    const bgTexture = new THREE.CanvasTexture(bgCanvas);
    bgTexture.colorSpace = THREE.SRGBColorSpace;
    bgTexture.minFilter = THREE.LinearFilter;
    bgTexture.magFilter = THREE.LinearFilter;
    bgTexture.generateMipmaps = false;

    const bgQuadMaterial = new THREE.ShaderMaterial({
      uniforms: { uTex: { value: bgTexture } },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position.xy, 0.0, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uTex;
        varying vec2 vUv;
        void main() {
          gl_FragColor = texture2D(uTex, vUv);
          #include <colorspace_fragment>
        }
      `,
      depthTest: false,
      depthWrite: false,
    });

    const bgQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), bgQuadMaterial);
    bgQuad.frustumCulled = false;
    bgScene.add(bgQuad);

    // Render Targets for 2-Pass Refraction
    let rtBack: THREE.WebGLRenderTarget | null = null;
    let rtFront: THREE.WebGLRenderTarget | null = null;

    const updateRenderTargets = (w: number, h: number) => {
      if (rtBack) rtBack.dispose();
      if (rtFront) rtFront.dispose();

      const options = {
        type: THREE.HalfFloatType,
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        depthBuffer: true,
      };
      rtBack = new THREE.WebGLRenderTarget(w, h, options);
      rtFront = new THREE.WebGLRenderTarget(w, h, options);
    };

    // Glass Chromatic Dispersion Shaders
    const glassVertexShader = `
      varying vec3 vNormal;
      varying vec3 vEye;
      void main() {
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vec4 mvPos = viewMatrix * worldPos;
        gl_Position = projectionMatrix * mvPos;
        vNormal = normalize(normalMatrix * normal);
        vEye = normalize(mvPos.xyz);
      }
    `;

    const glassFragmentShader = `
      uniform sampler2D uTexture;
      uniform vec2 uResolution;
      uniform float uIorR, uIorY, uIorG, uIorC, uIorB, uIorP;
      uniform float uRefractPower;
      uniform float uChromatic;
      uniform float uSaturation;
      uniform float uShininess;
      uniform float uDiffuseness;
      uniform float uFresnelPower;
      uniform vec3 uLight;
      uniform float uBackside;

      varying vec3 vNormal;
      varying vec3 vEye;

      float specularLight(vec3 lightDir, float shininess, float diffuseness, vec3 n, vec3 eye) {
        vec3 l = normalize(-lightDir);
        vec3 v = -eye;
        vec3 h = normalize(l + v);
        float spec = pow(max(dot(n, h), 0.0), shininess);
        float diff = max(dot(n, l), 0.0) * diffuseness;
        return spec + diff;
      }

      float luma(vec3 color) {
        return dot(color, vec3(0.2125, 0.7154, 0.0721));
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / uResolution;
        vec3 n = normalize(vNormal);
        if (uBackside > 0.5) n = -n;
        vec3 eye = normalize(vEye);

        const int LOOP = 16;
        vec3 totalColor = vec3(0.0);

        for (int i = 0; i < LOOP; i++) {
          float slide = float(i) / float(LOOP) * 0.045;

          vec3 refrR = refract(eye, n, 1.0 / uIorR);
          vec3 refrY = refract(eye, n, 1.0 / uIorY);
          vec3 refrG = refract(eye, n, 1.0 / uIorG);
          vec3 refrC = refract(eye, n, 1.0 / uIorC);
          vec3 refrB = refract(eye, n, 1.0 / uIorB);
          vec3 refrP = refract(eye, n, 1.0 / uIorP);

          vec2 uvR = uv + refrR.xy * (uRefractPower + slide * 1.0) * uChromatic;
          vec2 uvY = uv + refrY.xy * (uRefractPower + slide * 1.0) * uChromatic;
          vec2 uvG = uv + refrG.xy * (uRefractPower + slide * 2.0) * uChromatic;
          vec2 uvC = uv + refrC.xy * (uRefractPower + slide * 2.5) * uChromatic;
          vec2 uvB = uv + refrB.xy * (uRefractPower + slide * 3.0) * uChromatic;
          vec2 uvP = uv + refrP.xy * (uRefractPower + slide * 1.0) * uChromatic;

          vec4 tR = texture2D(uTexture, uvR);
          vec4 tY = texture2D(uTexture, uvY);
          vec4 tG = texture2D(uTexture, uvG);
          vec4 tC = texture2D(uTexture, uvC);
          vec4 tB = texture2D(uTexture, uvB);
          vec4 tP = texture2D(uTexture, uvP);

          float r = tR.x * 0.5;
          float y = (tY.x * 2.0 + tY.y * 2.0 - tY.z) / 6.0;
          float g = tG.y * 0.5;
          float c = (tC.y * 2.0 + tC.z * 2.0 - tC.x) / 6.0;
          float b = tB.z * 0.5;
          float p = (tP.z * 2.0 + tP.x * 2.0 - tP.y) / 6.0;

          float R = r + (2.0 * p + 2.0 * y - c) / 3.0;
          float G = g + (2.0 * y + 2.0 * c - p) / 3.0;
          float B = b + (2.0 * c + 2.0 * p - y) / 3.0;

          totalColor += vec3(R, G, B);
        }

        vec3 color = totalColor / float(LOOP);
        float lum = luma(color);
        color = mix(vec3(lum), color, uSaturation);

        float spec1 = specularLight(uLight, uShininess, uDiffuseness, n, eye);
        float spec2 = 0.6 * specularLight(vec3(1.0, 1.0, -1.0), uShininess * 0.6, uDiffuseness * 0.5, n, eye);
        float spec = spec1 + spec2;
        color += spec * (uBackside > 0.5 ? 0.35 : 1.0);

        float f = pow(1.0 + dot(eye, n), uFresnelPower);
        color = mix(color, vec3(1.0), f * (uBackside > 0.5 ? 0.25 : 0.55));

        color += vec3(0.004, 0.005, 0.007);
        gl_FragColor = vec4(color, 1.0);
        #include <colorspace_fragment>
      }
    `;

    const commonUniforms = {
      uResolution: { value: new THREE.Vector2() },
      uIorR: { value: 1.15 },
      uIorY: { value: 1.16 },
      uIorG: { value: 1.18 },
      uIorC: { value: 1.22 },
      uIorB: { value: 1.22 },
      uIorP: { value: 1.22 },
      uChromatic: { value: 0.5 },
      uSaturation: { value: 1.08 },
      uShininess: { value: 90.0 },
      uDiffuseness: { value: 0.02 },
      uFresnelPower: { value: 5.0 },
      uLight: { value: new THREE.Vector3(-1, 1, 1) },
    };

    const frontMat = new THREE.ShaderMaterial({
      uniforms: {
        ...commonUniforms,
        uTexture: { value: null },
        uRefractPower: { value: 0.30 },
        uBackside: { value: 0.0 },
      },
      vertexShader: glassVertexShader,
      fragmentShader: glassFragmentShader,
      side: THREE.FrontSide,
    });

    const backMat = new THREE.ShaderMaterial({
      uniforms: {
        ...commonUniforms,
        uTexture: { value: null },
        uRefractPower: { value: 0.22 },
        uBackside: { value: 1.0 },
      },
      vertexShader: glassVertexShader,
      fragmentShader: glassFragmentShader,
      side: THREE.BackSide,
    });

    // Fallback rounded cuboid
    const fallbackGeometry = new RoundedBoxGeometry(1, 1, 1, 8, 0.12);
    const cubeMesh: THREE.Mesh<THREE.BufferGeometry> = new THREE.Mesh(fallbackGeometry, frontMat);
    spinner.add(cubeMesh);

    // Load 3D model
    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
      MODEL_URL,
      (gltf) => {
        try {
          const geometries: THREE.BufferGeometry[] = [];
          gltf.scene.updateMatrixWorld(true);
          gltf.scene.traverse((child: any) => {
            if (child.isMesh && child.geometry) {
              const g = child.geometry.clone();
              g.deleteAttribute('uv');
              g.deleteAttribute('color');
              g.deleteAttribute('tangent');
              const mergedV = mergeVertices(g, 1e-4);
              mergedV.computeVertexNormals();
              mergedV.applyMatrix4(child.matrixWorld);
              geometries.push(mergedV);
            }
          });

          if (geometries.length > 0) {
            const merged = geometries.length === 1 ? geometries[0] : mergeGeometries(geometries);
            merged.computeBoundingBox();
            merged.center();
            const size = new THREE.Vector3();
            merged.boundingBox?.getSize(size);
            const maxDim = Math.max(size.x, size.y, size.z);
            if (maxDim > 0) merged.scale(1 / maxDim, 1 / maxDim, 1 / maxDim);

            cubeMesh.geometry.dispose();
            cubeMesh.geometry = merged;
          }
        } catch (_) {}
        setIsLoaded(true);
      },
      undefined,
      () => setIsLoaded(true)
    );

    // Headline Draw Function with ALTERFORM text
    const drawHeadline = (W: number, H: number, dpr: number, mobile: boolean) => {
      if (!bgCtx) return;
      bgCanvas.width = W * dpr;
      bgCanvas.height = H * dpr;

      bgCtx.fillStyle = '#000000';
      bgCtx.fillRect(0, 0, bgCanvas.width, bgCanvas.height);

      let fs = Math.min(H * 0.21, W * (mobile ? 0.21 : 0.118));
      const maxAllowedWidth = W * (mobile ? 0.9 : 0.5);

      // ALTERFORM Signature Words
      const lines = ['ALTER', 'FORM', 'SEOUL'];

      bgCtx.font = `800 ${fs * dpr}px 'Pretendard Variable', Pretendard, sans-serif`;
      let widest = 0;
      for (const line of lines) {
        const w = bgCtx.measureText(line).width / dpr;
        if (w > widest) widest = w;
      }
      if (widest > maxAllowedWidth && widest > 0) {
        fs = fs * (maxAllowedWidth / widest);
      }

      bgCtx.font = `800 ${fs * dpr}px 'Pretendard Variable', Pretendard, sans-serif`;
      bgCtx.fillStyle = '#E9E9E9';
      bgCtx.textAlign = 'center';
      bgCtx.textBaseline = 'alphabetic';

      const cx = W * (mobile ? 0.5 : 0.505) * dpr;
      const cy = H * (mobile ? 0.45 : 0.468) * dpr;
      const gap = fs * 1.07 * dpr;
      const cap = fs * 0.7 * dpr;

      for (let i = 0; i < lines.length; i++) {
        const y = cy + cap / 2 + (i - 1) * gap;
        bgCtx.fillText(lines[i], cx, y);
      }

      bgTexture.needsUpdate = true;
    };

    // Layout
    const layout = () => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio, 2);
      const mobile = W < 768 || W / H < 1;

      renderer.setSize(W, H);
      camera.aspect = W / H;
      camera.updateProjectionMatrix();

      const drawW = Math.floor(W * dpr);
      const drawH = Math.floor(H * dpr);
      updateRenderTargets(drawW, drawH);

      frontMat.uniforms.uResolution.value.set(drawW, drawH);
      backMat.uniforms.uResolution.value.set(drawW, drawH);

      drawHeadline(W, H, dpr, mobile);

      const fovRad = THREE.MathUtils.degToRad(camera.fov);
      const visH = 2 * Math.tan(fovRad / 2) * 10;
      const visW = visH * camera.aspect;

      const sx = mobile ? 0.5 : 0.517;
      const sy = mobile ? 0.45 : 0.488;
      pivot.position.set((sx - 0.5) * visW, (0.5 - sy) * visH, 0);

      const edgePx = Math.min(H * 0.44, W * (mobile ? 0.45 : 0.29));
      const s = (edgePx / H) * visH;
      pivot.scale.set(s, s, s);
    };

    layout();
    window.addEventListener('resize', layout);

    // Pointer Interaction
    let isDragging = false;
    let lastPointerX = 0;
    let lastPointerY = 0;
    let velX = 0;
    let velY = 0;
    let lastMoveTime = 0;
    let idleTime = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      canvas.classList.add('cursor-grabbing');
      canvas.setPointerCapture(e.pointerId);
      lastPointerX = e.clientX;
      lastPointerY = e.clientY;
      lastMoveTime = performance.now();
      velX = 0;
      velY = 0;
      smoothYRotRef.current = 0;
      idleTime = 0;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const now = performance.now();
      const dt = Math.max((now - lastMoveTime) / 1000, 0.001);

      const deltaX = e.clientX - lastPointerX;
      const deltaY = e.clientY - lastPointerY;
      lastPointerX = e.clientX;
      lastPointerY = e.clientY;
      lastMoveTime = now;

      const dx = deltaX * 0.008;
      const dy = deltaY * 0.008;

      const qY = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), dx);
      const qX = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), dy);

      spinner.quaternion.premultiply(qX);
      spinner.quaternion.premultiply(qY);

      velX = deltaX * (0.01667 / dt);
      velY = deltaY * (0.01667 / dt);
      idleTime = 0;
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!isDragging) return;
      isDragging = false;
      canvas.classList.remove('cursor-grabbing');
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch (_) {}
    };

    canvas.addEventListener('pointerdown', onPointerDown);
    canvas.addEventListener('pointermove', onPointerMove);
    canvas.addEventListener('pointerup', onPointerUp);
    canvas.addEventListener('pointercancel', onPointerUp);

    // Animation Loop
    let animId: number;
    let lastTime = performance.now();

    const animate = (now: number) => {
      animId = requestAnimationFrame(animate);

      const rawDt = (now - lastTime) / 1000;
      lastTime = now;
      const dt = Math.min(rawDt, 0.05);

      // Smooth arrow rotation
      if (Math.abs(smoothYRotRef.current) > 0.0005) {
        const step = smoothYRotRef.current * Math.min(1.0, 0.09 * dt * 60);
        const qY = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), step);
        spinner.quaternion.premultiply(qY);
        smoothYRotRef.current -= step;
      } else {
        smoothYRotRef.current = 0;
      }

      // Inertia & Idle Drift
      if (!isDragging && smoothYRotRef.current === 0) {
        if (Math.abs(velX) > 0.01 || Math.abs(velY) > 0.01) {
          const dx = velX * 0.008;
          const dy = velY * 0.008;
          const qY = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), dx);
          const qX = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), dy);
          spinner.quaternion.premultiply(qX);
          spinner.quaternion.premultiply(qY);

          const damp = Math.pow(0.94, dt * 60);
          velX *= damp;
          velY *= damp;
        } else {
          velX = 0;
          velY = 0;
        }

        idleTime += dt;
        if (idleTime > 0.6) {
          const blend = Math.min(1.0, (idleTime - 0.6) / 1.0);
          const dy = 0.0035 * blend * (dt * 60);
          const dx = 0.0012 * blend * (dt * 60);
          const qY = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), dy);
          const qX = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), dx);
          spinner.quaternion.premultiply(qX);
          spinner.quaternion.premultiply(qY);
        }
      }

      // Render Pipeline (2 Passes)
      if (rtBack && rtFront) {
        // Pass 1: Background into rtBack
        renderer.setRenderTarget(rtBack);
        renderer.clear();
        renderer.render(bgScene, bgCamera);

        // Pass 2: Background into rtFront + Cube Backside
        backMat.uniforms.uTexture.value = rtBack.texture;
        renderer.setRenderTarget(rtFront);
        renderer.clear();
        renderer.render(bgScene, bgCamera);

        cubeMesh.material = backMat;
        renderer.autoClear = false;
        renderer.render(scene, camera);

        // Pass 3: Screen Render (Background + Cube Frontside)
        frontMat.uniforms.uTexture.value = rtFront.texture;
        renderer.setRenderTarget(null);
        renderer.clear();
        renderer.render(bgScene, bgCamera);

        renderer.clearDepth();
        cubeMesh.material = frontMat;
        renderer.render(scene, camera);
        renderer.autoClear = true;
      }
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', layout);
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointercancel', onPointerUp);
      renderer.dispose();
      rtBack?.dispose();
      rtFront?.dispose();
    };
  }, []);

  const handlePrev = () => {
    smoothYRotRef.current -= Math.PI / 2;
    syncAxis(currentIdx - 1);
  };

  const handleNext = () => {
    smoothYRotRef.current += Math.PI / 2;
    syncAxis(currentIdx + 1);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative w-full h-screen min-h-[540px] overflow-hidden bg-black select-none">
      {/* Three.js Refraction Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block cursor-grab active:cursor-grabbing touch-none z-0"
        aria-label="Rotatable 3D Glass Object with Chromatic Refraction"
      />

      {/* High-End Design World Style UI Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10">
        
        {/* Navigation Arrows (Top-Right, rotating 3D object & cycling 5 axes) */}
        <div className="absolute top-[18.9%] left-[76.7%] -translate-x-[19px] -translate-y-1/2 flex gap-8 pointer-events-auto max-md:left-auto max-md:right-6 max-md:top-[15%] max-md:gap-3.5">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border-[2.5px] border-white bg-transparent text-white grid place-items-center cursor-pointer hover:bg-white hover:text-black transition-colors"
            aria-label="Previous Axis"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
              <path d="M19 12H5M11 6l-6 6 6 6" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full border-[2.5px] border-white bg-transparent text-white grid place-items-center cursor-pointer hover:bg-white hover:text-black transition-colors"
            aria-label="Next Axis"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>

        {/* 5-Axis Pagination Dots (Right edge, vertical) */}
        <nav className="absolute right-[calc(clamp(20px,6.95vw,120px)-7px)] top-[49.4%] -translate-y-1/2 flex flex-col gap-7 pointer-events-auto max-md:right-4 max-md:gap-4">
          {AXES_LIST.map((axis, idx) => (
            <button
              key={axis.id}
              onClick={() => {
                smoothYRotRef.current += (idx - currentIdx) * (Math.PI / 2);
                syncAxis(idx);
              }}
              className={`w-3.5 h-3.5 rounded-full border-2 border-white transition-all duration-300 ${
                idx === currentIdx ? 'bg-transparent scale-125' : 'bg-white'
              }`}
              title={`${axis.id}. ${axis.key}`}
              aria-label={`Select Axis ${axis.id}`}
            />
          ))}
        </nav>

        {/* Tagline (Bottom-Left) */}
        <p className="absolute left-[clamp(20px,6.95vw,120px)] bottom-[clamp(40px,7.5vh,70px)] text-[clamp(22px,2.5vw,42px)] leading-tight font-light tracking-tight text-white m-0 max-md:bottom-[clamp(150px,20vh,220px)]">
          Micro Architectures,<br />
          Made to <strong className="font-bold block">Wear.</strong>
        </p>

        {/* CTA Row (Center to Right: Explore Button -> Line -> Giant Outlined Axis Number) */}
        <div className="absolute left-[45.6%] -right-[1vw] top-[88.7%] -translate-y-1/2 flex items-center pointer-events-auto max-md:left-[clamp(20px,6.95vw,120px)] max-md:-right-[3vw] max-md:top-auto max-md:bottom-6 max-md:translate-y-0">
          <button
            onClick={() => scrollTo('axes')}
            className="flex-none px-4 h-12 inline-flex items-center border-[1.5px] border-white/85 rounded-md bg-black/20 hover:bg-white hover:text-black text-white text-sm font-medium transition-colors cursor-pointer"
          >
            Explore 5 Axes
          </button>

          <span className="flex-1 h-[1.5px] bg-white/80 min-w-[40px] ml-4 mr-2" />

          {/* Giant Outlined Number for the Current Axis (01 ~ 05) */}
          <span 
            className="flex-none text-[clamp(130px,18.5vw,340px)] font-normal leading-none tracking-tighter text-transparent select-none translate-y-[6%]"
            style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.9)' }}
            aria-hidden="true"
          >
            {AXES_LIST[currentIdx].id}
          </span>
        </div>

        {/* Loader Status */}
        {!isLoaded && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs tracking-[0.2em] uppercase opacity-60 text-white font-mono animate-pulse">
            Loading Optical Model
          </div>
        )}

      </div>
    </section>
  );
};
