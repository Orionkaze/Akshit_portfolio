"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CardSwap, { Card } from "@/components/ui/CardSwap";
import { useWindowSize } from "@/components/animations/useWindowSize";

export default function ExperienceScene() {
  const { isMobile } = useWindowSize();
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Fade in left column (Title)
      if (leftColRef.current) {
        gsap.fromTo(
          leftColRef.current,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Fade in right column (CardSwap container)
      if (rightColRef.current) {
        gsap.fromTo(
          rightColRef.current,
          { opacity: 0, x: 50 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      id="scene-2"
      className="w-screen min-h-screen relative overflow-hidden bg-black py-24 lg:py-0 px-6 md:px-12 lg:px-24 select-none flex items-center justify-center"
    >
      {/* Cinematic grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center w-full">
          
          {/* Left Column: Title & Subtitle */}
          <div ref={leftColRef} className="flex flex-col justify-center">
            <span className="font-mono text-xs text-electric-cyan uppercase tracking-widest mb-2 block">
              Timeline
            </span>
            <h2 className="font-syne font-extrabold text-4xl md:text-5xl lg:text-7xl text-pure-white uppercase tracking-wider mb-6">
              THE JOURNEY
            </h2>
            <p className="font-inter font-light text-muted-silver text-lg md:text-xl lg:text-2xl leading-relaxed max-w-lg">
              Designing modular architectures, leading developer communities, and building high-performance systems.
            </p>
          </div>

          {/* Right Column: CardSwap Stack */}
          <div
            ref={rightColRef}
            className={`flex items-center justify-center lg:justify-end relative w-full ${isMobile ? "h-auto" : "h-[400px] md:h-[450px]"}`}
          >
            {isMobile ? (
              /* Clean vertical list on mobile for perfect readability */
              <div className="flex flex-col gap-6 w-full max-w-[420px] mx-auto mt-6">
                <div className="w-full bg-[#0A0A0F]/70 border border-electric-cyan/30 rounded-2xl p-6 flex flex-col shadow-2xl relative overflow-hidden">
                  <p className="font-mono text-xs text-electric-cyan tracking-[0.2em] uppercase mb-2">
                    2025 – PRESENT
                  </p>
                  <h3 className="font-syne font-extrabold text-xl text-pure-white uppercase mb-1">
                    CTO & Full-Stack Dev
                  </h3>
                  <p className="font-mono text-xs text-electric-cyan mb-3">@Arcavon</p>
                  <ul className="flex flex-col gap-2.5">
                    <li className="font-inter font-light text-xs text-muted-silver flex items-start gap-2">
                      <span className="text-electric-cyan font-bold mt-1 text-xs">▸</span>
                      <span>Led end-to-end architecture of a game-tech platform</span>
                    </li>
                    <li className="font-inter font-light text-xs text-muted-silver flex items-start gap-2">
                      <span className="text-electric-cyan font-bold mt-1 text-xs">▸</span>
                      <span>99% uptime, thousands of monthly visits</span>
                    </li>
                    <li className="font-inter font-light text-xs text-muted-silver flex items-start gap-2">
                      <span className="text-electric-cyan font-bold mt-1 text-xs">▸</span>
                      <span>Reduced feature dev time by ~30% with modular architecture</span>
                    </li>
                  </ul>
                </div>

                <div className="w-full bg-[#0A0A0F]/70 border border-electric-cyan/15 rounded-2xl p-6 flex flex-col shadow-2xl relative overflow-hidden">
                  <p className="font-mono text-xs text-electric-cyan tracking-[0.2em] uppercase mb-2">
                    2025
                  </p>
                  <h3 className="font-syne font-extrabold text-xl text-pure-white uppercase mb-1">
                    Google Student Ambassador
                  </h3>
                  <p className="font-mono text-xs text-electric-cyan mb-3">@SDGI</p>
                  <ul className="flex flex-col gap-2.5">
                    <li className="font-inter font-light text-xs text-muted-silver flex items-start gap-2">
                      <span className="text-electric-cyan font-bold mt-1 text-xs">▸</span>
                      <span>Led university technical chapters, conducting community bootcamps on cloud services, Git, and REST APIs</span>
                    </li>
                    <li className="font-inter font-light text-xs text-muted-silver flex items-start gap-2">
                      <span className="text-electric-cyan font-bold mt-1 text-xs">▸</span>
                      <span>Orchestrated cross-university dev sessions, improving average student project completion rates</span>
                    </li>
                  </ul>
                </div>

                <div className="w-full bg-[#0A0A0F]/70 border border-electric-cyan/15 rounded-2xl p-6 flex flex-col shadow-2xl relative overflow-hidden">
                  <p className="font-mono text-xs text-electric-cyan tracking-[0.2em] uppercase mb-2">
                    2026 – PRESENT
                  </p>
                  <h3 className="font-syne font-extrabold text-xl text-pure-white uppercase mb-1">
                    GFG Campus Mantri
                  </h3>
                  <p className="font-mono text-xs text-electric-cyan mb-3">@SDGI Global University</p>
                  <ul className="flex flex-col gap-2.5">
                    <li className="font-inter font-light text-xs text-muted-silver flex items-start gap-2">
                      <span className="text-electric-cyan font-bold mt-1 text-xs">▸</span>
                      <span>Leading GFG student community on campus</span>
                    </li>
                    <li className="font-inter font-light text-xs text-muted-silver flex items-start gap-2">
                      <span className="text-electric-cyan font-bold mt-1 text-xs">▸</span>
                      <span>Organizing hackathons and coding contests for 500+ students</span>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              /* A relative wrapper to contain the absolutely positioned CardSwap container */
              <div className="relative w-full max-w-[320px] h-[280px] md:w-[420px] md:h-[320px] mx-auto">
                <CardSwap
                  cardDistance={50}
                  verticalDistance={60}
                  delay={2500}
                  pauseOnHover={true}
                  easing="elastic"
                  width={420}
                  height={320}
                >
                  <Card>
                    <p className="font-mono text-xs text-electric-cyan tracking-[0.2em] uppercase mb-2">
                      2025 – PRESENT
                    </p>
                    <h3 className="font-syne font-extrabold text-2xl text-pure-white uppercase mb-1">
                      CTO & Full-Stack Dev
                    </h3>
                    <p className="font-mono text-sm text-electric-cyan mb-4">@Arcavon</p>
                    <ul className="flex flex-col gap-2">
                      <li className="font-inter font-light text-sm text-muted-silver flex items-start gap-2">
                        <span className="text-electric-cyan font-bold mt-1 text-xs">▸</span>
                        <span>Led end-to-end architecture of a game-tech platform</span>
                      </li>
                      <li className="font-inter font-light text-sm text-muted-silver flex items-start gap-2">
                        <span className="text-electric-cyan font-bold mt-1 text-xs">▸</span>
                        <span>99% uptime, thousands of monthly visits</span>
                      </li>
                      <li className="font-inter font-light text-sm text-muted-silver flex items-start gap-2">
                        <span className="text-electric-cyan font-bold mt-1 text-xs">▸</span>
                        <span>Reduced feature dev time by ~30% with modular architecture</span>
                      </li>
                    </ul>
                  </Card>

                  <Card>
                    <p className="font-mono text-xs text-electric-cyan tracking-[0.2em] uppercase mb-2">
                      2025
                    </p>
                    <h3 className="font-syne font-extrabold text-2xl text-pure-white uppercase mb-1">
                      Google Student Ambassador
                    </h3>
                    <p className="font-mono text-sm text-electric-cyan mb-4">@SDGI</p>
                    <ul className="flex flex-col gap-2">
                      <li className="font-inter font-light text-sm text-muted-silver flex items-start gap-2">
                        <span className="text-electric-cyan font-bold mt-1 text-xs">▸</span>
                        <span>Led university technical chapters, conducting community bootcamps on cloud services, Git, and REST APIs</span>
                      </li>
                      <li className="font-inter font-light text-sm text-muted-silver flex items-start gap-2">
                        <span className="text-electric-cyan font-bold mt-1 text-xs">▸</span>
                        <span>Orchestrated cross-university dev sessions, improving average student project completion rates</span>
                      </li>
                    </ul>
                  </Card>

                  <Card>
                    <p className="font-mono text-xs text-electric-cyan tracking-[0.2em] uppercase mb-2">
                      2026 – PRESENT
                    </p>
                    <h3 className="font-syne font-extrabold text-2xl text-pure-white uppercase mb-1">
                      GFG Campus Mantri
                    </h3>
                    <p className="font-mono text-sm text-electric-cyan mb-4">@SDGI Global University</p>
                    <ul className="flex flex-col gap-2">
                      <li className="font-inter font-light text-sm text-muted-silver flex items-start gap-2">
                        <span className="text-electric-cyan font-bold mt-1 text-xs">▸</span>
                        <span>Leading GFG student community on campus</span>
                      </li>
                      <li className="font-inter font-light text-sm text-muted-silver flex items-start gap-2">
                        <span className="text-electric-cyan font-bold mt-1 text-xs">▸</span>
                        <span>Organizing hackathons and coding contests for 500+ students</span>
                      </li>
                    </ul>
                  </Card>
                </CardSwap>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
