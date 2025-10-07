import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedSphere() {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = state.clock.getElapsedTime() * 0.15;
      sphereRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.8}
      floatIntensity={1.2}
      floatingRange={[-0.3, 0.3]}
    >
      <Sphere ref={sphereRef} args={[1.2, 128, 128]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#0ea5e9"
          attach="material"
          distort={0.5}
          speed={1.5}
          roughness={0.1}
          metalness={0.9}
          emissive="#0ea5e9"
          emissiveIntensity={0.3}
        />
      </Sphere>
    </Float>
  );
}

function SecondaryOrb({ position }: { position: [number, number, number] }) {
  const orbRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (orbRef.current) {
      orbRef.current.rotation.x = state.clock.getElapsedTime() * 0.3;
      orbRef.current.rotation.z = state.clock.getElapsedTime() * 0.25;
    }
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.5}
      floatIntensity={0.8}
      floatingRange={[-0.2, 0.2]}
    >
      <Sphere ref={orbRef} args={[0.4, 64, 64]} position={position}>
        <MeshDistortMaterial
          color="#8b5cf6"
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.2}
          metalness={0.7}
          emissive="#8b5cf6"
          emissiveIntensity={0.2}
        />
      </Sphere>
    </Float>
  );
}

export function ThreeScene() {
  return (
    <div className="absolute inset-0 opacity-40">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 2]}
      >
        {/* Enhanced Lighting */}
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.2} color="#0ea5e9" />
        <pointLight position={[-10, -10, -5]} intensity={0.8} color="#8b5cf6" />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          color="#ffffff"
        />
        
        {/* Starfield Background */}
        <Stars
          radius={100}
          depth={50}
          count={3000}
          factor={4}
          saturation={0}
          fade
          speed={0.5}
        />
        
        {/* Main Sphere */}
        <AnimatedSphere />
        
        {/* Secondary Orbs */}
        <SecondaryOrb position={[2.5, 1, -2]} />
        <SecondaryOrb position={[-2.5, -1, -1.5]} />
      </Canvas>
    </div>
  );
}