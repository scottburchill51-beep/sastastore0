
import { redirect } from "next/navigation";
import { getSession, isAdmin } from "@/lib/store-backend";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { user, token } = await getSession();

  // Not logged in: show modern login page.
  if (!user) {
    redirect("/login");
  }

  // Admin: open admin dashboard.
  const admin = await isAdmin(user.id, token);

  if (admin) {
    redirect("/admin");
  }

  // Customer: open customer dashboard.
  redirect("/account");
}
