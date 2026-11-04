import { NextRequest, NextResponse } from "next/server";
import { getSession, isAdmin } from "@/lib/store-backend";

export const dynamic = "force-dynamic";

const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function json(data: Record<string, unknown>, status: number) {
  return NextResponse.json(data, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(request: NextRequest) {
  try {
    // Prevent cross-site requests from triggering deletion.
    const origin = request.headers.get("origin");

    if (!origin || origin !== request.nextUrl.origin) {
      return json({ error: "Invalid request origin." }, 403);
    }

    const { user, token } = await getSession();

    if (!user || !token) {
      return json({ error: "Please sign in." }, 401);
    }

    if (!(await isAdmin(user.id, token))) {
      return json({ error: "Admin access required." }, 403);
    }

    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return json({ error: "Invalid JSON." }, 400);
    }

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return json({ error: "Invalid request." }, 400);
    }

    const orderId = (body as Record<string, unknown>).orderId;

    if (typeof orderId !== "string" || !uuidPattern.test(orderId)) {
      return json({ error: "Invalid order ID." }, 400);
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !key) {
      console.error("Order deletion: server environment missing");

      return json(
        { error: "Deletion service is not configured." },
        500,
      );
    }

    const params = new URLSearchParams({
      id: `eq.${orderId}`,
      select: "id",
    });

    const response = await fetch(
      `${url}/rest/v1/store_orders?${params.toString()}`,
      {
        method: "DELETE",
        cache: "no-store",
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
          Prefer: "return=representation",
        },
        signal: AbortSignal.timeout(10000),
      },
    );

    if (!response.ok) {
      console.error(
        "Admin order deletion failed:",
        response.status,
      );

      if (response.status === 409) {
        return json(
          {
            error:
              "This order has linked records and cannot be deleted safely. No records were changed.",
          },
          409,
        );
      }

      return json({ error: "Unable to delete order." }, 500);
    }

    const deleted: unknown = await response.json();

    if (!Array.isArray(deleted) || deleted.length !== 1) {
      return json(
        { error: "Order not found or already deleted." },
        404,
      );
    }

    return json({ success: true }, 200);
  } catch (error) {
    console.error(
      "Admin order deletion error:",
      error instanceof Error ? error.message : "Unknown error",
    );

    return json({ error: "Unable to delete order." }, 500);
  }
}
