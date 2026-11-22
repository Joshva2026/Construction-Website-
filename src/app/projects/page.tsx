import { Metadata } from "next";
import { Suspense } from "react";
import ProjectFilter from "@/components/ProjectFilter";
import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";
import CallToAction from "@/components/CallToAction";
import { projects } from "@/data/projects";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Projects & Engineering Portfolio | Dindigul, Tamil Nadu",
  description: `Explore delivered and active construction projects by ${siteConfig.name} across Dindigul, Madurai, Trichy, and Tamil Nadu. Residential villas, commercial towers, and industrial warehouses.`,
};

function ProjectsList({ category }: { category?: string }) {
  const filteredProjects = projects.filter((project) => {
    if (!category || category === "All") return true;
    return project.category.toLowerCase() === category.toLowerCase();
  });

  return (
    <div className="space-y-12">
      <ProjectFilter currentCategory={category || "All"} />

      {filteredProjects.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-brand-line p-8 max-w-lg mx-auto shadow-sm">
          <p className="text-base text-slate-600 font-medium">
            No projects found in this category.
          </p>
          <a
            href="/projects"
            className="mt-4 inline-block text-sm font-bold text-brand-primary underline"
          >
            Clear filter
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProjectsPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const selectedCategory = searchParams?.category;

  return (
    <div className="py-14 sm:py-24 bg-brand-paper min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="126+ Proven Milestones"
          title={`Civil & Structural Portfolio in ${siteConfig.city}`}
          description="Explore our delivered civil constructions, active working sites, and structural engineering assignments across Dindigul and South India."
          align="center"
        />

        <Suspense
          fallback={
            <div className="text-center py-16 text-slate-500 font-medium">
              Loading projects...
            </div>
          }
        >
          <ProjectsList category={selectedCategory} />
        </Suspense>
      </div>

      <div className="mt-24">
        <CallToAction />
      </div>
    </div>
  );
}
