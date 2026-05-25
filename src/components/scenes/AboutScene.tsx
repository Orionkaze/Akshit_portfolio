"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useAnimeStagger } from "@/components/animations/useAnimeStagger";
import { useWindowSize } from "@/components/animations/useWindowSize";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

export default function AboutScene() {
  const { isMobile } = useWindowSize();
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const { splitIntoWords, animateWords } = useAnimeStagger();
  const [hasTriggeredText, setHasTriggeredText] = useState(false);

  // 3D Card tilt motion calculations
  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);

  const rotateX = useTransform(cardY, [-150, 150], [15, -15]);
  const rotateY = useTransform(cardX, [-150, 150], [-15, 15]);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Position relative to center
    const x = e.clientX - rect.left - width / 2;
    const y = e.clientY - rect.top - height / 2;

    cardX.set(x);
    cardY.set(y);
  };

  const handleCardMouseLeave = () => {
    cardX.set(0);
    cardY.set(0);
  };

  useEffect(() => {
    // Detect entry to trigger text animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTriggeredText) {
            setHasTriggeredText(true);
            // Run stagger animation
            setTimeout(() => {
              if (titleRef.current) animateWords(titleRef.current, 0);
              if (bioRef.current) animateWords(bioRef.current, 300);
            }, 300);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasTriggeredText, animateWords]);

  return (
    <div
      ref={containerRef}
      id="scene-1"
      className="w-screen min-h-screen relative flex items-center justify-center overflow-hidden bg-radial-gradient py-20 px-6 md:px-12 lg:px-24 select-none"
    >
      {/* Background Layer (Parallax Fog Depth) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#1a1a2e_0%,#000000_100%)] opacity-40 pointer-events-none -z-10" />

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10">
        
        {/* Left Side: Staggered Bio & Counters */}
        <div className="flex flex-col justify-center">
          <h2
            ref={titleRef}
            className="font-syne font-extrabold text-xl md:text-2xl lg:text-3xl text-pure-white mb-6 uppercase tracking-wider leading-tight"
            dangerouslySetInnerHTML={{
              __html: splitIntoWords("I build things that work. That scale. That matter."),
            }}
          />

          <p
            ref={bioRef}
            className="font-inter font-normal text-sm lg:text-base text-muted-silver mb-12 leading-[1.7] max-w-xl"
            dangerouslySetInnerHTML={{
              __html: splitIntoWords(
                "I am a passionate software developer specializing in scalable backend architectures and fluid frontend designs. From directing developer operations as Arcavon's CTO, to mentoring student developers, I transform complex requirements into fast, intuitive applications."
              ),
            }}
          />

          {/* Stats Grid */}
          <div
            ref={statsRef}
            className="grid grid-cols-2 gap-8 border-t border-electric-cyan/20 pt-8"
          >
            <div className="flex flex-col">
              <span className="text-4xl md:text-5xl text-pure-white text-glow">
                <AnimatedCounter value={25} suffix="+" />
              </span>
              <span className="text-xs md:text-sm font-space uppercase tracking-widest text-muted-silver mt-1">
                Students Mentored
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-4xl md:text-5xl text-pure-white text-glow">
                <AnimatedCounter value={30} suffix="%" />
              </span>
              <span className="text-xs md:text-sm font-space uppercase tracking-widest text-muted-silver mt-1">
                System Uptime
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-4xl md:text-5xl text-pure-white text-glow">
                <AnimatedCounter value={13} />
              </span>
              <span className="text-xs md:text-sm font-space uppercase tracking-widest text-muted-silver mt-1">
                Live Projects
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-4xl md:text-5xl text-pure-white text-glow">
                <AnimatedCounter value={12} />
              </span>
              <span className="text-xs md:text-sm font-space uppercase tracking-widest text-muted-silver mt-1">
                Components Built
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Floating 3D Profile Card */}
        <div className="flex justify-center items-center">
          <motion.div
            ref={cardRef}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            style={
              isMobile
                ? {}
                : {
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d" as const,
                  }
            }
            className="w-full max-w-[380px] h-[480px] rounded-2xl border border-electric-cyan/20 bg-midnight-navy/60 backdrop-blur-md flex flex-col justify-between p-8 relative overflow-hidden group shadow-2xl transition-all duration-300 hover:border-electric-cyan"
          >
            {/* Background shimmer */}
            <div className="absolute inset-0 bg-gradient-to-tr from-electric-cyan/0 via-electric-cyan/5 to-electric-cyan/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div style={isMobile ? {} : { transform: "translateZ(30px)" }} className="flex flex-col">
              <span className="font-mono text-xs text-electric-cyan uppercase tracking-widest mb-1">
                System Operator
              </span>
              <h3 className="font-space text-3xl font-bold text-pure-white uppercase tracking-wider">
                Akshit Shukla
              </h3>
              <p className="font-inter text-sm text-muted-silver mt-2">
                B.Tech CS (AI/ML)
              </p>
            </div>

            <div style={isMobile ? {} : { transform: "translateZ(40px)" }} className="my-auto flex flex-col gap-3">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-xs text-muted-silver font-mono uppercase">Role</span>
                <span className="text-xs text-pure-white font-mono uppercase">CTO & Full-Stack</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-xs text-muted-silver font-mono uppercase">Location</span>
                <span className="text-xs text-pure-white font-mono uppercase">UP, India</span>
              </div>
              <div className="flex justify-between">
                <span className="text-xs text-muted-silver font-mono uppercase">Status</span>
                <span className="text-xs text-electric-cyan font-mono uppercase animate-pulse">ACTIVE_NODE</span>
              </div>
            </div>

            <div style={isMobile ? {} : { transform: "translateZ(20px)" }} className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-electric-cyan glow-primary animate-ping" />
              <span className="font-mono text-xs text-muted-silver tracking-widest uppercase">
                Node ID: AS-2026
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
