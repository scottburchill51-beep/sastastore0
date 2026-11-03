
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

const features = [
  {
    number: "01",
    title: "Browse Products",
    description:
      "Explore premium digital products at affordable prices.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
    color: "blue",
  },
  {
    number: "02",
    title: "Manage Orders",
    description:
      "View purchases and follow your order progress.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <path d="M8 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-3" />
        <rect x="8" y="2" width="8" height="4" rx="1" />
        <path d="m8 12 2 2 4-4" />
        <path d="M8 18h8" />
      </svg>
    ),
    color: "emerald",
  },
  {
    number: "03",
    title: "Track Subscriptions",
    description:
      "Keep track of active subscriptions and expiry dates.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
        <path d="m17 3 2 2" />
      </svg>
    ),
    color: "violet",
  },
];

export default function LoginPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#EFF6FF] via-white to-[#ECFDF5] text-slate-900">
      {/* Soft background decoration */}
      <div className="pointer-events-none absolute -left-28 top-16 h-80 w-80 rounded-full bg-blue-200/50 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-40 h-96 w-96 rounded-full bg-emerald-200/40 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-indigo-100/60 blur-3xl" />

      <Container>
        <div className="relative mx-auto max-w-5xl pb-14 pt-12 sm:pb-20 sm:pt-16">

          {/* Welcome heading */}
          <div className="mb-10 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/90 px-5 py-2.5 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-700">
                SastaStore Customer Account
              </span>
            </div>

            <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Welcome Back to{" "}
              <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-emerald-500 bg-clip-text text-transparent">
                SastaStore
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
              Your digital world, all in one place.
              Sign in to manage your orders,
              purchases and subscriptions.
            </p>
          </div>

          {/* Existing login component — unchanged */}
          <AuthForm mode="login" />

          {/* Premium account features */}
          <section
            aria-labelledby="account-features-title"
            className="mx-auto mt-12 max-w-4xl"
          >
            <div className="mb-7 text-center">
              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-blue-600">
                Everything in One Place
              </p>

              <h2
                id="account-features-title"
                className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl"
              >
                Your SastaStore Account
              </h2>

              <p className="mt-3 text-sm text-slate-500">
                A simpler way to manage your digital purchases.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.number}
                  className="group relative overflow-hidden rounded-3xl border border-white bg-white/90 p-6 shadow-[0_8px_30px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(15,23,42,0.10)]"
                >
                  <div className="absolute right-5 top-5 text-xs font-extrabold tracking-widest text-slate-200">
                    {feature.number}
                  </div>

                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                      feature.color === "blue"
                        ? "bg-blue-50 text-blue-600"
                        : feature.color === "emerald"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-violet-50 text-violet-600"
                    }`}
                  >
                    {feature.icon}
                  </div>

                  <h3 className="mt-6 text-base font-extrabold text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {feature.description}
                  </p>

                  <div
                    className={`mt-6 h-1 w-12 rounded-full ${
                      feature.color === "blue"
                        ? "bg-blue-500"
                        : feature.color === "emerald"
                        ? "bg-emerald-500"
                        : "bg-violet-500"
                    }`}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Footer navigation */}
          <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-4 border-t border-slate-200/70 pt-8 text-sm font-semibold">
            <Link
              href="/products"
              className="text-slate-600 transition-colors hover:text-blue-600"
            >
              Browse Products
            </Link>

            <Link
              href="/contact"
              className="text-slate-600 transition-colors hover:text-blue-600"
            >
              Need Help?
            </Link>

            <Link
              href="/privacy"
              className="text-slate-600 transition-colors hover:text-blue-600"
            >
              Privacy Policy
            </Link>
          </div>

          <p className="mt-6 text-center text-xs text-slate-400">
            © 2026 SastaStore. Your trusted digital marketplace.
          </p>
        </div>
      </Container>
    </main>
  );
}
