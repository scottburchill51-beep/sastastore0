
import Link from "next/link";
import { redirect } from "next/navigation";

import { Container } from "@/components/ui/Container";
import { backend, getSession } from "@/lib/store-backend";

import CheckoutForm from "./CheckoutForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Secure Checkout | SastaStore",
  description:
    "Complete your SastaStore digital product order and submit payment details for verification.",
  robots: {
    index: false,
    follow: false,
  },
};

type Props = {
  searchParams: Promise<{
    product?: string;
    plan?: string;
  }>;
};

type ProductData = {
  name?: string;
  availability?: string;
  plans?: Array<{
    id?: string | number;
    name?: string;
    price?: string | number;
  }>;
};

function formatPrice(amount: number) {
  return new Intl.NumberFormat("en-PK", {
    maximumFractionDigits: 2,
  }).format(amount);
}

function Unavailable({
  message,
}: {
  message: string;
}) {
  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-gradient-to-br from-[#EFF8FF] via-white to-[#ECFDF5] px-4 py-16 text-slate-900">
      <div className="w-full max-w-xl rounded-3xl border border-blue-100 bg-white p-8 text-center shadow-xl shadow-blue-100/40 sm:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-3xl font-extrabold text-amber-600">
          !
        </div>

        <h1 className="mt-6 text-2xl font-extrabold sm:text-3xl">
          Checkout Unavailable
        </h1>

        <p className="mt-4 text-sm leading-8 text-slate-600">
          {message}
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link
            href="/products"
            className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            Browse Products
          </Link>

          <Link
            href="/contact"
            className="rounded-xl border border-blue-200 bg-white px-6 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </main>
  );
}

export default async function CheckoutPage({
  searchParams,
}: Props) {
  const params = await searchParams;

  const slug = params.product || "";
  const planId = params.plan || "";

  if (
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) ||
    !planId ||
    planId.length > 100
  ) {
    return (
      <Unavailable message="Please select a valid product and subscription plan before proceeding to checkout." />
    );
  }

  const { user, token } = await getSession();

  if (!user || !token) {
    const destination =
      `/checkout?product=${encodeURIComponent(slug)}` +
      `&plan=${encodeURIComponent(planId)}`;

    redirect(
      `/login?next=${encodeURIComponent(destination)}`,
    );
  }

  let product: ProductData | undefined;

  try {
    const query = new URLSearchParams({
      slug: `eq.${slug}`,
      select: "payload",
      limit: "1",
    });

    const response = await backend(
      `/rest/v1/store_products?${query}`,
      {},
      token,
    );

    if (!response.ok) {
      throw new Error("Product lookup failed");
    }

    const rows = await response.json();

    product = Array.isArray(rows)
      ? rows[0]?.payload
      : undefined;
  } catch {
    return (
      <Unavailable message="We could not verify this product right now. Please try again later or contact support." />
    );
  }

  if (
    !product ||
    !Array.isArray(product.plans) ||
    product.availability === "out-of-stock"
  ) {
    return (
      <Unavailable message="This product is currently unavailable. Please explore another product or contact support." />
    );
  }

  const plan = product.plans.find(
    (item) => String(item.id) === planId,
  );

  if (!plan) {
    return (
      <Unavailable message="The selected subscription plan is unavailable. Please return to the product page and choose another plan." />
    );
  }

  const amount = Number(plan.price);

  if (
    !Number.isFinite(amount) ||
    amount <= 0
  ) {
    return (
      <Unavailable message="This subscription plan does not have a valid price. Please contact support before making any payment." />
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-br from-[#EFF8FF] via-white to-[#ECFDF5] py-10 text-slate-900 sm:py-16">
      <Container>
        <div className="mx-auto max-w-5xl">
          {/* Breadcrumb */}
          <nav
            aria-label="Checkout breadcrumb"
            className="flex flex-wrap items-center gap-2 text-sm text-slate-500"
          >
            <Link
              href="/products"
              className="transition hover:text-blue-600"
            >
              Products
            </Link>

            <span>/</span>

            <Link
              href={`/products/${slug}`}
              className="transition hover:text-blue-600"
            >
              {product.name || slug}
            </Link>

            <span>/</span>

            <span className="font-bold text-blue-700">
              Checkout
            </span>
          </nav>

          {/* Heading */}
          <div className="mt-10">
            <span className="inline-flex items-center rounded-full border border-blue-200 bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-blue-600 shadow-sm">
              SastaStore Checkout
            </span>

            <h1 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-5xl">
              Complete Your{" "}
              <span className="text-blue-600">
                Order
              </span>
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-8 text-slate-600 sm:text-base">
              Review your selected plan, follow
              the payment instructions and submit
              the required details for manual
              payment verification.
            </p>
          </div>

          {/* Selected Order Summary */}
          <section className="mt-9 rounded-3xl border border-blue-100 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-5">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-widest text-blue-600">
                  Selected Product
                </p>

                <h2 className="mt-3 text-2xl font-extrabold text-slate-900">
                  {product.name || slug}
                </h2>

                <p className="mt-2 text-sm text-slate-600">
                  {plan.name || planId}
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-6 py-4">
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Order Amount
                </p>

                <p className="mt-2 text-2xl font-extrabold text-slate-900">
                  Rs. {formatPrice(amount)}
                </p>

                <p className="mt-1 text-xs font-semibold text-slate-500">
                  PKR
                </p>
              </div>
            </div>

            <div className="mt-6 border-t border-blue-50 pt-5">
              <p className="text-sm leading-7 text-slate-600">
                <span className="font-bold text-slate-900">
                  Payment verification:
                </span>{" "}
                Orders are reviewed manually
                before approval. Digital delivery
                or subscription activation may
                require additional processing.
              </p>
            </div>
          </section>

          {/* Actual Working Checkout Form */}
          <section className="mt-8" aria-label="Payment details">
            <CheckoutForm
              productSlug={slug}
              productName={product.name || slug}
              planId={planId}
              planName={plan.name || planId}
              amount={amount}
              email={user.email || ""}
            />
          </section>

          {/* Information */}
          <section className="mt-10 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-sm font-extrabold text-blue-700">
                01
              </div>

              <h2 className="mt-4 font-extrabold">
                Submit Payment Details
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Provide the correct transaction
                reference and payment screenshot
                through the checkout form.
              </p>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sm font-extrabold text-sky-700">
                02
              </div>

              <h2 className="mt-4 font-extrabold">
                Manual Verification
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Our team reviews the submitted
                information before approving
                the payment.
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-sm font-extrabold text-emerald-700">
                03
              </div>

              <h2 className="mt-4 font-extrabold">
                Track Your Order
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                Once your order is created,
                use its tracking ID to follow
                payment and delivery progress.
              </p>
            </div>
          </section>

          {/* Important Notice */}
          <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6">
            <h2 className="text-base font-extrabold text-amber-900">
              Important Payment Reminder
            </h2>

            <p className="mt-3 text-sm leading-8 text-amber-900">
              Check the recipient details and
              payment amount before transferring
              funds. If a transaction has already
              been completed, do not pay again
              solely because the page failed to
              load or an upload was interrupted.
              Check My Account or contact support
              with your transaction information.
            </p>

            <div className="mt-4 flex flex-wrap gap-4">
              <Link
                href="/account"
                className="text-sm font-extrabold text-amber-900 underline underline-offset-4"
              >
                My Account
              </Link>

              <Link
                href="/contact"
                className="text-sm font-extrabold text-amber-900 underline underline-offset-4"
              >
                Contact Support
              </Link>
            </div>
          </div>

          {/* Policies */}
          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs font-semibold text-slate-500">
            <Link
              href="/terms"
              className="hover:text-blue-600"
            >
              Terms & Conditions
            </Link>

            <Link
              href="/privacy"
              className="hover:text-blue-600"
            >
              Privacy Policy
            </Link>

            <Link
              href="/refund-policy"
              className="hover:text-blue-600"
            >
              Refund Policy
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
