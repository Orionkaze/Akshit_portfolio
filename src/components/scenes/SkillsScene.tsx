"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useWindowSize } from "@/components/animations/useWindowSize";
import { skillsList } from "@/components/three/SkillsSphere";

// Dynamic import with SSR disabled to prevent 3D canvas compilation/hydration issues
const SkillsSphere = dynamic(() => import("@/components/three/SkillsSphere"), {
  ssr: false,
});

export default function SkillsScene() {
  const { isMobile } = useWindowSize();

  return (
    <section
      id="scene-5"
      className="w-screen min-h-screen relative flex flex-col justify-center items-center overflow-hidden bg-black py-20 px-6 select-none"
    >
      {/* Slow Shifting Nebula Background Layer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,#00D4FF11_0%,transparent_50%),radial-gradient(circle_at_20%_80%,#4A9EFF11_0%,transparent_50%)] animate-pulse duration-[8000ms] ease-in-out pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center z-10 relative pointer-events-none">
        <span className="font-mono text-xs text-electric-cyan uppercase tracking-widest">
          Capabilities
        </span>
        <h2 className="font-syne font-extrabold text-4xl md:text-5xl lg:text-7xl text-pure-white uppercase tracking-wider mt-2">
          The Arsenal
        </h2>
        <p className="font-inter text-xs md:text-sm text-muted-silver tracking-widest uppercase mt-4">
          {isMobile ? "Key technical capabilities." : "Hover over nodes to inspect details. Orbiting in 3D."}
        </p>
      </div>

      {/* Skills Container */}
      <div className="w-full max-w-4xl min-h-[350px] md:h-[550px] relative z-10 flex items-center justify-center mt-6">
        {isMobile ? (
          <div className="w-full max-w-[340px] xs:max-w-[400px] sm:max-w-[540px] grid grid-cols-3 sm:grid-cols-4 gap-3 px-4 py-8">
            {skillsList.map((skill) => (
              <div
                key={skill.name}
                className="flex flex-col items-center justify-center p-3 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-md transition-all duration-300 active:scale-95"
                style={{
                  boxShadow: `inset 0 0 10px ${skill.color}0a`,
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-bold mb-2 transition-all duration-300"
                  style={{
                    borderColor: skill.color,
                    color: skill.color,
                    backgroundColor: `${skill.color}11`,
                    borderWidth: '1.5px',
                    boxShadow: `0 0 8px ${skill.color}1f`,
                  }}
                >
                  {skill.short}
                </div>
                <span className="text-[9px] font-space tracking-wider text-muted-silver uppercase text-center font-medium">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <SkillsSphere />
        )}
      </div>

      {/* Subtle bottom legend */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 z-10 text-[10px] font-mono tracking-widest text-muted-silver uppercase">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-electric-cyan glow-primary" />
          <span>Frontend / UI</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-neon-blue" />
          <span>Backend / Ops</span>
        </div>
      </div>
    </section>
  );
}
