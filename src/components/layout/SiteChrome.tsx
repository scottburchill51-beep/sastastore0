
"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";

export function SiteChrome({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  const authPages = [
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ];

  const isAuthPage = authPages.some(
    (path) =>
      pathname === path ||
      pathname.startsWith(`${path}/`)
  );

  // Keep admin and checkout screens free
  // from mobile shopping navigation.
  const isAdminPage =
    pathname === "/admin" ||
    pathname.startsWith("/admin/");

  const isCheckoutPage =
    pathname === "/checkout" ||
    pathname.startsWith("/checkout/");

  const showMobileNavigation =
    !isAuthPage &&
    !isAdminPage &&
    !isCheckoutPage;

  // Preserve the original auth page layout.
  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />

      {children}

      <Footer />

      {showMobileNavigation && (
        <>
          {/* Space so footer is not hidden
              behind the fixed bottom bar. */}
          <div
            aria-hidden="true"
            className="h-[calc(76px+env(safe-area-inset-bottom,0px))] md:hidden"
          />

          <MobileBottomNav />
        </>
      )}

      <FloatingWhatsApp />
    </>
  );
}
