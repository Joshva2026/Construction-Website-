import Link from "next/link";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import Services from "@/components/Services";
import ProcessSteps from "@/components/ProcessSteps";
import ProjectCard from "@/components/ProjectCard";
import CallToAction from "@/components/CallToAction";
import SectionHeading from "@/components/SectionHeading";
import { projects } from "@/data/projects";

export default function HomePage() {
  // First 3 projects featured on homepage
  const featuredProjects = projects.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Stats Bar */}
      <StatsBar />

      {/* Services Grid */}
      <Services />

      {/* Process Steps */}
      <ProcessSteps />

      {/* Featured Projects Section */}
      <section className="py-16 sm:py-24 bg-brand-paper" aria-label="Featured Projects">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16">
            <SectionHeading
              eyebrow="Recent Work"
              title="Featured Construction Projects"
              description="A glimpse of our structural engineering, commercial complexes, and premium turnkey residential builds."
              align="left"
            />
            <div className="hidden sm:block shrink-0 mb-12">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold bg-white text-brand-ink hover:bg-brand-primary hover:text-brand-ink border border-slate-300 shadow-sm transition-all duration-300"
              >
                <span>View All Projects</span>
                <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>

          <div className="mt-12 text-center sm:hidden">
            <Link
              href="/projects"
              className="inline-flex items-center justify-center w-full px-6 py-3.5 rounded-lg text-sm font-bold bg-brand-ink text-white hover:bg-brand-ink-3 transition-colors"
            >
              View All Projects &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Call To Action Banner */}
      <CallToAction />
    </>
  );
}
