import Link from "next/link";
import Image from "next/image";
import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const categoryStyles: Record<string, string> = {
    Residential: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
    Commercial: "bg-blue-500/10 text-blue-700 border-blue-500/20",
    Renovation: "bg-amber-500/10 text-amber-700 border-amber-500/20",
  };

  return (
    <article className="group bg-white rounded-xl overflow-hidden border border-brand-line shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
      {/* Cover Image Container */}
      <Link
        href={`/projects/${project.slug}`}
        className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={project.cover}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <span className="text-xs font-semibold text-white tracking-wide uppercase">
            View full project details &rarr;
          </span>
        </div>
      </Link>

      {/* Body Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className={`inline-block px-2.5 py-1 text-xs font-bold rounded uppercase tracking-wider border ${
              categoryStyles[project.category] || "bg-slate-100 text-slate-700 border-slate-200"
            }`}
          >
            {project.category}
          </span>
          <span className="text-xs font-medium text-slate-500">{project.year}</span>
        </div>

        <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-slate-900 group-hover:text-brand-primary-hover transition-colors">
          <Link
            href={`/projects/${project.slug}`}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded"
          >
            {project.title}
          </Link>
        </h3>

        <div className="mt-2 flex items-center text-xs text-slate-500 gap-3">
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            {project.location}
          </span>
          <span>&bull;</span>
          <span>{project.area}</span>
        </div>

        <p className="mt-3 text-sm text-slate-600 line-clamp-2 leading-relaxed flex-1">
          {project.summary}
        </p>

        {/* Card Footer Link */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-brand-ink group-hover:text-brand-primary-hover transition-colors">
          <span>Explore Specifications</span>
          <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
        </div>
      </div>
    </article>
  );
}
