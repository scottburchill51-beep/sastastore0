
import Link from "next/link";
import { getSession } from "@/lib/store-backend";
import { redirect } from "next/navigation";

type CheckoutPageProps = {
  searchParams: Promise<{
    product?: string;
    plan?: string;
  }>;
};

export const metadata = {
  title: "Secure Checkout | SastaStore",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default async function CheckoutPage({
  searchParams,
}: CheckoutPageProps) {
  const { product, plan } = await searchParams;

  const { user } = await getSession();

  const productSlug =
    typeof product === "string" &&
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(product)
      ? product
      : "";

  const planId =
    typeof plan === "string" &&
    plan.length > 0 &&
    plan.length <= 100
      ? plan
      : "";

  if (!productSlug || !planId) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#F8FAFC] px-4 py-16">
        <div className="w-full max-w-lg rounded-3xl border border-blue-100 bg-white p-10 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">
            Select a Product First
          </h1>
          <p className="mt-4 text-slate-500">
            Please select your product and subscription plan
            before continuing to checkout.
          </p>
          <Link
            href="/products"
            className="mt-7 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Browse Products
          </Link>
        </div>
      </main>
    );
  }

  if (!user) {
    const returnTo =
      `/checkout?product=${encodeURIComponent(productSlug)}` +
      `&plan=${encodeURIComponent(planId)}`;

    redirect(`/login?next=${encodeURIComponent(returnTo)}`);
  }

  return (
    <main className="min-h-[75vh] bg-[#F8FAFC] px-4 py-16 text-slate-900">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
            SastaStore Checkout
          </p>

          <h1 className="mt-3 text-4xl font-extrabold">
            Secure Checkout
          </h1>

          <p className="mt-3 text-slate-500">
            Review your selected product before payment.
          </p>
        </div>

        <div className="rounded-3xl border border-blue-100 bg-white p-7 shadow-sm sm:p-10">
          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
              Selected Product
            </p>

            <p className="mt-2 break-words text-xl font-bold text-slate-900">
              {productSlug}
            </p>

            <p className="mt-3 text-sm text-slate-600">
              Selected Plan: {planId}
            </p>
          </div>

          <div className="mt-7 rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <h2 className="font-bold text-amber-900">
              Checkout Setup in Progress
            </h2>

            <p className="mt-2 text-sm leading-6 text-amber-800">
              We are preparing secure SadaPay and Bank
              Transfer payment submission, receipt upload,
              order tracking and admin verification.
              Please do not make a payment yet.
            </p>
          </div>

          <Link
            href={`/products/${encodeURIComponent(productSlug)}`}
            className="mt-7 inline-flex rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
          >
            Back to Product
          </Link>
        </div>
      </div>
    </main>
  );
}
