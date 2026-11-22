import fs from "fs/promises";
import path from "path";
import os from "os";
import { siteConfig as defaultSiteConfig, SiteConfig, SiteService, SiteStat } from "@/data/site";
import { projects as defaultProjects, Project } from "@/data/projects";

const BUNDLED_DATA_DIR = path.join(process.cwd(), "src", "data", "store");
const TMP_DATA_DIR = path.join(os.tmpdir(), "joshva-store");

export interface EnquiryRecord {
  id: string;
  name: string;
  phone: string;
  email?: string;
  projectType: string;
  preferredContact: "WhatsApp" | "Phone" | "Email" | string;
  message: string;
  createdAt: string;
  status: "New" | "Contacted" | "In Progress" | "Closed";
  notes?: string;
}

// In-memory cache to guarantee instant reads and serverless survivability
let memorySiteConfig: SiteConfig | null = null;
let memoryProjects: Project[] | null = null;
let memoryEnquiries: EnquiryRecord[] | null = null;

async function safeReadFile<T>(filename: string, fallback: T): Promise<T> {
  // 1. Try reading from writable /tmp first (if modified in serverless session)
  try {
    const tmpPath = path.join(TMP_DATA_DIR, filename);
    const data = await fs.readFile(tmpPath, "utf-8");
    return JSON.parse(data) as T;
  } catch {
    // ignore
  }

  // 2. Try reading from bundled static store
  try {
    const bundledPath = path.join(BUNDLED_DATA_DIR, filename);
    const data = await fs.readFile(bundledPath, "utf-8");
    return JSON.parse(data) as T;
  } catch {
    // ignore
  }

  // 3. Fallback to hardcoded default
  return fallback;
}

async function safeWriteFile(filename: string, data: any): Promise<void> {
  const jsonStr = JSON.stringify(data, null, 2);

  // 1. Try writing to bundled store (works locally in dev and VPS)
  try {
    await fs.mkdir(BUNDLED_DATA_DIR, { recursive: true });
    await fs.writeFile(path.join(BUNDLED_DATA_DIR, filename), jsonStr, "utf-8");
  } catch {
    // Read-only filesystem (expected on Vercel lambda /var/task)
  }

  // 2. Try writing to /tmp (always writable on Vercel / AWS Lambda)
  try {
    await fs.mkdir(TMP_DATA_DIR, { recursive: true });
    await fs.writeFile(path.join(TMP_DATA_DIR, filename), jsonStr, "utf-8");
  } catch {
    // Ignore fallback
  }
}

// ---------------- Site Config Operations ---------------- //

export async function getSiteConfig(): Promise<SiteConfig> {
  if (memorySiteConfig) return memorySiteConfig;
  memorySiteConfig = await safeReadFile<SiteConfig>("site-config.json", defaultSiteConfig);
  return memorySiteConfig;
}

export async function updateSiteConfig(newConfig: Partial<SiteConfig>): Promise<SiteConfig> {
  const current = await getSiteConfig();
  const updated: SiteConfig = {
    ...current,
    ...newConfig,
    stats: {
      ...current.stats,
      ...(newConfig.stats || {}),
    },
  };

  memorySiteConfig = updated;
  await safeWriteFile("site-config.json", updated);
  return updated;
}

// ---------------- Projects Operations ---------------- //

export async function getProjects(): Promise<Project[]> {
  if (memoryProjects) return memoryProjects;
  memoryProjects = await safeReadFile<Project[]>("projects.json", defaultProjects);
  return memoryProjects;
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const all = await getProjects();
  return all.find((p) => p.slug === slug);
}

export async function saveProject(project: Project, originalSlug?: string): Promise<Project> {
  const all = await getProjects();
  const slugToFind = originalSlug || project.slug;
  const index = all.findIndex((p) => p.slug === slugToFind);

  if (index >= 0) {
    all[index] = project;
  } else {
    all.unshift(project);
  }

  memoryProjects = all;
  await safeWriteFile("projects.json", all);
  return project;
}

export async function deleteProject(slug: string): Promise<boolean> {
  const all = await getProjects();
  const filtered = all.filter((p) => p.slug !== slug);
  if (filtered.length === all.length) {
    return false;
  }

  memoryProjects = filtered;
  await safeWriteFile("projects.json", filtered);
  return true;
}

// ---------------- Services Operations ---------------- //

export async function updateServices(services: SiteService[]): Promise<SiteService[]> {
  const config = await getSiteConfig();
  config.services = services;
  await updateSiteConfig(config);
  return services;
}

// ---------------- Stats Operations ---------------- //

export async function updateStats(stats: Record<string, SiteStat>): Promise<Record<string, SiteStat>> {
  const config = await getSiteConfig();
  config.stats = {
    ...config.stats,
    ...stats,
  };
  await updateSiteConfig(config);
  return config.stats;
}

// ---------------- Enquiries Operations ---------------- //

const defaultInitialEnquiries: EnquiryRecord[] = [
  {
    id: "enq-sample-1",
    name: "Ramanathan K.",
    phone: "+91 94431 23456",
    email: "ramanathan.dgl@gmail.com",
    projectType: "Residential Villa (3BHK Duplex)",
    preferredContact: "WhatsApp",
    message: "We have a 2400 sq ft plot near Palani Road. Looking for complete turnkey RCC duplex construction with Vaastu compliance.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    status: "New",
  },
  {
    id: "enq-sample-2",
    name: "S. Murugesan",
    phone: "+91 98422 78910",
    email: "murugesan_builders@yahoo.com",
    projectType: "Commercial Building",
    preferredContact: "Phone Call",
    message: "Need structural consultancy and drawing approval for a G+3 commercial shopping complex near Collectorate.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    status: "Contacted",
    notes: "Called client on Tuesday. Site inspection scheduled.",
  },
];

export async function getEnquiries(): Promise<EnquiryRecord[]> {
  if (memoryEnquiries) return memoryEnquiries;
  memoryEnquiries = await safeReadFile<EnquiryRecord[]>("enquiries.json", defaultInitialEnquiries);
  return memoryEnquiries;
}

export async function addEnquiry(enquiry: Omit<EnquiryRecord, "id" | "createdAt" | "status">): Promise<EnquiryRecord> {
  const all = await getEnquiries();
  const record: EnquiryRecord = {
    ...enquiry,
    id: "enq-" + Date.now().toString(36) + "-" + Math.random().toString(36).substring(2, 6),
    createdAt: new Date().toISOString(),
    status: "New",
  };
  all.unshift(record);

  memoryEnquiries = all;
  await safeWriteFile("enquiries.json", all);
  return record;
}

export async function updateEnquiryStatus(
  id: string,
  status: EnquiryRecord["status"],
  notes?: string
): Promise<EnquiryRecord | null> {
  const all = await getEnquiries();
  const item = all.find((e) => e.id === id);
  if (!item) return null;

  item.status = status;
  if (notes !== undefined) {
    item.notes = notes;
  }

  memoryEnquiries = all;
  await safeWriteFile("enquiries.json", all);
  return item;
}

export async function deleteEnquiry(id: string): Promise<boolean> {
  const all = await getEnquiries();
  const filtered = all.filter((e) => e.id !== id);
  if (filtered.length === all.length) return false;

  memoryEnquiries = filtered;
  await safeWriteFile("enquiries.json", filtered);
  return true;
}

// ---------------- Backup & Restore Operations ---------------- //

export async function exportAllData() {
  const siteConfig = await getSiteConfig();
  const projects = await getProjects();
  const enquiries = await getEnquiries();

  return {
    exportedAt: new Date().toISOString(),
    version: "1.0",
    siteConfig,
    projects,
    enquiries,
  };
}

export async function importAllData(payload: {
  siteConfig?: SiteConfig;
  projects?: Project[];
  enquiries?: EnquiryRecord[];
}) {
  if (payload.siteConfig) {
    memorySiteConfig = payload.siteConfig;
    await safeWriteFile("site-config.json", payload.siteConfig);
  }
  if (payload.projects) {
    memoryProjects = payload.projects;
    await safeWriteFile("projects.json", payload.projects);
  }
  if (payload.enquiries) {
    memoryEnquiries = payload.enquiries;
    await safeWriteFile("enquiries.json", payload.enquiries);
  }
}

export async function resetToDefaults() {
  memorySiteConfig = defaultSiteConfig;
  memoryProjects = defaultProjects;
  memoryEnquiries = defaultInitialEnquiries;

  await safeWriteFile("site-config.json", defaultSiteConfig);
  await safeWriteFile("projects.json", defaultProjects);
  await safeWriteFile("enquiries.json", defaultInitialEnquiries);
}
