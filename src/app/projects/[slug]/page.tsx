import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, getAllProjectSlugs } from "@/data/projects";
import { siteConfig } from "@/data/site";
import CallToAction from "@/components/CallToAction";

interface ProjectDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);

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

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = getProjectBySlug(params.slug);

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

        {/* Project Key Metrics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white rounded-2xl border border-brand-line shadow-sm mb-12">
          <div>
            <span className="block text-xs uppercase font-bold tracking-wider text-slate-400">
              Site Location
            </span>
            <span className="text-sm sm:text-base font-bold text-slate-900 mt-1 block">
              {project.location}
            </span>
          </div>
          <div>
            <span className="block text-xs uppercase font-bold tracking-wider text-slate-400">
              Category
            </span>
            <span className="text-sm sm:text-base font-bold text-slate-900 mt-1 block">
              {project.category}
            </span>
          </div>
          <div>
            <span className="block text-xs uppercase font-bold tracking-wider text-slate-400">
              Contract Duration
            </span>
            <span className="text-sm sm:text-base font-bold text-slate-900 mt-1 block">
              {project.duration}
            </span>
          </div>
          <div>
            <span className="block text-xs uppercase font-bold tracking-wider text-slate-400">
              Built-up Area
            </span>
            <span className="text-sm sm:text-base font-bold text-slate-900 mt-1 block">
              {project.area}
            </span>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Main Description & Scope */}
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white p-8 rounded-2xl border border-brand-line shadow-sm">
              <h2 className="text-xl font-bold uppercase tracking-tight text-slate-900 mb-4">
                Project Overview & Summary
              </h2>
              <p className="text-slate-600 leading-relaxed text-base">
                {project.summary}
              </p>
            </section>

            <section className="bg-white p-8 rounded-2xl border border-brand-line shadow-sm">
              <h2 className="text-xl font-bold uppercase tracking-tight text-slate-900 mb-4">
                Engineering Scope of Work
              </h2>
              <ul className="space-y-3.5">
                {project.scope.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-slate-700 text-sm sm:text-base">
                    <span className="w-5 h-5 rounded-full bg-brand-primary/20 text-brand-primary flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-emerald-50/70 border border-emerald-200 p-8 rounded-2xl shadow-sm">
              <h2 className="text-xl font-bold uppercase tracking-tight text-emerald-950 mb-3">
                Project Outcome & Deliverables
              </h2>
              <p className="text-emerald-900 text-base leading-relaxed">
                {project.outcome}
              </p>
            </section>
          </div>

          {/* Sidebar CTA Card */}
          <div className="space-y-6">
            <div className="bg-brand-ink text-white p-8 rounded-2xl shadow-xl border border-slate-800">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-primary">
                Inquire With Lead Engineer
              </span>
              <h3 className="mt-2 text-2xl font-bold uppercase tracking-tight text-white leading-tight">
                Planning Similar Work in Tamil Nadu?
              </h3>
              <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                Connect directly with {siteConfig.engineerName} to assess soil feasibility, structural
                drawings, and fixed turnkey pricing.
              </p>

              <div className="mt-6 space-y-3">
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center px-5 py-3.5 rounded-xl text-sm font-bold bg-brand-primary text-brand-ink hover:bg-brand-primary-hover transition-colors shadow-lg"
                >
                  Request a Free Quote
                </Link>
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
                    `Hello ${siteConfig.name}, I am interested in building a project similar to "${project.title}" in ${project.location}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center px-5 py-3.5 rounded-xl text-sm font-semibold border border-white/20 text-white hover:bg-white/10 transition-colors"
                >
                  Enquire via WhatsApp
                </a>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800 text-xs text-slate-400 space-y-2">
                <p><strong>Office:</strong> {siteConfig.address}</p>
                <p><strong>Phone:</strong> {siteConfig.phone}</p>
                <p><strong>Email:</strong> {siteConfig.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="mt-16" aria-label="Project Gallery">
            <h2 className="text-2xl font-bold uppercase tracking-tight text-slate-900 mb-6">
              Construction Progress & Site Gallery
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.gallery.map((imgUrl, idx) => (
                <div
                  key={idx}
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-brand-line shadow-md group"
                >
                  <Image
                    src={imgUrl}
                    alt={`${project.title} site photo ${idx + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <div className="mt-20">
        <CallToAction />
      </div>
    </article>
  );
}
