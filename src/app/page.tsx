"use client";

import React, { useRef } from "react";
import dynamic from "next/dynamic";
import { useSceneTransition } from "@/components/animations/useSceneTransition";

// Dynamically import all scene components to avoid hydration errors
const HeroScene = dynamic(() => import("@/components/scenes/HeroScene"), {
  ssr: false,
});
const AboutScene = dynamic(() => import("@/components/scenes/AboutScene"), {
  ssr: false,
});
const ExperienceScene = dynamic(() => import("@/components/scenes/ExperienceScene"), {
  ssr: false,
});
const ProjectsScene = dynamic(() => import("@/components/scenes/ProjectsScene"), {
  ssr: false,
});
const SkillsScene = dynamic(() => import("@/components/scenes/SkillsScene"), {
  ssr: false,
});
const ContactScene = dynamic(() => import("@/components/scenes/ContactScene"), {
  ssr: false,
});

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

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
      <HeroScene />
      <AboutScene />
      <ExperienceScene />
      <ProjectsScene />
      <SkillsScene />
      <ContactScene />
    </div>
  );
}
