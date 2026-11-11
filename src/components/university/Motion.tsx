import { useEffect, useRef, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
export function MotionProvider({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, anchors: true });
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);
    const ctx = gsap.context(() => {
      if (window.innerWidth > 1000 && root.current?.querySelector(".hero-background")) {
        gsap.to(".hero-background", {
          yPercent: 8,
          ease: "none",
          scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
        });
      }
      const overviewCurtain = root.current?.querySelector<HTMLElement>(".overview-curtain");
      if (overviewCurtain) {
        const panels = overviewCurtain.querySelectorAll<HTMLElement>(".overview-curtain-panel");
        gsap.fromTo(
          panels,
          { scaleX: 1 },
          {
            scaleX: 0,
            ease: "none",
            transformOrigin: (index) => index === 0 ? "left center" : "right center",
            stagger: 0.035,
            scrollTrigger: {
              trigger: ".university-overview",
              start: "top 88%",
              end: "top 38%",
              scrub: 0.6,
            },
          },
        );
        const seam = overviewCurtain.querySelector<HTMLElement>(".overview-curtain-seam");
        if (seam) {
          gsap.to(seam, {
            autoAlpha: 0,
            scaleY: 0.6,
            ease: "none",
            scrollTrigger: {
              trigger: ".university-overview",
              start: "top 88%",
              end: "top 55%",
              scrub: 0.5,
            },
          });
        }
      }
      gsap.utils.toArray<HTMLElement>("[data-counter]").forEach((el) => {
        const value = { current: 0 };
        const target = Number(el.dataset["counter"]);
        gsap.to(value, {
          current: target,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 95%", once: true },
          onUpdate: () => {
            el.textContent =
              Math.round(value.current).toLocaleString("en-IN") + (el.dataset["suffix"] || "");
          },
        });
      });
      const schoolFeatureCards = gsap.utils.toArray<HTMLElement>("[data-school-feature-card]");
      if (schoolFeatureCards.length) {
        gsap.fromTo(
          schoolFeatureCards,
          {
            y: 110,
            x: (index) => index === 0 ? -55 : index === 1 ? 0 : 55,
            scale: 0.88,
            autoAlpha: 0.25,
          },
          {
            y: 0,
            x: 0,
            scale: 1,
            autoAlpha: 1,
            ease: "none",
            stagger: 0.16,
            scrollTrigger: {
              trigger: ".school-feature-cards",
              start: "top 88%",
              end: "center 45%",
              scrub: 0.7,
            },
          },
        );
      }
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 94%", once: true },
          },
        );
      });
      gsap.utils.toArray<HTMLImageElement>("[data-image-motion]").forEach((img, index) => {
        gsap.fromTo(
          img,
          { y: 22, scale: 0.965, autoAlpha: 0.72 },
          {
            y: 0,
            scale: 1,
            autoAlpha: 1,
            duration: 0.85,
            delay: Math.min(index % 4, 3) * 0.07,
            ease: "power2.out",
            clearProps: "transform,opacity,visibility",
            scrollTrigger: { trigger: img, start: "top 96%", once: true },
          },
        );
      });
    }, root);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      ctx.revert();
    };
  }, []);
  return <div ref={root}>{children}</div>;
}
export function Entrance({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      data-entrance
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.65 }}
    >
      {children}
    </motion.div>
  );
}
