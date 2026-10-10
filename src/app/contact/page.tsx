import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/config/site";
import { createWhatsAppUrl } from "@/lib/whatsapp";

export const metadata = {
  title: "Contact SastaStore",
  description:
    "Contact SastaStore on WhatsApp for product availability, plan details, orders and support.",
};

export default function ContactPage() {
  const whatsappUrl = createWhatsAppUrl(
    "Hello, I want to contact SastaStore regarding a product or subscription.",
  );

  return (
    <main className="flex-1 bg-background text-foreground">
      <Section>
        <Container>
          <div className="max-w-3xl">
            <SectionHeading
              eyebrow="Contact"
              title="Get in touch with SastaStore"
              description="For product availability, pricing, plan details or order support, contact us directly on WhatsApp."
            />

            <div className="mt-10 rounded-2xl border border-border bg-surface p-6 sm:p-8">
              <p className="text-sm font-medium text-muted-foreground">
                WhatsApp
              </p>

              <p className="mt-2 text-2xl font-semibold text-foreground">
                {siteConfig.whatsapp.display}
              </p>

              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                Send us a message and we&apos;ll help you with available tools,
                plans, pricing and order details.
              </p>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-brand-hover"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}