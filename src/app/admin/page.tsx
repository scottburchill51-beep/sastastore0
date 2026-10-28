
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

const TEST_TRACKING_IDS = [
  "SS-C79151B6B922",
  "SS-3034F11C070F",
  "SS-C7DEE13C3385",
  "SS-D7586820EA9F",
] as const;

const testOrderIds = new Set<string>(
  TEST_TRACKING_IDS,
);

function isTestOrder(order: AdminOrder) {
  return testOrderIds.has(
    String(order.tracking_id || "")
      .trim()
      .toUpperCase(),
  );
}

function money(amount: number) {
  return `PKR ${(Number.isFinite(amount) ? amount : 0)
    .toLocaleString("en-PK", {
      maximumFractionDigits: 2,
    })}`;
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
      return "border-blue-200 bg-blue-50 text-blue-700";
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
      <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-9 text-center text-sm text-slate-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="mt-6 overflow-x-auto">
      <table className="w-full min-w-[700px] text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
            <th className="px-3 py-4 font-semibold">
              Tracking ID
            </th>
            <th className="px-3 py-4 font-semibold">
              Customer / Product
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
          {orders.map((order) => (
            <tr
              key={order.order_id}
              className="border-b border-slate-100 last:border-0"
            >
              <td className="px-3 py-4 font-bold text-blue-700">
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
                  {String(order.order_status || "unknown")
                    .replace(/_/g, " ")}
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
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4 py-16">
        <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-9 text-center shadow-sm">
          <h1 className="text-2xl font-extrabold">
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

  let registeredCustomers: number | null = null;

  // Existing secure admin order listing.
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
      console.error(
        "Admin orders fetch failed:",
        response.status,
      );
    }
  } catch (error) {
    console.error(
      "Admin orders fetch error:",
      error,
    );
  }

  // New secure admin-only customer counter.
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
        const count = Number(
          data.registered_customers,
        );

        if (
          Number.isSafeInteger(count) &&
          count >= 0
        ) {
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
    console.error(
      "Admin customer stats error:",
      error,
    );
  }

  // Test orders are separated from real orders
  // without changing or deleting database records.
  const testOrders = orders.filter(isTestOrder);

  const realOrders = orders.filter(
    (order) => !isTestOrder(order),
  );

  const pendingOrders = realOrders.filter(
    (order) =>
      order.payment_status === "submitted" &&
      order.order_status === "payment_review",
  );

  const approvedOrders = realOrders.filter(
    (order) => order.payment_status === "approved",
  );

  const verifiedRevenue = approvedOrders.reduce(
    (total, order) =>
      total + Number(order.amount_pkr || 0),
    0,
  );

  const recentOrders = sortNewest(realOrders).slice(
    0,
    5,
  );

  const sortedTestOrders = sortNewest(testOrders);

  const missingTestIds = TEST_TRACKING_IDS.filter(
    (id) =>
      !testOrders.some(
        (order) =>
          String(order.tracking_id || "")
            .toUpperCase() === id,
      ),
  );

  const stats = [
    {
      label: "Registered Customers",
      value:
        registeredCustomers === null
          ? "Unavailable"
          : registeredCustomers.toLocaleString("en-PK"),
      detail: "Customer accounts, excluding admins",
      accent: "text-indigo-600",
    },
    {
      label: "Verified Revenue",
      value: ordersAvailable
        ? money(verifiedRevenue)
        : "Unavailable",
      detail: "Approved real orders only",
      accent: "text-emerald-600",
    },
    {
      label: "Real Orders",
      value: ordersAvailable
        ? realOrders.length.toString()
        : "Unavailable",
      detail: "Excludes designated test orders",
      accent: "text-blue-600",
    },
    {
      label: "Pending Reviews",
      value: ordersAvailable
        ? pendingOrders.length.toString()
        : "Unavailable",
      detail: "Real orders awaiting payment review",
      accent: "text-amber-600",
    },
    {
      label: "Approved Payments",
      value: ordersAvailable
        ? approvedOrders.length.toString()
        : "Unavailable",
      detail: "Approved real-order payments",
      accent: "text-violet-600",
    },
  ];

  return (
    <main className="min-h-screen flex-1 bg-gradient-to-br from-[#F8FAFC] via-[#EFF7FF] to-[#E8FBF4] px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* Dashboard Header */}
        <section className="flex flex-wrap items-center justify-between gap-5">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-widest text-blue-600">
              SastaStore / Administration
            </p>

            <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Dashboard Overview
            </h1>

            <p className="mt-3 text-sm text-slate-600">
              Manage products, customers, payments,
              real orders and test orders.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-xl border border-blue-200 bg-white px-5 py-3 text-sm font-semibold text-blue-700 hover:bg-blue-50"
            >
              View Website
            </Link>

            <Link
              href="/admin/orders"
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
            >
              Manage Orders
              {pendingOrders.length > 0
                ? ` (${pendingOrders.length})`
                : ""}
            </Link>
          </div>
        </section>

        {/* Live Business Statistics */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {stats.map((stat) => (
            <article
              key={stat.label}
              className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm"
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
          Registered Customers comes from the
          secure Supabase admin customer stats
          function. Order and revenue statistics
          use the existing admin orders API,
          currently limited to the latest 200
          orders. Designated test orders are
          excluded from business statistics.
        </p>

        {!ordersAvailable && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <h2 className="font-extrabold text-amber-900">
              Order Statistics Unavailable
            </h2>
            <p className="mt-2 text-sm text-amber-800">
              The order listing could not be
              loaded. Product management remains
              available.
            </p>
          </div>
        )}

        {registeredCustomers === null && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <h2 className="font-extrabold text-amber-900">
              Customer Counter Unavailable
            </h2>
            <p className="mt-2 text-sm text-amber-800">
              Please check the admin_customer_stats
              function and the authenticated
              admin permissions in Supabase.
            </p>
          </div>
        )}

        {/* Quick Actions */}
        <section className="grid gap-5 md:grid-cols-2">
          <a
            href="#manage-products"
            className="rounded-3xl border border-blue-100 bg-white p-7 shadow-sm transition hover:border-blue-300 hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-2xl">
              📦
            </div>

            <h2 className="mt-5 text-xl font-extrabold">
              Manage Products
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              Add products, edit listings,
              upload product images and manage
              subscription pricing plans.
            </p>

            <span className="mt-5 inline-block text-sm font-bold text-blue-600">
              Open Product Manager →
            </span>
          </a>

          <Link
            href="/admin/orders"
            className="rounded-3xl border border-emerald-100 bg-white p-7 shadow-sm transition hover:border-emerald-300 hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-2xl">
              🧾
            </div>

            <h2 className="mt-5 text-xl font-extrabold">
              Manage Orders
            </h2>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              Review customer payment proofs,
              approve payments and deliver
              customer orders.
            </p>

            <span className="mt-5 inline-block text-sm font-bold text-emerald-700">
              Open Order Manager →
            </span>
          </Link>
        </section>

        {/* Real Customer Orders */}
        <section className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-blue-600">
                Real Customer Activity
              </p>

              <h2 className="mt-2 text-xl font-extrabold sm:text-2xl">
                Recent Customer Orders
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Test orders are excluded.
              </p>
            </div>

            <Link
              href="/admin/orders"
              className="text-sm font-bold text-blue-600 hover:underline"
            >
              View All Orders →
            </Link>
          </div>

          <OrdersTable
            orders={recentOrders}
            emptyMessage={
              ordersAvailable
                ? "No real customer orders found in the loaded records."
                : "Order data is unavailable."
            }
          />
        </section>

        {/* Test Orders */}
        <section
          id="test-orders"
          className="scroll-mt-24 overflow-hidden rounded-3xl border-2 border-amber-200 bg-white shadow-sm"
        >
          <div className="border-b border-amber-200 bg-amber-50 p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="inline-flex rounded-full border border-amber-300 bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-amber-800">
                  Testing Only
                </span>

                <h2 className="mt-4 text-2xl font-extrabold">
                  Test Orders
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-amber-900">
                  These four designated testing
                  orders are excluded from the
                  real-order dashboard statistics.
                </p>
              </div>

              <div className="rounded-2xl border border-amber-200 bg-white px-6 py-4 text-center">
                <p className="text-xs font-bold uppercase text-amber-700">
                  Test Orders Found
                </p>

                <p className="mt-2 text-3xl font-extrabold text-amber-900">
                  {ordersAvailable
                    ? testOrders.length
                    : "—"}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Of 4 designated
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <OrdersTable
              orders={sortedTestOrders}
              emptyMessage={
                ordersAvailable
                  ? "No designated test orders found in the loaded records."
                  : "Test order data is unavailable."
              }
            />

            {ordersAvailable &&
              missingTestIds.length > 0 && (
                <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5">
                  <h3 className="text-sm font-extrabold text-amber-900">
                    Test Orders Not in Loaded Records
                  </h3>

                  <p className="mt-2 text-xs leading-6 text-amber-800">
                    These orders were not returned
                    by the current order list.
                    They have not been deleted
                    by this dashboard.
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {missingTestIds.map((id) => (
                      <span
                        key={id}
                        className="rounded-lg border border-amber-200 bg-white px-3 py-2 font-mono text-xs font-semibold text-amber-900"
                      >
                        {id}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            <p className="mt-6 text-xs leading-6 text-slate-500">
              Test classification affects this
              dashboard only. Original database
              records, payments and order statuses
              remain unchanged. Test orders may
              still appear in the existing order
              manager and customer history.
            </p>

            <Link
              href="/admin/orders"
              className="mt-5 inline-flex rounded-xl border border-amber-200 bg-amber-50 px-5 py-3 text-sm font-bold text-amber-900 hover:bg-amber-100"
            >
              Open Order Manager
            </Link>
          </div>
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
              Add, edit and manage digital products,
              images and subscription prices.
            </p>
          </div>

          <ProductManager />
        </section>
      </div>
    </main>
  );
}
