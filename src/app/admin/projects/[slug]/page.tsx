"use client";

import { useEffect, useState } from "react";
import ProjectForm from "../ProjectForm";
import { Project } from "@/data/projects";

export default function EditProjectPage({ params }: { params: { slug: string } }) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/projects/${params.slug}`)
      .then((res) => {
        if (!res.ok) {
          setNotFound(true);
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data) setProject(data);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [params.slug]);

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="mt-3 text-xs text-slate-500 font-semibold">Loading project data...</p>
      </div>
    );
  }

  if (notFound || !project) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8">
        <h3 className="text-base font-bold text-slate-800">Project Not Found</h3>
        <p className="text-xs text-slate-500 mt-1">
          No project exists with the slug &ldquo;{params.slug}&rdquo;.
        </p>
      </div>
    );
  }

  return <ProjectForm initialData={project} isEdit={true} />;
}
