"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/data/site";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    // Autoplay video with sound muted for modern browsers
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
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
      className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center bg-slate-950 text-white overflow-hidden py-16 lg:py-24"
      aria-label="Welcome hero section"
    >
      {/* Background Video Layer - Clearly and Brightly Visible */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="https://images.unsplash.com/photo-1541888946425-d81bb19940f2?w=1600&auto=format&fit=crop&q=80"
          className="absolute inset-0 w-full h-full object-cover opacity-85 transition-opacity duration-700"
        >
          <source src="/images/site-timelapse.mp4" type="video/mp4" />
          <source src="/images/site-timelapse-scroll.mp4" type="video/mp4" />
        </video>

        {/* Lightweight gradient overlay to ensure video remains vivid while keeping text legible */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40" />

        {/* Industrial Blueprint Subtle Grid Pattern */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(245, 158, 11, 0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(245, 158, 11, 0.25) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          {/* Location & Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/90 border border-amber-500/50 text-amber-400 text-xs sm:text-sm font-bold tracking-wider uppercase mb-6 backdrop-blur-md shadow-lg">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500" />
            </span>
            <span>
              {siteConfig.city}, {siteConfig.state} &bull; Licensed Civil Engineers
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-[1.08] text-white drop-shadow-lg">
            Building The Future With{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 drop-shadow">
              Structural Strength
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 text-base sm:text-lg lg:text-xl text-slate-100 leading-relaxed font-medium max-w-2xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            Welcome to <strong className="text-amber-400 font-bold">{siteConfig.name}</strong>, directed
            by {siteConfig.engineerName}. We engineer earthquake-resistant independent homes, luxury
            duplex villas, commercial complexes, and industrial warehouses in Dindigul and Tamil Nadu.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 sm:gap-5">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-extrabold bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-xl hover:shadow-amber-500/30 hover:scale-[1.02] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-500"
            >
              <span>Request a Free Quote</span>
              <svg
                className="w-5 h-5 ml-2 font-bold"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            <Link
              href="/projects"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-bold bg-slate-900/80 border-2 border-white/40 text-white hover:bg-white hover:text-slate-950 transition-all duration-300 backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Explore Our Projects
            </Link>
          </div>

          {/* Key Assurance Badges */}
          <div className="mt-12 pt-8 border-t border-white/20 grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs sm:text-sm text-slate-200">
            <div className="flex items-center gap-2.5 drop-shadow">
              <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 font-black text-xs">
                ✓
              </span>
              <span className="font-semibold">Licensed Civil Engineers</span>
            </div>
            <div className="flex items-center gap-2.5 drop-shadow">
              <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 font-black text-xs">
                ✓
              </span>
              <span className="font-semibold">IS 456 & 1893 Earthquake Safe</span>
            </div>
            <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1 drop-shadow">
              <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 font-black text-xs">
                ✓
              </span>
              <span className="font-semibold">Fixed-Cost Turnkey Handover</span>
            </div>
          </div>
        </div>
      </div>

      {/* Video Playback Toggle Control Button */}
      <div className="absolute bottom-5 right-5 z-20">
        <button
          type="button"
          onClick={toggleVideo}
          aria-label={isPlaying ? "Pause background footage" : "Play background footage"}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-900/85 hover:bg-slate-900 text-amber-400 border border-amber-500/40 text-xs font-semibold backdrop-blur-md shadow-lg transition-all"
        >
          {isPlaying ? (
            <>
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
              <span>Pause Footage</span>
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              <span>Play Footage</span>
            </>
          )}
        </button>
      </div>
    </section>
  );
}
