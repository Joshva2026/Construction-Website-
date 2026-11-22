import Link from "next/link";
import { siteConfig } from "@/data/site";

export default function CallToAction() {
  return (
    <section className="bg-brand-ink text-white py-16 sm:py-20 relative overflow-hidden">
      {/* Decorative accent corner */}
      <div
        className="absolute -right-16 -bottom-16 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-brand-ink-2 rounded-2xl p-8 sm:p-12 lg:p-16 border border-white/10 shadow-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-brand-primary">
              Ready To Build?
            </span>
            <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white leading-tight">
              Let&apos;s Discuss Your Construction Or Structural Requirements
            </h2>
            <p className="mt-4 text-base text-slate-300 leading-relaxed">
              Whether you need structural calculations, architectural site supervision, or complete
              turnkey construction from foundation to finishes, our team is ready to assist.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-lg text-sm font-bold bg-brand-primary text-brand-ink hover:bg-brand-primary-hover shadow-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-primary text-center"
            >
              Request a Free Quote
            </Link>
            <a
              href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                `Hello ${siteConfig.name}, I am interested in discussing a new construction project.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-lg text-sm font-bold border border-white/30 text-white hover:bg-white/10 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white text-center"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
