import { NextRequest, NextResponse } from "next/server";
import { getProjects, saveProject } from "@/lib/data-service";
import { verifySession, SESSION_COOKIE_NAME } from "@/lib/auth-service";
import { Project } from "@/data/projects";

export const dynamic = "force-dynamic";

async function isAuthorized(req: NextRequest) {
  const cookie = req.cookies.get(SESSION_COOKIE_NAME);
  return verifySession(cookie?.value);
}

export async function GET(_req: NextRequest) {
  try {
    const projects = await getProjects();
    return NextResponse.json(projects);
  } catch {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!(await isAuthorized(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const project = (await req.json()) as Project;
    if (!project.title || !project.slug) {
      return NextResponse.json({ error: "Title and slug are required" }, { status: 400 });
    }

    const saved = await saveProject(project);
    return NextResponse.json({ success: true, data: saved }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
