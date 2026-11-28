
import { NextResponse } from "next/server";
import { backend } from "@/lib/store-backend";
import type { Product } from "@/types/product";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type ProductRow = {
  payload: Product;
};

export async function GET() {
  try {
    // Fetch the actual published product records.
    // No static fallback: failures must be visible.
    const response = await backend(
      "/rest/v1/store_products?select=payload&order=created_at.desc",
      {
        method: "GET",
      },
    );

    if (!response.ok) {
      console.error(
        "Public product fetch failed:",
        response.status,
        await response.text(),
      );

      return NextResponse.json(
        {
          error:
            "Products are temporarily unavailable.",
        },
        {
          status: 503,
          headers: {
            "Cache-Control": "no-store",
          },
        },
      );
    }

    const rows: ProductRow[] = await response.json();

    if (!Array.isArray(rows)) {
      throw new Error("Unexpected product response");
    }

    const products = rows
      .map((row) => row.payload)
      .filter(
        (product): product is Product =>
          product !== null &&
          typeof product === "object" &&
          typeof product.slug === "string" &&
          typeof product.name === "string" &&
          Array.isArray(product.plans),
      );

    return NextResponse.json(
      {
        products,
        count: products.length,
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  } catch (error) {
    console.error(
      "SastaStore products API error:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "Unable to load products. Please try again.",
      },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  }
}
