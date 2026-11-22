import Link from "next/link";
import { siteConfig as defaultSiteConfig, SiteConfig } from "@/data/site";

export default function CallToAction({ siteConfig: propSiteConfig }: { siteConfig?: SiteConfig } = {}) {
  const siteConfig = propSiteConfig || defaultSiteConfig;
  return (
    <section className="bg-slate-950 text-white py-16 sm:py-24 relative overflow-hidden">
      {/* Decorative safety gold ambient glow */}
      <div
        className="absolute -right-20 -bottom-20 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 rounded-3xl p-8 sm:p-12 lg:p-16 border-2 border-amber-500/30 shadow-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
              <span>Ready To Start Your Project?</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight">
              Build Your Dream Project in Dindigul & Tamil Nadu
            </h2>
            <p className="mt-4 text-base text-slate-300 leading-relaxed">
              Whether you need structural blueprint approvals, geotechnical site supervision, or complete
              turnkey construction from foundation pile to handover, {siteConfig.name} delivers with
              fixed schedules and zero compromise.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-extrabold bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-xl hover:shadow-amber-500/30 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-500 text-center"
            >
              Request a Free Quote
            </Link>
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                `Hello ${siteConfig.name}, I want to discuss a new construction or structural project in Dindigul.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-bold border-2 border-white/20 text-white hover:bg-white/10 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white text-center"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
