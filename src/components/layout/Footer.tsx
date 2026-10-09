import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";

const supportLinks = [
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Refund Policy", href: "/refund-policy" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <Container>
        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-foreground"
            >
              Sasta<span className="text-brand">Store</span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">
              {siteConfig.tagline}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground">Shop</p>

            <div className="mt-4 flex flex-col gap-3">
              <Link
                href="/products"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Products
              </Link>

              <Link
                href="/categories"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Categories
              </Link>

              <Link
                href="/deals"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Deals
              </Link>
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground">Support</p>

            <div className="mt-4 flex flex-col gap-3">
              {supportLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-foreground">Company</p>

            <div className="mt-4 flex flex-col gap-3">
              {companyLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border py-6">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SastaStore. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}