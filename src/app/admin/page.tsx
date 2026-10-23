
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession, isAdmin } from "@/lib/store-backend";
import { ProductManager } from "@/components/admin/ProductManager";

export const dynamic = "force-dynamic";

export default async function Page() {
  const { user, token } = await getSession();

  if (!user) redirect("/login");

  const admin = await isAdmin(user.id, token);

  if (!admin) {
    return (
      <main className="mx-auto max-w-xl p-10">
        <h1 className="text-2xl font-bold">
          Access denied
        </h1>
        <p className="mt-2">
          This account is not an administrator.
        </p>
      </main>
    );
  }

  const stats = [
    {
      label: "Total Revenue",
      value: "Not tracked yet",
      detail: "Verified payments",
    },
    {
      label: "Total Orders",
      value: "Not tracked yet",
      detail: "Customer orders",
    },
    {
      label: "Pending Orders",
      value: "Not tracked yet",
      detail: "Awaiting verification",
    },
    {
      label: "Customers",
      value: "Not tracked yet",
      detail: "Registered customers",
    },
  ];

  return (
    <main className="min-h-screen flex-1 bg-[#f6f7fb] px-4 py-8 text-slate-900">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-violet-600">
              SASTASTORE / ADMIN
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight">
              Dashboard Overview
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage your store, digital products and operations.
            </p>
          </div>

          <Link
            href="/products"
            className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            View Store
          </Link>
        </div>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <p className="text-sm text-slate-500">
                {stat.label}
              </p>

              <h2 className="mt-4 text-xl font-bold">
                {stat.value}
              </h2>

              <p className="mt-2 text-xs text-slate-400">
                {stat.detail}
              </p>
            </div>
          ))}
        </section>

        <section className="grid gap-5 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-2">
            <h2 className="text-lg font-bold">
              Recent Orders
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Order tracking will appear here when the
              order management system is connected.
            </p>

            <div className="mt-6 rounded-xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-400">
              No order data connected yet
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-bold">
              Quick Actions
            </h2>

            <div className="mt-5 space-y-3">
              <a
                href="#manage-products"
                className="block rounded-xl bg-violet-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-violet-700"
              >
                Manage Products
              </a>

              <Link
                href="/products"
                className="block rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Browse Store
              </Link>
            </div>

            <p className="mt-6 text-xs leading-5 text-slate-500">
              Payments and order approvals will be added
              after the database and verification workflow
              are ready.
            </p>
          </div>
        </section>

        <section
          id="manage-products"
          className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-bold">
              Product Management
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Add, edit and manage your existing
              digital products and pricing plans.
            </p>
          </div>

          <ProductManager />
        </section>
      </div>
    </main>
  );
}
