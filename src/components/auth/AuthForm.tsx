
"use client";

import {
  useEffect,
  useState,
  type FormEvent,
} from "react";
import Link from "next/link";

type AuthMode = "login" | "register";

type SessionResult = {
  loggedIn: boolean;
  isAdmin: boolean;
};

function safeReturnPath(value: string | null): string {
  if (!value) return "";

  if (
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.includes("\\") ||
    /[\u0000-\u001f]/.test(value)
  ) {
    return "";
  }

  try {
    const parsed = new URL(
      value,
      "https://sastastore.local",
    );

    if (parsed.origin !== "https://sastastore.local") {
      return "";
    }

    const allowed =
      parsed.pathname === "/checkout" ||
      /^\/products\/[a-z0-9]+(?:-[a-z0-9]+)*$/.test(
        parsed.pathname,
      );

    return allowed
      ? parsed.pathname + parsed.search
      : "";
  } catch {
    return "";
  }
}

export function AuthForm({
  mode,
}: {
  mode: AuthMode;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [returnTo, setReturnTo] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(
      window.location.search,
    );

    setReturnTo(
      safeReturnPath(params.get("next")),
    );
  }, []);

  const loginHref = returnTo
    ? `/login?next=${encodeURIComponent(returnTo)}`
    : "/login";

  const registerHref = returnTo
    ? `/register?next=${encodeURIComponent(returnTo)}`
    : "/register";

  const googleHref = returnTo
    ? `/api/auth/google?next=${encodeURIComponent(returnTo)}`
    : "/api/auth/google";

  async function submit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (loading) return;

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `/api/auth/${mode}`,
        {
          method: "POST",
          credentials: "same-origin",
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Authentication failed.",
        );
      }

      if (data.emailVerificationRequired) {
        setMessage(
          "Please verify your email address. After verification, sign in to continue.",
        );
        setLoading(false);
        return;
      }

      // Check verified login role from the server.
      const sessionResponse = await fetch(
        "/api/store/session",
        {
          method: "GET",
          credentials: "same-origin",
          cache: "no-store",
        },
      );

      if (!sessionResponse.ok) {
        throw new Error(
          "Login successful, but account verification failed. Please refresh and try again.",
        );
      }

      const session: SessionResult =
        await sessionResponse.json();

      if (!session.loggedIn) {
        throw new Error(
          "Login session could not be verified. Please try again.",
        );
      }

      // Admin always opens the admin dashboard.
      if (session.isAdmin) {
        window.location.replace("/admin");
        return;
      }

      // Customer from Buy Now returns to checkout.
      // Normal customer goes to homepage.
      window.location.replace(
        safeReturnPath(returnTo) || "/",
      );
    } catch (caught) {
      setMessage(
        caught instanceof Error
          ? caught.message
          : "Something went wrong. Please try again.",
      );

      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#F8FAFC] via-[#EFF7FF] to-[#E5FBF3] px-4 py-12 text-slate-900">
      <div className="w-full max-w-[440px]">

        <div className="mb-8 text-center">
          <Link
            href="/"
            className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 text-2xl font-black text-white shadow-lg"
          >
            S
          </Link>

          <h1 className="text-2xl font-extrabold">
            <span className="text-slate-900">
              Sasta
            </span>
            <span className="text-blue-600">
              Store
            </span>
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Your premium digital marketplace
          </p>
        </div>

        <form
          onSubmit={submit}
          className="rounded-3xl border border-blue-100 bg-white p-7 shadow-xl shadow-blue-100/50 sm:p-9"
        >
          <h2 className="text-2xl font-extrabold">
            {mode === "login"
              ? "Welcome Back"
              : "Create Your Account"}
          </h2>

          <p className="mb-7 mt-2 text-sm leading-6 text-slate-500">
            {returnTo
              ? "Sign in to continue your purchase."
              : mode === "login"
                ? "Sign in to your SastaStore account."
                : "Join SastaStore and explore digital subscriptions."}
          </p>

          <div className="space-y-5">
            <label className="block">
              <span className="text-sm font-semibold">
                Email Address
              </span>

              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="you@example.com"
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold">
                Password
              </span>

              <div className="relative mt-2">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={8}
                  autoComplete={
                    mode === "login"
                      ? "current-password"
                      : "new-password"
                  }
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 pr-20 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute inset-y-0 right-4 text-xs font-bold text-blue-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </label>
          </div>

          {mode === "login" && (
            <div className="mt-3 text-right">
              <Link
                href="/forgot-password"
                className="text-sm font-semibold text-blue-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
          )}

          {message && (
            <p
              role="status"
              className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-3 text-sm text-blue-700"
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-7 w-full rounded-xl bg-blue-600 py-3.5 font-bold text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            {loading
              ? "Please Wait..."
              : mode === "login"
                ? "Sign In"
                : "Create Account"}
          </button>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />

            <span className="text-xs font-semibold text-slate-400">
              OR CONTINUE WITH
            </span>

            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <a
            href={googleHref}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white py-3.5 text-sm font-semibold text-slate-700 hover:bg-blue-50"
          >
            <svg
              viewBox="0 0 48 48"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 5.38 6.51 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.28 5.48-4.82 7.18l7.73 6C44.36 38.03 46.98 31.88 46.98 24.55z"
              />
              <path
                fill="#FBBC05"
                d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.2A23.94 23.94 0 0 0 0 24c0 3.87.93 7.51 2.56 10.78l7.97-6.19z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.9-5.8l-7.73-6c-2.14 1.44-4.88 2.3-8.17 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
              />
            </svg>

            Continue with Google
          </a>

          <p className="mt-7 text-center text-sm text-slate-500">
            {mode === "login" ? (
              <>
                Don't have an account?{" "}
                <Link
                  href={registerHref}
                  className="font-bold text-blue-600 hover:underline"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link
                  href={loginHref}
                  className="font-bold text-blue-600 hover:underline"
                >
                  Sign In
                </Link>
              </>
            )}
          </p>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm font-semibold text-blue-600 hover:underline"
          >
            ← Back to SastaStore
          </Link>
        </div>
      </div>
    </main>
  );
}
