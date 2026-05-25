"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useWindowSize } from "@/components/animations/useWindowSize";
import Link from "next/link";

interface ProjectItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  isHero?: boolean;
  liveLink?: string;
  gitLink?: string;
}

const projectsData: ProjectItem[] = [
  {
    id: "loyalty-pro",
    name: "LoyaltyPro",
    tagline: "Dual-Interface Customer Retention App",
    description:
      "A fast customer engagement application with dual-interface control loops, analytics dashboards, and custom reward triggers. Formulated for developer handoffs.",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "Node.js"],
    gitLink: "https://github.com/Orionkaze/loyalty-pro",
  },
  {
    id: "mockmate",
    name: "MockMate",
    tagline: "AI Mock Interview Platform",
    description:
      "A cinematic, full-scope AI interviewing node with live speech-to-text, real-time audio/video feedback, resume parsing, automatic scoring, and custom roadmap curation.",
    tags: ["Next.js", "OpenAI", "WebRTC", "FastAPI", "Tailwind CSS"],
    isHero: true,
    liveLink: "https://mock-mate-rosy.vercel.app/",
    gitLink: "https://github.com/Orionkaze/MockMate",
  },
  {
    id: "frontend-ai",
    name: "CodeForge AI",
    tagline: "Natural Language React Builder",
    description:
      "An automated component compiler translating plain English descriptions into styled React elements instantly, complete with sandboxed code compilation.",
    tags: ["React.js", "LLM APIs", "ESBuild", "TypeScript"],
    liveLink: "https://codeforgeai-eta.vercel.app",
    gitLink: "https://github.com/amankumarjha006/frontend_ui_ai",
  },
];

function ProjectCard({ project }: { project: ProjectItem }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { isMobile } = useWindowSize();

  // Motion values for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Map mouse positions to 3D rotation angles (up to 15deg)
  const rotateX = useTransform(y, [-240, 240], [15, -15]);
  const rotateY = useTransform(x, [-190, 190], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Normalize coordinates relative to card center
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const cardStyle = isMobile
    ? {}
    : {
        rotateX,
        rotateY,
        transformStyle: "preserve-3d" as const,
      };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={cardStyle}
      className={`relative rounded-2xl flex flex-col justify-between p-8 bg-midnight-navy/50 border transition-all duration-300 shadow-2xl overflow-hidden group select-none ${
        project.isHero
          ? "w-full max-w-[340px] h-[430px] sm:max-w-[400px] md:w-[456px] md:h-[576px] border-electric-cyan border-2 z-20 md:scale-105"
          : "w-full max-w-[300px] h-[380px] sm:max-w-[350px] md:w-[380px] md:h-[480px] border-electric-cyan/15 hover:border-electric-cyan/60 z-10"
      }`}
      animate={{
        boxShadow: isHovered
          ? "0 0 25px rgba(0, 212, 255, 0.25)"
          : "0 10px 30px rgba(0,0,0,0.5)",
      }}
    >
      {/* Glow border highlight */}
      <div
        className="absolute inset-0 border rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          borderColor: "#00D4FF",
          boxShadow: "inset 0 0 15px rgba(0, 212, 255, 0.15)",
        }}
      />

      {/* Shimmer gradient overlay for Hero card */}
      {project.isHero && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
      )}

      {/* Top Details */}
      <div style={isMobile ? {} : { transform: "translateZ(30px)" }} className="flex flex-col">
        <span className="font-mono text-[10px] text-electric-cyan uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
          {project.isHero && (
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-electric-cyan glow-primary animate-ping" />
          )}
          {project.isHero ? "Featured Node" : "System Component"}
        </span>
        <h3
          className={`font-space font-bold uppercase tracking-wider text-pure-white ${
            project.isHero ? "text-2xl md:text-4xl" : "text-xl md:text-2xl"
          }`}
        >
          {project.name}
        </h3>
        <h4 className="font-space text-xs text-neon-blue uppercase mt-1">
          {project.tagline}
        </h4>
        <p className="font-inter text-xs md:text-sm text-muted-silver mt-4 leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Bottom Details & Tech Stack */}
      <div style={isMobile ? {} : { transform: "translateZ(40px)" }} className="flex flex-col gap-4">
        {/* Tech tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] text-electric-cyan bg-electric-cyan/10 px-2 py-0.5 md:px-2.5 md:py-1 rounded-[4px] font-normal"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Link Arrow Actions */}
        <div className="flex flex-col gap-2.5 mt-2 relative z-50">
          {project.liveLink ? (
            <div className="flex items-center justify-between w-full">
              {/* Primary action: Live link */}
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 text-pure-white font-space text-[10px] md:text-xs tracking-widest uppercase hover:text-electric-cyan transition-colors duration-300 pointer-events-auto cursor-pointer"
              >
                <span>Launch Live</span>
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>

              {/* Secondary action: Details page */}
              <Link
                href={`/projects/${project.id}`}
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 text-muted-silver font-space text-[10px] md:text-xs tracking-widest uppercase hover:text-electric-cyan transition-colors duration-300 pointer-events-auto cursor-pointer"
              >
                <span>Case Study</span>
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          ) : (
            /* No live link: details page is primary */
            <Link
              href={`/projects/${project.id}`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 text-pure-white font-space text-[10px] md:text-xs tracking-widest uppercase hover:text-electric-cyan transition-colors duration-300 pointer-events-auto cursor-pointer"
            >
              <span>Inspect Node</span>
              <svg
                className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      id="scene-3"
      className="w-screen min-h-screen relative flex flex-col justify-center items-center overflow-hidden bg-radial-gradient py-24 px-6 select-none"
    >
      {/* Dynamic Grid Background Layer */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.8)_0%,transparent_100%)] pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center mb-16 relative z-10">
        <span className="font-mono text-xs text-electric-cyan uppercase tracking-widest">
          Artifacts
        </span>
        <h2 className="font-syne font-extrabold text-4xl md:text-5xl lg:text-7xl text-pure-white uppercase tracking-wider mt-2">
          Featured Work
        </h2>
      </div>

      {/* Responsive Grid/Flex Projects Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-row items-center justify-center gap-8 md:gap-10 lg:gap-12 relative z-10 max-w-7xl w-full">
        {/* Left card */}
        <div className="order-2 md:order-1 flex justify-center w-full">
          <ProjectCard project={projectsData[0]} />
        </div>

        {/* Middle card (Hero - MockMate) */}
        <div className="order-1 md:order-3 md:col-span-2 lg:col-span-1 lg:order-2 flex justify-center w-full">
          <ProjectCard project={projectsData[1]} />
        </div>

        {/* Right card */}
        <div className="order-3 md:order-2 flex justify-center w-full">
          <ProjectCard project={projectsData[2]} />
        </div>
      </div>
    </div>
  );
}
