import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { verifySession, SESSION_COOKIE_NAME } from "@/lib/auth-service";

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
    await fs.mkdir(UPLOADS_DIR, { recursive: true });

    const files: Array<{ name: string; url: string; size: number; source: "uploads" | "images" }> = [];

    // Scan public/uploads
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
    await fs.mkdir(UPLOADS_DIR, { recursive: true });
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize filename
    const safeName = file.name
      .toLowerCase()
      .replace(/[^a-z0-9._-]/g, "-")
      .replace(/-+/g, "-");
    const uniqueName = `${Date.now()}-${safeName}`;
    const filePath = path.join(UPLOADS_DIR, uniqueName);

    await fs.writeFile(filePath, buffer);

    const publicUrl = `/uploads/${uniqueName}`;
    return NextResponse.json({
      success: true,
      url: publicUrl,
      name: uniqueName,
      size: buffer.length,
    });
  } catch {
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}
