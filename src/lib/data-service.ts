import fs from "fs/promises";
import path from "path";
import os from "os";
import { siteConfig as defaultSiteConfig, SiteConfig, SiteService, SiteStat } from "@/data/site";
import { projects as defaultProjects, Project } from "@/data/projects";

/*
 * STORAGE
 *
 * 1. Production (Vercel): set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN
 *    (or KV_REST_API_URL / KV_REST_API_TOKEN from Vercel KV). All admin changes are
 *    stored in that shared database, so every visitor sees the same data.
 * 2. Local development / own server: no variables needed. Data is read from and
 *    written to src/data/store/*.json.
 *
 * Without a shared database on Vercel, the filesystem is read-only and each
 * serverless instance has its own /tmp, so admin changes cannot reach visitors.
 * In that case writes now fail with a clear error instead of silently disappearing.
 */

const BUNDLED_DATA_DIR = path.join(process.cwd(), "src", "data", "store");
const TMP_DATA_DIR = path.join(os.tmpdir(), "joshva-store");

const KV_URL = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || "";
const KV_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN || "";
const KV_ENABLED = Boolean(KV_URL && KV_TOKEN);
const ON_VERCEL = Boolean(process.env.VERCEL);

export const STORAGE_WARNING =
  "Storage is not configured. Add UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in the Vercel project settings, then redeploy.";

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

/* ---------------- Low-level storage ---------------- */

const KEYS = {
  siteConfig: "site-config.json",
  projects: "projects.json",
  enquiries: "enquiries.json",
} as const;

async function kvRead<T>(key: string): Promise<T | null> {
  const res = await fetch(`${KV_URL}/get/${encodeURIComponent(key)}`, {
    headers: { Authorization: `Bearer ${KV_TOKEN}` },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Storage read failed (${res.status})`);
  const body = (await res.json()) as { result: string | null };
  return body.result ? (JSON.parse(body.result) as T) : null;
}

async function kvWrite(key: string, data: unknown): Promise<void> {
  const res = await fetch(KV_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${KV_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(["SET", key, JSON.stringify(data)]),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Storage write failed (${res.status})`);
}

async function readFileStore<T>(filename: string): Promise<T | null> {
  // Prefer the writable /tmp copy (set by a previous write in this environment)
  try {
    return JSON.parse(await fs.readFile(path.join(TMP_DATA_DIR, filename), "utf-8")) as T;
  } catch { /* not there */ }
  try {
    return JSON.parse(await fs.readFile(path.join(BUNDLED_DATA_DIR, filename), "utf-8")) as T;
  } catch { /* not there */ }
  return null;
}

async function writeFileStore(filename: string, data: unknown): Promise<void> {
  const jsonStr = JSON.stringify(data, null, 2);
  let saved = false;
  try {
    await fs.mkdir(BUNDLED_DATA_DIR, { recursive: true });
    await fs.writeFile(path.join(BUNDLED_DATA_DIR, filename), jsonStr, "utf-8");
    saved = true;
  } catch { /* read-only filesystem */ }
  try {
    await fs.mkdir(TMP_DATA_DIR, { recursive: true });
    await fs.writeFile(path.join(TMP_DATA_DIR, filename), jsonStr, "utf-8");
    saved = true;
  } catch { /* ignore */ }
  if (!saved) throw new Error("Could not save data to disk.");
}

/** Read a store document: shared database when configured, otherwise files, otherwise defaults. */
async function readStore<T>(key: string, fallback: T): Promise<T> {
  if (KV_ENABLED) {
    const value = await kvRead<T>(key);
    return value ?? fallback;
  }
  const value = await readFileStore<T>(key);
  return value ?? fallback;
}

/** Write a store document. Throws if nothing durable is available. */
async function writeStore(key: string, data: unknown): Promise<void> {
  if (KV_ENABLED) {
    await kvWrite(key, data);
    return;
  }
  if (ON_VERCEL) throw new Error(STORAGE_WARNING);
  await writeFileStore(key, data);
}

/* ---------------- Site Config Operations ---------------- */

export async function getSiteConfig(): Promise<SiteConfig> {
  return readStore<SiteConfig>(KEYS.siteConfig, defaultSiteConfig);
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
  await writeStore(KEYS.siteConfig, updated);
  return updated;
}

/* ---------------- Projects Operations ---------------- */

export async function getProjects(): Promise<Project[]> {
  return readStore<Project[]>(KEYS.projects, defaultProjects);
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

  await writeStore(KEYS.projects, all);
  return project;
}

export async function deleteProject(slug: string): Promise<boolean> {
  const all = await getProjects();
  const filtered = all.filter((p) => p.slug !== slug);
  if (filtered.length === all.length) {
    return false;
  }
  await writeStore(KEYS.projects, filtered);
  return true;
}

/* ---------------- Services Operations ---------------- */

export async function updateServices(services: SiteService[]): Promise<SiteService[]> {
  const config = await getSiteConfig();
  config.services = services;
  await updateSiteConfig(config);
  return services;
}

/* ---------------- Stats Operations ---------------- */

export async function updateStats(stats: Record<string, SiteStat>): Promise<Record<string, SiteStat>> {
  const config = await getSiteConfig();
  config.stats = {
    ...config.stats,
    ...stats,
  };
  await updateSiteConfig(config);
  return config.stats;
}

/* ---------------- Enquiries Operations ---------------- */

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
  return readStore<EnquiryRecord[]>(KEYS.enquiries, defaultInitialEnquiries);
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
  await writeStore(KEYS.enquiries, all);
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
  await writeStore(KEYS.enquiries, all);
  return item;
}

export async function deleteEnquiry(id: string): Promise<boolean> {
  const all = await getEnquiries();
  const filtered = all.filter((e) => e.id !== id);
  if (filtered.length === all.length) return false;
  await writeStore(KEYS.enquiries, filtered);
  return true;
}

/* ---------------- Backup & Restore Operations ---------------- */

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
  if (payload.siteConfig) await writeStore(KEYS.siteConfig, payload.siteConfig);
  if (payload.projects) await writeStore(KEYS.projects, payload.projects);
  if (payload.enquiries) await writeStore(KEYS.enquiries, payload.enquiries);
}

export async function resetToDefaults() {
  await writeStore(KEYS.siteConfig, defaultSiteConfig);
  await writeStore(KEYS.projects, defaultProjects);
  await writeStore(KEYS.enquiries, defaultInitialEnquiries);
}
