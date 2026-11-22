import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { verifySession, SESSION_COOKIE_NAME } from "@/lib/auth-service";

export const dynamic = "force-dynamic";

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");
const IMAGES_DIR = path.join(process.cwd(), "public", "images");

async function isAuthorized(req: NextRequest) {
  const cookie = req.cookies.get(SESSION_COOKIE_NAME);
  return verifySession(cookie?.value);
}

export async function GET(req: NextRequest) {
  if (!(await isAuthorized(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const files: Array<{ name: string; url: string; size: number; source: "uploads" | "images" }> = [];

    // Scan public/uploads if exists
    try {
      const uploadFiles = await fs.readdir(UPLOADS_DIR);
      for (const file of uploadFiles) {
        if (/\.(jpe?g|png|webp|svg|gif)$/i.test(file)) {
          const stats = await fs.stat(path.join(UPLOADS_DIR, file));
          files.push({
            name: file,
            url: `/uploads/${file}`,
            size: stats.size,
            source: "uploads",
          });
        }
      }
    } catch {
      // ignore
    }

    // Scan public/images
    try {
      const imgFiles = await fs.readdir(IMAGES_DIR);
      for (const file of imgFiles) {
        if (/\.(jpe?g|png|webp|svg|gif)$/i.test(file)) {
          const stats = await fs.stat(path.join(IMAGES_DIR, file));
          files.push({
            name: file,
            url: `/images/${file}`,
            size: stats.size,
            source: "images",
          });
        }
      }
    } catch {
      // ignore
    }

    return NextResponse.json(files);
  } catch {
    return NextResponse.json({ error: "Failed to list media files" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!(await isAuthorized(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const safeName = file.name
      .toLowerCase()
      .replace(/[^a-z0-9._-]/g, "-")
      .replace(/-+/g, "-");
    const uniqueName = `${Date.now()}-${safeName}`;

    // Try saving to disk if public/uploads is writable
    try {
      await fs.mkdir(UPLOADS_DIR, { recursive: true });
      const filePath = path.join(UPLOADS_DIR, uniqueName);
      await fs.writeFile(filePath, buffer);

      return NextResponse.json({
        success: true,
        url: `/uploads/${uniqueName}`,
        name: uniqueName,
        size: buffer.length,
      });
    } catch {
      // Fallback for serverless environments (read-only filesystem on Vercel)
      const mimeType = file.type || "image/jpeg";
      const base64Data = buffer.toString("base64");
      const dataUri = `data:${mimeType};base64,${base64Data}`;

      return NextResponse.json({
        success: true,
        url: dataUri,
        name: uniqueName,
        size: buffer.length,
      });
    }
  } catch (err: any) {
    return NextResponse.json(
      { error: "Failed to upload file: " + (err?.message || "Unknown error") },
      { status: 500 }
    );
  }
}
