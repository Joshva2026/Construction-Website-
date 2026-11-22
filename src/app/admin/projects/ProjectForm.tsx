"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Project, ProjectCategory } from "@/data/projects";
import { useToast } from "@/components/admin/Toast";

interface ProjectFormProps {
  initialData?: Project;
  isEdit?: boolean;
}

export default function ProjectForm({ initialData, isEdit }: ProjectFormProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [form, setForm] = useState<Project>({
    slug: initialData?.slug || "",
    title: initialData?.title || "",
    category: (initialData?.category as ProjectCategory) || "Residential",
    location: initialData?.location || "Dindigul, Tamil Nadu",
    year: initialData?.year || new Date().getFullYear(),
    duration: initialData?.duration || "12 months",
    area: initialData?.area || "15,000 sq ft",
    summary: initialData?.summary || "",
    scope: initialData?.scope || [
      "Geotechnical soil investigation & foundation design",
      "RCC framed structure with Fe550D TMT steel reinforcement",
      "Vaastu-compliant architectural planning & elevation",
    ],
    outcome: initialData?.outcome || "Successfully completed and handed over on schedule.",
    cover: initialData?.cover || "/images/indian-contemporary-villa.jpg",
    gallery: initialData?.gallery || [
      "/images/indian-contemporary-villa.jpg",
      "/images/indian-rcc-site.jpg",
    ],
  });

  const [newScopeItem, setNewScopeItem] = useState("");
  const [newGalleryUrl, setNewGalleryUrl] = useState("");

  const generateSlug = () => {
    if (!form.title) return;
    const generated = form.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
    setForm((prev) => ({ ...prev, slug: generated }));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, targetField: "cover" | "gallery") => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const data = new FormData();
    data.append("file", file);

    try {
      const res = await fetch("/api/admin/media", {
        method: "POST",
        body: data,
      });

      if (!res.ok) {
        showToast("Upload failed", "error");
        return;
      }

      const json = await res.json();
      if (targetField === "cover") {
        setForm((prev) => ({ ...prev, cover: json.url }));
        showToast("Cover photo uploaded successfully", "success");
      } else {
        setForm((prev) => ({ ...prev, gallery: [...prev.gallery, json.url] }));
        showToast("Gallery photo added successfully", "success");
      }
    } catch {
      showToast("Network error uploading image", "error");
    } finally {
      setUploadingImage(false);
      e.target.value = "";
    }
  };

  const addScopeItem = () => {
    if (!newScopeItem.trim()) return;
    setForm((prev) => ({ ...prev, scope: [...prev.scope, newScopeItem.trim()] }));
    setNewScopeItem("");
  };

  const removeScopeItem = (index: number) => {
    setForm((prev) => ({ ...prev, scope: prev.scope.filter((_, i) => i !== index) }));
  };

  const addGalleryItem = () => {
    if (!newGalleryUrl.trim()) return;
    setForm((prev) => ({ ...prev, gallery: [...prev.gallery, newGalleryUrl.trim()] }));
    setNewGalleryUrl("");
  };

  const removeGalleryItem = (index: number) => {
    setForm((prev) => ({ ...prev, gallery: prev.gallery.filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.slug) {
      showToast("Title and Slug are required", "error");
      return;
    }

    setLoading(true);

    try {
      const url = isEdit
        ? `/api/admin/projects/${initialData?.slug}`
        : "/api/admin/projects";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        showToast(
          isEdit ? "Project updated successfully!" : "New project published successfully!",
          "success"
        );
        router.push("/admin/projects");
        router.refresh();
      } else {
        const err = await res.json();
        showToast(err.error || "Failed to save project", "error");
      }
    } catch {
      showToast("An unexpected error occurred while saving", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Action Header */}
      <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects"
            className="p-2 text-slate-400 hover:text-brand-ink rounded-xl border border-slate-200"
          >
            &larr;
          </Link>
          <div>
            <h2 className="text-lg font-black uppercase tracking-tight text-brand-ink">
              {isEdit ? `Edit: ${initialData?.title}` : "Create New Project"}
            </h2>
            <p className="text-xs text-slate-500">
              Fill in the architectural and structural details
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects"
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading || uploadingImage}
            className="px-6 py-2.5 rounded-xl bg-brand-primary text-brand-ink font-extrabold text-xs uppercase tracking-wider hover:bg-amber-400 transition-all shadow-md shadow-amber-500/20 disabled:opacity-50"
          >
            {loading ? "Saving..." : isEdit ? "Update Project" : "Publish Project"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Form Fields */}
        <div className="lg:col-span-8 space-y-6">
          {/* Basic Info */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-brand-ink border-b border-slate-100 pb-3">
              1. Project Overview
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Palani Road Luxury Duplex Enclave"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                <div className="sm:col-span-8">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    URL Slug * (Unique web identifier)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      required
                      value={form.slug}
                      onChange={(e) => setForm({ ...form, slug: e.target.value })}
                      placeholder="e.g. palani-road-luxury-villas"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    />
                    <button
                      type="button"
                      onClick={generateSlug}
                      className="px-3 py-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold shrink-0"
                      title="Generate slug from title"
                    >
                      Auto
                    </button>
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Category *
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as ProjectCategory })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary bg-white"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Renovation">Renovation</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Location
                  </label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="e.g. Palani Road, Dindigul"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Built-up Area
                  </label>
                  <input
                    type="text"
                    value={form.area}
                    onChange={(e) => setForm({ ...form, area: e.target.value })}
                    placeholder="e.g. 18,500 sq ft"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Year / Duration
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      value={form.year}
                      onChange={(e) => setForm({ ...form, year: parseInt(e.target.value) || 2026 })}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    />
                    <input
                      type="text"
                      value={form.duration}
                      onChange={(e) => setForm({ ...form, duration: e.target.value })}
                      placeholder="14 months"
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Summary Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={form.summary}
                  onChange={(e) => setForm({ ...form, summary: e.target.value })}
                  placeholder="Comprehensive description of the construction project, specifications and architectural layout..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Project Outcome / Current Status
                </label>
                <input
                  type="text"
                  value={form.outcome}
                  onChange={(e) => setForm({ ...form, outcome: e.target.value })}
                  placeholder="e.g. Completed on schedule with IS 456 & 1893 seismic certification."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
              </div>
            </div>
          </div>

          {/* Scope of Work */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-brand-ink border-b border-slate-100 pb-3">
              2. Scope of Work (Civil & Engineering Deliverables)
            </h3>

            <div className="space-y-2">
              {form.scope.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-[10px]">
                      {idx + 1}
                    </span>
                    <span>{item}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeScopeItem(idx)}
                    className="text-rose-500 hover:text-rose-700 font-bold p-1"
                    title="Remove item"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                value={newScopeItem}
                onChange={(e) => setNewScopeItem(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addScopeItem();
                  }
                }}
                placeholder="Add new scope deliverable (e.g. Ready-mix M25 concrete casting)..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
              <button
                type="button"
                onClick={addScopeItem}
                className="px-4 py-2.5 rounded-xl bg-slate-800 text-white hover:bg-black text-xs font-bold shrink-0"
              >
                Add Deliverable
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Images & Preview */}
        <div className="lg:col-span-4 space-y-6">
          {/* Cover Photo */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-brand-ink border-b border-slate-100 pb-3">
              Cover Image
            </h3>

            <div className="aspect-[16/10] rounded-2xl bg-slate-100 overflow-hidden relative border border-slate-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={form.cover || "/images/indian-contemporary-villa.jpg"}
                alt="Cover Preview"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Image Path or URL
              </label>
              <input
                type="text"
                value={form.cover}
                onChange={(e) => setForm({ ...form, cover: e.target.value })}
                placeholder="/images/your-photo.jpg or https://..."
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Upload New Image File
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, "cover")}
                className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-amber-100 file:text-amber-800 hover:file:bg-amber-200"
              />
            </div>

            <div className="text-[11px] text-slate-400">
              Preset options:
              <div className="flex flex-wrap gap-1 mt-1">
                {[
                  "/images/indian-contemporary-villa.jpg",
                  "/images/indian-commercial-complex.jpg",
                  "/images/indian-elevation-renovation.jpg",
                  "/images/indian-rcc-site.jpg",
                ].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setForm({ ...form, cover: preset })}
                    className="text-[10px] bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded"
                  >
                    {preset.split("/").pop()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Gallery Images */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-brand-ink border-b border-slate-100 pb-3">
              Gallery Images ({form.gallery.length})
            </h3>

            <div className="grid grid-cols-2 gap-2">
              {form.gallery.map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-video rounded-xl bg-slate-100 overflow-hidden border border-slate-200 group"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeGalleryItem(i)}
                    className="absolute top-1 right-1 w-5 h-5 bg-rose-600 text-white rounded-full flex items-center justify-center text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remove photo"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-2">
              <input
                type="text"
                value={newGalleryUrl}
                onChange={(e) => setNewGalleryUrl(e.target.value)}
                placeholder="Image path or external URL"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
              <button
                type="button"
                onClick={addGalleryItem}
                className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700"
              >
                + Add Image by URL
              </button>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Upload New Image to Gallery
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, "gallery")}
                className="w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-slate-100 file:text-slate-800 hover:file:bg-slate-200"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
