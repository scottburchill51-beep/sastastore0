
import Link from "next/link";
import { redirect } from "next/navigation";

import {
  backend,
  getSession,
  isAdmin,
} from "@/lib/store-backend";

import { LogoutButton } from "@/components/auth/LogoutButton";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "My Account | SastaStore",
  robots: {
    index: false,
    follow: false,
  },
};

type CustomerOrder = {
  id: string;
  tracking_id: string;
  product_name: string;
  plan_name: string;
  amount_pkr: number | string;
  payment_method: string;
  payment_status: string;
  order_status: string;
  created_at: string;
  subscription_activated_at: string | null;
  subscription_expires_at: string | null;
};

const orderLabels: Record<string, string> = {
  pending_payment: "Awaiting Payment",
  payment_review: "Payment Under Review",
  approved: "Awaiting Delivery",
  processing: "Preparing Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const paymentLabels: Record<string, string> = {
  pending: "Pending",
  submitted: "Under Review",
  approved: "Approved",
  rejected: "Rejected",
  refunded: "Refunded",
};

function money(amount: number | string) {
  const value = Number(amount);

  if (!Number.isFinite(value)) {
    return "Unavailable";
  }

  return `PKR ${value.toLocaleString("en-PK")}`;
}

function dateLabel(value: string | null | undefined) {
  if (!value) return "Not available";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not available";
  }

  return date.toLocaleDateString("en-PK", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getSubscriptionStatus(
  order: CustomerOrder,
  now: number,
) {
  if (
    order.payment_status !== "approved" ||
    order.order_status !== "delivered" ||
    !order.subscription_activated_at ||
    !order.subscription_expires_at
  ) {
    return "not-activated" as const;
  }

  const start = new Date(
    order.subscription_activated_at,
  ).getTime();

  const end = new Date(
    order.subscription_expires_at,
  ).getTime();

  if (
    !Number.isFinite(start) ||
    !Number.isFinite(end) ||
    end <= start
  ) {
    return "not-activated" as const;
  }

  if (start > now) {
    return "not-activated" as const;
  }

  return end > now
    ? ("active" as const)
    : ("expired" as const);
}

function daysRemaining(
  expiry: string,
  now: number,
) {
  const milliseconds =
    new Date(expiry).getTime() - now;

  return Math.max(
    0,
    Math.ceil(milliseconds / 86400000),
  );
}

function orderStatusColor(status: string) {
  if (status === "delivered") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (status === "cancelled") {
    return "border-red-200 bg-red-50 text-red-700";
  }

  if (
    status === "approved" ||
    status === "processing"
  ) {
    return "border-blue-200 bg-blue-50 text-blue-700";
  }

  return "border-amber-200 bg-amber-50 text-amber-700";
}

export default async function AccountPage() {
  const { user, token } = await getSession();

  if (!user || !token) {
    redirect("/login");
  }

  if (await isAdmin(user.id, token)) {
    redirect("/admin");
  }

  let orders: CustomerOrder[] = [];
  let ordersError = false;

  try {
    const query = new URLSearchParams({
      user_id: `eq.${user.id}`,
      select: [
        "id",
        "tracking_id",
        "product_name",
        "plan_name",
        "amount_pkr",
        "payment_method",
        "payment_status",
        "order_status",
        "created_at",
        "subscription_activated_at",
        "subscription_expires_at",
      ].join(","),
      order: "created_at.desc",
    });

    const response = await backend(
      `/rest/v1/store_orders?${query.toString()}`,
      {
        method: "GET",
        cache: "no-store",
      },
      token,
    );

    if (!response.ok) {
      console.error(
        "Customer orders request failed:",
        response.status,
      );
      ordersError = true;
    } else {
      const result: unknown = await response.json();

      if (Array.isArray(result)) {
        orders = result as CustomerOrder[];
      } else {
        ordersError = true;
      }
    }
  } catch (error) {
    console.error(
      "Unable to load customer orders:",
      error,
    );

    ordersError = true;
  }

  const now = Date.now();

  const activeSubscriptions = orders.filter(
    (order) =>
      getSubscriptionStatus(order, now) === "active",
  );

  const expiredSubscriptions = orders.filter(
    (order) =>
      getSubscriptionStatus(order, now) === "expired",
  );

  const awaitingDelivery = orders.filter(
    (order) =>
      order.payment_status === "approved" &&
      ["approved", "processing"].includes(
        order.order_status,
      ),
  );

  const deliveredWithoutActivation = orders.filter(
    (order) =>
      order.order_status === "delivered" &&
      getSubscriptionStatus(order, now) ===
        "not-activated",
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-6xl space-y-8">

        {/* Dashboard Header */}
        <section>
          <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
            SASTASTORE ACCOUNT
          </p>

          <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            My Dashboard
          </h1>

          <p className="mt-3 text-sm text-slate-600">
            Your orders, subscription status,
            payment tracking and account details.
          </p>
        </section>

        {/* Account Details */}
        <section className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div>
              <p className="text-sm text-slate-500">
                Signed in as
              </p>

              <p className="mt-2 break-all text-lg font-extrabold">
                {user.email || "SastaStore Customer"}
              </p>

              <p className="mt-2 text-sm font-semibold text-emerald-600">
                Account authenticated
              </p>
            </div>

            <LogoutButton />
          </div>
        </section>

        {/* Statistics */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Total Orders",
              value: orders.length,
            },
            {
              title: "Active Subscriptions",
              value: activeSubscriptions.length,
            },
            {
              title: "Awaiting Delivery",
              value: awaitingDelivery.length,
            },
            {
              title: "Expired Subscriptions",
              value: expiredSubscriptions.length,
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm"
            >
              <p className="text-sm font-semibold text-slate-500">
                {item.title}
              </p>

              <p className="mt-3 text-3xl font-extrabold text-blue-600">
                {ordersError ? "—" : item.value}
              </p>
            </div>
          ))}
        </section>

        {ordersError && (
          <div
            role="alert"
            className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-700"
          >
            Unable to load your account orders.
            Please refresh the page or contact support.
          </div>
        )}

        {/* Active Subscriptions */}
        <section
          id="subscriptions"
          className="scroll-mt-24 rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">
              Subscription Management
            </p>

            <h2 className="mt-2 text-2xl font-extrabold">
              My Active Subscriptions
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              View your activated digital subscriptions
              and their expiry dates.
            </p>
          </div>

          {!ordersError &&
            activeSubscriptions.length === 0 && (
              <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
                <p className="text-lg font-bold">
                  No Active Subscriptions Yet
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  After your payment is approved,
                  the admin must deliver and activate
                  your subscription.
                  Your active plan will then appear here.
                </p>
              </div>
            )}

          {!ordersError &&
            activeSubscriptions.length > 0 && (
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {activeSubscriptions.map((order) => {
                  const remaining = daysRemaining(
                    order.subscription_expires_at!,
                    now,
                  );

                  return (
                    <article
                      key={order.id}
                      className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <h3 className="text-xl font-extrabold">
                          {order.product_name}
                        </h3>

                        <span className="rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white">
                          Active
                        </span>
                      </div>

                      <p className="mt-2 text-sm font-semibold text-slate-600">
                        {order.plan_name}
                      </p>

                      <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        <div>
                          <p className="text-xs text-slate-500">
                            Activated On
                          </p>
                          <p className="mt-1 font-bold">
                            {dateLabel(
                              order.subscription_activated_at,
                            )}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-slate-500">
                            Expires On
                          </p>
                          <p className="mt-1 font-bold">
                            {dateLabel(
                              order.subscription_expires_at,
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 rounded-xl border border-emerald-100 bg-white p-4">
                        <p className="text-xs text-slate-500">
                          Time Remaining
                        </p>

                        <p className="mt-1 text-2xl font-extrabold text-emerald-700">
                          {remaining}{" "}
                          {remaining === 1
                            ? "Day"
                            : "Days"}
                        </p>
                      </div>

                      <p className="mt-4 break-all text-xs text-slate-500">
                        Tracking ID: {order.tracking_id}
                      </p>
                    </article>
                  );
                })}
              </div>
            )}
        </section>

        {/* Expired Subscriptions */}
        {!ordersError &&
          expiredSubscriptions.length > 0 && (
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-extrabold">
                Expired Subscriptions
              </h2>

              <div className="mt-5 space-y-3">
                {expiredSubscriptions.map((order) => (
                  <div
                    key={order.id}
                    className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <div>
                      <p className="font-bold">
                        {order.product_name}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {order.plan_name}
                      </p>

                      <p className="mt-2 text-xs text-slate-500">
                        Expired:{" "}
                        {dateLabel(
                          order.subscription_expires_at,
                        )}
                      </p>
                    </div>

                    <span className="rounded-full bg-slate-200 px-3 py-2 text-xs font-bold text-slate-700">
                      Expired
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

        {/* Awaiting Delivery */}
        {!ordersError &&
          awaitingDelivery.length > 0 && (
            <section className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-2xl font-extrabold">
                Awaiting Subscription Delivery
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Payment has been approved.
                Your subscription is awaiting delivery
                and activation.
              </p>

              <div className="mt-5 space-y-3">
                {awaitingDelivery.map((order) => (
                  <div
                    key={order.id}
                    className="rounded-2xl border border-blue-100 bg-blue-50/50 p-5"
                  >
                    <p className="font-bold">
                      {order.product_name}
                    </p>

                    <p className="mt-1 text-sm text-slate-600">
                      {order.plan_name}
                    </p>

                    <p className="mt-3 text-xs font-semibold text-blue-700">
                      Payment Approved — Awaiting Activation
                    </p>

                    <p className="mt-2 break-all text-xs text-slate-500">
                      Tracking ID: {order.tracking_id}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

        {/* Older delivered orders without dates */}
        {!ordersError &&
          deliveredWithoutActivation.length > 0 && (
            <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
              <h2 className="font-extrabold text-amber-900">
                Subscription Dates Not Recorded
              </h2>

              <p className="mt-2 text-sm text-amber-800">
                Some orders were marked delivered
                without recorded activation and expiry
                dates. Contact support to confirm their
                subscription status.
              </p>
            </section>
          )}

        {/* Orders & Tracking */}
        <section
          id="my-orders"
          className="scroll-mt-24 rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold">
                My Orders & Tracking
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Track orders, payments and deliveries.
              </p>
            </div>

            <Link
              href="/products"
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
            >
              Browse Products
            </Link>
          </div>

          {!ordersError && orders.length === 0 && (
            <div className="mt-6 rounded-2xl bg-slate-50 p-8 text-center">
              <p className="font-bold">
                No Orders Yet
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Your order tracking information
                will appear here after purchase.
              </p>
            </div>
          )}

          {!ordersError && orders.length > 0 && (
            <div className="mt-6 space-y-4">
              {orders.map((order) => (
                <article
                  key={order.id}
                  className="overflow-hidden rounded-2xl border border-slate-200"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 px-5 py-4">
                    <div>
                      <p className="text-xs font-semibold text-slate-500">
                        Tracking ID
                      </p>

                      <p className="mt-1 break-all font-extrabold text-blue-700">
                        {order.tracking_id}
                      </p>
                    </div>

                    <span
                      className={`rounded-full border px-3 py-1.5 text-xs font-bold ${orderStatusColor(
                        order.order_status,
                      )}`}
                    >
                      {orderLabels[
                        order.order_status
                      ] || order.order_status}
                    </span>
                  </div>

                  <div className="grid gap-5 p-5 sm:grid-cols-2">
                    <div>
                      <p className="text-xs text-slate-500">
                        Product
                      </p>

                      <p className="mt-1 font-bold">
                        {order.product_name}
                      </p>

                      <p className="mt-1 text-sm text-slate-600">
                        {order.plan_name}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">
                        Amount
                      </p>

                      <p className="mt-1 font-bold text-blue-600">
                        {money(order.amount_pkr)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">
                        Payment Status
                      </p>

                      <p className="mt-1 text-sm font-semibold">
                        {paymentLabels[
                          order.payment_status
                        ] || order.payment_status}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">
                        Order Date
                      </p>

                      <p className="mt-1 text-sm font-semibold">
                        {dateLabel(order.created_at)}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Support */}
        <section className="rounded-2xl border border-blue-100 bg-white p-6">
          <h2 className="font-extrabold">
            Need Help?
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Contact support with your Tracking ID
            for payment, delivery or subscription help.
          </p>

          <Link
            href="/contact"
            className="mt-4 inline-flex text-sm font-bold text-blue-600 hover:underline"
          >
            Contact Support →
          </Link>
        </section>
      </div>
    </main>
  );
}
