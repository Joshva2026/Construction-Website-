import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjects, getSiteConfig } from "@/lib/data-service";
import { siteConfig as defaultSiteConfig } from "@/data/site";
import CallToAction from "@/components/CallToAction";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

interface ProjectDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const [project, siteConfig] = await Promise.all([
    getProjectBySlug(params.slug),
    getSiteConfig(),
  ]);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | ${siteConfig.name} - ${project.location}`,
    description: project.summary,
    openGraph: {
      title: `${project.title} | ${siteConfig.name}`,
      description: project.summary,
      images: [
        {
          url: project.cover,
          width: 1200,
          height: 800,
          alt: project.title,
        },
      ],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const [project, siteConfig] = await Promise.all([
    getProjectBySlug(params.slug),
    getSiteConfig(),
  ]);

  if (!project) {
    notFound();
  }

  return (
    <article className="py-12 sm:py-20 bg-brand-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-600 hover:text-brand-ink transition-colors"
          >
            <span aria-hidden="true">&larr;&nbsp;</span> Back to All Projects
          </Link>
        </nav>

        {/* Hero Section of the Project */}
        <div className="relative aspect-[16/9] md:aspect-[21/9] w-full rounded-2xl overflow-hidden shadow-2xl bg-brand-ink mb-12 border border-slate-800">
          <Image
            src={project.cover}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 lg:p-12 text-white">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="px-3.5 py-1 bg-brand-primary text-brand-ink font-bold text-xs uppercase tracking-wider rounded-md shadow">
                {project.category}
              </span>
              <span className="text-xs text-slate-300 font-medium bg-black/40 px-2.5 py-1 rounded backdrop-blur-sm">
                Completed in {project.year}
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-white leading-tight">
              {project.title}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-300 flex items-center gap-2">
              <svg className="w-4 h-4 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              {project.location}
            </p>
          </div>
        </div>

        {/* Key Metrics / Specification Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm mb-12">
          <div>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Project Category
            </span>
            <span className="text-base font-extrabold text-brand-ink mt-0.5 block">
              {project.category}
            </span>
          </div>
          <div>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Total Built-Up Area
            </span>
            <span className="text-base font-extrabold text-brand-ink mt-0.5 block">
              {project.area}
            </span>
          </div>
          <div>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Execution Timeline
            </span>
            <span className="text-base font-extrabold text-brand-ink mt-0.5 block">
              {project.duration}
            </span>
          </div>
          <div>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Completion Year
            </span>
            <span className="text-base font-extrabold text-brand-primary mt-0.5 block">
              {project.year}
            </span>
          </div>
        </div>

        {/* Project Description & Engineering Scope */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl font-black uppercase tracking-tight text-brand-ink">
              Architectural & Structural Summary
            </h2>
            <p className="text-base text-slate-700 leading-relaxed">
              {project.summary}
            </p>

            <div className="pt-4 border-t border-slate-200">
              <h3 className="text-lg font-bold uppercase tracking-tight text-brand-ink mb-3">
                Key Deliverables & Civil Scope
              </h3>
              <ul className="space-y-3">
                {project.scope.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-brand-primary/20 text-brand-ink font-bold flex items-center justify-center text-xs shrink-0 mt-0.5">
                      &#10003;
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-slate-800">
              <span className="block text-xs font-bold uppercase tracking-wider text-amber-800 mb-1">
                Structural Certification & Handover Outcome
              </span>
              <p className="text-sm font-medium leading-relaxed">
                {project.outcome}
              </p>
            </div>
          </div>

          <aside className="lg:col-span-5 bg-brand-ink text-white p-8 rounded-2xl shadow-xl border border-slate-800 space-y-6">
            <h3 className="text-xl font-bold uppercase tracking-tight text-white">
              Interested in a Similar Construction?
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Consult directly with Er. M. Joshva Priyan for foundation soil assessments, RCC architectural drafting, or complete turnkey execution in Tamil Nadu.
            </p>

            <div className="space-y-3 pt-2">
              <Link
                href="/contact"
                className="block text-center w-full py-3.5 px-4 rounded-xl bg-brand-primary text-brand-ink font-extrabold text-xs uppercase tracking-wider hover:bg-amber-400 transition-colors shadow-lg"
              >
                Request Free Quote
              </Link>
              <a
                href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                  `Hello ${siteConfig.name}, I am interested in building a project similar to "${project.title}".`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs uppercase tracking-wider transition-colors"
              >
                Chat on WhatsApp
              </a>
            </div>
          </aside>
        </div>

        {/* Project Gallery Images */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-black uppercase tracking-tight text-brand-ink">
              Project On-Site Gallery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.gallery.map((img, idx) => (
                <div
                  key={idx}
                  className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-900 group"
                >
                  <Image
                    src={img}
                    alt={`${project.title} - photo ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-20">
        <CallToAction siteConfig={siteConfig} />
      </div>
    </article>
  );
}
