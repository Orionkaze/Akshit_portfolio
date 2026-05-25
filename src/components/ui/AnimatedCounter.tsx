"use client";

import React, { useEffect, useRef, useState } from "react";
import { animate } from "animejs";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

export default function AnimatedCounter({
  value,
  duration = 1500,
  suffix = "",
  prefix = "",
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const containerRef = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    let active = true;

    const startAnimation = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;
      
      const obj = { val: 0 };
      animate(obj, {
        val: value,
        round: 1,
        easing: "easeOutExpo",
        duration: duration,
        update: () => {
          if (active) setCount(obj.val);
        },
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startAnimation();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const fallbackTimer = setTimeout(() => {
      startAnimation();
    }, 500);

    return () => {
      active = false;
      clearTimeout(fallbackTimer);
      observer.disconnect();
    };
  }, [value, duration]);

  return (
    <span ref={containerRef} className="font-space font-bold">
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

