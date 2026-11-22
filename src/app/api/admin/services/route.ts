import { NextRequest, NextResponse } from "next/server";
import { getSiteConfig, updateServices } from "@/lib/data-service";
import { verifySession, SESSION_COOKIE_NAME } from "@/lib/auth-service";

export const dynamic = "force-dynamic";

async function isAuthorized(req: NextRequest) {
  const cookie = req.cookies.get(SESSION_COOKIE_NAME);
  return verifySession(cookie?.value);
}

export async function GET(_req: NextRequest) {
  try {
    const config = await getSiteConfig();
    return NextResponse.json(config.services);
  } catch {
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!(await isAuthorized(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!Array.isArray(body)) {
      return NextResponse.json({ error: "Services must be an array" }, { status: 400 });
    }
    const updated = await updateServices(body);
    return NextResponse.json({ success: true, data: updated });
  } catch {
    return NextResponse.json({ error: "Failed to update services" }, { status: 500 });
  }
}
