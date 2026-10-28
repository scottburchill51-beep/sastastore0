
"use client";

import {
  useRef,
  useState,
  type FormEvent,
} from "react";
import Link from "next/link";

type PaymentMethod = "sadapay" | "bank_transfer";

type Props = {
  productSlug: string;
  productName: string;
  planId: string;
  planName: string;
  amount: number;
  email: string;
};

type Order = {
  id: string;
  trackingId: string;
};

const accounts = {
  sadapay: {
    name: "SadaPay",
    holder: "Shaloom Victor",
    number: "03462195461",
  },
  bank_transfer: {
    name: "UBL Bank Transfer",
    holder: "Shaloom Victor",
    iban: "PK39UNIL0109000330140654",
    number: "1936330140654",
  },
};

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
        } catch {
          setCopied(false);
        }
      }}
      className="rounded-lg border border-blue-200 bg-white px-3 py-1.5 text-xs font-bold text-blue-700 hover:bg-blue-50"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function AccountRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="border-t border-slate-100 py-3">
      <p className="text-xs font-semibold text-slate-500">
        {label}
      </p>

      <div className="mt-1 flex items-center justify-between gap-3">
        <span className="min-w-0 break-all text-sm font-bold text-slate-900">
          {value}
        </span>

        <CopyButton value={value} />
      </div>
    </div>
  );
}

async function readJson(response: Response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

function getCheckoutStorageKey(
  email: string,
  productSlug: string,
  planId: string,
) {
  return [
    "ss-checkout-v2",
    encodeURIComponent(email.toLowerCase()),
    encodeURIComponent(productSlug),
    encodeURIComponent(planId),
  ].join(":");
}

function getCheckoutRequestId(
  storageKey: string,
  requestRef: { current: string | null },
) {
  if (requestRef.current) {
    return requestRef.current;
  }

  try {
    const saved = window.sessionStorage.getItem(storageKey);

    if (
      saved &&
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
        saved,
      )
    ) {
      requestRef.current = saved;
      return saved;
    }
  } catch {
    // Browser storage may be unavailable.
  }

  const requestId = crypto.randomUUID();
  requestRef.current = requestId;

  try {
    window.sessionStorage.setItem(
      storageKey,
      requestId,
    );
  } catch {
    // The in-memory ID still protects
    // repeated submits on this page.
  }

  return requestId;
}

function trackingHref(trackingId: string) {
  return `/track?tracking=${encodeURIComponent(
    trackingId,
  )}`;
}

export default function CheckoutForm({
  productSlug,
  productName,
  planId,
  planName,
  amount,
  email,
}: Props) {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  const [method, setMethod] =
    useState<PaymentMethod>("sadapay");

  const [reference, setReference] = useState("");

  const [receipt, setReceipt] =
    useState<File | null>(null);

  const [order, setOrder] =
    useState<Order | null>(null);

  const [busy, setBusy] = useState(false);
  const [complete, setComplete] = useState(false);
  const [error, setError] = useState("");

  const [orderUncertain, setOrderUncertain] =
    useState(false);

  const submitLock = useRef(false);
  const requestIdRef = useRef<string | null>(null);

  const storageKey = getCheckoutStorageKey(
    email,
    productSlug,
    planId,
  );

  const amountText = amount.toLocaleString("en-PK", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (
      submitLock.current ||
      busy ||
      complete
    ) {
      return;
    }

    if (!receipt) {
      setError(
        "Please attach your payment screenshot.",
      );
      return;
    }

    if (
      ![
        "image/jpeg",
        "image/png",
        "image/webp",
      ].includes(receipt.type) ||
      receipt.size === 0 ||
      receipt.size > 5 * 1024 * 1024
    ) {
      setError(
        "Upload JPG, PNG or WEBP under 5 MB.",
      );
      return;
    }

    if (reference.trim().length < 4) {
      setError(
        "Enter a valid payment transaction reference.",
      );
      return;
    }

    submitLock.current = true;
    setBusy(true);
    setError("");
    setOrderUncertain(false);

    let activeOrder = order;

    try {
      // STEP 1:
      // Reuse the same unique checkout request ID,
      // including after a page refresh.
      if (!activeOrder) {
        const checkoutRequestId =
          getCheckoutRequestId(
            storageKey,
            requestIdRef,
          );

        let response: Response;

        try {
          response = await fetch("/api/orders", {
            method: "POST",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              productSlug,
              planId,
              customerName: name.trim(),
              whatsappNumber: whatsapp.trim(),
              paymentMethod: method,
              checkoutRequestId,
            }),
          });
        } catch {
          setOrderUncertain(true);

          throw new Error(
            "Connection interrupted. Your order may already exist. Check My Account before retrying.",
          );
        }

        const data = await readJson(response);

        if (!response.ok) {
          setOrderUncertain(true);

          throw new Error(
            data?.error ||
              "Unable to confirm order. Check My Account before retrying.",
          );
        }

        const newOrder = data?.order;

        if (
          !newOrder ||
          typeof newOrder.id !== "string" ||
          typeof newOrder.trackingId !== "string" ||
          !newOrder.id ||
          !newOrder.trackingId
        ) {
          setOrderUncertain(true);

          throw new Error(
            "Order confirmation unavailable. Please check My Account.",
          );
        }

        activeOrder = {
          id: newOrder.id,
          trackingId: newOrder.trackingId,
        };

        setOrder(activeOrder);
      }

      // STEP 2:
      // Attach payment evidence to this order.
      const form = new FormData();

      form.append("orderId", activeOrder.id);
      form.append("reference", reference.trim());
      form.append("receipt", receipt);

      let response: Response;

      try {
        response = await fetch(
          "/api/orders/payment",
          {
            method: "POST",
            credentials: "same-origin",
            body: form,
          },
        );
      } catch {
        throw new Error(
          "Payment submission connection interrupted. Check My Account before retrying the screenshot.",
        );
      }

      const data = await readJson(response);

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Payment submission could not be confirmed. Check My Account before retrying.",
        );
      }

      // Payment submitted for admin review.
      // Does not approve or activate subscription.
      setComplete(true);

      // Clear the request ID only after
      // payment submission is confirmed.
      requestIdRef.current = null;

      try {
        window.sessionStorage.removeItem(storageKey);
      } catch {
        // Session storage is optional.
      }

      setError("");
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Something went wrong.",
      );
    } finally {
      submitLock.current = false;
      setBusy(false);
    }
  }

  // PAYMENT CONFIRMATION SCREEN
  // Includes direct tracking link.
  if (complete && order) {
    return (
      <div className="mx-auto max-w-2xl rounded-3xl border border-emerald-200 bg-white p-8 text-center shadow-sm sm:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl text-emerald-700">
          ✓
        </div>

        <h2 className="mt-5 text-3xl font-extrabold text-slate-900">
          Payment Submitted!
        </h2>

        <p className="mt-3 text-slate-600">
          We received your payment screenshot.
          Our team will verify it before
          approving your order.
        </p>

        <div className="mt-7 rounded-2xl bg-blue-50 p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
            Your Tracking ID
          </p>

          <p className="mt-2 break-all text-2xl font-extrabold text-slate-900">
            {order.trackingId}
          </p>

          <div className="mt-3">
            <CopyButton value={order.trackingId} />
          </div>

          <p className="mt-4 text-sm font-semibold text-amber-700">
            Status: Payment Under Review
          </p>
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href={trackingHref(order.trackingId)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-extrabold text-white shadow-sm transition hover:bg-blue-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <circle cx="12" cy="12" r="3" />
              <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
            </svg>

            Track Your Order
          </Link>

          <Link
            href="/account"
            className="inline-flex items-center justify-center rounded-xl border border-blue-200 bg-white px-6 py-3 font-bold text-blue-700 transition hover:bg-blue-50"
          >
            View My Account
          </Link>
        </div>

        <p className="mt-5 text-xs leading-6 text-slate-500">
          You can check your order status anytime
          from the Track Order page or My Account.
          Payment approval is subject to verification.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-7 lg:grid-cols-[1fr_340px]"
    >
      <div className="space-y-7">
        {/* Customer details */}
        <section className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-extrabold">
            1. Customer Details
          </h2>

          <div className="mt-6 space-y-5">
            <label className="block">
              <span className="text-sm font-semibold">
                Full Name
              </span>

              <input
                required
                minLength={2}
                maxLength={120}
                disabled={Boolean(order) || busy}
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Your full name"
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 disabled:bg-slate-50"
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold">
                Email Address
              </span>

              <input
                readOnly
                value={email}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500"
              />

              <span className="mt-1 block text-xs text-slate-500">
                Verified account email
              </span>
            </label>

            <label className="block">
              <span className="text-sm font-semibold">
                WhatsApp Number
              </span>

              <input
                type="tel"
                required
                disabled={Boolean(order) || busy}
                value={whatsapp}
                onChange={(e) =>
                  setWhatsapp(e.target.value)
                }
                placeholder="03XXXXXXXXX"
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 disabled:bg-slate-50"
              />
            </label>
          </div>
        </section>

        {/* Payment method */}
        <section className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-extrabold">
            2. Select Payment Method
          </h2>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {(
              [
                ["sadapay", "SadaPay"],
                ["bank_transfer", "UBL Bank Transfer"],
              ] as const
            ).map(([value, label]) => (
              <label
                key={value}
                className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 ${
                  method === value
                    ? "border-blue-500 bg-blue-50"
                    : "border-slate-200"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={value}
                  checked={method === value}
                  disabled={Boolean(order) || busy}
                  onChange={() => setMethod(value)}
                  className="accent-blue-600"
                />

                <span className="text-sm font-bold">
                  {label}
                </span>
              </label>
            ))}
          </div>

          <div className="mt-6 rounded-2xl border border-blue-100 bg-slate-50 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Send Your Payment To
            </p>

            <h3 className="mt-2 text-lg font-extrabold">
              {accounts[method].name}
            </h3>

            <AccountRow
              label="Account Title"
              value={accounts[method].holder}
            />

            {method === "sadapay" ? (
              <AccountRow
                label="SadaPay Number"
                value={accounts.sadapay.number}
              />
            ) : (
              <>
                <AccountRow
                  label="IBAN"
                  value={accounts.bank_transfer.iban}
                />

                <AccountRow
                  label="Account Number"
                  value={accounts.bank_transfer.number}
                />
              </>
            )}

            <AccountRow
              label="Exact Amount — PKR"
              value={amountText}
            />
          </div>

          <p className="mt-4 text-sm leading-6 text-slate-600">
            Send the exact amount using your
            chosen method. Keep the transaction
            reference and payment screenshot
            for verification.
          </p>
        </section>

        {/* Payment proof */}
        <section className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-extrabold">
            3. Submit Payment Proof
          </h2>

          <div className="mt-6 space-y-5">
            <label className="block">
              <span className="text-sm font-semibold">
                Transaction ID / Reference
              </span>

              <input
                required
                minLength={4}
                maxLength={120}
                disabled={busy}
                value={reference}
                onChange={(e) =>
                  setReference(e.target.value)
                }
                placeholder="Enter payment transaction ID"
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold">
                Payment Screenshot
              </span>

              <input
                type="file"
                required={!receipt}
                disabled={busy}
                accept="image/jpeg,image/png,image/webp"
                onChange={(e) =>
                  setReceipt(
                    e.target.files?.[0] || null,
                  )
                }
                className="mt-2 block w-full rounded-xl border border-dashed border-blue-200 bg-blue-50 p-4 text-sm text-slate-700 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-3 file:py-2 file:font-semibold file:text-white"
              />

              <span className="mt-2 block text-xs text-slate-500">
                JPG, PNG or WEBP. Maximum 5 MB.
              </span>
            </label>
          </div>
        </section>
      </div>

      {/* Order summary */}
      <aside className="self-start rounded-3xl border border-blue-100 bg-white p-6 shadow-sm lg:sticky lg:top-24">
        <h2 className="text-xl font-extrabold">
          Order Summary
        </h2>

        <div className="mt-5 space-y-4">
          <div>
            <p className="text-xs text-slate-500">
              Product
            </p>

            <p className="mt-1 font-bold">
              {productName}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-500">
              Selected Plan
            </p>

            <p className="mt-1 font-semibold">
              {planName}
            </p>
          </div>

          <div className="border-t border-slate-200 pt-5">
            <p className="text-sm text-slate-500">
              Total Amount
            </p>

            <p className="mt-1 text-3xl font-extrabold text-blue-600">
              PKR {amountText}
            </p>
          </div>
        </div>

        {order && (
          <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-xs font-bold text-amber-800">
              Order Created — Payment Pending
            </p>

            <p className="mt-2 break-all text-sm font-bold text-slate-900">
              {order.trackingId}
            </p>

            <p className="mt-2 text-xs text-amber-800">
              If upload failed, retry using
              this same order. Do not pay twice.
            </p>
          </div>
        )}

        {orderUncertain && !order && (
          <div
            role="alert"
            className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4"
          >
            <p className="text-sm font-bold text-amber-900">
              Check Your Order Status
            </p>

            <p className="mt-2 text-sm text-amber-800">
              We could not confirm the result
              of your checkout. Please check
              My Account. The same checkout
              request ID is preserved for a
              safe retry after verification.
            </p>

            <Link
              href="/account"
              className="mt-3 inline-flex rounded-lg bg-amber-900 px-4 py-2 text-sm font-bold text-white hover:bg-amber-950"
            >
              Check My Orders
            </Link>
          </div>
        )}

        {error && (
          <p
            role="alert"
            className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={
            busy ||
            complete ||
            orderUncertain
          }
          className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-4 font-extrabold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {busy
            ? "Processing..."
            : orderUncertain
              ? "Check My Orders First"
              : order
                ? "Retry Payment Proof Upload"
                : "Submit Order & Payment"}
        </button>

        <p className="mt-4 text-center text-xs leading-5 text-slate-500">
          Your payment must be verified by
          the SastaStore team before order
          approval.
        </p>
      </aside>
    </form>
  );
}
