"use client";

import React, { useEffect, useRef } from "react";
import { useWindowSize } from "@/components/animations/useWindowSize";

export default function FilmGrain() {
  const { isMobile } = useWindowSize();
  const filterRef = useRef<SVGFETurbulenceElement>(null);

  useEffect(() => {
    let animationId: number;
    const baseVal = 0.8;


    const animateGrain = () => {
      if (filterRef.current) {
        // Slightly fluctuate the baseFrequency to animate the grain texture
        // using requestAnimationFrame for a living texture
        const newValX = baseVal + Math.random() * 0.02;
        const newValY = baseVal + Math.random() * 0.02;
        filterRef.current.setAttribute("baseFrequency", `${newValX} ${newValY}`);
      }
      animationId = requestAnimationFrame(animateGrain);
    };

    animationId = requestAnimationFrame(animateGrain);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className={`fixed inset-0 pointer-events-none z-[9999] w-full h-full ${
      isMobile ? "opacity-[0.02]" : "opacity-[0.035]"
    }`}>
      <svg className="w-full h-full">
        <filter id="cinematic-noise">
          <feTurbulence
            ref={filterRef}
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.8 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#cinematic-noise)" />
      </svg>
    </div>
  );
}
