import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = {
  title: "About SastaStore",
  description:
    "Learn more about SastaStore and our mission to make premium digital tools and subscriptions more affordable and accessible.",
};

export default function AboutPage() {
  return (
    <main className="flex-1 bg-background text-foreground">
      <Section>
        <Container>
          <div className="max-w-3xl">
            <SectionHeading
              eyebrow="About Us"
              title="Premium digital tools without premium prices"
              description="SastaStore helps customers access useful digital tools, AI services, apps and premium subscriptions through a simple and straightforward ordering experience."
            />

            <div className="mt-10 space-y-8">
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  What is SastaStore?
                </h2>

                <p className="mt-3 leading-7 text-muted-foreground">
                  SastaStore is a digital tools storefront focused on making
                  premium software, AI tools, subscriptions and online services
                  easier to discover and more affordable for customers in
                  Pakistan.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  Our approach
                </h2>

                <p className="mt-3 leading-7 text-muted-foreground">
                  We keep things simple. Browse the available products, compare
                  plans and prices, and contact us directly on WhatsApp to
                  confirm availability and complete your order.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  What we offer
                </h2>

                <p className="mt-3 leading-7 text-muted-foreground">
                  Our catalog includes AI tools, creative software,
                  productivity services, learning platforms, entertainment
                  subscriptions, VPN services, software keys and other digital
                  products.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  Our goal
                </h2>

                <p className="mt-3 leading-7 text-muted-foreground">
                  Our goal is to build a reliable and easy-to-use destination
                  where customers can find useful digital products at
                  competitive prices with clear plan information and direct
                  support.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}