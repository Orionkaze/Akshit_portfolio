"use client";

import { useState, useEffect } from "react";

export function useWindowSize() {
  // Safe default to match desktop SSR
  const [size, setSize] = useState({
    width: 1200,
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  });

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setSize({
        width: w,
        isMobile: w < 768,
        isTablet: w >= 768 && w <= 1024,
        isDesktop: w > 1024,
      });
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
}
