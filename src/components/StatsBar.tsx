"use client";

import { siteConfig as defaultSiteConfig, SiteConfig } from "@/data/site";
import CountUp from "./CountUp";

export default function StatsBar({ stats: propStats }: { stats?: SiteConfig["stats"] } = {}) {
  const stats = propStats || defaultSiteConfig.stats;
  const statsList = [
    {
      ...stats.projectsCompleted,
      icon: (
        <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
    {
      ...stats.yearsExperience,
      icon: (
        <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      ...stats.satisfiedClients,
      icon: (
        <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
    {
      ...stats.onTimeDelivery,
      icon: (
        <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section
      aria-label="Verified Construction Track Record"
      className="relative z-20 -mt-10 sm:-mt-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 shadow-2xl border-2 border-amber-500/30 backdrop-blur-xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-800">
          {statsList.map((stat, idx) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center sm:items-start text-center sm:text-left ${
                idx > 0 ? "pt-6 sm:pt-0 sm:pl-6 lg:pl-8" : ""
              }`}
            >
              {/* Stat Icon & Label */}
              <div className="flex items-center gap-2 mb-2">
                <span className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30">
                  {stat.icon}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  {stat.label}
                </span>
              </div>

              {/* Dynamic Animated CountUp */}
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight font-sans flex items-baseline">
                <CountUp
                  end={stat.endValue}
                  duration={2400}
                  suffix={stat.suffix}
                  className="text-amber-400 drop-shadow-[0_2px_8px_rgba(245,158,11,0.3)]"
                />
              </div>

              {/* Description */}
              {stat.description && (
                <p className="mt-2 text-xs text-slate-400 leading-relaxed max-w-[220px]">
                  {stat.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
