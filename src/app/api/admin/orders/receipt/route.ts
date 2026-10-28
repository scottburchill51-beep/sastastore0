
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

export async function GET(
  request: NextRequest,
) {
  const secureHeaders = {
    "Cache-Control": "private, no-store",
    "X-Content-Type-Options": "nosniff",
  };

  try {
    const { user, token } = await getSession();

    if (
      !user ||
      !token ||
      !(await isAdmin(user.id, token))
    ) {
      return NextResponse.json(
        { error: "Admin access required." },
        {
          status: 403,
          headers: secureHeaders,
        },
      );
    }

    const orderId =
      request.nextUrl.searchParams.get("orderId");

    if (
      !orderId ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        orderId,
      )
    ) {
      return NextResponse.json(
        { error: "Invalid order." },
        {
          status: 400,
          headers: secureHeaders,
        },
      );
    }

    // The RPC independently checks admin role.
    const listResponse = await backend(
      "/rest/v1/rpc/admin_list_store_orders",
      {
        method: "POST",
        body: JSON.stringify({}),
      },
      token,
    );

    if (!listResponse.ok) {
      return NextResponse.json(
        { error: "Unable to verify receipt." },
        {
          status: 500,
          headers: secureHeaders,
        },
      );
    }

    const orders: Array<{
      order_id: string;
      receipt_path: string | null;
    }> = await listResponse.json();

    const order = orders.find(
      (item) => item.order_id === orderId,
    );

    if (!order?.receipt_path) {
      return NextResponse.json(
        { error: "Receipt unavailable." },
        {
          status: 404,
          headers: secureHeaders,
        },
      );
    }

    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL;

    const anonKey =
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !anonKey) {
      throw new Error("Storage not configured");
    }

    // Fetch the actual file using the admin's
    // authenticated access token.
    const encodedPath = order.receipt_path
      .split("/")
      .map(encodeURIComponent)
      .join("/");

    const receiptResponse = await fetch(
      `${supabaseUrl}/storage/v1/object/authenticated/store-payment-proofs/${encodedPath}`,
      {
        headers: {
          apikey: anonKey,
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      },
    );

    if (!receiptResponse.ok) {
      return NextResponse.json(
        { error: "Unable to open receipt." },
        {
          status: 404,
          headers: secureHeaders,
        },
      );
    }

    const contentType =
      receiptResponse.headers.get("content-type") ||
      "application/octet-stream";

    if (
      ![
        "image/jpeg",
        "image/png",
        "image/webp",
      ].includes(contentType)
    ) {
      return NextResponse.json(
        { error: "Invalid receipt format." },
        {
          status: 415,
          headers: secureHeaders,
        },
      );
    }

    const bytes = await receiptResponse.arrayBuffer();

    return new NextResponse(bytes, {
      status: 200,
      headers: {
        ...secureHeaders,
        "Content-Type": contentType,
        "Content-Disposition": "inline",
      },
    });
  } catch (error) {
    console.error(
      "Admin receipt access error:",
      error,
    );

    return NextResponse.json(
      { error: "Unable to load receipt." },
      {
        status: 500,
        headers: secureHeaders,
      },
    );
  }
}
