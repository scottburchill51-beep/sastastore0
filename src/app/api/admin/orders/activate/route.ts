
import { NextRequest, NextResponse } from "next/server";

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
        { error: "Please sign in as an administrator." },
        401,
      );
    }

    if (!(await isAdmin(user.id, token))) {
      return respond(
        { error: "Administrator access required." },
        403,
      );
    }

    let input: unknown;

    try {
      input = await request.json();
    } catch {
      return respond(
        { error: "Invalid JSON request." },
        400,
      );
    }

    if (
      input === null ||
      typeof input !== "object" ||
      Array.isArray(input)
    ) {
      return respond(
        { error: "Invalid activation data." },
        400,
      );
    }

    const body = input as Record<string, unknown>;

    if (
      typeof body.orderId !== "string" ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        body.orderId,
      )
    ) {
      return respond(
        { error: "Invalid order ID." },
        400,
      );
    }

    if (body.confirmDelivered !== true) {
      return respond(
        {
          error:
            "Actual customer delivery must be confirmed.",
        },
        400,
      );
    }

    if (
      typeof body.expiresAt !== "string" ||
      body.expiresAt.length > 50
    ) {
      return respond(
        { error: "Invalid subscription expiry date." },
        400,
      );
    }

    const expiry = new Date(body.expiresAt);

    if (
      !Number.isFinite(expiry.getTime()) ||
      expiry.getTime() <= Date.now()
    ) {
      return respond(
        { error: "Expiry date must be in the future." },
        400,
      );
    }

    const response = await backend(
      "/rest/v1/rpc/admin_activate_store_subscription",
      {
        method: "POST",
        body: JSON.stringify({
          p_order_id: body.orderId,
          p_expires_at: expiry.toISOString(),
          p_confirm_delivered: true,
        }),
      },
      token,
    );

    if (!response.ok) {
      const details = await response.text();

      console.error("Activation RPC failed:", {
        status: response.status,
        details,
      });

      if (response.status === 401 || response.status === 403) {
        return respond(
          {
            error:
              "Admin session expired or permission denied. Sign in again.",
          },
          403,
        );
      }

      if (response.status === 404) {
        return respond(
          {
            error:
              "Subscription activation database function was not found.",
          },
          500,
        );
      }

      let databaseMessage = "";

      try {
        const parsed = JSON.parse(details) as {
          message?: string;
        };

        databaseMessage = parsed.message || "";
      } catch {
        // Keep a safe general message.
      }

      const knownMessages = [
        "Admin access required",
        "Confirm subscription delivery first",
        "Order not found",
        "Payment must be approved before activation",
        "Order is not eligible for activation",
        "Subscription is already activated",
        "Expiry date must be in the future",
      ];

      const safeMessage = knownMessages.includes(databaseMessage)
        ? databaseMessage
        : "Activation failed. Check the Vercel function logs for details.";

      return respond(
        { error: safeMessage },
        400,
      );
    }

    const result = await response.json();

    const activation = Array.isArray(result)
      ? result[0]
      : result;

    if (!activation) {
      return respond(
        {
          error:
            "Activation response was empty. Check the order before retrying.",
        },
        500,
      );
    }

    return respond({
      success: true,
      activation,
    });
  } catch (error) {
    console.error("Activation endpoint error:", error);

    return respond(
      {
        error:
          "Server error during activation. Check Vercel function logs.",
      },
      500,
    );
  }
}
