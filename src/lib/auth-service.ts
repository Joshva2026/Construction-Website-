import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

const DATA_DIR = path.join(process.cwd(), "src", "data", "store");
const AUTH_FILE = path.join(DATA_DIR, "admin-auth.json");
export const SESSION_COOKIE_NAME = "joshva_admin_session";

export interface AdminAuthData {
  username: string;
  passwordHash: string;
  salt: string;
  sessionToken: string | null;
  sessionExpires: number | null;
}

// Default credentials: username="admin", password="adminpassword123"
const DEFAULT_USERNAME = "admin";
const DEFAULT_PASSWORD = "adminpassword123";

function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
}

export async function ensureAuthInitialized(): Promise<AdminAuthData> {
  await fs.mkdir(DATA_DIR, { recursive: true });

  try {
    const raw = await fs.readFile(AUTH_FILE, "utf-8");
    return JSON.parse(raw) as AdminAuthData;
  } catch {
    const salt = crypto.randomBytes(16).toString("hex");
    const passwordHash = hashPassword(DEFAULT_PASSWORD, salt);
    const initialAuth: AdminAuthData = {
      username: DEFAULT_USERNAME,
      passwordHash,
      salt,
      sessionToken: null,
      sessionExpires: null,
    };
    await fs.writeFile(AUTH_FILE, JSON.stringify(initialAuth, null, 2), "utf-8");
    return initialAuth;
  }
}

export async function verifyCredentials(username: string, password: string): Promise<boolean> {
  const auth = await ensureAuthInitialized();
  if (auth.username.toLowerCase() !== username.trim().toLowerCase()) {
    return false;
  }
  const testHash = hashPassword(password, auth.salt);
  return testHash === auth.passwordHash;
}

export async function createSession(): Promise<{ token: string; expires: number }> {
  const auth = await ensureAuthInitialized();
  const token = crypto.randomBytes(32).toString("hex");
  const expires = Date.now() + 1000 * 60 * 60 * 24 * 7; // 7 days

  auth.sessionToken = token;
  auth.sessionExpires = expires;

  await fs.writeFile(AUTH_FILE, JSON.stringify(auth, null, 2), "utf-8");
  return { token, expires };
}

export async function verifySession(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const auth = await ensureAuthInitialized();
  if (!auth.sessionToken || !auth.sessionExpires) return false;
  if (Date.now() > auth.sessionExpires) return false;
  return auth.sessionToken === token;
}

export async function destroySession(): Promise<void> {
  const auth = await ensureAuthInitialized();
  auth.sessionToken = null;
  auth.sessionExpires = null;
  await fs.writeFile(AUTH_FILE, JSON.stringify(auth, null, 2), "utf-8");
}

export async function updatePassword(newPassword: string, newUsername?: string): Promise<void> {
  const auth = await ensureAuthInitialized();
  const salt = crypto.randomBytes(16).toString("hex");
  auth.passwordHash = hashPassword(newPassword, salt);
  auth.salt = salt;
  if (newUsername && newUsername.trim()) {
    auth.username = newUsername.trim();
  }
  await fs.writeFile(AUTH_FILE, JSON.stringify(auth, null, 2), "utf-8");
}
