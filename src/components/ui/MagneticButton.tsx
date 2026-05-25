"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, HTMLMotionProps } from "framer-motion";

interface MagneticButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  pullRadius?: number;
  pullStrength?: number;
}

export default function MagneticButton({
  children,
  pullRadius = 80,
  pullStrength = 0.45,
  className = "",
  ...props
}: MagneticButtonProps) {

  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const elasticX = useSpring(x, springConfig);
  const elasticY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const rect = ref.current.getBoundingClientRect();
    const btnX = rect.left + rect.width / 2;
    const btnY = rect.top + rect.height / 2;

    const dx = clientX - btnX;
    const dy = clientY - btnY;
    const distance = Math.hypot(dx, dy);

    if (distance < pullRadius) {
      setIsHovered(true);
      // Magnetic pull
      x.set(dx * pullStrength);
      y.set(dy * pullStrength);
    } else {
      handleMouseLeave();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: elasticX, y: elasticY }}
      className={`relative font-space font-semibold uppercase tracking-[0.15em] px-7 py-3 md:px-10 md:py-4 border-2 border-electric-cyan rounded bg-transparent text-electric-cyan overflow-hidden transition-all duration-300 ${
        isHovered
          ? "bg-electric-cyan text-black glow-btn-hover"
          : ""
      } ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
