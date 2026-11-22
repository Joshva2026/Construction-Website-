import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { siteConfig } from "@/data/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://civilengineeringworks.in"), // Base deployment URL
  title: {
    default: `${siteConfig.name} | Structural Engineering & Construction`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Civil Engineering",
    "Construction Company",
    "Structural Design",
    "Site Supervision",
    "Turnkey Construction",
    "RCC Earthquake Resistant Design",
    "Residential Builder",
    "Commercial Contractor",
  ],
  authors: [{ name: siteConfig.engineerName }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://civilengineeringworks.in",
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Modern Construction & Structural Engineering`,
    description: siteConfig.description,
    images: [
      {
        url: "https://images.unsplash.com/photo-1541888946425-d81bb19940f2?w=1200&q=80",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Construction and Structural Engineering`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Structural Engineering & Construction`,
    description: siteConfig.description,
    images: ["https://images.unsplash.com/photo-1541888946425-d81bb19940f2?w=1200&q=80"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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

        <Navbar />

        <main id="main-content" className="flex-1">
          {children}
        </main>

        <Footer />

        <WhatsAppButton />
      </body>
    </html>
  );
}
