
"use client";

import {
  useEffect,
  useState,
  type FormEvent,
} from "react";

import Link from "next/link";

type AuthMode = "login" | "register";

/**
 * Only accept safe, internal return destinations.
 * Never allow an external URL to be used for redirects.
 */
function safeReturnPath(value: string | null): string {
  if (!value) return "";

  if (
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.includes("\\") ||
    /[\r\n\u0000-\u001f]/.test(value)
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

    const isCheckout = parsed.pathname === "/checkout";

    const isProductPage =
      /^\/products\/[a-z0-9]+(?:-[a-z0-9]+)*$/.test(
        parsed.pathname,
      );

    if (!isCheckout && !isProductPage) {
      return "";
    }

    return parsed.pathname + parsed.search;
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
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "same-origin",
          cache: "no-store",
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Authentication failed",
        );
      }

      if (data.emailVerificationRequired) {
        setMessage(
          "Please check your email to verify your account. After verification, sign in to continue.",
        );

        setLoading(false);
        return;
      }

      // Normal Login / Sign Up -> Homepage.
      // Buy Now Login -> Selected checkout.
      window.location.replace(
        safeReturnPath(returnTo) || "/",
      );
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );

      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#F8FAFC] via-[#EFF7FF] to-[#E5FBF3] px-4 py-12 text-slate-900">
      <div className="w-full max-w-[440px]">

        {/* Branding */}
        <div className="mb-8 text-center">
          <Link
            href="/"
            className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 text-2xl font-black text-white shadow-lg shadow-blue-100"
          >
            S
          </Link>

          <h1 className="text-2xl font-extrabold tracking-tight">
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

        {/* Authentication Form */}
        <form
          onSubmit={submit}
          className="rounded-[28px] border border-blue-100 bg-white p-7 shadow-[0_20px_65px_rgba(37,99,235,0.08)] sm:p-9"
        >
          <h2 className="text-2xl font-extrabold text-slate-900">
            {mode === "login"
              ? "Welcome back"
              : "Create your account"}
          </h2>

          <p className="mb-7 mt-2 text-sm leading-6 text-slate-500">
            {returnTo
              ? "Sign in or create an account to continue your purchase."
              : mode === "login"
                ? "Sign in to continue exploring SastaStore."
                : "Join SastaStore and explore premium digital products."}
          </p>

          {/* Email */}
          <div className="space-y-5">
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">
                Email Address
              </span>

              <input
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </label>

            {/* Password */}
            <label className="block">
              <span className="text-sm font-semibold text-slate-700">
                Password
              </span>

              <div className="relative mt-2">
                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  required
                  minLength={8}
                  autoComplete={
                    mode === "login"
                      ? "current-password"
                      : "new-password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 pr-20 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (previous) => !previous,
                    )
                  }
                  className="absolute inset-y-0 right-4 text-xs font-bold text-blue-600 hover:text-blue-700"
                >
                  {showPassword
                    ? "Hide"
                    : "Show"}
                </button>
              </div>
            </label>
          </div>

          {/* Forgot Password */}
          {mode === "login" && (
            <div className="mt-3 text-right">
              <Link
                href="/forgot-password"
                className="text-sm font-semibold text-blue-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          )}

          {/* Error / Confirmation Message */}
          {message && (
            <p
              role="status"
              className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-3 text-sm text-blue-700"
            >
              {message}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-7 w-full rounded-xl bg-blue-600 py-3.5 font-bold text-white shadow-lg shadow-blue-100 transition hover:bg-blue-700 disabled:opacity-60"
          >
            {loading
              ? "Please wait..."
              : mode === "login"
                ? "Sign In"
                : "Create Account"}
          </button>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />

            <span className="text-xs font-semibold text-slate-400">
              OR CONTINUE WITH
            </span>

            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* Google Login */}
          <a
            href={googleHref}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white py-3.5 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50"
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

          {/* Switch Between Login and Register */}
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

        {/* Back to Store */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm font-semibold text-blue-600 transition hover:text-blue-700"
          >
            ← Back to SastaStore
          </Link>
        </div>
      </div>
    </main>
  );
}
