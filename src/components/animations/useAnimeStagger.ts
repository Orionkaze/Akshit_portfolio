"use client";

import { animate, stagger } from "animejs";

export function useAnimeStagger() {
  // Helper to split text into letter spans
  const splitIntoLetters = (text: string): string => {
    return text
      .split("")
      .map((char) => {
        if (char === " ") return `<span class="inline-block">&nbsp;</span>`;
        return `<span class="inline-block opacity-0 stagger-letter" style="transform-origin: center;">${char}</span>`;
      })
      .join("");
  };

  // Helper to split text into word spans
  const splitIntoWords = (text: string): string => {
    return text
      .split(" ")
      .map((word) => {
        return `<span class="inline-block overflow-hidden mr-[0.25em]"><span class="inline-block opacity-0 translate-y-6 stagger-word">${word}</span></span>`;
      })
      .join("");
  };

  const animateLetters = (containerEl: HTMLElement | null, delay = 0) => {
    if (!containerEl) return;
    const targets = containerEl.querySelectorAll(".stagger-letter");
    if (targets.length === 0) return;

    animate(targets, {
      opacity: [0, 1],
      scale: [0.5, 1],
      translateY: [20, 0],
      duration: 600,
      delay: stagger(80, { start: delay }),
      easing: "easeOutElastic(1, .8)",
    });
  };

  const animateWords = (containerEl: HTMLElement | null, delay = 0) => {
    if (!containerEl) return;
    const targets = containerEl.querySelectorAll(".stagger-word");
    if (targets.length === 0) return;

    animate(targets, {
      opacity: [0, 1],
      translateY: [24, 0],
      duration: 800,
      delay: stagger(35, { start: delay }),
      easing: "easeOutCubic",
    });
  };

  return {
    splitIntoLetters,
    splitIntoWords,
    animateLetters,
    animateWords,
  };
}

