
import { NextRequest, NextResponse } from "next/server";
import { backend, getSession } from "@/lib/store-backend";

export const dynamic = "force-dynamic";

function fail(message: string, status = 400) {
  return NextResponse.json(
    { error: message },
    {
      status,
      headers: { "Cache-Control": "no-store" },
    },
  );
}

export async function GET() {
  try {
    const { user, token } = await getSession();

    if (!user || !token) {
      return fail("Please sign in.", 401);
    }

    const params = new URLSearchParams({
      user_id: `eq.${user.id}`,
      select:
        "id,tracking_id,product_slug,product_name,plan_name,amount_pkr,payment_method,payment_status,order_status,created_at",
      order: "created_at.desc",
    });

    const response = await backend(
      `/rest/v1/store_orders?${params}`,
      {},
      token,
    );

    if (!response.ok) {
      return fail("Unable to load orders.", 500);
    }

    const orders = await response.json();

    return NextResponse.json(
      { orders },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return fail("Unable to load orders.", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const { user, token } = await getSession();

    if (!user || !token) {
      return fail("Please sign in to order.", 401);
    }

    let body: Record<string, unknown>;

    try {
      const parsed: unknown = await request.json();

      if (
        !parsed ||
        typeof parsed !== "object" ||
        Array.isArray(parsed)
      ) {
        return fail("Invalid order details.");
      }

      body = parsed as Record<string, unknown>;
    } catch {
      return fail("Invalid JSON request.");
    }

    const {
      productSlug,
      planId,
      customerName,
      whatsappNumber,
      paymentMethod,
    } = body;

    if (
      typeof productSlug !== "string" ||
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(productSlug)
    ) {
      return fail("Invalid product.");
    }

    if (
      typeof planId !== "string" ||
      !planId.trim() ||
      planId.length > 100
    ) {
      return fail("Invalid plan.");
    }

    if (
      typeof customerName !== "string" ||
      customerName.trim().length < 2 ||
      customerName.length > 120
    ) {
      return fail("Enter your full name.");
    }

    if (
      typeof whatsappNumber !== "string" ||
      !/^\+?[\d\s()-]{8,30}$/.test(
        whatsappNumber.trim(),
      )
    ) {
      return fail("Enter a valid WhatsApp number.");
    }

    if (
      paymentMethod !== "sadapay" &&
      paymentMethod !== "bank_transfer"
    ) {
      return fail("Invalid payment method.");
    }

    const response = await backend(
      "/rest/v1/rpc/place_store_order",
      {
        method: "POST",
        body: JSON.stringify({
          p_product_slug: productSlug,
          p_plan_id: planId,
          p_customer_name: customerName.trim(),
          p_whatsapp_number: whatsappNumber.trim(),
          p_payment_method: paymentMethod,
        }),
      },
      token,
    );

    if (!response.ok) {
      console.error(
        "Order RPC failed",
        response.status,
        await response.text(),
      );
      return fail(
        "Unable to create order. Please verify the product and plan.",
        400,
      );
    }

    const result = await response.json();
    const record = Array.isArray(result)
      ? result[0]
      : result;

    if (!record?.order_id || !record?.tracking_id) {
      return fail(
        "Order confirmation unavailable. Check your order history before retrying.",
        502,
      );
    }

    return NextResponse.json(
      {
        order: {
          id: record.order_id,
          trackingId: record.tracking_id,
          orderStatus: "pending_payment",
          paymentStatus: "pending",
        },
      },
      {
        status: 201,
        headers: { "Cache-Control": "no-store" },
      },
    );
  } catch {
    return fail("Unable to create order.", 500);
  }
}
