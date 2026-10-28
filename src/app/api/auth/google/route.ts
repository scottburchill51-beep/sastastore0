
import { randomBytes, createHash } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!supabaseUrl) {
    return NextResponse.json(
      { error: "Supabase is not configured" },
      { status: 503 }
    );
  }

  const verifier = randomBytes(48).toString("base64url");

  const challenge = createHash("sha256")
    .update(verifier)
    .digest("base64url");

  const callback = new URL(
    "/auth/callback",
    request.nextUrl.origin
  ).toString();

  const authUrl = new URL(
    "/auth/v1/authorize",
    supabaseUrl
  );

  authUrl.searchParams.set("provider", "google");
  authUrl.searchParams.set("redirect_to", callback);
  authUrl.searchParams.set("code_challenge", challenge);
  authUrl.searchParams.set("code_challenge_method", "s256");

  const response = NextResponse.redirect(authUrl);

  response.cookies.set("ss_pkce_verifier", verifier, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/auth/callback",
    maxAge: 600,
  });

  return response;
}
