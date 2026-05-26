"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap as gsapCore } from "gsap";

if (typeof window !== "undefined") {
  gsapCore.registerPlugin(ScrollTrigger);
}

interface CustomWindow extends Window {
  isTransitioning?: boolean;
  navigateToScene?: (index: number) => void;
}

export function useSceneTransition(
  containerRef: React.RefObject<HTMLDivElement>,
  overlays: {
    blackFade: React.RefObject<HTMLDivElement>;
    wipePanel: React.RefObject<HTMLDivElement>;
    zoomOverlay: React.RefObject<HTMLDivElement>;
    particleExplosion: React.RefObject<HTMLDivElement>;
  }
) {
  useEffect(() => {
    let ctx: gsap.Context | undefined;
    let transitionTimeout: NodeJS.Timeout | undefined;
    let resizeCleanup: (() => void) | undefined;
    const thresholdListeners: { [key: string]: () => void } = {};

    const init = setTimeout(() => {
      const container = containerRef.current;
      if (!container) return;

      const scenes = [0, 1, 2, 3, 4, 5].map(i => {
        const el = document.querySelector(`#scene-${i}`);
        if (!el) console.error(`scene-${i} not found`);
        return el;
      }).filter(Boolean) as HTMLElement[];

      if (scenes.length < 6) {
        console.error("Not all scenes found, aborting GSAP init");
        return;
      }

      const win = window as unknown as CustomWindow;
      win.isTransitioning = false;

      // Safety Timeout Manager for Transition Lock
      const setTransitioning = (val: boolean) => {
        win.isTransitioning = val;
        if (transitionTimeout) clearTimeout(transitionTimeout);
        if (val) {
          transitionTimeout = setTimeout(() => {
            if (win.isTransitioning) {
              console.warn("Safety timeout triggered: forcing win.isTransitioning to false");
              win.isTransitioning = false;
            }
          }, 2000);
        }
      };

      // Helper to perform symmetric transition
      const performTransition = (
        type: "fade" | "wipe" | "zoom" | "explosion" | "slow-fade",
        targetScroll: number,
        isBackward: boolean = false
      ) => {
        if (win.isTransitioning) return;
        setTransitioning(true);

        const tl = gsapCore.timeline({
          onComplete: () => {
            setTimeout(() => {
              setTransitioning(false);
            }, 250);
          },
        });

        if (type === "fade") {
          tl.to(overlays.blackFade.current, { opacity: 1, duration: 0.3, ease: "power2.inOut" })
            .call(() => {
              window.scrollTo(0, targetScroll);
            })
            .to(overlays.blackFade.current, { opacity: 0, duration: 0.4, ease: "power2.inOut", delay: 0.1 });
        } else if (type === "wipe") {
          const startLeft = isBackward ? "100%" : "-100%";
          const endLeft = isBackward ? "-100%" : "100%";
          tl.set(overlays.wipePanel.current, { left: startLeft, width: "100%" })
            .to(overlays.wipePanel.current, { left: "0%", duration: 0.3, ease: "power2.inOut" })
            .call(() => {
              window.scrollTo(0, targetScroll);
            })
            .to(overlays.wipePanel.current, { left: endLeft, duration: 0.3, ease: "power2.inOut" });
        } else if (type === "zoom") {
          tl.set(overlays.zoomOverlay.current, { scale: 0.1, opacity: 0 })
            .to(overlays.zoomOverlay.current, { opacity: 1, scale: 1, duration: 0.4, ease: "power3.in" })
            .call(() => {
              window.scrollTo(0, targetScroll);
            })
            .to(overlays.zoomOverlay.current, { opacity: 0, scale: 2, duration: 0.3, ease: "power3.out" })
            .set(overlays.zoomOverlay.current, { scale: 0.1 });
        } else if (type === "explosion") {
          tl.to(overlays.particleExplosion.current, { opacity: 1, duration: 0.4, ease: "power2.in" })
            .call(() => {
              window.scrollTo(0, targetScroll);
            })
            .to(overlays.particleExplosion.current, { opacity: 0, duration: 0.4, ease: "power2.out" });
        } else if (type === "slow-fade") {
          tl.to(overlays.blackFade.current, { opacity: 1, duration: 0.5, ease: "power1.inOut" })
            .call(() => {
              window.scrollTo(0, targetScroll);
            })
            .to(overlays.blackFade.current, { opacity: 0, duration: 0.5, ease: "power1.inOut" });
        }
      };

      // Helper to safe-get scene ScrollTrigger starts
      const getSceneScrollStart = (id: string, index: number) => {
        const st = ScrollTrigger.getById(id);
        if (st) return st.start;
        return index * window.innerHeight * 2;
      };

      const getSceneScrollEnd = (id: string, index: number) => {
        const st = ScrollTrigger.getById(id);
        if (st) return st.end;
        return index * window.innerHeight * 2 + window.innerHeight;
      };

      // Expose global navigator function for dots and buttons
      win.navigateToScene = (index: number) => {
        if (window.innerWidth <= 1024) {
          const target = document.querySelector(`#scene-${index}`);
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }
          return;
        }

        if (win.isTransitioning) return;
        
        const targetScroll = getSceneScrollStart(`st-scene-${index + 1}`, index) + (index === 0 ? 0 : 20);
        setTransitioning(true);

        // Clean fade transition to prevent flash of intermediate components
        gsapCore.timeline({
          onComplete: () => {
            setTimeout(() => {
              setTransitioning(false);
            }, 250);
          },
        })
        .to(overlays.blackFade.current, { opacity: 1, duration: 0.4, ease: "power2.inOut" })
        .call(() => {
          window.scrollTo(0, targetScroll);
        })
        .to(overlays.blackFade.current, { opacity: 0, duration: 0.4, ease: "power2.inOut", delay: 0.1 });
      };

      // Helper to enforce minimum 100px scroll threshold past self.end before triggering transition
      const handleLeave = (self: ScrollTrigger, id: string, target: number, type: "fade" | "wipe" | "zoom" | "explosion" | "slow-fade") => {
        if (win.isTransitioning) return;
        const threshold = 100;

        // Clean up any existing threshold listener for this ScrollTrigger
        if (thresholdListeners[id]) {
          window.removeEventListener("scroll", thresholdListeners[id]);
          delete thresholdListeners[id];
        }

        if (window.scrollY >= self.end + threshold) {
          performTransition(type, target, false);
          return;
        }

        let ticking = false;
        const onScrollThreshold = () => {
          if (!ticking) {
            window.requestAnimationFrame(() => {
              if (window.scrollY >= self.end + threshold) {
                window.removeEventListener("scroll", onScrollThreshold);
                delete thresholdListeners[id];
                if (!win.isTransitioning) {
                  performTransition(type, target, false);
                }
              } else if (window.scrollY < self.end - 50) {
                // Cancel trigger if the user scrolls back up
                window.removeEventListener("scroll", onScrollThreshold);
                delete thresholdListeners[id];
              }
              ticking = false;
            });
            ticking = true;
          }
        };

        thresholdListeners[id] = onScrollThreshold;
        window.addEventListener("scroll", onScrollThreshold);
      };

      const mm = gsapCore.matchMedia();

      // Pinning and Transition Timelines setup inside GSAP Context
      ctx = gsapCore.context(() => {
        
        // Desktop Layout: pinning, scrub, custom transitions
        mm.add("(min-width: 1025px)", () => {
          // 1. Scene 1 (Hero)
          ScrollTrigger.create({
            id: "st-scene-1",
            trigger: "#scene-0",
            start: "top top",
            end: "+=100%",
            pin: true,
            pinSpacing: true,
            scrub: true,
            onToggle: (self) => {
              if (self.isActive) {
                window.dispatchEvent(new CustomEvent("sceneChange", { detail: { activeScene: "scene-0" } }));
              }
            },
            onLeave: (self) => {
              const target = getSceneScrollStart("st-scene-2", 1) + 20;
              handleLeave(self, "st-scene-1", target, "fade");
            },
          });

          // 2. Scene 2 (About)
          ScrollTrigger.create({
            id: "st-scene-2",
            trigger: "#scene-1",
            start: "top top",
            end: "+=100%",
            pin: true,
            pinSpacing: true,
            scrub: true,
            onToggle: (self) => {
              if (self.isActive) {
                window.dispatchEvent(new CustomEvent("sceneChange", { detail: { activeScene: "scene-1" } }));
              }
            },
            onLeave: (self) => {
              const target = getSceneScrollStart("st-scene-3", 2) + 20;
              handleLeave(self, "st-scene-2", target, "wipe");
            },
            onLeaveBack: () => {
              if (win.isTransitioning) return;
              const target = 0;
              performTransition("fade", target, true);
            },
          });

          // 3. Scene 3 (Experience)
          ScrollTrigger.create({
            id: "st-scene-3",
            trigger: "#scene-2",
            start: "top top",
            end: "+=100%",
            pin: true,
            pinSpacing: true,
            scrub: true,
            onToggle: (self) => {
              if (self.isActive) {
                window.dispatchEvent(new CustomEvent("sceneChange", { detail: { activeScene: "scene-2" } }));
              }
            },
            onLeave: (self) => {
              const target = getSceneScrollStart("st-scene-4", 3) + 20;
              handleLeave(self, "st-scene-3", target, "zoom");
            },
            onLeaveBack: () => {
              if (win.isTransitioning) return;
              const target = getSceneScrollEnd("st-scene-2", 1) - 20;
              performTransition("wipe", target, true);
            },
          });

          // 4. Scene 4 (Projects)
          ScrollTrigger.create({
            id: "st-scene-4",
            trigger: "#scene-3",
            start: "top top",
            end: "+=100%",
            pin: true,
            pinSpacing: true,
            scrub: true,
            onToggle: (self) => {
              if (self.isActive) {
                window.dispatchEvent(new CustomEvent("sceneChange", { detail: { activeScene: "scene-3" } }));
              }
            },
            onLeave: (self) => {
              const target = getSceneScrollStart("st-scene-5", 4) + 20;
              handleLeave(self, "st-scene-4", target, "explosion");
            },
            onLeaveBack: () => {
              if (win.isTransitioning) return;
              const target = getSceneScrollEnd("st-scene-3", 2) - 20;
              performTransition("zoom", target, true);
            },
          });

          // 5. Scene 5 (Skills)
          ScrollTrigger.create({
            id: "st-scene-5",
            trigger: "#scene-4",
            start: "top top",
            end: "+=100%",
            pin: true,
            pinSpacing: true,
            scrub: true,
            onToggle: (self) => {
              if (self.isActive) {
                window.dispatchEvent(new CustomEvent("sceneChange", { detail: { activeScene: "scene-4" } }));
              }
            },
            onLeave: (self) => {
              const target = getSceneScrollStart("st-scene-6", 5) + 20;
              handleLeave(self, "st-scene-5", target, "slow-fade");
            },
            onLeaveBack: () => {
              if (win.isTransitioning) return;
              const target = getSceneScrollEnd("st-scene-4", 3) - 20;
              performTransition("explosion", target, true);
            },
          });

          // 6. Scene 6 (Contact)
          ScrollTrigger.create({
            id: "st-scene-6",
            trigger: "#scene-5",
            start: "top top",
            end: "+=100%",
            pin: true,
            pinSpacing: true,
            scrub: true,
            onToggle: (self) => {
              if (self.isActive) {
                window.dispatchEvent(new CustomEvent("sceneChange", { detail: { activeScene: "scene-5" } }));
              }
            },
            onLeaveBack: () => {
              if (win.isTransitioning) return;
              const target = getSceneScrollEnd("st-scene-5", 4) - 20;
              performTransition("slow-fade", target, true);
            },
          });
        });

        // Mobile/Tablet Layout: Normal scrolling, lightweight scroll spy
        mm.add("(max-width: 1024px)", () => {
          [0, 1, 2, 3, 4, 5].forEach((i) => {
            ScrollTrigger.create({
              id: `st-scene-spy-${i}`,
              trigger: `#scene-${i}`,
              start: "top 50%",
              end: "bottom 50%",
              onToggle: (self) => {
                if (self.isActive) {
                  window.dispatchEvent(
                    new CustomEvent("sceneChange", { detail: { activeScene: `scene-${i}` } })
                  );
                }
              },
            });
          });
        });

      }, container);

      // Add will-change hints to pinned scenes only on desktop for GPU compositing
      if (window.innerWidth > 1024) {
        scenes.forEach((scene) => {
          scene.style.willChange = "transform";
        });
      }

      // Debounced ScrollTrigger.refresh() on resize to handle mobile address bar changes
      let resizeTimer: NodeJS.Timeout;
      const handleResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          ScrollTrigger.refresh();
        }, 250);
      };
      window.addEventListener("resize", handleResize);

      // Store cleanup ref for resize
      resizeCleanup = () => {
        clearTimeout(resizeTimer);
        window.removeEventListener("resize", handleResize);
      };

    }, 800);

    return () => {
      clearTimeout(init);
      if (ctx) ctx.revert();
      if (transitionTimeout) clearTimeout(transitionTimeout);
      // Clean up resize listener
      if (resizeCleanup) {
        resizeCleanup();
      }
      Object.keys(thresholdListeners).forEach((id) => {
        window.removeEventListener("scroll", thresholdListeners[id]);
      });
      if (typeof window !== "undefined") {
        const win = window as unknown as CustomWindow;
        delete win.navigateToScene;
        delete win.isTransitioning;
      }
    };
  }, [containerRef, overlays]);
}
