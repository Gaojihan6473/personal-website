import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Stars, Sphere, Torus, Icosahedron } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { Particles } from './Particles';
import { Suspense, useRef, useMemo } from 'react';
import { useStore } from '../store';
import * as THREE from 'three';

function CameraController() {
  const activeSection = useStore((state) => state.activeSection);
  const vec = new THREE.Vector3();
  const target = new THREE.Vector3();

  useFrame((state) => {
    switch (activeSection) {
      case 'intro':
        vec.set(0, 2, 18);
        target.set(0, 0, 0);
        break;
      case 'hero':
        vec.set(0, 0, 5);
        target.set(0, 0, 0);
        break;
      case 'about':
        vec.set(5, 2, 2);
        target.set(0, 0, 0);
        break;
      case 'projects':
        vec.set(-5, -2, 2);
        target.set(0, 0, 0);
        break;
      case 'skills':
        vec.set(0, 5, 5);
        target.set(0, 0, 0);
        break;
      case 'contact':
        vec.set(0, -5, 5);
        target.set(0, 0, 0);
        break;
      default:
        vec.set(0, 0, 5);
        target.set(0, 0, 0);
        break;
    }

    state.camera.position.lerp(vec, 0.05);
    state.camera.lookAt(target);
  });

  return null;
}

function BackgroundObjects() {
  const planetRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (planetRef.current) {
      planetRef.current.rotation.y = time * 0.05;
      planetRef.current.rotation.x = time * 0.02;
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.z = time * 0.1;
      ringsRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;
    }
  });

  const nodes = useMemo(() => {
    return Array.from({ length: 30 }).map(() => ({
      position: [
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 20 - 5
      ] as [number, number, number],
      scale: Math.random() * 0.8 + 0.2,
      color: Math.random() > 0.5 ? "#38dcf0" : "#f0a838",
      wireframe: Math.random() > 0.5
    }));
  }, []);

  return (
    <group position={[0, 0, -10]}>
      {/* Central Holographic Planet */}
      <Sphere ref={planetRef} args={[6, 32, 32]}>
        <meshStandardMaterial 
          color="#1e201e" 
          emissive="#38dcf0" 
          emissiveIntensity={0.2} 
          wireframe 
          transparent 
          opacity={0.15} 
        />
      </Sphere>

      {/* Orbiting Data Rings */}
      <group ref={ringsRef}>
        <Torus args={[8, 0.02, 16, 100]} rotation={[Math.PI / 2.5, 0, 0]}>
          <meshStandardMaterial color="#f0a838" emissive="#f0a838" emissiveIntensity={0.5} wireframe />
        </Torus>
        <Torus args={[10, 0.01, 16, 100]} rotation={[Math.PI / 3, 0, 0]}>
          <meshStandardMaterial color="#38dcf0" emissive="#38dcf0" emissiveIntensity={0.8} />
        </Torus>
      </group>

      {/* Floating Monoliths / Data Nodes */}
      {nodes.map((node, i) => (
        <Float key={i} speed={2} rotationIntensity={2} floatIntensity={2} position={node.position}>
          <Icosahedron args={[node.scale, 0]}>
            <meshStandardMaterial 
              color="#1e201e" 
              emissive={node.color} 
              emissiveIntensity={0.4} 
              wireframe={node.wireframe}
              transparent
              opacity={0.6}
            />
          </Icosahedron>
        </Float>
      ))}
    </group>
  );
}

export function Scene() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#1e201e]">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <CameraController />
        <color attach="background" args={['#1e201e']} />
        <fog attach="fog" args={['#1e201e', 5, 30]} />
        
        <ambientLight intensity={0.3} color="#f5f5f0" />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#f0a838" />
        <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#38dcf0" />

        <Suspense fallback={null}>
          <BackgroundObjects />
          <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
            <Particles count={3000} />
          </Float>
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </Suspense>

        <EffectComposer>
          <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
