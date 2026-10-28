
import { NextRequest, NextResponse } from "next/server";
import { backend, getSession } from "@/lib/store-backend";

export const dynamic = "force-dynamic";

function fail(message: string, status = 400) {
  return NextResponse.json(
    { error: message },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}

const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

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
      `/rest/v1/store_orders?${params.toString()}`,
      {
        method: "GET",
        cache: "no-store",
      },
      token,
    );

    if (!response.ok) {
      return fail("Unable to load orders.", 500);
    }

    const orders = await response.json();

    return NextResponse.json(
      { orders },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (error) {
    console.error("Orders GET error:", error);
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
      checkoutRequestId,
    } = body;

    if (
      typeof productSlug !== "string" ||
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(
        productSlug,
      )
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
      customerName.trim().length > 120
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

    if (
      typeof checkoutRequestId !== "string" ||
      !uuidPattern.test(checkoutRequestId)
    ) {
      return fail(
        "Invalid checkout request. Please reload checkout.",
      );
    }

    // IMPORTANT:
    // The browser does not send an amount.
    // Supabase calculates the price from
    // the trusted product and selected plan.
    //
    // The same checkoutRequestId must return
    // the same order, preventing duplicates.

    const response = await backend(
      "/rest/v1/rpc/place_store_order_once",
      {
        method: "POST",
        cache: "no-store",
        body: JSON.stringify({
          p_product_slug: productSlug,
          p_plan_id: planId,
          p_customer_name: customerName.trim(),
          p_whatsapp_number: whatsappNumber.trim(),
          p_payment_method: paymentMethod,
          p_checkout_request_id: checkoutRequestId,
        }),
      },
      token,
    );

    if (!response.ok) {
      const details = await response.text();

      console.error(
        "Order RPC failed:",
        response.status,
        details,
      );

      // A conflict usually means the same
      // request ID was reused with different
      // customer or product details.
      if (
        details.includes(
          "Checkout request ID belongs to another order",
        )
      ) {
        return fail(
          "This checkout was already used with different details. Please check My Account.",
          409,
        );
      }

      return fail(
        "Unable to create or confirm order. Please check My Account before placing another order.",
        400,
      );
    }

    const result = await response.json();

    const record = Array.isArray(result)
      ? result[0]
      : result;

    if (
      !record ||
      typeof record.order_id !== "string" ||
      typeof record.tracking_id !== "string" ||
      !record.order_id ||
      !record.tracking_id
    ) {
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
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (error) {
    console.error("Orders POST error:", error);

    return fail(
      "Unable to confirm order. Check My Account before trying again.",
      500,
    );
  }
}
