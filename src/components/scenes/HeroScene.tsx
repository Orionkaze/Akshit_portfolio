"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useWindowSize } from "@/components/animations/useWindowSize";
import MagneticButton from "@/components/ui/MagneticButton";

// Dynamic import of the 3D canvas with SSR disabled to prevent hydration errors
const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas"), {
  ssr: false,
});

const roles = ["Full-Stack Developer", "CTO @ Arcavon", "AI/ML Student"];

const nameLetters = "AKSHIT".split("");

const letterVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.5 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.5 + i * 0.08,
      duration: 0.6,
      type: "spring",
      stiffness: 150,
      damping: 12,
    },
  }),
};

export default function HeroScene() {
  const { isMobile, hasMeasured } = useWindowSize();
  const [mounted, setMounted] = useState(false);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Cycle roles every 3 seconds
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleEnterClick = () => {
    interface CustomWindow extends Window {
      navigateToScene?: (index: number) => void;
    }
    const win = window as unknown as CustomWindow;
    if (typeof window !== "undefined" && win.navigateToScene) {
      win.navigateToScene(1);
    } else {
      document.getElementById("scene-1")?.scrollIntoView();
    }
  };

  return (
    <div
      id="scene-0"
      className="w-screen h-screen relative flex items-center justify-center overflow-hidden bg-black select-none"
    >
      {/* 3D Particle Backdrop */}
      {!mounted || !hasMeasured ? (
        <div className="w-full h-full absolute inset-0 -z-10 bg-radial-gradient" />
      ) : isMobile ? (
        <div className="w-full h-full absolute inset-0 -z-10 bg-radial-gradient" />
      ) : (
        <HeroCanvas />
      )}

      {/* Hero Content */}
      <div className="z-10 text-center max-w-4xl px-6 flex flex-col items-center justify-center">
        {/* Name Title */}
        <h1
          className="tracking-[0.12em] text-pure-white hero-text-glow uppercase select-none cursor-default mb-4 flex"
          style={{
            fontSize: "clamp(3rem, 10vw, 11rem)",
            whiteSpace: "nowrap",
            fontFamily: "var(--font-syne), 'Syne', sans-serif",
            fontWeight: 800,
          }}
        >
          {nameLetters.map((letter, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              className="inline-block"
              style={{ transformOrigin: "center" }}
            >
              {letter}
            </motion.span>
          ))}
        </h1>

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
        <MagneticButton onClick={handleEnterClick}>See My Work</MagneticButton>
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
    </div>
  );
}
