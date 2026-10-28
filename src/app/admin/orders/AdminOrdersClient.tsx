
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

type StoreOrder = {
  order_id: string;
  tracking_id: string;
  customer_name: string;
  customer_email: string;
  whatsapp_number: string;
  product_name: string;
  plan_name: string;
  amount_pkr: number;
  payment_method: string;
  payment_reference: string | null;
  payment_status: string;
  order_status: string;
  receipt_path: string | null;
  created_at: string;
};

type Filter =
  | "review"
  | "approved"
  | "delivered"
  | "all"
  | "rejected";

function money(amount: number) {
  return `PKR ${Number(amount).toLocaleString("en-PK")}`;
}

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? "Unknown"
    : date.toLocaleString("en-PK");
}

function statusName(status: string) {
  const labels: Record<string, string> = {
    pending_payment: "Awaiting Payment",
    payment_review: "Payment Under Review",
    approved: "Payment Approved",
    processing: "Preparing Delivery",
    delivered: "Delivered",
    cancelled: "Cancelled",
  };
  return labels[status] || status.replace(/_/g, " ");
}

async function readResponse(response: Response) {
  const raw = await response.text();

  try {
    return JSON.parse(raw) as {
      error?: string;
      success?: boolean;
      orders?: StoreOrder[];
      activation?: unknown;
    };
  } catch {
    throw new Error(
      `Server returned an invalid response (HTTP ${response.status}).`,
    );
  }
}

export default function AdminOrdersClient() {
  const [orders, setOrders] = useState<StoreOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState("");
  const [filter, setFilter] = useState<Filter>("review");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [receiptId, setReceiptId] = useState("");

  const [notes, setNotes] = useState<Record<string, string>>({});
  const [expiryDates, setExpiryDates] = useState<
    Record<string, string>
  >({});
  const [deliveredChecks, setDeliveredChecks] = useState<
    Record<string, boolean>
  >({});
  const [confirmId, setConfirmId] = useState("");

  const loadOrders = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/admin/orders", {
        method: "GET",
        credentials: "same-origin",
        cache: "no-store",
      });

      const data = await readResponse(response);

      if (!response.ok) {
        throw new Error(
          data.error || `Orders request failed (${response.status}).`,
        );
      }

      if (!Array.isArray(data.orders)) {
        throw new Error("Unexpected orders response.");
      }

      setOrders(data.orders);
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Could not load orders.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadOrders();
  }, [loadOrders]);

  const needsReview = orders.filter(
    (o) =>
      o.payment_status === "submitted" &&
      o.order_status === "payment_review",
  );

  const awaitingDelivery = orders.filter(
    (o) =>
      o.payment_status === "approved" &&
      ["approved", "processing"].includes(o.order_status),
  );

  const delivered = orders.filter(
    (o) => o.order_status === "delivered",
  );

  const rejected = orders.filter(
    (o) => o.payment_status === "rejected",
  );

  const shown = orders.filter((o) => {
    if (filter === "review") {
      return (
        o.payment_status === "submitted" &&
        o.order_status === "payment_review"
      );
    }

    if (filter === "approved") {
      return (
        o.payment_status === "approved" &&
        ["approved", "processing"].includes(o.order_status)
      );
    }

    if (filter === "delivered") {
      return o.order_status === "delivered";
    }

    if (filter === "rejected") {
      return o.payment_status === "rejected";
    }

    return true;
  });

  async function review(
    order: StoreOrder,
    decision: "approve" | "reject",
  ) {
    const note = notes[order.order_id]?.trim() || "";

    if (decision === "reject" && !note) {
      setError("Enter a rejection reason first.");
      return;
    }

    const question =
      decision === "approve"
        ? `Confirm you received ${money(order.amount_pkr)} in your bank or SadaPay account for ${order.tracking_id}?`
        : `Reject payment for ${order.tracking_id}?`;

    if (!window.confirm(question)) return;

    setError("");
    setMessage("");
    setBusyId(order.order_id);

    try {
      const response = await fetch("/api/admin/orders", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: order.order_id,
          decision,
          note,
        }),
      });

      const data = await readResponse(response);

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Payment review failed.");
      }

      setMessage(
        `${order.tracking_id}: Payment ${decision === "approve" ? "approved" : "rejected"}.`,
      );

      await loadOrders();
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Payment review failed.",
      );
    } finally {
      setBusyId("");
    }
  }

  function prepareActivation(order: StoreOrder) {
    setError("");
    setMessage("");

    const expiryInput = expiryDates[order.order_id];

    if (!expiryInput) {
      setError("Select the subscription expiry date and time.");
      return;
    }

    const expiry = new Date(expiryInput);

    if (
      !Number.isFinite(expiry.getTime()) ||
      expiry.getTime() <= Date.now()
    ) {
      setError("Expiry date must be in the future.");
      return;
    }

    if (deliveredChecks[order.order_id] !== true) {
      setError("Confirm the customer has received real access.");
      return;
    }

    if (
      order.payment_status !== "approved" ||
      !["approved", "processing"].includes(order.order_status)
    ) {
      setError("Only approved orders can be activated.");
      return;
    }

    // Inline confirmation instead of a browser popup.
    setConfirmId(order.order_id);
  }

  async function activate(order: StoreOrder) {
    if (busyId || confirmId !== order.order_id) return;

    setError("");
    setMessage("");
    setBusyId(order.order_id);

    try {
      const expiryInput = expiryDates[order.order_id];

      if (!expiryInput) {
        throw new Error("Expiry date is required.");
      }

      if (deliveredChecks[order.order_id] !== true) {
        throw new Error("Delivery confirmation is required.");
      }

      const expiry = new Date(expiryInput);

      if (
        !Number.isFinite(expiry.getTime()) ||
        expiry.getTime() <= Date.now()
      ) {
        throw new Error("Choose a future expiry date.");
      }

      const response = await fetch(
        "/api/admin/orders/activate",
        {
          method: "POST",
          credentials: "same-origin",
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId: order.order_id,
            expiresAt: expiry.toISOString(),
            confirmDelivered: true,
          }),
        },
      );

      const data = await readResponse(response);

      if (!response.ok || data.success !== true) {
        throw new Error(
          data.error ||
            `Activation failed (HTTP ${response.status}).`,
        );
      }

      setMessage(
        `${order.tracking_id}: Subscription successfully activated and delivered.`,
      );

      setConfirmId("");

      setDeliveredChecks((old) => ({
        ...old,
        [order.order_id]: false,
      }));

      setExpiryDates((old) => ({
        ...old,
        [order.order_id]: "",
      }));

      await loadOrders();
      setFilter("delivered");
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Unknown activation error.",
      );
    } finally {
      setBusyId("");
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
              SASTASTORE ADMIN
            </p>
            <h1 className="mt-2 text-3xl font-extrabold">
              Orders & Subscription Delivery
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Verify payments and confirm actual digital delivery.
            </p>
          </div>

          <div className="flex gap-2">
            <Link
              href="/admin"
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold"
            >
              Admin Home
            </Link>
            <button
              type="button"
              disabled={loading || Boolean(busyId)}
              onClick={() => {
                setError("");
                void loadOrders();
              }}
              className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white disabled:opacity-50"
            >
              Refresh
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Pending Review", needsReview.length],
            ["Awaiting Delivery", awaitingDelivery.length],
            ["Delivered", delivered.length],
            ["Rejected", rejected.length],
          ].map(([label, count]) => (
            <div
              key={String(label)}
              className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm"
            >
              <p className="text-sm text-slate-500">{label}</p>
              <p className="mt-2 text-3xl font-extrabold">
                {count}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {(
            [
              ["review", "Needs Review"],
              ["approved", "Awaiting Delivery"],
              ["delivered", "Delivered"],
              ["all", "All Orders"],
              ["rejected", "Rejected"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className={`rounded-xl px-4 py-2.5 text-sm font-semibold ${
                filter === key
                  ? "bg-blue-600 text-white"
                  : "border border-slate-200 bg-white text-slate-700"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {error && (
          <div
            role="alert"
            className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700"
          >
            {error}
          </div>
        )}

        {message && (
          <div
            role="status"
            className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800"
          >
            {message}
          </div>
        )}

        {loading ? (
          <div className="mt-7 rounded-2xl bg-white p-10 text-center">
            Loading orders...
          </div>
        ) : shown.length === 0 ? (
          <div className="mt-7 rounded-2xl border border-slate-200 bg-white p-10 text-center">
            No orders in this category.
          </div>
        ) : (
          <div className="mt-7 space-y-5">
            {shown.map((order) => {
              const canReview =
                order.payment_status === "submitted" &&
                order.order_status === "payment_review";

              const canActivate =
                order.payment_status === "approved" &&
                ["approved", "processing"].includes(
                  order.order_status,
                );

              const busy = busyId === order.order_id;
              const confirming = confirmId === order.order_id;

              return (
                <article
                  key={order.order_id}
                  className="overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 px-6 py-4">
                    <div>
                      <p className="font-extrabold">
                        {order.tracking_id}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {formatDate(order.created_at)}
                      </p>
                    </div>
                    <span className="rounded-full bg-blue-100 px-3 py-2 text-xs font-bold text-blue-700">
                      {statusName(order.order_status)}
                    </span>
                  </div>

                  <div className="grid gap-6 p-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs text-slate-500">
                          Customer
                        </p>
                        <p className="font-bold">
                          {order.customer_name}
                        </p>
                        <p className="break-all text-sm text-slate-600">
                          {order.customer_email}
                        </p>
                        <p className="text-sm text-slate-600">
                          {order.whatsapp_number}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-500">
                          Product / Plan
                        </p>
                        <p className="font-bold">
                          {order.product_name}
                        </p>
                        <p className="text-sm text-slate-600">
                          {order.plan_name}
                        </p>
                      </div>

                      <p className="text-2xl font-extrabold text-blue-600">
                        {money(order.amount_pkr)}
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-xs text-slate-500">
                          Payment Method
                        </p>
                        <p className="font-bold">
                          {order.payment_method === "sadapay"
                            ? "SadaPay"
                            : order.payment_method === "bank_transfer"
                              ? "UBL Bank Transfer"
                              : order.payment_method}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-500">
                          Transaction Reference
                        </p>
                        <p className="break-all font-semibold">
                          {order.payment_reference ||
                            "Not submitted"}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-500">
                          Payment Status
                        </p>
                        <p className="font-semibold capitalize">
                          {order.payment_status}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-500">
                          Payment Screenshot
                        </p>

                        {order.receipt_path ? (
                          <button
                            type="button"
                            onClick={() =>
                              setReceiptId(order.order_id)
                            }
                            className="mt-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700"
                          >
                            View Private Receipt
                          </button>
                        ) : (
                          <p className="text-sm text-slate-500">
                            Awaiting receipt
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {canReview && (
                    <div className="border-t border-slate-100 px-6 py-5">
                      <label className="text-sm font-bold">
                        Admin Note / Rejection Reason
                      </label>

                      <textarea
                        rows={3}
                        maxLength={1000}
                        value={notes[order.order_id] || ""}
                        onChange={(e) =>
                          setNotes((old) => ({
                            ...old,
                            [order.order_id]: e.target.value,
                          }))
                        }
                        className="mt-2 w-full rounded-xl border border-slate-200 p-3"
                        placeholder="Optional for approval; required for rejection"
                      />

                      <div className="mt-4 flex flex-wrap gap-3">
                        <button
                          type="button"
                          disabled={busy || Boolean(busyId)}
                          onClick={() =>
                            void review(order, "approve")
                          }
                          className="rounded-xl bg-emerald-600 px-5 py-3 font-bold text-white disabled:opacity-50"
                        >
                          Approve Payment
                        </button>

                        <button
                          type="button"
                          disabled={busy || Boolean(busyId)}
                          onClick={() =>
                            void review(order, "reject")
                          }
                          className="rounded-xl bg-red-600 px-5 py-3 font-bold text-white disabled:opacity-50"
                        >
                          Reject Payment
                        </button>
                      </div>

                      <p className="mt-3 text-xs text-amber-800">
                        Verify actual funds before approving.
                        A screenshot alone is not proof.
                      </p>
                    </div>
                  )}

                  {canActivate && (
                    <div className="border-t border-emerald-100 bg-emerald-50/50 px-6 py-6">
                      <h3 className="text-xl font-extrabold">
                        Activate & Deliver
                      </h3>
                      <p className="mt-2 text-sm text-slate-600">
                        First provide real subscription access,
                        then confirm activation here.
                      </p>

                      <label
                        htmlFor={`expiry-${order.order_id}`}
                        className="mt-5 block text-sm font-bold"
                      >
                        Subscription Expiry Date & Time
                      </label>

                      <input
                        id={`expiry-${order.order_id}`}
                        type="datetime-local"
                        value={expiryDates[order.order_id] || ""}
                        disabled={busy || confirming}
                        onChange={(e) =>
                          setExpiryDates((old) => ({
                            ...old,
                            [order.order_id]: e.target.value,
                          }))
                        }
                        className="mt-2 w-full max-w-sm rounded-xl border border-slate-200 bg-white px-4 py-3"
                      />

                      <label className="mt-5 flex items-start gap-3 rounded-xl border border-emerald-200 bg-white p-4 text-sm">
                        <input
                          type="checkbox"
                          checked={
                            deliveredChecks[order.order_id] === true
                          }
                          disabled={busy || confirming}
                          onChange={(e) =>
                            setDeliveredChecks((old) => ({
                              ...old,
                              [order.order_id]: e.target.checked,
                            }))
                          }
                          className="mt-1 h-4 w-4 accent-emerald-600"
                        />

                        <span>
                          I confirm the customer has actually
                          received the subscription and real
                          access is active.
                        </span>
                      </label>

                      {!confirming ? (
                        <button
                          type="button"
                          disabled={Boolean(busyId)}
                          onClick={() => prepareActivation(order)}
                          className="mt-5 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-extrabold text-white disabled:opacity-50"
                        >
                          Continue to Activation Confirmation
                        </button>
                      ) : (
                        <div className="mt-5 rounded-2xl border border-amber-300 bg-amber-50 p-5">
                          <p className="font-extrabold text-amber-900">
                            Final Confirmation
                          </p>

                          <p className="mt-2 text-sm leading-6 text-amber-900">
                            {order.product_name} — {order.plan_name}
                          </p>

                          <p className="mt-1 text-sm text-amber-900">
                            Tracking: {order.tracking_id}
                          </p>

                          <p className="mt-1 text-sm text-amber-900">
                            Expiry:{" "}
                            {formatDate(
                              new Date(
                                expiryDates[order.order_id],
                              ).toISOString(),
                            )}
                          </p>

                          <p className="mt-3 text-xs text-red-700">
                            This action will update the shared
                            production database. Continue only
                            after actual delivery.
                          </p>

                          <div className="mt-4 flex flex-wrap gap-3">
                            <button
                              type="button"
                              disabled={busy}
                              onClick={() => void activate(order)}
                              className="rounded-xl bg-emerald-700 px-5 py-3 text-sm font-bold text-white disabled:opacity-50"
                            >
                              {busy
                                ? "Activating..."
                                : "Yes, Activate & Deliver"}
                            </button>

                            <button
                              type="button"
                              disabled={busy}
                              onClick={() => setConfirmId("")}
                              className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {order.order_status === "delivered" && (
                    <div className="border-t border-emerald-100 bg-emerald-50 px-6 py-4">
                      <p className="font-bold text-emerald-800">
                        Order Delivered
                      </p>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}

        {receiptId && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Private payment receipt"
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4"
          >
            <div className="w-full max-w-3xl rounded-2xl bg-white p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-extrabold">
                  Private Payment Receipt
                </h2>
                <button
                  type="button"
                  onClick={() => setReceiptId("")}
                  className="rounded-lg bg-slate-100 px-4 py-2 font-bold"
                >
                  Close
                </button>
              </div>

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/api/admin/orders/receipt?orderId=${encodeURIComponent(receiptId)}`}
                alt="Private customer payment receipt"
                className="mx-auto max-h-[70vh] max-w-full rounded-xl object-contain"
              />

              <p className="mt-3 text-xs text-slate-500">
                Verify actual received funds before approval.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
