import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Define project details interface
interface ProjectDetails {
  id: string;
  name: string;
  tagline: string;
  description: string;
  overview: string;
  challenge: string;
  solution: string;
  features: string[];
  tags: string[];
  liveLink?: string;
  gitLink?: string;
}

// Case study data for the projects
const projectDetailsData: Record<string, ProjectDetails> = {
  "loyalty-pro": {
    id: "loyalty-pro",
    name: "LoyaltyPro",
    tagline: "Dual-Interface Customer Retention App",
    description: "A fast customer engagement application with dual-interface control loops, analytics dashboards, and custom reward triggers.",
    overview: "LoyaltyPro is a high-performance customer engagement platform built to bridge the gap between complex web analytics and intuitive user rewards. Featuring a dual-interface architecture, it enables administrators to create complex reward logic through a control loop panel while providing customers with a seamless, responsive dashboard to track and redeem points. The platform is optimized for low-latency operations and boasts a highly modular structure for easy developer handoffs.",
    challenge: "Traditional customer retention platforms often present separate, disconnected systems for managers and consumers, leading to synchronization delays, complex setups, and layout lag on mobile. Building a platform that keeps reward logic fully reactive while supporting real-time telemetry tracking on thousands of monthly visits was the core challenge.",
    solution: "We engineered a unified state machine with Next.js 14 Server Actions and Tailwind CSS. The administrative control loop runs on optimized reactive bindings, allowing instant rules propagation. We formulated modular interfaces with isolated database access wrappers, reducing feature deployment cycles by approximately 30%.",
    features: [
      "Real-time customer telemetry and rewards dashboard",
      "Dynamic reward rules generator with instant rules propagation",
      "Modular database connectors built for developer handoffs",
      "Ultra-low latency data synchronization using edge routing"
    ],
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "Node.js", "PostgreSQL"],
    gitLink: "https://github.com/Orionkaze/app",
  },
  "mockmate": {
    id: "mockmate",
    name: "MockMate",
    tagline: "AI Mock Interview Platform",
    description: "A cinematic, full-scope AI interviewing node with live speech-to-text, real-time audio/video feedback, and resume parsing.",
    overview: "MockMate is an advanced AI-powered interviewing platform that simulates real-world technical and behavioral interviews. Utilizing WebRTC for real-time video/audio streaming, MockMate processes speech with low-latency speech-to-text models and generates instant, context-aware feedback on the candidate's posture, speech pattern, and code quality. The application also parses PDF resumes to dynamically generate custom interview questions and build personalized skill roadmaps.",
    challenge: "Simulating a human interviewer requires combining speech recognition, LLM evaluation, and real-time behavioral parsing. Processing audio/video signals and returning structured assessment metrics under a strict 1-second latency window was critical to maintaining interview flow and preventing conversational gaps.",
    solution: "We set up low-latency WebRTC streams connected to a FastAPI backend. Audio segments are transcribed in real-time utilizing Whisper models, while OpenAI APIs evaluation evaluates technical accuracy. Resume parsing is achieved client-side, dynamically populating custom vector databases to contextually anchor evaluation scripts.",
    features: [
      "Low-latency real-time video & audio streaming via WebRTC",
      "Whisper-based speech-to-text with semantic evaluation",
      "Vector-anchored resume parsing to target custom skill roadmaps",
      "Detailed visual assessment scorecards and progress tracking"
    ],
    tags: ["Next.js", "OpenAI", "WebRTC", "FastAPI", "Tailwind CSS", "LangChain"],
    liveLink: "https://mock-mate-rosy.vercel.app/",
    gitLink: "https://github.com/Orionkaze/MockMate",
  },
  "frontend-ai": {
    id: "frontend-ai",
    name: "CodeForge AI",
    tagline: "Natural Language React Builder",
    description: "An automated component compiler translating plain English descriptions into styled React elements instantly.",
    overview: "CodeForge AI is a next-generation component compiler that converts plain-text English descriptions into functional, beautifully styled React components. Running code compilation inside a secure, client-side WebAssembly sandbox utilizing ESBuild, it allows developers to experiment with layouts and view instant live rendering. It leverages state-of-the-art LLMs to translate human prompt descriptions into clean, production-ready TypeScript code.",
    challenge: "Directly rendering LLM-generated code poses severe security and performance issues. Running arbitrary script tags on the client could lead to cross-site scripting (XSS). Sandboxing the compile-and-render lifecycle fully inside WebAssembly without leaking host context was the primary technical obstacle.",
    solution: "We designed an isolated WebAssembly runner using a sandboxed iframe. Code bundles are compiled in memory using an inline ESBuild compiler, wrapping variables in scoped closures. We achieved safe, near-instant rendering in under 200ms, entirely on the client side.",
    features: [
      "Natural language to React/Tailwind compiler with real-time editing",
      "Client-side compilation via in-memory ESBuild runner",
      "Isolated iframe execution window preventing XSS injection",
      "Instant layout controls and interactive live demo window"
    ],
    tags: ["React.js", "LLM APIs", "ESBuild", "TypeScript", "Tailwind CSS"],
    liveLink: "https://codeforgeai-eta.vercel.app",
    gitLink: "https://github.com/amankumarjha006/frontend_ui_ai",
  },
};

// Next.js static params generation to statically build all case studies
export async function generateStaticParams() {
  return [
    { id: "loyalty-pro" },
    { id: "mockmate" },
    { id: "frontend-ai" },
  ];
}

interface PageProps {
  params: {
    id: string;
  };
}

export default function ProjectPage({ params }: PageProps) {
  const project = projectDetailsData[params.id];

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-pure-white relative overflow-hidden py-20 px-6 md:px-12 lg:px-24">
      {/* Cinematic grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(10,10,15,0.8)_0%,#000000_100%)] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Navigation back to control room */}
        <div className="mb-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-electric-cyan uppercase tracking-widest hover:opacity-80 transition-opacity"
          >
            <svg
              className="w-4 h-4 transform rotate-180"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            <span>Return to Control Room</span>
          </Link>
        </div>

        {/* Header Section */}
        <div className="border-b border-electric-cyan/20 pb-10 mb-12">
          <span className="font-mono text-xs text-electric-cyan uppercase tracking-[0.2em] mb-3 block">
            System Node Detail
          </span>
          <h1 className="font-syne font-extrabold text-4xl md:text-5xl lg:text-6xl text-pure-white uppercase tracking-wider mb-4 text-shadow hero-text-glow">
            {project.name}
          </h1>
          <p className="font-space text-sm md:text-md text-neon-blue uppercase tracking-widest mb-6">
            {project.tagline}
          </p>

          {/* Action Links */}
          <div className="flex flex-wrap gap-4 mt-8">
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded border border-electric-cyan bg-electric-cyan/10 hover:bg-electric-cyan/25 font-space text-xs uppercase tracking-widest text-pure-white transition-all duration-300 shadow-[0_0_15px_rgba(0,212,255,0.1)] hover:shadow-[0_0_25px_rgba(0,212,255,0.25)]"
              >
                Launch Active Node
              </a>
            )}
            {project.gitLink && (
              <a
                href={project.gitLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded border border-white/20 hover:border-white/50 hover:bg-white/5 font-space text-xs uppercase tracking-widest text-pure-white transition-all duration-300"
              >
                Inspect Source Code
              </a>
            )}
          </div>
        </div>

        {/* Core Content Grid */}
        <div className="flex flex-col gap-12">
          
          {/* Section: Overview */}
          <div>
            <h2 className="font-space font-bold text-lg uppercase tracking-wider text-pure-white mb-4 border-l-2 border-electric-cyan pl-3">
              System Overview
            </h2>
            <p className="font-inter font-light text-muted-silver text-sm md:text-base leading-relaxed">
              {project.overview}
            </p>
          </div>

          {/* Section: Challenge & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-xl border border-white/5 bg-midnight-navy/10">
              <h3 className="font-space font-semibold text-xs text-alert-red uppercase tracking-widest mb-3">
                {"// Operational Challenge"}
              </h3>
              <p className="font-inter font-light text-muted-silver text-xs md:text-sm leading-relaxed">
                {project.challenge}
              </p>
            </div>

            <div className="p-6 rounded-xl border border-electric-cyan/10 bg-electric-cyan/[0.02]">
              <h3 className="font-space font-semibold text-xs text-electric-cyan uppercase tracking-widest mb-3">
                {"// System Architecture Solution"}
              </h3>
              <p className="font-inter font-light text-muted-silver text-xs md:text-sm leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Section: Key Capabilities */}
          <div>
            <h2 className="font-space font-bold text-lg uppercase tracking-wider text-pure-white mb-4 border-l-2 border-electric-cyan pl-3">
              Key Capabilities
            </h2>
            <ul className="flex flex-col gap-3.5">
              {project.features.map((feature, idx) => (
                <li
                  key={idx}
                  className="font-inter font-light text-sm text-muted-silver flex items-start gap-3 leading-relaxed"
                >
                  <span className="text-electric-cyan font-bold mt-1 text-xs">▸</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section: Technology Profile */}
          <div className="pt-6 border-t border-white/10">
            <h2 className="font-space font-bold text-xs uppercase tracking-widest text-pure-white mb-4">
              Applied Technologies
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs text-electric-cyan bg-electric-cyan/10 border border-electric-cyan/10 px-3 py-1 rounded-[4px] font-normal"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
