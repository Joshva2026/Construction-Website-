"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ProjectCategory } from "@/data/projects";

interface ProjectFilterProps {
  currentCategory: string;
}

export default function ProjectFilter({ currentCategory }: ProjectFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categories: Array<{ label: string; value: string }> = [
    { label: "All Projects", value: "All" },
    { label: "Residential", value: "Residential" },
    { label: "Commercial", value: "Commercial" },
    { label: "Renovation", value: "Renovation" },
  ];

  const handleFilter = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "All") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    const query = params.toString() ? `?${params.toString()}` : "";
    router.push(`/projects${query}`, { scroll: false });
  };

  return (
    <div
      role="region"
      aria-label="Project Category Filter"
      className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-4"
    >
      {categories.map((cat) => {
        const isSelected =
          (cat.value === "All" && (!currentCategory || currentCategory === "All")) ||
          currentCategory === cat.value;

        return (
          <button
            key={cat.value}
            type="button"
            onClick={() => handleFilter(cat.value)}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 ${
              isSelected
                ? "bg-brand-ink text-brand-primary shadow-md scale-105"
                : "bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200"
            }`}
            aria-pressed={isSelected}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
