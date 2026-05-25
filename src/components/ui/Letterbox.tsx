"use client";

import React from "react";
import { motion } from "framer-motion";
import { useWindowSize } from "@/components/animations/useWindowSize";

export default function Letterbox() {
  const { isMobile } = useWindowSize();
  // Cinematic transition timing:
  // Slide in: 0.8s
  // Hold: 2.7s (total 3.5s)
  // Slide out: 0.8s (total 4.3s)
  const duration = 4.3;
  const times = [0, 0.18, 0.82, 1]; // 0.18 of 4.3 is ~0.8s, 0.82 of 4.3 is ~3.5s

  return (
    <>
      {/* Top cinematic bar */}
      <motion.div
        className={`fixed top-0 left-0 right-0 bg-black z-[9990] pointer-events-none ${
          isMobile ? "h-[4vh]" : "h-[8vh]"
        }`}
        initial={{ y: "-100%" }}
        animate={{ y: ["-100%", "0%", "0%", "-100%"] }}
        transition={{
          duration,
          times,
          ease: "easeInOut",
        }}
      />
      {/* Bottom cinematic bar */}
      <motion.div
        className={`fixed bottom-0 left-0 right-0 bg-black z-[9990] pointer-events-none ${
          isMobile ? "h-[4vh]" : "h-[8vh]"
        }`}
        initial={{ y: "100%" }}
        animate={{ y: ["100%", "0%", "0%", "100%"] }}
        transition={{
          duration,
          times,
          ease: "easeInOut",
        }}
      />
    </>
  );
}
