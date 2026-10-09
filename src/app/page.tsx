import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Section>
        <Container>
          <SectionHeading
            eyebrow="SastaStore"
            title="Design system preview"
            description="This temporary page is only for checking our reusable styles before we build the real homepage."
          />

          <div className="mt-8 flex flex-wrap gap-3">
            <Badge>Popular</Badge>
            <Badge variant="success">Available</Badge>
            <Badge variant="muted">Digital Tool</Badge>
          </div>

          <Card className="mt-8 max-w-xl">
            <p className="text-lg font-semibold">Premium Digital Tool</p>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              This card is testing our surface, border, typography and spacing.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button>Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
            </div>
          </Card>
        </Container>
      </Section>
    </main>
  );
}