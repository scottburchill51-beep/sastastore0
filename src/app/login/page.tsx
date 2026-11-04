
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
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#EFF6FF] via-white to-[#ECFDF5] text-slate-900">
      <div className="pointer-events-none absolute -left-28 top-16 h-80 w-80 rounded-full bg-blue-200/50 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-40 h-96 w-96 rounded-full bg-emerald-200/40 blur-3xl" />

      <Container>
        <div className="relative mx-auto max-w-5xl py-10 sm:py-16">
          <AuthForm mode="login" />

          <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-semibold">
            <Link
              href="/products"
              className="text-blue-700 transition-colors hover:text-blue-900 hover:underline"
            >
              Browse Products
            </Link>

            <Link
              href="/contact"
              className="text-blue-700 transition-colors hover:text-blue-900 hover:underline"
            >
              Need Help?
            </Link>

            <Link
              href="/privacy"
              className="text-blue-700 transition-colors hover:text-blue-900 hover:underline"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
