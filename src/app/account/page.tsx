
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession, isAdmin } from "@/lib/store-backend";
import { LogoutButton } from "@/components/auth/LogoutButton";

export const dynamic = "force-dynamic";

export default async function Page() {
  const { user, token } = await getSession();

  if (!user) {
    redirect("/login");
  }

  const admin = await isAdmin(user.id, token);

  if (admin) {
    redirect("/admin");
  }

  return (
    <main className="min-h-screen flex-1 bg-[#f6f7fb] px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-6xl space-y-8">
        <div>
          <p className="text-sm font-semibold text-violet-600">
            SASTASTORE ACCOUNT
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            My Dashboard
          </h1>

          <p className="mt-2 text-slate-500">
            Manage your digital products and account.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div>
              <p className="text-sm text-slate-500">
                Signed in as
              </p>

              <p className="mt-1 break-all text-lg font-bold">
                {user.email}
              </p>

              <p className="mt-2 text-sm text-emerald-600">
                Account authenticated
              </p>
            </div>

            <LogoutButton />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-sm text-slate-500">
              My Orders
            </p>
            <h2 className="mt-3 text-xl font-bold">
              Coming Soon
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Your order history will appear here.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-sm text-slate-500">
              Subscriptions
            </p>
            <h2 className="mt-3 text-xl font-bold">
              Coming Soon
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Active plans and renewal dates.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-sm text-slate-500">
              Payments
            </p>
            <h2 className="mt-3 text-xl font-bold">
              Coming Soon
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Your verified payment records.
            </p>
          </div>
        </div>

        <Link
          href="/products"
          className="inline-block rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-700"
        >
          Browse Products
        </Link>
      </div>
    </main>
  );
}
