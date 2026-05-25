"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { useAnimeStagger } from "@/components/animations/useAnimeStagger";
import MagneticButton from "@/components/ui/MagneticButton";

// Dynamic import of the 3D canvas with SSR disabled to prevent hydration errors
const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas"), {
  ssr: false,
});

const roles = [
  "Full-Stack Developer",
  "CTO @ Arcavon",
  "AI/ML Student",
];

export default function HeroScene() {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const { splitIntoLetters, animateLetters } = useAnimeStagger();
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    // Verify Syne font variable is loaded
    if (typeof window !== "undefined") {
      const computed = window.getComputedStyle(document.body).getPropertyValue("--font-syne");
      console.log("Syne Font Variable (--font-syne):", computed);
    }

    // Stagger in name letters after a slight delay for cinematic feel
    if (nameRef.current) {
      animateLetters(nameRef.current, 500);
    }

    // Cycle roles every 3 seconds
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [animateLetters]);

  const handleEnterClick = () => {
    interface CustomWindow extends Window {
      navigateToScene?: (index: number) => void;
    }
    const win = window as unknown as CustomWindow;
    if (typeof window !== "undefined" && win.navigateToScene) {
      win.navigateToScene(1);
    } else {
      document.getElementById("scene-2")?.scrollIntoView();
    }
  };

  return (
    <section
      id="scene-1"
      className="w-screen h-screen relative flex items-center justify-center overflow-hidden bg-black select-none"
    >
      {/* 3D Particle Backdrop */}
      <HeroCanvas />

      {/* Hero Content */}
      <div className="z-10 text-center max-w-4xl px-6 flex flex-col items-center justify-center">
        {/* Name Title */}
        <h1
          ref={nameRef}
          className="tracking-[0.12em] text-pure-white hero-text-glow uppercase select-none cursor-default mb-4"
          style={{
            fontSize: "clamp(3rem, 10vw, 11rem)",
            whiteSpace: "nowrap",
            fontFamily: "var(--font-syne), 'Syne', sans-serif",
            fontWeight: 800,
          }}
          dangerouslySetInnerHTML={{
            __html: splitIntoLetters("AKSHIT"),
          }}
        />

        {/* Subtitle */}
        <p className="font-inter font-light italic text-muted-silver tracking-[0.05em] text-sm md:text-base lg:text-xl mb-6 h-6 flex items-center justify-center">
          Building the future. One line at a time.
        </p>

        {/* Role Cycling Component */}
        <div className="h-10 mb-10 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentRoleIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="font-mono font-medium text-xs md:text-sm lg:text-base text-electric-cyan tracking-[0.2em] uppercase text-glow cursor-blink"
            >
              {roles[currentRoleIndex]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Magnetic CTA button */}
        <MagneticButton onClick={handleEnterClick}>
          See My Work
        </MagneticButton>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-silver text-[10px] tracking-widest uppercase">
        <span>Scroll Down</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-1 h-3 bg-electric-cyan rounded-full"
        />
      </div>
    </section>
  );
}
