import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Float } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Orb() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.5;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <Float speed={4} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 64, 64]} scale={1.5}>
        <MeshDistortMaterial
          color="#4DA3FF"
          attach="material"
          distort={0.5}
          speed={3}
          roughness={0.2}
          metalness={0.8}
          emissive="#4DA3FF"
          emissiveIntensity={0.5}
        />
      </Sphere>
    </Float>
  );
}

export default function AIOrb() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#4DA3FF" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7A5CFF" />
        <Orb />
      </Canvas>
    </div>
  );
}
