"use client";

import { useEffect, useState, useCallback } from "react";
import { SiteService } from "@/data/site";
import { useToast } from "@/components/admin/Toast";

export default function AdminServicesPage() {
  const [services, setServices] = useState<SiteService[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  const fetchServices = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/services");
      if (res.ok) {
        const data = await res.json();
        setServices(data);
      }
    } catch {
      showToast("Failed to fetch services", "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const handleServiceChange = (index: number, field: keyof SiteService, value: any) => {
    setServices((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handleAddFeature = (serviceIndex: number, featureText: string) => {
    if (!featureText.trim()) return;
    setServices((prev) => {
      const copy = [...prev];
      copy[serviceIndex].features = [...copy[serviceIndex].features, featureText.trim()];
      return copy;
    });
  };

  const handleRemoveFeature = (serviceIndex: number, featureIndex: number) => {
    setServices((prev) => {
      const copy = [...prev];
      copy[serviceIndex].features = copy[serviceIndex].features.filter((_, i) => i !== featureIndex);
      return copy;
    });
  };

  const handleAddService = () => {
    const nextNum = (services.length + 1).toString().padStart(2, "0");
    const newService: SiteService = {
      id: `service-${Date.now().toString(36)}`,
      number: nextNum,
      title: "New Engineering Service",
      description: "Description of the specialized civil engineering or turnkey construction offering.",
      image: "/images/indian-rcc-site.jpg",
      features: ["Certified Engineering Inspection", "IS Code Adherence", "Fixed Timeline Guarantee"],
    };
    setServices((prev) => [...prev, newService]);
    showToast("New service draft added below. Remember to save changes!", "info");
  };

  const handleDeleteService = (index: number) => {
    if (!confirm("Are you sure you want to remove this service?")) return;
    setServices((prev) => prev.filter((_, i) => i !== index));
    showToast("Service removed. Click Save Changes to apply to live site.", "info");
  };

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/services", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(services),
      });

      if (res.ok) {
        showToast("Civil services updated successfully!", "success");
      } else {
        const err = await res.json();
        showToast(err.error || "Failed to update services", "error");
      }
    } catch {
      showToast("Network error while saving services", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-black uppercase tracking-tight text-brand-ink">
            Civil Engineering Services ({services.length})
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Modify the core specializations shown on the website homepage
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleAddService}
            className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors"
          >
            + Add New Service
          </button>
          <button
            type="button"
            onClick={handleSaveAll}
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-brand-primary text-brand-ink font-extrabold text-xs uppercase tracking-wider hover:bg-amber-400 transition-all shadow-md shadow-amber-500/20 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save All Changes"}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
          <div className="w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-3 text-xs text-slate-500 font-semibold">Loading services...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {services.map((service, sIndex) => (
            <div
              key={service.id || sIndex}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-brand-primary text-brand-ink font-black flex items-center justify-center text-xs">
                    {service.number}
                  </span>
                  <span className="font-extrabold text-sm uppercase text-brand-ink">
                    Service #{sIndex + 1}: {service.title}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteService(sIndex)}
                  className="text-xs text-rose-500 hover:text-rose-700 font-bold px-3 py-1.5 rounded-lg hover:bg-rose-50"
                >
                  Delete Service
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                        Index Number
                      </label>
                      <input
                        type="text"
                        value={service.number}
                        onChange={(e) => handleServiceChange(sIndex, "number", e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold"
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                        Service Title
                      </label>
                      <input
                        type="text"
                        value={service.title}
                        onChange={(e) => handleServiceChange(sIndex, "title", e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-brand-ink"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Service Description
                    </label>
                    <textarea
                      rows={3}
                      value={service.description}
                      onChange={(e) => handleServiceChange(sIndex, "description", e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs leading-relaxed"
                    />
                  </div>

                  {/* Feature Bullets */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Key Highlights / Deliverables Checklist
                    </label>
                    <div className="space-y-2 mb-2">
                      {service.features.map((feat, fIndex) => (
                        <div
                          key={fIndex}
                          className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700"
                        >
                          <span>&bull; {feat}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveFeature(sIndex, fIndex)}
                            className="text-rose-500 hover:text-rose-700 font-bold px-1"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        id={`new-feat-${sIndex}`}
                        placeholder="Add bullet highlight (e.g. Earthquake Resistant Design)..."
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            const input = e.currentTarget;
                            handleAddFeature(sIndex, input.value);
                            input.value = "";
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const el = document.getElementById(`new-feat-${sIndex}`) as HTMLInputElement;
                          if (el && el.value) {
                            handleAddFeature(sIndex, el.value);
                            el.value = "";
                          }
                        }}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 text-white text-xs font-bold shrink-0"
                      >
                        Add Highlight
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right: Service Image */}
                <div className="lg:col-span-4 space-y-3">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Service Image
                  </label>
                  <div className="aspect-[16/10] rounded-2xl bg-slate-100 overflow-hidden border border-slate-200 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={service.image || "/images/indian-contemporary-villa.jpg"}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <input
                    type="text"
                    value={service.image}
                    onChange={(e) => handleServiceChange(sIndex, "image", e.target.value)}
                    placeholder="/images/photo.jpg"
                    className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-mono"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
