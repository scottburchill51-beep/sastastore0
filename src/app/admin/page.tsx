
import Link from "next/link";
import { redirect } from "next/navigation";

import {
  backend,
  getSession,
  isAdmin,
} from "@/lib/store-backend";

import { ProductManager } from "@/components/admin/ProductManager";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Admin Dashboard | SastaStore",
  robots: {
    index: false,
    follow: false,
  },
};

type AdminOrder = {
  order_id: string;
  tracking_id: string;
  customer_name: string;
  product_name: string;
  amount_pkr: number | string;
  payment_method: string;
  payment_status: string;
  order_status: string;
  created_at: string;
};

function money(amount: number) {
  return `PKR ${amount.toLocaleString("en-PK", {
    maximumFractionDigits: 2,
  })}`;
}

function paymentLabel(method: string) {
  if (method === "sadapay") return "SadaPay";
  if (method === "bank_transfer") return "Bank Transfer";
  if (method === "jazzcash") return "JazzCash";
  if (method === "easypaisa") return "Easypaisa";
  return method;
}

function statusStyle(status: string) {
  switch (status) {
    case "payment_review":
      return "border-amber-200 bg-amber-50 text-amber-700";
    case "approved":
    case "delivered":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";
    case "cancelled":
      return "border-red-200 bg-red-50 text-red-700";
    default:
      return "border-blue-200 bg-blue-50 text-blue-700";
  }
}

export default async function Page() {
  const { user, token } = await getSession();

  if (!user || !token) {
    redirect("/login");
  }

  const admin = await isAdmin(user.id, token);

  if (!admin) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4 py-16">
        <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-9 text-center shadow-sm">
          <h1 className="text-2xl font-extrabold text-slate-900">
            Access Denied
          </h1>

          <p className="mt-3 text-sm text-slate-600">
            This account is not a SastaStore administrator.
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-bold text-white hover:bg-blue-700"
          >
            Return to Store
          </Link>
        </div>
      </main>
    );
  }

  let orders: AdminOrder[] = [];
  let ordersAvailable = false;

  try {
    // Security: this RPC independently verifies
    // admin identity on the database.
    const response = await backend(
      "/rest/v1/rpc/admin_list_store_orders",
      {
        method: "POST",
        body: JSON.stringify({}),
      },
      token,
    );

    if (response.ok) {
      const result: unknown = await response.json();

      if (Array.isArray(result)) {
        orders = result as AdminOrder[];
        ordersAvailable = true;
      }
    } else {
      console.error(
        "Admin dashboard order fetch failed:",
        response.status,
      );
    }
  } catch (error) {
    console.error(
      "Admin dashboard order fetch error:",
      error,
    );
  }

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) =>
      order.payment_status === "submitted" &&
      order.order_status === "payment_review",
  ).length;

  const approvedOrders = orders.filter(
    (order) =>
      order.payment_status === "approved",
  );

  const verifiedRevenue = approvedOrders.reduce(
    (total, order) =>
      total + Number(order.amount_pkr || 0),
    0,
  );

  const recentOrders = [...orders]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() -
        new Date(a.created_at).getTime(),
    )
    .slice(0, 5);

  const stats = [
    {
      label: "Verified Revenue",
      value: ordersAvailable
        ? money(verifiedRevenue)
        : "Unavailable",
      detail: "Approved payments",
      accent: "text-emerald-600",
    },
    {
      label: "Total Orders",
      value: ordersAvailable
        ? totalOrders.toString()
        : "Unavailable",
      detail: "Latest 200 orders",
      accent: "text-blue-600",
    },
    {
      label: "Pending Reviews",
      value: ordersAvailable
        ? pendingOrders.toString()
        : "Unavailable",
      detail: "Awaiting payment verification",
      accent: "text-amber-600",
    },
    {
      label: "Approved Payments",
      value: ordersAvailable
        ? approvedOrders.length.toString()
        : "Unavailable",
      detail: "Payment confirmed by admin",
      accent: "text-violet-600",
    },
  ];

  return (
    <main className="min-h-screen flex-1 bg-gradient-to-br from-[#F8FAFC] via-[#EFF7FF] to-[#E8FBF4] px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* Dashboard Header */}
        <section className="flex flex-wrap items-center justify-between gap-5">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-600">
              SastaStore / Administration
            </p>

            <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Dashboard Overview
            </h1>

            <p className="mt-3 text-sm text-slate-600">
              Manage your digital products, customers,
              payment reviews and orders from one place.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              View Website
            </Link>

            <Link
              href="/admin/orders"
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
            >
              Manage Orders
              {pendingOrders > 0
                ? ` (${pendingOrders})`
                : ""}
            </Link>
          </div>
        </section>

        {/* Real Order Statistics */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm"
            >
              <p className="text-sm font-semibold text-slate-500">
                {stat.label}
              </p>

              <h2
                className={`mt-4 text-2xl font-extrabold ${stat.accent}`}
              >
                {stat.value}
              </h2>

              <p className="mt-2 text-xs text-slate-400">
                {stat.detail}
              </p>
            </div>
          ))}
        </section>

        {!ordersAvailable && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <p className="font-bold text-amber-900">
              Order statistics are temporarily unavailable.
            </p>

            <p className="mt-2 text-sm text-amber-800">
              Product management remains available.
              Please check the admin orders API and
              Supabase configuration.
            </p>
          </div>
        )}

        {/* Quick Actions */}
        <section className="grid gap-5 md:grid-cols-2">
          <a
            href="#manage-products"
            className="group rounded-3xl border border-blue-100 bg-white p-7 shadow-sm transition hover:border-blue-300 hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-2xl text-blue-700">
              📦
            </div>

            <h2 className="mt-5 text-xl font-extrabold">
              Manage Products
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Add new digital products, edit existing
              listings, upload product images and
              manage pricing plans.
            </p>

            <span className="mt-5 inline-block text-sm font-bold text-blue-600 group-hover:underline">
              Open Product Manager →
            </span>
          </a>

          <Link
            href="/admin/orders"
            className="group rounded-3xl border border-emerald-100 bg-white p-7 shadow-sm transition hover:border-emerald-300 hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-2xl text-emerald-700">
              🧾
            </div>

            <h2 className="mt-5 text-xl font-extrabold">
              Manage Orders
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Review customer orders, inspect private
              SadaPay and UBL payment screenshots,
              and approve or reject submitted payments.
            </p>

            <span className="mt-5 inline-block text-sm font-bold text-emerald-600 group-hover:underline">
              Open Order Manager →
              {pendingOrders > 0 &&
                ` ${pendingOrders} pending`}
            </span>
          </Link>
        </section>

        {/* Recent Orders */}
        <section className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold">
                Recent Orders
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Latest customer purchases and payment
                verification statuses.
              </p>
            </div>

            <Link
              href="/admin/orders"
              className="text-sm font-bold text-blue-600 hover:underline"
            >
              View All Orders →
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <div className="mt-7 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-9 text-center text-sm text-slate-500">
              {ordersAvailable
                ? "No customer orders yet."
                : "Order data is unavailable."}
            </div>
          ) : (
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[650px] text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                    <th className="px-3 py-4 font-semibold">
                      Tracking ID
                    </th>
                    <th className="px-3 py-4 font-semibold">
                      Customer
                    </th>
                    <th className="px-3 py-4 font-semibold">
                      Payment
                    </th>
                    <th className="px-3 py-4 font-semibold">
                      Amount
                    </th>
                    <th className="px-3 py-4 font-semibold">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {recentOrders.map((order) => (
                    <tr
                      key={order.order_id}
                      className="border-b border-slate-100 last:border-0"
                    >
                      <td className="px-3 py-4 font-bold text-blue-700">
                        {order.tracking_id}
                      </td>

                      <td className="px-3 py-4">
                        <p className="font-semibold">
                          {order.customer_name}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {order.product_name}
                        </p>
                      </td>

                      <td className="px-3 py-4 text-slate-600">
                        {paymentLabel(
                          order.payment_method,
                        )}
                      </td>

                      <td className="px-3 py-4 font-semibold">
                        {money(
                          Number(order.amount_pkr),
                        )}
                      </td>

                      <td className="px-3 py-4">
                        <span
                          className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-bold ${statusStyle(
                            order.order_status,
                          )}`}
                        >
                          {order.order_status.replace(
                            /_/g,
                            " ",
                          )}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Existing Product Management */}
        <section
          id="manage-products"
          className="scroll-mt-24 rounded-3xl border border-blue-100 bg-white p-5 shadow-sm sm:p-8"
        >
          <div className="mb-7">
            <h2 className="text-2xl font-extrabold">
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
