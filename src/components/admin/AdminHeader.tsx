"use client";

import Link from "next/link";

interface AdminHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  title: string;
  subtitle?: string;
}

export default function AdminHeader({
  sidebarOpen,
  setSidebarOpen,
  title,
  subtitle,
}: AdminHeaderProps) {
  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    window.location.href = "/admin/login";
  };

  return (
    <header className="h-16 sm:h-20 bg-white border-b border-slate-200 sticky top-0 z-30 flex items-center justify-between px-4 sm:px-8 shadow-sm">
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Three-line Hamburger Menu Button - Always accessible to open/close sidebar */}
        <button
          type="button"
          onClick={() => setSidebarOpen((prev) => !prev)}
          className={`flex items-center justify-center p-2.5 rounded-xl border transition-all duration-200 shadow-sm ${
            sidebarOpen
              ? "bg-brand-primary text-brand-ink border-amber-400"
              : "bg-slate-100 hover:bg-brand-primary text-slate-700 hover:text-brand-ink border-slate-200"
          }`}
          aria-label="Toggle navigation sidebar"
          title="Toggle navigation sidebar (3 lines)"
        >
          <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <div>
          <h1 className="text-base sm:text-xl font-black text-brand-ink uppercase tracking-tight line-clamp-1">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[11px] sm:text-xs text-slate-500 font-medium hidden sm:block">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2.5 sm:gap-4">
        {/* View Live Website Button */}
        <Link
          href="/"
          target="_blank"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-bold text-brand-ink bg-slate-100 hover:bg-brand-primary hover:text-brand-ink transition-all border border-slate-200"
        >
          <svg className="w-3.5 h-3.5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
          <span className="hidden sm:inline">Live Website</span>
          <span className="sm:hidden">Site</span>
        </Link>

        <div className="h-6 w-px bg-slate-200" />

        {/* Admin Avatar & Sign Out */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-brand-ink text-brand-primary font-black flex items-center justify-center text-xs shadow-inner">
            AD
          </div>
          <button
            onClick={handleLogout}
            title="Sign out of Admin"
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
