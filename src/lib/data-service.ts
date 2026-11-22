import fs from "fs/promises";
import path from "path";
import { siteConfig as defaultSiteConfig, SiteConfig, SiteService, SiteStat } from "@/data/site";
import { projects as defaultProjects, Project } from "@/data/projects";

const DATA_DIR = path.join(process.cwd(), "src", "data", "store");
const SITE_CONFIG_FILE = path.join(DATA_DIR, "site-config.json");
const PROJECTS_FILE = path.join(DATA_DIR, "projects.json");
const ENQUIRIES_FILE = path.join(DATA_DIR, "enquiries.json");

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

async function ensureDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

// ---------------- Site Config Operations ---------------- //

export async function getSiteConfig(): Promise<SiteConfig> {
  await ensureDir();
  try {
    const raw = await fs.readFile(SITE_CONFIG_FILE, "utf-8");
    return JSON.parse(raw) as SiteConfig;
  } catch {
    // If not found, write default siteConfig and return it
    await fs.writeFile(SITE_CONFIG_FILE, JSON.stringify(defaultSiteConfig, null, 2), "utf-8");
    return defaultSiteConfig;
  }
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
  await ensureDir();
  await fs.writeFile(SITE_CONFIG_FILE, JSON.stringify(updated, null, 2), "utf-8");
  return updated;
}

// ---------------- Projects Operations ---------------- //

export async function getProjects(): Promise<Project[]> {
  await ensureDir();
  try {
    const raw = await fs.readFile(PROJECTS_FILE, "utf-8");
    return JSON.parse(raw) as Project[];
  } catch {
    // If not found, write default projects and return them
    await fs.writeFile(PROJECTS_FILE, JSON.stringify(defaultProjects, null, 2), "utf-8");
    return defaultProjects;
  }
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
    // Add to beginning of array so newest appears first
    all.unshift(project);
  }

  await ensureDir();
  await fs.writeFile(PROJECTS_FILE, JSON.stringify(all, null, 2), "utf-8");
  return project;
}

export async function deleteProject(slug: string): Promise<boolean> {
  const all = await getProjects();
  const filtered = all.filter((p) => p.slug !== slug);
  if (filtered.length === all.length) {
    return false;
  }
  await ensureDir();
  await fs.writeFile(PROJECTS_FILE, JSON.stringify(filtered, null, 2), "utf-8");
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

export async function getEnquiries(): Promise<EnquiryRecord[]> {
  await ensureDir();
  try {
    const raw = await fs.readFile(ENQUIRIES_FILE, "utf-8");
    return JSON.parse(raw) as EnquiryRecord[];
  } catch {
    const initialEnquiries: EnquiryRecord[] = [
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
    await fs.writeFile(ENQUIRIES_FILE, JSON.stringify(initialEnquiries, null, 2), "utf-8");
    return initialEnquiries;
  }
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
  await ensureDir();
  await fs.writeFile(ENQUIRIES_FILE, JSON.stringify(all, null, 2), "utf-8");
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

  await ensureDir();
  await fs.writeFile(ENQUIRIES_FILE, JSON.stringify(all, null, 2), "utf-8");
  return item;
}

export async function deleteEnquiry(id: string): Promise<boolean> {
  const all = await getEnquiries();
  const filtered = all.filter((e) => e.id !== id);
  if (filtered.length === all.length) return false;
  await ensureDir();
  await fs.writeFile(ENQUIRIES_FILE, JSON.stringify(filtered, null, 2), "utf-8");
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
  await ensureDir();
  if (payload.siteConfig) {
    await fs.writeFile(SITE_CONFIG_FILE, JSON.stringify(payload.siteConfig, null, 2), "utf-8");
  }
  if (payload.projects) {
    await fs.writeFile(PROJECTS_FILE, JSON.stringify(payload.projects, null, 2), "utf-8");
  }
  if (payload.enquiries) {
    await fs.writeFile(ENQUIRIES_FILE, JSON.stringify(payload.enquiries, null, 2), "utf-8");
  }
}

export async function resetToDefaults() {
  await ensureDir();
  await fs.writeFile(SITE_CONFIG_FILE, JSON.stringify(defaultSiteConfig, null, 2), "utf-8");
  await fs.writeFile(PROJECTS_FILE, JSON.stringify(defaultProjects, null, 2), "utf-8");
}
