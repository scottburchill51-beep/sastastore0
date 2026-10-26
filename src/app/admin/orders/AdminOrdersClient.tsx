
"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";
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
  | "all"
  | "review"
  | "approved"
  | "rejected";

function money(value: number) {
  return `PKR ${Number(value).toLocaleString(
    "en-PK",
  )}`;
}

function paymentName(method: string) {
  if (method === "sadapay") return "SadaPay";
  if (method === "bank_transfer") return "UBL Bank Transfer";
  return method;
}

export default function AdminOrdersClient() {
  const [orders, setOrders] =
    useState<StoreOrder[]>([]);

  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [filter, setFilter] =
    useState<Filter>("review");

  const [noteById, setNoteById] = useState<
    Record<string, string>
  >({});

  const [receiptId, setReceiptId] = useState("");

  const loadOrders = useCallback(async () => {
    try {
      setError("");

      const response = await fetch(
        "/api/admin/orders",
        {
          credentials: "same-origin",
          cache: "no-store",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to load orders.",
        );
      }

      setOrders(
        Array.isArray(data.orders)
          ? data.orders
          : [],
      );
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Unable to load orders.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadOrders();
  }, [loadOrders]);

  const pending = orders.filter(
    (order) =>
      order.payment_status === "submitted" &&
      order.order_status === "payment_review",
  );

  const approved = orders.filter(
    (order) => order.payment_status === "approved",
  );

  const rejected = orders.filter(
    (order) => order.payment_status === "rejected",
  );

  const shown = orders.filter((order) => {
    if (filter === "review") {
      return (
        order.payment_status === "submitted" &&
        order.order_status === "payment_review"
      );
    }

    if (filter === "approved") {
      return order.payment_status === "approved";
    }

    if (filter === "rejected") {
      return order.payment_status === "rejected";
    }

    return true;
  });

  async function review(
    order: StoreOrder,
    decision: "approve" | "reject",
  ) {
    const note =
      noteById[order.order_id]?.trim() || "";

    if (decision === "reject" && !note) {
      setError(
        "Please write a rejection reason before rejecting payment.",
      );
      return;
    }

    const question =
      decision === "approve"
        ? `Have you verified that ${money(order.amount_pkr)} was actually received in your bank/SadaPay account for ${order.tracking_id}?`
        : `Reject payment for ${order.tracking_id}?`;

    if (!window.confirm(question)) {
      return;
    }

    setBusyId(order.order_id);
    setError("");
    setMessage("");

    try {
      const response = await fetch(
        "/api/admin/orders",
        {
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
        },
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.error || "Review failed.",
        );
      }

      setMessage(
        `${order.tracking_id}: Payment ${decision === "approve" ? "approved" : "rejected"}.`,
      );

      await loadOrders();
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Review failed.",
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
              SastaStore Admin
            </p>

            <h1 className="mt-2 text-3xl font-extrabold">
              Payment Verification
            </h1>

            <p className="mt-2 text-sm text-slate-600">
              Review payment receipts and manage orders.
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
              onClick={() => {
                setLoading(true);
                void loadOrders();
              }}
              className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white hover:bg-blue-700"
            >
              Refresh
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            ["Pending Review", pending.length],
            ["Approved", approved.length],
            ["Rejected", rejected.length],
          ].map(([label, count]) => (
            <div
              key={String(label)}
              className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm"
            >
              <p className="text-sm font-semibold text-slate-500">
                {label}
              </p>

              <p className="mt-2 text-3xl font-extrabold text-slate-900">
                {count}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {(
            [
              ["review", "Needs Review"],
              ["all", "All Orders"],
              ["approved", "Approved"],
              ["rejected", "Rejected"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              className={`rounded-xl px-4 py-2.5 text-sm font-semibold ${
                filter === value
                  ? "bg-blue-600 text-white"
                  : "border border-slate-200 bg-white text-slate-700"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {error && (
          <p
            role="alert"
            className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            {error}
          </p>
        )}

        {message && (
          <p
            role="status"
            className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800"
          >
            {message}
          </p>
        )}

        {loading ? (
          <div className="mt-7 rounded-2xl bg-white p-10 text-center text-slate-500">
            Loading orders...
          </div>
        ) : shown.length === 0 ? (
          <div className="mt-7 rounded-2xl border border-slate-200 bg-white p-10 text-center">
            <p className="font-bold">
              No orders in this category.
            </p>

            <p className="mt-2 text-sm text-slate-500">
              New payment submissions will appear here.
            </p>
          </div>
        ) : (
          <div className="mt-7 space-y-5">
            {shown.map((order) => {
              const canReview =
                order.payment_status === "submitted" &&
                order.order_status === "payment_review";

              return (
                <article
                  key={order.order_id}
                  className="overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 bg-slate-50 px-6 py-4">
                    <div>
                      <p className="text-sm font-extrabold text-slate-900">
                        {order.tracking_id}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {new Date(
                          order.created_at,
                        ).toLocaleString("en-PK")}
                      </p>
                    </div>

                    <span className="rounded-full bg-blue-100 px-3 py-1.5 text-xs font-bold text-blue-700">
                      {order.order_status.replace(
                        /_/g,
                        " ",
                      )}
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
                        <p className="font-semibold">
                          {order.product_name}
                        </p>
                        <p className="text-sm text-slate-600">
                          {order.plan_name}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-500">
                          Amount
                        </p>
                        <p className="text-2xl font-extrabold text-blue-600">
                          {money(order.amount_pkr)}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-xs text-slate-500">
                          Payment Method
                        </p>
                        <p className="font-bold">
                          {paymentName(
                            order.payment_method,
                          )}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-slate-500">
                          Transaction Reference
                        </p>
                        <p className="break-all font-semibold">
                          {order.payment_reference || "Not submitted"}
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
                            className="mt-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-bold text-blue-700 hover:bg-blue-100"
                          >
                            View Private Receipt
                          </button>
                        ) : (
                          <p className="mt-2 text-sm text-slate-500">
                            Awaiting receipt
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {canReview && (
                    <div className="border-t border-slate-100 px-6 py-5">
                      <label className="block text-sm font-semibold text-slate-700">
                        Admin Note / Rejection Reason
                      </label>

                      <textarea
                        rows={3}
                        maxLength={1000}
                        value={
                          noteById[order.order_id] || ""
                        }
                        onChange={(event) =>
                          setNoteById((previous) => ({
                            ...previous,
                            [order.order_id]:
                              event.target.value,
                          }))
                        }
                        placeholder="Optional for approval. Required for rejection."
                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm outline-none focus:border-blue-500"
                      />

                      <div className="mt-4 flex flex-wrap gap-3">
                        <button
                          type="button"
                          disabled={
                            busyId === order.order_id
                          }
                          onClick={() =>
                            void review(
                              order,
                              "approve",
                            )
                          }
                          className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white hover:bg-emerald-700 disabled:opacity-50"
                        >
                          Approve Payment
                        </button>

                        <button
                          type="button"
                          disabled={
                            busyId === order.order_id
                          }
                          onClick={() =>
                            void review(
                              order,
                              "reject",
                            )
                          }
                          className="rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white hover:bg-red-700 disabled:opacity-50"
                        >
                          Reject Payment
                        </button>
                      </div>

                      <p className="mt-3 text-xs leading-5 text-amber-700">
                        Confirm actual funds in SadaPay
                        or UBL before approving. A screenshot
                        alone does not prove payment.
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
            aria-label="Payment receipt"
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4"
          >
            <div className="w-full max-w-3xl rounded-2xl bg-white p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="font-extrabold">
                  Private Payment Receipt
                </h2>

                <button
                  type="button"
                  onClick={() => setReceiptId("")}
                  className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-bold"
                >
                  Close
                </button>
              </div>

              {/* Admin-only image endpoint.
                  The image is not publicly shared. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/api/admin/orders/receipt?orderId=${encodeURIComponent(receiptId)}`}
                alt="Customer payment receipt"
                className="mx-auto max-h-[70vh] w-auto max-w-full rounded-xl object-contain"
              />

              <p className="mt-4 text-xs text-slate-500">
                Verify this transaction against the actual
                payment received in your financial account.
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
