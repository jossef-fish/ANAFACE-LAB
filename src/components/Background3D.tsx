import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Stars } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 100, 100]} scale={2}>
        <MeshDistortMaterial
          color="#4DA3FF"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0}
          metalness={1}
          opacity={0.15}
          transparent
        />
      </Sphere>
    </Float>
  );
}

function WireframeFace() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[2, 0, -2]}>
      <mesh>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial color="#7A5CFF" wireframe opacity={0.1} transparent />
      </mesh>
    </group>
  );
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 -z-10 bg-[#0B0B0F]">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#4DA3FF" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7A5CFF" />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <AnimatedSphere />
        <WireframeFace />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B0B0F]/50 to-[#0B0B0F]" />
    </div>
  );
}
