
import { redirect } from "next/navigation";
import { getSession, isAdmin } from "@/lib/store-backend";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const { user, token } = await getSession();

  if (!user) {
    redirect("/login");
  }

  if (await isAdmin(user.id, token)) {
    redirect("/admin");
  }

  redirect("/account");
}
