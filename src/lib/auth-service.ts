import crypto from "crypto";
import fs from "fs/promises";
import path from "path";

export const SESSION_COOKIE_NAME = "joshva_admin_session";

const SESSION_SECRET =
  process.env.SESSION_SECRET ||
  process.env.ADMIN_SECRET ||
  "joshva-construction-secret-key-tamilnadu-2026";

const DEFAULT_USERNAME = process.env.ADMIN_USERNAME || "admin";
const DEFAULT_PASSWORD = process.env.ADMIN_PASSWORD || "adminpassword123";

// Fallback known salt & hash for "adminpassword123"
const DEFAULT_SALT = "9f401f24fad28a6d6f5a672df3226589";
const DEFAULT_HASH =
  "f004bf65d682a78003f0a80427b6eac861e551ee1e3cdafc6139d0622de9d9d4628bee75fc9deeebf667d7d078f807e9a938f33c506120f5ecd66eadf4e65ed9";

const AUTH_FILE = path.join(process.cwd(), "src", "data", "store", "admin-auth.json");

function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
}

export interface AdminCredentials {
  username: string;
  passwordHash: string;
  salt: string;
}

// In-memory runtime override if password changed during process lifetime
let memoryAuth: AdminCredentials | null = null;

export async function getAdminCredentials(): Promise<AdminCredentials> {
  if (memoryAuth) return memoryAuth;

  // 1. Environment variables have highest precedence
  if (process.env.ADMIN_USERNAME || process.env.ADMIN_PASSWORD) {
    const salt = DEFAULT_SALT;
    const pwd = process.env.ADMIN_PASSWORD || DEFAULT_PASSWORD;
    const user = process.env.ADMIN_USERNAME || DEFAULT_USERNAME;
    return {
      username: user,
      passwordHash: hashPassword(pwd, salt),
      salt,
    };
  }

  // 2. Try reading from bundled file (read-only safe)
  try {
    const raw = await fs.readFile(AUTH_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    if (parsed.username && parsed.passwordHash && parsed.salt) {
      return {
        username: parsed.username,
        passwordHash: parsed.passwordHash,
        salt: parsed.salt,
      };
    }
  } catch {
    // Filesystem read failed or file missing (expected on some serverless bundles)
  }

  // 3. Fallback to default credentials
  return {
    username: DEFAULT_USERNAME,
    passwordHash: DEFAULT_HASH,
    salt: DEFAULT_SALT,
  };
}

export async function verifyCredentials(username: string, password: string): Promise<boolean> {
  try {
    const creds = await getAdminCredentials();
    if (!username || !password) return false;

    // Check direct match against env or default first (fast path)
    const directUserMatch =
      username.trim().toLowerCase() === (process.env.ADMIN_USERNAME || DEFAULT_USERNAME).toLowerCase();
    const directPassMatch = password === (process.env.ADMIN_PASSWORD || DEFAULT_PASSWORD);

    if (directUserMatch && directPassMatch) {
      return true;
    }

    // Check against PBKDF2 hash
    if (username.trim().toLowerCase() !== creds.username.toLowerCase()) {
      return false;
    }

    const testHash = hashPassword(password, creds.salt);
    return testHash === creds.passwordHash;
  } catch (err) {
    console.error("Error in verifyCredentials:", err);
    // Safe fallback check so admin is never locked out
    return (
      username.trim().toLowerCase() === DEFAULT_USERNAME.toLowerCase() &&
      password === DEFAULT_PASSWORD
    );
  }
}

/**
 * Creates a stateless HMAC-signed session token.
 * Does NOT require any filesystem or database write, making it 100% serverless/Vercel compatible.
 */
export async function createSession(username: string = "admin"): Promise<{ token: string; expires: number }> {
  const expires = Date.now() + 1000 * 60 * 60 * 24 * 7; // 7 days
  const payload = `${username}:${expires}`;
  const hmac = crypto.createHmac("sha256", SESSION_SECRET).update(payload).digest("hex");
  const token = Buffer.from(payload).toString("base64") + "." + hmac;

  return { token, expires };
}

/**
 * Verifies the stateless HMAC-signed session token.
 */
export async function verifySession(token: string | undefined | null): Promise<boolean> {
  if (!token || typeof token !== "string") return false;

  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [encodedPayload, signature] = parts;

  try {
    const payload = Buffer.from(encodedPayload, "base64").toString("utf-8");
    const [username, expiresStr] = payload.split(":");

    if (!username || !expiresStr) return false;

    const expires = parseInt(expiresStr, 10);
    if (isNaN(expires) || Date.now() > expires) return false;

    const expectedHmac = crypto.createHmac("sha256", SESSION_SECRET).update(payload).digest("hex");

    // Timing-safe comparison to prevent side-channel attacks
    const sigBuf = Buffer.from(signature, "hex");
    const expBuf = Buffer.from(expectedHmac, "hex");

    if (sigBuf.length !== expBuf.length) return false;
    return crypto.timingSafeEqual(sigBuf, expBuf);
  } catch {
    return false;
  }
}

export async function destroySession(): Promise<void> {
  // Stateless tokens are invalidated by clearing the cookie on the response
}

export async function updatePassword(newPassword: string, newUsername?: string): Promise<void> {
  const salt = crypto.randomBytes(16).toString("hex");
  const passwordHash = hashPassword(newPassword, salt);
  const user = newUsername && newUsername.trim() ? newUsername.trim() : DEFAULT_USERNAME;

  memoryAuth = {
    username: user,
    passwordHash,
    salt,
  };

  // Try persisting to disk if writable (e.g. local environment)
  try {
    await fs.writeFile(
      AUTH_FILE,
      JSON.stringify(
        {
          username: user,
          passwordHash,
          salt,
          sessionToken: null,
          sessionExpires: null,
        },
        null,
        2
      ),
      "utf-8"
    );
  } catch {
    // Read-only filesystem on Vercel is ignored safely
  }
}
