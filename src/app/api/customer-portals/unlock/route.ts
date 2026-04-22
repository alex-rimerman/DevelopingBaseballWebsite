import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const COOKIE_NAME = "portal_hub";
const COOKIE_VALUE = "1";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function POST(request: Request) {
  const secret = process.env.PORTAL_HUB_SECRET?.trim();
  if (!secret) {
    return NextResponse.json({ ok: true, message: "No password configured" });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const password =
    typeof body === "object" && body !== null && "password" in body
      ? String((body as { password: unknown }).password ?? "")
      : "";

  if (password !== secret) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const store = await cookies();
  store.set(COOKIE_NAME, COOKIE_VALUE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });

  return NextResponse.json({ ok: true });
}
