
import { NextRequest, NextResponse } from "next/server";
import { backend, configured } from "@/lib/store-backend";

const SITE_URL = "https://sastastore.store";

function redirectToLogin() {
  return NextResponse.redirect(
    new URL("/login?error=email-confirmation", SITE_URL),
  );
}

export async function GET(request: NextRequest) {
  const tokenHash = request.nextUrl.searchParams.get("token_hash");
  const type = request.nextUrl.searchParams.get("type");

  if (
    !configured ||
    !tokenHash ||
    tokenHash.length > 2048 ||
    !["email", "signup"].includes(type || "")
  ) {
    return redirectToLogin();
  }

  try {
    const result = await backend("/auth/v1/verify", {
      method: "POST",
      body: JSON.stringify({
        token_hash: tokenHash,
        type: type === "signup" ? "signup" : "email",
      }),
    });

    const data = await result.json();

    if (!result.ok || !data.access_token) {
      return redirectToLogin();
    }

    const response = NextResponse.redirect(
      new URL("/account", SITE_URL),
    );

    response.cookies.set("ss_access", data.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: data.expires_in || 3600,
    });

    if (data.refresh_token) {
      response.cookies.set("ss_refresh", data.refresh_token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      });
    }

    return response;
  } catch {
    return redirectToLogin();
  }
}
