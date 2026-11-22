"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Project } from "@/data/projects";
import { SiteConfig } from "@/data/site";
import { EnquiryRecord } from "@/lib/data-service";

export default function AdminDashboardPage() {
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [configRes, projectsRes, enquiriesRes] = await Promise.all([
          fetch("/api/admin/site-config"),
          fetch("/api/admin/projects"),
          fetch("/api/admin/enquiries"),
        ]);

        if (configRes.ok) setSiteConfig(await configRes.json());
        if (projectsRes.ok) setProjects(await projectsRes.json());
        if (enquiriesRes.ok) setEnquiries(await enquiriesRes.json());
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const newEnquiries = enquiries.filter((e) => e.status === "New");

  return (
    <div className="space-y-8">
      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-r from-brand-ink via-slate-900 to-brand-ink-2 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/20 text-brand-primary border border-brand-primary/30 text-xs font-bold mb-3">
            <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
            Website System Active
          </div>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
            {siteConfig?.name || "Joshva Construction"}
          </h2>
          <p className="text-slate-300 text-sm mt-1">
            Head Engineer: <span className="text-white font-semibold">{siteConfig?.engineerName}</span> &bull; {siteConfig?.city}, {siteConfig?.state}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-primary text-brand-ink font-extrabold text-sm hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
            </svg>
            <span>Add New Project</span>
          </Link>
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 text-white font-bold text-sm hover:bg-white/20 border border-white/20 transition-all"
          >
            <svg className="w-4 h-4 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            <span>Preview Site</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Total Projects
            </span>
            <span className="p-2 bg-amber-50 text-amber-600 rounded-xl">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" />
              </svg>
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-brand-ink">{projects.length}</span>
            <span className="text-xs text-slate-400 font-medium">Published in portfolio</span>
          </div>
          <Link
            href="/admin/projects"
            className="mt-4 inline-flex items-center text-xs font-bold text-amber-600 hover:text-amber-700"
          >
            Manage projects &rarr;
          </Link>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              New Enquiries
            </span>
            <span className="p-2 bg-rose-50 text-rose-600 rounded-xl relative">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {newEnquiries.length > 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full animate-ping" />
              )}
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-brand-ink">{newEnquiries.length}</span>
            <span className="text-xs text-slate-400 font-medium">Awaiting follow-up</span>
          </div>
          <Link
            href="/admin/enquiries"
            className="mt-4 inline-flex items-center text-xs font-bold text-amber-600 hover:text-amber-700"
          >
            Open leads inbox &rarr;
          </Link>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Active Services
            </span>
            <span className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
              </svg>
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-brand-ink">
              {siteConfig?.services?.length || 4}
            </span>
            <span className="text-xs text-slate-400 font-medium">Specializations</span>
          </div>
          <Link
            href="/admin/services"
            className="mt-4 inline-flex items-center text-xs font-bold text-amber-600 hover:text-amber-700"
          >
            Modify services &rarr;
          </Link>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Counter Stat Record
            </span>
            <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-brand-ink">
              {siteConfig?.stats?.projectsCompleted?.endValue || 126}
              {siteConfig?.stats?.projectsCompleted?.suffix || "+"}
            </span>
            <span className="text-xs text-slate-400 font-medium">Projects milestone</span>
          </div>
          <Link
            href="/admin/stats"
            className="mt-4 inline-flex items-center text-xs font-bold text-amber-600 hover:text-amber-700"
          >
            Edit counter numbers &rarr;
          </Link>
        </div>
      </div>

      {/* Main split sections: Quick Actions & Recent Enquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left column: Quick Actions & Management */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-extrabold uppercase tracking-tight text-brand-ink">
              Quick Management Tools
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href="/admin/projects/new"
                className="p-4 rounded-2xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 transition-all flex flex-col gap-2 group"
              >
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                </div>
                <div className="font-bold text-xs text-brand-ink">Add Project</div>
                <div className="text-[11px] text-slate-500 leading-tight">Create & publish a new site</div>
              </Link>

              <Link
                href="/admin/site-settings"
                className="p-4 rounded-2xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 transition-all flex flex-col gap-2 group"
              >
                <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <div className="font-bold text-xs text-brand-ink">Site Details</div>
                <div className="text-[11px] text-slate-500 leading-tight">Update phone, WhatsApp & address</div>
              </Link>

              <Link
                href="/admin/media"
                className="p-4 rounded-2xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 transition-all flex flex-col gap-2 group"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="font-bold text-xs text-brand-ink">Media Upload</div>
                <div className="text-[11px] text-slate-500 leading-tight">Upload new photos</div>
              </Link>

              <Link
                href="/admin/backup"
                className="p-4 rounded-2xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50/50 transition-all flex flex-col gap-2 group"
              >
                <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                </div>
                <div className="font-bold text-xs text-brand-ink">Backup Data</div>
                <div className="text-[11px] text-slate-500 leading-tight">Export JSON backup</div>
              </Link>
            </div>
          </div>

          {/* Quick Contact Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-base font-extrabold uppercase tracking-tight text-brand-ink mb-4">
              Live Contact & Location
            </h3>
            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="font-bold text-slate-400">Phone:</span>
                <span className="font-semibold text-brand-ink">{siteConfig?.phone}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="font-bold text-slate-400">WhatsApp:</span>
                <span className="font-semibold text-emerald-600">+{siteConfig?.whatsappNumber}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="font-bold text-slate-400">Email:</span>
                <span className="font-semibold text-brand-ink">{siteConfig?.email}</span>
              </div>
              <div className="flex items-start justify-between">
                <span className="font-bold text-slate-400">Address:</span>
                <span className="font-semibold text-brand-ink text-right max-w-[200px]">
                  {siteConfig?.address}
                </span>
              </div>
            </div>
            <Link
              href="/admin/site-settings"
              className="mt-4 block text-center py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-brand-ink transition-colors"
            >
              Update Contact Details
            </Link>
          </div>
        </div>

        {/* Right column: Recent Leads / Enquiries */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-extrabold uppercase tracking-tight text-brand-ink">
                  Recent Inbound Leads
                </h3>
                <p className="text-xs text-slate-500">
                  Customer enquiries sent through the website form
                </p>
              </div>
              <Link
                href="/admin/enquiries"
                className="text-xs font-bold text-amber-600 hover:text-amber-700"
              >
                View all ({enquiries.length}) &rarr;
              </Link>
            </div>

            {enquiries.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs">
                No customer enquiries received yet.
              </div>
            ) : (
              <div className="space-y-3">
                {enquiries.slice(0, 4).map((enq) => {
                  const cleanPhone = enq.phone.replace(/\D/g, "");
                  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                    `Hello ${enq.name}, thank you for contacting Joshva Construction regarding your enquiry for ${enq.projectType}.`
                  )}`;

                  return (
                    <div
                      key={enq.id}
                      className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-brand-ink">{enq.name}</span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              enq.status === "New"
                                ? "bg-rose-100 text-rose-700"
                                : enq.status === "Contacted"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-emerald-100 text-emerald-700"
                            }`}
                          >
                            {enq.status}
                          </span>
                        </div>
                        <div className="text-xs text-slate-600">
                          <span className="font-medium text-amber-700">{enq.projectType}</span> &bull;{" "}
                          <span>{enq.phone}</span>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-1 italic">
                          &ldquo;{enq.message}&rdquo;
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-colors"
                        >
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                          </svg>
                          <span>WhatsApp</span>
                        </a>
                        <Link
                          href="/admin/enquiries"
                          className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-xs font-bold text-slate-700"
                        >
                          Details
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Recent Projects preview */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm mt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-extrabold uppercase tracking-tight text-brand-ink">
                  Recent Portfolio Projects
                </h3>
                <p className="text-xs text-slate-500">Live projects showcased on the website</p>
              </div>
              <Link
                href="/admin/projects"
                className="text-xs font-bold text-amber-600 hover:text-amber-700"
              >
                Manage all ({projects.length}) &rarr;
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {projects.slice(0, 3).map((p) => (
                <div key={p.slug} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.cover} alt={p.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-brand-ink">{p.title}</div>
                      <div className="text-[11px] text-slate-500">
                        {p.category} &bull; {p.location}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/projects/${p.slug}`}
                      className="px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-700 hover:bg-amber-500/20 text-xs font-bold"
                    >
                      Edit
                    </Link>
                    <Link
                      href={`/projects/${p.slug}`}
                      target="_blank"
                      className="p-1.5 text-slate-400 hover:text-brand-ink rounded-lg"
                      title="View public page"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
