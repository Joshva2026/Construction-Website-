import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-brand-paper">
      <div className="max-w-md w-full text-center bg-white p-8 sm:p-10 rounded-2xl border border-brand-line shadow-sm">
        <div className="w-16 h-16 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-primary">
          404 Error
        </span>
        <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-slate-900">
          Page Not Found
        </h1>
        <p className="mt-3 text-sm text-slate-600 leading-relaxed">
          The requested page or project specification could not be located. It may have been relocated
          or the URL might be incorrect.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center px-5 py-3 rounded-lg text-sm font-bold bg-brand-primary text-brand-ink hover:bg-brand-primary-hover shadow-sm transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/projects"
            className="flex-1 inline-flex items-center justify-center px-5 py-3 rounded-lg text-sm font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
          >
            Browse Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
