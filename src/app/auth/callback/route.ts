
import { NextRequest, NextResponse } from "next/server";
import { backend, configured } from "@/lib/store-backend";

export async function GET(request: NextRequest) {
  const origin = request.nextUrl.origin;
  const code = request.nextUrl.searchParams.get("code");
  const error = request.nextUrl.searchParams.get("error");

  const verifier = request.cookies.get("ss_pkce_verifier")?.value;

  function fail() {
    const response = NextResponse.redirect(
      new URL("/login?error=google", origin)
    );
    response.cookies.delete("ss_pkce_verifier");
    return response;
  }

  if (!configured || error || !code || !verifier) {
    return fail();
  }

  try {
    const result = await backend(
      "/auth/v1/token?grant_type=pkce",
      {
        method: "POST",
        body: JSON.stringify({
          auth_code: code,
          code_verifier: verifier,
        }),
      }
    );

    const data = await result.json();

    if (!result.ok || !data.access_token) {
      return fail();
    }

    const response = NextResponse.redirect(
      new URL("/account", origin)
    );

    const secure = process.env.NODE_ENV === "production";

    response.cookies.set("ss_access", data.access_token, {
      httpOnly: true,
      secure,
      sameSite: "lax",
      path: "/",
      maxAge: data.expires_in || 3600,
    });

    if (data.refresh_token) {
      response.cookies.set("ss_refresh", data.refresh_token, {
        httpOnly: true,
        secure,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      });
    }

    response.cookies.delete("ss_pkce_verifier");

    return response;
  } catch {
    return fail();
  }
}
