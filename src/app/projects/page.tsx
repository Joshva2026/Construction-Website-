import { Metadata } from "next";
import { Suspense } from "react";
import ProjectFilter from "@/components/ProjectFilter";
import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";
import CallToAction from "@/components/CallToAction";
import { projects, ProjectCategory } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects & Portfolio",
  description:
    "Explore our delivered and ongoing construction projects across residential towers, commercial complexes, and seismic structural renovations.",
};

// Client Component to handle searchParams filtering inside a Suspense boundary
function ProjectsList({ category }: { category?: string }) {
  const filteredProjects = projects.filter((project) => {
    if (!category || category === "All") return true;
    return project.category.toLowerCase() === category.toLowerCase();
  });

  return (
    <div className="space-y-10">
      <ProjectFilter currentCategory={category || "All"} />

      {filteredProjects.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-brand-line p-8 max-w-lg mx-auto">
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
    <div className="py-12 sm:py-20 bg-brand-paper min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Portfolio"
          title="Engineered With Precision"
          description="Explore our delivered civil constructions, active working sites, and structural engineering assignments across the region."
          align="center"
        />

        <Suspense
          fallback={
            <div className="text-center py-12 text-slate-500 font-medium">
              Loading projects...
            </div>
          }
        >
          <ProjectsList category={selectedCategory} />
        </Suspense>
      </div>

      <div className="mt-20">
        <CallToAction />
      </div>
    </div>
  );
}
