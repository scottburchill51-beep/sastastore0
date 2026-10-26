
import { NextRequest, NextResponse } from "next/server";

import {
  backend,
  getSession,
} from "@/lib/store-backend";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type OrderRequest = {
  productSlug?: unknown;
  planId?: unknown;
  customerName?: unknown;
  customerEmail?: unknown;
  whatsappNumber?: unknown;
  paymentMethod?: unknown;
};

type CreatedOrder = {
  order_id: string;
  tracking_id: string;
};

const paymentMethods = [
  "jazzcash",
  "easypaisa",
  "bank_transfer",
];

function errorResponse(
  message: string,
  status: number,
) {
  return NextResponse.json(
    { error: message },
    {
      status,
      headers: {
        "Cache-Control": "private, no-store",
      },
    },
  );
}

function validText(
  value: unknown,
  maximum: number,
): value is string {
  return (
    typeof value === "string" &&
    value.trim().length > 0 &&
    value.trim().length <= maximum
  );
}

// GET: Retrieve authenticated customer's orders.
export async function GET() {
  try {
    const { user, token } = await getSession();

    if (!user || !token) {
      return errorResponse(
        "Please sign in to view your orders.",
        401,
      );
    }

    const query = new URLSearchParams({
      user_id: `eq.${user.id}`,
      select:
        "id,tracking_id,product_slug,product_name,plan_id,plan_name,amount_pkr,payment_method,payment_status,order_status,created_at,updated_at",
      order: "created_at.desc",
    });

    const response = await backend(
      `/rest/v1/store_orders?${query.toString()}`,
      {},
      token,
    );

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return errorResponse(
        "Unable to load your orders.",
        response.status,
      );
    }

    return NextResponse.json(
      {
        orders: Array.isArray(data) ? data : [],
      },
      {
        headers: {
          "Cache-Control": "private, no-store",
        },
      },
    );
  } catch {
    return errorResponse(
      "Something went wrong while loading orders.",
      500,
    );
  }
}

// POST: Book an order using Supabase's
// secure place_store_order function.
export async function POST(request: NextRequest) {
  try {
    const { user, token } = await getSession();

    if (!user || !token) {
      return errorResponse(
        "Please sign in before placing an order.",
        401,
      );
    }

    let body: OrderRequest;

    try {
      body = await request.json();

      if (
        !body ||
        typeof body !== "object" ||
        Array.isArray(body)
      ) {
        return errorResponse(
          "Invalid order details.",
          400,
        );
      }
    } catch {
      return errorResponse(
        "Invalid request body.",
        400,
      );
    }

    if (
      !validText(body.productSlug, 150) ||
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(
        body.productSlug,
      )
    ) {
      return errorResponse(
        "Please select a valid product.",
        400,
      );
    }

    if (
      (typeof body.planId !== "string" &&
        typeof body.planId !== "number") ||
      String(body.planId).trim().length === 0 ||
      String(body.planId).length > 100
    ) {
      return errorResponse(
        "Please select a valid plan.",
        400,
      );
    }

    if (
      !validText(body.customerName, 120) ||
      body.customerName.trim().length < 2
    ) {
      return errorResponse(
        "Please enter your full name.",
        400,
      );
    }

    if (
      !validText(body.whatsappNumber, 30) ||
      !/^[+\d][\d\s()-]{6,28}$/.test(
        body.whatsappNumber.trim(),
      )
    ) {
      return errorResponse(
        "Please enter a valid WhatsApp number.",
        400,
      );
    }

    if (
      typeof body.paymentMethod !== "string" ||
      !paymentMethods.includes(body.paymentMethod)
    ) {
      return errorResponse(
        "Please select a payment method.",
        400,
      );
    }

    // Optional email field is checked against
    // the logged-in account. The database function
    // always uses the verified account email.
    if (body.customerEmail !== undefined) {
      if (
        !validText(body.customerEmail, 254) ||
        body.customerEmail.trim().toLowerCase() !==
          user.email?.trim().toLowerCase()
      ) {
        return errorResponse(
          "Please use your account email address.",
          400,
        );
      }
    }

    // No price, payment approval or status
    // is accepted from the browser.
    const response = await backend(
      "/rest/v1/rpc/place_store_order",
      {
        method: "POST",
        body: JSON.stringify({
          p_product_slug: body.productSlug,
          p_plan_id: String(body.planId),
          p_customer_name: body.customerName.trim(),
          p_whatsapp_number:
            body.whatsappNumber.trim(),
          p_payment_method: body.paymentMethod,
        }),
      },
      token,
    );

    const result = await response.json().catch(() => null);

    if (!response.ok) {
      console.error(
        "SastaStore order creation failed:",
        response.status,
        result,
      );

      return errorResponse(
        "Unable to create your order. Please check your details and try again.",
        response.status >= 500 ? 500 : 400,
      );
    }

    const created: CreatedOrder | undefined =
      Array.isArray(result) ? result[0] : result;

    if (!created?.order_id || !created?.tracking_id) {
      return errorResponse(
        "Order confirmation could not be retrieved. Check your order history before trying again.",
        502,
      );
    }

    return NextResponse.json(
      {
        message: "Order booked successfully.",
        order: {
          id: created.order_id,
          trackingId: created.tracking_id,
          paymentStatus: "pending",
          orderStatus: "pending_payment",
        },
      },
      {
        status: 201,
        headers: {
          "Cache-Control": "private, no-store",
        },
      },
    );
  } catch (error) {
    console.error(
      "SastaStore Orders API error:",
      error,
    );

    return errorResponse(
      "Something went wrong while creating the order.",
      500,
    );
  }
}
