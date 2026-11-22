import Link from "next/link";
import { siteConfig as defaultSiteConfig, SiteConfig } from "@/data/site";

export default function Footer({ siteConfig: propSiteConfig }: { siteConfig?: SiteConfig } = {}) {
  const siteConfig = propSiteConfig || defaultSiteConfig;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-ink text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-white">
              <div
                className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center text-brand-ink font-black text-base shadow-md"
                aria-hidden="true"
              >
                J
              </div>
              <span className="font-bold text-lg tracking-wide uppercase">
                {siteConfig.name}
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              {siteConfig.tagline}. Directed by {siteConfig.engineerName}. Committed to structural
              safety, quality construction, and transparent turnkey delivery across Dindigul and Tamil Nadu.
            </p>
            <div className="pt-2 flex flex-wrap gap-2">
              <span className="inline-block px-3 py-1 text-xs font-semibold rounded bg-brand-primary/10 text-brand-primary border border-brand-primary/20">
                126+ Projects Handed Over
              </span>
              <span className="inline-block px-3 py-1 text-xs font-semibold rounded bg-white/5 text-slate-300 border border-white/10">
                Dindigul, Tamil Nadu
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-brand-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-primary rounded"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="hover:text-brand-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-primary rounded"
                >
                  All Projects (126+ Delivered)
                </Link>
              </li>
              <li>
                <Link
                  href="/projects?category=Residential"
                  className="hover:text-brand-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-primary rounded"
                >
                  Residential Duplexes & Villas
                </Link>
              </li>
              <li>
                <Link
                  href="/projects?category=Commercial"
                  className="hover:text-brand-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-primary rounded"
                >
                  Commercial Complexes & PEB
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-brand-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-primary rounded"
                >
                  Request a Free Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Engineering Services
            </h3>
            <ul className="space-y-2.5 text-sm">
              {siteConfig.services.map((service) => (
                <li key={service.id} className="text-slate-400">
                  {service.title}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
              Dindigul Office
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-brand-primary shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>{siteConfig.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-brand-primary shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
                  className="hover:text-brand-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-primary rounded"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 text-brand-primary shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-brand-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-primary rounded"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-xs text-slate-400">
                <svg
                  className="w-5 h-5 text-brand-primary shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{siteConfig.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; {currentYear} {siteConfig.name}, Dindigul, Tamil Nadu. All rights reserved. &bull;{" "}
            <Link href="/admin" className="hover:text-brand-primary underline transition-colors">
              Admin Portal
            </Link>
          </p>
          <p>Licensed Civil Engineers &bull; Turnkey Civil Contracts &bull; IS 456 / IS 1893 Standards</p>
        </div>
      </div>
    </footer>
  );
}
