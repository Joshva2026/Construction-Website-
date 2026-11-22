import Image from "next/image";
import { siteConfig } from "@/data/site";
import SectionHeading from "./SectionHeading";

export default function Services() {
  return (
    <section className="py-20 sm:py-28 bg-brand-paper relative" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Specialized Capabilities"
          title="Engineered For Strength, Built For Generations"
          description="From structural foundation calculations adhering to seismic Indian Standard (IS) benchmarks to complete turnkey villa construction and commercial towers in Tamil Nadu."
          align="left"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {siteConfig.services.map((service) => (
            <article
              key={service.id}
              className="group bg-white rounded-2xl overflow-hidden border border-brand-line shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col"
            >
              {/* Service Card Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 px-3 py-1 bg-brand-ink/90 backdrop-blur-md text-brand-primary text-xs font-mono font-bold rounded-md border border-white/10 shadow">
                  STEP {service.number}
                </span>
              </div>

              {/* Service Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold uppercase tracking-tight text-slate-900 group-hover:text-brand-primary transition-colors">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed flex-1">
                  {service.description}
                </p>

                {/* Service Bullet Highlights */}
                {service.features && (
                  <ul className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs font-medium text-slate-700">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-primary shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-brand-ink group-hover:text-brand-primary transition-colors">
                  <span>Inquire for Site</span>
                  <span className="group-hover:translate-x-1.5 transition-transform text-brand-primary font-black">
                    &rarr;
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
