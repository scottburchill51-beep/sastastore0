
import { redirect } from "next/navigation";
import { currentUser } from "@/lib/store-backend";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const user = await currentUser();

  if (!user) {
    redirect("/login");
  }

  redirect("/products");
}
