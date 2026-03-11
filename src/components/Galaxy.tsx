import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Torus, Float, Icosahedron, Stars, OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useStore } from '../store';
import { motion, AnimatePresence } from 'framer-motion';

function OrbitalParticles({ count = 500, radius = 12 }: { count?: number; radius: number }) {
  const points = useRef<THREE.Points>(null);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const r = radius + (Math.random() - 0.5) * 2;
      const height = (Math.random() - 0.5) * 0.5;
      positions[i * 3] = Math.cos(angle) * r;
      positions[i * 3 + 1] = height;
      positions[i * 3 + 2] = Math.sin(angle) * r;
    }
    return positions;
  }, [count, radius]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#f0a838"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Satellite({ orbitRadius, speed, size, color, startAngle = 0, orbitTilt = 0 }: {
  orbitRadius: number;
  speed: number;
  size: number;
  color: string;
  startAngle?: number;
  orbitTilt?: number;
}) {
  const ref = useRef<THREE.Group>(null);
  const orbitRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.getElapsedTime();
      const angle = time * speed + startAngle;
      ref.current.position.x = Math.cos(angle) * orbitRadius;
      ref.current.position.z = Math.sin(angle) * orbitRadius;
      ref.current.rotation.y = time * 2;
      ref.current.rotation.x = time * 1.5;
    }
  });

  return (
    <group ref={orbitRef} rotation={[orbitTilt, 0, 0]}>
      <group ref={ref}>
        <Float speed={3} rotationIntensity={2} floatIntensity={1}>
          <Icosahedron args={[size, 0]}>
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.5}
              wireframe
              transparent
              opacity={0.8}
            />
          </Icosahedron>
        </Float>
      </group>
    </group>
  );
}

function CentralPlanet({ onClick }: { onClick: () => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glow1Ref = useRef<THREE.Mesh>(null);
  const glow2Ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = time * 0.1;
      meshRef.current.rotation.x = time * 0.05;

      const targetScale = hovered ? 1.15 : 1;
      meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1);
      meshRef.current.scale.y = THREE.MathUtils.lerp(meshRef.current.scale.y, targetScale, 0.1);
      meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, targetScale, 0.1);
    }
    // Glow layer 1 - subtle breathing effect
    if (glow1Ref.current) {
      glow1Ref.current.rotation.y = time * 0.15;
      const pulseScale = 1 + Math.sin(time * 2) * 0.03;
      const glowScale = hovered ? 1.15 : pulseScale;
      glow1Ref.current.scale.x = THREE.MathUtils.lerp(glow1Ref.current.scale.x, glowScale, 0.1);
      glow1Ref.current.scale.y = THREE.MathUtils.lerp(glow1Ref.current.scale.y, glowScale, 0.1);
      glow1Ref.current.scale.z = THREE.MathUtils.lerp(glow1Ref.current.scale.z, glowScale, 0.1);
    }
    // Glow layer 2 - outer glow
    if (glow2Ref.current) {
      glow2Ref.current.rotation.y = time * 0.1;
      const pulseScale = 1 + Math.sin(time * 1.5 + 1) * 0.05;
      const glowScale = hovered ? 1.25 : pulseScale;
      glow2Ref.current.scale.x = THREE.MathUtils.lerp(glow2Ref.current.scale.x, glowScale, 0.1);
      glow2Ref.current.scale.y = THREE.MathUtils.lerp(glow2Ref.current.scale.y, glowScale, 0.1);
      glow2Ref.current.scale.z = THREE.MathUtils.lerp(glow2Ref.current.scale.z, glowScale, 0.1);
    }
  });

  const glowColor = hovered ? "#38dcf0" : "#f0a838";
  const glowOpacity = hovered ? 0.2 : 0.1;

  return (
    <group>
      {/* Outer subtle glow */}
      <mesh
        ref={glow2Ref}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
      >
        <sphereGeometry args={[2.8, 32, 32]} />
        <meshBasicMaterial
          color={glowColor}
          transparent
          opacity={glowOpacity * 0.5}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Inner glow - tight to planet */}
      <mesh
        ref={glow1Ref}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
      >
        <sphereGeometry args={[2.6, 32, 32]} />
        <meshBasicMaterial
          color={glowColor}
          transparent
          opacity={glowOpacity}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Main planet */}
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
        style={{ cursor: 'pointer' }}
      >
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshStandardMaterial
          color="#1e201e"
          emissive={hovered ? "#38dcf0" : "#f0a838"}
          emissiveIntensity={hovered ? 0.5 : 0.3}
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Inner core glow - only on hover */}
      {hovered && (
        <mesh>
          <sphereGeometry args={[1.2, 16, 16]} />
          <meshBasicMaterial
            color="#38dcf0"
            transparent
            opacity={0.15}
          />
        </mesh>
      )}
    </group>
  );
}

function OrbitRings() {
  // Multi-angle, multi-directional orbit rings
  const rings = [
    // Tilted rings on different axes
    { radius: 5, color: "#f0a838", opacity: 0.35, rotation: [Math.PI / 3, 0, Math.PI / 6] as [number, number, number], tube: 0.012 },
    { radius: 6.5, color: "#38dcf0", opacity: 0.25, rotation: [Math.PI / 2.2, Math.PI / 5, 0] as [number, number, number], tube: 0.01 },
    { radius: 8, color: "#f0a838", opacity: 0.2, rotation: [Math.PI / 1.8, 0, -Math.PI / 4] as [number, number, number], tube: 0.008 },
    { radius: 9.5, color: "#38dcf0", opacity: 0.15, rotation: [Math.PI / 4, Math.PI / 3, Math.PI / 6] as [number, number, number], tube: 0.008 },
    // More rings for complexity
    { radius: 11, color: "#f0a838", opacity: 0.12, rotation: [Math.PI / 2.5, -Math.PI / 4, 0] as [number, number, number], tube: 0.006 },
    { radius: 12.5, color: "#38dcf0", opacity: 0.1, rotation: [Math.PI / 3.5, Math.PI / 6, Math.PI / 3] as [number, number, number], tube: 0.005 },
  ];

  return (
    <group>
      {rings.map((ring, i) => (
        <mesh key={i} rotation={ring.rotation}>
          <torusGeometry args={[ring.radius, ring.tube, 16, 100]} />
          <meshStandardMaterial
            color={ring.color}
            emissive={ring.color}
            emissiveIntensity={0.5}
            transparent
            opacity={ring.opacity}
          />
        </mesh>
      ))}
    </group>
  );
}

function GalaxyScene({ onPlanetClick }: { onPlanetClick: () => void }) {
  return (
    <>
      <ambientLight intensity={0.3} color="#f5f5f0" />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#f0a838" />
      <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#38dcf0" />

      {/* Orbit Controls for mouse drag */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.3}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI * 3 / 4}
      />

      {/* Central Planet */}
      <CentralPlanet onClick={onPlanetClick} />

      {/* Orbit Rings */}
      <OrbitRings />

      {/* Satellites with different orbit tilts */}
      <Satellite orbitRadius={5} speed={1.5} size={0.3} color="#f0a838" startAngle={0} orbitTilt={Math.PI / 6} />
      <Satellite orbitRadius={6.5} speed={1.2} size={0.25} color="#38dcf0" startAngle={Math.PI / 3} orbitTilt={Math.PI / 4} />
      <Satellite orbitRadius={8} speed={0.8} size={0.35} color="#f0a838" startAngle={Math.PI / 2} orbitTilt={-Math.PI / 5} />
      <Satellite orbitRadius={9.5} speed={0.6} size={0.2} color="#38dcf0" startAngle={Math.PI * 2 / 3} orbitTilt={Math.PI / 3} />
      <Satellite orbitRadius={11} speed={0.5} size={0.28} color="#f0a838" startAngle={Math.PI} orbitTilt={-Math.PI / 4} />

      {/* Orbital Particles */}
      <OrbitalParticles count={300} radius={5.5} />
      <OrbitalParticles count={200} radius={7} />
      <OrbitalParticles count={150} radius={9} />
      <OrbitalParticles count={100} radius={11} />

      {/* Background Stars */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      {/* Post-processing */}
      <EffectComposer>
        <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.2} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
    </>
  );
}

export function Galaxy() {
  const { setActiveSection, setHasVisitedIntro } = useStore();

  const handlePlanetClick = () => {
    setHasVisitedIntro(true);
    // 触发 App.tsx 中的过渡动画
    setActiveSection('hero');
  };

  return (
    <section
      className="fixed inset-0 w-screen h-screen overflow-hidden bg-[#1e201e]"
    >
      {/* 3D Galaxy Scene */}
      <div className="fixed inset-0 w-screen h-screen">
        <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
          <color attach="background" args={['#1e201e']} />
          <fog attach="fog" args={['#1e201e', 8, 40]} />
          <GalaxyScene onPlanetClick={handlePlanetClick} />
        </Canvas>
      </div>

      {/* Hint Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none"
      >
        <p className="font-mono text-sm text-white/50 tracking-widest uppercase">
          点击星球进入
        </p>
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-2 text-[#38dcf0] text-2xl"
        >
          ↓
        </motion.div>
      </motion.div>
    </section>
  );
}
