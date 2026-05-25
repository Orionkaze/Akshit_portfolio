"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useWindowSize } from "@/components/animations/useWindowSize";

const scenes = [
  { id: "scene-0", label: "Opening" },
  { id: "scene-1", label: "Story" },
  { id: "scene-2", label: "Journey" },
  { id: "scene-3", label: "Work" },
  { id: "scene-4", label: "Arsenal" },
  { id: "scene-5", label: "Call" },
];

export default function SceneNav() {
  const { isMobile, isTablet, hasMeasured } = useWindowSize();
  const [activeScene, setActiveScene] = useState("scene-0");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px", // Trigger when scene occupies the center of the viewport
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveScene(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    scenes.forEach((scene) => {
      const el = document.getElementById(scene.id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  const handleDotClick = (index: number) => {
    interface CustomWindow extends Window {
      navigateToScene?: (index: number) => void;
    }
    const win = window as unknown as CustomWindow;
    if (typeof window !== "undefined" && win.navigateToScene) {
      win.navigateToScene(index);
    } else {
      const target = document.getElementById(scenes[index].id);
      if (target) {
        target.scrollIntoView();
      }
    }
  };

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !hasMeasured) return null;

  return (
    <>
      {/* Mobile Bottom Progress Bar */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 h-1 bg-white/10 z-[9999] md:hidden">
          <div
            className="h-full bg-electric-cyan glow-primary transition-all duration-75"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      )}

      {/* Desktop/Tablet Side Dot Nav */}
      {!isMobile && (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[999] flex flex-col gap-6 items-end">
          {scenes.map((scene, index) => {
            const isActive = activeScene === scene.id;
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={scene.id}
                className="flex items-center gap-4 relative group cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleDotClick(index)}
              >
                {/* Hover Tooltip/Label */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.span
                      initial={{ opacity: 0, x: 10, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="text-xs font-space font-medium text-electric-cyan bg-deep-space/80 px-2 py-1 rounded border border-electric-cyan/20 backdrop-blur-sm pointer-events-none select-none uppercase tracking-widest absolute right-8 whitespace-nowrap"
                    >
                      {scene.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Navigation Dot */}
                <div className="w-6 h-6 flex items-center justify-center">
                  <motion.div
                    className="rounded-full cursor-pointer relative"
                    animate={{
                      width: isActive ? (isTablet ? "8px" : "12px") : (isTablet ? "4px" : "6px"),
                      height: isActive ? (isTablet ? "8px" : "12px") : (isTablet ? "4px" : "6px"),
                      backgroundColor: isActive ? "#00D4FF" : "#A0AEC0",
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="glow-ring"
                        className="absolute -inset-2.5 rounded-full border border-electric-cyan/50 pointer-events-none glow-primary"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 2,
                          ease: "easeInOut",
                        }}
                      />
                    )}
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
