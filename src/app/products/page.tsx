
import { ProductCatalog } from "@/components/product/ProductCatalog";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = {
  title: "SastaStore | Digital Tools & Premium Subscriptions",
  description:
    "Explore affordable AI tools, digital subscriptions, premium apps and software at SastaStore.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen flex-1 bg-background text-foreground">
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Welcome to SastaStore"
            title="Premium Digital Tools at Sasta Prices"
            description="Explore digital products, compare subscription plans and find the right tools for your needs."
          />

          <ProductCatalog />
        </Container>
      </Section>
    </main>
  );
}
