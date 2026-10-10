import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = {
  title: "Terms & Conditions | SastaStore",
  description:
    "Read the terms and conditions for purchasing digital products, subscriptions and services from SastaStore.",
};

export default function TermsPage() {
  return (
    <main className="flex-1 bg-background text-foreground">
      <Section>
        <Container>
          <div className="max-w-3xl">
            <SectionHeading
              eyebrow="Terms"
              title="Terms & Conditions"
              description="These terms apply when you browse SastaStore, contact us or purchase a digital product or service."
            />

            <div className="mt-10 space-y-8 text-sm leading-7 text-muted-foreground">
              <section>
                <h2 className="text-lg font-semibold text-foreground">
                  Product information
                </h2>

                <p className="mt-3">
                  We aim to keep product names, plan details, prices,
                  availability and descriptions accurate. Digital products can
                  change over time, so final availability and applicable order
                  details should be confirmed before payment.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground">
                  Orders
                </h2>

                <p className="mt-3">
                  Orders are primarily placed and confirmed through WhatsApp.
                  Sending a WhatsApp message does not by itself guarantee
                  product availability. An order is considered confirmed after
                  the relevant product, plan, price and payment details have
                  been agreed.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground">
                  Pricing and payment
                </h2>

                <p className="mt-3">
                  Prices are displayed in Pakistani Rupees unless otherwise
                  stated. Prices and availability may change when supplier
                  costs, plan terms or market conditions change. The applicable
                  price will be confirmed before payment.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground">
                  Digital delivery
                </h2>

                <p className="mt-3">
                  Delivery methods and expected timing vary by product. Some
                  products may be delivered as access, an invitation, account
                  details, an activation key or another digital method.
                  Product-specific delivery information will be communicated
                  where necessary.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground">
                  Customer responsibility
                </h2>

                <p className="mt-3">
                  Customers are responsible for providing accurate information
                  required to complete an order and for following any usage,
                  activation or account instructions supplied with the product.
                  Digital products should only be used for lawful purposes.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground">
                  Third-party products
                </h2>

                <p className="mt-3">
                  Many products available through SastaStore relate to
                  third-party platforms and services. Their names and
                  trademarks belong to their respective owners. SastaStore is
                  not automatically affiliated with, endorsed by or sponsored
                  by those companies unless explicitly stated.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground">
                  Third-party changes
                </h2>

                <p className="mt-3">
                  Features, account rules, subscription terms and platform
                  policies may be changed by third-party providers. SastaStore
                  cannot control changes made directly by those providers.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground">
                  Warranty and support
                </h2>

                <p className="mt-3">
                  Warranty or replacement coverage is product-specific. Where a
                  product includes a stated warranty period or support
                  condition, those terms will apply to that particular order.
                  Products without an explicitly stated warranty should not be
                  assumed to include one.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground">
                  Refunds
                </h2>

                <p className="mt-3">
                  Refund and replacement eligibility depends on the type of
                  digital product and the circumstances of the order. Please
                  review our{" "}
                  <Link
                    href="/refund-policy"
                    className="font-medium text-brand hover:text-brand-hover"
                  >
                    Refund Policy
                  </Link>{" "}
                  for more information.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground">
                  Limitation of responsibility
                </h2>

                <p className="mt-3">
                  SastaStore will make reasonable efforts to provide the
                  product or support described at the time of purchase. We are
                  not responsible for interruptions, restrictions or changes
                  caused by third-party platforms, internet services, devices
                  or circumstances outside our reasonable control.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground">
                  Changes to these terms
                </h2>

                <p className="mt-3">
                  These Terms & Conditions may be updated as SastaStore adds
                  products, services, payment methods or new website features.
                  The latest version published on this page will apply.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground">
                  Contact
                </h2>

                <p className="mt-3">
                  If you have questions about a product, order or these terms,
                  please contact SastaStore through WhatsApp or our contact
                  page before placing your order.
                </p>
              </section>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}