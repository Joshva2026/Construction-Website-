import { NextRequest, NextResponse } from "next/server";
import {
  verifyCredentials,
  createSession,
  destroySession,
  verifySession,
  updatePassword,
  SESSION_COOKIE_NAME,
  ensureAuthInitialized,
} from "@/lib/auth-service";

export async function GET(request: NextRequest) {
  const cookie = request.cookies.get(SESSION_COOKIE_NAME);
  const isValid = await verifySession(cookie?.value);
  const auth = await ensureAuthInitialized();

  return NextResponse.json({
    authenticated: isValid,
    username: isValid ? auth.username : null,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password required" }, { status: 400 });
    }

    const isValid = await verifyCredentials(username, password);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
    }

    const session = await createSession();
    const response = NextResponse.json({ success: true, message: "Logged in successfully" });

    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: session.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Failed to process login" }, { status: 500 });
  }
}

export async function DELETE() {
  await destroySession();
  const response = NextResponse.json({ success: true, message: "Logged out successfully" });
  response.cookies.delete(SESSION_COOKIE_NAME);
  return response;
}

export async function PATCH(request: NextRequest) {
  const cookie = request.cookies.get(SESSION_COOKIE_NAME);
  const isValid = await verifySession(cookie?.value);

  if (!isValid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { currentPassword, newPassword, newUsername } = body;

    const auth = await ensureAuthInitialized();
    const isCurrentValid = await verifyCredentials(auth.username, currentPassword);

    if (!isCurrentValid) {
      return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
    }

    if (!newPassword || newPassword.length < 6) {
      return NextResponse.json({ error: "New password must be at least 6 characters" }, { status: 400 });
    }

    await updatePassword(newPassword, newUsername);
    return NextResponse.json({ success: true, message: "Credentials updated successfully" });
  } catch {
    return NextResponse.json({ error: "Failed to update password" }, { status: 500 });
  }
}
