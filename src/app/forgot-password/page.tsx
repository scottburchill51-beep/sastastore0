
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Unable to send reset link.");
      }

      setMessage(
        "If an account exists for this email, a password reset link will be sent."
      );
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f6f7fb] px-4 py-12 flex items-center justify-center text-slate-900">
      <div className="w-full max-w-[440px]">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 text-3xl">
          🔐
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/60">
          <h1 className="text-2xl font-bold">
            Forgot password?
          </h1>

          <p className="mt-3 text-sm text-slate-500">
            Enter your email address and we'll send you
            instructions to reset your password.
          </p>

          <form onSubmit={submit} className="mt-7 space-y-5">
            <label className="block text-sm font-semibold">
              Email address
              <input
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3.5 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
              />
            </label>

            {message && (
              <p role="status" className="text-sm text-violet-700">
                {message}
              </p>
            )}

            <button
              disabled={loading}
              className="w-full rounded-xl bg-violet-600 py-3.5 font-semibold text-white hover:bg-violet-700 disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <Link
            href="/login"
            className="mt-7 block text-center text-sm font-semibold text-violet-600"
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    </main>
  );
}
