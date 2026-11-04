
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

type OrderRecord = {
  id: string;
  tracking_id: string;
  customer_name: string;
  customer_email: string;
  whatsapp_number: string;
  product_name: string;
  plan_name: string;
  amount_pkr: number;
  payment_method: string;
};

type NotificationChannel = "telegram" | "email";

function getServiceConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new Error("Notification database configuration missing");
  }

  return { url, key };
}

async function serviceRequest(
  path: string,
  options: RequestInit = {},
) {
  const { url, key } = getServiceConfig();

  return fetch(`${url}${path}`, {
    ...options,
    cache: "no-store",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
    signal: AbortSignal.timeout(10000),
  });
}

async function getOrderForNotification(
  orderId: string,
  userId: string,
): Promise<OrderRecord | null> {
  const params = new URLSearchParams({
    id: `eq.${orderId}`,
    user_id: `eq.${userId}`,
    select:
      "id,tracking_id,customer_name,customer_email,whatsapp_number,product_name,plan_name,amount_pkr,payment_method",
    limit: "1",
  });

  const response = await serviceRequest(
    `/rest/v1/store_orders?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error("Unable to load notification order");
  }

  const orders = (await response.json()) as OrderRecord[];
  return orders[0] ?? null;
}

async function claimNotification(
  orderId: string,
  channel: NotificationChannel,
): Promise<boolean> {
  const response = await serviceRequest(
    "/rest/v1/rpc/claim_store_order_notification",
    {
      method: "POST",
      body: JSON.stringify({
        p_order_id: orderId,
        p_channel: channel,
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`Unable to claim ${channel} notification`);
  }

  return (await response.json()) === true;
}

async function markNotificationSent(
  orderId: string,
  channel: NotificationChannel,
) {
  const column =
    channel === "telegram"
      ? "telegram_sent_at"
      : "email_sent_at";

  const params = new URLSearchParams({
    order_id: `eq.${orderId}`,
    [column]: "is.null",
  });

  const response = await serviceRequest(
    `/rest/v1/store_order_notification_outbox?${params.toString()}`,
    {
      method: "PATCH",
      body: JSON.stringify({
        [column]: new Date().toISOString(),
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`Unable to record ${channel} delivery`);
  }
}

function formatPaymentMethod(method: string) {
  return method === "sadapay"
    ? "SadaPay"
    : "Bank Transfer";
}

function formatAmount(amount: number) {
  return new Intl.NumberFormat("en-PK", {
    maximumFractionDigits: 2,
  }).format(amount);
}

async function sendTelegram(order: OrderRecord) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    throw new Error("Telegram configuration missing");
  }

  const message = [
    "🛒 SASTASTORE — NEW ORDER",
    "",
    `Tracking ID: ${order.tracking_id}`,
    `Customer: ${order.customer_name}`,
    `WhatsApp: ${order.whatsapp_number}`,
    `Product: ${order.product_name}`,
    `Plan: ${order.plan_name}`,
    `Amount: PKR ${formatAmount(order.amount_pkr)}`,
    `Payment: ${formatPaymentMethod(order.payment_method)}`,
    "Status: Pending Payment",
    "",
    "Check your SastaStore admin dashboard.",
  ].join("\n");

  const response = await fetch(
    `https://api.telegram.org/bot${botToken}/sendMessage`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        disable_web_page_preview: true,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    },
  );

  if (!response.ok) {
    throw new Error(
      `Telegram notification failed (${response.status})`,
    );
  }

  const result = (await response.json()) as {
    ok?: boolean;
  };

  if (!result.ok) {
    throw new Error("Telegram did not confirm delivery");
  }
}

async function sendAdminEmail(order: OrderRecord) {
  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.ORDER_NOTIFICATION_EMAIL;

  if (!apiKey || !recipient) {
    throw new Error("Email notification configuration missing");
  }

  const lines = [
    "SastaStore — New Order",
    "",
    `Tracking ID: ${order.tracking_id}`,
    `Customer: ${order.customer_name}`,
    `Customer Email: ${order.customer_email}`,
    `WhatsApp: ${order.whatsapp_number}`,
    `Product: ${order.product_name}`,
    `Plan: ${order.plan_name}`,
    `Amount: PKR ${formatAmount(order.amount_pkr)}`,
    `Payment Method: ${formatPaymentMethod(order.payment_method)}`,
    "Order Status: Pending Payment",
    "",
    "Please open the SastaStore admin dashboard.",
  ];

  const response = await fetch(
    "https://api.resend.com/emails",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `sastastore-new-order-${order.id}`,
      },
      body: JSON.stringify({
        from: "SastaStore <orders@sastastore.store>",
        to: [recipient],
        subject: `New SastaStore Order — ${order.tracking_id}`,
        text: lines.join("\n"),
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    },
  );

  if (!response.ok) {
    throw new Error(
      `Resend notification failed (${response.status})`,
    );
  }
}

async function notifyNewOrder(
  orderId: string,
  userId: string,
) {
  try {
    const order = await getOrderForNotification(
      orderId,
      userId,
    );

    if (!order) {
      console.error("Notification order not found");
      return;
    }

    for (const channel of ["telegram", "email"] as const) {
      try {
        const claimed = await claimNotification(
          orderId,
          channel,
        );

        if (!claimed) {
          continue;
        }

        if (channel === "telegram") {
          await sendTelegram(order);
        } else {
          await sendAdminEmail(order);
        }

        await markNotificationSent(orderId, channel);
      } catch (error) {
        console.error(
          `${channel} order notification error:`,
          error instanceof Error ? error.message : "Unknown error",
        );
      }
    }
  } catch (error) {
    console.error(
      "Order notification error:",
      error instanceof Error ? error.message : "Unknown error",
    );
  }
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

    // The browser never determines the product price.
    // Supabase validates the product and selected plan.
    // Repeated checkout IDs return the same order.

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

    // This runs only after Supabase confirms the order.
    // The notification queue prevents concurrent retries
    // from immediately sending the same alert twice.
    // Notification failure never cancels a valid order.

    await notifyNewOrder(record.order_id, user.id);

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
