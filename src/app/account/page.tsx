
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
  updated_at?: string | null;
};

const orderLabels: Record<string, string> = {
  pending_payment: "Awaiting Payment",
  payment_review: "Payment Under Review",
  approved: "Payment Approved",
  processing: "Preparing Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const paymentLabels: Record<string, string> = {
  pending: "Pending",
  submitted: "Submitted for Review",
  approved: "Approved",
  rejected: "Rejected",
  refunded: "Refunded",
};

function formatMoney(value: number | string) {
  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    return "Unavailable";
  }

  return `PKR ${amount.toLocaleString("en-PK", {
    maximumFractionDigits: 2,
  })}`;
}

function paymentMethodLabel(value: string) {
  if (value === "sadapay") return "SadaPay";
  if (value === "bank_transfer") return "UBL Bank Transfer";
  if (value === "jazzcash") return "JazzCash";
  if (value === "easypaisa") return "Easypaisa";

  return value.replace(/_/g, " ");
}

function statusStyle(status: string) {
  if (status === "delivered") {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (
    status === "approved" ||
    status === "processing"
  ) {
    return "border-blue-200 bg-blue-50 text-blue-700";
  }

  if (status === "cancelled") {
    return "border-red-200 bg-red-50 text-red-700";
  }

  return "border-amber-200 bg-amber-50 text-amber-700";
}

function statusDescription(order: CustomerOrder) {
  if (order.payment_status === "rejected") {
    return "Payment rejected. Please contact support for assistance.";
  }

  if (order.payment_status === "refunded") {
    return "This payment has been marked as refunded.";
  }

  switch (order.order_status) {
    case "pending_payment":
      return "Your order was created. Payment confirmation is still pending.";

    case "payment_review":
      return "Your payment receipt has been submitted. The SastaStore team is checking it.";

    case "approved":
      return "Your payment was approved. Digital delivery is still pending.";

    case "processing":
      return "The SastaStore team is preparing your digital product.";

    case "delivered":
      return "Your digital order has been marked as delivered.";

    case "cancelled":
      return "This order is cancelled. Contact support if you need help.";

    default:
      return "Your order is being tracked.";
  }
}

export default async function AccountPage() {
  const { user, token } = await getSession();

  if (!user || !token) {
    redirect("/login");
  }

  const admin = await isAdmin(user.id, token);

  if (admin) {
    redirect("/admin");
  }

  let orders: CustomerOrder[] = [];
  let ordersError = false;

  try {
    // Fetch orders for this authenticated customer.
    // Supabase RLS also restricts records to auth.uid().
    const query = new URLSearchParams({
      user_id: `eq.${user.id}`,
      select:
        "id,tracking_id,product_name,plan_name,amount_pkr,payment_method,payment_status,order_status,created_at,updated_at",
      order: "created_at.desc",
    });

    const response = await backend(
      `/rest/v1/store_orders?${query.toString()}`,
      {
        method: "GET",
      },
      token,
    );

    if (!response.ok) {
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
    console.error("Customer orders error:", error);
    ordersError = true;
  }

  const pendingReviews = orders.filter(
    (order) => order.order_status === "payment_review",
  ).length;

  const approvedPayments = orders.filter(
    (order) => order.payment_status === "approved",
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.order_status === "delivered",
  );

  return (
    <main className="min-h-screen flex-1 bg-gradient-to-br from-[#F8FAFC] via-[#EFF7FF] to-[#E8FBF4] px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-6xl space-y-8">

        {/* Heading */}
        <section>
          <p className="text-xs font-extrabold uppercase tracking-widest text-blue-600">
            SastaStore / Customer Account
          </p>

          <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            My Dashboard
          </h1>

          <p className="mt-3 text-sm text-slate-600">
            Manage your orders, payments, and digital purchases.
          </p>
        </section>

        {/* Account Card */}
        <section className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-5">
            <div>
              <p className="text-sm font-semibold text-slate-500">
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

        {/* Summary */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: "Total Orders",
              value: ordersError
                ? "Unavailable"
                : String(orders.length),
              description: "Your order history",
            },
            {
              label: "Payment Reviews",
              value: ordersError
                ? "Unavailable"
                : String(pendingReviews),
              description: "Awaiting admin verification",
            },
            {
              label: "Approved Payments",
              value: ordersError
                ? "Unavailable"
                : String(approvedPayments),
              description: "Verified by admin",
            },
            {
              label: "Delivered Orders",
              value: ordersError
                ? "Unavailable"
                : String(deliveredOrders.length),
              description: "Marked as delivered",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm"
            >
              <p className="text-sm font-semibold text-slate-500">
                {stat.label}
              </p>

              <h2 className="mt-3 text-2xl font-extrabold text-blue-600">
                {stat.value}
              </h2>

              <p className="mt-2 text-xs text-slate-400">
                {stat.description}
              </p>
            </div>
          ))}
        </section>

        {/* Orders */}
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
                Track payment verification and order delivery.
              </p>
            </div>

            <Link
              href="/products"
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white hover:bg-blue-700"
            >
              Browse Products
            </Link>
          </div>

          {ordersError ? (
            <div className="mt-7 rounded-2xl border border-red-200 bg-red-50 p-6">
              <p className="font-bold text-red-800">
                Unable to load orders
              </p>

              <p className="mt-2 text-sm text-red-700">
                Please refresh this page or try again later.
              </p>
            </div>
          ) : orders.length === 0 ? (
            <div className="mt-7 rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-9 text-center">
              <h3 className="text-lg font-bold">
                No Orders Yet
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Once you order a subscription, your tracking
                ID and payment status will appear here.
              </p>
            </div>
          ) : (
            <div className="mt-7 space-y-4">
              {orders.map((order) => (
                <article
                  key={order.id}
                  className="overflow-hidden rounded-2xl border border-slate-200"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 px-5 py-4">
                    <div>
                      <p className="text-xs font-semibold uppercase text-slate-500">
                        Tracking ID
                      </p>

                      <p className="mt-1 break-all font-extrabold text-blue-700">
                        {order.tracking_id}
                      </p>
                    </div>

                    <span
                      className={`rounded-full border px-3 py-1.5 text-xs font-bold ${statusStyle(
                        order.order_status,
                      )}`}
                    >
                      {orderLabels[order.order_status] ||
                        order.order_status.replace(/_/g, " ")}
                    </span>
                  </div>

                  <div className="grid gap-5 p-5 sm:grid-cols-2">
                    <div>
                      <p className="text-xs text-slate-500">
                        Product
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
                        Amount
                      </p>

                      <p className="mt-1 text-lg font-extrabold text-blue-600">
                        {formatMoney(order.amount_pkr)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">
                        Payment
                      </p>

                      <p className="mt-1 text-sm font-semibold">
                        {paymentLabels[order.payment_status] ||
                          order.payment_status}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {paymentMethodLabel(
                          order.payment_method,
                        )}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">
                        Ordered On
                      </p>

                      <p className="mt-1 text-sm font-semibold">
                        {new Date(
                          order.created_at,
                        ).toLocaleDateString("en-PK")}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 bg-blue-50/50 px-5 py-4">
                    <p className="text-sm font-semibold text-slate-800">
                      Tracking Update
                    </p>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {statusDescription(order)}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Subscriptions */}
        <section
          id="subscriptions"
          className="scroll-mt-24 rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8"
        >
          <h2 className="text-2xl font-extrabold">
            My Subscriptions
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Your delivered digital purchases are listed
            below. Subscription activation tracking
            is being prepared.
          </p>

          {deliveredOrders.length > 0 ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {deliveredOrders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5"
                >
                  <p className="text-lg font-extrabold">
                    {order.product_name}
                  </p>

                  <p className="mt-1 text-sm text-slate-600">
                    {order.plan_name}
                  </p>

                  <p className="mt-4 text-sm font-semibold text-emerald-700">
                    Order Delivered
                  </p>

                  <p className="mt-2 text-xs text-slate-500">
                    Tracking ID: {order.tracking_id}
                  </p>

                  <p className="mt-2 text-xs leading-5 text-slate-600">
                    Activation and expiry dates have not
                    been recorded yet.
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-7 text-center">
              <p className="font-bold text-slate-700">
                No Delivered Subscriptions Yet
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Delivered purchases will appear here.
                Payments awaiting review or fulfillment
                are tracked in My Orders above.
              </p>
            </div>
          )}
        </section>

        {/* Help */}
        <section className="rounded-2xl border border-blue-100 bg-white p-6">
          <h2 className="font-extrabold">
            Need Help With Your Order?
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            If your payment is taking longer to verify,
            contact support with your Tracking ID.
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
