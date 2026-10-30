
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
  if (
    !value ||
    !value.startsWith("/") ||
    value.startsWith("//") ||
    value.includes("\\") ||
    /[\u0000-\u001f]/.test(value)
  ) {
    return "";
  }

  try {
    const parsed = new URL(value, "https://sastastore.local");

    if (parsed.origin !== "https://sastastore.local") {
      return "";
    }

    const allowed =
      parsed.pathname === "/checkout" ||
      /^\/products\/[a-z0-9]+(?:-[a-z0-9]+)*$/.test(
        parsed.pathname,
      );

    return allowed ? parsed.pathname + parsed.search : "";
  } catch {
    return "";
  }
}

function GoogleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width="24"
      height="24"
      className="h-6 w-6 shrink-0"
      aria-hidden="true"
    >
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 8.22 3.21 13.81l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
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
  );
}

export function AuthForm({ mode }: { mode: AuthMode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<
    "error" | "success"
  >("error");

  const [returnTo, setReturnTo] = useState("");
  const [verificationMode, setVerificationMode] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setReturnTo(safeReturnPath(params.get("next")));
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = window.setTimeout(() => {
      setCooldown((value) => Math.max(0, value - 1));
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [cooldown]);

  const loginHref = returnTo
    ? `/login?next=${encodeURIComponent(returnTo)}`
    : "/login";

  const registerHref = returnTo
    ? `/register?next=${encodeURIComponent(returnTo)}`
    : "/register";

  const googleHref = returnTo
    ? `/api/auth/google?next=${encodeURIComponent(returnTo)}`
    : "/api/auth/google";

  function showError(text: string) {
    setMessageType("error");
    setMessage(text);
  }

  function showSuccess(text: string) {
    setMessageType("success");
    setMessage(text);
  }

  async function parseResponse(response: Response) {
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.error || "Something went wrong.");
    }

    return data;
  }

  async function finishLogin() {
    const response = await fetch("/api/store/session", {
      method: "GET",
      credentials: "same-origin",
      cache: "no-store",
    });

    const session: SessionResult = await parseResponse(response);

    if (!session.loggedIn) {
      throw new Error(
        "Your login session could not be verified. Please try again.",
      );
    }

    if (session.isAdmin) {
      window.location.replace("/admin");
      return;
    }

    window.location.replace(
      verificationMode
        ? "/account"
        : safeReturnPath(returnTo) || "/",
    );
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) return;

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`/api/auth/${mode}`, {
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
      });

      const data = await parseResponse(response);

      if (data.emailVerificationRequired) {
        setVerificationMode(true);
        setCooldown(60);
        setOtp("");
        showSuccess(
          "A 6-digit verification code has been sent to your email.",
        );
        setLoading(false);
        return;
      }

      await finishLogin();
    } catch (error) {
      showError(
        error instanceof Error
          ? error.message
          : "Authentication failed. Please try again.",
      );
      setLoading(false);
    }
  }

  async function verifyOTP(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) return;

    if (!/^\d{6}$/.test(otp)) {
      showError("Please enter all 6 digits.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/auth/verify", {
        method: "POST",
        credentials: "same-origin",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          token: otp,
        }),
      });

      await parseResponse(response);

      showSuccess("Email verified successfully. Opening your account...");

      await finishLogin();
    } catch (error) {
      showError(
        error instanceof Error
          ? error.message
          : "Invalid or expired verification code.",
      );
      setLoading(false);
    }
  }

  async function resendOTP() {
    if (loading || cooldown > 0) return;

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/auth/resend", {
        method: "POST",
        credentials: "same-origin",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
        }),
      });

      await parseResponse(response);

      setCooldown(60);
      setOtp("");
      showSuccess("A new verification code has been sent.");
    } catch (error) {
      showError(
        error instanceof Error
          ? error.message
          : "Could not resend the code.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#EFF8FF] via-white to-[#ECFDF5] px-4 py-12 text-slate-900">
      <div className="w-full max-w-[440px]">

        <div className="mb-8 text-center">
          <Link
            href="/"
            aria-label="SastaStore Home"
            className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 text-2xl font-black text-white shadow-lg shadow-blue-100"
          >
            S
          </Link>

          <h1 className="text-2xl font-extrabold">
            Sasta<span className="text-blue-600">Store</span>
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Your premium digital marketplace
          </p>
        </div>

        <div className="rounded-3xl border border-blue-100 bg-white p-6 shadow-xl shadow-blue-100/50 sm:p-9">

          {verificationMode ? (
            <>
              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
                  ✉
                </div>

                <h2 className="mt-5 text-2xl font-extrabold">
                  Verify Your Email
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  Enter the 6-digit code sent to:
                </p>

                <p className="mt-1 break-all font-bold text-slate-800">
                  {email}
                </p>
              </div>

              <form onSubmit={verifyOTP} className="mt-7">
                <label className="block">
                  <span className="text-sm font-semibold text-slate-800">
                    Verification Code
                  </span>

                  <input
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    pattern="[0-9]{6}"
                    maxLength={6}
                    required
                    autoFocus
                    value={otp}
                    onChange={(event) =>
                      setOtp(
                        event.target.value.replace(/\D/g, "").slice(0, 6),
                      )
                    }
                    placeholder="000000"
                    className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-4 py-4 text-center text-3xl font-extrabold tracking-[0.5em] text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </label>

                {message && (
                  <p
                    role="status"
                    className={`mt-5 rounded-xl border p-3 text-sm leading-6 ${
                      messageType === "success"
                        ? "border-emerald-100 bg-emerald-50 text-emerald-700"
                        : "border-red-100 bg-red-50 text-red-700"
                    }`}
                  >
                    {message}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading || otp.length !== 6}
                  className="mt-6 flex min-h-12 w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-extrabold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? "Verifying..." : "Verify Email & Continue"}
                </button>
              </form>

              <div className="mt-6 text-center">
                <button
                  type="button"
                  disabled={loading || cooldown > 0}
                  onClick={resendOTP}
                  className="text-sm font-bold text-blue-600 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {cooldown > 0
                    ? `Resend code in ${cooldown}s`
                    : "Resend verification code"}
                </button>

                <p className="mt-5">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => {
                      setVerificationMode(false);
                      setOtp("");
                      setMessage("");
                    }}
                    className="text-sm font-semibold text-slate-500 hover:text-blue-600"
                  >
                    ← Back to registration
                  </button>
                </p>
              </div>
            </>
          ) : (
            <>
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

              <form onSubmit={submit}>
                <div className="space-y-5">
                  <label className="block">
                    <span className="text-sm font-semibold text-slate-800">
                      Email Address
                    </span>

                    <input
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@example.com"
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-semibold text-slate-800">
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
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Enter your password"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 pr-20 text-sm text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
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
                    className={`mt-5 rounded-xl border p-3 text-sm leading-6 ${
                      messageType === "success"
                        ? "border-emerald-100 bg-emerald-50 text-emerald-700"
                        : "border-red-100 bg-red-50 text-red-700"
                    }`}
                  >
                    {message}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-7 flex min-h-12 w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-extrabold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading
                    ? "Please Wait..."
                    : mode === "login"
                      ? "Sign In"
                      : "Create Account"}
                </button>
              </form>

              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-200" />
                <span className="shrink-0 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                  Or continue with
                </span>
                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <a
                href={googleHref}
                aria-label="Continue with Google"
                className="group relative flex min-h-14 w-full items-center justify-center gap-3 rounded-xl border-2 border-slate-300 bg-white px-5 py-3.5 text-base font-extrabold text-slate-900 shadow-sm transition-all hover:border-blue-500 hover:bg-blue-50 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
              >
                <GoogleIcon />
                <span>Continue with Google</span>
                <span
                  aria-hidden="true"
                  className="absolute right-4 text-lg text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-blue-600"
                >
                  →
                </span>
              </a>

              <p className="mt-3 text-center text-xs leading-6 text-slate-500">
                You'll be redirected to Google to continue signing in.
              </p>

              <p className="mt-7 text-center text-sm text-slate-600">
                {mode === "login" ? (
                  <>
                    Don't have an account?{" "}
                    <Link
                      href={registerHref}
                      className="font-extrabold text-blue-600 hover:underline"
                    >
                      Sign Up
                    </Link>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <Link
                      href={loginHref}
                      className="font-extrabold text-blue-600 hover:underline"
                    >
                      Sign In
                    </Link>
                  </>
                )}
              </p>
            </>
          )}
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-5 text-center text-sm">
          <Link
            href="/"
            className="font-semibold text-blue-600 hover:underline"
          >
            ← Back to SastaStore
          </Link>

          <Link
            href="/contact"
            className="font-semibold text-blue-600 hover:underline"
          >
            Need Help?
          </Link>
        </div>
      </div>
    </main>
  );
}
