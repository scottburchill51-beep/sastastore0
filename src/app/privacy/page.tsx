import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = {
  title: "Privacy Policy | SastaStore",
  description:
    "Read the SastaStore privacy policy and learn how customer information is handled.",
};

export default function PrivacyPage() {
  return (
    <main className="flex-1 bg-background text-foreground">
      <Section>
        <Container>
          <div className="max-w-3xl">
            <SectionHeading
              eyebrow="Privacy"
              title="Privacy Policy"
              description="This policy explains how SastaStore handles information when you browse our website or contact us."
            />

            <div className="mt-10 space-y-8 text-sm leading-7 text-muted-foreground">
              <section>
                <h2 className="text-lg font-semibold text-foreground">
                  Information we may receive
                </h2>

                <p className="mt-3">
                  When you contact SastaStore through WhatsApp, you may provide
                  information such as your name, phone number, selected product,
                  plan details and other information needed to process or
                  support your order.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground">
                  How information is used
                </h2>

                <p className="mt-3">
                  Information you provide may be used to confirm product
                  availability, process orders, provide customer support,
                  communicate about your purchase and improve our services.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground">
                  WhatsApp communication
                </h2>

                <p className="mt-3">
                  Orders and customer support are primarily handled through
                  WhatsApp. When you choose to contact us through WhatsApp, your
                  communication is also subject to WhatsApp&apos;s own privacy
                  practices and terms.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground">
                  Payment information
                </h2>

                <p className="mt-3">
                  SastaStore does not currently process card payments directly
                  through this website. Payment instructions are provided
                  separately after order details and availability are confirmed.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground">
                  Sharing of information
                </h2>

                <p className="mt-3">
                  We do not sell customer information. Information may only be
                  shared when reasonably necessary to provide a requested
                  service, comply with applicable requirements or protect the
                  security of our business and customers.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground">
                  Data security
                </h2>

                <p className="mt-3">
                  We take reasonable steps to protect customer information.
                  However, no online communication or storage method can be
                  guaranteed to be completely secure.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground">
                  Policy updates
                </h2>

                <p className="mt-3">
                  This Privacy Policy may be updated as SastaStore adds new
                  services, payment methods or website features.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-foreground">
                  Contact
                </h2>

                <p className="mt-3">
                  If you have a question about this Privacy Policy, please
                  contact SastaStore through the contact page or WhatsApp.
                </p>
              </section>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}