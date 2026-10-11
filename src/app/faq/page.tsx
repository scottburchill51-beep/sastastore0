import { Reveal } from "@/components/common/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { createWhatsAppUrl } from "@/lib/whatsapp";

const faqs = [
  {
    question: "How do I place an order?",
    answer:
      "Choose the product and plan you want, then click the Order on WhatsApp button. A pre-filled message will open so you can confirm availability, pricing and order details before proceeding.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Delivery time depends on the selected product or service. Many digital products are delivered after order confirmation, while some may require additional setup time. The expected delivery time will be confirmed on WhatsApp.",
  },
  {
    question: "How do I make payment?",
    answer:
      "Payment details are shared directly on WhatsApp after your selected product, plan and availability have been confirmed.",
  },
  {
    question: "Are all products available all the time?",
    answer:
      "No. Availability may change depending on the product, plan or provider. Please confirm availability on WhatsApp before making payment.",
  },
  {
    question: "What is the difference between shared and private plans?",
    answer:
      "A private plan is generally intended for one customer, while a shared plan may involve shared access depending on the product. The exact access type and usage terms are shown on the relevant product page or confirmed on WhatsApp.",
  },
  {
    question: "Can I ask questions before ordering?",
    answer:
      "Yes. You can contact SastaStore on WhatsApp before ordering to ask about plans, availability, delivery, account type or any other product details.",
  },
  {
    question: "What if I have an issue after delivery?",
    answer:
      "Contact SastaStore on WhatsApp with your order details and a clear description of the issue. Support will be provided according to the terms of the specific product or plan.",
  },
  {
    question: "Do products include a warranty or replacement?",
    answer:
      "Some products include warranty or replacement terms while others may not. Any applicable warranty period or conditions will be shown on the product page or confirmed before purchase.",
  },
  {
    question: "Can I get a refund?",
    answer:
      "Refund eligibility depends on the product, delivery status and applicable terms. Please review the SastaStore Refund Policy and contact us on WhatsApp if you have a specific order issue.",
  },
  {
    question: "Can I request a product that is not listed?",
    answer:
      "Yes. Message SastaStore on WhatsApp with the name of the digital tool, subscription or service you need. We can let you know if an option is available.",
  },
  {
    question: "Does SastaStore also provide digital services?",
    answer:
      "Yes. SastaStore provides services including video editing, graphic designing, Shopify store designing, website development, agency ad account services and other custom digital work.",
  },
  {
    question: "How do I discuss a custom digital service?",
    answer:
      "Send your project requirements on WhatsApp. Include the type of service you need, your requirements, expected deadline and any reference material that may help us understand the project.",
  },
  {
    question: "How can I receive new product and deal updates?",
    answer:
      "You can follow the official SastaStore WhatsApp Channel to receive updates about products, deals, services and announcements.",
  },
];

export const metadata = {
  title: "FAQ | SastaStore",
  description:
    "Frequently asked questions about SastaStore ordering, payment, delivery, subscriptions, warranty, refunds, digital services and support.",
};

export default function FAQPage() {
  const whatsappUrl = createWhatsAppUrl(
    "Hello, I have a question about SastaStore products or services.",
  );

  const whatsappChannelUrl =
    "https://whatsapp.com/channel/0029Vb7BXu2B4hdMiWIlwY1v";

  return (
    <main className="flex-1 overflow-hidden bg-background text-foreground">
      <Section>
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Support"
              title="Frequently asked questions"
              description="Quick answers about ordering, payments, delivery, subscriptions, warranty, digital services and SastaStore support."
            />
          </Reveal>

          <div className="mt-10 grid gap-4">
            {faqs.map((faq, index) => (
              <Reveal
                key={faq.question}
                delay={(index % 4) * 60}
              >
                <details className="group overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 open:border-brand/25 open:bg-surface-elevated">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-5 sm:px-6">
                    <h2 className="text-sm font-semibold text-foreground sm:text-base">
                      {faq.question}
                    </h2>

                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-background text-lg text-brand transition-all duration-300 group-open:rotate-45 group-open:border-brand/30">
                      +
                    </span>
                  </summary>

                  <div className="border-t border-border px-5 py-5 sm:px-6">
                    <p className="max-w-4xl text-sm leading-7 text-muted-foreground">
                      {faq.answer}
                    </p>
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-t border-border">
        <Container>
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-brand/20 bg-surface p-7 sm:p-9 lg:flex lg:items-center lg:justify-between lg:gap-10">
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand/10 blur-3xl" />

              <div className="relative max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand">
                  Still Need Help?
                </p>

                <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Can&apos;t find your answer?
                </h2>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Send us your question on WhatsApp and we&apos;ll help you with
                  product availability, plans, orders or digital services.
                </p>
              </div>

              <div className="relative mt-6 flex flex-col gap-3 sm:flex-row lg:mt-0">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-brand px-5 py-3 text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-hover"
                >
                  Ask on WhatsApp
                </a>

                <a
                  href={whatsappChannelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface-elevated px-5 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/30 hover:text-brand"
                >
                  Follow WhatsApp Channel
                  <span>↗</span>
                </a>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </main>
  );
}