
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

type Order = {
  id: string;
  tracking_id: string;
  product_slug: string;
  product_name: string;
  plan_id?: string;
  plan_name: string;
  amount_pkr: number | string;
  payment_method: string;
  payment_status: string;
  order_status: string;
  created_at: string;
  updated_at?: string;
};

function statusLabel(status: string) {
  const labels: Record<string, string> = {
    pending_payment: "Awaiting Payment",
    payment_review: "Payment Under Review",
    approved: "Payment Approved",
    processing: "Preparing Delivery",
    delivered: "Delivered",
    cancelled: "Cancelled",
    pending: "Payment Pending",
    submitted: "Receipt Submitted",
    rejected: "Payment Rejected",
    refunded: "Refunded",
  };

  return (
    labels[status] ||
    status.replace(/_/g, " ")
  );
}

function statusColor(status: string) {
  if (status === "delivered" || status === "approved") {
    return "bg-emerald-50 text-emerald-700 border-emerald-200";
  }

  if (
    status === "cancelled" ||
    status === "rejected"
  ) {
    return "bg-red-50 text-red-700 border-red-200";
  }

  return "bg-amber-50 text-amber-700 border-amber-200";
}

function formatMoney(amount: number | string) {
  const value = Number(amount);

  return Number.isFinite(value)
    ? `PKR ${value.toLocaleString("en-PK")}`
    : "Price unavailable";
}

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const loadOrders = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/orders", {
        method: "GET",
        credentials: "same-origin",
        cache: "no-store",
      });

      if (response.status === 401) {
        setUnauthorized(true);
        setOrders([]);
        return;
      }

      if (!response.ok) {
        throw new Error("Could not load your orders.");
      }

      const data = await response.json();

      if (!Array.isArray(data.orders)) {
        throw new Error("Invalid order response.");
      }

      setUnauthorized(false);
      setOrders(data.orders);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadOrders();
  }, [loadOrders]);

  const query = search.trim().toLowerCase();

  const filteredOrders = orders.filter((order) => {
    if (!query) return true;

    return [
      order.tracking_id,
      order.product_name,
      order.plan_name,
      order.order_status,
    ]
      .filter(Boolean)
      .some((value) =>
        value.toLowerCase().includes(query),
      );
  });

  const awaitingReview = orders.filter(
    (order) => order.order_status === "payment_review",
  ).length;

  const delivered = orders.filter(
    (order) => order.order_status === "delivered",
  ).length;

  if (unauthorized) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-lg rounded-3xl border border-blue-100 bg-white p-10 text-center shadow-sm">
          <h1 className="text-2xl font-extrabold text-slate-900">
            Sign In Required
          </h1>

          <p className="mt-3 text-slate-600">
            Please sign in to view your orders
            and tracking information.
          </p>

          <Link
            href="/login"
            className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-bold text-white"
          >
            Sign In
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 px-4 py-12 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/account"
          className="text-sm font-semibold text-blue-600 hover:underline"
        >
          ← My Account
        </Link>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
              SastaStore Account
            </p>

            <h1 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              My Orders & Tracking
            </h1>

            <p className="mt-3 text-sm text-slate-600">
              Track your payments, approvals,
              and digital product deliveries.
            </p>
          </div>

          <button
            type="button"
            onClick={() => void loadOrders()}
            disabled={loading}
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Refresh Orders"}
          </button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            ["Total Orders", orders.length],
            ["Payment Reviews", awaitingReview],
            ["Delivered Orders", delivered],
          ].map(([label, count]) => (
            <div
              key={String(label)}
              className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm"
            >
              <p className="text-sm font-semibold text-slate-500">
                {label}
              </p>

              <p className="mt-3 text-3xl font-extrabold text-blue-600">
                {count}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
          <label
            htmlFor="tracking-search"
            className="text-sm font-bold"
          >
            Search Tracking ID or Product
          </label>

          <input
            id="tracking-search"
            type="search"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="SS-XXXXXXXXXXXX"
            className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
          />
        </div>

        {error && (
          <div
            role="alert"
            className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        {loading ? (
          <div className="mt-7 rounded-2xl bg-white p-10 text-center text-slate-600">
            Loading your orders...
          </div>
        ) : !error && filteredOrders.length === 0 ? (
          <div className="mt-7 rounded-3xl border border-blue-100 bg-white p-10 text-center shadow-sm">
            <h2 className="text-xl font-bold">
              {orders.length === 0
                ? "No Orders Yet"
                : "No Matching Orders"}
            </h2>

            <p className="mt-3 text-sm text-slate-500">
              {orders.length === 0
                ? "Once you place an order, its tracking information will appear here."
                : "Try searching for another tracking ID or product."}
            </p>

            <Link
              href="/products"
              className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="mt-7 space-y-5">
            {filteredOrders.map((order) => (
              <article
                key={order.id}
                className="overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 bg-slate-50 px-6 py-5">
                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-500">
                      Tracking ID
                    </p>

                    <p className="mt-1 break-all text-lg font-extrabold text-blue-700">
                      {order.tracking_id}
                    </p>
                  </div>

                  <span
                    className={`rounded-full border px-3 py-2 text-xs font-bold ${statusColor(
                      order.order_status,
                    )}`}
                  >
                    {statusLabel(order.order_status)}
                  </span>
                </div>

                <div className="grid gap-5 p-6 sm:grid-cols-2">
                  <div>
                    <p className="text-xs text-slate-500">
                      Subscription
                    </p>
                    <p className="mt-1 text-lg font-bold">
                      {order.product_name}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      {order.plan_name}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      Total Amount
                    </p>
                    <p className="mt-1 text-xl font-extrabold text-blue-600">
                      {formatMoney(order.amount_pkr)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      Payment Status
                    </p>
                    <p className="mt-1 font-semibold">
                      {statusLabel(order.payment_status)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      Ordered On
                    </p>
                    <p className="mt-1 font-semibold">
                      {new Date(
                        order.created_at,
                      ).toLocaleDateString("en-PK")}
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-100 bg-slate-50 px-6 py-5">
                  <p className="text-sm font-bold text-slate-800">
                    Latest Update
                  </p>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {order.order_status === "pending_payment"
                      ? "Your order has been created. Payment submission is pending."
                      : order.order_status === "payment_review"
                        ? "Your payment receipt has been submitted and is awaiting admin verification."
                        : order.order_status === "approved"
                          ? "Your payment has been approved. Your subscription is awaiting fulfillment."
                          : order.order_status === "processing"
                            ? "Our team is preparing your digital subscription."
                            : order.order_status === "delivered"
                              ? "Your digital order has been marked as delivered."
                              : "This order is not currently being processed. Contact support if needed."}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-8 rounded-2xl border border-blue-100 bg-white p-5 text-sm leading-6 text-slate-600">
          <strong className="text-slate-900">
            About Active Subscriptions:
          </strong>{" "}
          Delivered orders do not automatically mean an
          active subscription. Activation dates, expiry
          dates, and subscription access will appear after
          the subscription fulfillment system is enabled.
        </div>
      </div>
    </main>
  );
}
