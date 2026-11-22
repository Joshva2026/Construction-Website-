"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { SiteConfig } from "@/data/site";

export default function SiteShell({
  children,
  siteConfig,
}: {
  children: React.ReactNode;
  siteConfig: SiteConfig;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    // In admin routes, do NOT render public website navbar, footer, or floating WhatsApp button
    return <div className="min-h-screen bg-slate-100">{children}</div>;
  }

  return (
    <>
      <Navbar siteConfig={siteConfig} />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer siteConfig={siteConfig} />
      <WhatsAppButton siteConfig={siteConfig} />
    </>
  );
}
