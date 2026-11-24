"use client";

import { useEffect, useRef, useState } from "react";

interface CinematicVideoCardProps {
  src: string;
  poster?: string;
  eyebrow: string;
  title: string;
  caption: string;
}

/**
 * A full-width video card that rises into view as the visitor scrolls past the hero.
 * The video plays (muted, looping) only while the card is mostly on screen,
 * and pauses when it leaves the viewport to save bandwidth and battery.
 */
export default function CinematicVideoCard({
  src,
  poster,
  eyebrow,
  title,
  caption,
}: CinematicVideoCardProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduceMotion(reduce);
    if (reduce) setRevealed(true);

    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.intersectionRatio > 0.2) setRevealed(true);

          const video = videoRef.current;
          if (!video) continue;
          if (entry.intersectionRatio >= 0.5) {
            video.play().catch(() => {
              /* autoplay blocked: the poster stays visible */
            });
          } else {
            video.pause();
          }
        }
      },
      { threshold: [0, 0.2, 0.5] }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const showCard = revealed || reduceMotion;

  return (
    <section
      ref={sectionRef}
      aria-label="Project video showcase"
      className="relative overflow-hidden bg-slate-950 py-20 sm:py-28 px-4 sm:px-6 lg:px-8"
    >
      {/* Blueprint grid, same language as the hero */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(245, 158, 11, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(245, 158, 11, 0.4) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto">
        <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-amber-400 mb-4">
          {eyebrow}
        </p>
        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-[1.05] mb-10 sm:mb-14 max-w-3xl">
          {title}
        </h2>

        <figure
          className={`relative rounded-2xl overflow-hidden border border-amber-500/40 bg-black shadow-2xl shadow-black/70 ${
            reduceMotion
              ? ""
              : "transition-all duration-[1400ms] ease-[cubic-bezier(.2,.7,.1,1)]"
          } ${
            showCard
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-24 scale-90"
          }`}
        >
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={title}
            className="w-full aspect-video object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent pointer-events-none"
            aria-hidden="true"
          />
          <figcaption className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-8 sm:right-8 text-white text-sm sm:text-lg font-semibold drop-shadow-lg">
            {caption}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
