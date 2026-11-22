"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { ToastProvider } from "@/components/admin/Toast";

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  // Automatically close sidebar on route changes
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  useEffect(() => {
    let isMounted = true;

    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/auth");
        const data = await res.json();

        if (!isMounted) return;

        if (data.authenticated) {
          setAuthenticated(true);
          if (isLoginPage) {
            router.push("/admin");
          }
        } else {
          setAuthenticated(false);
          if (!isLoginPage) {
            router.push("/admin/login");
          }
        }
      } catch {
        if (!isLoginPage) {
          router.push("/admin/login");
        }
      } finally {
        if (isMounted) setCheckingAuth(false);
      }
    }

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [pathname, isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-brand-ink flex flex-col items-center justify-center text-white">
        <div className="w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-xs font-bold tracking-wider uppercase text-slate-300">
          Loading Admin Portal...
        </p>
      </div>
    );
  }

  if (!authenticated) {
    return null;
  }

  // Derive title from pathname
  const getPageInfo = () => {
    if (pathname === "/admin") return { title: "Executive Dashboard", subtitle: "Website performance, stats & fast management" };
    if (pathname.startsWith("/admin/projects/new")) return { title: "Create Project", subtitle: "Publish a new milestone to the public portfolio" };
    if (pathname.startsWith("/admin/projects")) return { title: "Portfolio Management", subtitle: "Add, modify, and delete construction projects" };
    if (pathname.startsWith("/admin/services")) return { title: "Civil Services", subtitle: "Manage offered engineering specializations" };
    if (pathname.startsWith("/admin/stats")) return { title: "Key Metrics & Counters", subtitle: "Update animated homepage figures" };
    if (pathname.startsWith("/admin/site-settings")) return { title: "Company & Site Settings", subtitle: "Edit phone, address, Google Maps, and branding" };
    if (pathname.startsWith("/admin/enquiries")) return { title: "Enquiries & Leads", subtitle: "Manage quotes, client details, and WhatsApp responses" };
    if (pathname.startsWith("/admin/media")) return { title: "Media Library", subtitle: "Upload and manage site photos and project blueprints" };
    if (pathname.startsWith("/admin/backup")) return { title: "Data Backup & Restore", subtitle: "Export all website data as JSON or restore from backup" };
    if (pathname.startsWith("/admin/security")) return { title: "Admin Security", subtitle: "Update administrator username and password" };
    return { title: "Admin Portal", subtitle: "Joshva Construction Management" };
  };

  const { title, subtitle } = getPageInfo();

  return (
    <ToastProvider>
      <div className="min-h-screen bg-slate-100 flex flex-col w-full text-slate-800">
        {/* Toggleable Drawer Sidebar */}
        <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

        {/* Full-width Main Viewport */}
        <div className="flex flex-col flex-1 w-full min-w-0">
          <AdminHeader
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            title={title}
            subtitle={subtitle}
          />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">{children}</main>
        </div>
      </div>
    </ToastProvider>
  );
}
