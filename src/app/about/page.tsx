import { Reveal } from "@/components/common/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = {
  title: "About SastaStore",
  description:
    "Learn more about SastaStore, our mission, leadership and our goal of making premium digital tools more affordable and accessible.",
};

const teamMembers = [
  {
    name: "Shaloom Victor",
    role: "CEO",
    initials: "SVA",
    description:
      "Leading SastaStore with a focus on building a simple, reliable and affordable destination for digital tools and premium subscriptions.",
  },
  {
    name: "Scott Burchill",
    role: "Admin",
    initials: "SB",
    description:
      "Supporting SastaStore operations and helping maintain a smooth and organized experience across the platform.",
  },
];

export default function AboutPage() {
  return (
    <main className="flex-1 overflow-hidden bg-background text-foreground">
      {/* About Intro */}
      <Section>
        <Container>
          <div className="max-w-3xl">
            <Reveal>
              <SectionHeading
                eyebrow="About Us"
                title="Premium digital tools without premium prices"
                description="SastaStore helps customers access useful digital tools, AI services, apps and premium subscriptions through a simple and straightforward ordering experience."
              />
            </Reveal>

            <div className="mt-10 space-y-8">
              <Reveal delay={80}>
                <div className="rounded-2xl border border-border bg-surface p-6">
                  <h2 className="text-xl font-semibold text-foreground">
                    What is SastaStore?
                  </h2>

                  <p className="mt-3 leading-7 text-muted-foreground">
                    SastaStore is a digital tools storefront focused on making
                    premium software, AI tools, subscriptions and online
                    services easier to discover and more affordable for
                    customers in Pakistan.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={120}>
                <div className="rounded-2xl border border-border bg-surface p-6">
                  <h2 className="text-xl font-semibold text-foreground">
                    Our approach
                  </h2>

                  <p className="mt-3 leading-7 text-muted-foreground">
                    We keep things simple. Browse the available products,
                    compare plans and prices, and contact us directly on
                    WhatsApp to confirm availability and complete your order.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={160}>
                <div className="rounded-2xl border border-border bg-surface p-6">
                  <h2 className="text-xl font-semibold text-foreground">
                    What we offer
                  </h2>

                  <p className="mt-3 leading-7 text-muted-foreground">
                    Our catalog includes AI tools, creative software,
                    productivity services, learning platforms, entertainment
                    subscriptions, VPN services, software keys and other
                    digital products.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <div className="rounded-2xl border border-border bg-surface p-6">
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
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Leadership */}
      <Section className="border-t border-border">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Leadership"
              title="Meet the people behind SastaStore"
              description="The team helping build and manage the SastaStore platform."
            />
          </Reveal>

          <div className="mt-10 grid max-w-4xl gap-5 md:grid-cols-2">
            {teamMembers.map((member, index) => (
              <Reveal
                key={member.name}
                delay={index * 100}
                className="h-full"
              >
                <div className="group premium-card relative h-full overflow-hidden rounded-2xl border border-border bg-surface p-6">
                  <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="relative flex items-center gap-4">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-brand/20 bg-brand/10 text-lg font-bold text-brand transition-all duration-300 group-hover:scale-105 group-hover:border-brand/40">
                      {member.initials}
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                        {member.role}
                      </p>

                      <h2 className="mt-1 text-xl font-semibold tracking-tight text-foreground">
                        {member.name}
                      </h2>
                    </div>
                  </div>

                  <p className="relative mt-5 text-sm leading-7 text-muted-foreground">
                    {member.description}
                  </p>

                  <div className="absolute bottom-0 left-0 h-px w-0 bg-brand transition-all duration-500 group-hover:w-full" />
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}