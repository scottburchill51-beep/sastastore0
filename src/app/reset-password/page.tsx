
"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export default function ResetPasswordPage() {
  const [client, setClient] = useState<SupabaseClient | null>(null);
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
      setMessage("Authentication is not configured.");
      return;
    }

    const supabase = createClient(url, key, {
      auth: {
        persistSession: false,
        detectSessionInUrl: true,
        autoRefreshToken: false,
      },
    });

    setClient(supabase);

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "PASSWORD_RECOVERY" && session) {
          setReady(true);
        }
      }
    );

    const hash = new URLSearchParams(
      window.location.hash.substring(1)
    );

    if (hash.get("error_description")) {
      setMessage(
        "Reset link expired or invalid. Please request a new one."
      );
    }

    return () => listener.subscription.unsubscribe();
  }, []);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!client || !ready) {
      setMessage("Please open a valid password reset email link.");
      return;
    }

    if (password.length < 8) {
      setMessage("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirm) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);
    setMessage("");

    const { error } = await client.auth.updateUser({
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setSuccess(true);
      setMessage("Password updated successfully.");
      await client.auth.signOut();
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#f6f7fb] px-4 py-12 flex items-center justify-center text-slate-900">
      <div className="w-full max-w-[440px] rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
        <h1 className="text-2xl font-bold">
          Reset your password
        </h1>

        <p className="mt-3 text-sm text-slate-500">
          Choose a new password for your SastaStore account.
        </p>

        {message && (
          <p role="status" className="mt-5 rounded-xl bg-violet-50 p-3 text-sm text-violet-700">
            {message}
          </p>
        )}

        {!success && (
          <form onSubmit={submit} className="mt-7 space-y-5">
            <label className="block text-sm font-semibold">
              New password
              <input
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3.5"
              />
            </label>

            <label className="block text-sm font-semibold">
              Confirm password
              <input
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3.5"
              />
            </label>

            <button
              disabled={!ready || loading}
              className="w-full rounded-xl bg-violet-600 py-3.5 font-semibold text-white disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        )}

        <Link
          href="/login"
          className="mt-7 block text-center text-sm font-semibold text-violet-600"
        >
          Back to Login
        </Link>
      </div>
    </main>
  );
}
