"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/data/site";
import CountUp from "./CountUp";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    // Ensure HTML5 background video autoplays smoothly
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }
  }, []);

  const toggleVideo = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setIsPlaying(true));
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section
      className="relative min-h-[92vh] flex items-center bg-brand-ink text-white overflow-hidden py-20 lg:py-28"
      aria-label="Welcome hero section"
    >
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="https://images.unsplash.com/photo-1541888946425-d81bb19940f2?w=1600&auto=format&fit=crop&q=80"
          onLoadedData={() => setIsVideoLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            isVideoLoaded ? "opacity-45" : "opacity-35"
          }`}
        >
          <source src="/images/site-timelapse.mp4" type="video/mp4" />
          <source src="/images/site-timelapse-scroll.mp4" type="video/mp4" />
        </video>

        {/* High-Contrast Gradient Scrim Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-ink via-brand-ink/85 to-brand-ink/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-transparent to-brand-ink/70" />

        {/* Subtle Architectural Blueprint Grid Pattern */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(rgba(242, 169, 0, 0.4) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Copy */}
          <div className="lg:col-span-8 max-w-3xl">
            {/* Live Status Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-brand-ink-2/90 border border-brand-primary/40 text-brand-primary text-xs sm:text-sm font-bold tracking-wide uppercase mb-6 backdrop-blur-md shadow-lg">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-primary" />
              </span>
              <span>
                {siteConfig.city}, {siteConfig.state} &bull; Turnkey Civil Engineering
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-[1.08] text-white">
              Building The Future With{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-yellow-400 to-amber-500">
                Structural Strength
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-200 leading-relaxed font-normal max-w-2xl drop-shadow-sm">
              Welcome to <strong className="text-white font-semibold">{siteConfig.name}</strong>, directed
              by {siteConfig.engineerName}. We engineer earthquake-resistant homes, luxury duplex
              villas, commercial towers, and industrial spaces across Dindigul and Tamil Nadu.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 sm:gap-5">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-bold bg-brand-primary text-brand-ink hover:bg-brand-primary-hover shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-primary"
              >
                <span>Request a Free Quote</span>
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Link>

              <Link
                href="/projects"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-semibold border-2 border-white/30 text-white hover:bg-white/10 hover:border-white transition-all duration-300 backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Explore 126+ Projects
              </Link>
            </div>

            {/* Engineering Highlights */}
            <div className="mt-12 pt-8 border-t border-white/15 grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-brand-primary/20 text-brand-primary flex items-center justify-center shrink-0 font-bold text-xs">
                  ✓
                </span>
                <span>Licensed Civil Engineer</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-brand-primary/20 text-brand-primary flex items-center justify-center shrink-0 font-bold text-xs">
                  ✓
                </span>
                <span>IS 456 & 1893 Seismic Safe</span>
              </div>
              <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <span className="w-5 h-5 rounded-full bg-brand-primary/20 text-brand-primary flex items-center justify-center shrink-0 font-bold text-xs">
                  ✓
                </span>
                <span>Complete Turnkey Guarantee</span>
              </div>
            </div>
          </div>

          {/* Right Floating Architectural Glass Card */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="bg-brand-ink-2/80 backdrop-blur-xl border border-white/15 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-4">
                <div>
                  <span className="text-[11px] font-mono uppercase text-brand-primary tracking-widest font-bold">
                    HQ &bull; Dindigul, TN
                  </span>
                  <h3 className="text-lg font-bold uppercase text-white mt-0.5">
                    Live Construction
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Active
                </div>
              </div>

              {/* Dynamic Live Counter */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-4">
                <div className="text-xs uppercase text-slate-400 font-bold tracking-wider mb-1">
                  Total Completed Projects
                </div>
                <div className="text-4xl font-black text-brand-primary flex items-baseline">
                  <CountUp end={126} duration={2400} suffix="+" />
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Villas, commercial hubs, and apartments handed over.
                </p>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                  <span className="text-slate-400">Head Engineer:</span>
                  <span className="font-semibold text-white">Er. M. Joshva Priyan</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                  <span className="text-slate-400">Main Office:</span>
                  <span className="font-semibold text-white">Palani Road, Dindigul</span>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span className="text-slate-400">Direct WhatsApp:</span>
                  <span className="font-semibold text-brand-primary">Instant Response</span>
                </div>
              </div>

              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                  `Hello ${siteConfig.name}, I want to discuss a new construction project in Dindigul.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 block w-full py-3 text-center rounded-lg bg-white/10 hover:bg-brand-primary hover:text-brand-ink text-white font-bold text-xs uppercase tracking-wider transition-colors"
              >
                Chat Direct on WhatsApp &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Video Playback Toggle Control Button */}
      <div className="absolute bottom-4 right-4 z-20">
        <button
          type="button"
          onClick={toggleVideo}
          aria-label={isPlaying ? "Pause background footage" : "Play background footage"}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-ink/80 hover:bg-brand-ink text-slate-300 hover:text-white border border-white/20 text-xs backdrop-blur-md transition-colors"
        >
          {isPlaying ? (
            <>
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
              <span className="hidden sm:inline">Pause Video</span>
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              <span className="hidden sm:inline">Play Video</span>
            </>
          )}
        </button>
      </div>
    </section>
  );
}
