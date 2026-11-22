import { NextRequest, NextResponse } from "next/server";
import { exportAllData, importAllData, resetToDefaults } from "@/lib/data-service";
import { verifySession, SESSION_COOKIE_NAME } from "@/lib/auth-service";

async function isAuthorized(req: NextRequest) {
  const cookie = req.cookies.get(SESSION_COOKIE_NAME);
  return verifySession(cookie?.value);
}

// GET: Download full backup JSON
export async function GET(req: NextRequest) {
  if (!(await isAuthorized(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await exportAllData();
    return new NextResponse(JSON.stringify(data, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="joshva-construction-backup-${new Date().toISOString().slice(0, 10)}.json"`,
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed to export data" }, { status: 500 });
  }
}

// POST: Restore from backup JSON
export async function POST(req: NextRequest) {
  if (!(await isAuthorized(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = await req.json();
    await importAllData(payload);
    return NextResponse.json({ success: true, message: "Data restored successfully" });
  } catch {
    return NextResponse.json({ error: "Failed to restore data" }, { status: 500 });
  }
}

// PUT: Reset to default factory data
export async function PUT(req: NextRequest) {
  if (!(await isAuthorized(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await resetToDefaults();
    return NextResponse.json({ success: true, message: "Reset to default demo data completed" });
  } catch {
    return NextResponse.json({ error: "Failed to reset data" }, { status: 500 });
  }
}
