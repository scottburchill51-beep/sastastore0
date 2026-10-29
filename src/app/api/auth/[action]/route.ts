
import { NextRequest, NextResponse } from "next/server";
import { backend, configured } from "@/lib/store-backend";

const SITE_URL = "https://sastastore.store";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ action: string }> },
) {
  const { action } = await params;

  if (!configured) {
    return NextResponse.json(
      { error: "Set Supabase environment variables first" },
      { status: 503 },
    );
  }

  if (action === "logout") {
    const response = NextResponse.json({ ok: true });

    response.cookies.delete("ss_access");
    response.cookies.delete("ss_refresh");

    return response;
  }

  if (!["login", "register"].includes(action)) {
    return NextResponse.json(
      { error: "Invalid action" },
      { status: 404 },
    );
  }

  const body = await request.json().catch(() => ({}));

  if (
    typeof body.email !== "string" ||
    typeof body.password !== "string" ||
    body.password.length < 8
  ) {
    return NextResponse.json(
      {
        error:
          "Use a valid email and password of at least 8 characters",
      },
      { status: 400 },
    );
  }

  const isRegister = action === "register";

  const endpoint = isRegister
    ? `/auth/v1/signup?redirect_to=${encodeURIComponent(
        `${SITE_URL}/auth/confirm`,
      )}`
    : "/auth/v1/token?grant_type=password";

  try {
    const result = await backend(endpoint, {
      method: "POST",
      body: JSON.stringify({
        email: body.email.trim(),
        password: body.password,
      }),
    });

    const data = await result.json();

    if (!result.ok) {
      return NextResponse.json(
        {
          error:
            data.msg ||
            data.error_description ||
            data.message ||
            "Authentication failed",
        },
        { status: 400 },
      );
    }

    const emailVerificationRequired =
      isRegister && !data.access_token;

    const response = NextResponse.json({
      ok: true,
      emailVerificationRequired,
      message: emailVerificationRequired
        ? "Please check your email and confirm your account."
        : "Authentication successful.",
    });

    if (data.access_token) {
      const secure = process.env.NODE_ENV === "production";

      response.cookies.set(
        "ss_access",
        data.access_token,
        {
          httpOnly: true,
          secure,
          sameSite: "lax",
          path: "/",
          maxAge: data.expires_in || 3600,
        },
      );

      if (data.refresh_token) {
        response.cookies.set(
          "ss_refresh",
          data.refresh_token,
          {
            httpOnly: true,
            secure,
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 30,
          },
        );
      }
    }

    return response;
  } catch {
    return NextResponse.json(
      { error: "Authentication service is temporarily unavailable." },
      { status: 503 },
    );
  }
}
