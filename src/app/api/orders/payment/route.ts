
import { NextRequest, NextResponse } from "next/server";
import { backend, getSession } from "@/lib/store-backend";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const maxBytes = 5 * 1024 * 1024;

const allowedTypes: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

function fail(message: string, status = 400) {
  return NextResponse.json(
    { error: message },
    {
      status,
      headers: { "Cache-Control": "no-store" },
    },
  );
}

export async function POST(request: NextRequest) {
  try {
    const { user, token } = await getSession();

    if (!user || !token) {
      return fail("Please sign in.", 401);
    }

    const form = await request.formData();

    const orderId = form.get("orderId");
    const reference = form.get("reference");
    const file = form.get("receipt");

    if (
      typeof orderId !== "string" ||
      !/^[0-9a-f-]{36}$/i.test(orderId)
    ) {
      return fail("Invalid order.");
    }

    if (
      typeof reference !== "string" ||
      reference.trim().length < 4 ||
      reference.trim().length > 120
    ) {
      return fail("Enter a valid transaction reference.");
    }

    if (!(file instanceof File)) {
      return fail("Please upload a payment screenshot.");
    }

    const extension = allowedTypes[file.type];

    if (!extension) {
      return fail("Only JPG, PNG or WEBP allowed.");
    }

    if (file.size === 0 || file.size > maxBytes) {
      return fail("Screenshot must be under 5 MB.");
    }

    // Confirm the order belongs to this customer
    // and is still waiting for payment.
    const params = new URLSearchParams({
      id: `eq.${orderId}`,
      user_id: `eq.${user.id}`,
      select: "id,order_status,payment_status",
      limit: "1",
    });

    const orderResponse = await backend(
      `/rest/v1/store_orders?${params}`,
      {},
      token,
    );

    if (!orderResponse.ok) {
      return fail("Unable to verify order.", 500);
    }

    const orders = await orderResponse.json();
    const order = Array.isArray(orders)
      ? orders[0]
      : null;

    if (
      !order ||
      order.order_status !== "pending_payment" ||
      order.payment_status !== "pending"
    ) {
      return fail("This order cannot accept a receipt.");
    }

    const path =
      `${user.id}/${orderId}/` +
      `${crypto.randomUUID()}.${extension}`;

    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL;

    const anonKey =
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !anonKey) {
      return fail("Payment storage unavailable.", 503);
    }

    const bytes = await file.arrayBuffer();

    // Basic file-signature verification.
    const signature = new Uint8Array(bytes);

    const validJpeg =
      file.type === "image/jpeg" &&
      signature[0] === 0xff &&
      signature[1] === 0xd8 &&
      signature[2] === 0xff;

    const validPng =
      file.type === "image/png" &&
      signature[0] === 0x89 &&
      signature[1] === 0x50 &&
      signature[2] === 0x4e &&
      signature[3] === 0x47;

    const validWebp =
      file.type === "image/webp" &&
      String.fromCharCode(...signature.slice(0, 4)) === "RIFF" &&
      String.fromCharCode(...signature.slice(8, 12)) === "WEBP";

    if (!validJpeg && !validPng && !validWebp) {
      return fail("Invalid image file.");
    }

    const uploadResponse = await fetch(
      `${supabaseUrl}/storage/v1/object/store-payment-proofs/${path}`,
      {
        method: "POST",
        headers: {
          apikey: anonKey,
          Authorization: `Bearer ${token}`,
          "Content-Type": file.type,
          "Cache-Control": "no-store",
          "x-upsert": "false",
        },
        body: bytes,
        cache: "no-store",
      },
    );

    if (!uploadResponse.ok) {
      console.error(
        "Private receipt upload failed:",
        uploadResponse.status,
        await uploadResponse.text(),
      );
      return fail("Screenshot upload failed.", 500);
    }

    // Update status only through the secure RPC.
    const submission = await backend(
      "/rest/v1/rpc/submit_store_payment",
      {
        method: "POST",
        body: JSON.stringify({
          p_order_id: orderId,
          p_storage_path: path,
          p_payment_reference: reference.trim(),
        }),
      },
      token,
    );

    if (!submission.ok) {
      console.error(
        "Payment submission failed:",
        submission.status,
        await submission.text(),
      );

      return fail(
        "Screenshot uploaded, but payment review could not be submitted. Contact support with your tracking ID.",
        500,
      );
    }

    const trackingId = await submission.json();

    return NextResponse.json(
      {
        success: true,
        trackingId,
        paymentStatus: "submitted",
        orderStatus: "payment_review",
        message: "Payment submitted for admin review.",
      },
      {
        headers: { "Cache-Control": "no-store" },
      },
    );
  } catch (error) {
    console.error("Payment route error:", error);
    return fail("Payment submission failed.", 500);
  }
}
