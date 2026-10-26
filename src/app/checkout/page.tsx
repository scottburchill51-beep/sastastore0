
import Link from "next/link";
import { redirect } from "next/navigation";
import { backend, getSession } from "@/lib/store-backend";
import CheckoutForm from "./CheckoutForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Secure Checkout | SastaStore",
  robots: { index: false, follow: false },
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

function Unavailable({
  message,
}: {
  message: string;
}) {
  return (
    <main className="min-h-[70vh] bg-slate-50 px-4 py-20">
      <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-10 text-center">
        <h1 className="text-2xl font-extrabold text-slate-900">
          Checkout Unavailable
        </h1>
        <p className="mt-4 text-slate-600">
          {message}
        </p>
        <Link
          href="/products"
          className="mt-7 inline-flex rounded-xl bg-blue-600 px-6 py-3 font-bold text-white"
        >
          Browse Products
        </Link>
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
      <Unavailable message="Please choose a product and plan first." />
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
      <Unavailable message="We could not verify this product. Please try again later." />
    );
  }

  if (
    !product ||
    !Array.isArray(product.plans) ||
    product.availability === "out-of-stock"
  ) {
    return (
      <Unavailable message="This product is currently unavailable." />
    );
  }

  const plan = product.plans.find(
    (item) => String(item.id) === planId,
  );

  if (!plan) {
    return (
      <Unavailable message="The selected plan is unavailable." />
    );
  }

  const amount = Number(plan.price);

  if (
    !Number.isFinite(amount) ||
    amount <= 0
  ) {
    return (
      <Unavailable message="This plan has no valid price. Contact support." />
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 px-4 py-12 text-slate-900">
      <div className="mx-auto max-w-5xl">
        <Link
          href={`/products/${slug}`}
          className="text-sm font-semibold text-blue-600 hover:underline"
        >
          ← Back to product
        </Link>

        <div className="mt-7 mb-9">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
            SastaStore
          </p>

          <h1 className="mt-2 text-4xl font-extrabold">
            Secure Checkout
          </h1>

          <p className="mt-3 text-slate-600">
            Submit your payment securely for manual verification.
          </p>
        </div>

        <CheckoutForm
          productSlug={slug}
          productName={product.name || slug}
          planId={planId}
          planName={plan.name || planId}
          amount={amount}
          email={user.email || ""}
        />
      </div>
    </main>
  );
}
