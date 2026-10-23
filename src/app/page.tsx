
import { ProductCatalog } from "@/components/product/ProductCatalog";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = {
  title: "SastaStore | Premium Digital Tools at Sasta Prices",
  description:
    "Discover affordable AI tools, premium subscriptions, software and digital products in Pakistan.",
};

export default function HomePage() {
  return (
    <main className="min-h-screen flex-1 bg-background text-foreground">
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Welcome to SastaStore"
            title="Premium Digital Tools at Sasta Prices"
            description="Browse our digital products, explore subscriptions and compare plans. Create an account when you're ready to purchase."
          />

          <ProductCatalog />
        </Container>
      </Section>
    </main>
  );
}
