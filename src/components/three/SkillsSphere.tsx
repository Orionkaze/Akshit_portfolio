"use client";

import React, { useRef, useState, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

import { useWindowSize } from "@/components/animations/useWindowSize";
import { skillsList, SkillItem } from "./skillsData";

function OrbitingSkill({
  skill,
  index,
  total,
}: {
  skill: SkillItem;
  index: number;
  total: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Assign distinct orbits
  const { radius, speed, phiOffset, thetaOffset } = useMemo(() => {
    // Alternate radii
    const radius = 2.0 + (index % 3) * 0.4;
    // Varying speeds
    const speed = 0.003 + (index % 4) * 0.0015;
    // Distribute angles evenly on a sphere
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const thetaOffset = Math.acos(1 - (2 * (index + 0.5)) / total);
    const phiOffset = (2 * Math.PI * index) / goldenRatio;

    return { radius, speed, phiOffset, thetaOffset };
  }, [index, total]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();

    // Orbitting angle
    const angle = time * speed + phiOffset;

    // Standard spherical coordinates
    const x = radius * Math.sin(thetaOffset) * Math.cos(angle);
    const y = radius * Math.sin(thetaOffset) * Math.sin(angle);
    const z = radius * Math.cos(thetaOffset);

    groupRef.current.position.set(x, y, z);
  });

  return (
    <group ref={groupRef}>
      <Html
        transform
        distanceFactor={6}
        occlude={false}
        className="pointer-events-none"
      >
        <div
          className="pointer-events-auto flex flex-col items-center justify-center transition-all duration-300 select-none cursor-pointer"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            transform: hovered ? "scale(1.4)" : "scale(1.0)",
          }}
        >
          {/* Circular Icon */}
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center border font-mono text-xs font-semibold"
            style={{
              borderColor: skill.color,
              color: hovered ? "#000000" : skill.color,
              backgroundColor: hovered ? skill.color : "rgba(10, 10, 15, 0.8)",
              boxShadow: hovered
                ? `0 0 15px ${skill.color}`
                : `0 0 5px ${skill.color}33`,
              transition: "all 0.3s ease",
            }}
          >
            {skill.short}
          </div>

          {/* Label under icon */}
          <span
            className="mt-2 text-[10px] font-space tracking-wider text-pure-white bg-black/90 px-1.5 py-0.5 rounded border border-white/10 uppercase transition-all duration-300"
            style={{
              opacity: hovered ? 1.0 : 0.0,
              transform: hovered ? "translateY(0)" : "translateY(-4px)",
            }}
          >
            {skill.name}
          </span>
        </div>
      </Html>
    </group>
  );
}

function CentralSphere() {
  const sphereRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      sphereRef.current.rotation.x = state.clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <mesh ref={sphereRef} castShadow={false} receiveShadow={false}>
      <sphereGeometry args={[1.2, 32, 32]} />
      <meshStandardMaterial
        color="#0A0A2E"
        emissive="#00D4FF"
        emissiveIntensity={0.15}
        roughness={0.8}
        metalness={0.9}
      />
    </mesh>
  );
}

export default function SkillsSphere() {
  const { isMobile, hasMeasured } = useWindowSize();
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isMobile]);

  if (!mounted || !hasMeasured || isMobile) {
    return null;
  }

  return (
    <div ref={containerRef} className="w-full h-[550px] relative bg-transparent flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        frameloop={isInView ? "always" : "demand"}
        className="w-full h-full"
      >

        <ambientLight color="#0A0A2E" intensity={0.8} />
        {/* Core glow from the center of the sphere */}
        <pointLight position={[0, 0, 0]} color="#00D4FF" intensity={3.5} distance={10} />
        
        <CentralSphere />
        
        {skillsList.map((skill, idx) => (
          <OrbitingSkill
            key={skill.name}
            skill={skill}
            index={idx}
            total={skillsList.length}
          />
        ))}
      </Canvas>
    </div>
  );
}
