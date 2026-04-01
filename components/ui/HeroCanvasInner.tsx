'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, SpotLight } from '@react-three/drei';
import * as THREE from 'three';

function GoldCar() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    // Gentle bob
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.08;
  });

  return (
    <group ref={groupRef}>
      {/* Car body */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[3.2, 0.7, 1.4]} />
        <meshStandardMaterial
          color="#C5A059"
          metalness={0.92}
          roughness={0.08}
          envMapIntensity={1.5}
        />
      </mesh>
      {/* Car roof / cabin */}
      <mesh position={[0.1, 0.55, 0]} castShadow>
        <boxGeometry args={[1.8, 0.5, 1.25]} />
        <meshStandardMaterial
          color="#B08040"
          metalness={0.88}
          roughness={0.1}
          envMapIntensity={1.2}
        />
      </mesh>
      {/* Windshield */}
      <mesh position={[0.9, 0.5, 0]} rotation={[0, 0, -0.3]} castShadow>
        <boxGeometry args={[0.05, 0.45, 1.2]} />
        <meshStandardMaterial color="#1a2a3a" metalness={0.5} roughness={0.05} transparent opacity={0.7} />
      </mesh>
      {/* Front bumper */}
      <mesh position={[1.6, -0.2, 0]}>
        <boxGeometry args={[0.15, 0.3, 1.35]} />
        <meshStandardMaterial color="#A08030" metalness={0.9} roughness={0.15} />
      </mesh>
      {/* Front wheels */}
      <mesh position={[1.1, -0.42, 0.78]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.32, 0.32, 0.22, 24]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.8} />
      </mesh>
      <mesh position={[1.1, -0.42, -0.78]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.32, 0.32, 0.22, 24]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.8} />
      </mesh>
      {/* Rear wheels */}
      <mesh position={[-1.1, -0.42, 0.78]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.32, 0.32, 0.22, 24]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.8} />
      </mesh>
      <mesh position={[-1.1, -0.42, -0.78]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.32, 0.32, 0.22, 24]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.8} />
      </mesh>
      {/* Headlights */}
      <mesh position={[1.62, 0.05, 0.45]}>
        <boxGeometry args={[0.06, 0.14, 0.28]} />
        <meshStandardMaterial color="#fffbe6" metalness={0.1} roughness={0.0} emissive="#fffbe6" emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[1.62, 0.05, -0.45]}>
        <boxGeometry args={[0.06, 0.14, 0.28]} />
        <meshStandardMaterial color="#fffbe6" metalness={0.1} roughness={0.0} emissive="#fffbe6" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

export default function HeroCanvasInner() {
  return (
    <Canvas
      camera={{ position: [4, 2, 5], fov: 40 }}
      style={{ width: '100%', height: '100%', background: 'transparent' }}
      gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
    >
      <ambientLight intensity={0.15} />

      {/* Warm spotlight — top right */}
      <SpotLight
        position={[5, 6, 3]}
        angle={0.4}
        penumbra={0.3}
        intensity={3}
        color="#FFF5E0"
        castShadow
      />

      {/* Purple spotlight — bottom left */}
      <SpotLight
        position={[-4, -2, 2]}
        angle={0.5}
        penumbra={0.5}
        intensity={2.5}
        color="#7B4FAB"
      />

      <Environment preset="city" />

      <GoldCar />

      <OrbitControls
        autoRotate
        autoRotateSpeed={1.2}
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
}
