import { ProductCatalog } from "@/components/product/ProductCatalog";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = {
  title: "All Products | SastaStore",
  description:
    "Browse and search digital tools, AI subscriptions, premium apps, software and online services at SastaStore.",
};

export default function ProductsPage() {
  return (
    <main className="flex-1 bg-background text-foreground">
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Products"
            title="Find your digital tools"
            description="Search, filter and compare the digital tools, premium subscriptions, AI services and software available at SastaStore."
          />

          <ProductCatalog />
        </Container>
      </Section>
    </main>
  );
}