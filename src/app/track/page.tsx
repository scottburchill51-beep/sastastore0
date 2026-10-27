
import Link from "next/link";
import { backend, getSession } from "@/lib/store-backend";

export const dynamic = "force-dynamic";

type TrackingPageProps = {
  searchParams: Promise<{
    tracking?: string | string[];
  }>;
};

type OrderRecord = {
  id: string;
  tracking_id: string;
  product_name: string;
  plan_name: string;
  amount_pkr: number;
  payment_method: string;
  payment_status: string;
  order_status: string;
  created_at: string;
  subscription_activated_at: string | null;
  subscription_expires_at: string | null;
};

function formatDate(value: string | null | undefined) {
  if (!value) return "Not available";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en-PK", {
    dateStyle: "medium",
    timeZone: "Asia/Karachi",
  }).format(date);
}

function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-PK", {
    maximumFractionDigits: 2,
  }).format(amount);
}

function getOrderStatus(order: OrderRecord) {
  if (
    order.payment_status === "rejected" ||
    order.order_status === "cancelled"
  ) {
    return {
      title: "Order Rejected",
      description:
        "Your payment or order was not approved. Please contact support if you need assistance.",
      color: "border-red-200 bg-red-50 text-red-800",
    };
  }

  if (
    order.payment_status === "approved" &&
    order.order_status === "delivered"
  ) {
    return {
      title: "Subscription Delivered",
      description:
        "Your order has been marked as delivered.",
      color:
        "border-emerald-200 bg-emerald-50 text-emerald-800",
    };
  }

  if (order.payment_status === "approved") {
    return {
      title: "Payment Approved",
      description:
        "Your payment has been approved. Your order is awaiting delivery.",
      color: "border-blue-200 bg-blue-50 text-blue-800",
    };
  }

  if (
    order.payment_status === "submitted" ||
    order.order_status === "payment_review"
  ) {
    return {
      title: "Payment Under Review",
      description:
        "Your payment screenshot has been submitted. Our team will verify it.",
      color:
        "border-amber-200 bg-amber-50 text-amber-800",
    };
  }

  return {
    title: "Payment Pending",
    description:
      "Your order has been created. Please complete the payment submission process.",
    color:
      "border-slate-200 bg-slate-50 text-slate-800",
  };
}

function Detail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="border-b border-slate-100 py-4 last:border-b-0">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-bold text-slate-900 sm:text-base">
        {value}
      </p>
    </div>
  );
}

export default async function TrackingPage({
  searchParams,
}: TrackingPageProps) {
  const params = await searchParams;

  const rawTracking = Array.isArray(params.tracking)
    ? params.tracking[0]
    : params.tracking;

  const tracking = (rawTracking || "")
    .trim()
    .toUpperCase();

  const { user, token } = await getSession();

  let order: OrderRecord | null = null;
  let error = "";

  if (
    tracking &&
    !/^SS-[A-Z0-9]{12}$/.test(tracking)
  ) {
    error = "Please enter a valid Tracking ID.";
  }

  if (tracking && !error && user && token) {
    const query = new URLSearchParams({
      tracking_id: `eq.${tracking}`,
      user_id: `eq.${user.id}`,
      select:
        "id,tracking_id,product_name,plan_name,amount_pkr,payment_method,payment_status,order_status,created_at,subscription_activated_at,subscription_expires_at",
      limit: "1",
    });

    try {
      const response = await backend(
        `/rest/v1/store_orders?${query.toString()}`,
        {
          method: "GET",
          cache: "no-store",
        },
        token,
      );

      if (!response.ok) {
        error =
          "Unable to load tracking details. Please try again.";
      } else {
        const result: unknown = await response.json();

        if (Array.isArray(result) && result.length > 0) {
          order = result[0] as OrderRecord;
        } else {
          error =
            "No order found with this Tracking ID in your account.";
        }
      }
    } catch {
      error =
        "Tracking service is temporarily unavailable.";
    }
  }

  const status = order ? getOrderStatus(order) : null;

  const expiresAt = order?.subscription_expires_at
    ? new Date(order.subscription_expires_at)
    : null;

  const subscriptionExpired =
    Boolean(expiresAt) &&
    expiresAt !== null &&
    expiresAt.getTime() <= Date.now();

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#f0f9ff] via-white to-[#f0fdf4] px-4 py-12 text-slate-900 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-3xl font-extrabold text-white shadow-lg shadow-blue-100">
            SS
          </div>

          <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-blue-600">
            SastaStore 2.0
          </p>

          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Track Your Order
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
            Enter your SastaStore Tracking ID to check
            payment verification, order delivery and
            subscription information.
          </p>
        </div>

        <section className="mt-10 rounded-3xl border border-blue-100 bg-white p-6 shadow-xl shadow-blue-100/40 sm:p-9">
          {!user || !token ? (
            <div className="text-center">
              <h2 className="text-xl font-extrabold">
                Sign In Required
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                For your privacy, order tracking is
                available only after signing in to the
                account used to place the order.
              </p>

              <Link
                href="/login"
                className="mt-6 inline-flex rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-700"
              >
                Sign In
              </Link>
            </div>
          ) : (
            <>
              <h2 className="text-lg font-extrabold">
                Find Your Order
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Your Tracking ID begins with SS-.
              </p>

              <form
                action="/track"
                method="GET"
                className="mt-5 flex flex-col gap-3 sm:flex-row"
              >
                <input
                  key={tracking}
                  name="tracking"
                  type="text"
                  required
                  maxLength={15}
                  defaultValue={tracking}
                  placeholder="SS-XXXXXXXXXXXX"
                  aria-label="Tracking ID"
                  className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold uppercase outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-7 py-3 text-sm font-extrabold text-white transition hover:bg-blue-700"
                >
                  Track Order
                </button>
              </form>

              {error && (
                <div
                  role="alert"
                  className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700"
                >
                  {error}
                </div>
              )}

              {!tracking && (
                <div className="mt-6 rounded-2xl border border-dashed border-blue-200 bg-blue-50 p-5">
                  <p className="text-sm leading-7 text-blue-800">
                    You can find your Tracking ID in
                    the order confirmation or in your
                    Customer Dashboard.
                  </p>
                </div>
              )}
            </>
          )}
        </section>

        {order && status && user && token && (
          <section className="mt-6 overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-xl shadow-blue-100/40">
            <div className="border-b border-slate-100 p-6 sm:p-9">
              <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
                Tracking Details
              </p>

              <h2 className="mt-2 break-all text-2xl font-extrabold">
                {order.tracking_id}
              </h2>

              <div
                className={`mt-5 rounded-2xl border p-5 ${status.color}`}
              >
                <p className="text-lg font-extrabold">
                  {status.title}
                </p>

                <p className="mt-2 text-sm leading-6">
                  {status.description}
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-9">
              <div className="grid gap-x-8 sm:grid-cols-2">
                <Detail
                  label="Product"
                  value={order.product_name}
                />

                <Detail
                  label="Selected Plan"
                  value={order.plan_name}
                />

                <Detail
                  label="Amount"
                  value={`PKR ${formatPrice(
                    Number(order.amount_pkr),
                  )}`}
                />

                <Detail
                  label="Payment Method"
                  value={
                    order.payment_method === "sadapay"
                      ? "SadaPay"
                      : order.payment_method ===
                          "bank_transfer"
                        ? "UBL Bank Transfer"
                        : order.payment_method
                  }
                />

                <Detail
                  label="Order Date"
                  value={formatDate(order.created_at)}
                />

                <Detail
                  label="Payment Status"
                  value={order.payment_status.replaceAll(
                    "_",
                    " ",
                  )}
                />
              </div>

              {order.subscription_activated_at &&
                order.subscription_expires_at && (
                  <div className="mt-7 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                    <h3 className="text-lg font-extrabold text-emerald-900">
                      Subscription Details
                    </h3>

                    <div className="mt-3 grid gap-x-6 sm:grid-cols-2">
                      <Detail
                        label="Activated On"
                        value={formatDate(
                          order.subscription_activated_at,
                        )}
                      />

                      <Detail
                        label="Expires On"
                        value={formatDate(
                          order.subscription_expires_at,
                        )}
                      />
                    </div>

                    <p className="mt-4 text-sm font-bold text-emerald-900">
                      {subscriptionExpired
                        ? "Subscription Expired"
                        : "Subscription Active"}
                    </p>
                  </div>
                )}

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/account"
                  className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
                >
                  My Dashboard
                </Link>

                <Link
                  href="/"
                  className="rounded-xl border border-blue-200 bg-white px-5 py-3 text-sm font-bold text-blue-700 hover:bg-blue-50"
                >
                  Back to Store
                </Link>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
