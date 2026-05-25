"use client";

import React, { useRef, useState, useEffect } from "react";
import { useSceneTransition } from "@/components/animations/useSceneTransition";

import HeroScene from "@/components/scenes/HeroScene";
import AboutScene from "@/components/scenes/AboutScene";
import ExperienceScene from "@/components/scenes/ExperienceScene";
import ProjectsScene from "@/components/scenes/ProjectsScene";
import SkillsScene from "@/components/scenes/SkillsScene";
import ContactScene from "@/components/scenes/ContactScene";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Transition overlay element references
  const blackFadeRef = useRef<HTMLDivElement>(null);
  const wipePanelRef = useRef<HTMLDivElement>(null);
  const zoomOverlayRef = useRef<HTMLDivElement>(null);
  const particleExplosionRef = useRef<HTMLDivElement>(null);

  // Wire up the GSAP ScrollTrigger scene pin and transition orchestrator
  useSceneTransition(containerRef, {
    blackFade: blackFadeRef,
    wipePanel: wipePanelRef,
    zoomOverlay: zoomOverlayRef,
    particleExplosion: particleExplosionRef,
  });

  return (
    <div ref={containerRef} className="relative w-screen overflow-x-hidden bg-black">
      {/* Cinematic Transition Overlays */}

      {/* 1. Black Fade Overlay */}
      <div
        ref={blackFadeRef}
        className="fixed inset-0 bg-black opacity-0 pointer-events-none z-[9980]"
      />

      {/* 2. Wipe Panel Overlay */}
      <div
        ref={wipePanelRef}
        className="fixed inset-0 bg-deep-space pointer-events-none z-[9980] left-[-100%] w-full h-full"
      />

      {/* 3. Zoom Overlay */}
      <div
        ref={zoomOverlayRef}
        className="fixed inset-0 bg-black opacity-0 scale-[0.1] pointer-events-none z-[9980] flex items-center justify-center"
      >
        <div className="w-full h-full bg-[radial-gradient(circle,transparent_20%,#000000_80%)]" />
      </div>

      {/* 4. Particle Explosion Overlay */}
      <div
        ref={particleExplosionRef}
        className="fixed inset-0 bg-[radial-gradient(circle,rgba(0,212,255,0.8)_0%,#000000_70%)] opacity-0 pointer-events-none z-[9980]"
      />

      {/* Cinematic Scenes */}
      {mounted ? (
        <>
          <HeroScene />
          <AboutScene />
          <ExperienceScene />
          <ProjectsScene />
          <SkillsScene />
          <ContactScene />
        </>
      ) : (
        <>
          <div id="scene-0" className="w-screen h-screen bg-black" />
          <div id="scene-1" className="w-screen h-screen bg-black" />
          <div id="scene-2" className="w-screen h-screen bg-black" />
          <div id="scene-3" className="w-screen h-screen bg-black" />
          <div id="scene-4" className="w-screen h-screen bg-black" />
          <div id="scene-5" className="w-screen h-screen bg-black" />
        </>
      )}
    </div>
  );
}
