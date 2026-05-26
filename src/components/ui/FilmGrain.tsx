"use client";

import React from "react";
import { useWindowSize } from "@/components/animations/useWindowSize";

export default function FilmGrain() {
  const { isMobile } = useWindowSize();

  // On mobile, skip entirely for performance
  if (isMobile) return null;

  // Use a static CSS-based noise instead of per-frame SVG feTurbulence updates.
  // This eliminates the requestAnimationFrame loop that was causing jank during scrolling.
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
      }}
    />
  );
}
