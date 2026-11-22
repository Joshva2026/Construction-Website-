"use client";

import { useEffect, useState } from "react";
import { SiteStat } from "@/data/site";
import { useToast } from "@/components/admin/Toast";

interface StatsState {
  projectsCompleted: SiteStat;
  yearsExperience: SiteStat;
  satisfiedClients: SiteStat;
  onTimeDelivery: SiteStat;
  [key: string]: SiteStat;
}

export default function AdminStatsPage() {
  const [stats, setStats] = useState<StatsState | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setStats(data);
      })
      .catch(() => showToast("Failed to load stats", "error"))
      .finally(() => setLoading(false));
  }, [showToast]);

  const handleChange = (key: string, field: keyof SiteStat, value: any) => {
    if (!stats) return;
    setStats({
      ...stats,
      [key]: {
        ...stats[key],
        [field]: value,
      },
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stats) return;

    setSaving(true);
    try {
      const res = await fetch("/api/admin/stats", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stats),
      });

      if (res.ok) {
        showToast("Key metrics and counters updated successfully!", "success");
      } else {
        const err = await res.json();
        showToast(err.error || "Failed to update stats", "error");
      }
    } catch {
      showToast("Network error while saving metrics", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
        <div className="w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="mt-3 text-xs text-slate-500 font-semibold">Loading stats...</p>
      </div>
    );
  }

  const statCards = [
    { key: "projectsCompleted", defaultLabel: "Projects Completed" },
    { key: "yearsExperience", defaultLabel: "Years of Experience" },
    { key: "satisfiedClients", defaultLabel: "Satisfied Clients" },
    { key: "onTimeDelivery", defaultLabel: "On-Time Delivery" },
  ];

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-black uppercase tracking-tight text-brand-ink">
            Key Metrics & Animated Counters
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            These numbers dynamically count up on the homepage stats bar
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 rounded-xl bg-brand-primary text-brand-ink font-extrabold text-xs uppercase tracking-wider hover:bg-amber-400 transition-all shadow-md shadow-amber-500/20 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Metrics"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {statCards.map(({ key, defaultLabel }) => {
          const item = stats?.[key] || {
            label: defaultLabel,
            endValue: 100,
            suffix: "+",
            description: "",
          };

          return (
            <div
              key={key}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="font-extrabold text-sm uppercase text-brand-ink tracking-tight">
                  {item.label}
                </span>
                <span className="px-3 py-1 bg-amber-50 text-amber-700 font-black text-xs rounded-lg">
                  Preview: {item.endValue}
                  {item.suffix}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Number Value (End Value)
                  </label>
                  <input
                    type="number"
                    value={item.endValue}
                    onChange={(e) =>
                      handleChange(key, "endValue", parseInt(e.target.value) || 0)
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-bold text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Suffix (e.g. +, %, k)
                  </label>
                  <input
                    type="text"
                    value={item.suffix || ""}
                    onChange={(e) => handleChange(key, "suffix", e.target.value)}
                    placeholder="+ or %"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-bold text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Metric Title Label
                </label>
                <input
                  type="text"
                  value={item.label}
                  onChange={(e) => handleChange(key, "label", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Sub-description
                </label>
                <input
                  type="text"
                  value={item.description || ""}
                  onChange={(e) => handleChange(key, "description", e.target.value)}
                  placeholder="Supporting proof or regional coverage details..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-600 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
              </div>
            </div>
          );
        })}
      </div>
    </form>
  );
}
