import { cookies } from "next/headers";
import { products as originalProducts } from "@/data/products";
import type { Product } from "@/types/product";

export const configured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
export type StoreUser = { id: string; email?: string };

export async function backend(path: string, options: RequestInit = {}, token?: string) {
  if (!configured) throw new Error("Supabase environment is not configured");
  return fetch(`${url}${path}`, { ...options, cache: "no-store", headers: { apikey: key, Authorization: `Bearer ${token || key}`, "Content-Type": "application/json", ...options.headers } });
}
export async function currentUser(): Promise<StoreUser | null> {
  const jar = await cookies();
  const access = jar.get("ss_access")?.value;
  if (!access || !configured) return null;
  try { const r = await backend("/auth/v1/user", {}, access); return r.ok ? await r.json() : null; } catch { return null; }
}
export async function isAdmin(userId: string, token: string): Promise<boolean> {
  const r = await backend(`/rest/v1/store_admins?user_id=eq.${encodeURIComponent(userId)}&select=user_id`, {}, token);
  return r.ok && (await r.json()).length > 0;
}
export async function getSession() {
  const user = await currentUser();
  const token = (await cookies()).get("ss_access")?.value || "";
  return { user, token };
}
export async function storeProducts(): Promise<Product[]> {
  if (!configured) return originalProducts;
  try {
    const token = (await cookies()).get("ss_access")?.value;
    const r = await backend("/rest/v1/store_products?select=payload&order=created_at.asc", {}, token);
    if (!r.ok) return originalProducts;
    const rows: { payload: Product }[] = await r.json();
    return rows.map(x => x.payload);
  } catch { return originalProducts; }
}
