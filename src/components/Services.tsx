import Image from "next/image";
import { siteConfig } from "@/data/site";
import SectionHeading from "./SectionHeading";

export default function Services() {
  return (
    <section className="py-16 sm:py-24 bg-brand-paper" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What We Do"
          title="From The First Drawing To Final Handover"
          description="Comprehensive civil engineering, rigorous structural calculations, and turnkey on-site execution under strict quality and safety compliance."
          align="left"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {siteConfig.services.map((service) => (
            <article
              key={service.id}
              className="bg-white rounded-xl overflow-hidden border border-brand-line shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col group"
            >
              {/* Service Card Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-200">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-brand-ink/80 backdrop-blur-sm text-brand-primary text-xs font-mono font-bold rounded">
                  {service.number}
                </span>
              </div>

              {/* Service Details */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold uppercase tracking-tight text-slate-900 group-hover:text-brand-primary-hover transition-colors">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed flex-1">
                  {service.description}
                </p>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-bold uppercase tracking-wider text-brand-primary group-hover:translate-x-1 transition-transform">
                  <span>Learn more</span>
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
