"use client";

import type { ReactNode } from "react";
import { track } from "@vercel/analytics";

type TrackedWhatsAppOrderLinkProps = {
  href: string;
  productName: string;
  planName: string;
  price: number;
  className?: string;
  children: ReactNode;
};

export function TrackedWhatsAppOrderLink({
  href,
  productName,
  planName,
  price,
  className,
  children,
}: TrackedWhatsAppOrderLinkProps) {
  function handleClick() {
    track("Product WhatsApp Click", {
      source: "product_page",
      product: productName,
      plan: planName,
      price,
    });
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
}
