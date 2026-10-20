import { NextRequest, NextResponse } from "next/server";
import { backend, configured } from "@/lib/store-backend";

export async function POST(request: NextRequest, { params }: { params: Promise<{ action: string }> }) {
  const { action } = await params;
  if (!configured) return NextResponse.json({ error: "Set Supabase environment variables first" }, { status: 503 });
  if (action === "logout") {
    const res = NextResponse.json({ ok: true });
    res.cookies.delete("ss_access"); res.cookies.delete("ss_refresh");
    return res;
  }
  if (!["login", "register"].includes(action)) return NextResponse.json({ error: "Invalid action" }, { status: 404 });
  const body = await request.json().catch(() => ({}));
  if (typeof body.email !== "string" || typeof body.password !== "string" || body.password.length < 8)
    return NextResponse.json({ error: "Use a valid email and password of at least 8 characters" }, { status: 400 });
  const endpoint = action === "login" ? "/auth/v1/token?grant_type=password" : "/auth/v1/signup";
  const r = await backend(endpoint, { method: "POST", body: JSON.stringify({ email: body.email, password: body.password }) });
  const data = await r.json();
  if (!r.ok) return NextResponse.json({ error: data.msg || data.error_description || data.message || "Authentication failed" }, { status: 400 });
  const response = NextResponse.json({ ok: true, emailVerificationRequired: !data.access_token });
  if (data.access_token) {
    const secure = process.env.NODE_ENV === "production";
    response.cookies.set("ss_access", data.access_token, { httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: data.expires_in || 3600 });
    if (data.refresh_token) response.cookies.set("ss_refresh", data.refresh_token, { httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 30 });
  }
  return response;
}
