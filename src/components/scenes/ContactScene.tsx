"use client";

import React, { useEffect, useRef, useState } from "react";
import { useAnimeStagger } from "@/components/animations/useAnimeStagger";
import MagneticButton from "@/components/ui/MagneticButton";
import Link from "next/link";

const contactLinks = [
  { label: "Email", value: "akshit2046@gmail.com", href: "mailto:akshit2046@gmail.com" },
  { label: "LinkedIn", value: "akshit-shukla-529707324", href: "https://linkedin.com/in/akshit-shukla-529707324" },
  { label: "Website", value: "www.arcavon.in", href: "https://www.arcavon.in" },
  { label: "GitHub", value: "github.com/Orionkaze", href: "https://github.com/Orionkaze" },
];

export default function ContactScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const { splitIntoWords, animateWords } = useAnimeStagger();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            setTimeout(() => {
              if (titleRef.current) animateWords(titleRef.current, 0);
              // Fade in the links container
              if (linksRef.current) {
                linksRef.current.classList.remove("opacity-0");
                linksRef.current.classList.add("opacity-100", "translate-y-0");
              }
            }, 300);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, animateWords]);

  return (
    <div
      ref={containerRef}
      id="scene-5"
      className="w-screen h-screen relative flex flex-col justify-between items-center overflow-hidden bg-black py-20 px-6 select-none"
    >
      {/* Background radial gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(10,10,15,0.8)_0%,#000000_100%)] pointer-events-none -z-10" />

      {/* Empty spacer for alignment */}
      <div className="h-10" />

      {/* Main Content */}
      <div className="max-w-4xl w-full text-center flex flex-col items-center">
        <span className="font-mono text-xs text-electric-cyan uppercase tracking-widest mb-4 font-normal">
          The End Credits
        </span>

        {/* Headline */}
        <h2
          ref={titleRef}
          className="font-syne font-extrabold text-xl md:text-2xl lg:text-3xl text-pure-white uppercase tracking-wider leading-tight mb-12 max-w-3xl"
          dangerouslySetInnerHTML={{
            __html: splitIntoWords("Let's build something the world hasn't seen yet."),
          }}
        />

        {/* Contact Links Grid */}
        <div
          ref={linksRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 w-full max-w-3xl mb-16 opacity-0 translate-y-6 transition-all duration-1000 ease-out"
        >
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center group cursor-pointer"
            >
              <span className="font-mono text-[10px] text-muted-silver uppercase tracking-widest mb-1.5 transition-colors duration-300 group-hover:text-electric-cyan">
                {link.label}
              </span>
              <span className="font-inter text-xs md:text-sm text-pure-white group-hover:text-neon-blue transition-colors duration-300 truncate max-w-full font-light">
                {link.value}
              </span>
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <Link href="/contact" className="relative z-50 pointer-events-auto">
          <MagneticButton onClick={() => {}}>
            Let&apos;s Connect
          </MagneticButton>
        </Link>
      </div>


      {/* Movie Ending Style Credits */}
      <div className="flex flex-col items-center text-center gap-1.5 pointer-events-none">
        <span className="font-mono text-[9px] text-muted-silver/60 uppercase tracking-[0.25em]">
          Directed & Programmed by
        </span>
        <span className="font-inter text-[10px] text-pure-white uppercase tracking-[0.3em] font-light">
          Akshit © 2026
        </span>
        <span className="font-mono text-[8px] text-muted-silver/40 uppercase tracking-[0.15em] mt-1">
          All Systems Nominal.
        </span>
      </div>
    </div>
  );
}
