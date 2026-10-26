
import Link from "next/link";
import { redirect } from "next/navigation";

import {
  getSession,
  isAdmin,
} from "@/lib/store-backend";

import AdminOrdersClient from "./AdminOrdersClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Payment Reviews | SastaStore Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminOrdersPage() {
  const { user, token } = await getSession();

  if (!user || !token) {
    redirect("/login");
  }

  const allowed = await isAdmin(
    user.id,
    token,
  );

  if (!allowed) {
    return (
      <main className="min-h-screen bg-slate-50 px-4 py-20">
        <div className="mx-auto max-w-lg rounded-3xl border border-slate-200 bg-white p-9 text-center">
          <h1 className="text-2xl font-extrabold text-slate-900">
            Access Denied
          </h1>

          <p className="mt-3 text-slate-600">
            This page is only available to
            SastaStore administrators.
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white"
          >
            Back to Store
          </Link>
        </div>
      </main>
    );
  }

  return <AdminOrdersClient />;
}
