
import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  backend,
  getSession,
  isAdmin,
} from "@/lib/store-backend";

export const dynamic = "force-dynamic";

function respond(data: unknown, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: {
      "Cache-Control": "private, no-store",
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const { user, token } = await getSession();

    if (!user || !token) {
      return respond(
        { error: "Authentication required." },
        401,
      );
    }

    const admin = await isAdmin(user.id, token);

    if (!admin) {
      return respond(
        { error: "Admin access required." },
        403,
      );
    }

    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return respond(
        { error: "Invalid request body." },
        400,
      );
    }

    if (
      !body ||
      typeof body !== "object" ||
      Array.isArray(body)
    ) {
      return respond(
        { error: "Invalid request." },
        400,
      );
    }

    const input = body as Record<string, unknown>;

    const orderId = input.orderId;
    const expiresAt = input.expiresAt;
    const confirmDelivered = input.confirmDelivered;

    if (
      typeof orderId !== "string" ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        orderId,
      )
    ) {
      return respond(
        { error: "Invalid order ID." },
        400,
      );
    }

    if (confirmDelivered !== true) {
      return respond(
        {
          error:
            "You must confirm actual subscription delivery.",
        },
        400,
      );
    }

    if (
      typeof expiresAt !== "string" ||
      expiresAt.length > 50
    ) {
      return respond(
        { error: "Invalid expiry date." },
        400,
      );
    }

    const expiry = new Date(expiresAt);

    if (
      Number.isNaN(expiry.getTime()) ||
      expiry.getTime() <= Date.now()
    ) {
      return respond(
        {
          error:
            "Subscription expiry must be in the future.",
        },
        400,
      );
    }

    // The database function independently checks:
    // 1. auth.uid() is an authorised admin.
    // 2. Payment status is approved.
    // 3. Order is approved or processing.
    // 4. Order is not already activated.
    // 5. Expiry is later than activation.

    const response = await backend(
      "/rest/v1/rpc/admin_activate_store_subscription",
      {
        method: "POST",
        body: JSON.stringify({
          p_order_id: orderId,
          p_expires_at: expiry.toISOString(),
          p_confirm_delivered: true,
        }),
      },
      token,
    );

    if (!response.ok) {
      console.error(
        "Subscription activation failed:",
        response.status,
        await response.text(),
      );

      return respond(
        {
          error:
            "Activation failed. Ensure payment is approved, the subscription has not already been activated, and the database function is installed.",
        },
        400,
      );
    }

    const data = await response.json();

    const activation = Array.isArray(data)
      ? data[0]
      : data;

    return respond({
      success: true,
      activation,
    });
  } catch (error) {
    console.error(
      "Admin activation API error:",
      error,
    );

    return respond(
      {
        error:
          "Unable to activate subscription.",
      },
      500,
    );
  }
}
