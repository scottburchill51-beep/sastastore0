
import Link from "next/link";

import { AuthForm } from "@/components/auth/AuthForm";
import { Container } from "@/components/ui/Container";

export const metadata = {
  title: "Log In | SastaStore",
  description:
    "Sign in to your SastaStore account to manage digital subscriptions, view orders and track purchases.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#EFF8FF] via-white to-[#ECFDF5] text-slate-900">
      <div className="pointer-events-none absolute -left-24 top-12 h-72 w-72 rounded-full bg-sky-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-12 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl" />

      <Container>
        <div className="relative mx-auto max-w-5xl py-12 sm:py-20">
          <div className="mb-9 text-center">
            <span className="inline-flex rounded-full border border-blue-200 bg-white px-5 py-2 text-xs font-extrabold uppercase tracking-widest text-blue-600 shadow-sm">
              SastaStore Customer Account
            </span>

            <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-5xl">
              Welcome Back to{" "}
              <span className="text-blue-600">
                SastaStore
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-8 text-slate-600">
              Sign in to shop digital products,
              review your orders and manage your
              subscriptions.
            </p>
          </div>

          {/* Existing authentication component */}
          <AuthForm mode="login" />

          <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-blue-100 bg-white/80 p-6 shadow-sm">
            <h2 className="text-center text-base font-extrabold">
              Your SastaStore Account
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              <div className="text-center">
                <p className="font-extrabold text-blue-600">
                  01
                </p>
                <p className="mt-2 text-xs font-semibold text-slate-600">
                  Browse Products
                </p>
              </div>

              <div className="text-center">
                <p className="font-extrabold text-blue-600">
                  02
                </p>
                <p className="mt-2 text-xs font-semibold text-slate-600">
                  Manage Orders
                </p>
              </div>

              <div className="text-center">
                <p className="font-extrabold text-blue-600">
                  03
                </p>
                <p className="mt-2 text-xs font-semibold text-slate-600">
                  Track Subscriptions
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-5 text-sm font-semibold">
            <Link
              href="/products"
              className="text-blue-700 hover:underline"
            >
              Browse Products
            </Link>

            <Link
              href="/contact"
              className="text-blue-700 hover:underline"
            >
              Need Help?
            </Link>

            <Link
              href="/privacy"
              className="text-blue-700 hover:underline"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
