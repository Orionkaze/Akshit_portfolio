"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useWindowSize } from "@/components/animations/useWindowSize";

interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  date: string;
  bullets: string[];
}

const experienceData: ExperienceItem[] = [
  {
    id: 1,
    role: "CTO & Full-Stack Dev",
    company: "Arcavon",
    date: "2025 – Present",
    bullets: [
      "Directed core system engineering and full-stack app design, achieving 99.9% production uptime.",
      "Engineered dual-interface customer retention structures with Next.js 14 and Tailwind, yielding 40% speedups.",
      "Structured automated testing and deployment protocols for developer agility.",
    ],
  },
  {
    id: 2,
    role: "Google Student Ambassador",
    company: "SDGI",
    date: "2025",
    bullets: [
      "Led university technical chapters, conducting community bootcamps on cloud services, Git, and REST APIs.",
      "Orchestrated cross-university dev sessions, improving average student project completion rates.",
    ],
  },
  {
    id: 3,
    role: "GFG Campus Mantri",
    company: "SDGI",
    date: "2026 – Present",
    bullets: [
      "Coordinated campus technical hackathons and coding tournaments.",
      "Provided 1-on-1 mentorship on data structures and web architectures to 500+ aspiring software students.",
    ],
  },
];

export default function ExperienceScene() {
  const { isMobile } = useWindowSize();
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (isMobile) return;

    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    const path = pathRef.current;
    if (!path) return;

    // Get total length of path for draw-stroke effect
    const pathLength = path.getTotalLength();
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    const ctx = gsap.context(() => {
      // 1. Draw SVG stroke timeline path as we scroll
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 0.5,
        },
      });

      // 2. Animate experience cards and nodes on scroll
      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        const isEven = index % 2 === 0;
        const xOffset = isEven ? -100 : 100;

        gsap.fromTo(
          card,
          { opacity: 0, x: xOffset },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <div
      ref={containerRef}
      id="scene-2"
      className="w-screen min-h-screen relative overflow-hidden bg-black py-24 px-6 md:px-12 lg:px-24 select-none"
    >
      {/* Cinematic grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-6xl w-full mx-auto relative z-10">
        
        {/* Title */}
        <div className="text-center mb-20">
          <span className="font-mono text-xs text-electric-cyan uppercase tracking-widest">
            Timeline
          </span>
          <h2 className="font-syne font-extrabold text-4xl md:text-5xl lg:text-7xl text-pure-white uppercase tracking-wider mt-2">
            The Journey
          </h2>
        </div>

        {/* Timeline Content */}
        <div className="relative mt-12">
          
          {/* Vertical Timeline Path (Hidden on Mobile) */}
          {!isMobile && (
            <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-[2px] -translate-x-[1px]">
              {/* Background line (gray) */}
              <div className="absolute inset-0 bg-white/10" />
              
              {/* Animating line (cyan) */}
              <svg className="absolute top-0 left-0 w-2 h-full -ml-[3px]" fill="none" preserveAspectRatio="none">
                <path
                  ref={pathRef}
                  d="M 4,0 L 4,10000"
                  stroke="#00D4FF"
                  strokeWidth="2"
                />
              </svg>
            </div>
          )}

          {/* Timeline Nodes */}
          <div className="flex flex-col gap-16 lg:gap-24">
            {experienceData.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.id}
                  className={`flex flex-col lg:flex-row relative ${
                    isEven ? "lg:flex-row-reverse" : ""
                  } items-start lg:items-center w-full`}
                >
                  {/* Central Node Indicator (Hidden on Mobile) */}
                  {!isMobile && (
                    <div className="absolute left-4 lg:left-1/2 w-4 h-4 rounded-full bg-black border-2 border-electric-cyan -translate-x-1/2 z-20 shadow-[0_0_10px_#00D4FF]" />
                  )}

                  {/* Spacer for desktop layout grid alignment */}
                  <div className="hidden lg:block w-1/2" />

                  {/* Card container */}
                  <div
                    ref={(el) => {
                      cardRefs.current[index] = el;
                    }}
                    className="w-full lg:w-1/2 pl-0 md:pl-12 lg:pl-0 lg:px-12"
                  >
                    <div
                      className="p-6 md:p-8 border-l-2 border-electric-cyan backdrop-blur-md bg-electric-cyan/[0.04] experience-card-glow shadow-[-4px_0_20px_rgba(0,212,255,0.3)] rounded-none transition-all duration-300 hover:shadow-[-4px_0_25px_rgba(0,212,255,0.4)]"
                    >
                      <span className="font-mono text-[10px] text-electric-cyan uppercase tracking-[0.2em] mb-1.5 block">
                        {item.date}
                      </span>
                      <h3 className="font-syne text-xl md:text-2xl font-extrabold text-pure-white mt-1 uppercase">
                        {item.role}
                      </h3>
                      <h4 className="font-mono text-xs text-electric-cyan mt-1 uppercase block">
                        @{item.company}
                      </h4>
                      
                      <ul className="mt-6 flex flex-col gap-3">
                        {item.bullets.map((bullet, idx) => (
                          <li
                            key={idx}
                            className="font-inter text-sm text-muted-silver leading-relaxed flex items-start gap-2.5"
                          >
                            <span className="text-electric-cyan font-bold mt-1 text-xs">
                              ▸
                            </span>
                            <span className="font-inter font-light">
                              {bullet}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}
