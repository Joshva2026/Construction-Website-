"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { siteConfig as defaultSiteConfig, SiteConfig } from "@/data/site";

export default function Navbar({ siteConfig: propSiteConfig }: { siteConfig?: SiteConfig } = {}) {
  const siteConfig = propSiteConfig || defaultSiteConfig;
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects (126+)" },
    { href: "/contact", label: "Contact & Quote" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-brand-ink/95 backdrop-blur-md border-b border-white/10 text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo for Joshva Construction */}
          <Link
            href="/"
            className="flex items-center gap-3.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-md p-1"
          >
            <div
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-primary via-yellow-500 to-amber-600 flex items-center justify-center text-brand-ink font-black text-xl shadow-lg group-hover:scale-105 transition-transform duration-300"
              aria-hidden="true"
            >
              J
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-extrabold uppercase tracking-wider text-base sm:text-lg text-white group-hover:text-brand-primary transition-colors">
                {siteConfig.name}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-brand-primary tracking-widest uppercase">
                {siteConfig.city}, Tamil Nadu
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors duration-300 relative py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded ${
                    isActive
                      ? "text-brand-primary font-bold"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary rounded-full shadow-[0_0_8px_rgba(242,169,0,0.8)]" />
                  )}
                </Link>
              );
            })}

            <div className="flex items-center gap-3">
              <a
                href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
                className="hidden lg:flex items-center gap-2 text-xs text-slate-300 hover:text-white font-medium px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
              >
                <svg className="w-3.5 h-3.5 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 4V3z" />
                </svg>
                <span>Call Now</span>
              </a>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-bold bg-brand-primary text-brand-ink hover:bg-brand-primary-hover shadow-md hover:shadow-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-primary"
              >
                Get a Quote
              </Link>
            </div>
          </nav>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              id="mobile-menu-button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                aria-hidden="true"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        id="mobile-menu"
        className={`md:hidden border-t border-white/10 bg-brand-ink-2 px-4 pt-4 pb-6 transition-all duration-300 ${
          isOpen ? "block opacity-100" : "hidden opacity-0"
        }`}
      >
        <div className="flex flex-col space-y-3">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`px-3 py-2.5 rounded-lg text-base font-semibold transition-colors ${
                  isActive
                    ? "bg-brand-primary/15 text-brand-primary font-bold"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-2">
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center px-4 py-3 rounded-lg text-sm font-bold bg-brand-primary text-brand-ink hover:bg-brand-primary-hover shadow transition-colors"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
