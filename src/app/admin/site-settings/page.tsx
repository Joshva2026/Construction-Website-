"use client";

import { useEffect, useState } from "react";
import { SiteConfig } from "@/data/site";
import { useToast } from "@/components/admin/Toast";

export default function AdminSiteSettingsPage() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    fetch("/api/admin/site-config")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setConfig(data);
      })
      .catch(() => showToast("Failed to fetch site config", "error"))
      .finally(() => setLoading(false));
  }, [showToast]);

  const handleChange = (field: keyof SiteConfig, value: any) => {
    if (!config) return;
    setConfig({ ...config, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!config) return;

    setSaving(true);
    try {
      const res = await fetch("/api/admin/site-config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });

      if (res.ok) {
        showToast("Company information and site settings updated!", "success");
      } else {
        const err = await res.json();
        showToast(err.error || "Failed to update settings", "error");
      }
    } catch {
      showToast("Network error saving settings", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
        <div className="w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="mt-3 text-xs text-slate-500 font-semibold">Loading settings...</p>
      </div>
    );
  }

  if (!config) return null;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-black uppercase tracking-tight text-brand-ink">
            Company & Website Settings
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Update contact information, engineer credentials, address, and Google Maps
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 rounded-xl bg-brand-primary text-brand-ink font-extrabold text-xs uppercase tracking-wider hover:bg-amber-400 transition-all shadow-md shadow-amber-500/20 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Branding & Company Info */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-brand-ink border-b border-slate-100 pb-3">
              1. Brand Identity & Leadership
            </h3>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Company Name *
              </label>
              <input
                type="text"
                required
                value={config.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Chief Engineer Name & Degree *
              </label>
              <input
                type="text"
                required
                value={config.engineerName}
                onChange={(e) => handleChange("engineerName", e.target.value)}
                placeholder="Er. M. Joshva Priyan, B.E. (Civil)"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Tagline
              </label>
              <input
                type="text"
                value={config.tagline}
                onChange={(e) => handleChange("tagline", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Company Description
              </label>
              <textarea
                rows={3}
                value={config.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>
          </div>

          {/* Business Hours */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-brand-ink border-b border-slate-100 pb-3">
              Operating Hours
            </h3>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Weekly Working Hours
              </label>
              <input
                type="text"
                value={config.hours}
                onChange={(e) => handleChange("hours", e.target.value)}
                placeholder="Monday - Saturday: 8:30 AM - 7:00 PM"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Contact & Location */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-brand-ink border-b border-slate-100 pb-3">
              2. Direct Contact Channels
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Phone (Visible on site) *
                </label>
                <input
                  type="text"
                  required
                  value={config.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  WhatsApp Number (Digits only) *
                </label>
                <input
                  type="text"
                  required
                  value={config.whatsappNumber}
                  onChange={(e) => handleChange("whatsappNumber", e.target.value.replace(/\D/g, ""))}
                  placeholder="919876543210"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Official Email Address *
              </label>
              <input
                type="email"
                required
                value={config.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="joshvaconstruction@gmail.com"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Full Physical Address *
              </label>
              <textarea
                rows={2}
                required
                value={config.address}
                onChange={(e) => handleChange("address", e.target.value)}
                placeholder="Palani Road, Near Collectorate, Dindigul - 624004"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={config.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  State
                </label>
                <input
                  type="text"
                  value={config.state}
                  onChange={(e) => handleChange("state", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Pincode
                </label>
                <input
                  type="text"
                  value={config.pincode}
                  onChange={(e) => handleChange("pincode", e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-brand-ink border-b border-slate-100 pb-3">
              Google Maps Location Embed
            </h3>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Google Maps Embed URL (iframe src)
              </label>
              <textarea
                rows={2}
                value={config.mapEmbedUrl}
                onChange={(e) => handleChange("mapEmbedUrl", e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
            </div>

            {config.mapEmbedUrl && (
              <div className="h-40 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
                <iframe
                  src={config.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
