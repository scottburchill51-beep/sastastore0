
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
  robots: { index: false, follow: false },
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
  return `PKR ${(Number.isFinite(amount) ? amount : 0).toLocaleString(
    "en-PK",
    { maximumFractionDigits: 2 },
  )}`;
}

function paymentLabel(method: string) {
  if (method === "sadapay") return "SadaPay";
  if (method === "bank_transfer") return "Bank Transfer";
  if (method === "jazzcash") return "JazzCash";
  if (method === "easypaisa") return "Easypaisa";
  return method || "Unknown";
}

function statusStyle(status: string) {
  switch (status) {
    case "payment_review":
      return "border-amber-200 bg-amber-50 text-amber-700";

    case "approved":
    case "delivered":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";

    case "cancelled":
    case "rejected":
      return "border-red-200 bg-red-50 text-red-700";

    default:
      return "border-[#C8D2DF] bg-[#F1F4F8] text-[#29415F]";
  }
}

function sortNewest(orders: AdminOrder[]) {
  return [...orders].sort(
    (a, b) =>
      new Date(b.created_at).getTime() -
      new Date(a.created_at).getTime(),
  );
}

function OrdersTable({
  orders,
  emptyMessage,
}: {
  orders: AdminOrder[];
  emptyMessage: string;
}) {
  if (orders.length === 0) {
    return (
      <div className="mt-6 rounded-2xl border border-dashed border-[#D5DDE7] bg-[#F4F6F9] p-9 text-center text-sm text-slate-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full min-w-[700px] text-left text-sm">
        <thead>
          <tr className="border-b border-[#D5DDE7] text-xs uppercase tracking-wider text-slate-500">
            <th className="px-3 py-4 font-semibold">Tracking ID</th>
            <th className="px-3 py-4 font-semibold">Customer / Product</th>
            <th className="px-3 py-4 font-semibold">Payment</th>
            <th className="px-3 py-4 font-semibold">Amount</th>
            <th className="px-3 py-4 font-semibold">Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr
              key={order.order_id}
              className="border-b border-[#E5EAF0] last:border-0"
            >
              <td className="px-3 py-4 font-bold text-[#29415F]">
                {order.tracking_id}
              </td>

              <td className="px-3 py-4">
                <p className="font-semibold text-slate-900">
                  {order.customer_name}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {order.product_name}
                </p>
              </td>

              <td className="px-3 py-4 text-slate-600">
                {paymentLabel(order.payment_method)}
              </td>

              <td className="px-3 py-4 font-semibold">
                {money(Number(order.amount_pkr))}
              </td>

              <td className="px-3 py-4">
                <span
                  className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-bold ${statusStyle(
                    order.order_status,
                  )}`}
                >
                  {String(order.order_status || "unknown").replace(
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
  );
}

export default async function AdminDashboardPage() {
  const { user, token } = await getSession();

  if (!user || !token) {
    redirect("/login");
  }

  const admin = await isAdmin(user.id, token);

  if (!admin) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#F4F6F9] px-4 py-16">
        <div className="w-full max-w-lg rounded-3xl border border-[#D5DDE7] bg-white p-9 text-center shadow-sm">
          <h1 className="text-2xl font-extrabold text-[#142B49]">
            Access Denied
          </h1>

          <p className="mt-3 text-sm text-slate-600">
            This account is not a SastaStore administrator.
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex rounded-xl bg-[#142B49] px-6 py-3 font-bold text-white transition hover:bg-[#0D1D33]"
          >
            Return to Store
          </Link>
        </div>
      </main>
    );
  }

  let orders: AdminOrder[] = [];
  let ordersAvailable = false;
  let registeredCustomers: number | null = null;

  // Fetch orders through the existing secure admin RPC.
  try {
    const response = await backend(
      "/rest/v1/rpc/admin_list_store_orders",
      {
        method: "POST",
        body: JSON.stringify({}),
      },
      token,
    );

    if (response.ok) {
      const data: unknown = await response.json();

      if (Array.isArray(data)) {
        orders = data as AdminOrder[];
        ordersAvailable = true;
      }
    } else {
      console.error("Admin orders fetch failed:", response.status);
    }
  } catch (error) {
    console.error("Admin orders fetch error:", error);
  }

  // Fetch registered customer statistics.
  try {
    const response = await backend(
      "/rest/v1/rpc/admin_customer_stats",
      {
        method: "POST",
        body: JSON.stringify({}),
      },
      token,
    );

    if (response.ok) {
      const data: unknown = await response.json();

      if (
        data !== null &&
        typeof data === "object" &&
        !Array.isArray(data) &&
        "registered_customers" in data
      ) {
        const count = Number(data.registered_customers);

        if (Number.isSafeInteger(count) && count >= 0) {
          registeredCustomers = count;
        }
      }
    } else {
      console.error(
        "Admin customer stats failed:",
        response.status,
      );
    }
  } catch (error) {
    console.error("Admin customer stats error:", error);
  }

  // All returned orders are treated equally.
  const pendingOrders = orders.filter(
    (order) =>
      order.payment_status === "submitted" &&
      order.order_status === "payment_review",
  );

  const approvedOrders = orders.filter(
    (order) => order.payment_status === "approved",
  );

  const verifiedRevenue = approvedOrders.reduce(
    (total, order) => {
      const amount = Number(order.amount_pkr);
      return total + (
        Number.isFinite(amount) && amount > 0 ? amount : 0
      );
    },
    0,
  );

  const recentOrders = sortNewest(orders).slice(0, 5);

  const stats = [
    {
      label: "Registered Customers",
      value:
        registeredCustomers === null
          ? "Unavailable"
          : registeredCustomers.toLocaleString("en-PK"),
      detail: "Registered customer accounts",
      accent: "text-[#29415F]",
    },
    {
      label: "Verified Revenue",
      value: ordersAvailable
        ? money(verifiedRevenue)
        : "Unavailable",
      detail: "Approved payments only",
      accent: "text-[#142B49]",
    },
    {
      label: "Total Orders",
      value: ordersAvailable
        ? orders.length.toString()
        : "Unavailable",
      detail: "Orders returned by the admin system",
      accent: "text-[#142B49]",
    },
    {
      label: "Pending Reviews",
      value: ordersAvailable
        ? pendingOrders.length.toString()
        : "Unavailable",
      detail: "Awaiting payment verification",
      accent: "text-amber-600",
    },
    {
      label: "Approved Payments",
      value: ordersAvailable
        ? approvedOrders.length.toString()
        : "Unavailable",
      detail: "Successfully approved orders",
      accent: "text-emerald-700",
    },
  ];

  return (
    <main className="min-h-screen flex-1 bg-gradient-to-br from-[#F4F6F9] via-[#E9EDF3] to-[#DCE3EC] px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* Dashboard Header */}
        <section className="flex flex-wrap items-center justify-between gap-5">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#536780]">
              SastaStore / Administration
            </p>

            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#142B49] sm:text-4xl">
              Dashboard Overview
            </h1>

            <p className="mt-3 text-sm text-slate-600">
              Manage your products, customers, payments and orders.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-xl border border-[#C8D2DF] bg-white px-5 py-3 text-sm font-semibold text-[#29415F] transition hover:bg-[#F1F4F8]"
            >
              View Website
            </Link>

            <Link
              href="/admin/orders"
              className="rounded-xl bg-[#142B49] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0D1D33]"
            >
              Manage Orders
              {pendingOrders.length > 0
                ? ` (${pendingOrders.length})`
                : ""}
            </Link>
          </div>
        </section>

        {/* Business Statistics */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {stats.map((stat) => (
            <article
              key={stat.label}
              className="rounded-2xl border border-[#DCE3EC] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <p className="text-sm font-semibold text-slate-500">
                {stat.label}
              </p>

              <h2
                className={`mt-4 break-words text-2xl font-extrabold ${stat.accent}`}
              >
                {stat.value}
              </h2>

              <p className="mt-2 text-xs text-slate-500">
                {stat.detail}
              </p>
            </article>
          ))}
        </section>

        <p className="text-xs leading-6 text-slate-500">
          Order and revenue statistics are based on the latest
          records returned by the admin order system. Verified
          revenue includes approved payments only. The current
          order endpoint is limited to its latest 200 records.
        </p>

        {!ordersAvailable && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <h2 className="font-extrabold text-amber-900">
              Order Statistics Unavailable
            </h2>

            <p className="mt-2 text-sm text-amber-800">
              The order listing could not be loaded.
              Product management remains available.
            </p>
          </div>
        )}

        {registeredCustomers === null && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <h2 className="font-extrabold text-amber-900">
              Customer Counter Unavailable
            </h2>

            <p className="mt-2 text-sm text-amber-800">
              Please check the admin_customer_stats function
              and authenticated admin permissions in Supabase.
            </p>
          </div>
        )}

        {/* Quick Actions */}
        <section className="grid gap-5 md:grid-cols-2">
          <a
            href="#manage-products"
            className="rounded-3xl border border-[#DCE3EC] bg-white p-7 shadow-sm transition hover:border-[#AEBBCC] hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E4EAF1] text-2xl">
              📦
            </div>

            <h2 className="mt-5 text-xl font-extrabold text-[#142B49]">
              Manage Products
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              Add products, edit listings, upload images and
              manage subscription pricing plans.
            </p>

            <span className="mt-5 inline-block text-sm font-bold text-[#142B49]">
              Open Product Manager →
            </span>
          </a>

          <Link
            href="/admin/orders"
            className="rounded-3xl border border-[#DCE3EC] bg-white p-7 shadow-sm transition hover:border-[#9EADBF] hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E4EAF1] text-2xl">
              🧾
            </div>

            <h2 className="mt-5 text-xl font-extrabold text-[#142B49]">
              Manage Orders
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              Review payment proofs, approve payments and
              manage customer orders.
            </p>

            <span className="mt-5 inline-block text-sm font-bold text-[#29415F]">
              Open Order Manager →
            </span>
          </Link>
        </section>

        {/* Recent Customer Orders */}
        <section className="rounded-3xl border border-[#DCE3EC] bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-[#142B49]">
                Customer Activity
              </p>

              <h2 className="mt-2 text-xl font-extrabold text-[#142B49] sm:text-2xl">
                Recent Customer Orders
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Latest orders received by SastaStore.
              </p>
            </div>

            <Link
              href="/admin/orders"
              className="text-sm font-bold text-[#142B49] hover:underline"
            >
              View All Orders →
            </Link>
          </div>

          <OrdersTable
            orders={recentOrders}
            emptyMessage={
              ordersAvailable
                ? "No customer orders found."
                : "Order data is unavailable."
            }
          />
        </section>

        {/* Product Management */}
        <section
          id="manage-products"
          className="scroll-mt-24 rounded-3xl border border-[#DCE3EC] bg-white p-5 shadow-sm sm:p-8"
        >
          <div className="mb-7">
            <h2 className="text-2xl font-extrabold text-[#142B49]">
              Product Management
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Add, edit and manage digital products, images
              and subscription prices.
            </p>
          </div>

          <ProductManager />
        </section>

      </div>
    </main>
  );
}
