
import { NextRequest, NextResponse } from "next/server";

import {
  getSession,
  backend,
} from "@/lib/store-backend";

import { storeProducts } from "@/lib/store-backend";

export const dynamic = "force-dynamic";

function errorResponse(message: string, status: number) {
  return NextResponse.json(
    { error: message },
    { status },
  );
}

export async function GET() {
  const { user, token } = await getSession();

  if (!user || !token) {
    return errorResponse("Please sign in to view your orders.", 401);
  }

  const response = await backend(
    `/rest/v1/store_orders?user_id=eq.${encodeURIComponent(
      user.id,
    )}&select=id,tracking_id,product_name,plan_name,amount_pkr,payment_method,payment_status,order_status,created_at,updated_at&order=created_at.desc`,
    {},
    token,
  );

  const data = await response.json().catch(() => []);

  if (!response.ok) {
    return errorResponse("Unable to load orders.", response.status);
  }

  return NextResponse.json({ orders: data });
}

export async function POST(request: NextRequest) {
  const { user, token } = await getSession();

  if (!user || !token) {
    return errorResponse("Please sign in before placing an order.", 401);
  }

  let body: {
    productSlug?: string;
    planId?: string;
    customerName?: string;
    customerEmail?: string;
    whatsappNumber?: string;
    paymentMethod?: string;
  };

  try {
    body = await request.json();
  } catch {
    return errorResponse("Invalid request body.", 400);
  }

  const {
    productSlug,
    planId,
    customerName,
    customerEmail,
    whatsappNumber,
    paymentMethod,
  } = body;

  if (
    !productSlug ||
    !planId ||
    !customerName?.trim() ||
    !customerEmail?.trim() ||
    !whatsappNumber?.trim() ||
    !paymentMethod
  ) {
    return errorResponse("Please complete all required fields.", 400);
  }

  if (
    !["jazzcash", "easypaisa", "bank_transfer"].includes(
      paymentMethod,
    )
  ) {
    return errorResponse("Invalid payment method.", 400);
  }

  // Read product data from the existing server-side catalogue.
  const products = await storeProducts();

  const product = products.find(
    (item) => item.slug === productSlug,
  );

  if (!product) {
    return errorResponse("Product not found.", 404);
  }

  if (product.availability === "out-of-stock") {
    return errorResponse("This product is currently unavailable.", 409);
  }

  const plan = product.plans.find(
    (item) => String(item.id) === String(planId),
  );

  if (!plan || !Number.isFinite(plan.price) || plan.price <= 0) {
    return errorResponse("Invalid product plan.", 400);
  }

  const response = await backend(
    "/rest/v1/store_orders",
    {
      method: "POST",
      headers: {
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        user_id: user.id,
        customer_name: customerName.trim(),
        customer_email: customerEmail.trim(),
        whatsapp_number: whatsappNumber.trim(),
        product_slug: product.slug,
        product_name: product.name,
        plan_id: String(plan.id),
        plan_name: plan.name,
        amount_pkr: plan.price,
        payment_method: paymentMethod,
        payment_status: "pending",
        order_status: "pending_payment",
      }),
    },
    token,
  );

  const result = await response.json().catch(() => null);

  if (!response.ok) {
    return errorResponse(
      "Order could not be created. Please try again.",
      response.status,
    );
  }

  const order = Array.isArray(result) ? result[0] : result;

  if (!order?.tracking_id) {
    return errorResponse(
      "Order response did not contain a tracking ID.",
      500,
    );
  }

  return NextResponse.json(
    {
      message: "Order created successfully.",
      order: {
        id: order.id,
        trackingId: order.tracking_id,
        orderStatus: order.order_status,
        paymentStatus: order.payment_status,
      },
    },
    { status: 201 },
  );
}
