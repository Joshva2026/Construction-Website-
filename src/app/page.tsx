import Link from "next/link";
import Hero from "@/components/Hero";
import CinematicVideoCard from "@/components/CinematicVideoCard";
import StatsBar from "@/components/StatsBar";
import Services from "@/components/Services";
import ProcessSteps from "@/components/ProcessSteps";
import ProjectCard from "@/components/ProjectCard";
import CallToAction from "@/components/CallToAction";
import SectionHeading from "@/components/SectionHeading";
import { getProjects, getSiteConfig } from "@/lib/data-service";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [siteConfig, projects] = await Promise.all([
    getSiteConfig(),
    getProjects(),
  ]);

  // First 3 featured projects
  const featuredProjects = projects.slice(0, 3);

  return (
    <>
      {/* Video Hero Section with Playback Controls */}
      <Hero siteConfig={siteConfig} />

      {/* Second video: rises into view as the visitor scrolls past the hero */}
      <CinematicVideoCard
        src="/images/site-showcase.mp4"
        poster="/images/site-showcase-poster.jpg"
        eyebrow="See the build"
        title="From foundation to finished home"
        caption={`${siteConfig.city}, ${siteConfig.state} · Built by ${siteConfig.engineerName}`}
      />

      {/* Dynamic Count-Up Key Stats */}
      <StatsBar stats={siteConfig.stats} />

      {/* Services Grid */}
      <Services services={siteConfig.services} />

      {/* Process Steps */}
      <ProcessSteps />

      {/* Featured Construction Projects */}
      <section className="py-20 sm:py-28 bg-brand-paper" aria-label="Featured Projects">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16">
            <SectionHeading
              eyebrow="Recent Milestones"
              title={`Featured Projects in ${siteConfig.city} & Tamil Nadu`}
              description="A curated look at our delivered residential duplexes, high-traffic commercial complexes, and seismic structural retrofits."
              align="left"
            />
            <div className="hidden sm:block shrink-0 mb-12">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-white text-brand-ink hover:bg-brand-primary hover:text-brand-ink border border-slate-300 shadow-sm transition-all duration-300"
              >
                <span>View All {projects.length}+ Projects</span>
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
              className="inline-flex items-center justify-center w-full px-6 py-4 rounded-xl text-sm font-bold bg-brand-ink text-white hover:bg-brand-ink-3 transition-colors shadow-lg"
            >
              Explore All {projects.length}+ Projects &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Conversion Banner */}
      <CallToAction siteConfig={siteConfig} />
    </>
  );
}
