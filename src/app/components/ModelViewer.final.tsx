"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Suspense, useEffect, useState, useRef, useMemo } from "react";
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import type { Group } from "three";

interface ModelLoadingState {
  status: 'loading' | 'success' | 'error';
  error?: string;
  progress?: number;
}

interface ModelConfig {
  path: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  color: string;
  floating?: boolean;
}

interface ModelProps {
  onLoadingStateChange: (state: ModelLoadingState) => void;
}

interface ModelViewerProps {
  onRotationChange?: (rotation: number) => void;
}

function Model({ onLoadingStateChange }: ModelProps) {
  const [models, setModels] = useState<Group[]>([]);
  const modelsToLoad = useMemo<ModelConfig[]>(() => ([
    {
      path: '/uploads_files_3983747_FinancePack/POS.fbx',
      position: [0, -1.5, 1.7] as [number, number, number],
      rotation: [0, 0, 0] as [number, number, number],
      scale: 0.006,
      color: '#14B8A6'
    },
    {
      path: '/uploads_files_3983747_FinancePack/Graph.fbx',
      position: [0, 1.2, -1.2] as [number, number, number],
      rotation: [-Math.PI / 12, 0, 0] as [number, number, number],
      scale: 0.007,
      color: '#2563eb'
    },
    {
      path: '/uploads_files_3983747_FinancePack/Arrow.fbx',
      position: [0, 0.7, -0.8] as [number, number, number],
      rotation: [0, 0, -Math.PI /8] as [number, number, number],
      scale: 0.007,
      color: '#30d608'
    },
    {
      path: '/uploads_files_3983747_FinancePack/Shield.fbx',
      position: [-2.5, -0.5, 0] as [number, number, number],
      rotation: [0, Math.PI / 6, 0] as [number, number, number],
      scale: 0.006,
      color: '#8B5CF6'
    },
    {
      path: '/uploads_files_3983747_FinancePack/CoinStackBig.fbx',
      position: [-2, -1.5, 0.5] as [number, number, number],
      rotation: [0, -Math.PI / 4, 0] as [number, number, number],
      scale: 0.004,
      color: '#FCD34D'
    },
    {
      path: '/uploads_files_3983747_FinancePack/PiggyBanck.fbx',
      position: [3, -1, 0] as [number, number, number],
      rotation: [0, -Math.PI / 4, 0] as [number, number, number],
      scale: 0.006,
      color: '#EC4899'
    },
    {
      path: '/uploads_files_3983747_FinancePack/Card.fbx',
      position: [2, 0, 0] as [number, number, number],
      rotation: [Math.PI / 12, Math.PI / 4, 0] as [number, number, number],
      scale: 0.004,
      color: '#e4162c'
    },
    {
      path: '/uploads_files_3983747_FinancePack/CoinStackMedium.fbx',
      position: [2, -1.5, 0.5] as [number, number, number],
      rotation: [0, Math.PI / 6, 0] as [number, number, number],
      scale: 0.004,
      color: '#FCD34D'
    },
    ...generateFloatingCoins(6)
  ]), []);

  useEffect(() => {
    let loadedCount = 0;
    const loadedModels: Group[] = [];
    const animations: number[] = [];

    modelsToLoad.forEach(({ path }, index) => {
      const loader = new FBXLoader();
      loader.load(
        path,
        (fbx: Group) => {
          try {
            fbx.scale.setScalar(modelsToLoad[index].scale);
            
            if (modelsToLoad[index].floating) {
              const originalY = modelsToLoad[index].position[1];
              const floatPhase = Math.random() * Math.PI * 2;
              const rotatePhase = Math.random() * Math.PI * 2;
              const animate = () => {
                const animationId = requestAnimationFrame(animate);
                animations.push(animationId);
                const time = Date.now() * 0.001;
                fbx.position.y = originalY + Math.sin(time + floatPhase) * 0.3;
                fbx.rotation.y = rotatePhase + time * 2;
              };
              animate();
            }

            fbx.position.set(...modelsToLoad[index].position);
            fbx.rotation.set(...modelsToLoad[index].rotation);
            
            fbx.traverse((child) => {
              if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh;
                const isGold = modelsToLoad[index].color === '#FCD34D';
                mesh.material = new THREE.MeshPhysicalMaterial({
                  color: modelsToLoad[index].color,
                  metalness: isGold || modelsToLoad[index].floating ? 0.9 : 0.1,
                  roughness: isGold || modelsToLoad[index].floating ? 0.1 : 0.2,
                  emissive: modelsToLoad[index].color,
                  emissiveIntensity: isGold || modelsToLoad[index].floating ? 0.5 : 0.2,
                  clearcoat: isGold || modelsToLoad[index].floating ? 1 : 0.5,
                  clearcoatRoughness: 0.1,
                  reflectivity: isGold || modelsToLoad[index].floating ? 1 : 0.5,
                });
              }
            });
            
            loadedModels[index] = fbx;
            loadedCount++;

            onLoadingStateChange({ 
              status: 'loading',
              progress: Math.round((loadedCount / modelsToLoad.length) * 100)
            });

            if (loadedCount === modelsToLoad.length) {
              setModels(loadedModels);
              onLoadingStateChange({ status: 'success' });
            }
          } catch (err) {
            onLoadingStateChange({ 
              status: 'error', 
              error: 'Error processing model: ' + (err instanceof Error ? err.message : String(err))
            });
          }
        },
        (progress) => {
          const percentComplete = progress.loaded && progress.total 
            ? Math.round((progress.loaded / progress.total) * 100)
            : 0;
          onLoadingStateChange({ 
            status: 'loading',
            progress: percentComplete 
          });
        },
        (error: unknown) => {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          onLoadingStateChange({ 
            status: 'error', 
            error: 'Error loading FBX: ' + errorMessage
          });
        }
      );
    });

    return () => {
      animations.forEach(id => cancelAnimationFrame(id));
      setModels([]);
    };
  }, [modelsToLoad, onLoadingStateChange]); // Added modelsToLoad to dependency array

  return (
    <group>
      {models.map((model, index) => (
        <group key={index}>
          <primitive object={model} />
        </group>
      ))}
    </group>
  );
}

export default function ModelViewer({ onRotationChange }: ModelViewerProps) {
  const [loadingState, setLoadingState] = useState<ModelLoadingState>({ status: 'loading' });
  const [isMobile, setIsMobile] = useState(false);
  // State for controlling model rotation - used by OrbitControls
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [rotateDirection, setRotateDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  /* eslint-enable @typescript-eslint/no-unused-vars */
  const controlsRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (loadingState.status === 'error') {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-lg">
          <h3 className="text-red-800 font-medium mb-2">Failed to load 3D model</h3>
          <p className="text-red-600">{loadingState.error}</p>
          <p className="text-red-600 mt-2">Please ensure your FBX file is exported correctly from Blender.</p>
        </div>
      </div>
    );
  }

  // Explicitly disable the any warning for the event parameter since
  // the OrbitControls event type is complex and internal to three.js
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const handleCameraChange = (event: any) => {
    if (event?.target) {
      const azimuthalAngle = event.target.getAzimuthalAngle();
      onRotationChange?.(azimuthalAngle);
    }
  };

  return (
    <div className="w-full h-[500px] md:h-[600px] relative touch-none">
      {loadingState.status === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-white bg-opacity-75">
          <div className="flex flex-col items-center space-y-4 p-6 bg-white rounded-lg shadow-lg">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <div className="flex flex-col items-center">
              <p className="text-blue-600 font-medium mb-2">Loading 3D model...</p>
              {loadingState.progress !== undefined && (
                <div className="w-48 bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${loadingState.progress}%` }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <Canvas
        camera={{
          fov: isMobile ? 50 : 40,
          near: 0.1,
          far: 1000,
          position: [0, 2, isMobile ? 14 : 12]
        }}
      >
        <Environment preset="studio" />
        <ambientLight intensity={0.6} />
        <directionalLight position={[-5, 5, 5]} intensity={1.5} />
        <directionalLight position={[5, 5, -5]} intensity={1.5} />
        <spotLight
          position={[0, 10, 0]}
          angle={0.6}
          penumbra={1}
          intensity={2}
          castShadow
        />
        <spotLight
          position={[0, -10, 0]}
          angle={0.6}
          penumbra={1}
          intensity={1}
          castShadow
        />
        <spotLight
          position={[0, 2, 5]}
          angle={0.8}
          penumbra={0.5}
          intensity={1.5}
          castShadow
        />
        <Suspense fallback={null}>
          <Model onLoadingStateChange={setLoadingState} />
        </Suspense>
        <OrbitControls 
          ref={controlsRef}
          enableZoom={false}
          enablePan={false}
          autoRotate={true}
          autoRotateSpeed={isPaused ? 0 : -1 * rotateDirection}
          minDistance={isMobile ? 8 : 7}
          maxDistance={isMobile ? 18 : 16}
          onChange={handleCameraChange}
        />
      </Canvas>
    </div>
  );
}

function generateFloatingCoins(count: number): ModelConfig[] {
  return Array.from({ length: count }).map((_, i) => ({
    path: '/uploads_files_3983747_FinancePack/Coin.fbx',
    position: [
      Math.cos(i * Math.PI / 3) * 2.5 + (Math.random() - 0.5) * 2,
      1 + Math.sin(i * Math.PI / 3),
      Math.sin(i * Math.PI / 3) * 2 + (Math.random() - 0.5) * 2
    ] as [number, number, number],
    rotation: [
      Math.PI / 4,
      Math.random() * Math.PI * 2,
      Math.PI / 6
    ] as [number, number, number],
    scale: 0.003,
    color: '#FCD34D',
    floating: true
  }));
}
