"use client";

import { useEffect, useState, useCallback } from "react";
import { EnquiryRecord } from "@/lib/data-service";
import { useToast } from "@/components/admin/Toast";

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryRecord | null>(null);
  const { showToast } = useToast();

  const fetchEnquiries = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/enquiries");
      if (res.ok) {
        const data = await res.json();
        setEnquiries(data);
      }
    } catch {
      showToast("Failed to fetch enquiries", "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchEnquiries();
  }, [fetchEnquiries]);

  const handleStatusChange = async (id: string, newStatus: EnquiryRecord["status"]) => {
    try {
      const res = await fetch("/api/admin/enquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
        );
        if (selectedEnquiry && selectedEnquiry.id === id) {
          setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
        }
        showToast(`Lead marked as ${newStatus}`, "success");
      }
    } catch {
      showToast("Failed to update status", "error");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this enquiry record?")) return;

    try {
      const res = await fetch(`/api/admin/enquiries?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setEnquiries((prev) => prev.filter((e) => e.id !== id));
        if (selectedEnquiry?.id === id) setSelectedEnquiry(null);
        showToast("Enquiry deleted", "success");
      }
    } catch {
      showToast("Failed to delete enquiry", "error");
    }
  };

  const handleExportCSV = () => {
    if (enquiries.length === 0) {
      showToast("No enquiries to export", "info");
      return;
    }

    const headers = ["ID", "Client Name", "Phone", "Email", "Project Type", "Contact Method", "Status", "Date", "Message"];
    const rows = enquiries.map((e) => [
      e.id,
      `"${e.name.replace(/"/g, '""')}"`,
      `"${e.phone}"`,
      `"${e.email || ""}"`,
      `"${e.projectType}"`,
      `"${e.preferredContact}"`,
      `"${e.status}"`,
      `"${new Date(e.createdAt).toLocaleString()}"`,
      `"${e.message.replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `joshva-construction-leads-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Leads CSV exported!", "success");
  };

  const filteredEnquiries = enquiries.filter((e) => {
    const matchesStatus = filterStatus === "All" || e.status === filterStatus;
    const matchesSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.phone.toLowerCase().includes(search.toLowerCase()) ||
      (e.email && e.email.toLowerCase().includes(search.toLowerCase())) ||
      e.projectType.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-black uppercase tracking-tight text-brand-ink">
            Customer Enquiries & Leads ({enquiries.length})
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Client messages received from the online project quote form
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors"
        >
          <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Export to CSV</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search leads by client name, phone, email, project..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:bg-white"
          />
          <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {["All", "New", "Contacted", "In Progress", "Closed"].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                filterStatus === st
                  ? "bg-brand-ink text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Enquiries List & Selected Details Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-3">
          {loading ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
              <div className="w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="mt-3 text-xs text-slate-500 font-semibold">Loading enquiries...</p>
            </div>
          ) : filteredEnquiries.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
              <p className="text-sm font-bold text-slate-700">No enquiries found</p>
              <p className="text-xs text-slate-500 mt-1">Try adjusting your filters</p>
            </div>
          ) : (
            filteredEnquiries.map((enq) => {
              const isSelected = selectedEnquiry?.id === enq.id;
              const cleanPhone = enq.phone.replace(/\D/g, "");
              const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                `Hello ${enq.name}, Joshva Construction received your enquiry regarding ${enq.projectType}.`
              )}`;

              return (
                <div
                  key={enq.id}
                  onClick={() => setSelectedEnquiry(enq)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer bg-white ${
                    isSelected
                      ? "border-amber-500 ring-2 ring-amber-500/20 shadow-md"
                      : "border-slate-200 hover:border-slate-300 shadow-sm"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-brand-ink">{enq.name}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            enq.status === "New"
                              ? "bg-rose-100 text-rose-700"
                              : enq.status === "Contacted"
                              ? "bg-amber-100 text-amber-700"
                              : enq.status === "In Progress"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-emerald-100 text-emerald-700"
                          }`}
                        >
                          {enq.status}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {enq.phone} {enq.email ? `\u2022 ${enq.email}` : ""}
                      </div>
                    </div>

                    <span className="text-[11px] text-slate-400 font-medium shrink-0">
                      {new Date(enq.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="mt-2.5 text-xs text-amber-800 font-bold bg-amber-50/80 px-2.5 py-1 rounded-md inline-block">
                    {enq.projectType}
                  </div>

                  <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {enq.message}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">
                      Via {enq.preferredContact}
                    </span>

                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[11px] font-bold hover:bg-emerald-700 transition-colors"
                      >
                        WhatsApp
                      </a>
                      <a
                        href={`tel:${cleanPhone}`}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-bold hover:bg-slate-200 transition-colors"
                      >
                        Call
                      </a>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Details Pane */}
        <div className="lg:col-span-5">
          {selectedEnquiry ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm sticky top-28 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Lead Details
                  </span>
                  <h3 className="text-lg font-black text-brand-ink uppercase tracking-tight">
                    {selectedEnquiry.name}
                  </h3>
                </div>
                <button
                  onClick={() => handleDelete(selectedEnquiry.id)}
                  className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg text-xs font-bold"
                  title="Delete lead record"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>

              {/* Status Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Update Lead Status
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(["New", "Contacted", "In Progress", "Closed"] as const).map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => handleStatusChange(selectedEnquiry.id, status)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                        selectedEnquiry.status === status
                          ? "bg-brand-ink text-brand-primary ring-2 ring-amber-400 font-extrabold"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Client Info Info List */}
              <div className="space-y-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="flex justify-between">
                  <span className="font-bold text-slate-400">Phone:</span>
                  <a href={`tel:${selectedEnquiry.phone}`} className="font-bold text-amber-700 underline">
                    {selectedEnquiry.phone}
                  </a>
                </div>
                {selectedEnquiry.email && (
                  <div className="flex justify-between">
                    <span className="font-bold text-slate-400">Email:</span>
                    <a href={`mailto:${selectedEnquiry.email}`} className="font-semibold text-brand-ink underline">
                      {selectedEnquiry.email}
                    </a>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="font-bold text-slate-400">Project Type:</span>
                  <span className="font-bold text-brand-ink">{selectedEnquiry.projectType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-slate-400">Preferred:</span>
                  <span className="font-semibold text-slate-700">{selectedEnquiry.preferredContact}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-slate-400">Received On:</span>
                  <span className="text-slate-600">
                    {new Date(selectedEnquiry.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Client Project Requirements:
                </label>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {selectedEnquiry.message}
                </div>
              </div>

              {/* Direct Actions */}
              <div className="space-y-2">
                <a
                  href={`https://wa.me/${selectedEnquiry.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
                    `Hello ${selectedEnquiry.name}, thank you for contacting Joshva Construction regarding your ${selectedEnquiry.projectType} project.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                >
                  Reply on WhatsApp
                </a>

                {selectedEnquiry.email && (
                  <a
                    href={`mailto:${selectedEnquiry.email}?subject=${encodeURIComponent(
                      `Joshva Construction - Follow up regarding ${selectedEnquiry.projectType}`
                    )}`}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-brand-ink font-bold text-xs transition-colors"
                  >
                    Send Email Reply
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-8 text-center text-slate-400 text-xs">
              Select an enquiry from the list to view complete project requirements, update lead status, and take action.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
