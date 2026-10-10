import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = {
  title: "Refund Policy | SastaStore",
  description:
    "Read the SastaStore refund and replacement policy for digital products, subscriptions and services.",
};

export default function RefundPolicyPage() {
  return (
    <main className="flex-1 bg-background text-foreground">
      <Section>
        <Container>
          <div className="max-w-3xl">
            <SectionHeading
              eyebrow="Refunds"
              title="Refund & Replacement Policy"
              description="Because SastaStore sells digital products and services, refund eligibility depends on the type of product and the circumstances of the order."
            />

            <div className="mt-10 space-y-8 text-sm leading-7 text-muted-foreground">
              <section>
                <h2 className="text-lg font-semibold text-foreground">
                  Before placing an order
                </h2>

                <p className="mt-3">
                  Please confirm the product, plan, duration, price,
                  compatibility and delivery method before making payment.
                  Customers are encouraged to ask any questions on WhatsApp
                  before an order is confirmed.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground">
                  Digital products
                </h2>

                <p className="mt-3">
                  Many SastaStore products are delivered digitally, including
                  account access, subscriptions, activation keys, invitations
                  and other online services. Once a digital product has been
                  successfully delivered or activated, it may not be eligible
                  for a refund simply because the customer changes their mind.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground">
                  Incorrect or non-working delivery
                </h2>

                <p className="mt-3">
                  If the delivered product is incorrect or does not work as
                  described at the time of delivery, please contact SastaStore
                  as soon as possible with the relevant order details. We will
                  review the issue and, where applicable, provide support,
                  replacement or another appropriate resolution.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground">
                  Warranty-based products
                </h2>

                <p className="mt-3">
                  Some products include a specific warranty period. Where a
                  warranty is clearly stated on the product page or confirmed
                  before purchase, support or replacement will be handled
                  according to those stated terms.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground">
                  Third-party platform changes
                </h2>

                <p className="mt-3">
                  Digital services may depend on third-party platforms.
                  Refunds are not automatically guaranteed for changes,
                  restrictions, suspensions, policy updates or service changes
                  introduced by a third-party provider after delivery.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground">
                  Customer-related issues
                </h2>

                <p className="mt-3">
                  Refunds or replacements may not be available where a problem
                  is caused by incorrect customer information, misuse,
                  unsupported devices, failure to follow provided instructions,
                  unauthorized changes or other circumstances outside
                  SastaStore&apos;s reasonable control.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground">
                  Duplicate or incorrect payments
                </h2>

                <p className="mt-3">
                  If you believe you made a duplicate payment or paid an
                  incorrect amount, contact SastaStore promptly with the
                  relevant payment and order information so the matter can be
                  reviewed.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground">
                  Refund decisions
                </h2>

                <p className="mt-3">
                  Refund or replacement requests are reviewed individually
                  based on the product, delivery status, applicable warranty
                  terms and the specific circumstances of the order.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground">
                  Contact us
                </h2>

                <p className="mt-3">
                  If you experience an issue with an order, contact SastaStore
                  on WhatsApp and provide your product name, selected plan and
                  relevant order details so we can review the issue efficiently.
                </p>
              </section>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}