"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

import { useWindowSize } from "@/components/animations/useWindowSize";

function Particles({ count = 250 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { mouse } = useThree();

  // Create temporary objects for updates
  const tempObject = useMemo(() => new THREE.Object3D(), []);
  
  // Store initial offsets and speed characteristics for each particle
  const particles = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      // Random coordinates in 3D space
      const x = THREE.MathUtils.randFloatSpread(12);
      const y = THREE.MathUtils.randFloatSpread(12);
      const z = THREE.MathUtils.randFloatSpread(8) - 2; // Keep them slightly behind

      const speed = THREE.MathUtils.randFloat(0.1, 0.4);
      const factor = THREE.MathUtils.randFloat(0.5, 1.5);
      const scale = THREE.MathUtils.randFloat(0.04, 0.08);

      data.push({ x, y, z, speed, factor, scale });
    }
    return data;
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();

    // Base mesh group rotation
    meshRef.current.rotation.y = time * 0.03;

    particles.forEach((p, idx) => {
      // Slow float on Y axis using sin(time)
      const floatY = p.y + Math.sin(time * p.speed + p.factor) * 0.2;

      // Mouse drag/influence: pull particles towards normalized mouse position
      // Mouse ranges from -1 to 1. Scale the pull.
      const targetX = p.x + mouse.x * 0.8;
      const targetY = floatY + mouse.y * 0.8;

      // Use lerp to smooth the transition towards target coordinate
      const currentX = THREE.MathUtils.lerp(p.x, targetX, 0.05);
      const currentY = THREE.MathUtils.lerp(p.y, targetY, 0.05);

      tempObject.position.set(currentX, currentY, p.z);
      tempObject.scale.setScalar(p.scale);
      tempObject.updateMatrix();

      meshRef.current!.setMatrixAt(idx, tempObject.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      args={[null as any, null as any, count]}
      castShadow={false}
      receiveShadow={false}
    >

      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#00D4FF"
        emissive="#00D4FF"
        emissiveIntensity={0.6}
        roughness={0.1}
        metalness={0.8}
      />
    </instancedMesh>
  );
}

export default function HeroCanvas() {
  const { isMobile, isTablet, hasMeasured } = useWindowSize();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !hasMeasured || isMobile) {
    return <div className="w-full h-full absolute inset-0 -z-10 bg-radial-gradient" />;
  }

  const particleCount = isTablet ? 100 : 250;

  return (
    <div className="w-full h-full absolute inset-0 -z-10 bg-radial-gradient">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full"
      >
        <ambientLight color="#0A0A2E" intensity={0.6} />
        <pointLight position={[0, 0, 0]} color="#00D4FF" intensity={3.5} distance={15} />
        <Particles count={particleCount} />
      </Canvas>
    </div>
  );
}
