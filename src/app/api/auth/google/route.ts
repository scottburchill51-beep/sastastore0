
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!supabaseUrl) {
    return NextResponse.json(
      { error: "Supabase is not configured" },
      { status: 503 }
    );
  }

  const callback = new URL(
    "/auth/callback",
    request.nextUrl.origin
  ).toString();

  const authUrl = new URL("/auth/v1/authorize", supabaseUrl);
  authUrl.searchParams.set("provider", "google");
  authUrl.searchParams.set("redirect_to", callback);

  return NextResponse.redirect(authUrl);
}
