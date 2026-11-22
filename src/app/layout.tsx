import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SiteShell from "@/components/SiteShell";
import { siteConfig } from "@/data/site";
import { getSiteConfig } from "@/lib/data-service";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://joshvaconstruction.com"),
  title: {
    default: `${siteConfig.name} | Structural Engineering & Construction - Dindigul, Tamil Nadu`,
    template: `%s | ${siteConfig.name}`,
  },
  description: `${siteConfig.name} - Turnkey Civil Construction, Structural Planning, and Building Contractors based in Dindigul, Tamil Nadu. Directed by ${siteConfig.engineerName}. 126+ Delivered Projects.`,
  keywords: [
    "Joshva Construction",
    "Construction company in Dindigul",
    "Civil engineer Dindigul",
    "Builders in Dindigul",
    "Tamil Nadu construction company",
    "Turnkey construction contractor",
    "Duplex house construction Dindigul",
    "Structural design Tamil Nadu",
    "Commercial building contractors Dindigul",
  ],
  authors: [{ name: siteConfig.engineerName }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://joshvaconstruction.com",
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Dindigul, Tamil Nadu`,
    description: siteConfig.description,
    images: [
      {
        url: "https://images.unsplash.com/photo-1541888946425-d81bb19940f2?w=1200&auto=format&fit=crop&q=80",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Construction in Dindigul, Tamil Nadu`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Dindigul, Tamil Nadu`,
    description: siteConfig.description,
    images: ["https://images.unsplash.com/photo-1541888946425-d81bb19940f2?w=1200&auto=format&fit=crop&q=80"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const liveConfig = await getSiteConfig();

  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col font-sans text-slate-800 antialiased bg-brand-paper">
        {/* Skip to Content Link for Keyboard Accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-primary focus:text-brand-ink focus:font-bold focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-ink"
        >
          Skip to main content
        </a>

        <SiteShell siteConfig={liveConfig}>{children}</SiteShell>
      </body>
    </html>
  );
}
