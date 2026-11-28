import { NextResponse } from "next/server";
import { backend } from "@/lib/store-backend";
import { products as preparedProducts } from "@/data/products";
import type { Product } from "@/types/product";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type ProductRow = {
  payload: Product;
};

export async function GET() {
  try {
    const response = await backend(
      "/rest/v1/store_products?select=payload&order=created_at.desc",
      { method: "GET" },
    );

    if (!response.ok) {
      console.error(
        "Public product fetch failed:",
        response.status,
        await response.text(),
      );
      return NextResponse.json(
        { error: "Products are temporarily unavailable." },
        {
          status: 503,
          headers: { "Cache-Control": "no-store" },
        },
      );
    }

    const rows: ProductRow[] = await response.json();

    if (!Array.isArray(rows)) {
      throw new Error("Unexpected product response");
    }

    const databaseProducts = rows
      .map((row) => row.payload)
      .filter(
        (product): product is Product =>
          product !== null &&
          typeof product === "object" &&
          typeof product.slug === "string" &&
          typeof product.name === "string" &&
          Array.isArray(product.plans),
      );

    // Preview displays the prepared catalogue before the first admin import.
    // Once database records exist, the database remains the source of truth.
    const products =
      databaseProducts.length > 0 ? databaseProducts : preparedProducts;

    return NextResponse.json(
      {
        products,
        count: products.length,
        source: databaseProducts.length > 0 ? "database" : "prepared-preview",
      },
      {
        headers: { "Cache-Control": "no-store" },
      },
    );
  } catch (error) {
    console.error("SastaStore products API error:", error);
    return NextResponse.json(
      { error: "Unable to load products. Please try again." },
      {
        status: 500,
        headers: { "Cache-Control": "no-store" },
      },
    );
  }
}
