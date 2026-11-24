import { NextRequest, NextResponse } from "next/server";
import { getSiteConfig, updateSiteConfig } from "@/lib/data-service";
import { verifySession, SESSION_COOKIE_NAME } from "@/lib/auth-service";

export const dynamic = "force-dynamic";

async function isAuthorized(req: NextRequest) {
  const cookie = req.cookies.get(SESSION_COOKIE_NAME);
  return verifySession(cookie?.value);
}

export async function GET(_req: NextRequest) {
  try {
    const config = await getSiteConfig();
    return NextResponse.json(config);
  } catch {
    return NextResponse.json({ error: "Failed to fetch site config" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!(await isAuthorized(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const updated = await updateSiteConfig(body);
    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[site-config] save failed:", message);
    return NextResponse.json(
      { error: `Failed to update site config: ${message}` },
      { status: 500 }
    );
  }
}
