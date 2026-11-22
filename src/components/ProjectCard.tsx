import Link from "next/link";
import Image from "next/image";
import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const categoryStyles: Record<string, string> = {
    Residential: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30",
    Commercial: "bg-blue-500/10 text-blue-700 border-blue-500/30",
    Renovation: "bg-amber-500/10 text-amber-700 border-amber-500/30",
  };

  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-brand-line shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
      {/* Cover Image Container */}
      <Link
        href={`/projects/${project.slug}`}
        className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={project.cover}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 left-3">
          <span
            className={`inline-block px-3 py-1 text-xs font-bold rounded-md uppercase tracking-wider backdrop-blur-md border ${
              categoryStyles[project.category] || "bg-slate-100 text-slate-700 border-slate-200"
            }`}
          >
            {project.category}
          </span>
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/90">
          <span className="font-mono font-semibold">{project.year}</span>
          <span className="font-semibold text-brand-primary group-hover:underline">
            View Details &rarr;
          </span>
        </div>
      </Link>

      {/* Body Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-slate-900 group-hover:text-brand-primary transition-colors">
          <Link
            href={`/projects/${project.slug}`}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded"
          >
            {project.title}
          </Link>
        </h3>

        <div className="mt-2.5 flex items-center text-xs text-slate-500 gap-2.5">
          <span className="flex items-center gap-1 font-medium text-slate-700">
            <svg className="w-3.5 h-3.5 text-brand-primary shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="truncate">{project.location}</span>
          </span>
          <span>&bull;</span>
          <span className="shrink-0">{project.area}</span>
        </div>

        <p className="mt-3.5 text-sm text-slate-600 line-clamp-2 leading-relaxed flex-1">
          {project.summary}
        </p>

        {/* Card Footer Link */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-brand-ink group-hover:text-brand-primary transition-colors">
          <span>Engineering Specs</span>
          <span className="group-hover:translate-x-1.5 transition-transform text-brand-primary font-black">&rarr;</span>
        </div>
      </div>
    </article>
  );
}
