"use client";

import { useEffect, useState, useCallback } from "react";
import { useToast } from "@/components/admin/Toast";

interface MediaFile {
  name: string;
  url: string;
  size: number;
  source: "uploads" | "images";
}

export default function AdminMediaPage() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const { showToast } = useToast();

  const fetchMedia = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/media");
      if (res.ok) {
        const data = await res.json();
        setFiles(data);
      }
    } catch {
      showToast("Failed to load media files", "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        showToast("Image uploaded successfully!", "success");
        fetchMedia();
      } else {
        const err = await res.json();
        showToast(err.error || "Failed to upload image", "error");
      }
    } catch {
      showToast("Network error during file upload", "error");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    showToast(`Copied path: ${url}`, "info");
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-black uppercase tracking-tight text-brand-ink">
            Media & Image Library ({files.length})
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Upload construction site photos, blueprints, and elevations to use anywhere on the website
          </p>
        </div>

        <div>
          <label className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-primary text-brand-ink font-extrabold text-sm hover:bg-amber-400 transition-all shadow-md shadow-amber-500/20 cursor-pointer">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            <span>{uploading ? "Uploading..." : "Upload New Image"}</span>
            <input
              type="file"
              accept="image/*"
              disabled={uploading}
              onChange={handleUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
          <div className="w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-3 text-xs text-slate-500 font-semibold">Loading media...</p>
        </div>
      ) : files.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
          <p className="text-sm font-bold text-slate-700">No media uploaded yet</p>
          <p className="text-xs text-slate-500 mt-1">Upload your first image using the button above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {files.map((file) => (
            <div
              key={file.url}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group"
            >
              <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={file.url}
                  alt={file.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span
                  className={`absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-bold ${
                    file.source === "uploads"
                      ? "bg-amber-500 text-brand-ink"
                      : "bg-slate-800 text-white"
                  }`}
                >
                  {file.source}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-xs text-brand-ink truncate" title={file.name}>
                    {file.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {formatFileSize(file.size)}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono text-slate-400 truncate max-w-[120px]">
                    {file.url}
                  </span>
                  <button
                    onClick={() => copyToClipboard(file.url)}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-brand-primary hover:text-brand-ink text-slate-700 text-xs font-bold transition-colors shrink-0"
                    title="Copy path to use in projects or services"
                  >
                    Copy Path
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
