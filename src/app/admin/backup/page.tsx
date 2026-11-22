"use client";

import { useState } from "react";
import { useToast } from "@/components/admin/Toast";

export default function AdminBackupPage() {
  const [restoring, setRestoring] = useState(false);
  const [resetting, setResetting] = useState(false);
  const { showToast } = useToast();

  const handleDownloadBackup = () => {
    window.location.href = "/api/admin/backup";
    showToast("Downloading complete website backup JSON...", "info");
  };

  const handleRestoreFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!confirm("Are you sure you want to restore data from this file? Existing site settings and projects will be updated.")) {
      e.target.value = "";
      return;
    }

    setRestoring(true);
    try {
      const text = await file.text();
      const payload = JSON.parse(text);

      const res = await fetch("/api/admin/backup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        showToast("Website data restored successfully!", "success");
      } else {
        const err = await res.json();
        showToast(err.error || "Failed to restore data", "error");
      }
    } catch {
      showToast("Invalid JSON file or parse error", "error");
    } finally {
      setRestoring(false);
      e.target.value = "";
    }
  };

  const handleResetDefaults = async () => {
    const confirmed = prompt(
      "WARNING: This will reset all projects and site configurations back to factory defaults.\nType 'RESET' to confirm:"
    );

    if (confirmed !== "RESET") {
      if (confirmed !== null) showToast("Reset cancelled. Confirmation did not match.", "info");
      return;
    }

    setResetting(true);
    try {
      const res = await fetch("/api/admin/backup", {
        method: "PUT",
      });

      if (res.ok) {
        showToast("Website reset to factory defaults successfully!", "success");
      } else {
        const err = await res.json();
        showToast(err.error || "Failed to reset data", "error");
      }
    } catch {
      showToast("Network error during reset", "error");
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <h2 className="text-xl font-black uppercase tracking-tight text-brand-ink">
          Data Backup, Export & Disaster Recovery
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Safeguard your website contents, projects, services, and enquiries with full JSON exports
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Export / Download Backup */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>
            <h3 className="font-extrabold text-base text-brand-ink uppercase tracking-tight">
              1. Download Full Backup
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Export all projects, civil engineering services, stats, company info, and customer leads into a single JSON backup file.
            </p>
          </div>

          <button
            onClick={handleDownloadBackup}
            className="w-full py-3 px-4 rounded-xl bg-brand-primary text-brand-ink font-extrabold text-xs uppercase tracking-wider hover:bg-amber-400 transition-all shadow-md shadow-amber-500/20"
          >
            Export Backup (JSON)
          </button>
        </div>

        {/* Restore Backup */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </div>
            <h3 className="font-extrabold text-base text-brand-ink uppercase tracking-tight">
              2. Restore from File
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Upload a previously exported backup file to restore website content, projects, or settings instantly.
            </p>
          </div>

          <div>
            <label className="w-full flex items-center justify-center py-3 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs uppercase tracking-wider cursor-pointer transition-colors">
              <span>{restoring ? "Restoring Data..." : "Choose Backup File"}</span>
              <input
                type="file"
                accept=".json,application/json"
                disabled={restoring}
                onChange={handleRestoreFile}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Reset to Factory Defaults */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-600 flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="font-extrabold text-base text-rose-600 uppercase tracking-tight">
              3. Factory Reset
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Reset all site content back to initial default configuration and original demo projects. Use with caution.
            </p>
          </div>

          <button
            onClick={handleResetDefaults}
            disabled={resetting}
            className="w-full py-3 px-4 rounded-xl bg-rose-50 text-rose-600 border border-rose-200 font-extrabold text-xs uppercase tracking-wider hover:bg-rose-100 transition-colors disabled:opacity-50"
          >
            {resetting ? "Resetting..." : "Reset to Defaults"}
          </button>
        </div>
      </div>
    </div>
  );
}
