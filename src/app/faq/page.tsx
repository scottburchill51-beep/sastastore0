import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const faqs = [
  {
    question: "How do I place an order?",
    answer:
      "Choose the product and plan you want, then click the Order on WhatsApp button. A pre-filled message will open so you can confirm availability and complete your order.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Delivery time depends on the product. Most digital products are delivered after order confirmation, and exact timing will be shared on WhatsApp.",
  },
  {
    question: "How do I make payment?",
    answer:
      "Payment details are shared on WhatsApp after your selected product and availability are confirmed.",
  },
  {
    question: "Are all products available all the time?",
    answer:
      "Availability can change. Please confirm the selected product and plan on WhatsApp before making payment.",
  },
  {
    question: "Can I ask questions before ordering?",
    answer:
      "Yes. You can contact SastaStore on WhatsApp at any time to ask about plans, availability, delivery or product details.",
  },
  {
    question: "What if I have an issue after delivery?",
    answer:
      "Contact SastaStore on WhatsApp with your order details. Support and warranty terms depend on the specific product or plan.",
  },
  {
    question: "Do some products include a warranty?",
    answer:
      "Yes, selected products may include warranty or validity terms. These details are shown on the relevant product page or confirmed on WhatsApp before ordering.",
  },
  {
    question: "Can I request a product that is not listed?",
    answer:
      "Yes. Message SastaStore on WhatsApp and ask about the product or subscription you need. New products and services can be added later.",
  },
];

export const metadata = {
  title: "FAQ | SastaStore",
  description:
    "Frequently asked questions about ordering, delivery, payment, availability and support at SastaStore.",
};

export default function FAQPage() {
  return (
    <main className="flex-1 bg-background text-foreground">
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Support"
            title="Frequently asked questions"
            description="Quick answers about ordering, payment, delivery, availability and support."
          />

          <div className="mt-10 grid gap-4">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-2xl border border-border bg-surface p-6"
              >
                <h2 className="text-base font-semibold text-foreground">
                  {faq.question}
                </h2>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}