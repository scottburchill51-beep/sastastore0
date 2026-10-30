
import { NextRequest, NextResponse } from "next/server";
import { backend, configured } from "@/lib/store-backend";

type AuthBody = {
  email?: string;
  password?: string;
  token?: string;
};

function setSessionCookies(
  response: NextResponse,
  data: {
    access_token: string;
    refresh_token?: string;
    expires_in?: number;
  },
) {
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
}

function getAuthError(data: Record<string, unknown>) {
  return (
    data.msg ||
    data.error_description ||
    data.message ||
    data.error ||
    "Authentication failed."
  );
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ action: string }> },
) {
  const { action } = await params;

  if (!configured) {
    return NextResponse.json(
      { error: "Set Supabase environment variables first." },
      { status: 503 },
    );
  }

  // LOGOUT
  if (action === "logout") {
    const response = NextResponse.json({ ok: true });

    response.cookies.delete("ss_access");
    response.cookies.delete("ss_refresh");

    return response;
  }

  if (
    !["login", "register", "verify", "resend"].includes(action)
  ) {
    return NextResponse.json(
      { error: "Invalid action." },
      { status: 404 },
    );
  }

  const body: AuthBody = await request.json().catch(() => ({}));

  const email =
    typeof body.email === "string"
      ? body.email.trim().toLowerCase()
      : "";

  const validEmail =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!validEmail || email.length > 254) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  try {
    // REGISTER: Create account and send signup OTP
    if (action === "register") {
      if (
        typeof body.password !== "string" ||
        body.password.length < 8
      ) {
        return NextResponse.json(
          {
            error: "Password must contain at least 8 characters.",
          },
          { status: 400 },
        );
      }

      const result = await backend("/auth/v1/signup", {
        method: "POST",
        body: JSON.stringify({
          email,
          password: body.password,
        }),
      });

      const data = await result.json();

      if (!result.ok) {
        return NextResponse.json(
          { error: getAuthError(data) },
          { status: 400 },
        );
      }

      // Email confirmation should be enabled in Supabase.
      if (data.access_token && data.refresh_token) {
        const response = NextResponse.json({
          ok: true,
          loggedIn: true,
          emailVerificationRequired: false,
          message: "Account created successfully.",
        });

        setSessionCookies(response, data);

        return response;
      }

      return NextResponse.json({
        ok: true,
        loggedIn: false,
        emailVerificationRequired: true,
        message: "A verification code has been sent to your email.",
      });
    }

    // VERIFY: Verify the six-digit signup OTP
    if (action === "verify") {
      const token =
        typeof body.token === "string"
          ? body.token.trim()
          : "";

      if (!/^\d{6}$/.test(token)) {
        return NextResponse.json(
          { error: "Enter a valid 6-digit verification code." },
          { status: 400 },
        );
      }

      const result = await backend("/auth/v1/verify", {
        method: "POST",
        body: JSON.stringify({
          email,
          token,
          type: "signup",
        }),
      });

      const data = await result.json();

      if (
        !result.ok ||
        !data.access_token ||
        !data.refresh_token
      ) {
        return NextResponse.json(
          {
            error:
              getAuthError(data) ||
              "Invalid or expired verification code.",
          },
          { status: 400 },
        );
      }

      const response = NextResponse.json({
        ok: true,
        loggedIn: true,
        message: "Email verified successfully.",
      });

      setSessionCookies(response, data);

      return response;
    }

    // RESEND: Send another signup OTP
    if (action === "resend") {
      const result = await backend("/auth/v1/resend", {
        method: "POST",
        body: JSON.stringify({
          email,
          type: "signup",
        }),
      });

      const data = await result.json();

      if (!result.ok) {
        return NextResponse.json(
          { error: getAuthError(data) },
          { status: 400 },
        );
      }

      return NextResponse.json({
        ok: true,
        message: "A new verification code has been sent.",
      });
    }

    // LOGIN: Existing password login
    if (action === "login") {
      if (
        typeof body.password !== "string" ||
        body.password.length < 8
      ) {
        return NextResponse.json(
          { error: "Please enter a valid password." },
          { status: 400 },
        );
      }

      const result = await backend(
        "/auth/v1/token?grant_type=password",
        {
          method: "POST",
          body: JSON.stringify({
            email,
            password: body.password,
          }),
        },
      );

      const data = await result.json();

      if (
        !result.ok ||
        !data.access_token ||
        !data.refresh_token
      ) {
        return NextResponse.json(
          { error: getAuthError(data) },
          { status: 400 },
        );
      }

      const response = NextResponse.json({
        ok: true,
        loggedIn: true,
        message: "Login successful.",
      });

      setSessionCookies(response, data);

      return response;
    }

    return NextResponse.json(
      { error: "Invalid authentication action." },
      { status: 400 },
    );
  } catch {
    return NextResponse.json(
      {
        error:
          "Authentication service is temporarily unavailable. Please try again.",
      },
      { status: 503 },
    );
  }
}
