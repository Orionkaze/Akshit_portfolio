"use client";

import React, { useEffect, useState } from "react";
import { animate } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  duration?: number; // in seconds
  suffix?: string;
  prefix?: string;
  trigger?: boolean;
}

export default function AnimatedCounter({
  value,
  duration = 1.5,
  suffix = "",
  prefix = "",
  trigger = true,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    const controls = animate(0, value, {
      duration: duration,
      ease: "easeOut",
      onUpdate: (latest) => {
        setCount(Math.round(latest));
      },
    });

    return () => {
      controls.stop();
    };
  }, [value, duration, trigger]);

  return (
    <span className="font-space font-bold">
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

