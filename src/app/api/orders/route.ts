
import { NextRequest, NextResponse } from "next/server";

import {
  getSession,
  backend,
  storeProducts,
} from "@/lib/store-backend";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const ALLOWED_PAYMENT_METHODS = [
  "jazzcash",
  "easypaisa",
  "bank_transfer",
] as const;

type PaymentMethod = (typeof ALLOWED_PAYMENT_METHODS)[number];

function errorResponse(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

function isValidText(value: unknown, maxLength = 200): value is string {
  return (
    typeof value === "string" &&
    value.trim().length > 0 &&
    value.trim().length <= maxLength
  );
}

/**
 * GET /api/orders
 * Returns only the authenticated customer's orders.
 */
export async function GET() {
  try {
    const { user, token } = await getSession();

    if (!user || !token) {
      return errorResponse("Please sign in to view your orders.", 401);
    }

    const response = await backend(
      `/rest/v1/store_orders?user_id=eq.${encodeURIComponent(
        user.id,
      )}&select=id,tracking_id,product_slug,product_name,plan_id,plan_name,amount_pkr,payment_method,payment_status,order_status,created_at,updated_at&order=created_at.desc`,
      {},
      token,
    );

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return errorResponse(
        "Unable to load orders. Please try again.",
        response.status,
      );
    }

    return NextResponse.json(
      { orders: Array.isArray(data) ? data : [] },
      {
        headers: {
          "Cache-Control": "private, no-store",
        },
      },
    );
  } catch {
    return errorResponse("Unable to load orders.", 500);
  }
}

/**
 * POST /api/orders
 * Creates a pending order using the server-side product price.
 *
 * Expected JSON:
 * {
 *   "productSlug": "example-product",
 *   "planId": "plan-id",
 *   "customerName": "Customer Name",
 *   "customerEmail": "customer@example.com",
 *   "whatsappNumber": "+923001234567",
 *   "paymentMethod": "jazzcash"
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const { user, token } = await getSession();

    if (!user || !token) {
      return errorResponse(
        "Please sign in before placing an order.",
        401,
      );
    }

    let body: {
      productSlug?: unknown;
      planId?: unknown;
      customerName?: unknown;
      customerEmail?: unknown;
      whatsappNumber?: unknown;
      paymentMethod?: unknown;
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
      !isValidText(productSlug, 150) ||
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(productSlug)
    ) {
      return errorResponse("Invalid product.", 400);
    }

    if (
      (typeof planId !== "string" && typeof planId !== "number") ||
      String(planId).trim().length === 0 ||
      String(planId).length > 100
    ) {
      return errorResponse("Invalid plan.", 400);
    }

    if (!isValidText(customerName, 120)) {
      return errorResponse("Enter your name.", 400);
    }

    if (
      !isValidText(customerEmail, 254) ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail.trim())
    ) {
      return errorResponse("Enter a valid email address.", 400);
    }

    if (
      !isValidText(whatsappNumber, 30) ||
      !/^[+\d][\d\s()-]{6,28}$/.test(whatsappNumber.trim())
    ) {
      return errorResponse("Enter a valid WhatsApp number.", 400);
    }

    if (
      typeof paymentMethod !== "string" ||
      !ALLOWED_PAYMENT_METHODS.includes(paymentMethod as PaymentMethod)
    ) {
      return errorResponse("Select a valid payment method.", 400);
    }

    // Resolve the product and price from the server-side catalogue.
    // Never trust a price supplied by the browser.
    const catalogue = await storeProducts();

    const product = catalogue.find(
      (item) => item.slug === productSlug,
    );

    if (!product) {
      return errorResponse("Product not found.", 404);
    }

    if (product.availability === "out-of-stock") {
      return errorResponse(
        "This product is currently unavailable.",
        409,
      );
    }

    const plan = product.plans.find(
      (item) => String(item.id) === String(planId),
    );

    if (
      !plan ||
      !Number.isFinite(plan.price) ||
      plan.price <= 0
    ) {
      return errorResponse("Selected plan is invalid.", 400);
    }

    // Verify the account email against the authenticated session.
    // Customers cannot submit an order under another account's email.
    const accountEmail = user.email?.trim().toLowerCase();
    const submittedEmail = customerEmail.trim().toLowerCase();

    if (accountEmail && accountEmail !== submittedEmail) {
      return errorResponse(
        "Use the email address associated with your account.",
        400,
      );
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
          customer_email: accountEmail || submittedEmail,
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
        "The order could not be created. Please try again.",
        response.status,
      );
    }

    const order = Array.isArray(result) ? result[0] : result;

    if (!order?.id || !order?.tracking_id) {
      return errorResponse(
        "The order was submitted, but its confirmation could not be read. Check your orders before retrying.",
        502,
      );
    }

    return NextResponse.json(
      {
        message: "Order created successfully.",
        order: {
          id: order.id,
          trackingId: order.tracking_id,
          productName: order.product_name,
          planName: order.plan_name,
          amount: order.amount_pkr,
          paymentMethod: order.payment_method,
          paymentStatus: order.payment_status,
          orderStatus: order.order_status,
          createdAt: order.created_at,
        },
      },
      {
        status: 201,
        headers: {
          "Cache-Control": "private, no-store",
        },
      },
    );
  } catch {
    return errorResponse(
      "An unexpected error occurred while processing the order.",
      500,
    );
  }
}
