
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

function respond(
  data: unknown,
  status = 200,
) {
  return NextResponse.json(data, {
    status,
    headers: {
      "Cache-Control": "private, no-store",
    },
  });
}

async function adminSession() {
  const { user, token } = await getSession();

  if (!user || !token) {
    return null;
  }

  const allowed = await isAdmin(user.id, token);

  if (!allowed) {
    return null;
  }

  return { user, token };
}

// GET: Load orders using the admin-only
// Supabase function.
export async function GET() {
  try {
    const admin = await adminSession();

    if (!admin) {
      return respond(
        { error: "Admin access required." },
        403,
      );
    }

    const response = await backend(
      "/rest/v1/rpc/admin_list_store_orders",
      {
        method: "POST",
        body: JSON.stringify({}),
      },
      admin.token,
    );

    if (!response.ok) {
      console.error(
        "Admin order listing failed:",
        response.status,
        await response.text(),
      );

      return respond(
        { error: "Unable to load admin orders." },
        500,
      );
    }

    const result = await response.json();

    return respond({
      orders: Array.isArray(result) ? result : [],
    });
  } catch (error) {
    console.error("Admin orders GET error:", error);

    return respond(
      { error: "Unable to load orders." },
      500,
    );
  }
}

// POST: Admin can approve or reject
// payments only through the secured RPC.
export async function POST(
  request: NextRequest,
) {
  try {
    const admin = await adminSession();

    if (!admin) {
      return respond(
        { error: "Admin access required." },
        403,
      );
    }

    let body: Record<string, unknown>;

    try {
      const parsed: unknown = await request.json();

      if (
        !parsed ||
        typeof parsed !== "object" ||
        Array.isArray(parsed)
      ) {
        return respond(
          { error: "Invalid request." },
          400,
        );
      }

      body = parsed as Record<string, unknown>;
    } catch {
      return respond(
        { error: "Invalid request body." },
        400,
      );
    }

    const { orderId, decision, note } = body;

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

    if (
      decision !== "approve" &&
      decision !== "reject"
    ) {
      return respond(
        { error: "Invalid decision." },
        400,
      );
    }

    if (
      note !== undefined &&
      (typeof note !== "string" ||
        note.length > 1000)
    ) {
      return respond(
        { error: "Invalid admin note." },
        400,
      );
    }

    const response = await backend(
      "/rest/v1/rpc/admin_review_store_payment",
      {
        method: "POST",
        body: JSON.stringify({
          p_order_id: orderId,
          p_decision: decision,
          p_note:
            typeof note === "string"
              ? note.trim()
              : null,
        }),
      },
      admin.token,
    );

    if (!response.ok) {
      console.error(
        "Payment review failed:",
        response.status,
        await response.text(),
      );

      return respond(
        {
          error:
            "Payment review failed. Check order status and try again.",
        },
        400,
      );
    }

    const result = await response.json();
    const reviewed = Array.isArray(result)
      ? result[0]
      : result;

    return respond({
      success: true,
      order: reviewed,
    });
  } catch (error) {
    console.error("Admin orders POST error:", error);

    return respond(
      { error: "Unable to review payment." },
      500,
    );
  }
}
